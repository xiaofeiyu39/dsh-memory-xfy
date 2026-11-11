# dsh-memory-xfy

中文 · [English](README.en.md)

给 DeepSeek Harness 的**分层记忆插件**：文件是唯一的真源，SQLite 只做索引；
按需检索，不往每轮提示里塞东西。

> 它解决的不是「让模型记住更多」，而是「**让记忆能被找到**」。
> 实测：约 900 个文件、7900 段记忆，热索引 **0.16 秒**，面板搜索 ~60ms。

---

## 附带的命令行工具

`bin/` 下还有两个 Python 脚本（跟面板**同一套设计**、共用同一份 `layers.json`）：

```bash
cp bin/memq bin/mem-signals ~/.dsh/bin/ && chmod +x ~/.dsh/bin/memq ~/.dsh/bin/mem-signals

memq "关键词" -n 8      # 命令行检索
memq --pack "任务描述"  # 生成记忆简报
memq --stats            # 索引规模
mem-signals             # 聚合访问日志，算每条记忆的 importance
```

纯标准库（Python 3.9+），不依赖 npm 包。

## 为什么

上下文窗口是工作台，不是仓库。记忆涨到上下文的 10~100 倍时，正确做法是**按需检索**。

三条设计取舍，每条都对应一个具体代价：

| 做法 | 省掉了什么 |
|---|---|
| **不做每轮提示注入** | 不打 prefix cache。omlx 的 prefill 很贵，改一次提示前部 = 全量重算 |
| **不起子智能体** | 检索是同步文件操作，毫秒级，不用等一轮模型 |
| **零 native 依赖** | Node 内置 `node:sqlite` + FTS5 trigram，不用编译、不装 embedding 模型 |

---

## 装

从 npm：

```bash
dsh plugin --profile web add dsh-memory-xfy
```

从本地目录（源码 / 自己改过的版本）：

```bash
dsh plugin --profile web add /path/to/dsh-memory-xfy
```

装完**重启 DSH**，左侧会出现「记忆」；或直接开 `http://127.0.0.1:3080/`（插件注册了 `/memory-xfy/*` 路由）。

⚠️ 面板扫的是 `~/.dsh/` 下 `layers.json` 里配的目录。**目录不存在、里面没有 `.md`，面板就是空的**。

第一次装先跑一次：

```bash
npx dsh-memory-init        # 或 node bin/init.js
```

它会在 `~/.dsh/` 里建出六层、每层放一篇真实可读的内容（`AGENTS.md` / 一篇示例结论 / 一个示例技能 / 一篇日记 / 一篇复盘 / 一条改动流水），
面板第一次打开就有东西看。**已存在的文件不覆盖**，你现有的记忆不会被碰。

---

## 插件提供什么

**两个工具**（注册进模型的工具表）：

| 工具 | 用途 | 关键参数 |
|---|---|---|
| `mem_search` | 跨全部记忆层检索，返回命中位置与片段 | `query` · `limit`（默认 20）· `layer` · `must`/`not` · `path` · `category` · `since` · `createdAfter`/`Before` · `modifiedAfter`/`Before` · `tags` |
| `mem_pack` | 为当前任务生成 2~4 段「记忆简报」，不撑爆上下文 | `query` · `budget`（默认 6000 字） |

**一套 HTTP 路由 + 面板**：树 / 搜索 / 编辑 / 热↔冷转区 / 片段存档 / 提到热区。

---

## 核心概念

### 分层：按「下次什么时候用得上」分

层定义在 `~/.dsh/layers.json`（**唯一来源**，插件和脚本都读它）：

| 级 | 层 | 是什么 |
|---|---|---|
| 核心 | `rules`（AGENTS.md / LOOP.md） | 每轮都要守的规矩，密度最高 |
| 精炼 | `docs` · `skills` | 结论 / 操作手册 |
| 资产 | `bin` | 还能用的工具 |
| 流水 | `daily` · `logs` · `reviews` | 发生过什么 |

判断标准一句话：**每轮都用 → 核心；动手才用 → 技能；查资料才用 → 文档；只有复盘才用 → 流水。**

### 热 / 冷：自动降级，不是删除

`chunks`（热区）/ `chunks_record`（冷区）两张表，**默认只查热区**。

- 有 `window` 的层（如 daily 3 天 / reviews 7 天）近期留热区，其余自动沉冷区
- 超窗口的文件**物理搬进 `archived/`**——**文件位置 = 冷热状态**
- 冷区照样搜得到：面板上点「冷区记忆」

> 关键：`archived/` 不是新的一层，是**路径前缀**。搬进去的文件层名还是原来的。

### 检索：给事实词，别给疑问句

```
✅ "压缩 256k 117k"        ← 记忆里存的是事实
❌ "今天压缩降了多少"       ← 那是意图，不是事实
```

**一次 0 结果不代表没有**——换同义词再搜，两次都空才算真没有。

---

## 面板

| 功能 | 说明 |
|---|---|
| 树 | 层 → 分组 → 文件 → 小节，按需展开 |
| 搜索 | 跨层检索 + 分数 + 命中段；冷区有命中会提示「冷区还有 N 段」 |
| 编辑 | 整篇覆盖（**frontmatter 原样保留**）/ 改单节 / 删单节 |
| 热↔冷转区 | 一键搬进/搬出 `archived/`，自动重建索引 |
| 片段存档 | 只把一节剪进 `archived/` 同名文件，原文件少一节 |
| 提到热区 | 从流水里捞出好条目，累积进 `docs/`（永远热区） |

**转区的两个安全保证**（实测过）：搬完立刻换表（不留幽灵段）；冷→热时热区已有同名文件就**拒绝覆盖**并提示。

---

## 配置

`~/.dsh/layers.json` 是唯一配置源。结构是**数组**：

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

| 字段 | 作用 |
|---|---|
| `weight` | 检索时的层权重 |
| `dirs` / `files` | 目录（递归）或精确文件 |
| `exts` | 只索引这些后缀；`null` = 不限 |
| `window` | 留多少天在热区；不填 = 永远热区 |
| `only_names` | 只索引这些文件名（技能层只索引 `SKILL.md`，历史文件不占检索） |

改完重建一次索引（面板「刷新」，或跑 `memq --index`）。

---

## 常见问题

**装了之后面板是空的？**
`layers.json` 里配的目录不存在，或者里面没有 `.md`。先放几篇笔记，再刷新。

**改了 `client.js` 没生效？**
`plugin_manager` 关再开只让服务端换 bundle，**浏览器页面要整页刷新**（SPA 不会自己重拉）。踩过两次。

**搜索时 `path LIKE '%xxx%'` 返回 0？**
`chunks` 是 FTS5 虚表，`path` 是 `UNINDEXED` 列——**UNINDEXED 列上 LIKE/GLOB 恒为 0**。
用 `instr(path, 'xxx')` 或查 `files` 表。这不是 SQLite 版本问题。

---

## 状态

- 版本 `1.0.0`，在 DSH `0.2.2-rc.1` 上日常使用
- 检索质量：零针对性盲测 59/59（问法取自真实用户原话，不是自己补的考题）
- 两套实现（命令行脚本 / 插件路由）有 `parity-check` 守着，12 用例逐条比对

**首次安装**：跑一次 `npx dsh-memory-init`（或 `node bin/init.js`），会在 `~/.dsh/` 里生成一套最小可用的示例结构——六层各有一篇真实可读的内容，面板第一次打开就有东西看，**已存在的文件不覆盖**。

## 许可

MIT
