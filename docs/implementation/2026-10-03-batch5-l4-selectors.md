# Batch 5 L4：RadioGroup / Select 演示去业务场景

## 语义与关系（实现前决定）

设计依据仅为根 `design.md` 的「先定语义，再定关系，最后定表达」、「Examples：组件的状态与简单组合」及名称、状态归属与删去检验。演示对象是单选值与候选本身；不包含提交、应用方案、设备权限、服务响应或结果摘要。

- RadioGroup：可见的互斥候选；保留未选、已选、无效、只读、禁用、单项禁用与五档尺寸。FieldTitle 命名组，FieldItem + FieldLabel 命名单项，错误留在 Field。
- Select：可收起的单值候选；保留同样的基本状态、空字符串与数字 0、五档尺寸和语义分组。FieldLabel 命名触发器，FieldError 关联无效状态。
- 无效样本的值只由本地选择改变；选择后按实际值移除必填错误，不引入提交步骤。焦点与展开由真实键盘交互验证，不用静态样式冒充。
- 每个组件收敛为两个 demo。Select 分组并入状态示例；审查段落复用这四个 demo，避免复制第二套状态或文案。
- 五列尺寸、三列状态和既有间距角色是本次桌面展示的**选择**；间距与控件几何仍消费既有**预设**。不新增设计值、token、z-index 或阴影，不把布局选择写成推导。

## 基线与逐 demo 处置

2026-10-03；工作区实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`，HEAD `275d730`（前两条 `b93bfe4`、`9d51f7a`）。工作区已有大量未提交改动，目标四个 demo 为已有未跟踪文件；仅编辑用户指定的内容目录、`50-selectors.tsx` 和本报告，保留其他并行工作。

| 原 demo | 判定 | 处置 / 新文件 | 理由 |
|---|---|---|---|
| RadioGroup `01-frequency.tsx` | 业务故事与选择→应用→结果流程 | 重写为 `01-sizes.tsx` | 删除巡检、提交按钮、应用结果和业务说明，改为五档 Radio + Field 组合。 |
| RadioGroup `02-access.tsx` | 设备支持与消防规范场景 | 重写为 `02-states.tsx` | 保留只读、单项禁用意图并补齐基本状态，删除权限/设备理由。 |
| Select `01-area.tsx` | 假区域数据与选择→应用→结果流程 | 重写并合并为 `02-states.tsx` | 删除区域数据、提交/清除业务动作与结果，改为基本状态、空值/0 与分组。 |
| Select `02-value-facts.tsx` | 区域/设备场景混合尺寸和值语义 | 重写并拆分为 `01-sizes.tsx` 与 `02-states.tsx` | 五档尺寸独立并置；空字符串与 0 移入状态，去掉重复 Input 和设备名称。 |

四个原业务文件随改名删除；无原样保留项，无额外重复 demo。最终 RadioGroup 两个、Select 两个，编号均连续 `01`、`02`。未删除任何组件、测试或来源记录。

## 阅读边界

已读当前 AGENTS.md、design.md、STANDARDS.md、基础层、逐值裁决、选择器/表单族文档及上一批 A/B/C 报告。读取目标 meta、demo、审查段落、ComponentMeta/DemoMeta 类型与 docs 的源码解析配置。

组件 API 通过 TypeScript AST 提取导出名、类型声明和函数签名。首次函数头截取的 trivia 偏移使输出多出少量函数开头片段；没有将这些片段用于设计值或复制实现。未读取归档组件源码、provenance-freeze、上游文件或归档测试；未读取当前组件的完整函数体、className 或样式。元数据以已重写的当前公共 API 为准。

## 元数据与审查段落

`ComponentMeta` 没有 `demos` 字段，示例标题来自各文件导出的 `meta`。四份标题已同步为「尺寸」「状态」「状态与分组」并附英文标题；两份组件元数据保留当前 API，仅收短 notes / decisions，明确 Field 命名、错误关联、未选与空值的区别及两种单选承载。

`50-selectors.tsx` 从内容目录导入四个真实 demo，默认导出保持不变，原巡检表单与应用结果删除。呈现变化是五档尺寸并置、状态矩阵及字体分组；没有独立业务页、保存结果或重复的第二套演示。`DesignReview.tsx`、`review-main.tsx` 未改。

| 最终 demo | 覆盖 |
|---|---|
| RadioGroup `01-sizes.tsx` | xs / sm / md / lg / xl；FieldTitle + RadioGroup、FieldItem + Radio + FieldLabel。 |
| RadioGroup `02-states.tsx` | 未选、已选、无效及解除、只读、整组禁用、单项禁用。 |
| Select `01-sizes.tsx` | xs / sm / md / lg / xl；FieldLabel + Select。 |
| Select `02-states.tsx` | 六种基本状态及无效解除；空字符串、数字 0；SelectGroup + SelectGroupLabel。 |

RadioGroup 与 Select 当前各只有一种基础外观，不虚构 variant。展开、选取和焦点保持真实交互；库内尺寸与焦点机制未改。

## 验证

改动前：`pnpm --filter docs typecheck` 为 FAIL，125 条全仓错误，两个内容目录及 `50-selectors.tsx` 均 0 条。`pnpm --filter @qingye/ui test` 为 FAIL，464 PASS / 1 FAIL（31 文件）；失败为 Button registry 编译用例超过既有 5000ms，发生在本次编辑前。日志目录 `/tmp/qingye-batch5-l4.KatV1J/`。

| 检查 | 结果 | 证据与边界 |
|---|---|---|
| `pnpm --filter docs typecheck` | 全仓 FAIL；L4 范围 PASS | 修改后仍有 125 条错误；RadioGroup 目录 0、Select 目录 0、`50-selectors.tsx` 0。没有新增 L4 错误，也没有将全仓失败过滤成成功。见 `after-docs-typecheck.log`。 |
| `pnpm --filter @qingye/ui exec vitest run test/radio-group.test.tsx test/select.test.tsx` | PASS | 2 文件、34 用例全部通过。见 `selector-tests.log`。 |
| `pnpm --filter @qingye/ui test` 最终运行 | FAIL | 31 文件：30 PASS / 1 FAIL；468 用例：467 PASS / 1 FAIL。失败为 Select `selected and highlighted are separate simultaneous facts`，End 后的 `data-highlighted` 断言，见 `final-ui-test.log`。 |
| 失败与本次改动的关系 | PASS（范围归因） | 上述失败 fixture 直接导入库 Select / Field，不读取任何 demo、meta 或审查页；同文件定向运行通过。它属于本批没有修改的库交互/测试时序边界；本批不改源码或放宽断言。 |
| 真实审查页桌面状态与交互 | PASS | 1280×1200、1100×1200，light / dark 串行；最终 32 项均通过（30 项首轮通过，2 项隔离复核通过）。四个真实 demo 由审查段落直接消费，见 `browser.json`、`browser-followup.json`。 |
| 几何与截图目检 | PASS | 四种桌面组合的段落宽 832px，无段落水平溢出，控件/标签越界数 0；四张 `review-{light,dark}-{1280,1100}.png` 均已目检。 |
| 键盘焦点 | PASS（8 个 xs 样本） | 每种主题/桌面宽度真实 Tab 进入 Radio 和 Select；等 600ms 后均 `:focus-visible=true`，尺寸不变、1px 边框不加粗、只变色，box-shadow / outline 均 none。未声称覆盖所有尺寸或强制颜色。 |
| 选择与限制 | PASS | Radio 未选保持未选，方向键改变值；只读保留值、整组/单项真实禁用。Select 只读不展开、禁用项不能改变值；Enter→End→Enter 选取「右对齐」，Escape 保留原值。 |
| 错误与分组 | PASS | Radio / Select 错误都有 aria-describedby 关联；选取后错误与 aria-invalid 解除。空字符串显示名称、0 显示 0；「无衬线」「等宽」均成为具名 group。 |
| 本批浏览器 pageerror / console.error | PASS | 成功运行均 0；现有 React DevTools 与全页密码字段无 form 提示不是本批错误。 |
| TypeScript AST 检查 | PASS（静态） | 四份演示只导入 React 与库 Field / Radio / Select；无 form、Button、fetch、定时器或模拟服务调用。与逐文件人工审查一起确认去业务范围，不用整份 TSX 正则判定规则。 |
| 本范围 `git diff --check` | PASS | 空输出、exit 0；新文件也已检查文件内容和编号。 |
| 生成副本、build、打包与发布 | NOT_RUN | 按用户边界由主任务统一执行；未改 catalog / ai / registry / dist / 包内 design.md。 |
| 移动页面适配、390px 截图 | NOT_RUN | 按本次桌面裁决不执行；未改组件既有窄屏接线。 |
| Select 与其他层级浮层的遮挡 | UNVERIFIED | 本轮只有正常选择列表；未设置 z-index，不据此宣称跨浮层层级已定。 |

完整测试期间其他任务继续修改库及测试：中间一次运行是 467 PASS / 1 FAIL，失败为新加入的显式触发器名称优先级用例；随库更新，随后两个选择器的定向 34 用例全部通过。最终全仓失败转为上述高亮时序断言。保留前、中、最终日志，不用中间失败代替最终结果，也不宣称全套测试通过。

浏览器临时检查中，首次脚本找错 Radio 的 data-slot，修正为真实 role 后继续；另一次因前一弹层退场尚未结束，出现两个同名 option。完整检查的分组与键盘选取两个即时采样为 FAIL；隔离复核在关闭、展开和高亮变化后各等 600ms，两个检查均 PASS。仅调整 `/tmp` 检查脚本，未改组件或测试断言，原始结果保留在日志中。

## 资源与交接

复用既有 docs server PID 59950（PPID 59927），未重启或关闭它。本批浏览器会话为 `qy-batch5-l4`，始终一张活动页，未并行启动浏览器：

- 第一段 daemon 21502、Chrome 21506（PPID 21502），profile `playwright_chromiumdev_profile-sHX4Kz`。CLI close 后检查 daemon / browser / 记录的子进程及 profile 匹配进程均退出。
- 两项未决检查需要隔离复核，在第一段确认退出后，以相同 CLI 机制恢复同名会话：daemon 28494、Chrome 28499（PPID 28494），profile `playwright_chromiumdev_profile-WrBvhr`。复核后 CLI close；进程检查为 0，CLI list 为 `(no browsers)`，既有 docs server 保留。

证据均在 `/tmp/qingye-batch5-l4.KatV1J/`。没有 git commit / checkout / stash，没有改组件源码、测试、locale、来源清单或生成产物；本任务没有待删除的组件来源条目。没有修改任何既有测试断言，因此不存在断言放宽或理由补录。
