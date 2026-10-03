# 批次 5 · L1：审查页回到组件与简单组合

## 编码前的语义与关系决定

用户 2026-10-03 裁决优先：审查对象是组件的真实状态和简单组合，不是业务能力。根 `design.md` 的「先定语义，再定关系，最后定表达」、状态归属与删去检验决定以下边界。

- 按钮、输入与选择控件按现有 API 展示变体、尺寸、可交互状态；聚焦由真实键盘产生，不给多个样本强加聚焦样式。
- 布局与排版只比较排列、间距角色及文字档；删除交接、设备与告警数据。
- Card 保留四种表面对照与页面底/白面对照，内容缩成短标题和一行文字；移除虚构读数与内嵌表单。
- Tooltip 是补充文本；复制的成功或失败来自真实剪贴板调用，不在页面覆盖权限或编排拒绝故事。
- Toast 用五个直接入口展示 waiting / in-progress / unknown / failed / success，不生成 CSV、不调用假服务。
- Dialog 只组合一个 Field + Input 和关闭入口；AlertDialog 只展示确认、取消与其真实本地选择，不执行虚构删除。
- 每段说明最多一句，只保留不能直接看出的事实；标签与状态反馈不当作说明文案。

现有五档控件值、文字与间距 token 都是既定选择或预设；本任务不推导新数值，不改 Card 默认阴影，不新增浮层层级。

## 范围与阅读记录

开工 HEAD `275d730`；工作区已有大量并行修改，保留其原状，只写本任务指定的六个段落、`DesignReview.tsx`、`FocusFallback.tsx`、根 `design.md` 指定单元格和本报告。`50-selectors.tsx` 不编辑。任务专属范围优先于通用约束中「不改 DesignReview」的默认规定。

已读 `AGENTS.md`、根 `design.md`、`STANDARDS.md`、基础层与逐值裁决，以及 layout / action / display / form / overlay 族文档和批次 2 A/B/C 报告。组件文件仅通过 TypeScript AST 提取导出名、props 类型与函数参数签名；未读取函数体、className 或样式表达式。另读安装版 Base UI Toast 公开类型及审查入口/消费页面。未读取仓库外归档组件源码或 provenance freeze。

未改测试断言、内置 locale、来源记录或生成副本；无需要删除的来源条目。未运行 build、gen:catalog 或 gen:index（组件文件未增删），无提交、checkout 或 stash。

## 实施与验证

### 每段删除与保留

| 文件 | 删除 | 保留 / 新的直接展示 |
|---|---|---|
| `DesignReview.tsx` | 设备/网关/区域读数、报表状态标签、仓库名称表单、同步故事、候选值历史与冗长设计自述 | Button 三变体 × 五尺寸、图标五尺寸、三变体 × 六状态、三档 danger 与后果关联、按钮组；Input 五尺寸及静态/无效/禁用/只读、搜索清空与密码切换；Card 静态/链接；Popover 普通/裸/禁用入口与关闭 |
| `FocusFallback.tsx` | 设备名称与在线台数、已归档的 dashboard 去向 | 三档按钮、禁用按钮、Field + Input 的编辑/只读/禁用、Card 链接；只有一句系统事实 |
| `05-layout-type.tsx` | 夜班交接、恢复连接故事、虚构作者/时间、告警数字与数据表、展开/已阅流程 | Stack / Inline、普通 / compact、现有间距角色、标题/正文档、中英标点、numeric 样本 |
| `10-card-surface.tsx` | 三设备列表、温湿度/亮度/电量等读数、网关改名表单及保存状态 | 四种线/面/阴影候选，每种分别在页面底和白面上呈现，共八个样本；短标题加一行文字；原有真实 computed 对比事实计算 |
| `20-tooltip.tsx` | 项目文档/格式/对齐故事、外部业务 demo imports、在页面篡改 clipboard 的模拟拒绝入口 | 四方位、悬停/键盘入口、禁用触发者、真实复制与成功/失败反馈；反馈之外无说明段落 |
| `30-toast.tsx` | 报表导出链、CSV/Blob/下载、假服务、归档副本与名称确认删除流程 | waiting / in-progress / unknown / failed / success 五个直接入口，同一通知 ID 原位替换，显式关闭 |
| `40-form-controls.tsx` | 网关通知设置、渠道业务数组、联系人校验、交接保存、虚构已保存结果 | Textarea 四状态 × 五尺寸、Checkbox 六状态 × 五尺寸、Switch 五状态 × 五尺寸；Field + 控件、正常/禁用 Fieldset 简单组合 |
| `60-dialogs.tsx` | 设备改名/删除网关故事及其业务 demo imports | Dialog 一个 Field + Input 与关闭；禁用入口；AlertDialog 确认/取消及真实本地选择反馈 |

`50-selectors.tsx` 与开工 SHA-256 相同。本任务未编辑它；其中剩余业务场景由 L4 后续处理，不能把本批写成整个审查页已全部清除业务内容。

根 `design.md` 的当前字节与开工副本按指定单元格替换后的字节完全相同：其余内容一字不动，行数仍为 297。包内与官网生成指南未同步，交由主 agent 重建。

### 页面修复与视觉变化

- 审查页由叙事场景改为状态矩阵，移除旧顶部 sticky/z-index；页面保留桌面宽度，按现有关系间距组织。
- 首轮截图发现按钮状态矩阵容量不足，把六状态横排改为状态分行、变体分列，保留全部状态而让名称完整呈现。
- 首轮观察到 `/favicon.ico` 404。最初用 React metadata 引用已有 `/favicon.svg`，复用会话中未再出现；新的浏览器上下文揭示 React 提交晚于 load 的时序仍会请求默认图标。最终在 `DesignReview.tsx` 模块初始化时、React 提交前声明现有图标（已有图标时不覆盖），两个页面仍用 metadata 提供各自标题。新上下文及清缓存后的完整主页/回退页跳转验收错误为 0，没有过滤控制台错误或拦截网络。
- FocusFallback 的 Card 链接改为完整跳转：入口只在首次渲染判断 hash，单改 hash 会继续留在回退页，因此使用 `/review.html?view=components#card-surface` 重新挂载主审查页；不修改 `review-main.tsx`。目检还发现该 anchor 在普通文档流中为 inline，补 `block` 后形成完整 832px 盒子。链接返回表面对照已复测。
- Card 默认实现、阴影及四个表面候选本身均未改变。未以截图差异自动判断某一候选更好，也未新增截图基线。

### 实际验证

| 检查 | 结果 | 观察 |
|---|---|---|
| `pnpm --filter docs typecheck` 的 `pages/review/` / `review-main` | PASS | 最终日志中的范围内错误为 0 |
| 同一命令的全 docs | FAIL | 125 个范围外 TS diagnostics；未修改范围外文件处理它们，未把全 docs 标为通过 |
| 浅/深主题、1280 × 900 主审查页 | PASS | 两主题 `scrollWidth=1280`；各段宽/scrollWidth 均为 832px；最终 pageerror=0、console.error=0；六段截图和主页面截图已目检 |
| Card 对照结构 | PASS | 八个样本；每个仅短标题和一行文字；表面对照内 form 数量为 0 |
| 键盘与输入焦点 | PASS | 真实 Tab 后等待 600ms：Button / Input 均 focus-visible；Input 两主题边框前后均 1px，只改色，boxShadow=none；没有强加焦点样式 |
| 输入与表单控件 | PASS | 可编辑值保留；搜索清空；密码显示切换；Textarea 编辑/readonly/disabled；Checkbox 切换与 readonly 不变；Switch 切换 |
| Popover / Tooltip | PASS | Popover 显式关闭；Tooltip 悬停、真实 Tab 显示及 Esc；没有复制其基础样式 |
| 复制两种反馈 | PASS | 成功时读取实际剪贴板为「青野 UI」；通过该任务 browserContext 的真实 Chromium 权限拒绝得到失败反馈；恢复权限后结束，不在页面模拟拒绝、不覆盖 navigator.clipboard |
| Toast 五状态及关闭 | PASS | 五入口逐一显示对应实际 Toast，显式关闭后节点退出；未测试超时推进 |
| Dialog / AlertDialog | PASS | 打开、编辑、Esc、显式关闭；Dialog Esc 后焦点回到触发者；AlertDialog 确认与取消均关闭并显示对应本地选择 |
| FocusFallback 浅/深 1280、Card 链接 | PASS | 无水平溢出；Card 最终 display=block、单个矩形、宽 832px；链接能返回主审查页；最终独立复测的 pageerror=0、console.error=0 |
| 强制颜色焦点可见性 | PASS | 浅深主题中三按钮依次由真实 Tab 聚焦，可见系统 outline；仅此可见性检查，不代表完整外扩或对比矩阵 |
| AST 范围检查 | PASS | 八个页面/段落无业务 content imports，无报表/巡检/网关/CSV/工单/假服务/权限拒绝的 UI 字符串；不是用整份 TSX 正则决定合规 |
| `git diff --check` 的指定范围 | PASS | 无空白错误 |

采集脚本曾因清空按钮名称不准确、关闭按钮选择器未限定、Popover 退出未等待而失败，修正实际 locator 与 600ms 过渡等待后重跑。第一次权限探针未指定 browserContextId，未触发拒绝；定位实际任务上下文后拒绝分支通过。没有修改或放宽既有测试断言。

### 浏览器所有权与证据

复用既有 Vite PID 59950（PPID 59927、127.0.0.1:5180）；未启动或停止它。启动前 CLI list 无浏览器，进程检查无其他任务会话。单一命名会话 `qy-batch5-l1`、一张活动页面，主题与所有状态串行。

- 第一段运行：CLI 服务 PID 85835（PPID 1），Chrome PID 85836（PPID 85835），profile `/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/playwright_chromiumdev_profile-z1HWts`。通过原连接 close，按 PID/profile 核对服务、浏览器及子进程残留为 0。
- 目检后补 `block`，在第一段确认退出且 list 无浏览器后重新打开同一会话作最后的定向复测：CLI PID 8660（PPID 1）、Chrome PID 8664（PPID 8660），profile `/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/playwright_chromiumdev_profile-0ghvCv`。通过该连接 close，按 profile 核对服务、浏览器及子进程残留为 0；CLI list 无浏览器，共享 Vite 59950 仍在运行。记录见 `cleanup.json`。

证据位于 `/tmp/qy-batch5-l1/`：`browser.json`、`fallback-final.json`、`static-verification.json`、`docs-typecheck-final.log`、`task-diff.patch`，以及 `light-*` / `dark-*` 六段与主页面截图、`focus-fallback-*` 普通/强制颜色截图。未向范围外仓库目录写入截图或临时入口。

### 交接边界

- UNVERIFIED：quiet 在强制颜色下实测 `outline-width=2px`、`outline-offset=-1px`，存在 1px 外扩风险。当前回退由库 `styles.css` 所有，本批未改库或伪造页面覆盖；交给主 agent/基础层任务核实修复，不能声称本批证明所有强制颜色焦点均无外扩。
- UNVERIFIED：多浮层同时打开时的遮挡与层级、Card 默认阴影用途；本批只验证单一浮层交互，没有新增 z-index token 或继承 z-50。
- NOT_RUN：移动端、实体设备、全部品牌/RTL/放大/对比矩阵、Toast deadline 推进、全库测试、build/生成/发布。桌面范围遵守用户裁决。

本批指定页面修改及桌面验收完成。全 docs 类型检查、选择器段落去业务和库侧 quiet 强制颜色回退问题按上述边界交接，不作为本批已修事项。
