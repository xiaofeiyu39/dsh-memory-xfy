# dsh-memory-xfy

English · [中文](README.md)

A **layered memory plugin** for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness).
Files are the single source of truth; SQLite is only an index. Retrieve on demand — never inject into every turn's prompt.

> It is not about making the model remember *more*. It is about **making memory findable**.
>
> Measured 2026-11-14: **1,253 files, 12,042 chunks** (7,568 hot + 4,474 cold) · CLI search **0.10 s** · panel search ~60 ms. Numbers grow with use; these are magnitudes.

---

## Bundled CLI

`bin/` also ships two Python scripts — **same design** as the panel, sharing the same `layers.json`:

```bash
cp bin/memq bin/mem-signals ~/.dsh/bin/ && chmod +x ~/.dsh/bin/memq ~/.dsh/bin/mem-signals

memq "keyword" -n 8      # search from the terminal
memq --pack "task"       # build a memory brief
memq --stats             # index size
mem-signals              # aggregate the access log into per-chunk importance
```

Stdlib only (Python 3.9+), no npm package required.

## Why

The context window is a workbench, not a warehouse. Once memory grows to 10–100× the context size, the right move is **on-demand retrieval**.

Three design trade-offs, each with a concrete cost it avoids:

| Choice | What it saves |
|---|---|
| **No per-turn prompt injection** | Doesn't break the prefix cache. Prefill is expensive; touching the head of the prompt means a full recompute |
| **No subagents** | Retrieval is a synchronous file operation — milliseconds, not a model round-trip |
| **Zero native dependencies** | Node's built-in `node:sqlite` + FTS5 trigram. No compilation, no embedding model |

---

## Install

From npm:

```bash
dsh plugin --profile web add dsh-memory-xfy
```

From a local directory (source checkout or a version you've patched):

```bash
dsh plugin --profile web add /path/to/dsh-memory-xfy
```

Restart DSH. A **Memory** entry appears in the sidebar, or open `http://127.0.0.1:3080/` directly — the plugin registers `/memory-xfy/*` routes.

> ⚠️ The panel scans the directories configured in `~/.dsh/layers.json`. **If those directories don't exist, or contain no `.md` files, the panel will be empty.**

On a fresh install, run this once:

```bash
npx -y -p dsh-memory-xfy dsh-memory-init
```

⚠️ Don't write plain `npx dsh-memory-init` — npm resolves that to a **package named
`dsh-memory-init`** (which doesn't exist → 404). It matches on the package name, not the bin name.

It creates the six layers under `~/.dsh/`, each with one real, readable file
(`AGENTS.md` / a sample doc / a sample skill / a daily entry / a review / a changelog line),
so the panel has something to show on first open. **Existing files are never overwritten** —
your current notes are safe.

---

## What it provides

**Two model-facing tools:**

| Tool | Purpose | Key parameters |
|---|---|---|
| `mem_search` | Search across all memory layers, returns hit locations and snippets | `query` · `limit` (default 20) · `layer` · `must`/`not` · `path` · `category` · `since` · `createdAfter`/`Before` · `modifiedAfter`/`Before` · `tags` |
| `mem_pack` | Build a 2–4 paragraph "memory brief" for the current task without blowing up the context | `query` · `budget` (default 6000 chars) |

**A set of HTTP routes plus a web panel:** tree / search / edit / hot↔cold moves / snippet archiving / promote-to-hot.

---

## Core concepts

### Layers: sorted by "when will I need this next"

Layer definitions live in `~/.dsh/layers.json` — **the single source of truth**, read by both the plugin and the scripts:

| Tier | Layers | What lives there |
|---|---|---|
| Core | `rules` (AGENTS.md / LOOP.md) | Rules you obey every turn — highest density |
| Distilled | `docs` · `skills` | Conclusions / runbooks |
| Assets | `bin` | Tools that still work |
| Stream | `daily` · `logs` · `reviews` | What actually happened |

One-line rule: **used every turn → core; used when doing → skill; used when looking up → doc; used only in retro → stream.**

### Hot / cold: automatic demotion, not deletion

Two tables, `chunks` (hot) and `chunks_record` (cold). **Only the hot table is searched by default.**

- Layers with a `window` (e.g. `daily` 3 days, `reviews` 7 days) keep recent files hot; the rest sink automatically
- Files past the window are **physically moved into `archived/`** — **file location *is* the hot/cold state**
- Cold entries stay searchable: tick **Cold memory** in the panel

> Key point: `archived/` is **not a new layer**, it is a path prefix. A file moved there keeps its original layer name.

### Searching: give it facts, not questions

```
✅ "compaction 256k 117k"     ← memory stores facts
❌ "how much did compaction save today"  ← that's an intent
```

**One zero-result search proves nothing** — retry with synonyms. Only two empty searches mean it's really absent.

---

## Panel

| Feature | Description |
|---|---|
| Tree | Layer → group → file → section, expanded on demand |
| Search | Cross-layer search with scores and matched snippets; cold hits are reported as "N more in cold" |
| Edit | Whole-file overwrite (**frontmatter preserved verbatim**) / edit one section / delete one section |
| Hot↔cold move | One click into or out of `archived/`, index rebuilt automatically |
| Snippet archive | Cut a single section into a same-named file under `archived/`; the source file loses that section |
| Promote to hot | Pull a good entry out of the stream and accumulate it into `docs/` (always hot) |

**Two safety guarantees on moves** (both tested): the table switches immediately after the move (no ghost chunks), and cold→hot **refuses to overwrite** an existing hot file with the same name.

---

## Configuration

`~/.dsh/layers.json` is the only config source. It is an **array**:

```json
{
  "version": 1,
  "layers": [
    { "name": "rules", "weight": 5,
      "files": ["AGENTS.md", "LOOP.md", "archived/AGENTS.md"] },

    { "name": "docs", "weight": 4, "dirs": ["docs", "archived/docs"], "exts": [".md"] },

    { "name": "daily", "weight": 1, "dirs": ["daily", "archived/daily"],
      "exts": [".md"], "window": 3 },

    { "name": "skills", "weight": 5, "dirs": ["skills"],
      "only_names": ["SKILL.md", "ITERATIONS.md"] }
  ]
}
```

| Field | Meaning |
|---|---|
| `weight` | Layer weight during search |
| `dirs` / `files` | Directories (recursive) or exact files |
| `exts` | Only index these extensions; `null` = no restriction |
| `window` | How many days stay hot; omitted = always hot |
| `only_names` | Only index these filenames (the skills layer indexes `SKILL.md` only, so history files don't compete) |

After editing, rebuild the index (the panel's **Refresh** button, or `memq --index` if you use the CLI scripts).

---

## FAQ

**The panel is empty after install.**
The directories in `layers.json` don't exist, or contain no `.md` files. Write a few notes, then refresh.

**I edited `client.js` and nothing changed.**
`plugin_manager` toggling only swaps the server-side bundle — **the browser page needs a full reload** (the SPA won't refetch it). Bit me twice.

**`path LIKE '%xxx%'` returns 0 during search.**
`chunks` is an FTS5 virtual table and `path` is an `UNINDEXED` column — **LIKE/GLOB on UNINDEXED columns is always 0**. Use `instr(path, 'xxx')` or query the `files` table. This is not a SQLite version issue.

---

## Status

- Version `1.0.0`, used daily on DSH `0.2.2-rc.1`
- Retrieval quality: 8 rounds of zero-target blind tests, questions all taken from real user utterances (not self-authored quiz items)
- Two implementations (CLI scripts / plugin routes) are guarded by `parity-check`, 12 cases compared one by one

**First install:** run `npx -y -p dsh-memory-xfy dsh-memory-init`. It scaffolds a minimal working structure under `~/.dsh/` — all six layers get one real, readable file, so the panel has something to show on first open. **Existing files are never overwritten** (`--force` to overwrite, `--dir` to target another directory).

## License

MIT
