import { DatabaseSync } from 'node:sqlite'
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, existsSync, statSync, renameSync, readdirSync, unlinkSync, rmdirSync, rmSync, cpSync, openSync, readSync, closeSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname, basename, resolve, sep, extname, relative } from 'node:path'
import { homedir } from 'node:os'
import { createHash, createHmac, timingSafeEqual, randomBytes } from 'node:crypto'
import { privateDecrypt, privateEncrypt } from './private.mjs'

export const name = 'memory-xfy'
export const inject = ['tools', 'webServer', 'systemPrompt']

const CONFIG_DEFAULT = {
  source: 'local',
  remoteUrl: '',
  remoteToken: '',

  remoteName: '',

  defaultLayers: null,
  perTurnNodes: 0,

  shareMode: 'read',
  writeLayers: null,

  shareInclude: [],

  acl: {},
}

function configFilePath(home) { return join(home, 'config', 'memory-xfy.json') }

function deleteToken(home, tok) {
  const f = join(home, 'mem-serve.json')
  if (!existsSync(f)) return { ok: false, error: '没有 mem-serve.json' }
  const raw = JSON.parse(readFileSync(f, 'utf8'))
  const spec = (raw.tokens || {})[tok]
  if (!spec) return { ok: false, error: '没有这个 token' }
  delete raw.tokens[tok]
  const tmp = f + '.tmp'
  writeFileSync(tmp, JSON.stringify(raw, null, 2) + '\n', 'utf8')
  renameSync(tmp, f)
  return { ok: true, removed: spec.name || tok.slice(0, 8) }
}

function createToken(home, name, layers) {
  const f = join(home, 'mem-serve.json')
  const raw = existsSync(f)
    ? JSON.parse(readFileSync(f, 'utf8'))
    : { bind: '0.0.0.0', port: 8765, tokens: {} }
  raw.tokens = raw.tokens || {}

  let nm = String(name || '').trim()
  if (Object.values(raw.tokens).some((sp) => sp && sp.name === nm)) {
    return { ok: false, error: `已经有一个叫「${nm}」的 profile 了` }
  }
  const tok = randomBytes(32).toString('base64url')
  if (!nm) nm = tok.slice(0, 8)
  raw.tokens[tok] = { name: nm, layers: Array.isArray(layers) ? layers : [], hot: false }
  const tmp = f + '.tmp'
  writeFileSync(tmp, JSON.stringify(raw, null, 2) + '\n', 'utf8')
  renameSync(tmp, f)
  return { ok: true, token: tok, name: nm }
}

function renameToken(home, token, name) {
  const f = join(home, 'mem-serve.json')
  if (!existsSync(f)) return { ok: false, error: '还没有 mem-serve.json（先建一个 token）' }
  const raw = JSON.parse(readFileSync(f, 'utf8'))
  const sp = raw.tokens && raw.tokens[token]
  if (!sp) return { ok: false, error: '没有这个 token（可能刚被删）' }
  const nm = String(name || '').trim()
  if (!nm) return { ok: false, error: '名字不能是空的' }
  if (nm.length > 40) return { ok: false, error: '名字太长了（40 字符以内）' }
  if (Object.entries(raw.tokens).some(([k, v]) => k !== token && v && v.name === nm)) {
    return { ok: false, error: `已经有一个叫「${nm}」的 profile 了` }
  }
  sp.name = nm
  const tmp = f + '.tmp'
  writeFileSync(tmp, JSON.stringify(raw, null, 2) + '\n', 'utf8')
  renameSync(tmp, f)
  return { ok: true, token, name: nm, renamed: true }
}

function walkHashes(root, rel, out, limit) {
  if (out.size >= limit) return out
  let names = []
  try { names = readdirSync(rel ? join(root, rel) : root) } catch (e) { return out }
  for (const nm of names) {
    if (nm === 'node_modules' || nm === '.git' || nm === '.DS_Store' || nm === '__pycache__') continue
    const r = rel ? rel + '/' + nm : nm
    const full = join(root, r)
    let st = null
    try { st = statSync(full) } catch (e) { continue }
    if (st.isDirectory()) walkHashes(root, r, out, limit)
    else if (st.isFile()) {
      try {
        out.set(r, 'sha256:' + createHash('sha256').update(readFileSync(full)).digest('hex').slice(0, 16))
      } catch (e) {  }
    }
    if (out.size >= limit) return out
  }
  return out
}

function syncStatePath() {
  return join(homedir(), '.dsh', 'cache', 'sync-state.json')
}
function loadSyncState() {
  try { return JSON.parse(readFileSync(syncStatePath(), 'utf8')) } catch { return {} }
}
function saveSyncState(o) {
  const p = syncStatePath()

  const text = JSON.stringify(o)

  try { if (readFileSync(p, 'utf8') === text) return } catch {}
  mkdirSync(dirname(p), { recursive: true })
  const tmp = p + '.tmp'
  writeFileSync(tmp, text, 'utf8')
  renameSync(tmp, p)
}

function baseRec(localHash, remoteHash, at) {
  if (localHash != null && localHash === remoteHash) return { h: remoteHash, at }
  return { h: remoteHash, l: localHash, at }
}

function lcsHunks(base, other) {
  const n = base.length, m = other.length

  const dp = Array.from({ length: n + 1 }, () => new Int32Array(m + 1))
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      dp[i][j] = base[i] === other[j]
        ? dp[i + 1][j + 1] + 1
        : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }

  const hunks = []
  let i = 0, j = 0
  let cur = null
  const flush = () => { if (cur) { hunks.push(cur); cur = null } }
  while (i < n || j < m) {
    if (i < n && j < m && base[i] === other[j]) {
      flush(); i += 1; j += 1; continue
    }
    if (!cur) cur = { s: i, e: i, lines: [] }
    const down = i < n ? dp[i + 1][j] : -1
    const right = j < m ? dp[i][j + 1] : -1
    if (j < m && right >= down) {
      cur.lines.push(other[j]); cur.e = i; j += 1
    } else {
      cur.e = i + 1; i += 1
    }
  }
  flush()
  return hunks
}

function merge3(baseText, oursText, theirsText) {
  if (oursText === theirsText) return { ok: true, text: oursText }
  if (oursText === baseText) return { ok: true, text: theirsText }
  if (theirsText === baseText) return { ok: true, text: oursText }
  const base = baseText.split('\n')
  const ours = lcsHunks(base, oursText.split('\n'))
  const theirs = lcsHunks(base, theirsText.split('\n'))

  for (const a of ours) {
    for (const b of theirs) {
      const overlap = Math.max(a.s, b.s) < Math.min(a.e, b.e)
      if (overlap) return { ok: false }
    }
  }

  const all = [...ours.map((h) => ({ ...h, side: 'ours' })),
               ...theirs.map((h) => ({ ...h, side: 'theirs' }))]
    .sort((x, y) => x.s - y.s || x.e - y.e)
  const out = []
  let at = 0
  for (const h of all) {
    while (at < h.s) { out.push(base[at]); at += 1 }
    out.push(...h.lines)
    at = h.e
  }
  while (at < base.length) { out.push(base[at]); at += 1 }
  return { ok: true, text: out.join('\n') }
}

function mergeDecision(base, localHash, remoteHash, readOnly) {
  if (localHash === undefined && remoteHash === undefined) return 'same'
  if (localHash === undefined) return 'only-remote'
  if (remoteHash === undefined) return 'only-local'
  if (localHash === remoteHash) return 'same'

  if (readOnly) return 'take-remote'
  if (!base) return 'keep-local'

  const bh = base.h
  const bl = base.l != null ? base.l : base.h
  const localChanged = localHash !== bl
  const remoteChanged = remoteHash !== bh
  if (remoteChanged && !localChanged) return 'take-remote'
  if (localChanged && !remoteChanged) return 'keep-local'
  return 'conflict'
}

function hashText(s) {
  return 'sha256:' + createHash('sha256').update(s).digest('hex').slice(0, 16)
}

function diffAgainstLocal(manifest, srcName) {
  const home = homedir()
  const onlyRemote = [], differ = []
  let same = 0
  for (const rel of Object.keys(manifest)) {
    const mh = manifest[rel] && manifest[rel].hash
    let h
    try { h = hashText(readFileSync(join(home, '.dsh', rel))) } catch { h = undefined }
    if (h === undefined) onlyRemote.push(rel)
    else if (h !== mh) differ.push(rel)
    else same += 1
  }
  return {
    same,
    onlyRemote: onlyRemote.length,
    differ: differ.length,
    sampleRemote: onlyRemote.slice(0, 5),
    sampleDiffer: differ.slice(0, 5),
  }
}

async function restartMemServe(home) {
  const conf = JSON.parse(readFileSync(join(home, 'mem-serve.json'), 'utf8'))
  const port = Number(conf.port) || 8765
  const uid = typeof process.getuid === 'function' ? process.getuid() : null
  if (uid === null) return { restarted: false, note: '拿不到 uid，得手动重启 mem-serve' }
  try {
    execFileSync('launchctl', ['kickstart', '-k', `gui/${uid}/com.deepseek.mem-serve`],
      { timeout: 20000, stdio: 'ignore' })
  } catch (e) {
    return { restarted: false, note: 'launchctl kickstart 失败：' + String((e && e.message) || e) }
  }
  const t0 = Date.now()
  while (Date.now() - t0 < 5000) {
    try {
      await fetch(`http://127.0.0.1:${port}/me`, { signal: AbortSignal.timeout(800) })
      return { restarted: true, port, waitedMs: Date.now() - t0 }
    } catch (e) {
      await new Promise((r) => setTimeout(r, 150))
    }
  }
  return { restarted: false, note: `kickstart 过了但 ${port} 五秒内没答话 —— 看 logs/mem-serve.err.log` }
}

function readServeFile(home) {
  const f = join(home, 'mem-serve.json')
  if (!existsSync(f)) return { _exists: false, path: f, tokens: [] }
  try {
    const raw = JSON.parse(readFileSync(f, 'utf8'))
    const tokens = Object.entries(raw.tokens || {}).map(([token, spec]) => ({
      token,
      name: spec.name || '?',
      layers: spec.layers || [],
      hot: spec.hot !== false,
      tg: !!spec.tg,
      excludePaths: spec.exclude_paths || [],
    }))
    return { _exists: true, path: f, bind: raw.bind || '0.0.0.0', port: raw.port || 8765, tokens }
  } catch (e) {
    return { _exists: true, path: f, error: String(e), tokens: [] }
  }
}

function readPluginConfig(home) {
  const f = configFilePath(home)
  if (!existsSync(f)) return { ...CONFIG_DEFAULT, _exists: false }
  const raw = JSON.parse(readFileSync(f, 'utf8'))
  return { ...CONFIG_DEFAULT, ...raw, _exists: true }
}

function writePluginConfig(home, patch) {
  const f = configFilePath(home)
  const cur = readPluginConfig(home)
  const next = {}
  for (const k of Object.keys(CONFIG_DEFAULT)) {
    next[k] = patch[k] !== undefined ? patch[k] : cur[k]
  }
  mkdirSync(dirname(f), { recursive: true })
  const tmp = f + '.tmp'
  writeFileSync(tmp, JSON.stringify(next, null, 2) + '\n', 'utf8')
  renameSync(tmp, f)
  return { ...next, _exists: true }
}

function layersFile(home) {
  const env = process.env.DSH_LAYERS_FILE
  if (env) return env
  const ptr = join(home, '.layers-path')

  try {
    if (existsSync(ptr)) {
      const q = readFileSync(ptr, 'utf8').split('\n')[0].trim()
      if (q) return q
    }
  } catch {  }

  return join(home, 'projects', 'dsh-memory-xfy', 'layers.json')
}

function rootOf(cfg, home) {
  return String((cfg && cfg.root) || '').trim() || home
}

function coldRootOf(cfg, home) {
  const c = String((cfg && cfg.cold) || '').trim() || 'archived'

  if (c.startsWith('/')) throw new Error(`cold 要写相对主路径的细分路径，不是绝对路径：${c}`)
  if (c.split(/[\\/]/).includes('..')) throw new Error(`cold 里不能有 ..：${c}`)
  return join(rootOf(cfg, home), c)
}

function layerDirsOf(cfg, L, home) {
  const root = rootOf(cfg, home)
  const cold = coldRootOf(cfg, home)
  const out = []
  for (const d of (L.dirs || [])) {
    const s = String(d).trim()

    if (s.startsWith('/')) throw new Error(`层 ${L.name} 的 dirs 里要写相对 ${root} 的细分路径，不是绝对路径：${s}`)
    out.push(join(root, s))
    out.push(join(cold, s))
  }
  return out
}

let _coldCache = { key: '', val: '' }
function coldRootCached(home) {
  const f = layersFile(home)
  let st
  try { st = statSync(f) } catch { return join(home, 'archived') }
  const key = `${f}:${st.mtimeMs}:${st.size}`
  if (_coldCache.key !== key) {
    const cfg = JSON.parse(readFileSync(f, 'utf8'))
    _coldCache = { key, val: coldRootOf(cfg, home) }
  }
  return _coldCache.val
}

function moveDir(from, to) {
  mkdirSync(dirname(to), { recursive: true })
  if (existsSync(to)) throw new Error(`目标已存在，拒绝覆盖：${to}`)
  try {
    renameSync(from, to)
  } catch (e) {
    if (e.code !== 'EXDEV') throw e
    cpSync(from, to, { recursive: true })
    rmSync(from, { recursive: true, force: true })
  }
}

function countLayer(home, layer) {
  const row = loadLayers(home).find(([n]) => n === layer)
  if (!row) return { n: 0, b: 0 }
  let b = 0
  for (const f of row[1]) { try { b += statSync(f).size } catch {  } }
  return { n: row[1].length, b }
}

async function readJsonBody(req) {
  const chunks = []
  for await (const c of req) chunks.push(c)
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

function readLayersFile(home) {
  const d = JSON.parse(readFileSync(layersFile(home), 'utf8'))
  return (d.layers || []).map((L) => ({ name: L.name, weight: L.weight }))
}

function binScripts(home) {
  try {
    return readdirSync(join(home, 'bin'))
      .filter((f) => !f.includes('.bak') && !/\.(log|json|db)$/.test(f)
        && !f.startsWith('.') && !f.startsWith('mem-recall-blind')
        && !f.startsWith('mem-recall-test'))
      .map((f) => join(home, 'bin', f))
      .filter((f) => { try { return statSync(f).isFile() } catch { return false } })
      .sort()
  } catch { return [] }
}

function scriptNotes(t) {
  const out = []
  for (const ln of t.split('\n')) {
    const s = ln.trim()
    if (s.startsWith('#')) out.push(s.replace(/^#+/, '').trim())
  }
  const Q3 = '"'.repeat(3)
  const S3 = "'".repeat(3)
  for (const q of [Q3, S3]) {
    const re = new RegExp(q + '[\\s\\S]*?' + q, 'g')
    for (const m of t.match(re) || []) out.push(m)
  }
  return out.filter(Boolean).join('\n')
}

function readText(file) {
  if (!file) return ''
  try {
    if (String(file).endsWith('.enc')) {
      return privateDecrypt(file)
    }
    const inScriptDir = String(file).startsWith(join(homedir(), '.dsh', 'bin') + '/')
    if (inScriptDir) {
      try { if (statSync(file).size > 1000000) return '' } catch { return '' }
      return scriptNotes(readFileSync(file, 'utf8'))
    }
    return readFileSync(file, 'utf8')
  } catch { return '' }
}

function rawInfo(mdPath) {
  try {
    const txt = readText(mdPath)
    const m = /^raw_path:\s*"?([^"\n]*)"?\s*$/m.exec(txt)
    const rel = m ? m[1].trim() : ''
    if (!rel) return { ok: false, rel: '', abs: '', why: '这一轮没有原文' }
    let abs = resolve(dirname(mdPath), rel)
    if (!existsSync(abs)) {
      for (const suf of ['.zst.enc', '.zst', '.gz.enc', '.gz']) {
        if (existsSync(abs + suf)) { abs = abs + suf; break }
      }
    }
    if (!existsSync(abs)) return { ok: false, rel, abs, why: '原文文件不在了：' + rel }
    let size = 0
    try { size = statSync(abs).size } catch {  }
    if (size <= 0) return { ok: false, rel, abs, why: '原文文件是空的：' + rel }
    return { ok: true, rel, abs, size, why: '' }
  } catch (e) {
    return { ok: false, rel: '', abs: '', why: String(e) }
  }
}

function writeText(file, text) {
  if (String(file).endsWith('.enc')) {
    privateEncrypt(file, text)
    return
  }
  writeFileSync(file, text, 'utf8')
}

const SEC_HEAD_RE = /^#{1,3}\s+(.+)$/
const HHMM_RE = /^(\d{1,2}:\d{2})(?:\s*[~～\-—]\s*(\d{1,2}:\d{2}))?/
const DATE_RE = /(\d{4}-\d{2}-\d{2})/
const FM_HEAD_RE = /^---\n([\s\S]*?)\n---\n/

const FM_KEEP = ['title', 'description', 'tags', 'category', 'name']

const pad5 = (v) => (v.length === 4 ? '0' + v : v)
const padTs = (v) => (!v ? v : (v.length === 16 ? v + ':00' : v))
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const hm = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`

function fileDate(path, text, mtime) {
  let m = DATE_RE.exec(String(path))
  if (m) return m[1]
  const fm = FM_HEAD_RE.exec(text)
  if (fm) {
    const m2 = /created_at:\s*"?(\d{4}-\d{2}-\d{2})/.exec(fm[1])
    if (m2) return m2[1]
  }
  return ymd(new Date(mtime * 1000))
}

function sectionTimes(text, path, mtime) {
  const date = fileDate(path, text, mtime)
  let fmTs = null, fmEnd = null
  const fm = FM_HEAD_RE.exec(text)
  if (fm) {
    const m1 = /created_at:\s*"([^"]+)"/.exec(fm[1])
    const m2 = /updated_at:\s*"([^"]+)"/.exec(fm[1])
    if (m1) fmTs = padTs(m1[1].slice(0, 19).replace('T', ' '))
    if (m2) fmEnd = padTs(m2[1].slice(0, 19).replace('T', ' '))
  }
  if (fm && mtime) {
    const _d = new Date(mtime * 1000)
    const _mt = `${ymd(_d)} ${hm(_d)}:00`
    if (!fmEnd || fmEnd < _mt) fmEnd = _mt
  }
  const out = []
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const m = SEC_HEAD_RE.exec(lines[i])
    if (!m) continue
    const hh = HHMM_RE.exec(m[1].trim())
    if (hh) {
      out.push([i + 1, padTs(`${date} ${pad5(hh[1])}`),
                hh[2] ? padTs(`${date} ${pad5(hh[2])}`) : null])
    }
  }
  if (!out.length) {
    const d = new Date(mtime * 1000)
    out.push([1, fmTs || `${ymd(d)} ${hm(d)}:00`, fmEnd])
  }
  return out
}

function tsOf(secs, line) {
  let ts = null, te = null
  for (const [sln, s, e] of secs) {
    if (sln <= line) { ts = s; te = e } else break
  }
  if (ts === null && secs.length) { ts = secs[0][1]; te = secs[0][2] }
  return [ts, te]
}

function loadLayers(home) {
  let cfg
  try {
    cfg = JSON.parse(readFileSync(layersFile(home), 'utf8'))
  } catch (e) {
    throw new Error(`读不到层定义 ${layersFile(home)}：${e.message}`)
  }
  const out = []
  const root = rootOf(cfg, home)
  const cold = coldRootOf(cfg, home)
  for (const L of cfg.layers || []) {
    const files = []

    for (const f of L.files || []) {
      for (const base of [root, cold]) {
        const fp = join(base, f)
        if (existsSync(fp)) files.push(fp)
      }
    }
    const exts = L.exts === undefined ? ['.md'] : L.exts
    const only = new Set(L.only_names || [])
    const exn = new Set(L.exclude_names || [])
    const exp = L.exclude_prefixes || []
    const exs = L.exclude_suffixes || []
    const exc = L.exclude_contains || []
    const exd = new Set(L.exclude_dirs || [])
    const exTop = new Set(L.exclude_top_dirs || [])
    const depth = L.depth === undefined ? 9 : Number(L.depth)
    const walk = (dir, lvl, base) => {
      if (lvl > depth) return
      let es
      try { es = readdirSync(dir, { withFileTypes: true }) } catch { return }
      for (const e of es) {
        const fp = join(dir, e.name)
        if (e.isDirectory()) {
          if (!exd.has(e.name)) walk(fp, lvl + 1, base)
          continue
        }
        if (!e.isFile()) continue
        const name = e.name
        if (only.size && !only.has(name)) continue
        if (exn.has(name)) continue
        if (exp.some((x) => name.startsWith(x))) continue
        if (exs.some((x) => name.endsWith(x))) continue
        if (exc.some((x) => name.includes(x))) continue
        if (exts !== null && !exts.includes(extname(name))) continue
        if (exTop.size) {
          const top = relative(base, fp).split(sep)[0]
          if (exTop.has(top)) continue
        }
        files.push(fp)
      }
    }
    for (const base of layerDirsOf(cfg, L, home)) {
      if (existsSync(base)) walk(base, 1, base)
    }
    out.push([L.name, [...new Set(files)].sort(), Number(L.weight === undefined ? 3 : L.weight)])
  }
  return out
}

function layers(home) {
  return loadLayers(home)
}

function encFiles(dir) {
  try {
    return readdirSync(dir)
      .filter((f) => f.endsWith('.enc') || f.endsWith('.md'))
      .map((f) => join(dir, f))
  } catch { return [] }
}

function skillFiles(home) {
  const dir = join(home, 'skills')
  try {
    return readdirSync(dir).map((d) => join(dir, d, 'SKILL.md')).filter((p) => existsSync(p))
  } catch { return [] }
}

const CHUNK_TARGET = {}

const CHUNK_VERSION = 'v3-fmhead'

function chunkText(text, target = 400, hard = 1600) {
  const out = []
  let buf = []
  let startLine = 1
  let curLine = 1
  const flush = () => {
    if (buf.length) { out.push([startLine, buf.join('\n')]); buf = [] }
  }

  let body = text
  let baseLine = 1
  const _fm = FM_HEAD_RE.exec(text)
  if (_fm) {
    const head = []
    for (const line of _fm[1].split('\n')) {
      if (FM_KEEP.includes(line.split(':')[0].trim())) head.push(line.trim())
    }
    if (head.length) out.push([1, head.join('\n')])
    body = text.slice(_fm[0].length)
    baseLine = (_fm[0].match(/\n/g) || []).length + 1
  }
  startLine = curLine = baseLine
  for (const raw of body.split('\n')) {
    if (raw.trim() === '') { flush(); startLine = curLine + 1 }
    else { if (!buf.length) startLine = curLine; buf.push(raw) }
    curLine += 1
  }
  flush()
  const merged = []
  let mbuf = [], mbufLn = null, mlen = 0
  const mflush = () => {
    if (mbuf.length) { merged.push([mbufLn, mbuf.join('\n\n')]); mbuf = []; mbufLn = null; mlen = 0 }
  }
  for (const [ln, seg] of out) {
    const isHead = seg.trimStart().startsWith('#')
    if (mbuf.length && (isHead || mlen + seg.length > target)) mflush()
    if (!mbuf.length) mbufLn = ln
    mbuf.push(seg)
    mlen += seg.length + 2
  }
  mflush()
  const fine = []
  for (let [ln, seg] of merged) {
    while (seg.length > hard) {
      let cut = seg.lastIndexOf('。', target)
      cut = cut > 200 ? cut + 1 : target
      fine.push([ln, seg.slice(0, cut)])
      seg = seg.slice(cut)
    }
    fine.push([ln, seg])
  }
  return fine.filter(([, s]) => s.trim().length >= 20)
}

const STOP = new Set(['怎么', '如何', '什么', '为什么', '哪个', '哪些', '是否', '可以', '需要', '我们', '现在', '的', '了', '吗', '呢', '吧'])

const STOP_SPLIT = new RegExp(
  [...STOP].filter((w) => w.length >= 2).sort((a, b) => b.length - a.length).join('|'))

function termsOf(q) {
  const parts = String(q || '').split(/[\s，。、；：？！,.;:?!（）()\[\]"'“”‘’]+/).filter(Boolean)

  let out = []
  for (const t of parts) {

    for (const sub of t.trim().split(STOP_SPLIT)) {
      const s = sub.trim()
      if (s.length >= 2 && !STOP.has(s)) out.push(s)
    }
  }
  if (!out.length && q) out.push(String(q).trim())
  const TAIL = ['多少', '多久', '什么时候', '什么样', '怎么样', '是什么', '哪里', '几个', '几次', '了吗', '呢', '吧', '的', '了']
  const FILLER = ['注意事项', '相关内容', '相关', '内容', '情况', '方法', '办法', '介绍', '说明', '东西', '事情']
  const ALL = TAIL.concat(FILLER)
  const stripped = []
  for (let t of out) {
    let changed = true
    while (changed) {
      changed = false
      for (const w of ALL) {
        if (t.length > w.length + 1 && t.endsWith(w)) { t = t.slice(0, t.length - w.length); changed = true; break }
      }
    }
    if (t.length >= 2) stripped.push(t)
  }
  out = stripped.length ? stripped : out
  const expanded = []
  for (const t of out) {
    if (t.length >= 6 && /[\u4e00-\u9fff]/.test(t)) {
      const wins = []
      for (let i = 0; i + 4 <= t.length; i += 2) wins.push(t.slice(i, i + 4))
      const tail = t.slice(-4)
      if (!wins.includes(tail)) wins.push(tail)
      expanded.push(...wins)
    } else expanded.push(t)
  }
  return expanded.length ? expanded : out
}

let SYN_CACHE = null
function synMap() {
  if (SYN_CACHE) return SYN_CACHE
  const out = {}
  try {
    const data = JSON.parse(readFileSync(join(homedir(), '.dsh', 'synonyms.json'), 'utf8'))
    for (const [a, b] of data.pairs || []) {
      ;(out[a] = out[a] || []).push(b)
      ;(out[b] = out[b] || []).push(a)
    }
  } catch {  }
  SYN_CACHE = out
  return out
}
function expandSynonyms(terms, raw) {
  const m = synMap()
  const q = String(raw || terms.join(' ')).toLowerCase()
  const tset = new Set(terms.map((t) => t.toLowerCase()))
  const out = []
  for (const [k, vs] of Object.entries(m)) {
    const kl = k.toLowerCase()
    const hit = kl.length >= 2 ? q.includes(kl) : tset.has(kl)
    if (hit) out.push(...vs)
  }
  return [...new Set(out)].filter((x) => !tset.has(x.toLowerCase()))
}

function bigrams(text) {
  const out = []
  for (const run of String(text).match(/[\u4e00-\u9fff]+|[A-Za-z0-9_./-]+/g) || []) {
    if (/[\u4e00-\u9fff]/.test(run)) {
      if (run.length > 1) for (let i = 0; i + 2 <= run.length; i++) out.push(run.slice(i, i + 2))
      else out.push(run)
    } else out.push(run)
  }
  return out
}

const EMPTY_SET = new Set()
let _tagCache = null, _tagAt = 0
function tagMapOf(db) {
  const now = Date.now()
  if (_tagCache && now - _tagAt < 5000) return _tagCache
  const byPath = new Map()
  try {
    for (const r of db.prepare('SELECT path, tag FROM tags').all()) {
      if (!byPath.has(r.path)) byPath.set(r.path, new Set())
      byPath.get(r.path).add(r.tag)
    }
  } catch {  }
  _tagCache = { byPath }
  _tagAt = now
  return _tagCache
}

let _catCache = null, _catAt = 0
function catMapOf(db) {
  const now = Date.now()
  if (_catCache && now - _catAt < 5000) return _catCache
  const byPath = new Map()
  try {
    for (const r of db.prepare('SELECT path, cat FROM cats').all()) byPath.set(r.path, r.cat)
  } catch {  }
  _catCache = { byPath }
  _catAt = now
  return _catCache
}

let _kwCache = null, _kwAt = 0

function chipsOfHead(head) {
  const out = new Set()
  const push = (s) => {
    for (const t of s.replace(/^\[|\]$/g, '').split(/[\s,，、]+/)) {
      const v = t.trim().replace(/^["']|["']$/g, '')
      if (v) out.add(v)
    }
  }

  const arr = /^tags:\s*\n((?:[ \t]+-.*\n?)+)/m.exec(head)
  if (arr) {
    for (const line of arr[1].split('\n')) {
      const v = line.replace(/^[ \t]*-[ \t]*/, '').trim().replace(/^["']|["']$/g, '')
      if (v) out.add(v)
    }
    return [...out]
  }

  const one = /^tags:\s*"?([^"\n]+)"?/m.exec(head)
  if (one) push(one[1])
  return [...out]
}

function kwMapOf(db) {
  const now = Date.now()
  if (_kwCache && now - _kwAt < 5000) return _kwCache
  const m = new Map()
  let rows = []
  try { rows = db.prepare('SELECT path FROM files').all() } catch { return _kwCache || m }
  for (const r of rows) {
    try {
      const chips = chipsOfHead(readText(r.path).slice(0, 1500))
      if (chips.length) m.set(r.path, new Set(chips))
    } catch {  }
  }
  _kwCache = m; _kwAt = now
  return m
}

const DOC_LEVEL_LAYERS = new Set(['docs', 'skills', 'info'])

function collapseByDoc(hits) {
  const seen = new Map()
  const out = []
  for (const h of hits) {
    if (!DOC_LEVEL_LAYERS.has(h.layer)) { out.push({ h, n: 1 }); continue }
    const k = String(h.path)
    const prev = seen.get(k)
    if (prev) { prev.n += 1; continue }
    const rec = { h, n: 1 }
    seen.set(k, rec)
    out.push(rec)
  }
  return out
}

let _sigCache = null, _sigMtime = 0
function importanceOf(path, line, opts) {
  const file = join(homedir(), '.dsh', 'cache', 'mem-signals.json')
  try {
    const st = statSync(file)
    if (!_sigCache || st.mtimeMs !== _sigMtime) {
      _sigCache = JSON.parse(readFileSync(file, 'utf8'))
      _sigMtime = st.mtimeMs
    }
  } catch { _sigCache = _sigCache || {} }
  if (line !== undefined && line !== null) {
    const seg = _sigCache[String(path) + ':' + String(line)]
    if (seg && typeof seg.importance === 'number') return seg.importance
  }
  const v = _sigCache[String(path)]
  if (!(v && typeof v.importance === 'number')) return 50
  if (opts && opts.display) {
    const best = _bestSegImportance(String(path))
    if (best !== null) return best
  }
  if (_hasSegKey(String(path))) {
    return 50
  }
  return v.importance
}

let _bestSeg = null, _bestSegAt = 0
function _bestSegImportance(path) {
  if (!_bestSeg || _bestSegAt !== _sigMtime) {
    _bestSeg = new Map()
    for (const [k, v] of Object.entries(_sigCache || {})) {
      const i = k.lastIndexOf(':')
      if (!(i > 0 && /^\d+$/.test(k.slice(i + 1)))) continue
      const imp = v && typeof v.importance === 'number' ? v.importance : null
      if (imp === null) continue
      const p0 = k.slice(0, i)
      const cur = _bestSeg.get(p0)
      if (cur === undefined || imp > cur) _bestSeg.set(p0, imp)
    }
    _bestSegAt = _sigMtime
  }
  const got = _bestSeg.get(path)
  return got === undefined ? null : got
}

let _segSet = null, _segSetAt = 0
function _hasSegKey(path) {
  if (!_segSet || _segSetAt !== _sigMtime) {
    _segSet = new Set()
    for (const k of Object.keys(_sigCache || {})) {
      const i = k.lastIndexOf(':')
      if (i > 0 && /^\d+$/.test(k.slice(i + 1))) _segSet.add(k.slice(0, i))
    }
    _segSetAt = _sigMtime
  }
  return _segSet.has(path)
}

function _tie(a, b) {
  if (b.score !== a.score) return b.score - a.score
  const pa = String(a.path), pb = String(b.path)
  if (pa !== pb) return pa < pb ? -1 : 1
  return (Number(a.line) || 0) - (Number(b.line) || 0)
}
function scoreRows(rows, query, minWcov = 0.25, wantWhy = false) {
  const ts = termsOf(query)
  const qb = new Set(bigrams(ts.join(' ')).map((b) => b.toLowerCase()))
  const scored = []
  const cand = []
  const gdf = new Map()
  for (const r of rows) {
    const low = r.body.toLowerCase()
    const hit = []
    for (const b of qb) if (low.includes(b)) hit.push(b)
    if (!hit.length) continue
    for (const b of hit) gdf.set(b, (gdf.get(b) || 0) + 1)
    cand.push({ r, low, hit })
  }
  const nCand = Math.max(1, cand.length)
  const wid = new Map()
  for (const b of qb) {
    const d = gdf.get(b) || 0
    wid.set(b, d ? Math.log((nCand - d + 0.5) / (d + 0.5) + 1) : 0)
  }
  let wsum = 0
  for (const b of qb) wsum += wid.get(b) || 0
  if (!wsum) wsum = 1
  const floor = qb.size <= 1 ? 1 : 2
  for (const { r, low, hit } of cand) {
    if (hit.length < floor) continue
    let wcov = 0
    for (const b of hit) wcov += wid.get(b) || 0
    wcov /= wsum
    if (wcov < minWcov) continue
    const cov = hit.length
    const exact = ts.filter((t) => t.length >= 2 && low.includes(t)).length
    const ratio = cov / Math.max(1, qb.size)
    const rel = ratio * 40 + cov * 6 + exact * 25 - r.body.length / 1500
    const _imp = importanceOf(r.path, r.line, { forScore: true })
    const _wm = 1 + (r.weight - 3) * 0.06
    let score = rel * _wm * (0.75 + 0.5 * _imp / 100)
    const LAYER_MUL = { daily: 0.78, log: 0.78, reviews: 0.85 }
    const _layerMul = LAYER_MUL[r.layer] || 1
    score *= _layerMul
    let _decayVal = 1, _decayDays = 0
    if (['daily', 'logs', 'reviews'].includes(r.layer)) {
      const dm = /(\d{4})-(\d{2})-(\d{2})/.exec(String(r.path))
      if (dm) {
        const then = new Date(+dm[1], +dm[2] - 1, +dm[3])
        const days = Math.floor((Date.now() - then.getTime()) / 86400000)
        const decay = Math.max(0.85, 1 - days * 0.02)
        if (decay < 0.999) { score *= decay; _decayVal = decay; _decayDays = days }
      }
    }
    let _isHead = false
    if (Number(r.line) === 1 && /(?:title|description|name):/.test(r.body)) { score += exact * 20 + cov * 3; _isHead = true }
    const kwm = /tags:([^\n]*)/.exec(r.body)
    let _kh = 0
    if (kwm) {
      const kw = kwm[1].toLowerCase()
      for (const b of qb) if (kw.includes(b)) _kh++
      if (_kh >= 2) score += _kh * 15
    }
    let _why = null
    if (wantWhy) {
      const parts = [`覆盖 ${cov}/${qb.size} 加权${Math.round(wcov * 100)}%`, `原词 ${exact}`]
      if (_decayVal < 0.999) parts.push(`衰减×${_decayVal.toFixed(2)}(${_decayDays}天)`)
      if (_isHead) parts.push('头部段')
      if (_kh >= 2) parts.push(`关键词命中${_kh}`)
      if (r.layer) parts.push(`层系数×${_layerMul.toFixed(2)}`)
      if (_imp !== 50) parts.push(`重要 ${Math.round(_imp)}`)
      _why = parts.join(' · ')
    }
    scored.push({ ...r, score, why: _why })
  }
  scored.sort(_tie)
  return scored
}

function openDb(dbPath) {
  mkdirSync(dirname(dbPath), { recursive: true })
  const db = new DatabaseSync(dbPath)
  db.exec('PRAGMA journal_mode=WAL')
  db.exec(`CREATE TABLE IF NOT EXISTS files(
    path TEXT PRIMARY KEY, layer TEXT, weight INTEGER, mtime REAL, hash TEXT, size INTEGER)`)
  for (const t of ['chunks', 'chunks_record']) {
    db.exec(`CREATE VIRTUAL TABLE IF NOT EXISTS ${t} USING fts5(
      body, path UNINDEXED, layer UNINDEXED, line UNINDEXED, weight UNINDEXED, tokenize='trigram')`)
  }
  db.exec(`CREATE TABLE IF NOT EXISTS chunk_ts(
    path TEXT, line INTEGER, ts TEXT, ts_end TEXT, PRIMARY KEY(path, line))`)
  return db
}

function syncFacets(db, home) {

  const catN = new Map()
  const tagN = new Map()
  const bump = (map, zone, value) => {
    const k = zone + '\u0000' + value
    map.set(k, (map.get(k) || 0) + 1)
  }

  const HDR = 16384
  for (const [, files] of layers(home)) {
    for (const f of files) {
      let text = ''
      let fd = null
      try {
        fd = openSync(f, 'r')
        const buf = Buffer.alloc(HDR)
        const got = readSync(fd, buf, 0, HDR, 0)
        if (got > 0) text = buf.toString('utf8', 0, got)
      } catch { continue } finally { if (fd !== null) { try { closeSync(fd) } catch {  } } }
      const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)
      if (!m) continue
      const fm = m[1]
      const zone = isArchived(f) ? 'cold' : 'hot'
      const cv = /^category\s*:\s*(.*)$/m.exec(fm)
      if (cv) {
        const v = cv[1].trim().replace(/^["']|["']$/g, '')
        for (const part of v.split(/[,，、]+/)) {
          const x = part.trim()
          if (x) bump(catN, zone, x)
        }
      }
      const tv = /^tags\s*:\s*(.*)$/m.exec(fm)
      if (tv) {
        const v = tv[1].trim().replace(/^["']|["']$/g, '')
        for (const x of v.split(/[\s,]+/)) if (x) bump(tagN, zone, x)
      }
    }
  }

  db.exec(`CREATE TABLE IF NOT EXISTS facets(
    kind TEXT NOT NULL, zone TEXT NOT NULL, value TEXT NOT NULL, n INT NOT NULL,
    PRIMARY KEY (kind, zone, value)) WITHOUT ROWID`)
  db.prepare('DELETE FROM facets').run()
  const ins = db.prepare('INSERT OR REPLACE INTO facets(kind, zone, value, n) VALUES(?,?,?,?)')
  for (const [k, n] of catN) { const [z, v] = k.split('\u0000'); ins.run('category', z, v, n) }
  for (const [k, n] of tagN) { const [z, v] = k.split('\u0000'); ins.run('tag', z, v, n) }

  const distinct = (m) => new Set([...m.keys()].map((k) => k.split('\u0000')[1])).size
  return { categories: distinct(catN), tags: distinct(tagN) }
}

function indexAll(db, home, { quiet = true } = {}) {
  let added = 0, chunks = 0, skipped = 0
  const seen = new Set()
  const fileMap = new Map(
    db.prepare('SELECT path, hash, mtime, size, layer FROM files').all().map((r) => [r.path, r]))
  const tsSet = new Set(
    db.prepare('SELECT DISTINCT path FROM chunk_ts').all().map((r) => r.path))
  const delChunk = {
    chunks: db.prepare('DELETE FROM chunks WHERE path = ?'),
    chunks_record: db.prepare('DELETE FROM chunks_record WHERE path = ?'),
  }
  const insChunk = {
    chunks: db.prepare('INSERT INTO chunks(body, path, layer, line, weight) VALUES(?,?,?,?,?)'),
    chunks_record: db.prepare('INSERT INTO chunks_record(body, path, layer, line, weight) VALUES(?,?,?,?,?)'),
  }
  const selTs = db.prepare('SELECT 1 AS ok FROM chunk_ts WHERE path = ? LIMIT 1')
  const delTs = db.prepare('DELETE FROM chunk_ts WHERE path = ?')
  const insTs = db.prepare('INSERT OR REPLACE INTO chunk_ts(path, line, ts, ts_end) VALUES(?,?,?,?)')
  const upsert = db.prepare(`INSERT OR REPLACE INTO files(path, layer, weight, mtime, hash, size)
                             VALUES(?,?,?,?,?,?)`)
  for (const [layer, files, weight] of layers(home)) {
    for (const f of files) {
      if (!f || !existsSync(f)) continue
      const st = statSync(f)
      const prev = fileMap.get(f)
      const hasTs = tsSet.has(f)
      if (prev && hasTs && Math.round(prev.mtime * 1000) === Math.round(st.mtimeMs)
          && prev.size === st.size && prev.layer === layer) {
        skipped++; seen.add(f); continue
      }
      const text = readText(f)
      const h = createHash('sha256').update(text).update(CHUNK_VERSION).digest('hex').slice(0, 16)
      if (prev && prev.hash === h && hasTs && prev.layer === layer) {
        upsert.run(f, layer, weight, st.mtimeMs / 1000, h, st.size)
        skipped++; seen.add(f); continue
      }
      for (const t of ALL_TABLES) delChunk[t].run(f)
      delTs.run(f)
      const parts = chunkText(text, CHUNK_TARGET[layer] || 400)
      const _tbl = tblOf(layer, f)
      for (const [ln, body] of parts) insChunk[_tbl].run(body, f, layer, ln, weight)
      const secs = sectionTimes(text, f, st.mtimeMs / 1000)
      if (parts.length === 0) {
        insTs.run(f, 0, String(st.mtimeMs / 1000), String(st.mtimeMs / 1000))
      }
      for (const [ln] of parts) {
        const [ts, te] = tsOf(secs, ln)
        insTs.run(f, ln, ts, te)
      }
      upsert.run(f, layer, weight, st.mtimeMs / 1000, h, st.size)
      added++; chunks += parts.length; seen.add(f)
    }
  }
  const all = db.prepare('SELECT path FROM files').all()
  let removed = 0
  for (const { path } of all) {
    if (!seen.has(path)) {
      removed++
      for (const t of ALL_TABLES) delChunk[t].run(path)
      db.prepare('DELETE FROM chunk_ts WHERE path = ?').run(path)
      db.prepare('DELETE FROM files WHERE path = ?').run(path)
    }
  }

  let facets = null
  let haveFacets = false
  try { haveFacets = db.prepare('SELECT COUNT(*) AS n FROM facets').get().n > 0 } catch { haveFacets = false }
  if (added || removed || !haveFacets) facets = syncFacets(db, home)
  const total = ALL_TABLES.reduce((a, t) => a + db.prepare(`SELECT COUNT(*) AS n FROM ${t}`).get().n, 0)
  return { added, chunks, skipped, total, facets }
}

function splitEntries(file, text) {
  const lines = text.split('\n')
  const out = []
  let cur = { index: 0, body: '', start: 1 }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^## /.test(line) && cur.body.trim()) {
      out.push({ index: out.length, body: cur.body.trim(), start: cur.start })
      cur = { index: 0, body: line + '\n', start: i + 1 }
    } else cur.body += line + '\n'
  }
  if (cur.body.trim()) out.push({ index: out.length, body: cur.body.trim(), start: cur.start })
  return out
}

function parseFrontmatter(text) {
  const t = String(text || "")
  if (!t.startsWith("---")) return { meta: null, raw: "", body: t }
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(t)
  if (!m) return { meta: null, raw: "", body: t }
  const raw = m[1]
  const body = t.slice(m[0].length)
  const meta = {}
  let cur = null
  for (const line of raw.split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line)
    if (kv) {
      cur = kv[1]
      let v = kv[2].trim()
      if (v === "[]") { meta[cur] = []; continue }
      if (v === "") { meta[cur] = []; continue }
      meta[cur] = v.replace(/^"(.*)"$/s, "$1").replace(/^'(.*)'$/s, "$1")
      continue
    }
    const li = /^\s+-\s*(.*)$/.exec(line)
    if (li && cur) {
      if (!Array.isArray(meta[cur])) meta[cur] = []
      meta[cur].push(li[1].trim().replace(/^"(.*)"$/s, "$1"))
    }
  }
  return { meta, raw, body }
}

const FM_HUMAN = ["title", "description", "category", "tags", "status", "created_at", "updated_at", "name"]
const FM_MACHINE = ["id", "content_hash", "source_paths", "session_ids", "memory_body_ids",
  "snippet_from"]

function hasValue(v) {
  if (v === undefined || v === null) return false
  if (Array.isArray(v)) return v.length > 0
  return String(v).trim() !== ''
}

function headingOf(body) {
  const m = body.match(/^#{1,3}\s+(.+)$/m) || body.match(/^【([^】]+)】/)
  if (m) return m[1].trim().slice(0, 60)
  return body.replace(/\s+/g, ' ').trim().slice(0, 60)
}

function joinEntries(file, entries) {
  return entries.map((e) => e.body.trim()).join('\n\n') + '\n'
}

function fileLabel(file, text, layer) {
  const base = basename(file)
  if (layer === 'daily') {
    const h2 = /^##\s+(.+)$/m.exec(text || '')
    if (h2) {
      const t = h2[1].replace(/\s+/g, ' ').trim()
      if (t) return t
    }
    return base.replace(/\.md$/i, '')
  }
  const parent = basename(dirname(file))
  if (parent === 'changelog' || parent === 'outbound' || parent === 'reviews') {
    return base.replace(/\.md$/i, '')
  }
  if (base === 'SKILL.md') return basename(dirname(file))
  if (base === 'ITERATIONS.md') return basename(dirname(file))
  if (layer === 'docs') {
    const fmTitle = parseFrontmatter(text || '').meta?.title
    if (typeof fmTitle === 'string' && fmTitle.trim()) {
      return fmTitle.replace(/\s+/g, ' ').trim()
    }
  }
  const h1 = text.match(/^#\s+(.+)$/m)
  if (h1) {
    const t = h1[1].replace(/\s+/g, ' ').trim()
    if (t && t.length <= 42) return t
  }
  return base
    .replace(/\.md$/i, '')
    .replace(/-[0-9a-f]{6,12}$/i, '')
    .replace(/[-_]{2,}/g, '-')
    .trim() || base
}

const SKILL_GROUPS = {
  '上下文': '🔄 上下文与压缩',
  '循环': '🔁 自主循环',
  'DSH本体': '⚙️ DSH 本体',
  '桌面': '🖥 桌面',
  '社交': '💬 社交账号',
  '技能': '🧠 技能与记忆',
  '技能与记忆': '🧠 技能与记忆',
  '借鉴': '📚 借鉴',
}

function groupOf(layer, file, text) {
  if (layer === 'docs' || layer === 'skills') {
    const m = /^category:\s*"?([^"\n]+)"?/m.exec(text || '')
    const cat = m ? m[1].trim() : ''
    if (cat) return SKILL_GROUPS[cat] || ('📁 ' + cat)
    return '未分类'
  }
  if (layer === 'logs') {

    const dir = basename(dirname(file))
    if (dir === 'changelog' || dir === 'outbound') return dir

    if (file.includes('/logs/skills/')) return 'skills'

    return dir || 'logs'
  }
  if (layer === 'daily') {
    const dir = basename(dirname(file))
    return dir === 'daily' ? basename(file).replace(/\.md$/i, '') : dir
  }

  if (layer === 'info') return ''
  if (layer === 'profiles') {
    const dir = basename(dirname(file))

    if (dir === 'users') return '👤 users'
    if (dir === 'tgchats') return '💬 tgchats'
    return '📁 ' + dir
  }
  return ''
}

function groupDirOf(layer, file) {
  if (layer === 'daily') {
    const dir = dirname(file)
    if (basename(dir) !== 'daily') return dir
    const sub = join(dir, basename(file).replace(/\.md$/i, ''))
    return existsSync(sub) ? sub : dir
  }
  if (layer === 'logs') {

    if (file.includes('/logs/skills/')) return dirname(dirname(file))
    return dirname(file)
  }
  if (layer === 'profiles') return dirname(file)
  if (layer === 'info') return ''
  return ''
}

const LAYER_DIRS = {
  docs: 'docs', skills: 'skills', daily: 'daily',
  reviews: 'reviews', logs: 'logs', info: 'info',
  profiles: 'profiles',
}

const _treeCache = new Map()
const _TREE_CACHE_VER = 14

function _fileSig(st) {
  return `${st.mtimeMs}:${st.size}`
}

function buildTree(home) {
  const out = []
  const seen = new Set()
  for (const [layer, files, weight] of layers(home)) {
    const items = []
    for (const f of files) {
      if (!f || !existsSync(f)) continue
      seen.add(f)
      let st = null
      try { st = statSync(f) } catch { continue }
      const sig = _fileSig(st)
      const hit = _treeCache.get(f)
      if (hit && hit.sig === sig && hit.ver === _TREE_CACHE_VER) {
        items.push({ path: f, name: basename(f), label: hit.label,
                     chars: hit.chars, entries: hit.entries, group: hit.group,
                     groupDir: hit.groupDir, zone: tblOf(layer, f) === 'chunks_record' ? 'cold' : 'hot' })
        continue
      }
      let text = ''
      text = readText(f)
      const fm0 = parseFrontmatter(text)
      let entries = splitEntries(f, text).map((e) => {
        const inner = parseFrontmatter(e.body).body
        const hd = headingOf(inner) || (fm0.meta && fm0.meta.title) || '(文件头)'
        return { index: e.index, heading: hd, chars: e.body.length,
                 hasBody: inner.trim().length > 0 }
      })
      const label = fileLabel(f, text, layer)
      const _normLabel = (s) => (s || '').replace(/\s+/g, ' ').trim().slice(0, 60)
      entries = entries.filter((e) => _normLabel(e.heading) !== _normLabel(label))
      entries = entries.filter((e) => e.hasBody).map(({ hasBody, ...rest }) => rest)
      const group = groupOf(layer, f, text)
      const groupDir = groupDirOf(layer, f)
      const z = tblOf(layer, f) === 'chunks_record' ? 'cold' : 'hot'
      _treeCache.set(f, { sig, ver: _TREE_CACHE_VER, chars: text.length, label, entries, group, groupDir, zone: z })
      items.push({
        path: f, name: basename(f), label,
        chars: text.length, entries, group, groupDir, zone: z,
      })
    }
    if (items.length) out.push({
      layer, weight, flat: false, files: items,
      dir: LAYER_DIRS[layer] ? join(home, LAYER_DIRS[layer]) : '',
    })
  }
  for (const k of _treeCache.keys()) if (!seen.has(k)) _treeCache.delete(k)
  return out
}

function normTime(v, upper = false) {
  const t = String(v || '').trim()
  if (!t) return ''
  const z = (hms) => (hms.length <= 5 ? hms.padStart(5, '0') : hms.padStart(8, '0'))
  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(t)) return padTs(`${ymd(new Date())} ${z(t)}`)
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return `${t} ${upper ? '23:59:59' : '00:00:00'}`
  const m = /^(\d{4}-\d{2}-\d{2})[ T](\d{1,2}:\d{2}(?::\d{2})?)/.exec(t)
  if (m) return padTs(`${m[1]} ${z(m[2])}`)
  return t
}

function hotWindowDefaults() { return { daily: 3, log: 3, reviews: 7 } }
let _HW_CACHE = null, _HW_MTIME = -1
function hotWindow() {
  const def = hotWindowDefaults()
  try {
    const f = layersFile(join(homedir(), '.dsh'))
    const mt = statSync(f).mtimeMs
    if (_HW_CACHE && _HW_MTIME === mt) return _HW_CACHE
    const cfg = JSON.parse(readFileSync(f, 'utf8'))
    const o = {}
    for (const L of (cfg.layers || [])) {
      if (L && L.name && L.window != null) o[L.name] = Math.max(0, Number(L.window) || 0)
    }
    for (const k of Object.keys(def)) if (!(k in o)) o[k] = def[k]
    _HW_CACHE = o; _HW_MTIME = mt
    return o
  } catch { return def }
}
function dayOfPath(p) {
  const m = String(p).match(/(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return null
  const d = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

function isArchived(p) {
  const c = coldRootCached(join(homedir(), '.dsh'))
  const s = String(p)
  return s === c || s.startsWith(c + sep)
}

function zoneOf(p) {
  const home = join(homedir(), '.dsh')
  const cfg = JSON.parse(readFileSync(layersFile(home), 'utf8'))
  const R = rootOf(cfg, home)
  const C = coldRootOf(cfg, home)
  const s = String(p)
  if (s === C || s.startsWith(C + sep)) return { cold: true, root: R, coldRoot: C, rel: relative(C, s) }
  if (s === R || s.startsWith(R + sep)) return { cold: false, root: R, coldRoot: C, rel: relative(R, s) }
  return null
}
function tblOf(layer, p) {
  if (isArchived(p)) return 'chunks_record'
  if (!(layer in hotWindowDefaults())) return 'chunks'
  const d = dayOfPath(p)
  if (!d) return 'chunks'
  const keep = hotWindow()[layer]
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const days = Math.round((today.getTime() - d.getTime()) / 86400000)
  return days <= keep ? 'chunks' : 'chunks_record'
}

const RECORD_LAYERS = new Set(['daily', 'logs'])
const ALL_TABLES = ['chunks', 'chunks_record']
function tablesFor(lf, zone) {
  if (zone === 'none') return []
  if (zone === 'cold') return ['chunks_record']
  if (zone === 'both' || zone === 'all' || zone === true) return ALL_TABLES
  if (zone === 'hot') return ['chunks']

  if (!lf || !lf.size) return ALL_TABLES

  for (const x of lf) if (x in hotWindowDefaults() || x === 'skills') return ALL_TABLES
  return ['chunks']
}

function search(db, query, limit, layer, opts) {
  const o = opts || {}
  const zone = o.zone || (o.all ? 'both' : undefined)
  const lf = layer ? new Set(String(layer).split(',').map((x) => x.trim()).filter(Boolean)) : null
  const sp = (v) => String(v || '').split(/[\s,]+/).filter(Boolean)
  const must = sp(o.must).map((w) => w.toLowerCase())
  const not = sp(o.not).map((w) => w.toLowerCase())
  const pathSub = String(o.path || '').toLowerCase()
  const cats = sp(o.category || o.cat).map((w) => w.toLowerCase())
  const since = String(o.since || '').trim()
  const cAfter = normTime(o.createdAfter || o['created-after'])
  const cBefore = normTime(o.createdBefore || o['created-before'], true)
  const mAfter = normTime(o.modifiedAfter || o['modified-after'])
  const mBefore = normTime(o.modifiedBefore || o['modified-before'], true)
  const after = normTime(o.after)
  const before = normTime(o.before, true)
  const wantTime = !!(cAfter || cBefore || mAfter || mBefore || after || before)
  const tagList = sp(o.tags || o.tag)
  const secTags = tagList.length ? tagMapOf(db) : null
  const fileKws = tagList.length ? kwMapOf(db) : null
  const passTag = (p, line) => {
    if (!tagList.length) return true
    const have = secTags.byPath.get(String(p)) || EMPTY_SET
    const fk = fileKws.get(String(p)) || EMPTY_SET
    return tagList.every((t) => have.has(t) || fk.has(t))
  }
  const _num = (v) => {
    if (v === null || v === undefined || String(v).trim() === '') return null
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  }
  const minImp = _num(o.minimp)
  const maxImp = _num(o.maximp)
  const wantImp = minImp !== null || maxImp !== null
  const passImp = (p, line) => {
    if (!wantImp) return true
    const v = importanceOf(p, line)
    if (minImp !== null && v < minImp) return false
    if (maxImp !== null && v > maxImp) return false
    return true
  }
  const tsMap = new Map()
  if (wantTime) {
    for (const r of db.prepare('SELECT path, line, ts, ts_end FROM chunk_ts').all()) {
      tsMap.set(r.path + '\u0000' + r.line, [r.ts, r.ts_end])
    }
  }
  const passTime = (p, line) => {
    if (!wantTime) return true
    const v = tsMap.get(p + '\u0000' + line)
    if (!v || !v[0]) return false
    const [ts, te] = v
    const mod = te || ts
    if (after && mod < after) return false
    if (before && ts > before) return false
    if (cAfter && ts < cAfter) return false
    if (cBefore && ts > cBefore) return false
    if (mAfter && mod < mAfter) return false
    if (mBefore && mod > mBefore) return false
    return true
  }
  let rows = []
  for (const t of tablesFor(lf, zone)) {
    rows = rows.concat(db.prepare(`SELECT body, path, layer, line, weight, '${t}' AS tbl FROM ${t}`).all())
  }
  if (lf) rows = rows.filter((r) => lf.has(r.layer))
  const catCache = new Map()
  const catOf = (p) => {
    if (catCache.has(p)) return catCache.get(p)
    let c = ''
    try {
      const head = readText(p).slice(0, 1500)
      const m = /^category:\s*"?([^"\n]+)"?/m.exec(head)
      c = m ? m[1].trim().toLowerCase() : ''
    } catch { c = '' }
    catCache.set(p, c)
    return c
  }
  const dateOf = (p) => {
    const m = /(\d{4}-\d{2}-\d{2})/.exec(String(p))
    return m ? m[1] : ''
  }
  const passDate = (p) => !since || !dateOf(p) || dateOf(p) >= since
  if (must.length || not.length || pathSub || cats.length || since || wantTime || secTags || wantImp) {
    rows = rows.filter((r) => {
      const low = r.body.toLowerCase()
      for (const w of must) if (!low.includes(w)) return false
      for (const w of not) if (low.includes(w)) return false
      if (pathSub && !String(r.path).toLowerCase().includes(pathSub)) return false
      if (!passDate(r.path)) return false
      if (cats.length) {
        const fc = catOf(r.path)
        if (!cats.some((c) => fc.includes(c))) return false
      }
      if (!passTime(r.path, r.line)) return false
      if (!passTag(r.path, r.line)) return false
      if (!passImp(r.path, r.line)) return false
      return true
    })
  }
  if (!rows.length) return []
  if (!String(query || '').trim()) {
    return rows
      .map((r) => ({ ...r, score: 50 + (r.weight || 0) * 6 - r.body.length / 2000 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }
  const scored = scoreRows(rows, query, 0.25, !!(opts && opts.why))
  const ts = termsOf(query)
  const ascii = ts.filter((t) => /^[A-Za-z0-9_./-]+$/.test(t))
  if (ascii.length) {
    const fts = ascii.map((t) => '"' + t.replace(/"/g, '""') + '"').join(' OR ')
    let ftsRows = []
    for (const t of tablesFor(lf, zone)) {
      try {
        ftsRows = ftsRows.concat(db.prepare(
          `SELECT body, path, layer, line, weight, '${t}' AS tbl FROM ${t} WHERE ${t} MATCH ? ORDER BY bm25(${t}, 1.0) LIMIT ?`,
        ).all(fts, limit * 8))
      } catch {  }
    }
    const seen = new Set(scored.map((r) => r.path + ':' + r.line))
    for (const r of ftsRows) {
      if (seen.has(r.path + ':' + r.line)) continue
      if (lf && !lf.has(r.layer)) continue
      const low2 = r.body.toLowerCase()
      if (must.some((w) => !low2.includes(w))) continue
      if (not.some((w) => low2.includes(w))) continue
      if (pathSub && !String(r.path).toLowerCase().includes(pathSub)) continue
      if (!passDate(r.path)) continue
      if (cats.length) {
        const fc2 = catOf(r.path)
        if (!cats.some((c) => fc2.includes(c))) continue
      }
      if (!passTime(r.path, r.line)) continue
      if (!passTag(r.path, r.line)) continue
      if (!passImp(r.path, r.line)) continue
      scored.push({ ...r, score: 40 + ascii.length * 6 + r.weight * 6 })
    }
    scored.sort(_tie)
  }
  const syn = expandSynonyms(ts, query)
  const seenMain = new Set(scored.map((r) => r.path + ':' + r.line))
  if (syn.length) {
    const sqb = new Set(bigrams(syn.join(' ')).map((b) => b.toLowerCase()))
    const need2 = Math.min(sqb.size, Math.max(1, Math.floor(sqb.size * 0.5)))
    const synRows = []
    const synHits = []
    for (const t of tablesFor(lf, zone)) {
      synRows.push(...db.prepare(`SELECT body, path, layer, line, weight, '${t}' AS tbl FROM ${t}`).all())
    }
    for (const r of synRows) {
      if (seenMain.has(r.path + ':' + r.line)) continue
      if (lf && !lf.has(r.layer)) continue
      if (pathSub && !String(r.path).toLowerCase().includes(pathSub)) continue
      if (!passDate(r.path)) continue
      if (cats.length) {
        const fc3 = catOf(r.path)
        if (!cats.some((c) => fc3.includes(c))) continue
      }
      if (!passTime(r.path, r.line)) continue
      if (!passTag(r.path, r.line)) continue
      if (!passImp(r.path, r.line)) continue
      const low3 = r.body.toLowerCase()
      let cov3 = 0
      for (const b of sqb) if (low3.includes(b)) cov3++
      if (cov3 < need2) continue
      let exact3 = 0
      for (const t of syn) if (t.length >= 2 && low3.includes(t.toLowerCase())) exact3++
      const s3 = 10 + cov3 * 3 + exact3 * 6 + r.weight * 3 - r.body.length / 2000
      synHits.push({ ...r, score: s3, synHit: syn.slice(0, 3).join('/') })
    }
    synHits.sort((a, b) => b.score - a.score)
    scored.push(...synHits.slice(0, 3))
  }
  const perFile = 2
  const capLayer = Math.max(2, Math.floor(Math.max(limit * 2, 20) * 0.6))
  const out = [], cntFile = {}, cntLayer = {}
  for (const r of scored) {
    if ((cntFile[r.path] || 0) >= perFile) continue
    if ((cntLayer[r.layer] || 0) >= capLayer) continue
    out.push(r)
    cntFile[r.path] = (cntFile[r.path] || 0) + 1
    cntLayer[r.layer] = (cntLayer[r.layer] || 0) + 1
  }
  if (out.length < scored.length) {
    const seen = new Set(out.map((r) => r.path + ':' + r.line))
    for (const r of scored) if (!seen.has(r.path + ':' + r.line)) out.push(r)
  }
  return out.slice(0, limit)
}

function logAccess(paths, src = 'panel') {
  try {
    if (!paths || !paths.length) return
    const uniq = [...new Set(paths.map(String))]
    const dir = join(homedir(), '.dsh', 'cache')
    mkdirSync(dir, { recursive: true })
    appendFileSync(join(dir, 'mem-access.jsonl'),
      JSON.stringify({ t: Date.now(), src, paths: uniq }) + '\n', 'utf8')
  } catch {  }
}

function pack(db, query, limit = 10, budget = 6000) {
  const all = []
  for (const t of ALL_TABLES) {
    all.push(...db.prepare(`SELECT body, path, layer, line, weight FROM ${t}`).all())
  }
  const picked = []
  const perFile = new Map()
  const seen = new Set()
  let used = 0
  const harvest = (hits, cap) => {
    let got = 0
    for (const h of hits) {
      if (got >= cap || picked.length >= limit) break
      const key = h.path + ':' + h.line
      if (seen.has(key)) continue
      if ((perFile.get(h.path) || 0) >= 2) continue
      const snippet = h.body.replace(/\s+/g, ' ').trim().slice(0, 800)
      if (used + snippet.length > budget) break
      perFile.set(h.path, (perFile.get(h.path) || 0) + 1)
      picked.push({ ...h, snippet })
      seen.add(key)
      used += snippet.length
      got++
    }
  }
  harvest(scoreRows(all, query), Math.max(1, limit - 2))
  if (picked.length < limit) harvest(scoreRows(all, query, 0.12), limit - picked.length)
  picked.sort(_tie)
  return { picked, used }
}

const short = (p) => p.replace(homedir(), '~')

function writeJsonAtomic(file, data) {
  const tmp = `${file}.tmp-${process.pid}`
  writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8')
  renameSync(tmp, file)
}

function saveSkill(home, skillName, body, { description, indexPath } = {}) {
  const dir = join(home, 'skills', skillName)
  mkdirSync(dir, { recursive: true })
  const file = join(dir, 'SKILL.md')
  const prev = existsSync(file) ? readText(file) : ''
  let front = ''
  if (description) {
    const m = prev.match(/^---\n([\s\S]*?)\n---\n/)
    const fm = m ? m[1] : `name: ${skillName}`
    const withDesc = /^description:/m.test(fm)
      ? fm.replace(/^description:.*$/m, `description: ${description}`)
      : `${fm}\ndescription: ${description}`
    front = `---\n${withDesc}\n---\n\n`
  } else if (prev.startsWith('---\n')) {
    front = prev.slice(0, prev.indexOf('\n---\n') + 5) + '\n'
  } else {
    front = `---\nname: ${skillName}\n---\n\n`
  }
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ')
  const note = `- ${stamp} 由 memory-xfy 保存\n`
  const head = '## 迭代记录\n\n'
  let out
  if (body.includes(head)) {
    const i = body.indexOf(head) + head.length
    out = body.slice(0, i) + note + body.slice(i)
  } else {
    out = body.replace(/\s*$/, '') + '\n\n' + head + note
  }
  writeFileSync(file, front + out.replace(/^---\n[\s\S]*?\n---\n\n/, ''), 'utf8')

  const agents = indexPath || join(home, 'AGENTS.md')
  let indexed = false
  if (existsSync(agents)) {
    let a = readText(agents)
    if (!a.includes('`' + skillName + '`')) {
      const row = `| 要用 ${skillName} 时 | \`${skillName}\` |\n`
      if (/^\| 不确定就先/m.test(a)) a = a.replace(/^(\| 不确定就先)/m, row + '$1')
      else if (a.includes('不确定就先 `ls ~/.dsh/skills`')) a = a.replace('不确定就先 `ls ~/.dsh/skills`', row + '不确定就先 `ls ~/.dsh/skills`')
      else a = a.replace(/\s*$/, `\n\n${row}`)
      writeFileSync(agents, a, 'utf8')
      indexed = true
    }
  }
  return { file: short(file), indexed }
}

function b64uDecode(v) {
  const t = String(v).replace(/-/g, '+').replace(/_/g, '/')
  return Buffer.from(t + '='.repeat((4 - t.length % 4) % 4), 'base64')
}
function b64uEncode(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function authOk(req, home) {

  const hdr = (n) => (typeof req.headers?.get === 'function' ? req.headers.get(n) : req.headers?.[n]) || ''
  const host = String(hdr('host'))
  if (host) {
    try {
      const y = readFileSync(join(home, '.credentials.yaml'), 'utf8')
      const m = /client-connection\/browser-session:[\s\S]*?secret:\s*(\S+)/.exec(y)
      if (m) {
        const secret = b64uDecode(m[1])
        const want = 'dsh-auth-' + b64uEncode(createHash('sha256').update(host).digest())
        for (const seg of String(hdr('cookie')).split(';')) {
          const at = seg.indexOf('=')
          if (at === -1 || seg.slice(0, at).trim() !== want) continue
          const parts = seg.slice(at + 1).trim().split('.')
          if (parts.length !== 3 || parts[0] !== 'v1') break
          const sig = b64uDecode(parts[2])
          const expect = createHmac('sha256', secret).update(parts[1]).digest()
          if (sig.length === expect.length && timingSafeEqual(sig, expect)) {
            const payload = JSON.parse(b64uDecode(parts[1]).toString('utf8'))
            if (Number(payload.expiresAt) > Date.now()) return true
          }
        }
      }
    } catch {  }
  }
  try {
    const t = new URL(req.url, 'http://127.0.0.1').searchParams.get('token')
    if (t) {
      const m = /[?&]token=([^&\s]+)/.exec(readFileSync(join(home, 'web-url.txt'), 'utf8'))
      if (m && t === decodeURIComponent(m[1])) return true
    }
  } catch {  }
  return false
}

function originOk(req) {
  const o = req.headers.origin
  if (!o) return true
  try { return new URL(o).host === (req.headers.host || '') } catch { return false }
}

function syncLayersPtr(home) {
  try {
    const own = join(import.meta.dirname, 'layers.json')

    if (!existsSync(own)) {
      try {
        writeFileSync(own, readFileSync(join(import.meta.dirname, 'default-layers.json'), 'utf8'), 'utf8')
        console.error('[memory-xfy] 没找到层配置，已按默认生成：' + own)
      } catch (e) {
        console.error('[memory-xfy] 生成默认层配置失败：', e.message)
      }
    }
    if (!existsSync(own)) return
    const ptr = join(home, '.layers-path')
    try {
      if (readFileSync(ptr, 'utf8').split('\n')[0].trim() === own) return
    } catch {  }
    writeFileSync(ptr, own + '\n', 'utf8')
  } catch (e) {

    console.error('[memory-xfy] 写 .layers-path 失败：', e.message)
  }
}

export function apply(ctx, config = {}) {
  const home = config.home || process.env.DSH_HOME || join(homedir(), '.dsh')
  syncLayersPtr(home)

  const rootCfg = JSON.parse(readFileSync(layersFile(home), 'utf8'))
  const dbPath = config.dbPath || join(rootOf(rootCfg, home), 'cache', 'mem.db')
  const autoIndex = config.autoIndexOnSearch !== false
  const db = openDb(dbPath)

  const ensureFresh = () => { if (autoIndex) { try { return indexAll(db, home) } catch {  } } return null }

  const text = (s) => [{ type: 'text', text: String(s) }]

  const reg = (def) => ctx.effect(() => ctx.tools.register(def))

  reg({
    name: 'mem_search',
    description: '跨全部记忆层（规则/热记忆/文档/技能/日记/复盘/日志）检索，返回命中位置与片段。要查「以前是不是做过、记过什么」时用它。',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '检索词（可多个，空格分隔）或自然语言问题' },
        limit: { type: 'integer', description: '返回条数，默认 20，最多 100', minimum: 1, maximum: 100 },
        layer: { type: 'string', description: '只在某些层里搜，逗号分隔（如 docs,skills,daily）。不填=全部' },
        must: { type: 'string', description: '必须全部包含的词（空格分隔，AND 语义）——用来把候选集砍小' },
        not: { type: 'string', description: '排除含这些词的段（空格分隔）' },
        path: { type: 'string', description: '路径子串，如 docs/ 或 SKILL.md' },
        category: { type: 'string', description: '分类子串，如 技能 / DSH本体 / 社交（读 frontmatter 的 category）' },
        since: { type: 'string', description: '只要这个日期之后的，格式 YYYY-MM-DD（按文件名里的日期，对 daily/reviews/log 有效）' },
        createdAfter: { type: 'string', description: '创建时间起（≥）。格式 HH:MM / HH:MM:SS / YYYY-MM-DD / YYYY-MM-DD HH:MM[:SS]' },
        createdBefore: { type: 'string', description: '创建时间止（≤）。格式同上' },
        modifiedAfter: { type: 'string', description: '修改时间起（≥）。没改过的段按创建时间算' },
        modifiedBefore: { type: 'string', description: '修改时间止（≤）。没改过的段按创建时间算' },
        after: { type: 'string', description: '（旧）等价于 modifiedAfter' },
        before: { type: 'string', description: '（旧）等价于 createdBefore' },
        tags: { type: 'string', description: '小节级 tag 筛选（逗号分隔，AND 语义）。tag 只在我用 mem-tag 标注过的段上存在' },
      },
      required: ['query'],
    },
    output: {
      schema: { type: 'object', properties: { hits: { type: 'array', items: { type: 'object' } } } },
      render: (_a, v) => text((v.hits || []).map((h) => (h.docLevel
        ? `[${h.layer}] ${h.path}（整篇${h.segCount > 1 ? ' · 命中 ' + h.segCount + ' 段' : ''}）\n  ${h.snippet}`
        : `[${h.layer}] ${h.path}:${h.line}\n  ${h.snippet}`)).join('\n\n') || '（没有命中）'),
    },
    execute: async ({ query, limit, layer, must, not, path, category, since, after, before, createdAfter, createdBefore, modifiedAfter, modifiedBefore, tags }) => {
      ensureFresh()
      const all = search(db, query, 10 ** 6, layer, { must, not, path, category, since, after, before, createdAfter, createdBefore, modifiedAfter, modifiedBefore, tags })
      const lim = limit || 20
      const grouped = collapseByDoc(all)
      const hits = grouped.slice(0, lim).map(({ h, n: segN }) => ({
        layer: h.layer, path: short(h.path), line: h.line,
        docLevel: DOC_LEVEL_LAYERS.has(h.layer), segCount: segN,
        snippet: h.body.replace(/\s+/g, ' ').trim().slice(0, 300),
      }))
      return { hits, total: grouped.length, shown: hits.length }
    },
  })

  reg({
    name: 'mem_pack',
    description: '为当前任务生成「记忆简报」：从全部记忆层挑最相关的 2~4 段压缩成一段，可直接读进上下文，不会撑爆窗口。',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '任务或问题描述' },
        budget: { type: 'integer', description: '字符预算，默认 6000', minimum: 400, maximum: 8000 },
      },
      required: ['query'],
    },
    output: {
      schema: { type: 'object', properties: { brief: { type: 'string' }, used: { type: 'integer' } } },
      render: (_a, v) => text(v.brief || '（没有相关内容）'),
    },
    execute: async ({ query, budget }) => {
      ensureFresh()
      const { picked, used } = pack(db, query, 10, budget || 6000)
      const brief = picked.length
        ? `## 记忆简报：${query}\n\n` + picked.map((p) => `- [${p.layer}] ${short(p.path)}:${p.line}\n  ${p.snippet}`).join('\n')
        : ''
      return { brief, used }
    },
  })

  reg({
    name: 'skill_save',
    description: '一步保存技能：写 SKILL.md（保留 frontmatter）+ 自动更新 AGENTS.md 的「情况→技能」索引表 + 追加迭代记录。不需要子智能体。',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: '技能目录名' },
        body: { type: 'string', description: 'SKILL.md 正文（不含 frontmatter）' },
        description: { type: 'string', description: 'frontmatter 的 description（触发语）' },
      },
      required: ['name', 'body'],
    },
    output: {
      schema: { type: 'object', properties: { file: { type: 'string' }, indexed: { type: 'boolean' } } },
      render: (_a, v) => text(`技能已保存 → ${v.file}${v.indexed ? '（已补进 AGENTS.md 索引表）' : ''}`),
    },
    execute: async ({ name: skillName, body, description }) => saveSkill(home, skillName, body, { description }),
  })

  const webServer = ctx.webServer ?? ctx.get('webServer')
  if (webServer) {
    const applySave = (body) => {
      const path = String(body.path || '')
      if (!path || !existsSync(path)) return { ok: false, error: '文件不存在' }
      if (body.whole) {
        const raw = readText(path)
        const m = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/.exec(raw)
        writeText(path, (m ? m[0] : '') + String(body.content ?? ''))
        try { indexAll(db, home) } catch {  }
        return { ok: true, saved: true, whole: true }
      }
      const entries = splitEntries(path, readText(path))
      if (body.delete) {
        entries.splice(Number(body.index), 1)
      } else if (body.content != null) {
        const i = Number(body.index)
        if (i >= 0 && i < entries.length) entries[i].body = String(body.content)
        else entries.push({ index: entries.length, body: String(body.content) })
      } else return { ok: false, error: '没有内容可写' }
      writeText(path, joinEntries(path, entries))
      try { indexAll(db, home) } catch {  }
      return { ok: true, saved: true, entries: entries.length }
    }

    const applyMeta = (body) => {
      const path = String(body.path || '')
      if (!path || !existsSync(path)) return { ok: false, error: '文件不存在' }
      const text = readText(path)
      const fm = parseFrontmatter(text)
      if (!fm.meta) return { ok: false, error: '这个文件没有 frontmatter' }
      const fields = body.fields && typeof body.fields === 'object' ? body.fields : {}
      const merged = { ...fm.meta }
      for (const [k, v] of Object.entries(fields)) {
        if (v === undefined || v === null) continue
        merged[k] = Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : String(v)
      }
      merged.updated_at = new Date().toISOString()
      const order = [...Object.keys(fm.meta), ...Object.keys(merged).filter((k) => !(k in fm.meta))]
      const lines = ['---']
      for (const k of order) {
        const v = merged[k]
        if (v === undefined) continue
        if (Array.isArray(v)) {
          if (!v.length) { lines.push(k + ': []'); continue }

          if (k === 'tags' || k === 'keywords') { lines.push(k + ': ' + JSON.stringify(v.join(' '))); continue }
          lines.push(k + ':')
          for (const x of v) lines.push('  - ' + JSON.stringify(String(x)))
        } else {
          lines.push(k + ': ' + JSON.stringify(String(v)))
        }
      }
      lines.push('---', '')
      writeText(path, lines.join('\n') + fm.body)
      try { indexAll(db, home) } catch {  }
      return { ok: true, saved: true, meta: merged }
    }

    const PICKS_FILE = () => join(homedir(), '.dsh', 'docs', 'daily-picks.md')
    const SNIP_MARK = /<!--\s*snip\s+after="([^"]*)"\s+at="([^"]*)"\s*-->/g
    const _pad2 = (n) => String(n).padStart(2, '0')
    const _nowLocal = () => {
      const d = new Date()
      return `${d.getFullYear()}-${_pad2(d.getMonth() + 1)}-${_pad2(d.getDate())} `
        + `${_pad2(d.getHours())}:${_pad2(d.getMinutes())}:${_pad2(d.getSeconds())}`
    }
    const parseSnips = (txt) => {
      const out = []
      const marks = []
      let m
      SNIP_MARK.lastIndex = 0
      while ((m = SNIP_MARK.exec(txt))) marks.push({ after: m[1], at: m[2], from: m.index, to: SNIP_MARK.lastIndex })
      for (let i = 0; i < marks.length; i++) {
        const end = i + 1 < marks.length ? marks[i + 1].from : txt.length
        out.push({ after: marks[i].after, at: marks[i].at,
                   body: txt.slice(marks[i].to, end).trim() })
      }
      return out
    }

    const reindex = () => {
      try { indexAll(db, home) } catch {  }
      try { _treeCache.clear() } catch {  }
    }

    const _q = (v) => '"' + String(v == null ? '' : v)
      .replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\s*\n\s*/g, ' ') + '"'

    const snipFrontmatter = (srcText, hotRel) => {
      const m = parseFrontmatter(srcText || '').meta || {}
      const base = String(m.title || m.name || basename(hotRel).replace(/\.md$/i, ''))
      const cat = Array.isArray(m.category) ? '' : String(m.category || '')
      const now = new Date().toISOString()
      return '---\n' + [
        `title: ${_q(base)}`,
        `category: ${_q(cat)}`,
        `snippet_from: ${_q(hotRel)}`,
        `created_at: ${_q(now)}`,
        `updated_at: ${_q(now)}`,
      ].join('\n') + '\n---\n'
    }

    const touchSnipFm = (text) => {
      const now = new Date().toISOString()
      return String(text || '').replace(/^updated_at:.*$/m, `updated_at: ${_q(now)}`)
    }

    const applySnip = (body) => {
      const src = String(body.path || '')
      const action = String(body.action || 'archive')
      const Z = zoneOf(src)
      if (!Z) return { ok: false, error: '这个文件不在记忆根或冷区里' }
      const isCold = Z.cold
      const hotRel = Z.rel
      const hotPath = join(Z.root, hotRel)
      const coldPath = join(Z.coldRoot, hotRel)
      const now = _nowLocal()

      if (action === 'archive') {
        if (!existsSync(hotPath)) return { ok: false, error: '热区文件不存在：' + hotRel }
        const text = readText(hotPath)
        const fm = parseFrontmatter(text)
        const head = fm.raw ? text.slice(0, text.length - fm.body.length) : ''
        const ents = splitEntries(hotPath, fm.body)
        const idx = Number(body.index)
        if (!Number.isInteger(idx) || idx < 0 || idx >= ents.length) {
          return { ok: false, error: `没有第 ${idx} 节（这份文件共 ${ents.length} 节）` }
        }
        const ent = ents[idx]
        const prevTitle = idx > 0 ? (headingOf(parseFrontmatter(ents[idx - 1].body).body) || '') : ''
        const blines = fm.body.split('\n')
        const from = ent.start - 1
        const to = idx + 1 < ents.length ? ents[idx + 1].start - 1 : blines.length
        const removed = blines.slice(from, to).join('\n').trim()
        const kept = [...blines.slice(0, from), ...blines.slice(to)].join('\n').replace(/\n{3,}/g, '\n\n')
        let cold = existsSync(coldPath) ? readText(coldPath) : ''
        const block = `\n<!-- snip after="${prevTitle}" at="${now}" -->\n${removed}\n`
        if (cold) cold = touchSnipFm(cold)
        else cold = snipFrontmatter(text, hotRel)
        mkdirSync(dirname(coldPath), { recursive: true })
        writeText(coldPath, cold.replace(/\s*$/, '\n') + block)
        writeText(hotPath, head + kept)
        reindex()
        return { ok: true, message: `已存档「${headingOf(parseFrontmatter(removed).body) || '这一节'}」→ ${relative(Z.root, Z.coldRoot)}/${hotRel}` }
      }

      if (action === 'restore') {
        if (!existsSync(coldPath)) return { ok: false, error: '冷区没有对应文件：' + relative(Z.root, Z.coldRoot) + '/' + hotRel }
        const cold = readText(coldPath)
        const snips = parseSnips(cold)
        const idx = Number(body.index)
        if (!Number.isInteger(idx) || idx < 0 || idx >= snips.length) {
          return { ok: false, error: `冷区这份文件没有第 ${idx} 个片段（共 ${snips.length} 个）` }
        }
        const sn = snips[idx]
        const marks = []
        SNIP_MARK.lastIndex = 0
        let m
        while ((m = SNIP_MARK.exec(cold))) marks.push({ from: m.index, to: SNIP_MARK.lastIndex })
        const endAll = idx + 1 < marks.length ? marks[idx + 1].from : cold.length
        const coldKept = cold.slice(0, marks[idx].from) + cold.slice(endAll)
        if (!parseFrontmatter(coldKept).body.trim()) {
          try {
            unlinkSync(coldPath)
            const stop = Z.coldRoot
            let d = dirname(coldPath)
            while (d !== stop && d.startsWith(stop + sep)) {
              try { if (readdirSync(d).length) break; rmdirSync(d) } catch { break }
              d = dirname(d)
            }
          } catch {  }
        } else {
          writeText(coldPath, touchSnipFm(coldKept).replace(/\n{3,}/g, '\n\n'))
        }
        const hotExists = existsSync(hotPath)
        const hot = hotExists ? readText(hotPath) : ''
        const hfm = parseFrontmatter(hot)
        let hhead, hbody
        if (hotExists) {
          hhead = hfm.raw ? hot.slice(0, hot.length - hfm.body.length) : ''
          hbody = hfm.body
        } else {
          const cfm = parseFrontmatter(cold)
          hhead = cfm.raw ? `---\n${cfm.raw}\n---\n\n` : ''
          hbody = ''
        }
        let anchorLost = false
        if (sn.after) {
          const hents = splitEntries(hotPath, hbody)
          const at = hents.findIndex((e) => (headingOf(parseFrontmatter(e.body).body) || '') === sn.after)
          if (at >= 0) {
            const blines = hbody.split('\n')
            const cut = at + 1 < hents.length ? hents[at + 1].start - 1 : blines.length
            hbody = [...blines.slice(0, cut), ...sn.body.split('\n'), '', ...blines.slice(cut)].join('\n')
          } else {
            anchorLost = true
            hbody = hbody.replace(/\s*$/, '\n\n') + sn.body + '\n'
          }
        } else {
          hbody = sn.body + '\n\n' + hbody.replace(/^\s*\n/, '')
        }
        mkdirSync(dirname(hotPath), { recursive: true })
        writeText(hotPath, hhead + hbody.replace(/\n{3,}/g, '\n\n'))
        reindex()
        const snTitle = headingOf(parseFrontmatter(sn.body).body) || '这一节'
        return { ok: true,
          message: `已恢复「${snTitle}」回 ${hotRel}`
            + (anchorLost ? `（⚠️ 原锚点「${sn.after}」已不在，放到了文件末尾）` : '') }
      }
      return { ok: false, error: 'action 只能是 archive / restore' }
    }

    const applyZone = (body) => {
      const src = String(body.path || '')
      const zone = String(body.zone || '')
      if (!src) return { ok: false, error: '没有路径' }
      if (zone !== 'hot' && zone !== 'cold') return { ok: false, error: 'zone 只能是 hot / cold' }
      const Z = zoneOf(src)
      if (!Z) return { ok: false, error: '这个文件不在记忆根或冷区里' }
      const rel = Z.rel
      const isCold = Z.cold
      if (zone === 'cold' && !isCold) {
        const dst = join(Z.coldRoot, rel)
        try {
          mkdirSync(dirname(dst), { recursive: true })
          renameSync(src, dst)
        } catch (e) { return { ok: false, error: '移动失败：' + String(e) } }
        reindex()
        return { ok: true, path: dst, message: '已移到冷区（' + relative(Z.root, Z.coldRoot) + '/）' }
      }
      if (zone === 'hot' && isCold) {
        const dst = join(Z.root, rel)
        if (existsSync(dst)) {
          return { ok: false,
            error: `热区已有同名文件，不敢覆盖：${relative(H, dst)}`
              + '（用「恢复回原位」逐节还原，或先手动合并）' }
        }
        try {
          mkdirSync(dirname(dst), { recursive: true })
          renameSync(src, dst)
        } catch (e) { return { ok: false, error: '移动失败：' + String(e) } }
        reindex()
        return { ok: true, path: dst, message: '已移回热区' }
      }
      return { ok: true, path: src, message: '本来就在' + (zone === 'cold' ? '冷' : '热') + '区' }
    }

    const applyPromote = (body) => {
      const src = String(body.path || '')
      const content = String(body.content || '').trim()
      const title = String(body.title || '').trim()
      if (!src) return { ok: false, error: '没有来源路径' }
      if (!content) return { ok: false, error: '没有内容（先在左边点开某一段再点）' }
      if (!/(daily|logs|reviews|archived)/.test(src)) {
        return { ok: false, error: '只有流水层（daily / logs / reviews / archived）才需要「提到热区」' }
      }
      const f = PICKS_FILE()
      const now = new Date().toISOString()
      const short = src.replace(/^.*\/\.dsh\//, '~/.dsh/')
      const _d = new Date(), _p = (n) => String(n).padStart(2, '0')
      const nowLocal = `${_d.getFullYear()}-${_p(_d.getMonth() + 1)}-${_p(_d.getDate())} ${_p(_d.getHours())}:${_p(_d.getMinutes())}:${_p(_d.getSeconds())}`
      const bodyText = content.replace(/^\s*#{1,6}\s+[^\n]*\n+/, '').trim() || content
      const block = `\n## ${title || '未命名片段'}（来自 ${short}）\n\n> 提到热区于 ${nowLocal}\n\n${bodyText}\n`
      try {
        mkdirSync(dirname(f), { recursive: true })
        if (!existsSync(f)) {
          writeFileSync(f, `---\ntitle: "daily 精选：从流水里捞出来的好条目"\ndescription: "记忆面板里点「提到热区」的条目会累积到这里。它在 docs 层，永远在热区，不会被 mem-rotate 搬走"\ncategory: "上下文"\ncreated_at: "${now}"\nupdated_at: "${now}"\ntags: "精选 提到热区 pin 流水 好条目 daily"\n---\n## daily 精选\n\n从 daily / logs 里捞出来的、值得长期留着的条目，每条注明出处。\n`, 'utf8')
        }
        appendFileSync(f, block, 'utf8')
        let t = readFileSync(f, 'utf8')
        t = t.replace(/^updated_at: ".*"$/m, `updated_at: "${now}"`)
        writeFileSync(f, t, 'utf8')
        try { indexAll(db, home) } catch {  }
        return { ok: true, message: '已提到热区 → docs/' + basename(f) + '（docs 层，永远热区）' }
      } catch (e) { return { ok: false, error: String(e) } }
    }

    ctx.effect(() => {
      const offResource = webServer.register({
      kind: 'prefix',
      path: '/memory-xfy',
      resource: async (req) => {
        const url = new URL(req.url, 'http://127.0.0.1')
        const json = (obj, code = 200) => new Response(JSON.stringify(obj), {
          status: code,
          headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
        })
        if (!authOk(req, home)) return json({ ok: false, error: '未登录：缺 dsh-auth cookie 或 ?token=' }, 403)

        if (url.pathname === '/memory-xfy/config') {
          try {
            const cfg = readPluginConfig(home)
            const layers = readLayersFile(home)
            let dbBytes = null
            try { dbBytes = statSync(dbPath).size } catch {  }
            return json({ ok: true, config: cfg, layers, dbBytes,
                          serve: readServeFile(home),
                          paths: { home, db: dbPath, file: configFilePath(home) } })
          } catch (e) { return json({ ok: false, error: String(e) }) }
        }
        if (url.pathname === '/memory-xfy/stats') {
          try {
            const _t0 = Date.now()
            const idx = ensureFresh()
            const _t1 = Date.now()
            const files = db.prepare('SELECT layer, COUNT(*) AS n FROM files GROUP BY layer ORDER BY n DESC').all()
            const total = ALL_TABLES.reduce((a, t) => a + db.prepare(`SELECT COUNT(*) AS n FROM ${t}`).get().n, 0)
            const nFiles = db.prepare('SELECT COUNT(*) AS n FROM files').get().n
            const _t2 = Date.now()
            return json({ ok: true, files: nFiles, chunks: total, layers: files, db: short(dbPath), idx,
                          timing: { fresh: _t1 - _t0, queries: _t2 - _t1 } })
          } catch (e) { return json({ ok: false, error: String(e) }) }
        }

        if (url.pathname === '/memory-xfy/facets') {
          try {
            ensureFresh()
            const g = (k) => url.searchParams.get(k) || ''
            const anyCond = ['q', 'layer', 'category', 'tag', 'must', 'not', 'zone', 'all',
                             'minimp', 'maximp', 'since'].some((k) => g(k))
            const bump = (map, key, zone) => {
              const cur = map.get(key) || { n: 0, hot: 0, cold: 0 }
              cur.n += 1
              if (zone === 'cold') cur.cold += 1; else cur.hot += 1
              map.set(key, cur)
            }
            const catAgg = new Map()
            const tagAgg = new Map()
            let files = 0
            if (anyCond) {

              const lim = Math.max(1, Number(g('n')) || 20)
              const hits = search(db, g('q'), lim, g('layer'), {
                must: g('must'), not: g('not'), path: g('path'), category: g('category'),
                tags: g('tag'), zone: g('zone'), all: g('all') === '1',
                minimp: g('minimp'), maximp: g('maximp'), since: g('since'),
              })
              const cm = catMapOf(db).byPath
              const tm = tagMapOf(db).byPath
              const seen = new Set()
              for (const h of hits) {
                const fp = h.full || h.path
                if (!fp || seen.has(fp)) continue
                seen.add(fp)
                const z = isArchived(fp) ? 'cold' : 'hot'
                const c = cm.get(fp)
                if (c) bump(catAgg, c, z)
                for (const t of tm.get(fp) || []) bump(tagAgg, t, z)
              }
              files = seen.size
            } else {
              for (const r of db.prepare('SELECT kind, zone, value, n FROM facets').all()) {
                const m = r.kind === 'category' ? catAgg : tagAgg
                const cur = m.get(r.value) || { n: 0, hot: 0, cold: 0 }
                cur.n += r.n
                if (r.zone === 'cold') cur.cold += r.n; else cur.hot += r.n
                m.set(r.value, cur)
              }
              files = db.prepare('SELECT COUNT(*) AS n FROM files').get().n
            }
            const pack = (m, keyName) => [...m.entries()]
              .sort((a, b2) => b2[1].n - a[1].n || String(a[0]).localeCompare(String(b2[0])))
              .map(([k, v]) => ({ [keyName]: k, n: v.n, hot: v.hot, cold: v.cold }))
            return json({ ok: true, files, categories: pack(catAgg, 'v'), tags: pack(tagAgg, 'tag') })
          } catch (e) { return json({ ok: false, error: String(e) }) }
        }
        if (url.pathname === '/memory-xfy/tree') {
          try { return json({ ok: true, layers: buildTree(home) }) }
          catch (e) { return json({ ok: false, error: String(e) }) }
        }

        if (url.pathname === '/memory-xfy/layout') {
          try {
            const cfg = JSON.parse(readFileSync(layersFile(home), 'utf8'))
            const root = rootOf(cfg, home)
            const cold = coldRootOf(cfg, home)
            const rows = []
            for (const [name, files, weight] of loadLayers(home)) {
              let bytes = 0
              for (const f of files) { try { bytes += statSync(f).size } catch {  } }
              const cfgL = (cfg.layers || []).find((L) => L.name === name) || {}

              rows.push({
                layer: name, weight, files: files.length, bytes,
                dirs: (cfgL.dirs || []).map((d) => ({
                  raw: String(d).trim(), abs: join(root, String(d).trim()),
                })),
                fixedFiles: (cfgL.files || []).map((f) => ({
                  raw: String(f).trim(), abs: join(root, String(f).trim()),
                })),
                movable: name !== 'rules',
              })
            }
            return json({
              ok: true, home,
              root: { raw: String(cfg.root || '').trim(), abs: root },
              cold: { raw: String(cfg.cold || '').trim(), abs: cold, default: 'archived' },
              configPath: layersFile(home), layers: rows,
            })
          } catch (e) { return json({ ok: false, error: String(e) }) }
        }

        if (url.pathname === '/memory-xfy/config-export') {
          try {
            return json({
              ok: true,
              kind: 'dsh-memory-xfy/config',
              version: 1,
              at: new Date().toISOString(),
              layers: JSON.parse(readFileSync(layersFile(home), 'utf8')),
              plugin: readPluginConfig(home),
            })
          } catch (e) { return json({ ok: false, error: String(e) }) }
        }
        if (url.pathname === '/memory-xfy/reveal'
          || url.pathname === '/memory-xfy/open'
          || url.pathname === '/memory-xfy/copy') {
          const raw = url.searchParams.get('path') || ''
          if (!raw) return json({ ok: false, error: '缺少 path' })
          const real = resolve(raw)
          const root = resolve(home)
          if (real !== root && !real.startsWith(root + sep)) {
            return json({ ok: false, error: '路径不在 ' + root + ' 下' })
          }
          if (!existsSync(real)) return json({ ok: false, error: '不存在：' + real })
          try {
            if (url.pathname === '/memory-xfy/reveal') {
              execFileSync('/usr/bin/open', ['-R', real])
            } else if (url.pathname === '/memory-xfy/open') {
              execFileSync('/usr/bin/open', [real])
            } else {
              execFileSync('/usr/bin/pbcopy', [], { input: real })
            }
            return json({ ok: true, path: real })
          } catch (e) { return json({ ok: false, error: String(e) }) }
        }
        if (url.pathname === '/memory-xfy/raw') {
          const raw = url.searchParams.get('path') || ''
          if (!raw) return json({ ok: false, error: '缺少 path' })
          const real = resolve(raw)
          if (!existsSync(real)) return json({ ok: false, error: '不存在：' + real })
          try {
            const info = rawInfo(real)
            if (!info.ok) return json({ ok: false, error: info.why })
            const day = basename(dirname(real))
            const name = basename(real).replace(/\.md$/, '')
            let html = ''
            try {
              html = execFileSync(join(home, 'bin', 'daily-raw'), [day, name, '--html'],
                { encoding: 'utf8', timeout: 60000 }).trim()
            } catch (e) {
              return json({ ok: false, error: '生成 HTML 失败：' + String(e).slice(0, 120) })
            }
            if (!html || !existsSync(html)) return json({ ok: false, error: '生成 HTML 失败' })
            execFileSync('/usr/bin/open', ['-a', 'Google Chrome', html])
            return json({ ok: true, path: html })
          } catch (e) { return json({ ok: false, error: String(e) }) }
        }
        if (url.pathname === '/memory-xfy/item') {
          const path = url.searchParams.get('path') || ''
          const index = Number(url.searchParams.get('index') || 0)
          if (!path || !existsSync(path)) return json({ ok: false, error: '文件不存在' })
          try {
            const raw = readText(path)
            const fm = parseFrontmatter(raw)
            if (index < 0) {
              return json({
                ok: true, path, index: -1, whole: true, heading: basename(path),
                content: raw, body: fm.meta ? fm.body : '', meta: fm.meta, fmRaw: fm.raw,
                human: fm.meta ? FM_HUMAN.filter((k) => hasValue(fm.meta[k])) : [],
                machine: fm.meta ? FM_MACHINE.filter((k) => hasValue(fm.meta[k])) : [],
                importance: importanceOf(path, null, { display: true }),
                raw: rawInfo(path).ok,
              })
            }
            const entries = splitEntries(path, raw)
            const e = entries[index]
            if (!e) return json({ ok: false, error: '条目不存在' })
            return json({
              ok: true, path, index, heading: headingOf(e.body), content: e.body, meta: fm.meta,
              importance: importanceOf(path, e.start, { display: true }),
            })
          } catch (err) { return json({ ok: false, error: String(err) }) }
        }
        if (url.pathname === '/memory-xfy/tags') {
          try {

            const list = db.prepare(
              "SELECT value AS tag, n FROM facets WHERE kind='tag' ORDER BY n DESC, tag").all()
            return json({ ok: true, tags: list })
          } catch (e) { return json({ ok: false, error: String(e), tags: [] }) }
        }
        if (url.pathname === '/memory-xfy/search') {
          const q = url.searchParams.get('q') || ''
          try {
            ensureFresh()
            const cache = new Map()
            const entriesOf = (p) => {
              if (!cache.has(p)) {
                let list = []
                try { list = splitEntries(p, readText(p)) } catch { list = [] }
                cache.set(p, list)
              }
              return cache.get(p)
            }
            const flat = (s) => String(s).replace(/\s+/g, '')
            const entryIndexOf = (p, body) => {
              const probe = flat(body).slice(0, 60)
              const i = entriesOf(p).findIndex((e) => flat(e.body).includes(probe))
              return i >= 0 ? i : 0
            }
            const headCache = new Map()
            const headOf = (p) => {
              if (headCache.has(p)) return headCache.get(p)
              const o = { desc: '', kws: [], intro: '' }
              try {
                const head = readText(p).slice(0, 4000)
                const dm = /^description:\s*"?([^"\n]+)"?/m.exec(head)
                if (dm) o.desc = dm[1].trim()
                o.kws = chipsOfHead(head).slice(0, 6)
                let body = head
                const fm = /^---\r?\n[\s\S]*?\r?\n---\r?\n/.exec(body)
                if (fm) body = body.slice(fm[0].length)
                body = body.replace(/^\s*#{1,3}[^\n]*\n+/, '')
                o.intro = body.replace(/\s+/g, ' ').trim().slice(0, 260)
              } catch {  }
              headCache.set(p, o)
              return o
            }
            const segTitleOf = (p, idx) => {
              const e = entriesOf(p)[idx]
              if (!e) return ''
              const m = /^\s*##\s+(.+)$/m.exec(e.body || '')
              return m ? m[1].trim().slice(0, 60) : ''
            }
            const g = (k) => url.searchParams.get(k) || ''
            const dbg = url.searchParams.get('debug') === '1'
            const all = search(db, q, 10 ** 6, g('layer'), { must: g('must'), not: g('not'), path: g('path'), category: g('category'), since: g('since'), after: g('after'), before: g('before'), createdAfter: g('createdAfter') || g('created-after'), createdBefore: g('createdBefore') || g('created-before'), modifiedAfter: g('modifiedAfter') || g('modified-after'), modifiedBefore: g('modifiedBefore') || g('modified-before'), tags: g('tags') || g('tag'), minimp: g('minimp') || g('min-importance'), maximp: g('maximp'), all: g('all'), zone: g('zone'), why: g('why') })
            if (dbg) {
              const probe = ALL_TABLES.flatMap((t) => db.prepare(`SELECT layer FROM ${t}`).all())
              const vals = [...new Set(probe.map((r) => r.layer))]
              const hit = probe.filter((r) => r.layer === g('layer')).length
              return json({ ok: true, debug: { layer: g('layer'), distinctLayers: vals, rowsWithThatLayer: hit, allTotal: all.length } })
            }
            const n = Number(g('n') || 30)
            const grouped = collapseByDoc(all)
            const hits = grouped.slice(0, n).map(({ h, n: segN }) => {
              const idx = entryIndexOf(h.path, h.body)
              const hd = headOf(h.path)
              const docLevel = DOC_LEVEL_LAYERS.has(h.layer)
              return {
                layer: h.layer, path: short(h.path), full: h.path, line: h.line,
                zone: h.tbl === 'chunks_record' ? 'cold' : 'hot',
                index: docLevel ? -1 : idx,
                docLevel, segCount: segN,
                segTitle: docLevel ? '' : segTitleOf(h.path, idx),
                desc: hd.desc,
                kws: hd.kws,
                score: Math.round(h.score), imp: importanceOf(h.path, h.line),
                why: h.why || null,
                snippet: (docLevel && hd.intro) ? hd.intro : h.body.replace(/\s+/g, ' ').trim().slice(0, 260),
              }
            })
            logAccess(hits.map((h) => h.full + ':' + Math.trunc(Number(h.line) || 0)))
            let coldHits = 0
            try {
              const _zone = g('zone')
              const _hotOnly = !_zone || _zone === 'hot'
              const _ws = String(q).trim().split(/\s+/).filter((t) => t.length >= 2).slice(0, 3)
              if (_hotOnly && _ws.length) {
                const _sql = 'SELECT COUNT(*) AS n FROM chunks_record WHERE ' +
                  _ws.map(() => 'instr(body, ?) > 0').join(' OR ')
                coldHits = db.prepare(_sql).get(..._ws).n || 0
              }
            } catch { coldHits = 0 }
            return json({ ok: true, hits, total: grouped.length, shown: hits.length, coldHits })
          } catch (e) { return json({ ok: false, error: String(e) }) }
        }
        return json({ ok: false, error: 'not found' })
      },
      })

      const offCfg = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/config-save',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            const patch = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')

            const unknown = Object.keys(patch).filter((k) => !(k in CONFIG_DEFAULT))
            return send({ ok: true, config: writePluginConfig(home, patch), unknown })
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      const offLayout = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/layout-save',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const body = await readJsonBody(req)
            const kind = String(body.kind || 'dir')
            const cfgPath = layersFile(home)
            const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'))
            const root = rootOf(cfg, home)
            const coldRoot = coldRootOf(cfg, home)
            const to = String(body.to == null ? '' : body.to).trim()
            if (to.includes('..')) return send({ ok: false, error: '路径里不能有 ..' })
            if (kind !== 'root' && to.startsWith('/')) {
              return send({ ok: false, error: '细分路径只能写相对主路径的路径（比如 docs、logs/changelog），不是绝对路径' })
            }

            const countAll = () => {
              let n = 0, b = 0
              for (const [, fs2] of loadLayers(home)) {
                for (const f of fs2) { try { n++; b += statSync(f).size } catch {  } }
              }
              return { n, b }
            }
            const writeCfg = () => {
              const tmp = cfgPath + '.tmp'
              writeFileSync(tmp, JSON.stringify(cfg, null, 2) + '\n', 'utf8')
              renameSync(tmp, cfgPath)
            }
            const moveFile = (from, to) => {
              mkdirSync(dirname(to), { recursive: true })
              if (existsSync(to)) throw new Error(`目标已存在，拒绝覆盖：${to}`)
              renameSync(from, to)
            }
            const same = (a, b) => a.n === b.n && a.b === b.b

            if (kind === 'dir') {
              const layer = String(body.layer || '')
              if (!layer) return send({ ok: false, error: '缺 layer' })
              if (layer === 'rules') return send({ ok: false, error: 'rules 层是文件白名单（跟着 AGENTS.md 走），没有细分目录' })
              const L = (cfg.layers || []).find((x) => x.name === layer)
              if (!L) return send({ ok: false, error: `没有这一层：${layer}` })
              const idx = Number(body.index)
              const arr = L.dirs || []
              if (!Number.isInteger(idx) || idx < 0 || idx >= arr.length) {
                return send({ ok: false, error: `第 ${idx} 条细分路径不存在（这一层共 ${arr.length} 条）` })
              }
              if (!to) return send({ ok: false, error: '细分路径不能留空' })
              const oldRaw = String(arr[idx]).trim()
              if (oldRaw === to) {
                const c = countLayer(home, layer)
                return send({ ok: true, moved: [], before: c, after: c, verified: true, note: '路径没变' })
              }
              const from = join(root, oldRaw)
              const dest = join(root, to)
              const before = countLayer(home, layer)
              if (existsSync(from)) moveDir(from, dest)
              arr[idx] = to
              writeCfg()

              try {
                for (const t of ['files', 'chunks', 'chunks_record', 'chunk_ts']) {
                  try { db.exec(`DELETE FROM ${t}`) } catch {  }
                }
                indexAll(db, home)
                _treeCache.clear()
              } catch (e2) {
                console.error('[memory-xfy] 搬完重建索引失败：', e2.message)
              }
              const after = countLayer(home, layer)
              const verified = same(before, after)
              return send({
                ok: true, moved: [oldRaw + ' → ' + to], before, after, verified,
                ...(verified ? {} : { error: `搬完对不上：${before.n} 个 / ${before.b} 字节 → ${after.n} 个 / ${after.b} 字节` }),
              })
            }

            if (kind === 'cold') {
              const newCold = to || 'archived'
              if (newCold === String(cfg.cold || '').trim()) {
                const c = countAll()
                return send({ ok: true, moved: [], before: c, after: c, verified: true, note: '冷区路径没变' })
              }
              const dest = join(root, newCold)
              const before = countAll()
              if (existsSync(coldRoot)) moveDir(coldRoot, dest)
              cfg.cold = newCold === 'archived' ? '' : newCold
              writeCfg()

              try { indexAll(db, home); _treeCache.clear() } catch (e2) {
                console.error('[memory-xfy] 搬完重建索引失败：', e2.message)
              }
              const after = countAll()
              const verified = same(before, after)
              return send({
                ok: true, moved: [relative(root, coldRoot) + ' → ' + newCold], before, after, verified,
                ...(verified ? {} : { error: `搬完对不上：${before.n} 个 → ${after.n} 个` }),
              })
            }

            if (kind === 'root') {
              if (to && !to.startsWith('/')) return send({ ok: false, error: '主路径要给绝对路径（或留空 = ~/.dsh）' })
              const newRoot = to || join(homedir(), '.dsh')
              if (newRoot === root) {
                const c = countAll()
                return send({ ok: true, moved: [], before: c, after: c, verified: true, note: '主路径没变' })
              }

              if (to && existsSync(newRoot)) {
                return send({ ok: false, error: `目标目录已经存在，不敢往里搬：${newRoot}` })
              }
              const before = countAll()

              const rels = new Set()
              for (const L of (cfg.layers || [])) {
                for (const d of (L.dirs || [])) rels.add(String(d).trim())
              }
              rels.add(relative(root, coldRoot))
              for (const f of ['cache/mem.db', 'cache/mem.db-wal', 'cache/mem.db-shm',
                'cache/mem-signals.json', 'cache/sync-state.json']) rels.add(f)
              try {
                for (const n of readdirSync(join(root, 'cache'))) {
                  if (n.startsWith('mem-access.jsonl')) rels.add('cache/' + n)
                }
              } catch {  }
              const moved = []
              for (const rel of [...rels].sort()) {
                const from = join(root, rel)
                if (!existsSync(from)) continue
                const dest = join(newRoot, rel)
                moveDir(from, dest)
                moved.push(rel)
              }
              cfg.root = to
              writeCfg()

              try { indexAll(db, home); _treeCache.clear() } catch (e2) {
                console.error('[memory-xfy] 搬完重建索引失败：', e2.message)
              }
              const after = countAll()
              const verified = same(before, after)
              return send({
                ok: true, moved, before, after, verified,
                ...(verified ? {} : { error: `搬完对不上：${before.n} 个 / ${before.b} 字节 → ${after.n} 个 / ${after.b} 字节` }),
              })
            }

            return send({ ok: false, error: `不认识的 kind：${kind}（dir / cold / root）` })
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      const offCfgImport = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/config-import',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const body = await readJsonBody(req)
            const what = String(body.what || 'both')
            const out = {}
            if (what !== 'plugin') {
              const lay = body.layers
              if (!lay || !Array.isArray(lay.layers)) return send({ ok: false, error: 'layers 形状不对（要有 layers 数组）' })
              const cfgPath = layersFile(home)
              const tmp = cfgPath + '.tmp'
              writeFileSync(tmp, JSON.stringify(lay, null, 2) + '\n', 'utf8')
              renameSync(tmp, cfgPath)
              out.layers = cfgPath
            }
            if (what !== 'layers') {
              const plug = { ...(body.plugin || {}) }
              delete plug._exists
              out.plugin = writePluginConfig(home, plug)
              out.unknown = Object.keys(plug).filter((k) => !(k in CONFIG_DEFAULT))
            }
            return send({ ok: true, ...out })
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      const offTokNew = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/token-new',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')

            const r = body.token
              ? renameToken(home, String(body.token), body.name)
              : createToken(home, body.name, body.layers)
            if (!r.ok) return send(r)

            const rs = r.renamed
              ? { restarted: false, note: '只改了名字，token 值没变，不用重启' }
              : await restartMemServe(home)
            return send({ ...r, restart: rs, note: rs.restarted ? 'mem-serve 已重启，新 token 立即可用' : rs.note })
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      const offTokDel = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/token-del',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
            const r = deleteToken(home, String(body.token || ''))
            if (!r.ok) return send(r)

            const rs = await restartMemServe(home)
            return send({ ...r, restart: rs, note: rs.restarted ? 'mem-serve 已重启，这个 token 立刻失效' : rs.note })
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      const offRemote = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/remote',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
            const cfg = readPluginConfig(home)
            let url = String(body.remoteUrl || cfg.remoteUrl || '').trim()
            const tok = String(body.remoteToken || cfg.remoteToken || '').trim()
            if (!url || !tok) return send({ ok: false, error: '还没填服务器网址 / token' }, 400)
            if (!/^https?:\/\//i.test(url)) url = 'http://' + url
            url = url.replace(/\/+$/, '')
            const action = String(body.action || 'me')
            if (action === 'me') {
              const r = await fetch(url + '/me?token=' + encodeURIComponent(tok),
                { signal: AbortSignal.timeout(8000) })
              const j = await r.json().catch(() => ({}))
              const out = { ok: r.ok && !!j.name, status: r.status, me: j,
                error: r.ok && j.name ? undefined : (j.error || ('主服务器回 ' + r.status)) }

              if (out.ok && body.wantDiff) {
                const srcName2 = String(cfg.remoteName || '').trim().replace(/[^\w.\-]/g, '_') || 'remote'
                try {
                  const r2 = await fetch(url + '/sync?token=' + encodeURIComponent(tok), {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ protocol: 1, baseline: {}, changes: [], manifestOnly: true }),
                    signal: AbortSignal.timeout(15000),
                  })
                  const j2 = await r2.json().catch(() => ({}))
                  if (r2.ok && j2.manifest) out.diff = diffAgainstLocal(j2.manifest, srcName2)
                  else out.diffError = j2.error || ('清单请求回 ' + r2.status)
                } catch (e) { out.diffError = String((e && e.message) || e) }
              }
              return send(out)
            }
            if (action === 'sync') {

              const srcName0 = String(cfg.remoteName || '').trim().replace(/[^\w.\-]/g, '_') || 'remote'
              const st0 = (loadSyncState()[srcName0]) || {}
              const baseline0 = {}
              for (const [rel, rec] of Object.entries(st0)) {
                if (rec && rec.h) baseline0[rel] = rec.h
              }
              const r = await fetch(url + '/sync?token=' + encodeURIComponent(tok), {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ ...(body.payload || {}), baseline: baseline0 }),
                signal: AbortSignal.timeout(120000),
              })
              const j = await r.json().catch(() => ({}))

              const srcName = String(cfg.remoteName || '').trim().replace(/[^\w.\-]/g, '_') || 'remote'
              const state = loadSyncState()
              const stFor = state[srcName] || (state[srcName] = {})
              const home0 = homedir()
              const d0 = new Date()
              const p2 = (n) => String(n).padStart(2, '0')
              const stamp = String(d0.getFullYear()) + p2(d0.getMonth() + 1) + p2(d0.getDate()) +
                'T' + p2(d0.getHours()) + p2(d0.getMinutes()) + p2(d0.getSeconds())

              const basePathOf = (rel) => join(home0, '.dsh', 'cache', 'sync-base', rel)
              const writeBase = (rel, text) => {
                if (typeof text !== 'string') return
                const bp = basePathOf(rel)
                mkdirSync(dirname(bp), { recursive: true })
                writeFileSync(bp, text, 'utf8')
              }
              const conflictRoot = join(home0, '.dsh', 'conflict')
              const hdrOf = (role, rel) =>
                `<!-- sync-conflict role=${role} at=${stamp} base=${rel} resolved=pending -->\n`
              const stripHdr = (t) => String(t).replace(/^<!-- sync-conflict [^>]*-->\n/, '')

              const infoOf = (rel, extra) => {
                const e = extra || {}
                return `# 同步冲突 ${e.bid || '?'}

- **原文件**：\`${rel}\`
- **时间**：${stamp}
- **状态**：未处理（pending）
- **远端**：${e.remoteName || '?'} ${e.remoteUrl ? '（' + e.remoteUrl + '）' : ''}
- **判定**：两边都改过（三方比较：base / 本地 / 远端三个 hash 互不相同）

## hash（判据存档）

- base（上次同步时两边一致的那版）：\`${e.baseHash || '（没有 base）'}\`
- 本地（kept 这份）：\`${e.localHash || '?'}\`
- 远端（conflict 这份）：\`${e.remoteHash || '?'}\`

## 目录里的文件

- \`${basename(rel)}.kept\` = **保留的**：正式文件里现在就是它（本地那版没被覆盖）
- \`${basename(rel)}.conflict\` = **冲突的**：远端想写进来、被挡在外面的那份

## 怎么处理

1. 两份对着看，按需要改 \`${rel}\`
2. 删掉整个目录：\`rm -rf ~/.dsh/conflict/${e.bid || '???'}\`
   （不删也行：下次同步两边对齐时插件会自己清掉）
`
              }

              const nextBatchDir = () => {
                let n = 1
                while (existsSync(join(conflictRoot, `${stamp}_${n}`))) n += 1
                const dir = join(conflictRoot, `${stamp}_${n}`)
                mkdirSync(dir, { recursive: true })
                return dir
              }

              const findBatchDir = (rel) => {
                try {
                  for (const fn of readdirSync(conflictRoot)) {
                    const d = join(conflictRoot, fn)
                    let info = ''
                    try { info = readFileSync(join(d, 'info.md'), 'utf8') } catch { continue }
                    if (info.includes('`' + rel + '`')) return d
                  }
                } catch {}
                return null
              }

              const saveConflictCopy = (rel, remoteContent, localContent, extra) => {
                const dir = (extra && extra.dir) || findBatchDir(rel) || nextBatchDir()

                const fileBase = basename(rel)
                if (typeof localContent === 'string') {
                  writeFileSync(join(dir, fileBase + '.kept'), hdrOf('kept', rel) + localContent, 'utf8')
                }
                writeFileSync(join(dir, fileBase + '.conflict'), hdrOf('conflict', rel) + remoteContent, 'utf8')
                writeFileSync(join(dir, 'info.md'),
                  infoOf(rel, { ...(extra || {}), bid: basename(dir) }), 'utf8')
                return true
              }

              const clearConflictCopy = (rel) => {
                let n = 0
                try {
                  for (const batch of readdirSync(conflictRoot)) {
                    const d = join(conflictRoot, batch)
                    let info = ''
                    try { info = readFileSync(join(d, 'info.md'), 'utf8') } catch { continue }
                    if (!info.includes('`' + rel + '`')) continue
                    rmSync(d, { recursive: true, force: true })
                    n += 1
                  }
                } catch {}
                return n
              }

              let applied = 0, kept = 0, savedConflicts = 0, cleaned = 0, merged = 0

              const clientConflicts = []
              const conflictSet = new Set((Array.isArray(j.conflicts) ? j.conflicts : [])
                .map((c) => String((c && c.path) || '')))
              if (r.ok && Array.isArray(j.files)) {
                for (const f of j.files) {
                  const rel = String((f && f.path) || '')
                  if (!rel || rel.startsWith('/') || rel.split('/').includes('..')) continue
                  if (conflictSet.has(rel)) continue
                  const content = String(f.content == null ? '' : f.content)
                  const remoteHash = hashText(content)
                  const dst = join(home0, '.dsh', rel)
                  let localHash
                  try { localHash = hashText(readFileSync(dst)) } catch { localHash = undefined }

                  const d = mergeDecision(stFor[rel] || null, localHash, remoteHash, !!j.readOnly)
                  if (d === 'only-remote' || d === 'take-remote') {
                    mkdirSync(dirname(dst), { recursive: true })
                    writeFileSync(dst, content, 'utf8')
                    localHash = remoteHash
                    applied += 1
                    if (clearConflictCopy(rel)) cleaned += 1
                    writeBase(rel, content)
                  } else if (d === 'conflict') {
                    let mine = null
                    try { mine = readFileSync(dst, 'utf8') } catch {}
                    let baseText = null
                    try { baseText = readFileSync(basePathOf(rel), 'utf8') } catch {}

                    if (baseText != null && mine != null) {
                      const mg = merge3(baseText, mine, content)
                      if (mg.ok) {
                        writeFileSync(dst, mg.text, 'utf8')
                        localHash = hashText(mg.text)
                        applied += 1
                        merged += 1
                        if (clearConflictCopy(rel)) cleaned += 1
                        writeBase(rel, mg.text)
                        stFor[rel] = baseRec(localHash, remoteHash, stamp)
                        continue
                      }
                    }

                    const bidDir = findBatchDir(rel) || nextBatchDir()
                    let baseHash0 = null
                    try { baseHash0 = hashText(baseText) } catch {}
                    if (saveConflictCopy(rel, content, mine, {
                      dir: bidDir, baseHash: baseHash0, localHash: hashText(mine || ''),
                      remoteHash, remoteName: srcName, remoteUrl: String(cfg.remoteUrl || ''),
                    })) savedConflicts += 1
                    clientConflicts.push({ path: rel, rule: 'both-changed',
                                           remote: { hash: remoteHash, content } })
                  } else {
                    kept += 1

                    if (d === 'same') {
                      if (clearConflictCopy(rel)) cleaned += 1
                      writeBase(rel, content)
                    }
                  }
                  stFor[rel] = baseRec(localHash, remoteHash, stamp)
                }
              }

              if (r.ok && Array.isArray(j.conflicts) && j.conflicts.length) {
                for (const c of j.conflicts) {
                  const rel = String((c && c.path) || '')
                  const content = c && c.remote ? c.remote.content : null
                  if (!rel || rel.startsWith('/') || rel.split('/').includes('..')) continue
                  if (typeof content !== 'string') continue
                  if (saveConflictCopy(rel, content, undefined, {
                    baseHash: (baseline0 && baseline0[rel]) || null,
                    remoteHash: hashText(content), remoteName: srcName,
                    remoteUrl: String(cfg.remoteUrl || ''),
                  })) savedConflicts += 1

                  const local = join(home0, '.dsh', rel)
                  let lh
                  try { lh = hashText(readFileSync(local)) } catch { lh = undefined }
                  stFor[rel] = baseRec(lh, hashText(content), stamp)
                }
              }
              saveSyncState(state)
              return send({ ok: r.ok, status: r.status, ...j,
                conflicts: [...clientConflicts, ...(Array.isArray(j.conflicts) ? j.conflicts : [])],
                applied, kept, savedConflicts, cleaned, merged,
                error: r.ok ? undefined : (j.error || ('主服务器回 ' + r.status)) })
            }
            return send({ ok: false, error: 'action 只能是 me / sync' }, 400)
          } catch (e) { return send({ ok: false, error: String(e && e.message || e) }) }
        },
      })

      const offSave = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/save',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            const raw = Buffer.concat(chunks).toString('utf8')
            return send(applySave(JSON.parse(raw || '{}')))
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      const offMeta = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/meta',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            return send(applyMeta(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')))
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      const offPromote = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/promote',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            return send(applyPromote(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')))
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      const offZone = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/zone',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            const r = applyZone(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
            if (r.ok) { try { _treeCache.clear() } catch {  } }
            return send(r)
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      const offSnip = webServer.register({
        kind: 'exact',
        path: '/memory-xfy/snip',
        handler: async (req, res) => {
          const send = (obj, code = 200) => {
            res.writeHead(code, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(obj))
          }
          if (req.method !== 'POST') return send({ ok: false, error: '请用 POST' }, 405)
          if (!originOk(req)) return send({ ok: false, error: '跨域请求被拒' }, 403)
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            return send(applySnip(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')))
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      return () => { offResource(); offCfg(); offLayout(); offCfgImport(); offTokNew(); offTokDel()
        ; offRemote(); offSave(); offMeta(); offPromote(); offZone(); offSnip() }
    })
  }

  ctx.effect(() => () => { try { db.close() } catch {  } })
}
