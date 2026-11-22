import { DatabaseSync } from 'node:sqlite'
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, existsSync, statSync, renameSync, readdirSync, unlinkSync, rmdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname, basename, resolve, sep, extname, relative } from 'node:path'
import { homedir } from 'node:os'
import { createHash } from 'node:crypto'
import { privateDecrypt, privateEncrypt } from './private.mjs'

export const name = 'memory-xfy'
export const inject = ['tools', 'webServer', 'systemPrompt']

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
    cfg = JSON.parse(readFileSync(join(home, 'layers.json'), 'utf8'))
  } catch (e) {
    throw new Error(`读不到层定义 ${join(home, 'layers.json')}：${e.message}`)
  }
  const out = []
  for (const L of cfg.layers || []) {
    const files = []
    for (const f of L.files || []) {
      const fp = join(home, f)
      if (existsSync(fp)) files.push(fp)
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
    for (const d of L.dirs || []) {
      const base = join(home, d)
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

const CHUNK_TARGET = { private: 800 }

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

const DOC_LEVEL_LAYERS = new Set(['docs', 'skills', 'bin'])

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
    if (['daily', 'log', 'reviews'].includes(r.layer)) {
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
  for (const { path } of all) {
    if (!seen.has(path)) {
      for (const t of ALL_TABLES) delChunk[t].run(path)
      db.prepare('DELETE FROM chunk_ts WHERE path = ?').run(path)
      db.prepare('DELETE FROM files WHERE path = ?').run(path)
    }
  }
  const total = ALL_TABLES.reduce((a, t) => a + db.prepare(`SELECT COUNT(*) AS n FROM ${t}`).get().n, 0)
  return { added, chunks, skipped, total }
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
  if (layer === 'log') {
    const dir = basename(dirname(file))
    if (dir === 'changelog' || dir === 'outbound') return dir
    if (file.includes('logs/skills/')) return 'skills'
    return ''
  }
  if (layer === 'daily') {
    const dir = basename(dirname(file))
    return dir === 'daily' ? basename(file).replace(/\.md$/i, '') : dir
  }
  if (layer === 'profiles') {
    const dir = basename(dirname(file))
    return dir === 'users' ? '👤 users' : '👥 groups'
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
  if (layer === 'log') {
    const dir = dirname(file)
    const d = basename(dir)
    if (d === 'changelog' || d === 'outbound') return dir
    if (file.includes('logs/skills/')) return dirname(dirname(file))
    return ''
  }
  if (layer === 'profiles') return dirname(file)
  return ''
}

const LAYER_DIRS = {
  docs: 'docs', skills: 'skills', daily: 'daily',
  reviews: 'reviews', log: 'logs', bin: 'bin',
  profiles: 'profiles',
}

const _treeCache = new Map()
const _TREE_CACHE_VER = 11

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
    const f = join(homedir(), '.dsh', 'layers.json')
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
function isArchived(p) { return String(p).includes('/archived/') }
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

const RECORD_LAYERS = new Set(['daily', 'log'])
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

export function apply(ctx, config = {}) {
  const home = config.home || process.env.DSH_HOME || join(homedir(), '.dsh')
  const dbPath = config.dbPath || join(home, 'cache', 'mem.db')
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
      const H = join(homedir(), '.dsh')
      const rel0 = relative(H, src)
      if (!rel0 || rel0.startsWith('..')) return { ok: false, error: '只能操作 ~/.dsh 下的文件' }
      const isCold = rel0.split(/[\\/]/)[0] === 'archived'
      const hotRel = isCold ? rel0.replace(/^archived[\\/]/, '') : rel0
      const hotPath = join(H, hotRel)
      const coldPath = join(H, 'archived', hotRel)
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
        return { ok: true, message: `已存档「${headingOf(parseFrontmatter(removed).body) || '这一节'}」→ archived/${hotRel}` }
      }

      if (action === 'restore') {
        if (!existsSync(coldPath)) return { ok: false, error: '冷区没有对应文件：archived/' + hotRel }
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
            const stop = join(homedir(), '.dsh', 'archived')
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
      const H = join(homedir(), '.dsh')
      const rel = relative(H, src)
      if (!rel || rel.startsWith('..')) return { ok: false, error: '只能移动 ~/.dsh 下的文件' }
      const isCold = rel.split(/[\\/]/)[0] === 'archived'
      if (zone === 'cold' && !isCold) {
        const dst = join(H, 'archived', rel)
        try {
          mkdirSync(dirname(dst), { recursive: true })
          renameSync(src, dst)
        } catch (e) { return { ok: false, error: '移动失败：' + String(e) } }
        reindex()
        return { ok: true, path: dst, message: '已移到冷区（archived/）' }
      }
      if (zone === 'hot' && isCold) {
        const dst = join(H, rel.replace(/^archived[\\/]/, ''))
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
        const json = (obj) => new Response(JSON.stringify(obj), {
          headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
        })
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
        if (url.pathname === '/memory-xfy/tree') {
          try { return json({ ok: true, layers: buildTree(home) }) }
          catch (e) { return json({ ok: false, error: String(e) }) }
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

            const counts = new Map()
            for (const tags of tagMapOf(db).byPath.values()) {
              for (const t of tags) counts.set(t, (counts.get(t) || 0) + 1)
            }
            const list = [...counts.entries()]
              .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
              .map(([tag, n]) => ({ tag, n }))
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
          try {
            const chunks = []
            for await (const c of req) chunks.push(c)
            return send(applySnip(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')))
          } catch (e) { return send({ ok: false, error: String(e) }) }
        },
      })

      return () => { offResource(); offSave(); offMeta(); offPromote(); offZone(); offSnip() }
    })
  }

  ctx.effect(() => () => { try { db.close() } catch {  } })
}
