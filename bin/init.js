#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'

const args = process.argv.slice(2)
const getArg = (name, dflt) => {
  const i = args.indexOf(name)
  return i >= 0 && args[i + 1] ? args[i + 1] : dflt
}

const target = getArg('--dir', join(homedir(), '.dsh'))
const force = args.includes('--force')
const today = new Date().toLocaleDateString('en-CA')

let created = 0
let skipped = 0

function put(relPath, content) {
  const abs = join(target, relPath)
  if (existsSync(abs) && !force) {
    skipped++
    return
  }
  mkdirSync(join(abs, '..'), { recursive: true })
  writeFileSync(abs, content, 'utf8')
  created++
}

put('layers.json', JSON.stringify({
  version: 1,
  layers: [
    { name: 'rules', weight: 5, files: ['AGENTS.md'] },
    { name: 'docs', weight: 4, dirs: ['docs', 'archived/docs'], exts: ['.md'], exclude_names: ['README.md'] },
    { name: 'skills', weight: 5, dirs: ['skills', 'archived/skills'], exts: ['.md'], only_names: ['SKILL.md'] },
    { name: 'daily', weight: 3, dirs: ['daily', 'archived/daily'], exts: ['.md'], window: 3 },
    { name: 'reviews', weight: 2, dirs: ['reviews', 'archived/reviews'], exts: ['.md'], window: 7 },
    { name: 'logs', weight: 1, dirs: ['logs', 'archived/logs'], exts: ['.md'], window: 3 },
  ],
}, null, 1) + '\n')

put('AGENTS.md', `# Global instructions

Everything in this file is loaded on **every turn**. Keep it short — it competes for
context with the actual work. Anything you only need when *doing* something belongs
in \`skills/\`; anything you only need when *looking something up* belongs in \`docs/\`.

## How to talk to me

- Answer in Chinese, keep code and paths as-is.
- Lead with the conclusion, then the details. Fewer steps, not more.
- When you are not sure, say so — do not guess and present it as fact.

## What this machine is

- macOS, local model, everything on disk under \`~/.dsh\`.
- Memory is layered: \`rules\` (this file) / \`docs\` / \`skills\` / \`daily\` / \`logs\` / \`reviews\`.

## Hard rules

- Before overwriting a file, read it.
- After changing anything on disk, say which files changed and why.
`)

put('docs/welcome.md', `---
title: Welcome to dsh-memory-xfy
description: What this plugin does, how memory is layered, and how to search it well
category: getting-started
keywords: welcome start intro memory layers search
---

## What this plugin does

It makes your notes **findable** without stuffing them into every prompt.

Files are the source of truth. SQLite is only an index. Search is on demand.

## The layers

| Layer | What belongs there | How often you need it |
|---|---|---|
| \`rules\` | Rules you obey every turn (\`AGENTS.md\`) | every turn |
| \`docs\` | Conclusions, principles, how-things-work | when looking something up |
| \`skills\` | Step-by-step runbooks, gotchas | when doing something |
| \`daily\` | What happened today, round by round | during retro |
| \`logs\` | Change log, outbound log | during retro |
| \`reviews\` | Periodic self-review | during retro |

Rule of thumb: **used every turn → rules; used when doing → skills; used when
looking up → docs; only used in retro → stream.**

## How to search well

Give it **facts, not questions** — memory stores facts, not intents.

\`\`\`
✅ "compaction 256k 117k"
❌ "how much did compaction save today"
\`\`\`

One zero-result search proves nothing. Retry with synonyms; only two empty
searches mean it is really absent.

## Hot vs cold

Layers with a \`window\` (e.g. \`daily\` 3 days) keep recent files hot. Older files
are physically moved into \`archived/\` — **file location is the hot/cold state**.
Cold entries are still searchable: tick **Cold memory** in the panel.

> \`archived/\` is **not a layer**, it is a path prefix. A file moved there keeps its
> original layer name.
`)

put('skills/example-skill/SKILL.md', `---
name: example-skill
description: Use when the user asks you to do X — this line is what the model reads when deciding whether to load this skill, so write it as a trigger, not a summary.
category: example
---

# Example skill

## When to use

Replace this with the concrete situation that should make the model load this file.
A good description reads like a trigger: "Use when the user says …".

## Steps

1. First step — one action, one command.
2. Second step.
3. Verify: what does "done" look like? Name the exact check.

## Gotchas

Things that bit you before. This section is the most valuable one — a skill's worth
is not how well it is written, but whether the places you had to fix are recorded.
`)

put(`daily/${today}/r001.md`, `---
round: 1
title: "Day one"
description: "First entry — what you did, what you concluded, what is still open"
tags:
created_at: "${new Date().toISOString()}"
updated_at: "${new Date().toISOString()}"
---

## Day one

### What I did

- ...

### What I concluded

- ...

### Still open

- ...
`)

put(`reviews/${today}.md`, `---
title: "Review ${today}"
description: "Periodic self-review — what worked, what did not, what to change"
category: review
---

## What worked

- ...

## What did not

- ...

## Change exactly one thing

- ...
`)

put(`logs/changelog/${today}.md`, `## --:-- · Init scaffold generated

- Created the example memory structure in \`~/.dsh\`
- Next: open the panel and confirm all six layers show up
`)

put('bin/.gitkeep', '')

console.log(`dsh-memory-xfy init → ${target}`)
console.log(`  新建 ${created} 个文件，跳过 ${skipped} 个已存在的`)
console.log('')
console.log('下一步：')
console.log('  1. 重启 DSH（或重载插件），左侧会出现「记忆」')
console.log('  2. 或者直接开 http://127.0.0.1:3080/ ，插件注册了 /memory-xfy/* 路由')
console.log('  3. 面板第一次打开会建索引，稍等几秒')
if (skipped > 0 && !force) {
  console.log('')
  console.log('（跳过的文件没有覆盖。要覆盖加 --force）')
}
