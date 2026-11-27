window.__ModuleLoader__.load({
  id: '@local/dsh-memory-xfy',
  factory(require) {
    const React = require('react')

    const UI_ZH = {"增": "增", "查": "查", "改": "改", "删": "删", "增（只往里放新的，不改不删）": "增（只往里放新的，不改不删）", "查（能查看和搜索）": "查（能查看和搜索）", "改（能改已有的）": "改（能改已有的）", "删（能删除）": "删（能删除）", " / 共 ": " / 共 ", " · 共 ": " · 共 ", " · 点一下直接在下面打开": " · 点一下直接在下面打开", " 个": " 个", " 个 tag": " 个 tag", " 个文件": " 个文件", " 个胶囊": " 个胶囊", " 字": " 字", " 条": " 条", " 条，只显示前 ": " 条，只显示前 ", " 段": " 段", " 筛选": " 筛选", "(空)": "(空)", "- `#` 标题会变成大字\n": "- `#` 标题会变成大字\n", "- `**粗体**`、行内代码、列表、引用、代码块都会正常显示\n": "- `**粗体**`、行内代码、列表、引用、代码块都会正常显示\n", "- 长文档可以直接往下滚，不用挤在小窗里": "- 长文档可以直接往下滚，不用挤在小窗里", "DSH本体": "DSH本体", "importance 0~100：这条记忆被检索命中的次数换算来的（每次 +3，每天 ×0.995）": "importance 0~100：这条记忆被检索命中的次数换算来的（每次 +3，每天 ×0.995）", "tag 筛选…（可多选）": "tag 筛选…（可多选）", "← 返回结果列表（": "← 返回结果列表（", "● 未保存": "● 未保存", "✓ 正在检索": "✓ 正在检索", "✕ 收起": "✕ 收起", "✗ 不检索": "✗ 不检索", "⬆️ 提到热区": "⬆️ 提到热区", "⬇️ 提到冷区": "⬇️ 提到冷区", "【冷区归档】": "【冷区归档】", "上下文": "上下文", "保存": "保存", "保存失败": "保存失败", "保存失败：": "保存失败：", "保存属性": "保存属性", "保存整篇": "保存整篇", "修改": "修改", "修改 ": "修改 ", "修改有时间": "修改有时间", "借鉴": "借鉴", "全部分类": "全部分类", "全部层": "全部层", "关键词": "关键词", "关键词用空格分隔": "关键词用空格分隔", "关闭": "关闭", "收起左侧栏": "收起左侧栏", "展开左侧栏": "展开左侧栏", "按住左右拖：调左栏宽度 · 双击恢复默认": "按住左右拖：调左栏宽度 · 双击恢复默认", "存放位置": "存放位置", "导出配置": "导出配置", "导入配置": "导入配置", "写下新条目，再点「保存」": "写下新条目，再点「保存」", "冷": "冷", "冷区记忆": "冷区记忆", "本地": "本地", "分享": "分享", "共享": "共享", "同步": "同步", "冷区：超窗口的旧流水 / 搬进 archived/ 的归档。层名不变，是路径自己编码了冷热。": "冷区：超窗口的旧流水 / 搬进 archived/ 的归档。层名不变，是路径自己编码了冷热。", "分类": "分类", "分类 ": "分类 ", "创建": "创建", "创建 ": "创建 ", "创建有时间": "创建有时间", "删除": "删除", "刷新": "刷新", "加载中…": "加载中…", "原文": "原文", "取消": "取消", "只看冷区": "只看冷区", "只看热区": "只看热区", "命中 ": "命中 ", "在 Finder 中打开这个目录": "在 Finder 中打开这个目录", "完成": "完成", "层 ": "层 ", "展开全部 ": "展开全部 ", "属性保存失败": "属性保存失败", "左树已同步只显示命中的文件；点「刷新」恢复初始条件": "左树已同步只显示命中的文件；点「刷新」恢复初始条件", "左边点开任意一条记忆，这里就能看到原文，**默认渲染成带层级的排版**。\n\n": "左边点开任意一条记忆，这里就能看到原文，**默认渲染成带层级的排版**。\n\n", "已保存": "已保存", "已保存并重新索引": "已保存并重新索引", "已保存整篇并重新索引": "已保存整篇并重新索引", "已删除这一条": "已删除这一条", "已复制路径": "已复制路径", "已转区": "已转区", "已验证": "已验证", "循环": "循环", "恢复初始条件：清空搜索与筛选、层回到「全部层」、只看热区": "恢复初始条件：清空搜索与筛选、层回到「全部层」、只看热区", "想改就点右上角「编辑」；改完点「保存」写回磁盘并自动重新索引。点「删除」要先点两次。\n\n": "想改就点右上角「编辑」；改完点「保存」写回磁盘并自动重新索引。点「删除」要先点两次。\n\n", "打不开这一条": "打不开这一条", "打不开这个文件": "打不开这个文件", "打开": "打开", "技术字段 ": "技术字段 ", "技能": "技能", "技能迭代历史（archived/skills/）住在冷区，默认不搜。": "技能迭代历史（archived/skills/）住在冷区，默认不搜。", "把整个文件移回 ~/.dsh/（热区）。冷热只由路径决定，移动即转区。": "把整个文件移回 ~/.dsh/（热区）。冷热只由路径决定，移动即转区。", "把整个文件移进 ~/.dsh/archived/（冷区），它就不会再出现在默认检索里。": "把整个文件移进 ~/.dsh/archived/（冷区），它就不会再出现在默认检索里。", "把这一段取回原文件，插回它原来的位置（按存档标记里的 after）。": "把这一段取回原文件，插回它原来的位置（按存档标记里的 after）。", "把这一节剪出来存进 archived/ 同名文件（原文件少一节，不删内容）。适合把迭代历史、旧版本沉到冷区。": "把这一节剪出来存进 archived/ 同名文件（原文件少一节，不删内容）。适合把迭代历史、旧版本沉到冷区。", "搜索词和筛选条件都是空的": "搜索词和筛选条件都是空的", "搜记忆…（\"词\" = 必含）": "搜记忆…（\\\"词\\\" = 必含）", "操作失败": "操作失败", "收起": "收起", "收起 tag": "收起 tag", "收起结果栏（结果不丢，点「返回结果列表」还在）": "收起结果栏（结果不丢，点「返回结果列表」还在）", "改标题/分类/关键词/简介": "改标题/分类/关键词/简介", "改位置": "改位置", "文件 ": "文件 ", "新增一条": "新增一条", "新增条目": "新增条目", "无命中": "无命中", "显示全部 ": "显示全部 ", "标题": "标题", "树加载失败": "树加载失败", "核心": "核心", "桌面": "桌面", "检索": "检索", "正在用 Chrome 打开原文…": "正在用 Chrome 打开原文…", "没有命中。换个说法，或用同义词/英文名/报错原文再试。": "没有命中。换个说法，或用同义词/英文名/报错原文再试。", "没有命中的文件（点右上「刷新」恢复全树）": "没有命中的文件（点右上「刷新」恢复全树）", "清空筛选": "清空筛选", "渲染出错：": "渲染出错：", "点「冷区记忆」按钮或在这里加 --all 才会进结果。": "点「冷区记忆」按钮或在这里加 --all 才会进结果。", "点击复制完整路径\n": "点击复制完整路径\n", "热": "热", "热区 / 冷区都关着 —— 在统计条上点开一个才有东西看": "热区 / 冷区都关着 —— 在统计条上点开一个才有东西看", "热区记忆": "热区记忆", "热区：近期流水 + 全部结论层。默认检索范围。": "热区：近期流水 + 全部结论层。默认检索范围。", "片段 ": "片段 ", "片段操作失败": "片段操作失败", "用 Chrome 打开这一轮的**完整原始对话**（原文，未经压缩）": "用 Chrome 打开这一轮的**完整原始对话**（原文，未经压缩）", "用默认应用打开这个文件": "用默认应用打开这个文件", "确认删除？": "确认删除？", "社交": "社交", "移除": "移除", "第 ": "第 ", "简介": "简介", "简介：": "简介：", "编辑": "编辑", "草稿": "草稿", "记忆": "记忆", "记忆不进上下文，只被检索。这里是全部记忆的全貌——点开就能读，也能改，改完立即生效。": "记忆不进上下文，只被检索。这里是全部记忆的全貌——点开就能读，也能改，改完立即生效。", "词\\": "词\\", "请求失败": "请求失败", "请求失败：": "请求失败：", "读不到索引（Host 路由没起来？）": "读不到索引（Host 路由没起来？）", "超窗口的旧流水 + 搬进 archived/ 的归档（层名不变，路径自己编码冷热）。默认不选，点开就重搜": "超窗口的旧流水 + 搬进 archived/ 的归档（层名不变，路径自己编码冷热）。默认不选，点开就重搜", "转区失败": "转区失败", "近期流水 + 全部结论层。默认选中": "近期流水 + 全部结论层。默认选中", "还原": "还原", "这个层没勾选（在「筛选 → 全部层」里勾上）": "这个层没勾选（在「筛选 → 全部层」里勾上）", "重要": "重要", "重要 ": "重要 ", "重要性上限（0~100）": "重要性上限（0~100）", "重要性下限（0~100）· ≥85 核心 · 65~84 已验证 · <65 草稿": "重要性下限（0~100）· ≥85 核心 · 65~84 已验证 · <65 草稿", "预览": "预览", "高级搜索：层 / 分类 / 重要 / tag / 创建·修改时间": "高级搜索：层 / 分类 / 重要 / tag / 创建·修改时间", "（共 ": "（共 ", "（点名字看整篇，点三角展开）": "（点名字看整篇，点三角展开）", "💡 冷区还有 ": "💡 冷区还有 ", "📤 恢复回原位": "📤 恢复回原位", "📦 存档这一节": "📦 存档这一节", "": "", "\n\n程序（bin/ projects/ telegram/）不动。": "\n\n程序（bin/ projects/ telegram/）不动。", "\n共 ": "\n共 ", " · 冷 ": " · 冷 ", " 个文件 · ": " 个文件 · ", " 份 .conflict- 副本，本地这稿没动）": " 份 .conflict- 副本，本地这稿没动）", " 层": " 层", " 条路径：": " 条路径：", " 段，只显示前 ": " 段，只显示前 ", " 篇": " 篇", " 篇一样 · ": " 篇一样 · ", " 篇你这边多出来": " 篇你这边多出来", " 篇你这里没有 · ": " 篇你这里没有 · ", " 篇内容不同 · ": " 篇内容不同 · ", " 行": " 行", " 行（shift 点一行可整段选；shift 点方框 = 整段打这一位）": " 行（shift 点一行可整段选；shift 点方框 = 整段打这一位）", "- `rules` 跟着 `AGENTS.md`、`skills` 跟着技能目录，这两层不能改": "- `rules` 跟着 `AGENTS.md`、`skills` 跟着技能目录，这两层不能改", "- 主路径只有一份，可以指到 `.dsh` 之外；改它会连 `mem.db` 一起整体搬\n": "- 主路径只有一份，可以指到 `.dsh` 之外；改它会连 `mem.db` 一起整体搬\n", "- 冷区是热区结构的镜像：`docs` ↔ `archived/docs`、`logs/changelog` ↔ `archived/logs/changelog`\n": "- 冷区是热区结构的镜像：`docs` ↔ `archived/docs`、`logs/changelog` ↔ `archived/logs/changelog`\n", "- 细分路径一律相对主路径（写 `docs`，不是 `/Users/…/docs`）\n": "- 细分路径一律相对主路径（写 `docs`，不是 `/Users/…/docs`）\n", "mem-serve 已自动重启，对方立刻连不上": "mem-serve 已自动重启，对方立刻连不上", "mem-serve 已自动重启，立即可用": "mem-serve 已自动重启，立即可用", "token 已复制": "token 已复制", "← 返回": "← 返回", "⚠️ 搬完对不上：": "⚠️ 搬完对不上：", "。权限见下（只有对方能改）": "。权限见下（只有对方能改）", "」": "」", "」—— ": "」—— ", "不同的：": "不同的：", "不是本插件导出的配置（缺 kind）": "不是本插件导出的配置（缺 kind）", "主服务器给你的 token": "主服务器给你的 token", "主路径": "主路径", "主路径改成哪？（绝对路径，留空 = ~/.dsh）\n所有记忆文件会整体搬过去（包括 mem.db）\n\n现在是：": "主路径改成哪？（绝对路径，留空 = ~/.dsh）\n所有记忆文件会整体搬过去（包括 mem.db）\n\n现在是：", "主路径要给绝对路径（或留空 = ~/.dsh）": "主路径要给绝对路径（或留空 = ~/.dsh）", "会把所有记忆文件整体搬到：\n": "会把所有记忆文件整体搬到：\n", "会真的把整个冷区搬过去（不是软链）：\n": "会真的把整个冷区搬过去（不是软链）：\n", "会真的把文件搬过去（不是软链）：\n": "会真的把文件搬过去（不是软链）：\n", "保存并连接": "保存并连接", "先「保存并连接」拿到权限再同步": "先「保存并连接」拿到权限再同步", "先填服务器网址和 token": "先填服务器网址和 token", "全选": "全选", "写落点 ": "写落点 ", "冷区": "冷区", "冷区统一放在哪个子路径？（相对主路径，默认 archived）\n\n现在是：": "冷区统一放在哪个子路径？（相对主路径，默认 archived）\n\n现在是：", "删除失败：": "删除失败：", "双向同步：两边都能改，冲突走三方合并，合不掉的进 conflict/": "双向同步：两边都能改，冲突走三方合并，合不掉的进 conflict/", "只有本机有这篇（没连远端，或远端权限没覆盖到它）": "只有本机有这篇（没连远端，或远端权限没覆盖到它）", "只能写相对主路径的子路径，不是绝对路径": "只能写相对主路径的子路径，不是绝对路径", "只读授权：这篇以远端为准，本地改了同步时会被远端覆盖": "只读授权：这篇以远端为准，本地改了同步时会被远端覆盖", "同步失败": "同步失败", "同步失败：": "同步失败：", "同步完成：拉回 ": "同步完成：拉回 ", "固定": "固定", "复制失败，手动选中复制：": "复制失败，手动选中复制：", "子路径不能留空": "子路径不能留空", "对方给你：": "对方给你：", "对面没回话": "对面没回话", "导入中…": "导入中…", "导入会覆盖现在的层定义和 token 权限，确定？\n\n配置里有 ": "导入会覆盖现在的层定义和 token 权限，确定？\n\n配置里有 ", "导入失败：": "导入失败：", "导入完成：层定义 + 插件配置都换了（刷新页面生效）": "导入完成：层定义 + 插件配置都换了（刷新页面生效）", "导出包含：层定义 + 每层目录 + token 权限 + 同步地址/token": "导出包含：层定义 + 每层目录 + token 权限 + 同步地址/token", "导出失败：": "导出失败：", "已删掉 token「": "已删掉 token「", "已导出：层定义 + 每层目录 + token 权限 + 同步地址/token": "已导出：层定义 + 每层目录 + token 权限 + 同步地址/token", "已搬到 ": "已搬到 ", "已改名为「": "已改名为「", "已断开同步 —— 现在是纯本地，已经同步下来的文件都留着": "已断开同步 —— 现在是纯本地，已经同步下来的文件都留着", "已新建 profile「": "已新建 profile「", "已标记删除 —— 点「保存」才真删": "已标记删除 —— 点「保存」才真删", "已选 ": "已选 ", "所有记忆文件都在**同一个主路径**下面，不分散。搬家是**真搬**，不是软链。\n\n": "所有记忆文件都在**同一个主路径**下面，不分散。搬家是**真搬**，不是软链。\n\n", "搬家中…": "搬家中…", "搬迁失败：": "搬迁失败：", "收起关键词": "收起关键词", "改名": "改名", "改名失败：": "改名失败：", "改成什么子路径？（相对主路径，比如 docs、logs/changelog）\n\n现在是：": "改成什么子路径？（相对主路径，比如 docs、logs/changelog）\n\n现在是：", "改成别的子路径（真搬）": "改成别的子路径（真搬）", "断开同步": "断开同步", "断开失败：": "断开失败：", "新名字": "新名字", "新建 token": "新建 token", "新建失败：": "新建失败：", "服务器": "服务器", "权限全由主服务器给，这边只能看不能改；同步是整份覆盖本地对应层级。": "权限全由主服务器给，这边只能看不能改；同步是整份覆盖本地对应层级。", "权限没保存上：": "权限没保存上：", "标记删除这个 token": "标记删除这个 token", "没有这一位": "没有这一位", "清掉服务器和 token，回到纯本地（已经同步下来的文件都留着，不会删）": "清掉服务器和 token，回到纯本地（已经同步下来的文件都留着，不会删）", "清空选择": "清空选择", "点一下复制这个 token": "点一下复制这个 token", "热 ": "热 ", "直接放在主路径根下（文件白名单）": "直接放在主路径根下（文件白名单）", "真的删掉（删完自动重启 mem-serve，立刻失效）": "真的删掉（删完自动重启 mem-serve，立刻失效）", "确定": "确定", "立即同步": "立即同步", "给全部": "给全部", "给这个 profile 改个名字（token 值不变）": "给这个 profile 改个名字（token 值不变）", "给选中的 ": "给选中的 ", "缺的：": "缺的：", "网络分享（生成 token）": "网络分享（生成 token）", "记忆同步（导入 token）": "记忆同步（导入 token）", "设置：哪个 profile 能读 / 增 / 改 / 删哪些记忆": "设置：哪个 profile 能读 / 增 / 改 / 删哪些记忆", "读不到层目录：": "读不到层目录：", "读不到设置：": "读不到设置：", "读取中…": "读取中…", "跟对方比：": "跟对方比：", "还没有 token，点 ＋ 新建": "还没有 token，点 ＋ 新建", "这个文件不是合法 JSON": "这个文件不是合法 JSON", "远端能读这篇、但不能改 —— 以远端为准，本地改动同步时会被覆盖": "远端能读这篇、但不能改 —— 以远端为准，本地改动同步时会被覆盖", "连上了：": "连上了：", "连不上：": "连不上：", "连接中…": "连接中…", "选一个 token…": "选一个 token…", "选一个 token（每个 token 就是一套权限）": "选一个 token（每个 token 就是一套权限）", "重启 mem-serve 后才对外生效": "重启 mem-serve 后才对外生效", "重启 mem-serve 才生效": "重启 mem-serve 才生效", "（一份，按各层细分路径镜像：": "（一份，按各层细分路径镜像：", "（含 mem.db）": "（含 mem.db）", "（服务器那份另存 ": "（服务器那份另存 ", "（点一下：全部给 / 全部收回）": "（点一下：全部给 / 全部收回）", "（落地 ": "（落地 ", "（部分）": "（部分）", "（默认 ~/.dsh）": "（默认 ~/.dsh）", "）": "）", "，冲突 ": "，冲突 ", "，被拒 ": "，被拒 ", "还有 ": "还有 ", " 个 · 继续输入缩小范围": " 个 · 继续输入缩小范围", "网络分享": "网络分享", "记忆同步": "记忆同步", "只有本机有这篇（没连远端，也没有任何已发出的 token 覆盖到它）": "只有本机有这篇（没连远端，也没有任何已发出的 token 覆盖到它）", "只读分享：对端只能读这篇、不能改 —— 以对端为准，本地改动同步时会被覆盖": "只读分享：对端只能读这篇、不能改 —— 以对端为准，本地改动同步时会被覆盖", "双向同步：对端也能改这篇 —— 冲突走三方合并，合不掉的进 conflict/": "双向同步：对端也能改这篇 —— 冲突走三方合并，合不掉的进 conflict/", "已导出：层定义（含层级顺序）+ 每层目录 + token 权限 + 同步地址/token": "已导出：层定义（含层级顺序）+ 每层目录 + token 权限 + 同步地址/token", "只读分享：对端只能读这篇、不能改 —— 本机照常可以编辑，改完对方下次同步才收到新内容": "只读分享：对端只能读这篇、不能改 —— 本机照常可以编辑，改完对方下次同步才收到新内容"};
    const UI_EN = {"\u589e": "C", "\u67e5": "R", "\u6539": "U", "\u5220": "D", "\u589e\uff08\u53ea\u5f80\u91cc\u653e\u65b0\u7684\uff0c\u4e0d\u6539\u4e0d\u5220\uff09": "C \u2014 create new only", "\u67e5\uff08\u80fd\u67e5\u770b\u548c\u641c\u7d22\uff09": "R \u2014 read & search", "\u6539\uff08\u80fd\u6539\u5df2\u6709\u7684\uff09": "U \u2014 update existing", "\u5220\uff08\u80fd\u5220\u9664\uff09": "D \u2014 delete", " / \u5171 ": " / of ", " \u00b7 \u5171 ": " \u00b7 of ", " \u00b7 \u70b9\u4e00\u4e0b\u76f4\u63a5\u5728\u4e0b\u9762\u6253\u5f00": " \u00b7 click to open below", " \u4e2a": "", " \u4e2a tag": " tags", " \u4e2a\u6587\u4ef6": " files", " \u4e2a\u80f6\u56ca": " chips", " \u5b57": " chars", " \u6761": "", " \u6761\uff0c\u53ea\u663e\u793a\u524d ": " shown, first ", " \u6bb5": " chunks", " \u7b5b\u9009": " Filter", "(\u7a7a)": "(empty)", "- `#` \u6807\u9898\u4f1a\u53d8\u6210\u5927\u5b57\n": "- `#` headings become large text\n", "- `**\u7c97\u4f53**`\u3001\u884c\u5185\u4ee3\u7801\u3001\u5217\u8868\u3001\u5f15\u7528\u3001\u4ee3\u7801\u5757\u90fd\u4f1a\u6b63\u5e38\u663e\u793a\n": "- `**bold**`, inline code, lists, quotes and code blocks all render normally\n", "- \u957f\u6587\u6863\u53ef\u4ee5\u76f4\u63a5\u5f80\u4e0b\u6eda\uff0c\u4e0d\u7528\u6324\u5728\u5c0f\u7a97\u91cc": "- Long documents scroll in place \u2014 no cramped box", "DSH\u672c\u4f53": "DSH core", "importance 0~100\uff1a\u8fd9\u6761\u8bb0\u5fc6\u88ab\u68c0\u7d22\u547d\u4e2d\u7684\u6b21\u6570\u6362\u7b97\u6765\u7684\uff08\u6bcf\u6b21 +3\uff0c\u6bcf\u5929 \u00d70.995\uff09": "importance 0\u2013100: derived from how often this memory is retrieved (+3 per hit, \u00d70.995 per day)", "tag \u7b5b\u9009\u2026\uff08\u53ef\u591a\u9009\uff09": "filter by tag\u2026 (multi-select)", "\u2190 \u8fd4\u56de\u7ed3\u679c\u5217\u8868\uff08": "\u2190 back to results (", "\u25cf \u672a\u4fdd\u5b58": "\u25cf unsaved", "\u2713 \u6b63\u5728\u68c0\u7d22": "\u2713 searching", "\u2715 \u6536\u8d77": "\u2715 collapse", "\u2717 \u4e0d\u68c0\u7d22": "\u2717 not searched", "\u2b06\ufe0f \u63d0\u5230\u70ed\u533a": "\u2b06\ufe0f promote to hot", "\u2b07\ufe0f \u63d0\u5230\u51b7\u533a": "\u2b07\ufe0f move to cold", "\u3010\u51b7\u533a\u5f52\u6863\u3011": "[cold archive]", "\u4e0a\u4e0b\u6587": "context", "\u4fdd\u5b58": "Save", "\u4fdd\u5b58\u5931\u8d25": "Save failed", "\u4fdd\u5b58\u5931\u8d25\uff1a": "Save failed: ", "\u4fdd\u5b58\u5c5e\u6027": "Save properties", "\u4fdd\u5b58\u6574\u7bc7": "Save whole file", "\u4fee\u6539": "Modified", "\u4fee\u6539 ": "Modified ", "\u4fee\u6539\u6709\u65f6\u95f4": "modified time set", "\u501f\u9274": "reference", "\u5168\u90e8\u5206\u7c7b": "All categories", "\u5168\u90e8\u5c42": "All layers", "\u5173\u952e\u8bcd": "Keywords", "\u5173\u952e\u8bcd\u7528\u7a7a\u683c\u5206\u9694": "separate keywords with spaces", "\u5173\u95ed": "Close", "\u6536\u8d77\u5de6\u4fa7\u680f": "Collapse sidebar", "\u5c55\u5f00\u5de6\u4fa7\u680f": "Expand sidebar", "\u6309\u4f4f\u5de6\u53f3\u62d6\uff1a\u8c03\u5de6\u680f\u5bbd\u5ea6 \u00b7 \u53cc\u51fb\u6062\u590d\u9ed8\u8ba4": "Drag to resize the sidebar \u00b7 double-click to reset", "\u5199\u4e0b\u65b0\u6761\u76ee\uff0c\u518d\u70b9\u300c\u4fdd\u5b58\u300d": "write a new entry, then click Save", "\u51b7": "cold", "\u672c\u5730": "local", "\u5171\u4eab": "shared", "\u5206\u4eab": "shared", "\u540c\u6b65": "sync", "\u5b58\u653e\u4f4d\u7f6e": "Storage location", "\u6539\u4f4d\u7f6e": "Move", "\u4e0d\u80fd\u642c": "fixed", "\u5bfc\u51fa\u914d\u7f6e": "Export config", "\u5bfc\u5165\u914d\u7f6e": "Import config", "\u53ea\u6709\u672c\u673a\u6709\u8fd9\u7bc7\uff08\u6ca1\u8fde\u8fdc\u7aef\uff0c\u6216\u8fdc\u7aef\u6743\u9650\u6ca1\u8986\u76d6\u5230\u5b83\uff09": "This entry exists only on this machine (no remote configured, or the remote grant does not cover it)", "\u8fdc\u7aef\u80fd\u8bfb\u8fd9\u7bc7\u3001\u4f46\u4e0d\u80fd\u6539 \u2014\u2014 \u4ee5\u8fdc\u7aef\u4e3a\u51c6\uff0c\u672c\u5730\u6539\u52a8\u540c\u6b65\u65f6\u4f1a\u88ab\u8986\u76d6": "The remote can read this entry but not write it \u2014 the remote always wins; local edits get overwritten on sync", "\u53cc\u5411\u540c\u6b65\uff1a\u4e24\u8fb9\u90fd\u80fd\u6539\uff0c\u51b2\u7a81\u8d70\u4e09\u65b9\u5408\u5e76\uff0c\u5408\u4e0d\u6389\u7684\u8fdb conflict/": "Two-way sync: both sides can edit; merge is three-way and unsolved conflicts land in conflict/", "\u53ea\u8bfb\u6388\u6743\uff1a\u8fd9\u7bc7\u4ee5\u8fdc\u7aef\u4e3a\u51c6\uff0c\u672c\u5730\u6539\u4e86\u540c\u6b65\u65f6\u4f1a\u88ab\u8fdc\u7aef\u8986\u76d6": "Read-only grant: the remote wins, so local edits get overwritten on sync", "\u51b7\u533a\u8bb0\u5fc6": "Cold memory", "\u51b7\u533a\uff1a\u8d85\u7a97\u53e3\u7684\u65e7\u6d41\u6c34 / \u642c\u8fdb archived/ \u7684\u5f52\u6863\u3002\u5c42\u540d\u4e0d\u53d8\uff0c\u662f\u8def\u5f84\u81ea\u5df1\u7f16\u7801\u4e86\u51b7\u70ed\u3002": "Cold: stream entries past the window, plus anything moved into archived/. Layer names stay the same \u2014 the path alone encodes hot/cold.", "\u5206\u7c7b": "Category", "\u5206\u7c7b ": "Category ", "\u521b\u5efa": "Created", "\u521b\u5efa ": "Created ", "\u521b\u5efa\u6709\u65f6\u95f4": "created time set", "\u5220\u9664": "Delete", "\u5237\u65b0": "Refresh", "\u52a0\u8f7d\u4e2d\u2026": "Loading\u2026", "\u539f\u6587": "Raw", "\u53d6\u6d88": "Cancel", "\u53ea\u770b\u51b7\u533a": "cold only", "\u53ea\u770b\u70ed\u533a": "hot only", "\u547d\u4e2d ": "hits ", "\u5728 Finder \u4e2d\u6253\u5f00\u8fd9\u4e2a\u76ee\u5f55": "Reveal this directory in Finder", "\u5b8c\u6210": "Done", "\u5c42 ": "layer ", "\u5c55\u5f00\u5168\u90e8 ": "expand all ", "\u5c5e\u6027\u4fdd\u5b58\u5931\u8d25": "Failed to save properties", "\u5de6\u6811\u5df2\u540c\u6b65\u53ea\u663e\u793a\u547d\u4e2d\u7684\u6587\u4ef6\uff1b\u70b9\u300c\u5237\u65b0\u300d\u6062\u590d\u521d\u59cb\u6761\u4ef6": "Tree filtered to matching files; click Refresh to reset", "\u5de6\u8fb9\u70b9\u5f00\u4efb\u610f\u4e00\u6761\u8bb0\u5fc6\uff0c\u8fd9\u91cc\u5c31\u80fd\u770b\u5230\u539f\u6587\uff0c**\u9ed8\u8ba4\u6e32\u67d3\u6210\u5e26\u5c42\u7ea7\u7684\u6392\u7248**\u3002\n\n": "Pick any entry on the left and its raw text shows up here, **rendered with structure by default**.\n\n", "\u5df2\u4fdd\u5b58": "Saved", "\u5df2\u4fdd\u5b58\u5e76\u91cd\u65b0\u7d22\u5f15": "Saved and re-indexed", "\u5df2\u4fdd\u5b58\u6574\u7bc7\u5e76\u91cd\u65b0\u7d22\u5f15": "Whole file saved and re-indexed", "\u5df2\u5220\u9664\u8fd9\u4e00\u6761": "Entry deleted", "\u5df2\u590d\u5236\u8def\u5f84": "Path copied", "\u5df2\u8f6c\u533a": "Moved", "\u5df2\u9a8c\u8bc1": "verified", "\u5faa\u73af": "Loop", "\u6062\u590d\u521d\u59cb\u6761\u4ef6\uff1a\u6e05\u7a7a\u641c\u7d22\u4e0e\u7b5b\u9009\u3001\u5c42\u56de\u5230\u300c\u5168\u90e8\u5c42\u300d\u3001\u53ea\u770b\u70ed\u533a": "Reset: clear search and filters, all layers, hot only", "\u60f3\u6539\u5c31\u70b9\u53f3\u4e0a\u89d2\u300c\u7f16\u8f91\u300d\uff1b\u6539\u5b8c\u70b9\u300c\u4fdd\u5b58\u300d\u5199\u56de\u78c1\u76d8\u5e76\u81ea\u52a8\u91cd\u65b0\u7d22\u5f15\u3002\u70b9\u300c\u5220\u9664\u300d\u8981\u5148\u70b9\u4e24\u6b21\u3002\n\n": "Click **Edit** in the top right to change it; **Save** writes back to disk and re-indexes. **Delete** needs two clicks.\n\n", "\u6253\u4e0d\u5f00\u8fd9\u4e00\u6761": "Could not open this entry", "\u6253\u4e0d\u5f00\u8fd9\u4e2a\u6587\u4ef6": "Could not open this file", "\u6253\u5f00": "Open", "\u6280\u672f\u5b57\u6bb5 ": "technical fields ", "\u6280\u80fd": "Skills", "\u6280\u80fd\u8fed\u4ee3\u5386\u53f2\uff08archived/skills/\uff09\u4f4f\u5728\u51b7\u533a\uff0c\u9ed8\u8ba4\u4e0d\u641c\u3002": "Skill iteration history (archived/skills/) lives in cold storage and is not searched by default.", "\u628a\u6574\u4e2a\u6587\u4ef6\u79fb\u56de ~/.dsh/\uff08\u70ed\u533a\uff09\u3002\u51b7\u70ed\u53ea\u7531\u8def\u5f84\u51b3\u5b9a\uff0c\u79fb\u52a8\u5373\u8f6c\u533a\u3002": "Move the whole file back under ~/.dsh/ (hot). Only the path decides hot/cold \u2014 moving is the switch.", "\u628a\u6574\u4e2a\u6587\u4ef6\u79fb\u8fdb ~/.dsh/archived/\uff08\u51b7\u533a\uff09\uff0c\u5b83\u5c31\u4e0d\u4f1a\u518d\u51fa\u73b0\u5728\u9ed8\u8ba4\u68c0\u7d22\u91cc\u3002": "Move the whole file into ~/.dsh/archived/ (cold) and it stops showing up in default search.", "\u628a\u8fd9\u4e00\u6bb5\u53d6\u56de\u539f\u6587\u4ef6\uff0c\u63d2\u56de\u5b83\u539f\u6765\u7684\u4f4d\u7f6e\uff08\u6309\u5b58\u6863\u6807\u8bb0\u91cc\u7684 after\uff09\u3002": "Take this section back into its source file, at its original position (using the after marker).", "\u628a\u8fd9\u4e00\u8282\u526a\u51fa\u6765\u5b58\u8fdb archived/ \u540c\u540d\u6587\u4ef6\uff08\u539f\u6587\u4ef6\u5c11\u4e00\u8282\uff0c\u4e0d\u5220\u5185\u5bb9\uff09\u3002\u9002\u5408\u628a\u8fed\u4ee3\u5386\u53f2\u3001\u65e7\u7248\u672c\u6c89\u5230\u51b7\u533a\u3002": "Cut this section into a same-named file under archived/ (the source keeps everything else). Good for sinking iteration history into cold storage.", "\u641c\u7d22\u8bcd\u548c\u7b5b\u9009\u6761\u4ef6\u90fd\u662f\u7a7a\u7684": "Search and filters are both empty", "\u641c\u8bb0\u5fc6\u2026\uff08\"\u8bcd\" = \u5fc5\u542b\uff09": "search memory\u2026 (\"word\" = must contain)", "\u64cd\u4f5c\u5931\u8d25": "Operation failed", "\u6536\u8d77": "Collapse", "\u6536\u8d77 tag": "collapse tags", "\u6536\u8d77\u7ed3\u679c\u680f\uff08\u7ed3\u679c\u4e0d\u4e22\uff0c\u70b9\u300c\u8fd4\u56de\u7ed3\u679c\u5217\u8868\u300d\u8fd8\u5728\uff09": "Collapse the results bar (results are kept \u2014 use \"back to results\")", "\u6539\u6807\u9898/\u5206\u7c7b/\u5173\u952e\u8bcd/\u7b80\u4ecb": "edit title / category / keywords / description", "\u6587\u4ef6 ": "file ", "\u65b0\u589e\u4e00\u6761": "New entry", "\u65b0\u589e\u6761\u76ee": "New entry", "\u65e0\u547d\u4e2d": "no hits", "\u663e\u793a\u5168\u90e8 ": "show all ", "\u6807\u9898": "Title", "\u6811\u52a0\u8f7d\u5931\u8d25": "Failed to load tree", "\u6838\u5fc3": "Core", "\u684c\u9762": "Desktop", "\u68c0\u7d22": "Search", "\u6b63\u5728\u7528 Chrome \u6253\u5f00\u539f\u6587\u2026": "Opening raw text in Chrome\u2026", "\u6ca1\u6709\u547d\u4e2d\u3002\u6362\u4e2a\u8bf4\u6cd5\uff0c\u6216\u7528\u540c\u4e49\u8bcd/\u82f1\u6587\u540d/\u62a5\u9519\u539f\u6587\u518d\u8bd5\u3002": "No hits. Rephrase it, or try a synonym / English name / the verbatim error text.", "\u6ca1\u6709\u547d\u4e2d\u7684\u6587\u4ef6\uff08\u70b9\u53f3\u4e0a\u300c\u5237\u65b0\u300d\u6062\u590d\u5168\u6811\uff09": "No matching files (click Refresh to restore the tree)", "\u6e05\u7a7a\u7b5b\u9009": "Clear filters", "\u6e32\u67d3\u51fa\u9519\uff1a": "Render error: ", "\u70b9\u300c\u51b7\u533a\u8bb0\u5fc6\u300d\u6309\u94ae\u6216\u5728\u8fd9\u91cc\u52a0 --all \u624d\u4f1a\u8fdb\u7ed3\u679c\u3002": "Click the \"Cold memory\" button, or add --all here, to include it.", "\u70b9\u51fb\u590d\u5236\u5b8c\u6574\u8def\u5f84\n": "click to copy the full path\n", "\u70ed": "hot", "\u70ed\u533a / \u51b7\u533a\u90fd\u5173\u7740 \u2014\u2014 \u5728\u7edf\u8ba1\u6761\u4e0a\u70b9\u5f00\u4e00\u4e2a\u624d\u6709\u4e1c\u897f\u770b": "Both hot and cold are off \u2014 turn one on in the stats bar to see anything", "\u70ed\u533a\u8bb0\u5fc6": "Hot memory", "\u70ed\u533a\uff1a\u8fd1\u671f\u6d41\u6c34 + \u5168\u90e8\u7ed3\u8bba\u5c42\u3002\u9ed8\u8ba4\u68c0\u7d22\u8303\u56f4\u3002": "Hot: recent stream plus every distilled layer. The default search scope.", "\u7247\u6bb5 ": "chunk ", "\u7247\u6bb5\u64cd\u4f5c\u5931\u8d25": "Chunk operation failed", "\u7528 Chrome \u6253\u5f00\u8fd9\u4e00\u8f6e\u7684**\u5b8c\u6574\u539f\u59cb\u5bf9\u8bdd**\uff08\u539f\u6587\uff0c\u672a\u7ecf\u538b\u7f29\uff09": "Open this round's **full raw conversation** in Chrome (uncompressed)", "\u7528\u9ed8\u8ba4\u5e94\u7528\u6253\u5f00\u8fd9\u4e2a\u6587\u4ef6": "Open this file in its default app", "\u786e\u8ba4\u5220\u9664\uff1f": "Delete for sure?", "\u793e\u4ea4": "Social", "\u79fb\u9664": "Remove", "\u7b2c ": "round ", "\u7b80\u4ecb": "Description", "\u7b80\u4ecb\uff1a": "Description: ", "\u7f16\u8f91": "Edit", "\u8349\u7a3f": "draft", "\u8bb0\u5fc6": "Memory", "\u8bb0\u5fc6\u4e0d\u8fdb\u4e0a\u4e0b\u6587\uff0c\u53ea\u88ab\u68c0\u7d22\u3002\u8fd9\u91cc\u662f\u5168\u90e8\u8bb0\u5fc6\u7684\u5168\u8c8c\u2014\u2014\u70b9\u5f00\u5c31\u80fd\u8bfb\uff0c\u4e5f\u80fd\u6539\uff0c\u6539\u5b8c\u7acb\u5373\u751f\u6548\u3002": "Memory never enters the context; it is only searched. This is the whole picture \u2014 open any entry to read or edit it, and changes take effect immediately.", "\u8bcd\\": "word\\", "\u8bf7\u6c42\u5931\u8d25": "Request failed", "\u8bf7\u6c42\u5931\u8d25\uff1a": "Request failed: ", "\u8bfb\u4e0d\u5230\u7d22\u5f15\uff08Host \u8def\u7531\u6ca1\u8d77\u6765\uff1f\uff09": "Cannot read the index (is the host route up?)", "\u8d85\u7a97\u53e3\u7684\u65e7\u6d41\u6c34 + \u642c\u8fdb archived/ \u7684\u5f52\u6863\uff08\u5c42\u540d\u4e0d\u53d8\uff0c\u8def\u5f84\u81ea\u5df1\u7f16\u7801\u51b7\u70ed\uff09\u3002\u9ed8\u8ba4\u4e0d\u9009\uff0c\u70b9\u5f00\u5c31\u91cd\u641c": "Stream entries past the window plus anything in archived/ (layer names unchanged \u2014 the path encodes hot/cold). Off by default; turning it on re-searches.", "\u8f6c\u533a\u5931\u8d25": "Move failed", "\u8fd1\u671f\u6d41\u6c34 + \u5168\u90e8\u7ed3\u8bba\u5c42\u3002\u9ed8\u8ba4\u9009\u4e2d": "Recent stream plus every distilled layer. On by default.", "\u8fd8\u539f": "Restore", "\u8fd9\u4e2a\u5c42\u6ca1\u52fe\u9009\uff08\u5728\u300c\u7b5b\u9009 \u2192 \u5168\u90e8\u5c42\u300d\u91cc\u52fe\u4e0a\uff09": "This layer is not selected (tick it under Filter \u2192 All layers)", "\u91cd\u8981": "Importance", "\u91cd\u8981 ": "imp ", "\u91cd\u8981\u6027\u4e0a\u9650\uff080~100\uff09": "importance upper bound (0\u2013100)", "\u91cd\u8981\u6027\u4e0b\u9650\uff080~100\uff09\u00b7 \u226585 \u6838\u5fc3 \u00b7 65~84 \u5df2\u9a8c\u8bc1 \u00b7 <65 \u8349\u7a3f": "importance lower bound (0\u2013100) \u00b7 \u226585 core \u00b7 65\u201384 verified \u00b7 <65 draft", "\u9884\u89c8": "Preview", "\u9ad8\u7ea7\u641c\u7d22\uff1a\u5c42 / \u5206\u7c7b / \u91cd\u8981 / tag / \u521b\u5efa\u00b7\u4fee\u6539\u65f6\u95f4": "Advanced: layer / category / importance / tag / created\u00b7modified time", "\uff08\u5171 ": "(", "\uff08\u70b9\u540d\u5b57\u770b\u6574\u7bc7\uff0c\u70b9\u4e09\u89d2\u5c55\u5f00\uff09": "(click a name for the whole file, click the triangle to expand)", "\ud83d\udca1 \u51b7\u533a\u8fd8\u6709 ": "\ud83d\udca1 cold also has ", "\ud83d\udce4 \u6062\u590d\u56de\u539f\u4f4d": "\ud83d\udce4 restore to original position", "\ud83d\udce6 \u5b58\u6863\u8fd9\u4e00\u8282": "\ud83d\udce6 archive this section", "": "", "\n\n\u7a0b\u5e8f\uff08bin/ projects/ telegram/\uff09\u4e0d\u52a8\u3002": "\n\nPrograms (bin/ projects/ telegram/) stay put.", "\n\u5171 ": "\ntotal ", " \u00b7 \u51b7 ": " \u00b7 cold ", " \u4e2a\u6587\u4ef6 \u00b7 ": " files \u00b7 ", " \u4efd .conflict- \u526f\u672c\uff0c\u672c\u5730\u8fd9\u7a3f\u6ca1\u52a8\uff09": " .conflict copies; this local draft untouched)", " \u5c42": " layer", " \u6761\u8def\u5f84\uff1a": " paths: ", " \u6bb5\uff0c\u53ea\u663e\u793a\u524d ": " segments, first ", " \u7bc7": " entries", " \u7bc7\u4e00\u6837 \u00b7 ": " identical \u00b7 ", " \u7bc7\u4f60\u8fd9\u8fb9\u591a\u51fa\u6765": " only on this side", " \u7bc7\u4f60\u8fd9\u91cc\u6ca1\u6709 \u00b7 ": " missing here \u00b7 ", " \u7bc7\u5185\u5bb9\u4e0d\u540c \u00b7 ": " differ \u00b7 ", " \u884c": " rows", " \u884c\uff08shift \u70b9\u4e00\u884c\u53ef\u6574\u6bb5\u9009\uff1bshift \u70b9\u65b9\u6846 = \u6574\u6bb5\u6253\u8fd9\u4e00\u4f4d\uff09": " rows (shift-click a row selects the whole block; shift-click a box sets the whole block)", "- `rules` \u8ddf\u7740 `AGENTS.md`\u3001`skills` \u8ddf\u7740\u6280\u80fd\u76ee\u5f55\uff0c\u8fd9\u4e24\u5c42\u4e0d\u80fd\u6539": "- `rules` follows `AGENTS.md`, `skills` follows the skills directory \u2014 these two cannot move", "- \u4e3b\u8def\u5f84\u53ea\u6709\u4e00\u4efd\uff0c\u53ef\u4ee5\u6307\u5230 `.dsh` \u4e4b\u5916\uff1b\u6539\u5b83\u4f1a\u8fde `mem.db` \u4e00\u8d77\u6574\u4f53\u642c\n": "- There is one main path and it may point outside `.dsh`; changing it moves `mem.db` along\n", "- \u51b7\u533a\u662f\u70ed\u533a\u7ed3\u6784\u7684\u955c\u50cf\uff1a`docs` \u2194 `archived/docs`\u3001`logs/changelog` \u2194 `archived/logs/changelog`\n": "- Cold mirrors the hot layout: `docs` \u2194 `archived/docs`, `logs/changelog` \u2194 `archived/logs/changelog`\n", "- \u7ec6\u5206\u8def\u5f84\u4e00\u5f8b\u76f8\u5bf9\u4e3b\u8def\u5f84\uff08\u5199 `docs`\uff0c\u4e0d\u662f `/Users/\u2026/docs`\uff09\n": "- Sub-paths are always relative to the main path (`docs`, not `/Users/\u2026/docs`)\n", "mem-serve \u5df2\u81ea\u52a8\u91cd\u542f\uff0c\u5bf9\u65b9\u7acb\u523b\u8fde\u4e0d\u4e0a": "mem-serve restarted \u2014 the peer loses access immediately", "mem-serve \u5df2\u81ea\u52a8\u91cd\u542f\uff0c\u7acb\u5373\u53ef\u7528": "mem-serve restarted \u2014 live immediately", "token \u5df2\u590d\u5236": "token copied", "\u2190 \u8fd4\u56de": "\u2190 back", "\u26a0\ufe0f \u642c\u5b8c\u5bf9\u4e0d\u4e0a\uff1a": "\u26a0\ufe0f mismatch after the move: ", "\u3002\u6743\u9650\u89c1\u4e0b\uff08\u53ea\u6709\u5bf9\u65b9\u80fd\u6539\uff09": ". Permissions below (only the peer can change them)", "\u300d": "\u201d", "\u300d\u2014\u2014 ": "\u201d \u2014 ", "\u4e0d\u540c\u7684\uff1a": "differ: ", "\u4e0d\u662f\u672c\u63d2\u4ef6\u5bfc\u51fa\u7684\u914d\u7f6e\uff08\u7f3a kind\uff09": "not an export from this plugin (missing kind)", "\u4e3b\u670d\u52a1\u5668\u7ed9\u4f60\u7684 token": "the token the main server gave you", "\u4e3b\u8def\u5f84": "Main path", "\u4e3b\u8def\u5f84\u6539\u6210\u54ea\uff1f\uff08\u7edd\u5bf9\u8def\u5f84\uff0c\u7559\u7a7a = ~/.dsh\uff09\n\u6240\u6709\u8bb0\u5fc6\u6587\u4ef6\u4f1a\u6574\u4f53\u642c\u8fc7\u53bb\uff08\u5305\u62ec mem.db\uff09\n\n\u73b0\u5728\u662f\uff1a": "New main path? (absolute, blank = ~/.dsh)\nEvery memory file moves over (mem.db included)\n\nCurrently: ", "\u4e3b\u8def\u5f84\u8981\u7ed9\u7edd\u5bf9\u8def\u5f84\uff08\u6216\u7559\u7a7a = ~/.dsh\uff09": "Main path must be absolute (or blank = ~/.dsh)", "\u4f1a\u628a\u6240\u6709\u8bb0\u5fc6\u6587\u4ef6\u6574\u4f53\u642c\u5230\uff1a\n": "All memory files will move to:\n", "\u4f1a\u771f\u7684\u628a\u6574\u4e2a\u51b7\u533a\u642c\u8fc7\u53bb\uff08\u4e0d\u662f\u8f6f\u94fe\uff09\uff1a\n": "The whole cold zone will really move (not a symlink):\n", "\u4f1a\u771f\u7684\u628a\u6587\u4ef6\u642c\u8fc7\u53bb\uff08\u4e0d\u662f\u8f6f\u94fe\uff09\uff1a\n": "Files will really move (not a symlink):\n", "\u4fdd\u5b58\u5e76\u8fde\u63a5": "Save & connect", "\u5148\u300c\u4fdd\u5b58\u5e76\u8fde\u63a5\u300d\u62ff\u5230\u6743\u9650\u518d\u540c\u6b65": "Save & connect first to get permissions before syncing", "\u5148\u586b\u670d\u52a1\u5668\u7f51\u5740\u548c token": "Fill in the server URL and token first", "\u5168\u9009": "Select all", "\u5199\u843d\u70b9 ": "Writes to ", "\u51b7\u533a": "Cold zone", "\u51b7\u533a\u7edf\u4e00\u653e\u5728\u54ea\u4e2a\u5b50\u8def\u5f84\uff1f\uff08\u76f8\u5bf9\u4e3b\u8def\u5f84\uff0c\u9ed8\u8ba4 archived\uff09\n\n\u73b0\u5728\u662f\uff1a": "Cold zone sub-path? (relative to the main path, default archived)\n\nCurrently: ", "\u5220\u9664\u5931\u8d25\uff1a": "Delete failed: ", "\u53ea\u80fd\u5199\u76f8\u5bf9\u4e3b\u8def\u5f84\u7684\u5b50\u8def\u5f84\uff0c\u4e0d\u662f\u7edd\u5bf9\u8def\u5f84": "Must be a sub-path relative to the main path, not absolute", "\u540c\u6b65\u5931\u8d25": "Sync failed", "\u540c\u6b65\u5931\u8d25\uff1a": "Sync failed: ", "\u540c\u6b65\u5b8c\u6210\uff1a\u62c9\u56de ": "Sync done: pulled ", "\u56fa\u5b9a": "fixed", "\u590d\u5236\u5931\u8d25\uff0c\u624b\u52a8\u9009\u4e2d\u590d\u5236\uff1a": "Copy failed \u2014 select and copy manually: ", "\u5b50\u8def\u5f84\u4e0d\u80fd\u7559\u7a7a": "Sub-path cannot be empty", "\u5bf9\u65b9\u7ed9\u4f60\uff1a": "The peer gives you: ", "\u5bf9\u9762\u6ca1\u56de\u8bdd": "No reply from the peer", "\u5bfc\u5165\u4e2d\u2026": "Importing\u2026", "\u5bfc\u5165\u4f1a\u8986\u76d6\u73b0\u5728\u7684\u5c42\u5b9a\u4e49\u548c token \u6743\u9650\uff0c\u786e\u5b9a\uff1f\n\n\u914d\u7f6e\u91cc\u6709 ": "Import overwrites the current layers and token permissions. Sure?\n\nThe config has ", "\u5bfc\u5165\u5931\u8d25\uff1a": "Import failed: ", "\u5bfc\u5165\u5b8c\u6210\uff1a\u5c42\u5b9a\u4e49 + \u63d2\u4ef6\u914d\u7f6e\u90fd\u6362\u4e86\uff08\u5237\u65b0\u9875\u9762\u751f\u6548\uff09": "Import done: layers and plugin config replaced (refresh to apply)", "\u5bfc\u51fa\u5305\u542b\uff1a\u5c42\u5b9a\u4e49 + \u6bcf\u5c42\u76ee\u5f55 + token \u6743\u9650 + \u540c\u6b65\u5730\u5740/token": "Export contains: layers + per-layer dirs + token permissions + sync URL/token", "\u5bfc\u51fa\u5931\u8d25\uff1a": "Export failed: ", "\u5df2\u5220\u6389 token\u300c": "Token deleted \u201c", "\u5df2\u5bfc\u51fa\uff1a\u5c42\u5b9a\u4e49 + \u6bcf\u5c42\u76ee\u5f55 + token \u6743\u9650 + \u540c\u6b65\u5730\u5740/token": "Exported: layers + per-layer dirs + token permissions + sync URL/token", "\u5df2\u642c\u5230 ": "Moved to ", "\u5df2\u6539\u540d\u4e3a\u300c": "Renamed to \u201c", "\u5df2\u65ad\u5f00\u540c\u6b65 \u2014\u2014 \u73b0\u5728\u662f\u7eaf\u672c\u5730\uff0c\u5df2\u7ecf\u540c\u6b65\u4e0b\u6765\u7684\u6587\u4ef6\u90fd\u7559\u7740": "Sync disconnected \u2014 local only now, already-synced files are kept", "\u5df2\u65b0\u5efa profile\u300c": "Profile created \u201c", "\u5df2\u6807\u8bb0\u5220\u9664 \u2014\u2014 \u70b9\u300c\u4fdd\u5b58\u300d\u624d\u771f\u5220": "Marked for deletion \u2014 press Save to really delete", "\u5df2\u9009 ": "Selected ", "\u6240\u6709\u8bb0\u5fc6\u6587\u4ef6\u90fd\u5728**\u540c\u4e00\u4e2a\u4e3b\u8def\u5f84**\u4e0b\u9762\uff0c\u4e0d\u5206\u6563\u3002\u642c\u5bb6\u662f**\u771f\u642c**\uff0c\u4e0d\u662f\u8f6f\u94fe\u3002\n\n": "Every memory file lives under **one main path**, never scattered. Moving is a **real move**, not a symlink.\n\n", "\u642c\u5bb6\u4e2d\u2026": "Moving\u2026", "\u642c\u8fc1\u5931\u8d25\uff1a": "Move failed: ", "\u6536\u8d77\u5173\u952e\u8bcd": "collapse keywords", "\u6539\u540d": "Rename", "\u6539\u540d\u5931\u8d25\uff1a": "Rename failed: ", "\u6539\u6210\u4ec0\u4e48\u5b50\u8def\u5f84\uff1f\uff08\u76f8\u5bf9\u4e3b\u8def\u5f84\uff0c\u6bd4\u5982 docs\u3001logs/changelog\uff09\n\n\u73b0\u5728\u662f\uff1a": "New sub-path? (relative to the main path, e.g. docs, logs/changelog)\n\nCurrently: ", "\u6539\u6210\u522b\u7684\u5b50\u8def\u5f84\uff08\u771f\u642c\uff09": "change to another sub-path (real move)", "\u65ad\u5f00\u540c\u6b65": "Disconnect sync", "\u65ad\u5f00\u5931\u8d25\uff1a": "Disconnect failed: ", "\u65b0\u540d\u5b57": "New name", "\u65b0\u5efa token": "New token", "\u65b0\u5efa\u5931\u8d25\uff1a": "Create failed: ", "\u670d\u52a1\u5668": "Server", "\u6743\u9650\u5168\u7531\u4e3b\u670d\u52a1\u5668\u7ed9\uff0c\u8fd9\u8fb9\u53ea\u80fd\u770b\u4e0d\u80fd\u6539\uff1b\u540c\u6b65\u662f\u6574\u4efd\u8986\u76d6\u672c\u5730\u5bf9\u5e94\u5c42\u7ea7\u3002": "Permissions come from the main server; this side can only read. Sync overwrites the matching local layer wholesale.", "\u6743\u9650\u6ca1\u4fdd\u5b58\u4e0a\uff1a": "Permissions not saved: ", "\u6807\u8bb0\u5220\u9664\u8fd9\u4e2a token": "Mark this token for deletion", "\u6ca1\u6709\u8fd9\u4e00\u4f4d": "no such bit", "\u6e05\u6389\u670d\u52a1\u5668\u548c token\uff0c\u56de\u5230\u7eaf\u672c\u5730\uff08\u5df2\u7ecf\u540c\u6b65\u4e0b\u6765\u7684\u6587\u4ef6\u90fd\u7559\u7740\uff0c\u4e0d\u4f1a\u5220\uff09": "Clear the server and token, back to local-only (already-synced files are kept)", "\u6e05\u7a7a\u9009\u62e9": "Clear selection", "\u70b9\u4e00\u4e0b\u590d\u5236\u8fd9\u4e2a token": "click to copy this token", "\u70ed ": "hot ", "\u76f4\u63a5\u653e\u5728\u4e3b\u8def\u5f84\u6839\u4e0b\uff08\u6587\u4ef6\u767d\u540d\u5355\uff09": "placed right under the main path (file whitelist)", "\u771f\u7684\u5220\u6389\uff08\u5220\u5b8c\u81ea\u52a8\u91cd\u542f mem-serve\uff0c\u7acb\u523b\u5931\u6548\uff09": "really delete (mem-serve restarts and it dies at once)", "\u786e\u5b9a": "OK", "\u7acb\u5373\u540c\u6b65": "Sync now", "\u7ed9\u5168\u90e8": "grant all", "\u7ed9\u8fd9\u4e2a profile \u6539\u4e2a\u540d\u5b57\uff08token \u503c\u4e0d\u53d8\uff09": "rename this profile (token value unchanged)", "\u7ed9\u9009\u4e2d\u7684 ": "for the selected ", "\u7f3a\u7684\uff1a": "missing: ", "\u7f51\u7edc\u5206\u4eab\uff08\u751f\u6210 token\uff09": "Network share (make token)", "\u8bb0\u5fc6\u540c\u6b65\uff08\u5bfc\u5165 token\uff09": "Memory sync (import token)", "\u8bbe\u7f6e\uff1a\u54ea\u4e2a profile \u80fd\u8bfb / \u589e / \u6539 / \u5220\u54ea\u4e9b\u8bb0\u5fc6": "Settings: which profile may read / create / update / delete which memories", "\u8bfb\u4e0d\u5230\u5c42\u76ee\u5f55\uff1a": "Cannot read layer dirs: ", "\u8bfb\u4e0d\u5230\u8bbe\u7f6e\uff1a": "Cannot read settings: ", "\u8bfb\u53d6\u4e2d\u2026": "Reading\u2026", "\u8ddf\u5bf9\u65b9\u6bd4\uff1a": "vs the peer: ", "\u8fd8\u6ca1\u6709 token\uff0c\u70b9 \uff0b \u65b0\u5efa": "No token yet \u2014 click \uff0b to create one", "\u8fd9\u4e2a\u6587\u4ef6\u4e0d\u662f\u5408\u6cd5 JSON": "This file is not valid JSON", "\u8fde\u4e0a\u4e86\uff1a": "Connected: ", "\u8fde\u4e0d\u4e0a\uff1a": "Cannot connect: ", "\u8fde\u63a5\u4e2d\u2026": "Connecting\u2026", "\u9009\u4e00\u4e2a token\u2026": "pick a token\u2026", "\u9009\u4e00\u4e2a token\uff08\u6bcf\u4e2a token \u5c31\u662f\u4e00\u5957\u6743\u9650\uff09": "pick a token (each token is one permission set)", "\u91cd\u542f mem-serve \u540e\u624d\u5bf9\u5916\u751f\u6548": "takes effect for peers after mem-serve restarts", "\u91cd\u542f mem-serve \u624d\u751f\u6548": "takes effect after mem-serve restarts", "\uff08\u4e00\u4efd\uff0c\u6309\u5404\u5c42\u7ec6\u5206\u8def\u5f84\u955c\u50cf\uff1a": "(one copy, mirroring each layer's sub-path: ", "\uff08\u542b mem.db\uff09": "(mem.db included)", "\uff08\u670d\u52a1\u5668\u90a3\u4efd\u53e6\u5b58 ": "(the server copy saved at ", "\uff08\u70b9\u4e00\u4e0b\uff1a\u5168\u90e8\u7ed9 / \u5168\u90e8\u6536\u56de\uff09": "(click: grant all / revoke all)", "\uff08\u843d\u5730 ": "(lands at ", "\uff08\u90e8\u5206\uff09": "(partial)", "\uff08\u9ed8\u8ba4 ~/.dsh\uff09": "(default ~/.dsh)", "\uff09": ")", "\uff0c\u51b2\u7a81 ": ", conflicts ", "\uff0c\u88ab\u62d2 ": ", rejected ", "\u8fd8\u6709 ": "and ", " \u4e2a \u00b7 \u7ee7\u7eed\u8f93\u5165\u7f29\u5c0f\u8303\u56f4": " more \u00b7 keep typing to narrow", "\u7f51\u7edc\u5206\u4eab": "Network share", "\u8bb0\u5fc6\u540c\u6b65": "Memory sync", "\u53ea\u6709\u672c\u673a\u6709\u8fd9\u7bc7\uff08\u6ca1\u8fde\u8fdc\u7aef\uff0c\u4e5f\u6ca1\u6709\u4efb\u4f55\u5df2\u53d1\u51fa\u7684 token \u8986\u76d6\u5230\u5b83\uff09": "Only this machine has it (no remote, and no issued token covers it)", "\u53ea\u8bfb\u5206\u4eab\uff1a\u5bf9\u7aef\u53ea\u80fd\u8bfb\u8fd9\u7bc7\u3001\u4e0d\u80fd\u6539 \u2014\u2014 \u4ee5\u5bf9\u7aef\u4e3a\u51c6\uff0c\u672c\u5730\u6539\u52a8\u540c\u6b65\u65f6\u4f1a\u88ab\u8986\u76d6": "Read-only share: the peer can only read it, so the peer wins and local edits get overwritten on sync", "\u53cc\u5411\u540c\u6b65\uff1a\u5bf9\u7aef\u4e5f\u80fd\u6539\u8fd9\u7bc7 \u2014\u2014 \u51b2\u7a81\u8d70\u4e09\u65b9\u5408\u5e76\uff0c\u5408\u4e0d\u6389\u7684\u8fdb conflict/": "Two-way sync: the peer can edit this too \u2014 conflicts merge three-way and unsolved ones land in conflict/", "\u5df2\u5bfc\u51fa\uff1a\u5c42\u5b9a\u4e49\uff08\u542b\u5c42\u7ea7\u987a\u5e8f\uff09+ \u6bcf\u5c42\u76ee\u5f55 + token \u6743\u9650 + \u540c\u6b65\u5730\u5740/token": "Exported: layer definitions (including layer order) + per-layer paths + token permissions + sync URL/token", "\u53ea\u8bfb\u5206\u4eab\uff1a\u5bf9\u7aef\u53ea\u80fd\u8bfb\u8fd9\u7bc7\u3001\u4e0d\u80fd\u6539 \u2014\u2014 \u672c\u673a\u7167\u5e38\u53ef\u4ee5\u7f16\u8f91\uff0c\u6539\u5b8c\u5bf9\u65b9\u4e0b\u6b21\u540c\u6b65\u624d\u6536\u5230\u65b0\u5185\u5bb9": "Read-only share: the other side can only read this file \u2014 you can still edit it here; they get the new content on their next sync", "\u53ea\u8bfb\u540c\u6b65\uff1a\u8fd9\u7bc7\u4ece\u4e3b\u670d\u52a1\u5668\u540c\u6b65\u4e0b\u6765\uff0c\u672c\u5730\u53ea\u80fd\u8bfb": "Read-only sync: this file came from the master server and is read-only here"};
    let T = (k) => k
    const h = React.createElement

!function(e,t){t((e="undefined"!=typeof globalThis?globalThis:e||self).marked={})}(this,(function(e){"use strict";function t(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}function n(t){e.defaults=t}e.defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};const s=/[&<>"']/,r=new RegExp(s.source,"g"),i=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,l=new RegExp(i.source,"g"),o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},a=e=>o[e];function c(e,t){if(t){if(s.test(e))return e.replace(r,a)}else if(i.test(e))return e.replace(l,a);return e}const h=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function p(e){return e.replace(h,((e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const u=/(^|[^\[])\^/g;function k(e,t){let n="string"==typeof e?e:e.source;t=t||"";const s={replace:(e,t)=>{let r="string"==typeof t?t:t.source;return r=r.replace(u,"$1"),n=n.replace(e,r),s},getRegex:()=>new RegExp(n,t)};return s}function g(e){try{e=encodeURI(e).replace(/%25/g,"%")}catch(e){return null}return e}const f={exec:()=>null};function d(e,t){const n=e.replace(/\|/g,((e,t,n)=>{let s=!1,r=t;for(;--r>=0&&"\\"===n[r];)s=!s;return s?"|":" |"})).split(/ \|/);let s=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(/\\\|/g,"|");return n}function x(e,t,n){const s=e.length;if(0===s)return"";let r=0;for(;r<s;){const i=e.charAt(s-r-1);if(i!==t||n){if(i===t||!n)break;r++}else r++}return e.slice(0,s-r)}function b(e,t,n,s){const r=t.href,i=t.title?c(t.title):null,l=e[1].replace(/\\([\[\]])/g,"$1");if("!"!==e[0].charAt(0)){s.state.inLink=!0;const e={type:"link",raw:n,href:r,title:i,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,e}return{type:"image",raw:n,href:r,title:i,text:c(l)}}class w{options;rules;lexer;constructor(t){this.options=t||e.defaults}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const e=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:x(e,"\n")}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const e=t[0],n=function(e,t){const n=e.match(/^(\s+)(?:```)/);if(null===n)return t;const s=n[1];return t.split("\n").map((e=>{const t=e.match(/^\s+/);if(null===t)return e;const[n]=t;return n.length>=s.length?e.slice(s.length):e})).join("\n")}(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(/#$/.test(e)){const t=x(e,"#");this.options.pedantic?e=t.trim():t&&!/ $/.test(t)||(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let e=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,"\n    $1");e=x(e.replace(/^ *>[ \t]?/gm,""),"\n");const n=this.lexer.state.top;this.lexer.state.top=!0;const s=this.lexer.blockTokens(e);return this.lexer.state.top=n,{type:"blockquote",raw:t[0],tokens:s,text:e}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,r={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const i=new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`);let l="",o="",a=!1;for(;e;){let n=!1;if(!(t=i.exec(e)))break;if(this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let s=t[2].split("\n",1)[0].replace(/^\t+/,(e=>" ".repeat(3*e.length))),c=e.split("\n",1)[0],h=0;this.options.pedantic?(h=2,o=s.trimStart()):(h=t[2].search(/[^ ]/),h=h>4?1:h,o=s.slice(h),h+=t[1].length);let p=!1;if(!s&&/^ *$/.test(c)&&(l+=c+"\n",e=e.substring(c.length+1),n=!0),!n){const t=new RegExp(`^ {0,${Math.min(3,h-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),n=new RegExp(`^ {0,${Math.min(3,h-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),r=new RegExp(`^ {0,${Math.min(3,h-1)}}(?:\`\`\`|~~~)`),i=new RegExp(`^ {0,${Math.min(3,h-1)}}#`);for(;e;){const a=e.split("\n",1)[0];if(c=a,this.options.pedantic&&(c=c.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),r.test(c))break;if(i.test(c))break;if(t.test(c))break;if(n.test(e))break;if(c.search(/[^ ]/)>=h||!c.trim())o+="\n"+c.slice(h);else{if(p)break;if(s.search(/[^ ]/)>=4)break;if(r.test(s))break;if(i.test(s))break;if(n.test(s))break;o+="\n"+c}p||c.trim()||(p=!0),l+=a+"\n",e=e.substring(a.length+1),s=c.slice(h)}}r.loose||(a?r.loose=!0:/\n *\n *$/.test(l)&&(a=!0));let u,k=null;this.options.gfm&&(k=/^\[[ xX]\] /.exec(o),k&&(u="[ ] "!==k[0],o=o.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:l,task:!!k,checked:u,loose:!1,text:o,tokens:[]}),r.raw+=l}r.items[r.items.length-1].raw=l.trimEnd(),r.items[r.items.length-1].text=o.trimEnd(),r.raw=r.raw.trimEnd();for(let e=0;e<r.items.length;e++)if(this.lexer.state.top=!1,r.items[e].tokens=this.lexer.blockTokens(r.items[e].text,[]),!r.loose){const t=r.items[e].tokens.filter((e=>"space"===e.type)),n=t.length>0&&t.some((e=>/\n.*\n/.test(e.raw)));r.loose=n}if(r.loose)for(let e=0;e<r.items.length;e++)r.items[e].loose=!0;return r}}html(e){const t=this.rules.block.html.exec(e);if(t){return{type:"html",block:!0,raw:t[0],pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:t[0]}}}def(e){const t=this.rules.block.def.exec(e);if(t){const e=t[1].toLowerCase().replace(/\s+/g," "),n=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:n,title:s}}}table(e){const t=this.rules.block.table.exec(e);if(!t)return;if(!/[:|]/.test(t[2]))return;const n=d(t[1]),s=t[2].replace(/^\||\| *$/g,"").split("|"),r=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split("\n"):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const e of s)/^ *-+: *$/.test(e)?i.align.push("right"):/^ *:-+: *$/.test(e)?i.align.push("center"):/^ *:-+ *$/.test(e)?i.align.push("left"):i.align.push(null);for(const e of n)i.header.push({text:e,tokens:this.lexer.inline(e)});for(const e of r)i.rows.push(d(e,i.header.length).map((e=>({text:e,tokens:this.lexer.inline(e)}))));return i}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:c(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const e=t[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e))return;const t=x(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{const e=function(e,t){if(-1===e.indexOf(t[1]))return-1;let n=0;for(let s=0;s<e.length;s++)if("\\"===e[s])s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return-1}(t[2],"()");if(e>-1){const n=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){const e=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);e&&(n=e[1],s=e[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),/^</.test(n)&&(n=this.options.pedantic&&!/>$/.test(e)?n.slice(1):n.slice(1,-1)),b(t,{href:n?n.replace(this.rules.inline.anyPunctuation,"$1"):n,title:s?s.replace(this.rules.inline.anyPunctuation,"$1"):s},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const e=t[(n[2]||n[1]).replace(/\s+/g," ").toLowerCase()];if(!e){const e=n[0].charAt(0);return{type:"text",raw:e,text:e}}return b(n,e,n[0],this.lexer)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s)return;if(s[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const n=[...s[0]].length-1;let r,i,l=n,o=0;const a="*"===s[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(a.lastIndex=0,t=t.slice(-1*e.length+n);null!=(s=a.exec(t));){if(r=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!r)continue;if(i=[...r].length,s[3]||s[4]){l+=i;continue}if((s[5]||s[6])&&n%3&&!((n+i)%3)){o+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+o);const t=[...s[0]][0].length,a=e.slice(0,n+s.index+t+i);if(Math.min(n,i)%2){const e=a.slice(1,-1);return{type:"em",raw:a,text:e,tokens:this.lexer.inlineTokens(e)}}const c=a.slice(2,-2);return{type:"strong",raw:a,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(/\n/g," ");const n=/[^ ]/.test(e),s=/^ /.test(e)&&/ $/.test(e);return n&&s&&(e=e.substring(1,e.length-1)),e=c(e,!0),{type:"codespan",raw:t[0],text:e}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let e,n;return"@"===t[2]?(e=c(t[1]),n="mailto:"+e):(e=c(t[1]),n=e),{type:"link",raw:t[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if("@"===t[2])e=c(t[0]),n="mailto:"+e;else{let s;do{s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??""}while(s!==t[0]);e=c(t[0]),n="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let e;return e=this.lexer.state.inRawBlock?t[0]:c(t[0]),{type:"text",raw:t[0],text:e}}}}const m=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,y=/(?:[*+-]|\d{1,9}[.)])/,$=k(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,y).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),z=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,T=/(?!\s*\])(?:\\.|[^\[\]\\])+/,R=k(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",T).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),_=k(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,y).getRegex(),A="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",S=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,I=k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",S).replace("tag",A).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),E=k(z).replace("hr",m).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A).getRegex(),q={blockquote:k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",E).getRegex(),code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,def:R,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:m,html:I,lheading:$,list:_,newline:/^(?: *(?:\n|$))+/,paragraph:E,table:f,text:/^[^\n]+/},Z=k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",m).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A).getRegex(),L={...q,table:Z,paragraph:k(z).replace("hr",m).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Z).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A).getRegex()},P={...q,html:k("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",S).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:f,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:k(z).replace("hr",m).replace("heading"," *#{1,6} *[^\n]").replace("lheading",$).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Q=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,v=/^( {2,}|\\)\n(?!\s*$)/,B="\\p{P}\\p{S}",C=k(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,B).getRegex(),M=k(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,B).getRegex(),O=k("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,B).getRegex(),D=k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,B).getRegex(),j=k(/\\([punct])/,"gu").replace(/punct/g,B).getRegex(),H=k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),U=k(S).replace("(?:--\x3e|$)","--\x3e").getRegex(),X=k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",U).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),F=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,N=k(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",F).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),G=k(/^!?\[(label)\]\[(ref)\]/).replace("label",F).replace("ref",T).getRegex(),J=k(/^!?\[(ref)\](?:\[\])?/).replace("ref",T).getRegex(),K={_backpedal:f,anyPunctuation:j,autolink:H,blockSkip:/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,br:v,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:f,emStrongLDelim:M,emStrongRDelimAst:O,emStrongRDelimUnd:D,escape:Q,link:N,nolink:J,punctuation:C,reflink:G,reflinkSearch:k("reflink|nolink(?!\\()","g").replace("reflink",G).replace("nolink",J).getRegex(),tag:X,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:f},V={...K,link:k(/^!?\[(label)\]\((.*?)\)/).replace("label",F).getRegex(),reflink:k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",F).getRegex()},W={...K,escape:k(Q).replace("])","~|])").getRegex(),url:k(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Y={...W,br:k(v).replace("{2,}","*").getRegex(),text:k(W.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ee={normal:q,gfm:L,pedantic:P},te={normal:K,gfm:W,breaks:Y,pedantic:V};class ne{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||e.defaults,this.options.tokenizer=this.options.tokenizer||new w,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={block:ee.normal,inline:te.normal};this.options.pedantic?(n.block=ee.pedantic,n.inline=te.pedantic):this.options.gfm&&(n.block=ee.gfm,this.options.breaks?n.inline=te.breaks:n.inline=te.gfm),this.tokenizer.rules=n}static get rules(){return{block:ee,inline:te}}static lex(e,t){return new ne(t).lex(e)}static lexInline(e,t){return new ne(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,"\n"),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){const t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){let n,s,r,i;for(e=this.options.pedantic?e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e.replace(/^( *)(\t+)/gm,((e,t,n)=>t+"    ".repeat(n.length)));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((s=>!!(n=s.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0)))))if(n=this.tokenizer.space(e))e=e.substring(n.raw.length),1===n.raw.length&&t.length>0?t[t.length-1].raw+="\n":t.push(n);else if(n=this.tokenizer.code(e))e=e.substring(n.raw.length),s=t[t.length-1],!s||"paragraph"!==s.type&&"text"!==s.type?t.push(n):(s.raw+="\n"+n.raw,s.text+="\n"+n.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text);else if(n=this.tokenizer.fences(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.heading(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.hr(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.blockquote(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.list(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.html(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.def(e))e=e.substring(n.raw.length),s=t[t.length-1],!s||"paragraph"!==s.type&&"text"!==s.type?this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title}):(s.raw+="\n"+n.raw,s.text+="\n"+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text);else if(n=this.tokenizer.table(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.lheading(e))e=e.substring(n.raw.length),t.push(n);else{if(r=e,this.options.extensions&&this.options.extensions.startBlock){let t=1/0;const n=e.slice(1);let s;this.options.extensions.startBlock.forEach((e=>{s=e.call({lexer:this},n),"number"==typeof s&&s>=0&&(t=Math.min(t,s))})),t<1/0&&t>=0&&(r=e.substring(0,t+1))}if(this.state.top&&(n=this.tokenizer.paragraph(r)))s=t[t.length-1],i&&"paragraph"===s.type?(s.raw+="\n"+n.raw,s.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n),i=r.length!==e.length,e=e.substring(n.raw.length);else if(n=this.tokenizer.text(e))e=e.substring(n.raw.length),s=t[t.length-1],s&&"text"===s.type?(s.raw+="\n"+n.raw,s.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,s,r,i,l,o,a=e;if(this.tokens.links){const e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(i=this.tokenizer.rules.inline.reflinkSearch.exec(a));)e.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(i=this.tokenizer.rules.inline.blockSkip.exec(a));)a=a.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(i=this.tokenizer.rules.inline.anyPunctuation.exec(a));)a=a.slice(0,i.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(o=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((s=>!!(n=s.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0)))))if(n=this.tokenizer.escape(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.tag(e))e=e.substring(n.raw.length),s=t[t.length-1],s&&"text"===n.type&&"text"===s.type?(s.raw+=n.raw,s.text+=n.text):t.push(n);else if(n=this.tokenizer.link(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(n.raw.length),s=t[t.length-1],s&&"text"===n.type&&"text"===s.type?(s.raw+=n.raw,s.text+=n.text):t.push(n);else if(n=this.tokenizer.emStrong(e,a,o))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.codespan(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.br(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.del(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.autolink(e))e=e.substring(n.raw.length),t.push(n);else if(this.state.inLink||!(n=this.tokenizer.url(e))){if(r=e,this.options.extensions&&this.options.extensions.startInline){let t=1/0;const n=e.slice(1);let s;this.options.extensions.startInline.forEach((e=>{s=e.call({lexer:this},n),"number"==typeof s&&s>=0&&(t=Math.min(t,s))})),t<1/0&&t>=0&&(r=e.substring(0,t+1))}if(n=this.tokenizer.inlineText(r))e=e.substring(n.raw.length),"_"!==n.raw.slice(-1)&&(o=n.raw.slice(-1)),l=!0,s=t[t.length-1],s&&"text"===s.type?(s.raw+=n.raw,s.text+=n.text):t.push(n);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}else e=e.substring(n.raw.length),t.push(n);return t}}class se{options;constructor(t){this.options=t||e.defaults}code(e,t,n){const s=(t||"").match(/^\S*/)?.[0];return e=e.replace(/\n$/,"")+"\n",s?'<pre><code class="language-'+c(s)+'">'+(n?e:c(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:c(e,!0))+"</code></pre>\n"}blockquote(e){return`<blockquote>\n${e}</blockquote>\n`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>\n`}hr(){return"<hr>\n"}list(e,t,n){const s=t?"ol":"ul";return"<"+s+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+s+">\n"}listitem(e,t,n){return`<li>${e}</li>\n`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>\n`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return`<tr>\n${e}</tr>\n`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>\n`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const s=g(e);if(null===s)return n;let r='<a href="'+(e=s)+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r}image(e,t,n){const s=g(e);if(null===s)return n;let r=`<img src="${e=s}" alt="${n}"`;return t&&(r+=` title="${t}"`),r+=">",r}text(e){return e}}class re{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class ie{options;renderer;textRenderer;constructor(t){this.options=t||e.defaults,this.options.renderer=this.options.renderer||new se,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new re}static parse(e,t){return new ie(t).parse(e)}static parseInline(e,t){return new ie(t).parseInline(e)}parse(e,t=!0){let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const e=r,t=this.options.extensions.renderers[e.type].call({parser:this},e);if(!1!==t||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(e.type)){n+=t||"";continue}}switch(r.type){case"space":continue;case"hr":n+=this.renderer.hr();continue;case"heading":{const e=r;n+=this.renderer.heading(this.parseInline(e.tokens),e.depth,p(this.parseInline(e.tokens,this.textRenderer)));continue}case"code":{const e=r;n+=this.renderer.code(e.text,e.lang,!!e.escaped);continue}case"table":{const e=r;let t="",s="";for(let t=0;t<e.header.length;t++)s+=this.renderer.tablecell(this.parseInline(e.header[t].tokens),{header:!0,align:e.align[t]});t+=this.renderer.tablerow(s);let i="";for(let t=0;t<e.rows.length;t++){const n=e.rows[t];s="";for(let t=0;t<n.length;t++)s+=this.renderer.tablecell(this.parseInline(n[t].tokens),{header:!1,align:e.align[t]});i+=this.renderer.tablerow(s)}n+=this.renderer.table(t,i);continue}case"blockquote":{const e=r,t=this.parse(e.tokens);n+=this.renderer.blockquote(t);continue}case"list":{const e=r,t=e.ordered,s=e.start,i=e.loose;let l="";for(let t=0;t<e.items.length;t++){const n=e.items[t],s=n.checked,r=n.task;let o="";if(n.task){const e=this.renderer.checkbox(!!s);i?n.tokens.length>0&&"paragraph"===n.tokens[0].type?(n.tokens[0].text=e+" "+n.tokens[0].text,n.tokens[0].tokens&&n.tokens[0].tokens.length>0&&"text"===n.tokens[0].tokens[0].type&&(n.tokens[0].tokens[0].text=e+" "+n.tokens[0].tokens[0].text)):n.tokens.unshift({type:"text",text:e+" "}):o+=e+" "}o+=this.parse(n.tokens,i),l+=this.renderer.listitem(o,r,!!s)}n+=this.renderer.list(l,t,s);continue}case"html":{const e=r;n+=this.renderer.html(e.text,e.block);continue}case"paragraph":{const e=r;n+=this.renderer.paragraph(this.parseInline(e.tokens));continue}case"text":{let i=r,l=i.tokens?this.parseInline(i.tokens):i.text;for(;s+1<e.length&&"text"===e[s+1].type;)i=e[++s],l+="\n"+(i.tokens?this.parseInline(i.tokens):i.text);n+=t?this.renderer.paragraph(l):l;continue}default:{const e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const e=this.options.extensions.renderers[r.type].call({parser:this},r);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){n+=e||"";continue}}switch(r.type){case"escape":{const e=r;n+=t.text(e.text);break}case"html":{const e=r;n+=t.html(e.text);break}case"link":{const e=r;n+=t.link(e.href,e.title,this.parseInline(e.tokens,t));break}case"image":{const e=r;n+=t.image(e.href,e.title,e.text);break}case"strong":{const e=r;n+=t.strong(this.parseInline(e.tokens,t));break}case"em":{const e=r;n+=t.em(this.parseInline(e.tokens,t));break}case"codespan":{const e=r;n+=t.codespan(e.text);break}case"br":n+=t.br();break;case"del":{const e=r;n+=t.del(this.parseInline(e.tokens,t));break}case"text":{const e=r;n+=t.text(e.text);break}default:{const e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return n}}class le{options;constructor(t){this.options=t||e.defaults}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}class oe{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.#e(ne.lex,ie.parse);parseInline=this.#e(ne.lexInline,ie.parseInline);Parser=ie;Renderer=se;TextRenderer=re;Lexer=ne;Tokenizer=w;Hooks=le;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(const s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{const e=s;for(const s of e.header)n=n.concat(this.walkTokens(s.tokens,t));for(const s of e.rows)for(const e of s)n=n.concat(this.walkTokens(e.tokens,t));break}case"list":{const e=s;n=n.concat(this.walkTokens(e.items,t));break}default:{const e=s;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach((s=>{const r=e[s].flat(1/0);n=n.concat(this.walkTokens(r,t))})):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach((e=>{const n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach((e=>{if(!e.name)throw new Error("extension name required");if("renderer"in e){const n=t.renderers[e.name];t.renderers[e.name]=n?function(...t){let s=e.renderer.apply(this,t);return!1===s&&(s=n.apply(this,t)),s}:e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");const n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)})),n.extensions=t),e.renderer){const t=this.defaults.renderer||new se(this.defaults);for(const n in e.renderer){if(!(n in t))throw new Error(`renderer '${n}' does not exist`);if("options"===n)continue;const s=n,r=e.renderer[s],i=t[s];t[s]=(...e)=>{let n=r.apply(t,e);return!1===n&&(n=i.apply(t,e)),n||""}}n.renderer=t}if(e.tokenizer){const t=this.defaults.tokenizer||new w(this.defaults);for(const n in e.tokenizer){if(!(n in t))throw new Error(`tokenizer '${n}' does not exist`);if(["options","rules","lexer"].includes(n))continue;const s=n,r=e.tokenizer[s],i=t[s];t[s]=(...e)=>{let n=r.apply(t,e);return!1===n&&(n=i.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){const t=this.defaults.hooks||new le;for(const n in e.hooks){if(!(n in t))throw new Error(`hook '${n}' does not exist`);if("options"===n)continue;const s=n,r=e.hooks[s],i=t[s];le.passThroughHooks.has(n)?t[s]=e=>{if(this.defaults.async)return Promise.resolve(r.call(t,e)).then((e=>i.call(t,e)));const n=r.call(t,e);return i.call(t,n)}:t[s]=(...e)=>{let n=r.apply(t,e);return!1===n&&(n=i.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){const t=this.defaults.walkTokens,s=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(s.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}})),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ne.lex(e,t??this.defaults)}parser(e,t){return ie.parse(e,t??this.defaults)}#e(e,t){return(n,s)=>{const r={...s},i={...this.defaults,...r};!0===this.defaults.async&&!1===r.async&&(i.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),i.async=!0);const l=this.#t(!!i.silent,!!i.async);if(null==n)return l(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof n)return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(i.hooks&&(i.hooks.options=i),i.async)return Promise.resolve(i.hooks?i.hooks.preprocess(n):n).then((t=>e(t,i))).then((e=>i.hooks?i.hooks.processAllTokens(e):e)).then((e=>i.walkTokens?Promise.all(this.walkTokens(e,i.walkTokens)).then((()=>e)):e)).then((e=>t(e,i))).then((e=>i.hooks?i.hooks.postprocess(e):e)).catch(l);try{i.hooks&&(n=i.hooks.preprocess(n));let s=e(n,i);i.hooks&&(s=i.hooks.processAllTokens(s)),i.walkTokens&&this.walkTokens(s,i.walkTokens);let r=t(s,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return l(e)}}}#t(e,t){return n=>{if(n.message+="\nPlease report this to https://github.com/markedjs/marked.",e){const e="<p>An error occurred:</p><pre>"+c(n.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}}const ae=new oe;function ce(e,t){return ae.parse(e,t)}ce.options=ce.setOptions=function(e){return ae.setOptions(e),ce.defaults=ae.defaults,n(ce.defaults),ce},ce.getDefaults=t,ce.defaults=e.defaults,ce.use=function(...e){return ae.use(...e),ce.defaults=ae.defaults,n(ce.defaults),ce},ce.walkTokens=function(e,t){return ae.walkTokens(e,t)},ce.parseInline=ae.parseInline,ce.Parser=ie,ce.parser=ie.parse,ce.Renderer=se,ce.TextRenderer=re,ce.Lexer=ne,ce.lexer=ne.lex,ce.Tokenizer=w,ce.Hooks=le,ce.parse=ce;const he=ce.options,pe=ce.setOptions,ue=ce.use,ke=ce.walkTokens,ge=ce.parseInline,fe=ce,de=ie.parse,xe=ne.lex;e.Hooks=le,e.Lexer=ne,e.Marked=oe,e.Parser=ie,e.Renderer=se,e.TextRenderer=re,e.Tokenizer=w,e.getDefaults=t,e.lexer=xe,e.marked=ce,e.options=he,e.parse=fe,e.parseInline=ge,e.parser=de,e.setOptions=pe,e.use=ue,e.walkTokens=ke}));
    const marked = globalThis.marked
    if (!marked || typeof marked.parse !== 'function') throw new Error('marked 内联失败：globalThis.marked 不可用')
    marked.setOptions({ gfm: true, breaks: false })

    const MD_CSS = `.mx-md{font-size:13px;line-height:1.75;word-break:break-word}
.mx-md>:first-child{margin-top:0}
.mx-md h1,.mx-md h2,.mx-md h3,.mx-md h4,.mx-md h5,.mx-md h6{line-height:1.35;margin:1.35em 0 .5em;font-weight:650}
.mx-md h1{font-size:1.65em;padding-bottom:.24em;border-bottom:2px solid rgba(128,128,128,.35)}
.mx-md h2{font-size:1.35em;padding-bottom:.2em;border-bottom:1px solid rgba(128,128,128,.28)}
.mx-md h3{font-size:1.15em}
.mx-md h4,.mx-md h5,.mx-md h6{font-size:1em;opacity:.82}
.mx-md p,.mx-md ul,.mx-md ol{margin:.6em 0}
.mx-md ul,.mx-md ol{padding-left:1.6em}
.mx-md li{margin:.2em 0}
.mx-md li>ul,.mx-md li>ol{margin:.15em 0}
.mx-md a{color:#4a9eff;text-decoration:none;border-bottom:1px solid transparent}
.mx-md a:hover{border-bottom-color:#4a9eff}
.mx-md code{background:rgba(128,128,128,.18);padding:.12em .38em;border-radius:4px;font:.9em ui-monospace,SFMono-Regular,Menlo,monospace}
.mx-md pre{background:rgba(128,128,128,.13);padding:11px 13px;border-radius:8px;overflow-x:auto;line-height:1.6;border:1px solid rgba(128,128,128,.22)}
.mx-md pre code{background:none;padding:0;font-size:.88em;border-radius:0}
.mx-md blockquote{margin:.7em 0;padding:.3em .9em;border-left:3px solid rgba(128,128,128,.5);background:rgba(128,128,128,.10);border-radius:0 6px 6px 0;opacity:.9}
.mx-md blockquote p{margin:.3em 0}
.mx-md table{border-collapse:collapse;margin:.8em 0;display:block;overflow-x:auto;max-width:100%}
.mx-md th,.mx-md td{border:1px solid rgba(128,128,128,.33);padding:5px 10px;vertical-align:top}
.mx-md th{background:rgba(128,128,128,.16);font-weight:600;white-space:nowrap}
.mx-md tr:nth-child(2n) td{background:rgba(128,128,128,.055)}
.mx-md hr{border:0;border-top:1px solid rgba(128,128,128,.35);margin:1.4em 0}
.mx-md img{max-width:100%;border-radius:8px}
.mx-md strong{font-weight:650}
.mx-md del{opacity:.7}
.mx-md input[type=checkbox]{margin-right:.35em}`
    ;(function injectMdCss() {
      if (typeof document === 'undefined' || !document.head) return
      if (document.getElementById('mx-md-css')) return
      const st = document.createElement('style')
      st.id = 'mx-md-css'
      st.textContent = MD_CSS
      document.head.appendChild(st)
    })()

    function renderMd(text) {
      try {
        const html = marked.parse(String(text || ''))
        return [h('div', { key: 'md', className: 'mx-md', dangerouslySetInnerHTML: { __html: html } })]
      } catch (e) {
        return [h('div', {
          key: 'md-err',
          style: { color: '#c33', fontFamily: MONO, whiteSpace: 'pre-wrap', fontSize: 12 },
        }, T('渲染出错：') + String((e && e.message) || e))]
      }
    }

    const LINE = 'rgba(128,128,128,0.35)'

    const tilde = (p) => String(p || '').replace(/^\/Users\/[^/]+\//, '~/')
    const HILITE = 'rgba(128,128,128,0.20)'
    const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

    const MS_BTN = {
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px',
      borderRadius: 6, border: '1px solid ' + LINE, background: 'transparent',
      color: 'inherit', font: 'inherit', fontSize: 11.5, cursor: 'pointer',
      maxWidth: 210, whiteSpace: 'nowrap', overflow: 'hidden',
    }
    const MS_PANEL = {
      position: 'absolute', top: '100%', left: 0, marginTop: 3, zIndex: 60,
      minWidth: 150, maxHeight: 300, overflow: 'auto', borderRadius: 6, padding: '3px 0',
      border: '1px solid ' + LINE, background: 'Canvas', color: 'CanvasText',
      boxShadow: '0 8px 24px rgba(0,0,0,.18)',
    }

    const DT_GRP = { display: 'inline-flex', gap: 4, alignItems: 'center', whiteSpace: 'nowrap' }
    const DT_LABEL = { opacity: 0.55, fontSize: 11 }
    const DT_IN = {
      flex: '0 0 auto', minWidth: 0, width: 132, padding: '3px 6px', borderRadius: 6,
      border: '1px solid ' + LINE, background: 'transparent', color: 'inherit',
      font: 'inherit', fontSize: 11.5,
    }

    const FILE_BIT_START = 1
    const ACL_BITS = [
      { key: 'add', ch: '增', label: '增（只往里放新的，不改不删）' },
      { key: 'read', ch: '查', label: '查（能查看和搜索）' },
      { key: 'put', ch: '改', label: '改（能改已有的）' },
      { key: 'del', ch: '删', label: '删（能删除）' },
    ]

    function appendTag(seq, tag, sym) {

      const kept = seq || []
      const last = kept[kept.length - 1]
      const hasLone = last && !last.tag && last.sym !== '(' && last.sym !== ')'

      return hasLone
        ? [...kept.slice(0, -1), { sym: last.sym, tag }]
        : [...kept, { sym: sym || '+', tag }]
    }

    function seqPairs(seq) {
      return (seq || []).map((x) => [x.sym, x.tag || ''])
    }

    function MultiSelect({ allLabel, options, value, onChange, onOpen }) {
      const [open, setOpen] = React.useState(false)
      const box = React.useRef(null)
      React.useEffect(() => {
        if (!open) return undefined
        const off = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
        document.addEventListener('mousedown', off)
        return () => document.removeEventListener('mousedown', off)
      }, [open])
      const label = !value.length ? allLabel
        : value.length <= 2 ? value.join(' · ')
        : value.slice(0, 2).join(' · ') + ' +' + (value.length - 2)
      const oVal = (o) => (typeof o === 'object' && o ? o.v : o)
      const oN = (o) => (typeof o === 'object' && o ? o.n : null)
      const oFoot = (o) => (typeof o === 'object' && o && (o.hot || o.cold)
        ? '热 ' + (o.hot || 0) + ' · 冷 ' + (o.cold || 0) : '')
      const toggle = (v) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
      return h('div', { ref: box, style: { position: 'relative', display: 'inline-block' } },
        h('button', {
          style: MS_BTN,
          onClick: () => { if (!open && onOpen) onOpen(); setOpen(!open) },
          title: value.join(' · ') || allLabel,
        },
          h('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis' } }, label),
          h('span', { style: { opacity: 0.5, fontSize: 9 } }, '▾')),
        open ? h('div', { style: MS_PANEL },
          options.map((o) => {
            const v = oVal(o)
            const on = value.includes(v)
            const n = oN(o)
            return h('div', {
              key: v,
              title: oFoot(o),
              style: { display: 'flex', alignItems: 'center', gap: 6, padding: '4px 9px', fontSize: 11.5, cursor: 'pointer' },
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => toggle(v),
            },
              h('span', { style: { width: 11, opacity: on ? 1 : 0.28 } }, on ? '✓' : '☐'),
              h('span', { style: { flex: 1 } }, v),
              n === null ? null : h('span', { style: { opacity: 0.45, fontSize: 10.5 } }, n))
          })) : null)
    }

    const CODE = {
      fontFamily: MONO, fontSize: '0.92em', padding: '1px 5px',
      borderRadius: 4, background: HILITE,
    }
    const PRE = {
      fontFamily: MONO, fontSize: 12.5, lineHeight: 1.6, margin: '8px 0',
      padding: '10px 12px', borderRadius: 8, border: '1px solid ' + LINE,
      background: HILITE, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
    }
    const QUOTE = {
      margin: '8px 0', padding: '2px 12px', borderLeft: '3px solid ' + LINE, opacity: 0.85,
    }

    function MemoryIcon(props) {
      const s = (props && props.size) || 16
      return h('svg', {
        width: s, height: s, viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.7,
        strokeLinecap: 'round', strokeLinejoin: 'round',
      },
        h('path', { d: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H19v14.5H6.5A2.5 2.5 0 0 0 4 20z' }),
        h('path', { d: 'M4 20a2.5 2.5 0 0 1 2.5-2.5H19' }),
        h('path', { d: 'M9 7.5h6M9 10.8h4' }))
    }

    function Node(props) {
      const { depth, label, meta, open, active, leaf, onClick, onLabelClick, onFolderClick, title, dim, aclBits, aclOwn, onAclBit, bitStart = 0 } = props
      const stop = (fn) => (e) => { e.stopPropagation(); if (fn) fn(e) }
      const [hover, setHover] = React.useState(false)
      return h('div', {
        onClick,
        title: title || label,
        style: {
          display: 'flex', gap: 6, alignItems: 'baseline', cursor: 'pointer',
          padding: '2px 6px', paddingLeft: 6 + depth * 13, borderRadius: 6,
          background: active ? HILITE : 'transparent',
        },
        onMouseEnter: (e) => {
          setHover(true)
          if (!active) e.currentTarget.style.background = 'rgba(128,128,128,0.10)'
        },
        onMouseLeave: (e) => {
          setHover(false)
          if (!active) e.currentTarget.style.background = 'transparent'
        },
      },
        h('span', {
          style: { flex: '0 0 10px', opacity: 0.5 },
          onClick: onLabelClick ? stop(onClick) : undefined,
        }, leaf ? '·' : (open ? '▾' : '▸')),
        h('span', {
          style: { flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                   opacity: dim ? 0.55 : undefined },
          onClick: onLabelClick ? stop(onLabelClick) : undefined,
        }, label),
        onFolderClick ? h('span', {
          style: {
            flex: '0 0 auto', fontSize: 11, lineHeight: 1,
            opacity: hover ? 0.75 : 0, transition: 'opacity .12s',
            padding: '0 2px', cursor: 'pointer',
          },
          title: T('在 Finder 中打开这个目录'),
          onClick: stop(onFolderClick),
        }, '📁') : null,
        meta ? h('span', { style: { flex: '0 0 auto', opacity: 0.45, fontSize: 11 } }, meta) : null,

        typeof aclBits === 'undefined' ? null : h('span', {
          style: { display: 'inline-flex', gap: 2, flex: '0 0 auto', alignItems: 'center' },
        }, ACL_BITS.slice(bitStart).map((b, j) => h('span', {
          key: b.key,

          title: T(b.label) + (aclBits[j] === null ? T('（部分）') : ''),
          style: {
            width: 14, height: 14, lineHeight: '13px', textAlign: 'center',
            fontSize: 9.5, fontFamily: 'inherit', borderRadius: 3,

            fontWeight: aclBits[j] === false ? 400 : 600,
            color: aclBits[j] === true ? '#ffffff'
              : aclBits[j] === null ? '#374151' : '#9ca3af',
            background: aclBits[j] === true ? '#9ca3af'
              : aclBits[j] === null ? '#d1d5db' : '#f3f4f6',
            border: (aclOwn && aclOwn[j]) ? '2px solid #6366f1'
              : (aclBits[j] === false ? '1px solid #e5e7eb' : '1px solid transparent'),
            cursor: 'pointer', userSelect: 'none',
          },

          onClick: stop((e) => onAclBit(j + bitStart, !!(e && e.shiftKey))),
        }, T(b.ch))))
      )
    }

    const fmtTs = (v) => {
      const t = String(v || '')
      if (!t) return ''
      const d = new Date(t)
      if (Number.isNaN(d.getTime())) {
        const m = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/.exec(t)
        return m ? `${m[1]}-${m[2]}-${m[3]} ${m[4]}:${m[5]}` : t
      }
      const p2 = (n) => String(n).padStart(2, '0')
      return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())} ${p2(d.getHours())}:${p2(d.getMinutes())}`
    }
    const PILL = {
      display: 'inline-block', padding: '1px 7px', borderRadius: 10, fontSize: 10.5,
      background: HILITE, border: '1px solid ' + LINE, whiteSpace: 'nowrap',
    }

    function ScoreBadge({ value }) {
      if (value === undefined || value === null) return null
      const v = Number(value)
      if (!isFinite(v)) return null
      const c = v >= 85
        ? { bg: 'rgba(232,163,61,.16)', bd: 'rgba(232,163,61,.55)', fg: '#b8860b', label: T('核心') }
        : v >= 65
          ? { bg: 'rgba(99,102,241,.14)', bd: 'rgba(99,102,241,.5)', fg: '#6366f1', label: T('已验证') }
          : { bg: 'rgba(120,120,120,.12)', bd: 'rgba(120,120,120,.4)', fg: 'inherit', label: T('草稿') }
      return h('span', {
        style: {
          padding: '1px 8px', borderRadius: 10, fontSize: 10.5, whiteSpace: 'nowrap',
          border: '1px solid ' + c.bd, background: c.bg, color: c.fg,
        },
        title: T('importance 0~100：这条记忆被检索命中的次数换算来的（每次 +3，每天 ×0.995）'),
      }, T('重要 ') + v.toFixed(0) + ' · ' + c.label)
    }

    function KwRow({ kws }) {
      const [all, setAll] = React.useState(false)
      if (!kws || !kws.length) return null
      return h('div', { style: { display: 'flex', gap: 4, marginTop: 4, alignItems: 'center', minWidth: 0 } },
        h('div', {
          style: {
            display: 'flex', gap: 4, flex: 1, minWidth: 0,
            flexWrap: all ? 'wrap' : 'nowrap',
            overflow: all ? 'visible' : 'hidden',
          },
        }, kws.map((k, j) => h('span', {
          key: j,
          style: {
            padding: '0 5px', borderRadius: 4, fontSize: 10.5, whiteSpace: 'nowrap', flex: '0 0 auto',
            background: 'rgba(99,102,241,.18)', border: '1px solid rgba(99,102,241,.4)',
          },
        }, k))),
        kws.length > 1 ? h('button', {
          style: {
            flex: '0 0 auto', cursor: 'pointer', fontSize: 10.5, padding: '0 6px',
            borderRadius: 4, border: '1px solid ' + LINE, background: 'transparent', color: 'inherit',
            opacity: 0.75,
          },
          onClick: (e) => { e.stopPropagation(); setAll(!all) },
          title: all ? T('收起 tag') : T('展开全部 ') + kws.length + T(' 个 tag'),
        }, all ? T('收起') : '+' + (kws.length - 1)) : null)
    }

    function MetaCard({ meta, human, machine, onSave, busy, readOnly }) {
      const [edit, setEdit] = React.useState(false)
      const [showMachine, setShowMachine] = React.useState(false)
      const [descOpen, setDescOpen] = React.useState(true)
      const [kwAll, setKwAll] = React.useState(false)
      const [form, setForm] = React.useState({ title: '', description: '', category: '', tags: '' })
      React.useEffect(() => {
        if (!meta) { setForm({ title: '', description: '', category: '', tags: '' }); setEdit(false); return }
        setForm({
          title: String(meta.title || meta.name || ''),
          description: String(meta.description || ''),
          category: String(meta.category || ''),
          tags: Array.isArray(meta.tags) ? meta.tags.join(' ') : String(meta.tags || ''),
        })
        setEdit(false)
      }, [meta])
      if (!meta) return null
      const box = {
        border: '1px solid ' + LINE, borderRadius: 8, padding: '5px 9px',
        marginBottom: 8, fontSize: 11.5, display: 'flex', flexDirection: 'column', gap: 4,
      }
      const lab = { opacity: 0.5, fontSize: 11, flex: '0 0 52px' }
      const inp = {
        flex: 1, minWidth: 0, padding: '4px 8px', borderRadius: 6, fontSize: 12,
        border: '1px solid ' + LINE, background: 'transparent', color: 'inherit', font: 'inherit',
      }
      const btn = {
        padding: '3px 10px', borderRadius: 6, border: '1px solid ' + LINE,
        background: 'transparent', color: 'inherit', cursor: 'pointer', font: 'inherit', fontSize: 11.5,
      }
      if (edit) {
        const row = (k, label, multi) => h('div', { key: k, style: { display: 'flex', gap: 6, alignItems: multi ? 'flex-start' : 'center' } },
          h('span', { style: lab }, label),
          multi
            ? h('textarea', {
                style: { ...inp, minHeight: 54, resize: 'vertical', fontFamily: 'inherit' },
                value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }),
              })
            : h('input', { style: inp, value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) }))
        return h('div', { style: box },
          row('title', T('标题')),
          row('category', T('分类')),
          row('tags', T('关键词')),
          row('description', T('简介'), true),
          h('div', { style: { display: 'flex', gap: 6, justifyContent: 'flex-end' } },
            h('span', { style: { flex: 1, opacity: 0.45, fontSize: 10.5, alignSelf: 'center' } }, T('关键词用空格分隔')),
            h('button', { style: btn, onClick: () => setEdit(false) }, T('取消')),
            h('button', {
              style: { ...btn, opacity: readOnly ? 0.5 : 1 },
              disabled: busy || readOnly,
              title: readOnly ? T('只读授权：这篇以远端为准，本地改了同步时会被远端覆盖') : '',
              onClick: () => onSave({
                title: form.title, category: form.category,
                tags: form.tags.split(/\s+/).filter(Boolean),
                description: form.description,
              }),
            }, T('保存属性'))))
      }
      const kws = Array.isArray(meta.tags) ? meta.tags : String(meta.tags || '').split(/\s+/).filter(Boolean)
      return h('div', { style: box },
        h('div', { style: { display: 'flex', gap: 5, alignItems: 'center', minWidth: 0 } },
          h('div', {
            key: 'kws',
            style: {
              display: 'flex', gap: 5, flex: 1, minWidth: 0,
              flexWrap: kwAll ? 'wrap' : 'nowrap',
              overflow: kwAll ? 'visible' : 'hidden',
            },
          },
            meta.category ? h('span', { key: 'c', style: { ...PILL, flex: '0 0 auto', borderColor: 'rgba(99,102,241,.5)', background: 'rgba(99,102,241,.14)' } }, meta.category) : null,
            kws.map((k) => h('span', { key: 'k' + k, style: { ...PILL, flex: '0 0 auto' } }, k))),
          (kws.length + (meta.category ? 1 : 0)) > 3
            ? h('button', {
                key: 'kwbtn', style: { ...btn, padding: '1px 7px', flex: '0 0 auto', opacity: 0.7 },
                onClick: () => setKwAll(!kwAll),
                title: kwAll ? T('收起关键词') : T('展开全部 ') + (kws.length + (meta.category ? 1 : 0)) + T(' 个胶囊'),
              }, kwAll ? T('收起') : '…')
            : null,
          h('span', { key: 'sp', style: { flex: '0 0 8px' } }),
          meta.created_at ? h('span', { key: 'ct', style: { opacity: 0.45, fontSize: 10.5, whiteSpace: 'nowrap' } }, T('创建 ') + fmtTs(meta.created_at)) : null,
          meta.updated_at ? h('span', { key: 'ut', style: { opacity: 0.45, fontSize: 10.5, whiteSpace: 'nowrap' } }, T('修改 ') + fmtTs(meta.updated_at)) : null,
          meta.status ? h('span', { key: 'st', style: { opacity: 0.45, fontSize: 10.5, whiteSpace: 'nowrap' } }, meta.status) : null,
          h('button', {
            key: 'b', style: { ...btn, padding: '1px 8px', opacity: readOnly ? 0.35 : 0.7 },
            disabled: !!readOnly,
            onClick: () => setEdit(true),
            title: readOnly ? T('只读授权：这篇以远端为准，本地改了同步时会被远端覆盖') : T('改标题/分类/关键词/简介'),
          }, '✎')),
        meta.description
          ? h('div', { key: 'desc' },
              h('span', {
                style: { cursor: 'pointer', opacity: 0.4, fontSize: 10.5, userSelect: 'none' },
                onClick: () => setDescOpen(!descOpen),
              }, (descOpen ? '▾ ' : '▸ ') + T('简介')),
              descOpen
                ? h('div', { style: { opacity: 0.7, lineHeight: 1.55, fontSize: 11, marginTop: 3 } }, meta.description)
                : null)
          : null,
        (machine && machine.length)
          ? h('div', null,
              h('span', {
                style: { cursor: 'pointer', opacity: 0.4, fontSize: 10.5, userSelect: 'none' },
                onClick: () => setShowMachine(!showMachine),
              }, (showMachine ? '▾ ' : '▸ ') + T('技术字段 ') + machine.length),
              showMachine
                ? h('div', { style: { fontFamily: MONO, fontSize: 10, opacity: 0.55, marginTop: 3, wordBreak: 'break-all', lineHeight: 1.5 } },
                    machine.map((k) => h('div', { key: k },
                      h('span', { style: { opacity: 0.7 } }, k + ': '),
                      Array.isArray(meta[k]) ? (meta[k].length ? meta[k].join(', ') : '[]') : String(meta[k]))))
                : null)
          : null)
    }

    function MemoryPanel(props) {
      const full = !!(props && props.full)
      const [stats, setStats] = React.useState(null)
      const [tree, setTree] = React.useState(null)

      const [treeOpen, setTreeOpen] = React.useState(() => {
        try { return localStorage.getItem('mx-tree-open') !== '0' } catch (e) { return true }
      })
      const [treeW, setTreeW] = React.useState(() => {
        try {
          const v = Number(localStorage.getItem('mx-tree-w'))
          return Number.isFinite(v) && v >= 200 && v <= 900 ? v : 0
        } catch (e) { return 0 }
      })

      const treeMaxW = full ? 900 : 480
      const treeBoxW = Math.min(treeW || (full ? 330 : 292), treeMaxW)
      const [q, setQ] = React.useState('')
      const [hits, setHits] = React.useState(null)
      const [total, setTotal] = React.useState(0)
      const [coldHits, setColdHits] = React.useState(0)
      const [hitsCollapsed, setHitsCollapsed] = React.useState(false)
      const searchLimit = 200
      const DEFAULT_LAYERS = []
      const [fLayers, setFLayers] = React.useState(DEFAULT_LAYERS)
      const [fZone, setFZone] = React.useState(['hot'])
      const [fCats, setFCats] = React.useState([])
      const [fCAfter, setFCAfter] = React.useState('')
      const [fCBefore, setFCBefore] = React.useState('')
      const [fMAfter, setFMAfter] = React.useState('')
      const [fMBefore, setFMBefore] = React.useState('')
      const [dtType, setDtType] = React.useState({ cA: 'text', cB: 'text', mA: 'text', mB: 'text' })

      const [fMinImp, setFMinImp] = React.useState('')
      const [fMaxImp, setFMaxImp] = React.useState('')
      const [filtersOpen, setFiltersOpen] = React.useState(false)

      const [tagSeq, setTagSeq] = React.useState([])
      const [tagCursor, setTagCursor] = React.useState(-1)
      const [tagInput, setTagInput] = React.useState('')
      const [tagOpen, setTagOpen] = React.useState(false)
      const [tagOptions, setTagOptions] = React.useState([])

      const [allTags, setAllTags] = React.useState([])

      const loadAllTags = React.useCallback(() => {
        const z = fZone.length === 0 ? 'none' : fZone.length === 1 ? fZone[0] : 'both'
        fetch('/memory-xfy/facets?zone=' + encodeURIComponent(z))
          .then((r) => r.json())
          .then((d) => { if (d.ok) setAllTags(d.tags || []) })
          .catch(() => {  })
      }, [fZone])
      React.useEffect(() => {
        fetch('/memory-xfy/tags')
          .then((r) => r.json())
          .then((d) => { setAllTags(d.tags || []); setTagOptions(d.tags || []) })
          .catch(() => { setAllTags([]); setTagOptions([]) })
      }, [])

      const [catOptions, setCatOptions] = React.useState([])

      const loadFacets = React.useCallback((ov) => {

        const seqNow = (ov && Array.isArray(ov.tagSeq)) ? ov.tagSeq : tagSeq
        const p2 = new URLSearchParams()

        const inlineMust = []
        let qClean = q.trim()
        qClean = qClean.replace(/["“”「」]([^"“”「」]+)["“”「」]/g, (_m, inner) => {
          const t = String(inner).trim()
          if (t) inlineMust.push(t)
          return ' '
        })
        const parts = qClean.split(/\s+/).filter(Boolean)
        for (const p3 of parts) if (p3.startsWith('+') && p3.length > 1) inlineMust.push(p3.slice(1))
        qClean = parts.filter((p3) => !(p3.startsWith('+') && p3.length > 1)).join(' ')
        if (qClean) p2.set('q', qClean)
        if (inlineMust.length) p2.set('must', inlineMust.join(' '))
        if (fLayers.length) p2.set('layer', fLayers.join(','))
        if (fCats.length) p2.set('category', fCats.join(','))
        if (seqNow.length) p2.set('tagseq', JSON.stringify(seqPairs(seqNow)))
        if (fMinImp) p2.set('minimp', fMinImp)
        if (fMaxImp) p2.set('maximp', fMaxImp)
        p2.set('zone', fZone.length === 0 ? 'none' : fZone.length === 1 ? fZone[0] : 'both')
        fetch('/memory-xfy/facets?' + p2.toString()).then((r) => r.json())
          .then((d) => {
            if (!d.ok) return
            setCatOptions(d.categories || [])
            setTagOptions(d.tags || [])
          })
          .catch(() => {  })
      }, [q, fLayers, fCats, tagSeq, fMinImp, fMaxImp, fZone])
      const [busy, setBusy] = React.useState(false)

      const [cfgOpen, setCfgOpen] = React.useState(false)
      const [cfgData, setCfgData] = React.useState(null)
      const [cfgErr, setCfgErr] = React.useState('')

      const [cfgTab, setCfgTab] = React.useState('')

      const [layoutData, setLayoutData] = React.useState(null)
      const layoutRows = layoutData ? layoutData.layers : null
      const [layoutBusy, setLayoutBusy] = React.useState(false)
      const [layoutMsg, setLayoutMsg] = React.useState('')

      const [dragIdx, setDragIdx] = React.useState(-1)
      const saveOrder = (rows) => {
        fetch('/memory-xfy/layers-order', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ order: rows.map((r) => r.layer) }),
        }).then((r) => r.json())
          .then((d) => {
            if (!d.ok) { setLayoutMsg(T('排序没保存上：') + (d.error || '')); return }
            setLayoutMsg(T('层顺序已保存（左侧树已跟着变）'))
            loadTree()
          })
          .catch((e) => setLayoutMsg(T('排序没保存上：') + String(e)))
      }
      const moveRow = (from, to) => {
        if (from < 0 || from === to || !layoutRows[from] || !layoutRows[to]) return
        const next = [...layoutRows]
        const [one] = next.splice(from, 1)
        next.splice(to, 0, one)

        setLayoutData((d) => (d ? { ...d, layers: next } : d))
        saveOrder(next)
      }
      const fmtBytes = (b) => {
        if (!b) return '0 B'
        if (b < 1024) return b + ' B'
        if (b < 1048576) return (b / 1024).toFixed(1) + ' KB'
        if (b < 1073741824) return (b / 1048576).toFixed(1) + ' MB'
        return (b / 1073741824).toFixed(2) + ' GB'
      }
      const loadLayout = () => {
        fetch('/memory-xfy/layout').then((r) => r.json())
          .then((d) => {
            if (d.ok) setLayoutData(d)
            else setLayoutMsg(T('读不到层目录：') + (d.error || ''))
          })
          .catch((e) => setLayoutMsg(String(e)))
      }

      const savePath = (payload, how) => {
        setLayoutBusy(true); setLayoutMsg(T('搬家中…'))
        fetch('/memory-xfy/layout-save', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        }).then((r) => r.json())
          .then((d) => {
            setLayoutBusy(false)
            if (!d.ok) return setLayoutMsg(T('搬迁失败：') + (d.error || ''))
            setLayoutMsg(d.verified
              ? T('已搬到 ') + how + ' · ' + d.after.n + T(' 个文件 · ') + fmtBytes(d.after.b) + ' ✅'
              : T('⚠️ 搬完对不上：') + (d.error || ''))
            loadLayout()
          })
          .catch((e) => { setLayoutBusy(false); setLayoutMsg(String(e)) })
      }

      const editDir = (layer, index, raw, files, bytes) => {
        const next = window.prompt(
          T('改成什么子路径？（相对主路径，比如 docs、logs/changelog）\n\n现在是：') + raw, raw)
        if (next === null) return
        const to = String(next).trim()
        if (to === raw) return
        if (!to) return setLayoutMsg(T('子路径不能留空'))
        if (to.startsWith('/')) return setLayoutMsg(T('只能写相对主路径的子路径，不是绝对路径'))
        if (!window.confirm(T('会真的把文件搬过去（不是软链）：\n')
          + raw + ' → ' + to + '\n' + files + T(' 个文件 · ') + fmtBytes(bytes))) return
        savePath({ kind: 'dir', layer, index, to }, to)
      }
      const editCold = (raw, files, bytes) => {
        const next = window.prompt(
          T('冷区统一放在哪个子路径？（相对主路径，默认 archived）\n\n现在是：') + (raw || 'archived'), raw)
        if (next === null) return
        const to = String(next).trim() || 'archived'
        if (to === raw) return
        if (to.startsWith('/')) return setLayoutMsg(T('只能写相对主路径的子路径，不是绝对路径'))
        if (!window.confirm(T('会真的把整个冷区搬过去（不是软链）：\n')
          + (raw || 'archived') + ' → ' + to + T('\n共 ') + files + T(' 个文件 · ') + fmtBytes(bytes))) return
        savePath({ kind: 'cold', to }, to)
      }

      const editRoot = (raw, abs, files, bytes) => {
        const next = window.prompt(
          T('主路径改成哪？（绝对路径，留空 = ~/.dsh）\n所有记忆文件会整体搬过去（包括 mem.db）\n\n现在是：')
            + (raw || abs), raw)
        if (next === null) return
        const to = String(next).trim()
        if (to === raw) return
        if (to && to[0] !== '/') return setLayoutMsg(T('主路径要给绝对路径（或留空 = ~/.dsh）'))
        if (!window.confirm(T('会把所有记忆文件整体搬到：\n')
          + (to || '~/.dsh') + T('\n共 ') + files + T(' 个文件 · ') + fmtBytes(bytes)
          + T('\n\n程序（bin/ projects/ telegram/）不动。'))) return
        savePath({ kind: 'root', to }, to || '~/.dsh')
      }
      const exportCfg = () => {
        fetch('/memory-xfy/config-export').then((r) => r.json())
          .then((d) => {
            if (!d.ok) return setLayoutMsg(T('导出失败：') + (d.error || ''))
            const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' })
            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = 'memory-xfy-config-' + new Date().toISOString().slice(0, 10) + '.json'
            a.click()
            URL.revokeObjectURL(a.href)
            setLayoutMsg(T('已导出：层定义（含层级顺序）+ 每层目录 + token 权限 + 同步地址/token'))
          })
          .catch((e) => setLayoutMsg(String(e)))
      }
      const importCfg = () => {
        const inp = document.createElement('input')
        inp.type = 'file'
        inp.accept = 'application/json,.json'
        inp.onchange = () => {
          const f = inp.files && inp.files[0]
          if (!f) return
          f.text().then((txt) => {
            let obj
            try { obj = JSON.parse(txt) } catch { return setLayoutMsg(T('这个文件不是合法 JSON')) }
            if (!obj || obj.kind !== 'dsh-memory-xfy/config') return setLayoutMsg(T('不是本插件导出的配置（缺 kind）'))
            const n = ((obj.layers && obj.layers.layers) || []).length
            if (!window.confirm(T('导入会覆盖现在的层定义和 token 权限，确定？\n\n配置里有 ') + n + T(' 层'))) return
            setLayoutBusy(true); setLayoutMsg(T('导入中…'))
            fetch('/memory-xfy/config-import', {
              method: 'POST', headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ what: 'both', layers: obj.layers, plugin: obj.plugin }),
            }).then((r) => r.json())
              .then((d) => {
                setLayoutBusy(false)
                setLayoutMsg(d.ok ? T('导入完成：层定义 + 插件配置都换了（刷新页面生效）') : T('导入失败：') + (d.error || ''))
                if (d.ok) loadLayout()
              })
              .catch((e) => { setLayoutBusy(false); setLayoutMsg(String(e)) })
          })
        }
        inp.click()
      }
      const [remoteUrl, setRemoteUrl] = React.useState('')
      const [remoteToken, setRemoteToken] = React.useState('')
      const [syncMsg, setSyncMsg] = React.useState('')

      const [remoteDiff, setRemoteDiff] = React.useState(null)

      const [remoteMe, setRemoteMe] = React.useState(null)
      const [remoteBusy, setRemoteBusy] = React.useState(false)
      const [delConfirm, setDelConfirm] = React.useState(false)
      const [acl, setAcl] = React.useState(null)
      const [profiles, setProfiles] = React.useState([])
      const [curTok, setCurTok] = React.useState('')
      const [newName, setNewName] = React.useState('')

      const [renaming, setRenaming] = React.useState(false)
      const [renameDraft, setRenameDraft] = React.useState('')
      const [selRows, setSelRows] = React.useState([])
      const [open, setOpen] = React.useState({})
      const [sel, setSel] = React.useState(null)
      const [draft, setDraft] = React.useState('')
      const [orig, setOrig] = React.useState('')
      const [notice, setNotice] = React.useState('')
      const [confirmDel, setConfirmDel] = React.useState(false)
      const [preview, setPreview] = React.useState(true)

      const [headOpen, setHeadOpen] = React.useState(true)

      const safeMd = React.useMemo(() => {
        try {
          let t = String(draft)
          if (/^\s*---\r?\n/.test(t)) {
            const fm = /^\s*---\r?\n[\s\S]*?\r?\n---\r?\n?/.exec(t)
            if (fm) t = t.slice(fm[0].length)
          }
          const stem = String((sel && sel.path) || '').replace(/\/SKILL\.md$/, '').split('/').pop()
          if (stem) {
            t = t.replace(/^\s*#{1,2}\s+([^\n]*)\n+/, (m, title) => (title.includes(stem) ? '' : m))
          }
          if (sel && sel.mode === 'file') t = t.replace(/^\s*#\s+[^\n]*\n+/, '')
          if (window.__MEMDBG__) console.log('[MEMDBG]', JSON.stringify({ mode: sel && sel.mode, path: sel && sel.path, stem, head: String(t).slice(0, 60) }))
          return renderMd(t)
        } catch (e) {
          return [h('div', {
            key: 'render-err',
            style: { color: '#c33', fontFamily: 'ui-monospace, monospace', whiteSpace: 'pre-wrap', fontSize: 12 },
          }, T('渲染出错：') + String((e && e.message) || e))]
        }
      }, [draft, sel])

      const loadStats = React.useCallback(() => {
        fetch('/memory-xfy/stats').then((r) => r.json())
          .then((d) => setStats(d))
          .catch(() => setStats({ ok: false, error: T('读不到索引（Host 路由没起来？）') }))
      }, [])

      const loadTree = React.useCallback(() => {
        fetch('/memory-xfy/tree').then((r) => r.json())
          .then((d) => { if (d.ok) setTree(d.layers); else setNotice(d.error || T('树加载失败')) })
          .catch(() => setNotice(T('树加载失败')))
      }, [])

      const loadAcl = React.useCallback(() => {
        fetch('/memory-xfy/config').then((r) => r.json())
          .then((d) => {
            if (!d.ok) return
            setAcl((d.config && d.config.acl) || {})
            setRemoteUrl((d.config && d.config.remoteUrl) || '')
            setRemoteToken((d.config && d.config.remoteToken) || '')
            const toks = ((d.serve && d.serve.tokens) || []).map((t2) => ({
              token: t2.token, name: t2.name, layers: t2.layers || [],
            }))
            setProfiles(toks)

            setCurTok((cur) => (toks.some((t2) => t2.token === cur) ? cur : (toks.length ? toks[0].token : '')))
          })
          .catch((e) => setNotice(T('读不到设置：') + String(e)))
      }, [])

      React.useEffect(() => { loadStats(); loadTree(); loadAcl(); loadFacets() }, [loadStats, loadTree, loadAcl, loadFacets])

      const aclArr = (tok, bit) => ((acl && tok && acl[tok] && acl[tok][bit]) || [])

      const relOf = (p) => String(p || '')
        .replace(/^.*\/\.dsh\/memory\//, '')
        .replace(/^.*\/\.dsh\//, '')
      const coveredBy = (arr, path) => {
        const r = relOf(path)
        if (arr.includes('!' + r)) return false
        if (arr.includes(r)) return true
        return arr.some((sv) => sv.endsWith('/') && r.startsWith(sv))
      }

      const fileBits = (path) => ACL_BITS.slice(FILE_BIT_START).map((b) => coveredBy(aclArr(curTok, b.key), path))

      const remoteBitArr = (b, path) => coveredBy(((remoteMe && remoteMe.can && remoteMe.can[b.key]) || []), relOf(path))
      const remoteFileBits = (path) => ACL_BITS.slice(FILE_BIT_START).map((b) => remoteBitArr(b, path))
      const remoteRowBits = (files) => ACL_BITS.map((b) => {
        const vals = files.map((f) => remoteBitArr(b, f.path))
        if (!vals.length) return false
        return vals.every((v) => v === vals[0]) ? vals[0] : null
      })
      const syncNoop = () => {}

      const fileOwn = (path) => ACL_BITS.slice(FILE_BIT_START).map((b) => {
        const arr = aclArr(curTok, b.key)
        const r = relOf(path)
        return arr.includes(r) || arr.includes('!' + r)
      })

      const rowBits = (files) => ACL_BITS.map((b) => {
        const arr = aclArr(curTok, b.key)
        const vals = files.map((f) => coveredBy(arr, f.path))
        if (!vals.length) return false
        return vals.every((v) => v === vals[0]) ? vals[0] : null
      })

      const dirPrefixesOf = (files) => {
        const set = new Set()
        for (const f of files) {
          const p = relOf(f.path).split('/')
          if (p.length >= 3 && p[0] === 'archived') set.add(p[0] + '/' + p[1] + '/')
          else if (p.length >= 2) set.add(p[0] + '/')
        }
        return [...set]
      }

      const BTN_AT = { rules: 'none', bin: 'none', profiles: 'group', log: 'group' }
      const btnAt = (layer) => BTN_AT[layer] || 'layer'

      const toggleDirsBit = (dirs, files, i) => {
        const b = ACL_BITS[i].key
        const arr = aclArr(curTok, b)
        const keys = dirs.map((d) => d.replace(/\/+$/, '') + '/')
        const all = files.map((f) => relOf(f.path))
        const onNow = keys.length > 0 && keys.every((k) => coveredBy(arr, k))

        const rest = arr.filter((sv) => !keys.includes(sv) && !keys.includes(sv.replace(/^!/, ''))
          && !all.includes(sv) && !all.includes(sv.replace(/^!/, '')))
        saveAcl(setBitArr(curTok, b, onNow ? rest : [...rest, ...keys]))
      }

      const toggleDirBit = (dirRel, files, i) => {
        const b = ACL_BITS[i].key
        const arr = aclArr(curTok, b)
        const key = String(dirRel).replace(/\/+$/, '') + '/'
        const neg = '!' + key
        const all = files.map((f) => relOf(f.path))
        const rest = arr.filter((sv) => sv !== key && sv !== neg
          && !all.includes(sv) && !all.includes(sv.replace(/^!/, '')))
        const onNow = coveredBy(arr, key)

        const parentOn = arr.some((sv) => !sv.startsWith('!') && sv.endsWith('/')
          && sv !== key && key.startsWith(sv) && !arr.includes('!' + sv))
        saveAcl(setBitArr(curTok, b, onNow ? (parentOn ? [...rest, neg] : rest) : [...rest, key]))
      }
      const saveAcl = (next) => {
        setAcl(next)
        fetch('/memory-xfy/config-save', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ acl: next }),
        }).then((r) => r.json())
          .then((d) => { if (!d.ok) setNotice(T('权限没保存上：') + (d.error || '')) })
          .catch((e) => setNotice(T('权限没保存上：') + String(e)))
      }
      const setBitArr = (tok, bit, arr) => {
        const cur = { ...(acl || {}) }
        const one = { ...(cur[tok] || {}) }
        one[bit] = arr
        cur[tok] = one
        return cur
      }

      const toggleFileBit = (layer, path, files, i) => {
        const b = ACL_BITS[i].key
        const arr = aclArr(curTok, b)
        const rp = relOf(path)
        const neg = '!' + rp
        const dirHas = arr.some((sv) => sv.endsWith('/') && rp.startsWith(sv))
        const nowOn = coveredBy(arr, path)
        const rest = arr.filter((sv) => sv !== rp && sv !== neg)
        saveAcl(setBitArr(curTok, b, nowOn
          ? (dirHas ? [...rest, neg] : rest)
          : (dirHas ? rest : [...rest, rp])))
      }

      const lastRow = React.useRef('')
      const pickRow = (k, shift) => {
        if (shift && lastRow.current) {
          const keys = rowKeys()
          const a = keys.indexOf(lastRow.current)
          const b = keys.indexOf(k)
          if (a >= 0 && b >= 0) {
            const span = a < b ? keys.slice(a, b + 1) : keys.slice(b, a + 1)
            setSelRows((cur) => [...new Set([...cur, ...span])])
            return
          }
        }
        lastRow.current = k
        setSelRows((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]))
      }
      const rowKeys = () => {
        const ks = []
        for (const L of (tree || [])) {
          if (!L.files || !L.files.length) continue
          ks.push('L:' + L.layer)
          for (const F of L.files) ks.push('F:' + F.path)
        }
        return ks
      }
      const rowsToPaths = (rows) => {
        const out = []
        for (const k of rows) {
          if (k.startsWith('L:')) out.push(k.slice(2) + '/')
          else if (k.startsWith('F:')) out.push(relOf(k.slice(2)))
        }
        return out
      }

      const bulkBitOn = (picks, i) => {
        const b = ACL_BITS[i].key
        const cur = aclArr(curTok, b)
        const allIn = picks.length > 0 && picks.every((p2) => cur.includes(p2) || coveredBy(cur, p2))

        const rest = cur.filter((sv) => !picks.some((p2) => sv === p2 || sv === '!' + p2
          || (sv.endsWith('/') && p2.startsWith(sv))))
        saveAcl(setBitArr(curTok, b, allIn ? rest : [...rest, ...picks.filter((p2) => !cur.includes(p2))]))
      }

      const bulkBit = (i) => {
        bulkBitOn(selRows.length
          ? rowsToPaths(selRows)
          : (tree || []).filter((L) => L.files && L.files.length).map((L) => L.layer + '/'), i)
      }

      const bitShot = (i, k, shift, plain) => {
        const keys = shift ? rowKeys() : []
        const a = shift && lastRow.current ? keys.indexOf(lastRow.current) : -1
        const b = keys.indexOf(k)
        if (a < 0 || b < 0) { lastRow.current = k; return plain() }
        const span = a < b ? keys.slice(a, b + 1) : keys.slice(b, a + 1)
        lastRow.current = k
        setSelRows(span)
        bulkBitOn(rowsToPaths(span), i)
      }

      const remoteCall = (payload) => fetch('/memory-xfy/remote', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((r) => r.json())

      React.useEffect(() => {
        if (!remoteUrl || !remoteToken) return undefined
        let alive = true
        fetch('/memory-xfy/remote', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'me', wantDiff: true }),
        }).then((r) => r.json())
          .then((d) => {
            if (!alive || !d.ok) return
            setRemoteMe(d.me)
            setRemoteDiff(d.diff || null)
          })
          .catch(() => {})
        return () => { alive = false }
      }, [remoteUrl, remoteToken])

      const saveRemote = () => {
        const url = remoteUrl.trim(), tok = remoteToken.trim()
        if (!url || !tok) return setSyncMsg(T('先填服务器网址和 token'))
        setRemoteBusy(true)
        fetch('/memory-xfy/config-save', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ remoteUrl: url, remoteToken: tok }),
        }).then((r) => r.json())
          .then((d) => {
            if (!d.ok) throw new Error(d.error || T('保存失败'))
            return remoteCall({ action: 'me', remoteUrl: url, remoteToken: tok, wantDiff: true })
          })
          .then((d) => {
            if (!d.ok) { setRemoteMe(null); throw new Error(d.error || T('对面没回话')) }
            setRemoteMe(d.me)
            setRemoteDiff(d.diff || null)

            fetch('/memory-xfy/config-save', {
              method: 'POST', headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ remoteName: String(d.me.name || '') }),
            }).catch(() => {})
            setSyncMsg(T('连上了：') + (d.me.name || '?') + T('。权限见下（只有对方能改）'))
          })
          .catch((e) => { setRemoteMe(null); setSyncMsg(T('连不上：') + String(e && e.message || e)) })
          .finally(() => setRemoteBusy(false))
      }

      const disconnectRemote = () => {
        fetch('/memory-xfy/config-save', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ remoteUrl: '', remoteToken: '', remoteName: '' }),
        }).then((r) => r.json())
          .then((d) => {
            if (!d.ok) { setSyncMsg(T('断开失败：') + (d.error || '')); return }

            setRemoteMe(null); setRemoteDiff(null)
            setSyncMsg(T('已断开同步 —— 现在是纯本地，已经同步下来的文件都留着'))
          })
          .catch((e) => setSyncMsg(T('断开失败：') + String(e)))
      }

      const doSync = () => {
        setRemoteBusy(true)
        let baseline = {}
        try { baseline = JSON.parse(localStorage.getItem('memSyncBaseline') || '{}') || {} } catch (e) { baseline = {} }
        remoteCall({ action: 'sync', payload: { protocol: 1, baseline, changes: [] } })
          .then((d) => {
            if (!d.ok) throw new Error(d.error || T('同步失败'))
            const keep = {}
            for (const f of (d.files || [])) keep[f.path] = f.hash
            try { localStorage.setItem('memSyncBaseline', JSON.stringify(keep)) } catch (e) {  }
            const n = (d.files || []).length
            const nc = (d.conflicts || []).length
            setSyncMsg(T('同步完成：拉回 ') + n + T(' 篇') +
              (d.applied != null ? T('（落地 ') + d.applied + T('）') : '') +
              (nc ? T('，冲突 ') + nc + (d.savedConflicts ? T('（服务器那份另存 ') + d.savedConflicts + T(' 份 .conflict- 副本，本地这稿没动）') : T('')) : '') +
              ((d.rejected || []).length ? T('，被拒 ') + d.rejected.length : ''))
            loadAcl()
          })
          .catch((e) => setSyncMsg(T('同步失败：') + String(e && e.message || e)))
          .finally(() => setRemoteBusy(false))
      }

      const delTok = () => {
        setDelConfirm(!delConfirm)
        setSyncMsg(delConfirm ? '' : T('已标记删除 —— 点「保存」才真删'))
      }
      const doDelTok = () => {
        setDelConfirm(false)
        fetch('/memory-xfy/token-del', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ token: curTok }),
        }).then((r) => r.json())
          .then((d) => {
            if (!d.ok) { setSyncMsg(T('删除失败：') + (d.error || '')); return }
            setSyncMsg(T('已删掉 token「') + (d.removed || '') + T('」—— ') +
              ((d.restart && d.restart.restarted) ? T('mem-serve 已自动重启，对方立刻连不上') : T('重启 mem-serve 才生效')))

            const idx = profiles.findIndex((p2) => p2.token === curTok)
            setCurTok(idx > 0 ? profiles[idx - 1].token : '')
            setRenaming(false)
            loadAcl()
          })
          .catch((e) => setSyncMsg(T('删除失败：') + String(e)))
      }

      const copyTok = () => {
        try {
          navigator.clipboard.writeText(curTok)
          setSyncMsg(T('token 已复制'))
        } catch (e) {
          setSyncMsg(T('复制失败，手动选中复制：') + String(e))
        }
      }

      const newProfile = () => {
        fetch('/memory-xfy/token-new', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name: '' }),
        }).then((r) => r.json())
          .then((d) => {
            if (!d.ok) { setNotice(T('新建失败：') + (d.error || '')); return }
            setNotice(T('已新建 profile「') + (d.name || '') + T('」—— ') +
              ((d.restart && d.restart.restarted) ? T('mem-serve 已自动重启，立即可用') : T('重启 mem-serve 后才对外生效')))
            loadAcl()
            setCurTok(d.token)
          })
          .catch((e) => setNotice(T('新建失败：') + String(e)))
      }

      const doRename = () => {
        const nm = String(renameDraft || '').trim()
        if (!curTok || !nm) { setRenaming(false); return }
        fetch('/memory-xfy/token-new', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ token: curTok, name: nm }),
        }).then((r) => r.json())
          .then((d) => {
            if (!d.ok) { setNotice(T('改名失败：') + (d.error || '')); return }
            setRenaming(false)
            setNotice(T('已改名为「') + (d.name || '') + T('」'))
            loadAcl()
          })
          .catch((e) => setNotice(T('改名失败：') + String(e)))
      }

      React.useEffect(() => {
        if (!notice) return
        const t = setTimeout(() => setNotice(''), 4000)
        return () => clearTimeout(t)
      }, [notice])

      const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }))

      const openItem = async (path, index) => {
        setBusy(true)
        setConfirmDel(false)
        setHitsCollapsed(true)
        try {
          const r = await fetch('/memory-xfy/item?path=' + encodeURIComponent(path) + '&index=' + index)
          const d = await r.json()
          if (d.ok) {
            setSel({ path, index, importance: d.importance })
            setDraft(d.content)
            setOrig(d.content)
            setNotice('')
            setOpen((o) => ({ ...o, ['F:' + path]: true }))
          } else setNotice(d.error || T('打不开这一条'))
        } catch { setNotice(T('请求失败')) } finally { setBusy(false) }
      }

      const openFile = async (path) => {
        setBusy(true)
        setConfirmDel(false)
        try {
          const r = await fetch('/memory-xfy/item?path=' + encodeURIComponent(path) + '&index=-1')
          const d = await r.json()
          if (d.ok) {
            setSel({
              path, index: -1, mode: 'file',
              meta: d.meta || null, human: d.human || [], machine: d.machine || [],
              importance: d.importance,
              raw: !!d.raw,
            })
            setDraft(d.meta ? (d.body || '') : d.content)
            setOrig(d.meta ? (d.body || '') : d.content)
            setPreview(true)
            setNotice('')
            setOpen((o) => ({ ...o, ['F:' + path]: true }))
          } else setNotice(d.error || T('打不开这个文件'))
        } catch { setNotice(T('请求失败')) } finally { setBusy(false) }
      }

      const hostCall = async (ep, path, okMsg) => {
        try {
          const r = await fetch('/memory-xfy/' + ep + '?path=' + encodeURIComponent(path))
          const d = await r.json()
          if (d.ok) { if (okMsg) setNotice(okMsg); return true }
          setNotice(d.error || T('操作失败'))
        } catch { setNotice(T('请求失败')) }
        return false
      }
      const revealInFinder = (p) => hostCall('reveal', p)
      const openWithDefault = (p) => hostCall('open', p)
      const openRaw = (p) => hostCall('raw', p, T('正在用 Chrome 打开原文…'))
      const copyPath = async (p) => {
        try {
          await navigator.clipboard.writeText(p)
          setNotice(T('已复制路径'))
          return
        } catch {  }
        await hostCall('copy', p, T('已复制路径'))
      }

      const saveMeta = async (fields) => {
        if (!sel || !sel.path) return
        setBusy(true)
        try {
          const r = await fetch('/memory-xfy/meta', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ path: sel.path, fields }),
          })
          const d = await r.json()
          if (!d.ok) { setNotice(d.error || T('属性保存失败')); return }
          setNotice('')
          await openFile(sel.path)
        } catch { setNotice(T('请求失败')) } finally { setBusy(false) }
      }

      const post = async (payload) => {
        setBusy(true)
        try {
          const r = await fetch('/memory-xfy/save', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
          })
          const d = await r.json()
          if (!d.ok) { setNotice(d.error || T('保存失败')); return false }
          loadTree(); loadStats()
          return true
        } catch (e) { setNotice(T('保存失败：') + e); return false } finally { setBusy(false) }
      }

      const doSaveWhole = async () => {
        if (!sel) return
        setBusy(true)
        try {
          const r = await fetch('/memory-xfy/save', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ path: sel.path, whole: true, content: draft }),
          })
          const d = await r.json()
          if (!d.ok) { setNotice(d.error || T('保存失败')); return }
          setOrig(draft)
          setNotice(T('已保存整篇并重新索引'))
          loadTree(); loadStats()
          await openFile(sel.path)
        } catch (e) { setNotice(T('保存失败：') + e) } finally { setBusy(false) }
      }

      const zoneMove = async (target) => {
        if (!sel) return
        const want = target || (zoneOf(sel.path) === 'cold' ? 'hot' : 'cold')
        setBusy(true)
        try {
          const r = await fetch('/memory-xfy/zone', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ path: sel.path, zone: want }),
          })
          const d = await r.json()
          setNotice(d.ok ? (d.message || T('已转区')) : (d.error || T('转区失败')))
          if (d.ok) {
            setSel(null); setDraft(''); setOrig('')
            loadTree(); loadStats()
          }
        } catch (e) { setNotice(T('请求失败：') + e) } finally { setBusy(false) }
      }
      const snipMove = async (action) => {
        if (!sel) return
        setBusy(true)
        try {
          const r = await fetch('/memory-xfy/snip', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              path: sel.path, index: sel.index, action,
              title: sel.segTitle || '',
            }),
          })
          const d = await r.json()
          setNotice(d.ok ? (d.message || T('完成')) : (d.error || T('片段操作失败')))
          if (d.ok) { setSel(null); setDraft(''); setOrig(''); loadTree(); loadStats() }
        } catch (e) { setNotice(T('请求失败：') + e) } finally { setBusy(false) }
      }

      const isFlowLayer = (p) => /(daily|logs|reviews|archived)\//.test(String(p || ''))

      const doSave = async () => {
        if (!sel) return
        const ok = await post({ path: sel.path, index: sel.index, content: draft })
        if (!ok) return
        setNotice(T('已保存并重新索引'))
        setConfirmDel(false)
        if (sel.index < 0) {
          loadTree()
          setSel(null); setDraft(''); setOrig('')
        } else {
          setOrig(draft)
          loadTree()
        }
      }

      const doDelete = async () => {
        if (!sel || sel.index < 0) return
        if (!confirmDel) { setConfirmDel(true); return }
        const ok = await post({ path: sel.path, index: sel.index, delete: true })
        if (ok) {
          setNotice(T('已删除这一条'))
          setSel(null); setDraft(''); setOrig('')
          setConfirmDel(false)
          loadTree()
        }
      }

      const doNew = () => {
        if (!sel) return
        setSel({ path: sel.path, index: -1 })
        setDraft('')
        setOrig('')
        setConfirmDel(false)
        setPreview(false)
        setNotice(T('写下新条目，再点「保存」'))
      }

      const tagBad = React.useMemo(() => {
        const st = []
        for (const x of tagSeq) {
          if (x.tag) { if (st.length) st[st.length - 1] += 1; continue }
          if (x.sym === '(') st.push(0)
          else if (x.sym === ')') {
            if (!st.length || st[st.length - 1] === 0) return T('tag 条件不合法')
            st.pop()
            if (st.length) st[st.length - 1] += 1
          }
        }
        return st.length ? T('tag 条件不合法') : ''
      }, [tagSeq])

      const doSearch = async (n) => {
        const anyFilter = fLayers.length || fCats.length || tagSeq.length
          || fMinImp || fMaxImp || fCAfter || fCBefore || fMAfter || fMBefore
        if (tagBad) { setNotice(tagBad + T('，先改一下再检索')); return }
        if (!q.trim() && !anyFilter) { setNotice(T('搜索词和筛选条件都是空的')); return }
        setBusy(true)
        setHitsCollapsed(false)
        try {
          const lim = n || searchLimit
          const inlineMust = []
          let qClean = q.trim()
          qClean = qClean.replace(/["“”「」]([^"“”「」]+)["“”「」]/g, (_m, inner) => {
            const t = String(inner).trim()
            if (t) inlineMust.push(t)
            return ' '
          })
          const parts = qClean.split(/\s+/).filter(Boolean)
          for (const p of parts) {
            if (p.startsWith('+') && p.length > 1) inlineMust.push(p.slice(1))
          }
          qClean = parts.filter((p) => !(p.startsWith('+') && p.length > 1)).join(' ')
          if (!qClean && !inlineMust.length && !anyFilter) { setNotice(T('搜索词和筛选条件都是空的')); setBusy(false); return }
          const qs = new URLSearchParams({ q: qClean, n: String(lim) })
          if (fLayers.length) qs.set('layer', fLayers.join(','))
          qs.set('zone', fZone.length === 0 ? 'none' : fZone.length === 1 ? fZone[0] : 'both')
          if (fCats.length) qs.set('category', fCats.join(','))
          if (fCAfter.trim()) qs.set('createdAfter', fCAfter.trim())
          if (fCBefore.trim()) qs.set('createdBefore', fCBefore.trim())
          if (fMAfter.trim()) qs.set('modifiedAfter', fMAfter.trim())
          if (fMBefore.trim()) qs.set('modifiedBefore', fMBefore.trim())
          if (tagSeq.length) qs.set('tagseq', JSON.stringify(seqPairs(tagSeq)))
          if (fMinImp) qs.set('minimp', fMinImp)
          if (fMaxImp) qs.set('maximp', fMaxImp)
          const mustAll = inlineMust.join(' ')
          if (mustAll) qs.set('must', mustAll)
          const r = await fetch('/memory-xfy/search?' + qs.toString())
          const d = await r.json()
          setHits(d.hits || [])
          setTotal(d.total || 0)
          setColdHits(d.coldHits || 0)
        } catch { setHits([]); setTotal(0); setColdHits(0) } finally { setBusy(false) }
      }

      const zoneSig = fZone.slice().sort().join(',')
      const lastZone = React.useRef(zoneSig)
      React.useEffect(() => {
        if (lastZone.current === zoneSig) return
        lastZone.current = zoneSig
        if (hits === null) return
        doSearch()
      }, [zoneSig])

      const S = {
        box: {
          display: 'flex', flexDirection: 'column', gap: 10,
          padding: full ? '14px 18px' : '4px 2px',
          font: 'inherit', color: 'inherit',
          height: full ? '100%' : undefined, boxSizing: 'border-box',
        },
        row: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
        stat: {
          display: 'inline-flex', gap: 6, alignItems: 'baseline', padding: '2px 10px',
          borderRadius: 999, border: '1px solid ' + LINE, opacity: 0.9, fontSize: 12,
        },
        input: {
          flex: 1, minWidth: 200, padding: '8px 10px', borderRadius: 8,
          border: '1px solid ' + LINE, background: 'transparent', color: 'inherit', font: 'inherit',
        },
        button: {
          padding: '7px 13px', borderRadius: 8, border: '1px solid ' + LINE,
          background: 'transparent', color: 'inherit', cursor: 'pointer', font: 'inherit', fontSize: 13,
        },

        btn1: {
          padding: '7px 20px', borderRadius: 8, border: '1px solid ' + LINE,
          background: 'transparent', color: 'inherit', cursor: 'pointer', font: 'inherit', fontSize: 13,
        },
        btn2: {
          padding: '4px 12px', borderRadius: 7, border: '1px solid ' + LINE,
          background: 'transparent', color: 'inherit', cursor: 'pointer', font: 'inherit', fontSize: 12,
          lineHeight: 1.5,
        },
        hit: {
          padding: '7px 10px', borderRadius: 8, border: '1px solid ' + LINE,
          fontSize: 12, lineHeight: 1.5, wordBreak: 'break-word', cursor: 'pointer',
        },
        chip: {
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '2px 10px', borderRadius: 999, border: '1px solid ' + LINE,
          font: 'inherit', fontSize: 12, cursor: 'pointer',
          color: 'inherit', background: 'transparent', lineHeight: 1.6,
          transition: 'opacity .12s, background .12s',
        },
        treeBox: {
          flex: full ? '0 0 330px' : '0 0 292px',
          maxHeight: full ? 'none' : 620,
          minHeight: 0,
          overflow: 'auto', border: '1px solid ' + LINE,
          borderRadius: 10, padding: '6px 4px', fontSize: 12.5, lineHeight: 1.6,
        },
        editorBox: {
          flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0,
        },
        textarea: {
          width: '100%', flex: full ? 1 : undefined,
          minHeight: full ? 180 : 320, maxHeight: full ? 'none' : 520,
          padding: 10, borderRadius: 10,
          border: '1px solid ' + LINE, background: 'transparent', color: 'inherit',
          font: '12.5px/1.65 ' + MONO, resize: 'vertical', boxSizing: 'border-box',
        },
        previewBox: {
          flex: 1, minHeight: 0, overflow: 'auto',
          border: '1px solid ' + LINE, borderRadius: 10,
          padding: '12px 18px', fontSize: 13.5, lineHeight: 1.75,
        },
      }

      const layerText = stats && stats.ok ? (stats.layers || []).map((l) => l.layer + ' ' + l.n).join(' · ') : ''
      const ZONES = [
        { k: 'hot', label: T('热区记忆'), hint: T('近期流水 + 全部结论层。默认选中') },
        { k: 'cold', label: T('冷区记忆'), hint: T('超窗口的旧流水 + 搬进 archived/ 的归档（层名不变，路径自己编码冷热）。默认不选，点开就重搜') },
      ]
      const zoneButtons = ZONES.map((z) => {
        const on = fZone.includes(z.k)
        return h('button', {
          key: 'zn-' + z.k,
          style: {
            ...S.chip, padding: '3px 13px', fontSize: 12.5,
            textDecoration: on ? 'none' : 'line-through',
            borderStyle: on ? 'solid' : 'dashed',
            background: on ? HILITE : 'transparent',
            opacity: on ? 1 : 0.5,
            fontWeight: on ? 600 : 400,
          },
          title: (on ? T('✓ 正在检索') : T('✗ 不检索')) + ' · ' + z.hint,
          onClick: () => setFZone(on ? fZone.filter((x) => x !== z.k) : [...fZone, z.k]),
        }, z.label)
      })

      const resetAll = () => {
        setQ(''); setHits(null); setTotal(0); setColdHits(0); setHitsCollapsed(false)
        setFZone(['hot'])
        setFLayers(DEFAULT_LAYERS)
        setFCats([]); setTagSeq([])
        setFMinImp(''); setFMaxImp('')
        setFCAfter(''); setFCBefore(''); setFMAfter(''); setFMBefore('')
        loadStats(); loadTree(); loadFacets()
      }
      const dirty = sel && draft !== orig
      const baseName = (p) => String(p).split('/').slice(-1)[0]
      const shortPath = (p) => String(p || '').replace(/^\/Users\/[^/]+/, '~')
      const labelOf = (p) => {
        if (tree) for (const L of tree) for (const F of L.files) if (F.path === p) return F.label || F.name
        return baseName(p)
      }
      const zoneOf = (p) => {
        if (tree) for (const L of tree) for (const F of L.files) if (F.path === p) return F.zone || 'hot'
        return 'hot'
      }
      const ZonePill = (z, key) => h('span', {
        key,
        style: {
          padding: '1px 8px', borderRadius: 10, fontSize: 10.5, whiteSpace: 'nowrap',
          border: '1px solid ' + (z === 'cold' ? 'rgba(70,120,220,.5)' : 'rgba(220,90,60,.5)'),
          background: z === 'cold' ? 'rgba(70,120,220,.14)' : 'rgba(220,90,60,.12)',
          color: z === 'cold' ? '#3b6fd4' : '#c2553a',
        },
        title: z === 'cold'
          ? T('冷区：超窗口的旧流水 / 搬进 archived/ 的归档。层名不变，是路径自己编码了冷热。')
          : T('热区：近期流水 + 全部结论层。默认检索范围。'),
      }, z === 'cold' ? T('冷') : T('热'))

      const rank = { local: 0, shared: 1, sync: 2 }
      const serveGrantOf = (path) => {
        let read = false
        let write = false
        for (const tok of Object.keys(acl || {})) {
          if (!read && coveredBy(aclArr(tok, 'read'), path)) read = true
          if (!write && (coveredBy(aclArr(tok, 'put'), path) || coveredBy(aclArr(tok, 'add'), path))) write = true
          if (read && write) break
        }
        if (!read) return 'local'
        return write ? 'sync' : 'shared'
      }
      const syncStateOf = (path) => {

        if (remoteUrl && remoteToken && remoteMe && remoteMe.can
          && coveredBy(remoteMe.can.read || [], path)) return 'sync'
        return serveGrantOf(path)
      }

      const readOnlyToMe = (path) => {
        if (!(remoteUrl && remoteToken && remoteMe && remoteMe.can)) return false
        const can = remoteMe.can
        if (!coveredBy(can.read || [], path)) return false
        return !coveredBy(can.put || [], path)
      }
      const SYNC_STYLE = {
        local: { label: '本地', bg: 'rgba(120,120,120,.12)', fg: '#6b7280', bd: 'rgba(120,120,120,.42)' },
        shared: { label: '分享', bg: 'rgba(190,140,30,.15)', fg: '#a16207', bd: 'rgba(190,140,30,.5)' },
        sync: { label: '同步', bg: 'rgba(30,150,110,.15)', fg: '#0f766e', bd: 'rgba(30,150,110,.5)' },
      }
      const SyncPill = (state, key, path) => {
        const st = SYNC_STYLE[state] || SYNC_STYLE.local
        return h('span', {
          key,
          style: {
            padding: '1px 8px', borderRadius: 10, fontSize: 10.5, whiteSpace: 'nowrap',
            border: '1px solid ' + st.bd, background: st.bg, color: st.fg,
          },
          title: state === 'local' ? T('只有本机有这篇（没连远端，也没有任何已发出的 token 覆盖到它）')
            : state === 'shared'
              ? (path && readOnlyToMe(path)
                ? T('远端能读这篇、但不能改 —— 以远端为准，本地改动同步时会被覆盖')
                : T('只读分享：对端只能读这篇、不能改 —— 本机照常可以编辑，改完对方下次同步才收到新内容'))
              : (path && readOnlyToMe(path)
                ? T('只读同步：这篇从主服务器同步下来，本地只能读')
                : T('双向同步：对端也能改这篇 —— 冲突走三方合并，合不掉的进 conflict/')),
        }, T(st.label))
      }

      const permBitsOf = (path) => {
        const rel = relOf(path)
        const rm = (remoteUrl && remoteToken && remoteMe && remoteMe.can) ? remoteMe.can : null

        if (rm && coveredBy(rm.read || [], rel)) {
          return ACL_BITS.slice(FILE_BIT_START).map((b) => coveredBy(rm[b.key] || [], rel))
        }

        if (serveGrantOf(path) !== 'local') {
          return ACL_BITS.slice(FILE_BIT_START).map(
            (b) => Object.keys(acl || {}).some((t2) => coveredBy(aclArr(t2, b.key), rel)))
        }

        return ACL_BITS.slice(FILE_BIT_START).map((b) => coveredBy(aclArr(curTok, b.key), path))
      }
      const PermPills = (path, key) => h('span', {
        key, style: { display: 'inline-flex', gap: 2, alignItems: 'center' },
      }, ((bits) => ACL_BITS.slice(FILE_BIT_START).map((b, j) => {
        const on = bits[j]
        return h('span', {
          key: b.key,
          title: T(b.label),
          style: {
            width: 14, height: 14, lineHeight: '13px', textAlign: 'center',
            fontSize: 9.5, borderRadius: 3, cursor: 'default', userSelect: 'none',
            fontWeight: on ? 600 : 400,
            color: on ? '#ffffff' : '#9ca3af',
            background: on ? '#9ca3af' : '#f3f4f6',
            border: on ? '1px solid transparent' : '1px solid #e5e7eb',
          },
        }, T(b.ch))
      }))(permBitsOf(path)))

      const hitPathSet = hits === null ? null
        : new Set(hits.map((x) => x.full || x.path).filter(Boolean))
      const viewTree = !tree ? tree
        : tree
            .filter((L) => !fLayers.length || fLayers.includes(L.layer))
            .map((L) => ({
              ...L,
              files: L.files
                .filter((F) => fZone.includes(F.zone || 'hot'))
                .filter((F) => (hitPathSet ? hitPathSet.has(F.path) : true)),
            }))
            .filter((L) => L.files.length)
      const treeRows = []
      if (!tree) {
        treeRows.push(h('div', { key: 'loading', style: { opacity: 0.6, padding: 6 } }, T('加载中…')))
      } else if (!viewTree.length) {
        treeRows.push(h('div', { key: 'nohit', style: { opacity: 0.55, padding: 6, fontSize: 12 } },
          !fZone.length
            ? T('热区 / 冷区都关着 —— 在统计条上点开一个才有东西看')
            : hitPathSet ? T('没有命中的文件（点右上「刷新」恢复全树）')
              : T('这个层没勾选（在「筛选 → 全部层」里勾上）')))
      } else {
        for (const L of viewTree) {
          const lk = 'L:' + L.layer
          const lopen = (cfgTab === 'share') ? true : open[lk] !== false
          treeRows.push(h(Node, {
            key: lk, depth: 0, label: L.layer,

            meta: (cfgTab === 'share') ? undefined : L.files.length + T(' 个文件'),
            open: lopen,
            active: (cfgTab === 'share') && selRows.includes(lk),
            onClick: (e) => ((cfgTab === 'share') ? pickRow(lk, e.shiftKey) : toggle(lk)),
            onFolderClick: (cfgTab === 'share') ? undefined : (L.dir ? () => revealInFinder(L.dir) : undefined),

            aclBits: ((cfgTab === 'share') && curTok && btnAt(L.layer) === 'layer')
              ? rowBits(L.files)
              : ((cfgTab === 'sync') && remoteMe && btnAt(L.layer) === 'layer') ? remoteRowBits(L.files) : undefined,
            bitStart: 0,
            onAclBit: (cfgTab === 'sync') ? syncNoop
              : (btnAt(L.layer) === 'layer'
                ? (i, shift) => bitShot(i, lk, shift, () => toggleDirsBit(dirPrefixesOf(L.files), L.files, i))
                : undefined),
          }))
          if (!lopen) continue
          const flat = (cfgTab === 'share') ? false : !!L.flat
          const buckets = new Map()
          for (const F of L.files) {
            const g = F.group || ''
            if (!buckets.has(g)) buckets.set(g, [])
            buckets.get(g).push(F)
          }
          for (const [g, files] of buckets) {
            let fdepth = 1
            let edepth = 2
            if (g) {
              const gdir = (files.find((f) => f.groupDir) || {}).groupDir || ''

              const gRel = gdir ? relOf(gdir) : ''

              const gk = 'G:' + L.layer + ':' + (gRel || g)
              const gopen = (cfgTab === 'share') ? true : open[gk] !== false
              treeRows.push(h(Node, {
                key: gk, depth: 1,

                label: g + (files.every((f) => f.zone === 'cold') ? ' · ' + T('冷') : ''),
                meta: (cfgTab === 'share') ? undefined : files.length + T(' 个'),
                open: gopen,
                active: (cfgTab === 'share') && selRows.includes(gk),
                onClick: (e) => ((cfgTab === 'share') ? pickRow(gk, e.shiftKey) : toggle(gk)),
                onFolderClick: (cfgTab === 'share') ? undefined : (gdir ? () => revealInFinder(gdir) : undefined),

                aclBits: ((cfgTab === 'share') && curTok && btnAt(L.layer) === 'group' && gRel)
                  ? rowBits(files)
                  : ((cfgTab === 'sync') && remoteMe && btnAt(L.layer) === 'group' && gRel) ? remoteRowBits(files) : undefined,
                bitStart: 0,
                onAclBit: (cfgTab === 'sync') ? syncNoop
                  : (((cfgTab === 'share') && curTok && btnAt(L.layer) === 'group' && gRel)
                    ? (i) => toggleDirBit(gRel, files, i) : undefined),
              }))
              if (!gopen) continue
              fdepth = 2
              edepth = 3
            }
            for (const F of files) {
              const fk = 'F:' + F.path
              const fopen = flat ? true : !!open[fk]
              if (!flat) {
                treeRows.push(h(Node, {
                  key: fk, depth: fdepth, label: F.label || F.name,
                  meta: (cfgTab === 'share') ? undefined : (F.entries.length > 1
                    ? F.entries.length + T(' 条')
                    : String(F.chars || 0)),
                  open: fopen,
                  onClick: (e) => ((cfgTab === 'share') ? pickRow(fk, e.shiftKey) : toggle(fk)),
                  onLabelClick: () => openFile(F.path),
                  dim: F.zone === 'cold' && fZone.length > 1,
                  active: (cfgTab === 'share') && selRows.includes(fk),
                  meta: (cfgTab === 'share') ? undefined : undefined,
                  title: (F.zone === 'cold' ? T('【冷区归档】') : '') + F.path + T('（点名字看整篇，点三角展开）'),
                  aclBits: (cfgTab === 'share') && curTok ? fileBits(F.path)
                    : ((cfgTab === 'sync') && remoteMe ? remoteFileBits(F.path) : undefined),
                  aclOwn: (cfgTab === 'share') && curTok ? fileOwn(F.path) : undefined,
                  bitStart: FILE_BIT_START,
                  onAclBit: (cfgTab === 'sync') ? syncNoop
                    : (i, shift) => bitShot(i, fk, shift, () => toggleFileBit(L.layer, F.path, L.files, i)),
                }))
                if (!fopen) continue
              }
              if ((cfgTab === 'share')) continue
              for (const E of F.entries) {
                treeRows.push(h(Node, {
                  key: fk + '#' + E.index, depth: flat ? 1 : edepth, leaf: true,
                  label: E.heading || T('(空)'), meta: String(E.chars),
                  active: !!(sel && sel.path === F.path && sel.index === E.index),
                  onClick: () => openItem(F.path, E.index),
                }))
              }
            }
          }
        }
      }

      let editor

      const readonlyHere = !!(sel && sel.path && readOnlyToMe(sel.path))
      const RO_TIP = T('只读授权：这篇以远端为准，本地改了同步时会被远端覆盖')

      const zoneBtn = sel ? h('button', {
        key: 'zone',
        style: { ...S.button, opacity: 0.85 },
        title: zoneOf(sel.path) === 'cold'
          ? T('把整个文件移回 ~/.dsh/（热区）。冷热只由路径决定，移动即转区。')
          : T('把整个文件移进 ~/.dsh/archived/（冷区），它就不会再出现在默认检索里。'),
        onClick: () => zoneMove(), disabled: busy || readonlyHere,
        ...(readonlyHere ? { opacity: 0.5 } : {}),
      }, zoneOf(sel.path) === 'cold' ? T('⬆️ 提到热区') : T('⬇️ 提到冷区')) : null

      if (!sel) {
        editor = h('div', { style: { opacity: 0.62, fontSize: 13, lineHeight: 1.75, padding: '6px 2px' } },
          h(React.Fragment, null, renderMd(
            T('左边点开任意一条记忆，这里就能看到原文，**默认渲染成带层级的排版**。\n\n')
            + T('想改就点右上角「编辑」；改完点「保存」写回磁盘并自动重新索引。点「删除」要先点两次。\n\n')
            + T('- `#` 标题会变成大字\n')
            + T('- `**粗体**`、行内代码、列表、引用、代码块都会正常显示\n')
            + T('- 长文档可以直接往下滚，不用挤在小窗里'))))
      } else if (sel.mode === 'file') {
        editor = [

          headOpen ? h('div', { key: 'head', style: { display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap', fontSize: 12.5 } },
            h('span', {
              key: 't',
              style: { flex: '1 1 100%', opacity: 0.78, lineHeight: 1.45, wordBreak: 'break-word' },
              title: labelOf(sel.path),
            }, (sel.meta && (sel.meta.title || sel.meta.name)) || labelOf(sel.path)),
            h('span', { style: { opacity: 0.4 } }, String(draft.length)),
            h(ScoreBadge, { key: 'sc', value: sel.importance }),
            ZonePill(zoneOf(sel.path), 'zn'),
            SyncPill(syncStateOf(sel.path), 'sy', sel.path),

            (syncStateOf(sel.path) === 'sync' || syncStateOf(sel.path) === 'shared')
              ? PermPills(sel.path, 'perm') : null,
            h('span', {
              key: 'p', style: {
                flex: 1, minWidth: 0, opacity: 0.42, fontSize: 11.5,
                fontFamily: MONO, overflow: 'hidden', textOverflow: 'ellipsis',
                whiteSpace: 'nowrap', cursor: 'pointer',
              },
              title: T('点击复制完整路径\n') + sel.path,
              onClick: () => copyPath(sel.path),
            }, shortPath(sel.path)),
            sel.raw ? h('button', {
              key: 'raw', style: { ...S.button, padding: '4px 11px', fontSize: 12, opacity: 0.8 },
              title: T('用 Chrome 打开这一轮的**完整原始对话**（原文，未经压缩）'),
              onClick: () => openRaw(sel.path),
            }, T('原文')) : null,
            h('button', {
              key: 'open', style: { ...S.button, padding: '4px 11px', fontSize: 12, opacity: 0.8 },
              title: T('用默认应用打开这个文件'),
              onClick: () => openWithDefault(sel.path),
            }, T('打开')),
            h('button', {
              key: 'edit',
              style: { ...S.button, padding: '4px 11px', fontSize: 12, opacity: readonlyHere ? 0.5 : 1 },
              disabled: readonlyHere,

              title: readonlyHere ? T('只读授权：这篇以远端为准，本地改了同步时会被远端覆盖') : '',
              onClick: () => setPreview(!preview),
            }, preview ? T('编辑') : T('预览')),
            dirty ? h('span', { key: 'd', style: { color: '#e8a33d' } }, T('● 未保存')) : null,
          ) : null,
          headOpen ? h(MetaCard, {
            key: 'meta', meta: sel.meta, human: sel.human, machine: sel.machine,
            onSave: saveMeta, busy, readOnly: readonlyHere,
          }) : null,

          h('div', {
            key: 'foldbar',
            style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: 9 },
          },
            h('div', {
              title: headOpen ? T('收起上方标题 / tags / 简介') : T('展开上方标题 / tags / 简介'),
              onClick: () => setHeadOpen(!headOpen),
              style: {
                width: 44, height: 9, borderRadius: 5, border: '1px solid ' + LINE,
                background: 'Canvas', color: 'inherit', cursor: 'pointer', opacity: 0.6,
                userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, lineHeight: '7px',
              },
            }, headOpen ? '▴' : '▾')),
          preview
            ? h('div', { key: 'pv', style: S.previewBox }, safeMd)
            : h('textarea', {
                key: 'ta', style: S.textarea, value: draft, spellCheck: false,
                onChange: (e) => setDraft(e.target.value),
              }),
          preview ? null : h('div', { key: 'btns', style: S.row },
            h('button', {
              style: { ...S.button, opacity: readonlyHere ? 0.5 : 1 },
              onClick: doSaveWhole, disabled: busy || !dirty || readonlyHere,
              title: readonlyHere ? RO_TIP : '',
            }, dirty ? T('保存整篇') : T('已保存')),
            zoneBtn,
            dirty ? h('button', { style: S.button, onClick: () => setDraft(orig) }, T('还原')) : null,
          ),
        ]
      } else {
        editor = [
          h('div', { key: 'head', style: { display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap', fontSize: 12.5 } },
            h('span', {
              style: { opacity: 0.55, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
              title: labelOf(sel.path),
            }, labelOf(sel.path)),
            h('span', { style: { opacity: 0.4 } }, sel.index < 0 ? T('新增条目') : T('第 ') + (sel.index + 1) + T(' 条')),
            h('span', { style: { opacity: 0.4 } }, draft.length + T(' 字')),
            h(ScoreBadge, { key: 'sc', value: sel.importance }),
            dirty ? h('span', { style: { color: '#e8a33d' } }, T('● 未保存')) : null,
            h('span', {
              key: 'p', style: {
                flex: 1, minWidth: 0, opacity: 0.42, fontSize: 11.5,
                fontFamily: MONO, overflow: 'hidden', textOverflow: 'ellipsis',
                whiteSpace: 'nowrap', cursor: 'pointer',
              },
              title: T('点击复制完整路径\n') + sel.path,
              onClick: () => copyPath(sel.path),
            }, shortPath(sel.path)),
            h('button', {
              key: 'open', style: { ...S.button, padding: '4px 11px', fontSize: 12, opacity: 0.8 },
              title: T('用默认应用打开这个文件'),
              onClick: () => openWithDefault(sel.path),
            }, T('打开')),
            h('button', {
              style: { ...S.button, padding: '4px 11px', fontSize: 12, opacity: readonlyHere ? 0.5 : 1 },
              onClick: () => setPreview(!preview), disabled: readonlyHere,
              title: readonlyHere ? RO_TIP : '',
            }, preview ? T('编辑') : T('预览')),
          ),
          preview
            ? h('div', { key: 'pv', style: S.previewBox }, safeMd)
            : h('textarea', {
                key: 'ta', style: S.textarea, value: draft, spellCheck: false,
                onChange: (e) => setDraft(e.target.value),
              }),
          h('div', { key: 'btns', style: S.row },
            h('button', {
              style: { ...S.button, opacity: readonlyHere ? 0.5 : 1 },
              onClick: doSave, disabled: busy || !dirty || readonlyHere,
              title: readonlyHere ? RO_TIP : '',
            }, dirty ? T('保存') : T('已保存')),
            zoneBtn,
            (sel.index >= 0 && !String(sel.path).includes('/archived/'))
              ? h('button', {
                  key: 'snip',
                  style: { ...S.button, opacity: 0.85 },
                  title: T('把这一节剪出来存进 archived/ 同名文件（原文件少一节，不删内容）。适合把迭代历史、旧版本沉到冷区。'),
                  onClick: () => snipMove('archive'), disabled: busy || readonlyHere,
                }, T('📦 存档这一节'))
              : null,
            (sel.index >= 0 && String(sel.path).includes('/archived/'))
              ? h('button', {
                  key: 'unsnip',
                  style: { ...S.button, opacity: 0.85 },
                  title: T('把这一段取回原文件，插回它原来的位置（按存档标记里的 after）。'),
                  onClick: () => snipMove('restore'), disabled: busy || readonlyHere,
                }, T('📤 恢复回原位'))
              : null,
            h('button', { style: S.button, onClick: doNew, disabled: busy || readonlyHere }, T('新增一条')),
            h('button', {
              style: { ...S.button, opacity: confirmDel ? 1 : 0.75, borderColor: confirmDel ? '#d9534f' : LINE },
              onClick: doDelete, disabled: busy || readonlyHere || sel.index < 0,
            }, confirmDel ? T('确认删除？') : T('删除')),
            dirty ? h('button', { style: S.button, onClick: () => { setDraft(orig); setConfirmDel(false) } }, T('还原')) : null,
            h('button', { style: { ...S.button, opacity: 0.6 }, onClick: () => { setSel(null); setDraft(''); setOrig('') } }, T('关闭')),
          ),
        ]
      }

      const nF = fLayers.length + fCats.length + tagSeq.length
        + (fMinImp ? 1 : 0) + (fMaxImp ? 1 : 0)
        + (fCAfter ? 1 : 0) + (fCBefore ? 1 : 0) + (fMAfter ? 1 : 0) + (fMBefore ? 1 : 0)
      const fBits = []
      if (fZone.length === 1) fBits.push(fZone[0] === 'hot' ? T('只看热区') : T('只看冷区'))
      if (fLayers.length) fBits.push(T('层 ') + fLayers.join('/'))
      if (fCats.length) fBits.push(T('分类 ') + fCats.join('/'))
      if (tagSeq.length) fBits.push('tag:' + seqPairs(tagSeq).map(([a2, b2]) => a2 + b2).join(' '))
      if (fMinImp || fMaxImp) fBits.push(T('重要 ') + (fMinImp || '0') + '~' + (fMaxImp || '100'))
      if (fCAfter || fCBefore) fBits.push(T('创建有时间'))
      if (fMAfter || fMBefore) fBits.push(T('修改有时间'))

      return h('div', { style: S.box },
        h('div', { style: { fontSize: 13, opacity: 0.72, lineHeight: 1.6 } },
          T('记忆不进上下文，只被检索。这里是全部记忆的全貌——点开就能读，也能改，改完立即生效。')),
        cfgTab ? h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: 8,
            padding: '8px 10px', border: '1px solid ' + LINE, borderRadius: 10,
            background: 'rgba(99,102,241,.07)',
          },
        },

          layoutMsg ? h('div', { style: { fontSize: 12, opacity: 0.85 } }, layoutMsg) : null,

          cfgTab === 'menu'
            ? h('div', { style: { display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' } },
                h('button', {
                  style: { ...S.btn1 },
                  onClick: () => { setCfgTab('share'); setSelRows([]); loadAcl() },
                }, T('网络分享')),
                h('button', {
                  style: { ...S.btn1 },
                  onClick: () => { setCfgTab('sync'); setSelRows([]) },
                }, T('记忆同步')),
                h('button', {
                  style: { ...S.btn1 },
                  onClick: () => { setCfgTab('layout'); setSelRows([]); loadLayout() },
                }, T('存放位置')),

                h('button', { style: { ...S.btn1 }, disabled: layoutBusy, onClick: exportCfg },
                  T('导出配置')),
                h('button', { style: { ...S.btn1 }, disabled: layoutBusy, onClick: importCfg },
                  T('导入配置')),
                h('button', {
                  style: { ...S.btn1, marginLeft: 'auto' },
                  onClick: () => { setCfgTab(''); setSelRows([]) },
                }, T('关闭')),
              )
            : h('div', { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },
                h('button', {
                  style: S.btn2,
                  onClick: () => { setCfgTab('menu'); setSelRows([]) },
                }, T('← 返回')),
                h('strong', { style: { fontSize: 12.5 } },
                  cfgTab === 'share' ? T('网络分享')
                    : cfgTab === 'layout' ? T('存放位置')
                      : T('记忆同步')),
                syncMsg ? h('span', { style: { fontSize: 11.5, opacity: 0.75 } }, syncMsg) : null,
                h('button', {
                  style: { ...S.btn2, marginLeft: 'auto', opacity: 0.8 },
                  onClick: () => { setCfgTab(''); setSelRows([]) },
                }, T('关闭')),
              ),

          cfgTab === 'layout'
            ? h(React.Fragment, null,
              h('div', { style: { fontSize: 12, opacity: 0.72, lineHeight: 1.7 } },
                renderMd(
                  T('所有记忆文件都在**同一个主路径**下面，不分散。搬家是**真搬**，不是软链。\n\n')
                  + T('- 主路径只有一份，可以指到 `.dsh` 之外；改它会连 `mem.db` 一起整体搬\n')
                  + T('- 细分路径一律相对主路径（写 `docs`，不是 `/Users/…/docs`）\n')
                  + T('- 冷区是热区结构的镜像：`docs` ↔ `archived/docs`、`logs/changelog` ↔ `archived/logs/changelog`\n')
                  + T('- `rules` 跟着 `AGENTS.md`、`skills` 跟着技能目录，这两层不能改'))),
              !layoutData
                ? h('div', { style: { opacity: 0.6, fontSize: 12 } }, T('读取中…'))
                : h('div', { style: { display: 'flex', flexDirection: 'column', gap: 2 } },

                    h('div', {
                      style: {
                        display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 12,
                        padding: '6px 6px 8px', borderBottom: '1px solid ' + LINE, marginBottom: 4,
                      },
                    },
                      h('span', { style: { width: 70, fontWeight: 600 } }, T('主路径')),
                      h('span', { style: { flex: 1, minWidth: 0, display: 'flex', gap: 6, alignItems: 'baseline' } },
                        h('code', { title: layoutData.root.raw || T('（默认 ~/.dsh）'),
                          style: { fontSize: 11.5, opacity: 0.85 } }, tilde(layoutData.root.abs)),
                        h('span', { style: { fontSize: 10.5, opacity: 0.5 } }, T('（含 mem.db）'))),
                      h('button', {
                        style: { ...S.btn2, fontSize: 11, padding: '2px 8px' },
                        disabled: layoutBusy,
                        onClick: () => editRoot(layoutData.root.raw, layoutData.root.abs,
                          layoutRows.reduce((a, r) => a + r.files, 0),
                          layoutRows.reduce((a, r) => a + r.bytes, 0)),
                      }, T('改位置'))),
                    h('div', {
                      style: {
                        display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 12,
                        padding: '0 6px 8px', borderBottom: '1px solid ' + LINE, marginBottom: 4,
                      },
                    },
                      h('span', { style: { width: 70, fontWeight: 600 } }, T('冷区')),
                      h('span', { style: { flex: 1, minWidth: 0, display: 'flex', gap: 6, alignItems: 'baseline' } },

                        h('code', { title: layoutData.cold.abs,
                          style: { fontSize: 11.5, opacity: 0.85 } }, layoutData.cold.raw || 'archived'),
                        h('span', { style: { fontSize: 10.5, opacity: 0.5 } },
                          T('（一份，按各层细分路径镜像：') + layoutData.cold.raw + '/docs、' + layoutData.cold.raw + '/logs/changelog …）')),
                      h('button', {
                        style: { ...S.btn2, fontSize: 11, padding: '2px 8px' },
                        disabled: layoutBusy,
                        onClick: () => editCold(layoutData.cold.raw,
                          layoutRows.reduce((a, r) => a + r.files, 0),
                          layoutRows.reduce((a, r) => a + r.bytes, 0)),
                      }, T('改位置'))),
                    ...layoutRows.map((r, i) => {

                      const fixedLayer = r.layer === 'rules' || r.layer === 'skills'
                      return h('div', {
                        key: r.layer,
                        draggable: !layoutBusy,
                        onDragStart: (e) => {
                          setDragIdx(i)
                          if (e.dataTransfer) { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(i)) }
                        },
                        onDragOver: (e) => { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'move' },
                        onDrop: (e) => { e.preventDefault(); moveRow(dragIdx, i); setDragIdx(-1) },
                        onDragEnd: () => setDragIdx(-1),
                        title: T('拖这一行可以改层的显示顺序（左侧树跟着变）'),
                        style: {
                          display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 12,
                          padding: '4px 6px', borderRadius: 6, cursor: 'grab',
                          background: dragIdx === i ? 'rgba(99,102,241,.16)'
                            : ((i % 2) ? 'transparent' : 'rgba(128,128,128,.06)'),
                          opacity: dragIdx === i ? 0.75 : 1,
                        },
                      },
                        h('span', { style: { width: 10, opacity: 0.35, cursor: 'grab' } }, '⠿'),
                        h('span', { style: { width: 70, fontWeight: 600 } }, r.layer),
                        h('span', { style: { width: 86, opacity: 0.7 } }, r.files + T(' 个文件')),
                        h('span', { style: { width: 72, opacity: 0.7 } }, fmtBytes(r.bytes)),
                        h('span', {
                          style: {
                            flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column',
                            gap: 1, alignItems: 'flex-start',
                          },
                        },

                          ...((r.dirs && r.dirs.length)
                            ? r.dirs.map((d, k) => h('span', {
                                key: d.raw,
                                style: { display: 'inline-flex', alignItems: 'center', gap: 5, maxWidth: '100%' },
                              },
                                h('code', { title: d.abs,
                                  style: {
                                    fontSize: 11.5, opacity: 0.85, maxWidth: '100%',
                                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                  } }, d.raw),
                                fixedLayer ? null : h('button', {
                                  title: T('改成别的子路径（真搬）'),
                                  style: { ...S.btn2, fontSize: 10, padding: '0 5px', opacity: 0.75 },
                                  disabled: layoutBusy,
                                  onClick: () => editDir(r.layer, k, d.raw, r.files, r.bytes),
                                }, T('改位置'))))
                            : []),
                          (!(r.dirs || []).length && (r.fixedFiles || []).length)
                            ? h('span', { style: { fontSize: 11, opacity: 0.55 } },
                                T('直接放在主路径根下（文件白名单）'))
                            : null),
                        fixedLayer
                          ? h('span', { style: { fontSize: 11, opacity: 0.45, width: 48, textAlign: 'right' } },
                              T('固定'))
                          : null,
                      )
                    })),
            )
            : null,
          cfgTab === 'share'
            ? h(React.Fragment, null,
              h('div', { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },

                curTok
                  ? h('code', {
                      onClick: copyTok,
                      title: T('点一下复制这个 token'),
                      style: {
                        fontSize: 11, fontFamily: MONO, padding: '2px 7px', borderRadius: 6,
                        border: '1px solid ' + LINE, cursor: 'pointer', userSelect: 'all',
                        wordBreak: 'break-all', opacity: 0.9,
                        textDecoration: delConfirm ? 'line-through' : undefined,
                        color: delConfirm ? '#d9534f' : 'inherit',
                      },
                    }, curTok)

                  : (profiles.length === 0
                      ? h('span', { style: { fontSize: 12, opacity: 0.55 } }, T('还没有 token，点 ＋ 新建'))
                      : null),

                h('select', {
                  value: curTok, onChange: (e) => { setCurTok(e.target.value); setSelRows([]); setDelConfirm(false) },
                  title: T('选一个 token（每个 token 就是一套权限）'),
                  style: {
                    padding: '3px 6px', borderRadius: 6, border: '1px solid ' + LINE,
                    background: 'Canvas', color: 'CanvasText', font: 'inherit', fontSize: 12,
                  },
                }, [h('option', { key: '', value: '' }, T('选一个 token…'))]
                  .concat(profiles.map((p2) => h('option', { key: p2.token, value: p2.token },
                    p2.name || p2.token.slice(0, 8))))),

                (curTok && !renaming)
                  ? h('button', {
                      style: S.btn2,
                      title: T('给这个 profile 改个名字（token 值不变）'),
                      onClick: () => {
                        const p2 = profiles.find((x) => x.token === curTok)
                        setRenameDraft((p2 && p2.name) || '')
                        setRenaming(true)
                      },
                    }, T('改名'))
                  : null,
                renaming
                  ? h(React.Fragment, null,
                      h('input', {
                        value: renameDraft, autoFocus: true,
                        placeholder: T('新名字'),
                        onChange: (e) => setRenameDraft(e.target.value),
                        onKeyDown: (e) => {
                          if (e.key === 'Enter') doRename()
                          else if (e.key === 'Escape') setRenaming(false)
                        },
                        style: {
                          padding: '4px 8px', borderRadius: 6, border: '1px solid ' + LINE,
                          background: 'transparent', color: 'inherit', font: 'inherit',
                          fontSize: 12, width: 150,
                        },
                      }),
                      h('button', { style: S.btn2, onClick: doRename }, T('确定')),
                      h('button', { style: S.btn2, onClick: () => setRenaming(false) }, T('取消')))
                  : null,
                h('button', {
                  style: S.btn2,
                  title: T('新建 token'),
                  onClick: newProfile,
                }, '＋'),
                h('button', {
                  style: {
                    ...S.btn2,
                    borderColor: delConfirm ? '#d9534f' : LINE,
                    color: delConfirm ? '#d9534f' : 'inherit',
                  },
                  title: T('标记删除这个 token'),
                  disabled: !curTok,
                  onClick: delTok,
                }, '×'),
                delConfirm ? h('button', {
                  style: { ...S.btn2, borderColor: '#d9534f', color: '#d9534f' },
                  title: T('真的删掉（删完自动重启 mem-serve，立刻失效）'),
                  onClick: doDelTok,
                }, T('保存')) : null,
                h('span', { style: { width: 1, height: 16, background: LINE } }),
                h('span', { style: { marginLeft: 'auto', fontSize: 12, opacity: 0.7 } }, selRows.length
                  ? T('给选中的 ') + selRows.length + T(' 行')
                  : T('给全部')),
                ACL_BITS.map((b, i2) => h('button', {
                  key: b.key,
                  style: S.btn2,
                  title: T(b.label) + T('（点一下：全部给 / 全部收回）'),

                  onClick: () => bulkBit(i2),
                  disabled: !curTok || (b.key === 'add' && selRows.length > 0 && selRows.every((k) => k.startsWith('F:'))),
                }, T(b.ch))),
                h('button', {
                  style: { ...S.btn2, opacity: 0.85 },
                  onClick: () => setSelRows(selRows.length ? [] : rowKeys()),
                }, selRows.length ? T('清空选择') : T('全选')),
              ),

              selRows.length
                ? h('div', { style: { fontSize: 12, opacity: 0.72, lineHeight: 1.6 } },
                    T('已选 ') + selRows.length + T(' 行（shift 点一行可整段选；shift 点方框 = 整段打这一位）'))
                : null,
              )
            : null,
          cfgTab === 'sync'
            ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
                h('div', { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },
                  h('span', { style: { fontSize: 12, opacity: 0.7 } }, T('服务器')),
                  h('input', {
                    value: remoteUrl, placeholder: 'http://192.168.39.39:8765',
                    onChange: (e) => setRemoteUrl(e.target.value),
                    style: {
                      padding: '4px 8px', borderRadius: 6, border: '1px solid ' + LINE,
                      background: 'transparent', color: 'inherit', font: 'inherit',
                      fontSize: 12, width: 220,
                    },
                  }),
                  h('span', { style: { fontSize: 12, opacity: 0.7 } }, 'token'),
                  h('input', {
                    value: remoteToken, placeholder: T('主服务器给你的 token'),
                    onChange: (e) => setRemoteToken(e.target.value),
                    style: {
                      padding: '4px 8px', borderRadius: 6, border: '1px solid ' + LINE,
                      background: 'transparent', color: 'inherit', font: 'inherit',
                      fontSize: 12, width: 260, fontFamily: MONO,
                    },
                  }),
                  h('button', { style: { ...S.button, fontSize: 12, padding: '3px 12px', opacity: remoteBusy ? 0.6 : 1 },
                    onClick: saveRemote, disabled: remoteBusy },
                    remoteBusy ? T('连接中…') : T('保存并连接')),
                  h('button', { style: { ...S.btn2, opacity: (remoteBusy || !remoteMe) ? 0.45 : 1 },
                    onClick: doSync, disabled: remoteBusy || !remoteMe, title: T('先「保存并连接」拿到权限再同步') },
                    T('立即同步')),

                  h('button', {
                    style: { ...S.btn2, marginLeft: 'auto', opacity: 0.85 },
                    title: T('清掉服务器和 token，回到纯本地（已经同步下来的文件都留着，不会删）'),
                    onClick: disconnectRemote, disabled: remoteBusy,
                  }, T('断开同步')),
                ),

                remoteMe
                  ? h('div', { style: { fontSize: 12, opacity: 0.75 } },
                      T('对方给你：') + (remoteMe.name || '?')
                      + (remoteMe.writeTo ? T('（写落点 ') + remoteMe.writeTo + '/）' : ''))
                  : null,

                remoteDiff
                  ? h('div', { style: { fontSize: 12, lineHeight: 1.6, opacity: 0.9 } },
                      T('跟对方比：') + remoteDiff.same + T(' 篇一样 · ') +
                      remoteDiff.onlyRemote + T(' 篇你这里没有 · ') +
                      remoteDiff.differ + T(' 篇内容不同') +

                      (typeof remoteDiff.onlyLocal === 'number'
                        ? T(' · ') + remoteDiff.onlyLocal + T(' 篇你这边多出来') : ''),
                      remoteDiff.sampleRemote && remoteDiff.sampleRemote.length
                        ? h('div', { style: { fontSize: 11.5, opacity: 0.6, fontFamily: MONO, marginTop: 2 } },
                            T('缺的：') + remoteDiff.sampleRemote.slice(0, 3).join(' · ') +
                            (remoteDiff.sampleRemote.length > 3 ? ' …' : ''))
                        : null,
                      remoteDiff.sampleDiffer && remoteDiff.sampleDiffer.length
                        ? h('div', { style: { fontSize: 11.5, opacity: 0.6, fontFamily: MONO, marginTop: 2 } },
                            T('不同的：') + remoteDiff.sampleDiffer.slice(0, 3).join(' · ') +
                            (remoteDiff.sampleDiffer.length > 3 ? ' …' : ''))
                        : null)
                  : null,
                h('div', { style: { fontSize: 11.5, opacity: 0.6, lineHeight: 1.5 } },
                  T('权限全由主服务器给，这边只能看不能改；同步是整份覆盖本地对应层级。')),
                syncMsg ? h('div', { style: { fontSize: 12, opacity: 0.85 } }, syncMsg) : null,
              )
            : null,
        ) : null,
        h('div', { style: S.row },
          h('span', { style: S.stat }, T('文件 '), stats && stats.ok ? stats.files : '—'),
          h('span', { style: S.stat }, T('片段 '), stats && stats.ok ? stats.chunks : '—'),
          stats && stats.ok
            ? zoneButtons
            : h('span', { style: { fontSize: 12, opacity: 0.55 } },
                stats ? stats.error : T('加载中…')),
          h('button', { style: { ...S.button, fontSize: 12, opacity: 0.7 }, onClick: resetAll, title: T('恢复初始条件：清空搜索与筛选、层回到「全部层」、只看热区') }, T('刷新')),
          h('button', {
            style: { ...S.button, fontSize: 12, opacity: (cfgTab === 'share') ? 1 : 0.7, padding: '4px 9px' },
            title: T('设置：哪个 profile 能读 / 增 / 改 / 删哪些记忆'),
            onClick: () => { setCfgTab(cfgTab ? '' : 'menu'); setSelRows([]); if (!cfgTab) loadAcl() },
          }, '⚙'),
        ),
        h('div', { style: S.row },
          h('input', {
            style: S.input, value: q, placeholder: T('搜记忆…（\"词\" = 必含）'),
            onChange: (e) => setQ(e.target.value),
            onKeyDown: (e) => { if (e.key === 'Enter') doSearch() },
          }),
          h('button', {
            style: {
              ...S.button, fontSize: 11.5, padding: '2px 9px', flex: '0 0 auto',
              opacity: (filtersOpen || nF) ? 1 : 0.7,
            },
            title: nF ? fBits.join(' · ') : T('高级搜索：层 / 分类 / 重要 / tag / 创建·修改时间'),
            onClick: () => setFiltersOpen(!filtersOpen),
          }, (filtersOpen ? '▾' : '▸') + T(' 筛选') + (nF ? ' · ' + nF : '')),
          hits === null ? null : h('span', {
            style: { fontSize: 11.5, flex: '0 0 auto', opacity: 0.75, whiteSpace: 'nowrap' },
            title: T('左树已同步只显示命中的文件；点「刷新」恢复初始条件'),
          }, hits.length
            ? T('命中 ') + hits.length + T(' 段') + ' · ' + (hitPathSet ? hitPathSet.size : 0) + T(' 个文件')
              + (total > hits.length ? T(' / 共 ') + total + T(' 段') : '')
            : T('无命中')),
          h('button', { style: S.button, onClick: () => doSearch(), disabled: busy }, busy ? '…' : T('检索')),
        ),
        filtersOpen ? h(React.Fragment, null,
        h('div', { style: { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', fontSize: 11.5 } },
          h(MultiSelect, {
            allLabel: T('全部层'),
            value: fLayers,
            onChange: setFLayers,
            options: (stats && stats.ok && stats.layers ? stats.layers.map((l) => l.layer) : DEFAULT_LAYERS),
          }),
          h(MultiSelect, {
            allLabel: T('全部分类'), value: fCats, onChange: setFCats,
            options: catOptions, onOpen: loadFacets,
          }),
          h('div', { key: 'grp-i', style: DT_GRP },
            h('span', { style: DT_LABEL }, T('重要')),
            h('input', {
              type: 'number', min: 0, max: 100, step: 5, placeholder: '0',
              title: T('重要性下限（0~100）· ≥85 核心 · 65~84 已验证 · <65 草稿'),
              style: { ...DT_IN, width: 58 },
              value: fMinImp, onChange: (e) => setFMinImp(e.target.value),
            }),
            h('span', { style: { opacity: 0.4 } }, '~'),
            h('input', {
              type: 'number', min: 0, max: 100, step: 5, placeholder: '100',
              title: T('重要性上限（0~100）'),
              style: { ...DT_IN, width: 58 },
              value: fMaxImp, onChange: (e) => setFMaxImp(e.target.value),
            })),
          h('div', {
            style: {
              position: 'relative', display: 'inline-flex', flexWrap: 'wrap', gap: 4, alignItems: 'center',
              minWidth: 200, minHeight: 24, padding: '1px 5px', borderRadius: 6,
              border: '1px solid ' + LINE,
            },
          },

            tagSeq.map((it, i) => {
              const isLone = !it.tag
              const isParen = isLone && (it.sym === '(' || it.sym === ')')
              const sel = tagCursor === i
              const tone = isParen ? ['rgba(148,163,184,.26)', 'rgba(148,163,184,.55)']
                : it.sym === '-' ? ['rgba(239,68,68,.20)', 'rgba(239,68,68,.5)']
                  : it.sym === '|' ? ['rgba(245,158,11,.20)', 'rgba(245,158,11,.55)']
                    : ['rgba(99,102,241,.22)', 'rgba(99,102,241,.5)']
              const drop = (e) => {
                e.stopPropagation()
                const next = tagSeq.filter((_y, j) => j !== i)
                setTagSeq(next); setTagCursor(-1)
                if (next.length) { loadFacets({ tagSeq: next }); setTagOpen(true) }
              }
              const flip = (e) => {
                e.stopPropagation()
                setTagCursor(i)
                setTagSeq(tagSeq.map((y, j) => {
                  if (j !== i) return y
                  if (y.sym === '(') return { sym: ')', tag: y.tag || '' }
                  if (y.sym === ')') return { sym: '(', tag: y.tag || '' }
                  return { sym: y.sym === '+' ? '|' : y.sym === '|' ? '-' : '+', tag: y.tag || '' }
                }))
              }
              return h('span', {
                key: 'tg' + i,
                onClick: (e) => { e.stopPropagation(); setTagCursor(i) },
                title: isParen ? T('括号 · 点一下切 ( ↔ )') : T('点符号切换 与 → 或 → 非 · × 删除'),
                style: {
                  display: 'inline-flex', alignItems: 'center', gap: 2,
                  padding: '0 2px 0 3px', borderRadius: 4, fontSize: 11, whiteSpace: 'nowrap',
                  cursor: 'pointer', background: tone[0], border: '1px solid ' + tone[1],
                  outline: sel ? '2px solid rgba(99,102,241,.8)' : 'none',
                },
              },
                h('span', {
                  onClick: flip,
                  style: { fontWeight: 700, padding: '0 2px 0 1px', cursor: 'pointer' },
                }, it.sym),
                isLone ? null : h('span', { style: { cursor: 'pointer' } }, it.tag),
                h('span', {
                  onClick: drop,
                  title: T('删除这个条件'),
                  style: { cursor: 'pointer', opacity: 0.7, fontWeight: 700, padding: '0 2px' },
                }, '×'))
            }),
            h('input', {
              value: tagInput,
              placeholder: tagSeq.length ? '' : T('tag 筛选…（输入 / 看符号）'),
              style: {
                flex: '1 1 70px', minWidth: 60, border: 'none', outline: 'none', background: 'transparent',
                color: 'inherit', fontSize: 11.5, padding: '2px 2px',
              },
              onChange: (e) => {
                const v = e.target.value
                if (v.startsWith('/') && !tagInput.startsWith('/')) loadAllTags()
                setTagInput(v)
                setTagOpen(true)
              },

              onFocus: () => { setTagOpen(true); loadFacets() },
              onBlur: () => setTimeout(() => setTagOpen(false), 160),
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  const raw = tagInput.trim()

                  if (raw === '(' || raw === ')') {
                    setTagSeq([...tagSeq, { sym: raw }])
                    setTagInput(''); return
                  }
                  const t = raw.startsWith('/') ? raw.slice(1) : raw
                  if (t) {
                    const next = appendTag(tagSeq, t)
                    setTagSeq(next)

                    loadFacets({ tagSeq: next })
                    setTagInput('')
                    setTagOpen(true)
                    return
                  }
                  setTagInput(''); setTagOpen(false)
                  if (!raw) doSearch()
                } else if (e.key === 'Backspace' && !tagInput) {
                  if (tagSeq.length) {
                    e.preventDefault()

                    const i = tagCursor >= 0 ? tagCursor : tagSeq.length - 1
                    const next = tagSeq.filter((_y, j) => j !== i)
                    setTagSeq(next)
                    setTagCursor(-1)
                    if (next.length) { loadFacets({ tagSeq: next }); setTagOpen(true) }
                  }
                } else if (e.key === 'Escape') setTagOpen(false)
              },
            }),

            tagSeq.length ? h('span', {
              key: '__tagclear',
              title: T('清空全部 tag 条件'),
              onClick: () => { setTagSeq([]); setTagCursor(-1); setTagInput('') },
              style: { marginLeft: 'auto', cursor: 'pointer', opacity: 0.55, fontWeight: 700, padding: '0 3px', fontSize: 12 },
            }, '×') : null,

            tagBad ? h('span', {
              key: '__tagbad',
              title: T('条件不成立时不会发出检索'),
              style: { color: '#d9534f', fontSize: 11, whiteSpace: 'nowrap' },
            }, '⚠ ' + tagBad) : null,
            tagOpen ? (() => {
              const slash = tagInput.startsWith('/')
              const qText = slash ? tagInput.slice(1) : tagInput

              const pool = slash ? allTags : tagOptions
              const all = pool.filter((o) => (!qText || o.tag.includes(qText)))

              if (!slash && !all.length) return null
              const CAP = 200
              const cand = all.length > CAP ? all.slice(0, CAP) : all
              const rest = all.length - cand.length
              const symRow = slash ? h('div', {
                key: '__syms',
                style: {
                  display: 'flex', gap: 4, padding: '5px 7px', flexWrap: 'wrap',
                  borderBottom: '1px solid ' + LINE, marginBottom: 2,
                },
              }, ['+', '|', '-', '(', ')'].map((sym) => h('span', {
                key: 'sym' + sym,
                onMouseDown: (e) => e.preventDefault(),
                title: sym === '(' || sym === ')' ? T('插入一个括号') : T('下一个 tag 用这个符号'),
                onClick: () => {

                  const next = [...tagSeq, { sym }]
                  setTagSeq(next)
                  setTagInput('')
                  loadFacets({ tagSeq: next })
                  setTagOpen(true)
                },
                style: {
                  padding: '1px 7px', borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  background: sym === '-' ? 'rgba(239,68,68,.2)'
                    : sym === '|' ? 'rgba(245,158,11,.2)'
                      : sym === '+' ? 'rgba(99,102,241,.22)' : 'rgba(148,163,184,.26)',
                  border: '1px solid ' + LINE,
                },
              }, sym))) : null
              return h('div', {
                style: {
                  position: 'absolute', top: '100%', left: 0, marginTop: 3, zIndex: 60,
                  minWidth: 170, maxHeight: 210, overflow: 'auto', borderRadius: 6,
                  border: '1px solid ' + LINE, background: 'Canvas', color: 'CanvasText',
                  boxShadow: '0 8px 24px rgba(0,0,0,.18)',
                },
              }, symRow, cand.map((o) => h('div', {
                key: o.tag,
                style: {
                  display: 'flex', justifyContent: 'space-between', gap: 10, padding: '4px 9px',
                  fontSize: 11.5, cursor: 'pointer',
                },
                onMouseDown: (e) => e.preventDefault(),
                onClick: () => {
                  const next = appendTag(tagSeq, o.tag)
                  setTagSeq(next)
                  setTagInput('')

                  loadFacets({ tagSeq: next }); setTagOpen(true)
                },
              },
                h('span', null, o.tag),
                h('span', {
                  style: { opacity: 0.45 },
                  title: (o.hot || o.cold) ? T('热 ') + (o.hot || 0) + T(' · 冷 ') + (o.cold || 0) : '',
                }, o.n))),
              rest > 0 ? h('div', {
                key: '__rest',
                style: { padding: '4px 9px', fontSize: 11, opacity: 0.5, borderTop: '1px solid ' + LINE },
              }, T('还有 ') + rest + T(' 个 · 继续输入缩小范围')) : null)
            })() : null,
          ),
          ),
          h('div', { key: 'filter-row2', style: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', fontSize: 11.5 } },
          h('div', { key: 'grp-c', style: DT_GRP },
            h('span', { style: DT_LABEL }, T('创建')),
            h('input', {
              type: dtType.cA, step: 1, style: DT_IN,
              value: fCAfter, onChange: (e) => setFCAfter(e.target.value),
              onFocus: (e) => {
                if (dtType.cA === 'text') {
                  setDtType((s) => ({ ...s, cA: 'datetime-local' }))
                  setTimeout(() => { try { e.target.showPicker?.() } catch {} }, 0)
                }
              },
              onBlur: () => { if (!fCAfter) setDtType((s) => ({ ...s, cA: 'text' })) },
            }),
            h('span', { style: { opacity: 0.4 } }, '~'),
            h('input', {
              type: dtType.cB, step: 1, style: DT_IN,
              value: fCBefore, onChange: (e) => setFCBefore(e.target.value),
              onFocus: (e) => {
                if (dtType.cB === 'text') {
                  setDtType((s) => ({ ...s, cB: 'datetime-local' }))
                  setTimeout(() => { try { e.target.showPicker?.() } catch {} }, 0)
                }
              },
              onBlur: () => { if (!fCBefore) setDtType((s) => ({ ...s, cB: 'text' })) },
            })),
          h('div', { key: 'grp-m', style: DT_GRP },
            h('span', { style: DT_LABEL }, T('修改')),
            h('input', {
              type: dtType.mA, step: 1, style: DT_IN,
              value: fMAfter, onChange: (e) => setFMAfter(e.target.value),
              onFocus: (e) => {
                if (dtType.mA === 'text') {
                  setDtType((s) => ({ ...s, mA: 'datetime-local' }))
                  setTimeout(() => { try { e.target.showPicker?.() } catch {} }, 0)
                }
              },
              onBlur: () => { if (!fMAfter) setDtType((s) => ({ ...s, mA: 'text' })) },
            }),
            h('span', { style: { opacity: 0.4 } }, '~'),
            h('input', {
              type: dtType.mB, step: 1, style: DT_IN,
              value: fMBefore, onChange: (e) => setFMBefore(e.target.value),
              onFocus: (e) => {
                if (dtType.mB === 'text') {
                  setDtType((s) => ({ ...s, mB: 'datetime-local' }))
                  setTimeout(() => { try { e.target.showPicker?.() } catch {} }, 0)
                }
              },
              onBlur: () => { if (!fMBefore) setDtType((s) => ({ ...s, mB: 'text' })) },
            })),
          (fLayers.length || fCats.length || tagSeq.length || fMinImp || fMaxImp || fCAfter || fCBefore || fMAfter || fMBefore)
            ? h('button', {
                style: { ...S.button, fontSize: 11.5, padding: '2px 8px' },
                onClick: () => {
                  setFLayers([]); setFCats([]); setTagSeq([]); setTagCursor(-1); setTagInput(''); setFMinImp(''); setFMaxImp('')
                  setFCAfter(''); setFCBefore(''); setFMAfter(''); setFMBefore('')
                },
              }, T('清空筛选'))
            : null,
        )
        ) : null,
        hits === null ? null : (hits.length === 0
          ? h('div', { style: { fontSize: 12, opacity: 0.6 } }, T('没有命中。换个说法，或用同义词/英文名/报错原文再试。'))
          : h('div', { style: { display: 'flex', flexDirection: 'column', gap: 6, maxHeight: full ? 220 : 'none', minHeight: 0 } },
            h('div', { style: { fontSize: 11.5, opacity: 0.5, display: 'flex', gap: 10, alignItems: 'center', flex: '0 0 auto' } },
              hitsCollapsed
                ? h('button', {
                    style: { ...S.button, fontSize: 11.5, padding: '2px 10px', marginLeft: 'auto' },
                    onClick: () => setHitsCollapsed(false),
                  }, T('← 返回结果列表（') + hits.length + T(' 条') + (total > hits.length ? T(' · 共 ') + total : '') + '）')
                : h(React.Fragment, null,
                    h('span', null, T('命中 ') + hits.length + T(' 段') + ' · ' + (hitPathSet ? hitPathSet.size : 0) + T(' 个文件')
                      + (total > hits.length ? T('（共 ') + total + T(' 段，只显示前 ') + hits.length + '）' : '')
                      + T(' · 点一下直接在下面打开')),
                    coldHits > 0
                      ? h('span', {
                          title: T('技能迭代历史（archived/skills/）住在冷区，默认不搜。')
                            + T('点「冷区记忆」按钮或在这里加 --all 才会进结果。'),
                          style: { opacity: 0.75, marginLeft: 10, whiteSpace: 'nowrap' },
                        }, T('💡 冷区还有 ') + coldHits + T(' 段'))
                      : null,
                    total > hits.length
                      ? h('button', {
                          style: { ...S.button, fontSize: 11.5, padding: '2px 8px' },
                          onClick: () => doSearch(99999), disabled: busy,
                        }, T('显示全部 ') + total + T(' 条'))
                      : null,
                    h('button', {
                      style: { ...S.button, fontSize: 11.5, padding: '2px 8px', opacity: 0.95, marginLeft: 'auto' },
                      onClick: () => setHitsCollapsed(true),
                      title: T('收起结果栏（结果不丢，点「返回结果列表」还在）'),
                    }, T('✕ 收起')))),
            hitsCollapsed ? null : h('div', { style: { display: 'flex', flexDirection: 'column', gap: 6, overflow: 'auto', minHeight: 0 } },
              hits.map((x, i) => h('div', {
                key: i, style: S.hit,
                onClick: () => (x.docLevel ? openFile(x.full || x.path) : openItem(x.full || x.path, x.index || 0)),
                onMouseEnter: (e) => { e.currentTarget.style.background = HILITE },
                onMouseLeave: (e) => { e.currentTarget.style.background = 'transparent' },
              },
                h('div', { style: { opacity: 0.6, marginBottom: 3, display: 'flex', gap: 8, alignItems: 'baseline' } },
                  h('span', null, '[' + x.layer + '] ' + x.path + (x.docLevel ? '' : ':' + x.line)),
                  x.docLevel
                    ? h('span', { style: { opacity: 0.5, whiteSpace: 'nowrap' } }, x.segCount > 1 ? T('命中 ') + x.segCount + T(' 段') : '')
                    : null,
                  (typeof x.imp === 'number' ? h('span', { style: { opacity: 0.55, whiteSpace: 'nowrap' } }, T('重要 ') + Math.round(x.imp)) : null),
                  ZonePill(x.zone || 'hot', 'zn')),
                x.segTitle ? h('div', { style: { fontWeight: 600, marginBottom: 2 } }, x.segTitle) : null,
                h('div', null, x.snippet),
                x.desc ? h('div', { style: { opacity: 0.5, fontSize: 11, marginTop: 3, lineHeight: 1.5 } }, T('简介：') + String(x.desc).slice(0, 180)) : null,
                h(KwRow, { kws: x.kws })))))),
        notice ? h('div', { style: { fontSize: 12, padding: '6px 10px', borderRadius: 8, background: HILITE } }, notice) : null,

        h('div', { style: { display: 'flex', gap: 8, alignItems: 'stretch', flex: full ? 1 : undefined, minHeight: 0 } },
          treeOpen ? h('div', {
            style: { ...S.treeBox, flex: '0 0 ' + treeBoxW + 'px', width: treeBoxW },
          }, treeRows) : null,

          h('div', {
            key: 'split',
            title: T('按住左右拖：调左栏宽度 · 双击恢复默认'),
            onMouseDown: (e) => {
              e.preventDefault()
              const x0 = e.clientX, w0 = treeBoxW
              const move = (ev) => {
                const w = Math.max(200, Math.min(treeMaxW, w0 + (ev.clientX - x0)))
                setTreeW(w)
                try { localStorage.setItem('mx-tree-w', String(w)) } catch (err) {}
              }
              const up = () => {
                window.removeEventListener('mousemove', move)
                window.removeEventListener('mouseup', up)
                document.body.style.cursor = ''
                document.body.style.userSelect = ''
              }
              document.body.style.cursor = 'col-resize'
              document.body.style.userSelect = 'none'
              window.addEventListener('mousemove', move)
              window.addEventListener('mouseup', up)
            },
            onDoubleClick: () => { setTreeW(0); try { localStorage.removeItem('mx-tree-w') } catch (err) {} },
            style: {
              flex: '0 0 9px', alignSelf: 'stretch', cursor: 'col-resize', position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            },
          },
            h('div', {
              title: treeOpen ? T('收起左侧栏') : T('展开左侧栏'),
              onClick: (e) => {
                e.stopPropagation()
                const next = !treeOpen
                setTreeOpen(next)
                try { localStorage.setItem('mx-tree-open', next ? '1' : '0') } catch (err) {}
              },
              onMouseDown: (e) => e.stopPropagation(),
              onDoubleClick: (e) => e.stopPropagation(),
              style: {
                width: 9, height: 44, lineHeight: '42px', textAlign: 'center',
                fontSize: 11, borderRadius: 5, border: '1px solid ' + LINE,
                background: 'Canvas', color: 'inherit', cursor: 'pointer',
                opacity: 0.6, userSelect: 'none',
              },
            }, treeOpen ? '‹' : '›')),
          h('div', { style: S.editorBox }, editor),

        ),
      )
    }

    const MemoryPage = (props) => h(MemoryPanel, { ...props, full: true })

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        if (ctx.locale && typeof ctx.locale.register === 'function') {
          ctx.effect(() => ctx.locale.register('memoryXfy', { zh: UI_ZH, en: UI_EN }))
          T = ctx.locale.bind('memoryXfy')
        }
        const stopSidebar = ctx.slots.inject('main', () => ctx.slots.inject('sidebar.panellist', () => {
          const offMain = ctx.slots.register({
            name: 'main',
            key: 'memory-xfy',
          }, MemoryPage)
          const offIcon = ctx.slots.register({
            name: 'sidebar.panellist',
            id: 'memory-xfy',
            order: 60,
            label: () => T('记忆'),
          }, MemoryIcon)
          return () => {
            if (typeof offMain === 'function') offMain()
            if (typeof offIcon === 'function') offIcon()
          }
        }))
        const stopSettings = ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section', id: 'memory-xfy', order: 60,
          label: () => T('记忆'),
        }, MemoryPanel))
        return () => {
          if (typeof stopSidebar === 'function') stopSidebar()
          if (typeof stopSettings === 'function') stopSettings()
        }
      },
    }
  },
})
