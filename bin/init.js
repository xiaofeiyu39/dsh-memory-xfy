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
title: 欢迎使用 dsh-memory-xfy
description: 这个插件干什么、记忆怎么分层、怎么搜才准、热区冷区怎么分
category: getting-started
keywords: welcome start intro memory layers search 记忆 分层 检索 搜索 入门 介绍 热区 冷区
---

## 这个插件干什么

让你的笔记**搜得到**，又不用每轮都塞进 prompt。

**文件是唯一真相源**，SQLite 只是索引。搜索是按需的——用到才查，查了才进上下文。

## 记忆分层（memory layers）

| 层 | 放什么 | 什么时候用 |
|---|---|---|
| \`rules\` | 每轮都要守的规矩（\`AGENTS.md\`） | 每轮 |
| \`docs\` | 结论、原理、怎么办 | 查资料时 |
| \`skills\` | 分步骤的操作手册、踩过的坑 | 动手时 |
| \`daily\` | 今天做了什么，一轮一个文件 | 复盘时 |
| \`logs\` | 改动日志、对外发布日志 | 复盘时 |
| \`reviews\` | 定期自省 | 复盘时 |

一句话：**每轮都用 → rules；动手才用 → skills；查资料才用 → docs；只有复盘才用 → 流水层。**

> English: used every turn → \`rules\`; used when doing → \`skills\`; used when looking
> up → \`docs\`; only in retro → \`daily\` / \`logs\` / \`reviews\`.

## 怎么搜才准（how to search well）

给**关键事实词**，别用疑问句——记忆里存的是事实，不是意图。

\`\`\`
✅ "压缩 256k 117k"
❌ "今天压缩降了多少"
\`\`\`

一次搜不到不代表没有。**换个同义词再搜**，两次都空才算真没有。

## 热区与冷区（hot vs cold）

带 \`window\` 的层（比如 \`daily\` 3 天）近期文件留在**热区**，更老的物理搬进 \`archived/\`
—— **文件位置就是冷热状态**。冷区仍然搜得到：面板里勾上「冷区记忆」。

> \`archived/\` **不是一层**，是路径前缀。搬进去的文件层名不变。

> English: layers with a \`window\` keep recent files hot; older ones move into
> \`archived/\`. File location **is** the hot/cold state. Cold entries stay searchable
> (tick **Cold memory** in the panel). \`archived/\` is not a layer, just a path prefix.
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
