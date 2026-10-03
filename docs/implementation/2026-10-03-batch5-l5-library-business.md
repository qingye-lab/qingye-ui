# Batch 5 L5：库源码、测试与内置文案的业务内容清理

## 语义与关系决定（代码修改前记录）

依据根 `design.md`「系统分层」「名称与状态」「明确修改归属」：库拥有组件语义、基础交互、状态表达与可访问关联；业务对象、数据、流程和外部事实属于消费项目。清理只改变情境和文字，不改变组件行为、样式或 API。

- 状态名称、错误、后果关联、焦点归位、受控更新、表单语义、Promise 结算和通知生命周期仍是组件契约。以中性标签和值直接断言，不删除真实交互顺序。
- 业务对象、人物、地点、版本故事和业务数据改为「名称」「说明」「保存」「删除」「选项」等；用同一中性文字同步更新夹具、查询与精确断言。
- 必要的多状态序列只表达组件自己的开关、焦点、值保留、更新、关闭和异步状态，不编排业务能力。
- 内置未知结果说明不能假定消费项目存在「任务页面」。改为不依赖页面或业务流程的结果核对提示，中英文同步；保留状态事实、原消息和核对提醒。
- 数值、token、样式、尺寸、Card 阴影、浮层层级均不在本批改动范围；不增加设计取值。

## 开工基线与保存边界

2026-10-03；实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`；HEAD `275d730`，前两条 `b93bfe4`、`9d51f7a`。工作区已有大量修改、删除与新文件，保留全部既有工作。本批临时原文与日志保存于 `/tmp/qy-batch5-l5/`，以本轮开工文件为对照，不以 HEAD 旧实现为来源。

`pnpm --filter @qingye/ui typecheck`：PASS。

`pnpm --filter @qingye/ui test`：FAIL，31 文件 / 465 测试，464 PASS / 1 FAIL。修改前唯一失败：`select.test.tsx > selected and highlighted are separate simultaneous facts`，Delta 缺少 `data-highlighted`（115 行）；其余用例通过。最终结果见下方已运行检查。

## 实际写入与来源边界

本批只写 18 份 `packages/ui/test/*.test.tsx`、两份 locale 和本报告。当前 20 份组件源码经注释/JSDoc、文案、默认字符串检查，没有业务对象或故事，因此不为凑改动修改源码。本批首次 SHA-256 核对时 20 份组件源码均与开工一致；随后并发任务修改了 select.tsx 和 tooltip.tsx，本批未覆盖这些新改动，最终 18 份其余源码仍与开工逐字一致。`radio-group.tsx`、`select.tsx` 只检查文案，未编辑，均无待转交主 agent 的业务命中。

已读当前 AGENTS.md、根 design.md、STANDARDS.md、foundation、value-adjudication、action/form/display/overlay/selector/layout 六份相关族文档与 Batch 2 A/B/C 报告；核对 Batch 3/4 重写报告确定当前源码归属。当前组件检查仅提取注释和字符串，未以组件样式推导设计值。没有读取仓库外归档组件、归档测试、provenance-freeze 或 Git 历史组件实现；本批没有需要重写的上游派生组件，也没有来源条目需删。

没有改 hooks、来源记录、tokens、样式、生成副本、dist、文档演示或审查页面。L1–L4 负责页面，L5 未指定审查段落文件；本批无需新建页面。未新增/删除组件，无需 gen:index；未运行 build、gen:catalog、提交、checkout、stash、reset 或 clean。

### 逐文件处置

| 修改文件 | 执行用例数 | 内容处置 |
|---|---|---|
| `packages/ui/test/alert-dialog.test.tsx` | 11 | 删除网关、版本、历史数据故事；保留不可逆后果文本、模态/焦点/嵌套/透传契约。 |
| `packages/ui/test/button.test.tsx` | 50 | 保存/删除/菜单替代设备和报表；中性非空后果替代地点、版本和记录数量；保留全部触发阻断与后果关联断言。 |
| `packages/ui/test/card.test.tsx` | 4 | 名称、说明与普通链接替代生产环境和构建对象；源码和默认阴影未动。 |
| `packages/ui/test/checkbox.test.tsx` | 11 | 选项、说明、只读替代值班通知和渠道；data-example/caller 仍精确断言自定义属性透传。 |
| `packages/ui/test/dialog.test.tsx` | 14 | 名称、原值/新值、甲/乙替代设备、城市和版本故事；保留弹层开关、草稿与返回。 |
| `packages/ui/test/field.test.tsx` | 19 | 说明、名称、编号、选项替代工单通知、设备铭牌、离线通知、人员/部门数据。 |
| `packages/ui/test/fieldset.test.tsx` | 5 | 说明、名称、编号、选项替代开户/发票资料；保留真实 legend、组禁用和透传。 |
| `packages/ui/test/input.test.tsx` | 27 | 名称与 value 替代单号/QY-12；原生/非原生只读、值提交和移除只读仍逐项断言。 |
| `packages/ui/test/layout.test.tsx` | 9 | 内容、导航和中性长文本替代交接/账单；关系 token、语义顺序和长内容容量不变。 |
| `packages/ui/test/popover.test.tsx` | 13 | 标题与中性阿拉伯文名称替代项目备注；开关、焦点、受控值与 Portal 断言不变。 |
| `packages/ui/test/radio-group.test.tsx` | 12 | alpha/beta/gamma、选项与说明替代巡检频率；校验按钮流程改为调用方直接传 invalid。 |
| `packages/ui/test/select.test.tsx` | 22 | items/choice、空值/零值/分组替代分区和负责人；Alpha/Beta/Charlie/Delta 保留 typeahead 探针；并发新增 3 个命名优先级用例全部保留，仅换标签。 |
| `packages/ui/test/separator.test.tsx` | 4 | 分节替代账户与通知；语义/装饰/方向和 ref 断言不变。 |
| `packages/ui/test/switch.test.tsx` | 10 | 启用、说明、已启用/已关闭替代告警、未连接设备；即时受控事实和禁用/只读仍被断言。 |
| `packages/ui/test/textarea.test.tsx` | 15 | 名称、说明、备注替代值班交接；自定义属性值改 caller；编辑/保留/错误关联不变。 |
| `packages/ui/test/toast.test.tsx` | 55 | 名称、说明、处理状态与内容替代设备、工单、人物、固件和报表；直接驱动 manager、Promise 和计时器。 |
| `packages/ui/test/tooltip.test.tsx` | 16 | 保存、说明、地址/编号替代报表下载和项目故事；禁用原因在场、描述合并和延迟断言不变。 |
| `packages/ui/test/typography.test.tsx` | 12 | 标题、内容、说明与中性长文本替代夜班、人物与网关；层级、角色和换行条件不变。 |

### Locale 中英同步

| 键 | 中文（前→后） | 英文（前→后） | 保留契约 |
|---|---|---|---|
| toastResultUnknownDescription | 请在任务页面核对结果。 → 请核对结果。 | Check the result on the task page. → Check the result. | 未知事实、原文保留与核对提醒仍在；消除对消费项目导航/页面的假定。键、类型、Provider 合并与所有其他消息逐字不变。 |

Button 注释中的「当前对象、版本与变更」是调用方后果关联的通用契约，未含虚构版本故事；Switch 的「立即生效」以及等待、未知、失败、焦点等说明均为组件自身语义，保留。泛用地址、密码、邮件格式和文件错误用于对应输入语义，不编排业务流程。

### 测试结构的唯一改动

`radio-group.test.tsx` 的 `controlled changes can retain a real draft when the application supplies an error`：删去虚构的设备规则和“点击校验”按钮；Fixture 接受 `invalid`，选中之后由 `rerender(<Fixture invalid />)` 直接提供事实。原来的“仍选中”与 `aria-invalid="true"` 两条断言原样保留；新增更新前“已选中”与“没有 aria-invalid=true”两条精确断言。控件选择仍更新调用方持有的值，没有静态写死期望。

Dialog/Popover 的开关后重入、嵌套返回、触发者移除，Button 的状态恢复、Toast 的截止时间与 Promise 结算是组件生命周期契约，保留这些必要序列；不添加页面、假服务、下载或业务操作链。Toast 测试直接调用 manager，Promise 由测试显式 resolve/reject，只断言通知的内容、身份、状态、计时与焦点。

### 长文本覆盖没有缩短

中性中文保留括号、顿号、冒号/句号等真实标点及重复段落；英文仍是一整串无空格字符串。`.repeat()` 的次数不变，以下为实际字符容量，不以更短标签替代长文本探针：

| 文件 | 前/后 | 各重复片段的实际字符数 |
|---|---|---|
| layout | 前 | 230, 300 |
| layout | 后 | 370, 588 |
| typography | 前 | 280, 400 |
| typography | 后 | 370, 490 |

## 原契约逐条保留证据

使用 TypeScript AST 对本轮开工快照和当前文件的每条 test 注册、参数化表与完整 expect/expectTypeOf 调用进行核对。开工的 241 个 test 声明全部保留（包含未改用例）；其中 154 个声明直接涉及标签/夹具修改。并发新增 3 个 Select test 后当前为 244 个，新增不是 L5 的覆盖贡献。原 896 个静态断言调用全部保留；L5 增加 2 个，另有并发任务新增的 3 个 Select 断言，当前为 901 个；这不是运行时断言次数，循环/参数化执行仍由 Vitest 验证。

16 个测试文件整份 AST 与开工原文施加明确中性替换后的 AST 一致；Select 去掉并发新增的 3 个 test 声明后整份 AST 同样一致，新增的 3 个完整 test 则另外与它们加入时的快照核对；Radio 文件仅有上面已列的直接 invalid 夹具改动。没有把精确查询改成模糊查询，没有改 matcher、否定条件、阈值、定时器、角色、样式期望、参数化行数或增加 skip/todo。原断言完整文本、替换表与逐条 AST 结果分别留在 `/tmp/qy-batch5-l5/{contract-audit.json,replacements.json,contract-table.md}`；以下每个用例均列出前后静态断言数和核对结果。

### alert-dialog.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| a named alertdialog declares modal and focuses its panel rather than the first danger button | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| backdrop press does not dismiss or report a decision | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| %s closes without running the danger action and returns focus | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Tab loops inside the alertdialog while background controls are excluded | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| initialFocus can explicitly choose the protective action | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| controlled state retains application authority over close requests | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| defaultOpen can be closed with an explicit choice | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a removed trigger returns to the meaningful parent | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| nested alert decision keeps the parent modal open and restores the child trigger | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| safe default focus preserves forwarded callback-ref cleanup and the caller render | 9→9 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### button.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| the public action contract separates emphasis, consequence, geometry, and caller facts | 11→11 | PASS：用例本身不改；原断言 AST 完全一致 |
| a %s button stays reachable without duplicate activation | 7→7 | PASS：用例本身不改；原断言 AST 完全一致 |
| a waiting Menu trigger blocks the mousedown that opens its composed popup and recovers | 9→9 | PASS：用例本身不改；原断言 AST 完全一致 |
| a waiting Menu trigger blocks %s opening and restores it after waiting | 5→5 | PASS：用例本身不改；原断言 AST 完全一致 |
| waiting also protects popup activation when Button renders the MenuTrigger | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| waiting blocks primary press handlers and forwards them again after waiting | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| waiting forwards non-activation keys and secondary presses while keeping Tab navigation | 5→5 | PASS：用例本身不改；原断言 AST 完全一致 |
| a disabled button leaves the tab order with waiting=%s | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| a %s non-native anchor preserves focus and blocks activation until recovery | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| the caller owns every result transition and confirmed failure permits its recovery action | 8→8 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| an icon action presents %s without losing its name or icon shape | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| status descriptions use the active locale and preserve caller descriptions | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| unknown also protects composed popup triggers and has an explicit caller-controlled recovery | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| unknown blocks auxiliary anchor activation while secondary pointer inspection remains possible | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| unknown guards render-target capture handlers before they can activate (callback=%s) | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a danger action fails explicitly when the visible consequence is absent or blank | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| danger tone and action emphasis are independent within the same visible protection | 7→7 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| native attributes, refs, caller aria facts, and derived slots reach the actual control | 12→12 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| renders a link with button semantics when nativeButton is false | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| %s exposes its current variant | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| bordered %s consumes a real border and its matching padding | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| a danger action accepts a nonempty DOM description mounted after the button | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a danger action accepts the description on its actual render target | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a danger action rejects a %s DOM description in development | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a status description alone does not explain a danger action's consequence | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| danger validation runs after mounting, not during server rendering | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| an unprotected danger action does not throw in production | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a %s button mounts when the runtime process global is absent | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| mount-time validation preserves a caller's ref and its React cleanup | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| the registry editor template compiles against current source props and rejects the removed loading prop | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |

### card.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| Card bounds the supplied object without generating content structure | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| native attributes, style, event handlers and the DOM ref survive render composition | 9→9 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| the object boundary can be a native link without an extra wrapper | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| composition inherits context and explicit concentric rounding does not replace control identity | 9→9 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### checkbox.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| Field label activates checkbox and description/error ids reach the control | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| wrapping native label remains an accessible activation target | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| required, unchecked and supplied error text never infer invalid | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| indeterminate exposes mixed and switches to the caller's all-selected fact | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| uncontrolled Space toggles both ways and callbacks carry the checked fact | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| controlled value only changes when the application updates it | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| change cancellation keeps an uncontrolled value | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| disabled is skipped; readonly stays keyboard reachable and cannot toggle or call back | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Tab order follows actual textarea, checkbox, switch, action order | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Field disabled is honored by the checkbox primitive | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| refs, native-button render, consumer styles and explicit ARIA survive composition | 8→8 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### dialog.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| keyboard opens a named modal, enters the first control and Escape returns to the trigger | 7→7 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| modal Tab and Shift+Tab cycle inside the same dialog | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a content-only dialog still receives initial focus | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| an explicit initialFocus ref overrides DOM control order | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| Dialog backdrop dismisses and an explicit finalFocus restores its trigger | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| controlled open reports a close request without overriding application state | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| defaultOpen is an uncontrolled initial state and explicit close changes it | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| a removed trigger returns to the application-provided meaningful parent | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| nested Dialog Escape closes only the top layer and returns through both triggers | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| application-owned drafts survive closing and re-entering | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| popup and structural parts preserve refs, render, class functions, styles and handlers | 13→13 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| default close label uses locale, while an explicit choice wins | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| shared triggers retain the active payload and return to the actual opener | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a local portal container retains density, language and direction | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### field.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| a label names and focuses its registered Input | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| description and supplied error both describe the same control | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| supplied errors do not infer invalid; only the caller toggles it and the draft survives | 5→5 | PASS：用例本身不改；原断言 AST 完全一致 |
| native validity and blur do not infer invalid or invent an error | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| native invalid events keep browser constraints and caller handlers without inferring invalid | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| an empty supplied error list removes its association without removing help | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| errors ignore empty entries, deduplicate, list distinct messages, and prefer children | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| a single supplied error has no unnecessary list | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| empty or whitespace-only content creates no error node or description association | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| standalone errors forward native props, refs, and render without a Field | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| explicit match=false hides a supplied error | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| horizontal native checkbox keeps label and description associations | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| disabled Field propagates to the control; readOnly retains form data | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| FieldTitle is a fact heading and never automatically labels a control | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| FieldItem scopes each repeated control's label | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| FieldValidity remains an unwrapped primitive outlet | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| layout parts preserve slots, refs, render and caller class precedence | 8→8 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| FieldSeparator without text reuses one semantic separator | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| FieldControl can register an explicitly native Input without a second registration | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### fieldset.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| a real legend gives the group its accessible name, separate from field names | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| disabling the group disables both registered and native controls | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a common question uses the label variant while each native option keeps its name | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| render can replace the legend tag while retaining its naming association | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| refs, state functions, native attributes and caller classes reach their owners | 7→7 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### input.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| readonly is named, focusable, immutable and submitted (native=%s) | 7→7 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| unstyled readonly retains native semantics and explicit consumer hook | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| disabled does not submit while readonly still submits and translates its state | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| native props, style, className, render, refs and events belong to the real input (native=%s) | 11→11 | PASS：用例本身不改；原断言 AST 完全一致 |
| React ref callback cleanup is preserved | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| state class/style callbacks compose with the Field or native outlet (native=%s) | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| FieldControl may register the native outlet once, retaining label and field error association | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| invalid is an external fact; false stays false and a format-looking value is not inferred invalid | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| empty and numeric zero are different native values; Input adds no unknown or N/A sentinel | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| native reset restores an uncontrolled value and its clear adjunct (native=%s) | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| native form reset synchronizes render, class and style state (default=%s) | 11→11 | PASS：用例本身不改；原断言 AST 完全一致 |
| a canceled native reset retains the value and render state | 5→5 | PASS：用例本身不改；原断言 AST 完全一致 |
| native reset preserves a caller-owned controlled value and emits no change | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| the native reset observer preserves caller ref cleanup | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| %s consumes the matching foundation size and independent control text profile | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| numeric size preserves its native meaning while using the standard visual profile | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| render-supplied readonly is a real attribute and visible fact | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a clearable plain input uses its own locale action name | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |

### layout.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| Stack and Inline consume the %s relationship token | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| defaults group content vertically and wrap adjacent actions without assigning ARIA roles | 5→5 | PASS：用例本身不改；原断言 AST 完全一致 |
| render makes a named section and forwards native attributes, styles, ref and both event handlers | 11→11 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Inline supports function render, explicit no-wrap and alignment without losing children | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| long bilingual content is retained and flex children can shrink instead of forcing overflow | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### popover.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| keyboard opens a named non-modal popup and Escape returns to its trigger | 6→6 | PASS：用例本身不改；原断言 AST 完全一致 |
| Space opens the popup and its explicit close action returns keyboard focus | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| Tab can leave a non-modal popup for the next background control | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| clicking outside dismisses without moving focus away from the clicked control | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| a %s popup keeps its native close path and focus return | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| controlled open reports requests while the application retains the final decision | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| a shared handle returns focus to the trigger that opened the active content | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| finalFocus can return to a meaningful parent when the trigger has been removed | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| closing and reopening preserves an application-owned draft | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| all styleable native parts preserve refs, state class functions, styles and composition | 16→16 | PASS：用例本身不改；原断言 AST 完全一致 |
| an explicit portal container preserves a local density, direction and language context | 7→7 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| PopoverContent is the current popup composition | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |

### radio-group.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| no initial value leaves every visible candidate unchecked and submits no default | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| uncontrolled arrows skip disabled options, select the focused candidate and loop | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Home/End leave Radio's value in place; its primitive uses arrows for group navigation | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Space selects and Tab leaves the group through one stop | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| controlled selection waits for the application's value and can return to null | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| controlled changes can retain a real draft when the application supplies an error | 2→4 | PASS：原 2 条精确断言保留；直接传 invalid，并新增选中与未无效 2 条断言 |
| Field names the group, local labels activate items, help and error describe every radio | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| required, blur and supplied error text do not infer invalid | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| empty string and zero are selected values with distinct form serialization | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| disabled groups and items ignore selection and do not contribute a form value | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| readonly and canceled changes preserve the chosen form value | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| render, refs, state classes, local style and explicit ARIA survive composition | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### select.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| no initial selection displays the localized placeholder, never the first value | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| localization and the caller's explicit placeholder use the same Value part | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| empty value labels work in records and groups, with truthful render and style state | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| custom Value formatting keeps the actual empty string and has priority over the label mapping | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| controlled open waits for the application, while defaultOpen is an actual initial expansion | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| arrows and Home/End move highlight; disabled items cannot be chosen and Enter selects an enabled value | 11→11 | PASS：用例本身不改；原断言 AST 完全一致 |
| keyboard typeahead highlights a matching item without changing the value | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| Esc closes and returns to its trigger, preserving the selected value | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| selected and highlighted are separate simultaneous facts | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| controlled values wait for application updates and return to null without inventing defaults | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| uncontrolled values and caller cancellation keep the original choice | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| empty string and zero keep their labels and serialize as distinct real values | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Field label activates the trigger and description/error ids reach that same control | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| required, blur and a supplied error never infer invalid or destroy an existing value | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| application updates receive the chosen value and form submission uses it | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| disabled items ignore clicks, disabled Field prevents opening and is excluded from submission | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| readonly retains form data, remains focusable and cannot open | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| removing candidates during a failed refresh does not silently clear the selected value | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| refs, consumer render/styles/ARIA, explicit Portal container and group semantics survive | 7→7 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| an explicit trigger name takes precedence over the enclosing FieldLabel | 1→1 | PASS：并发任务新增；本批只替换中性标签，完整用例 AST 一致 |
| an explicit labelledby keeps priority even when an aria-label and FieldLabel exist | 1→1 | PASS：并发任务新增；本批只替换中性标签，完整用例 AST 一致 |
| FieldLabel names the trigger when the caller supplies no accessible name | 1→1 | PASS：并发任务新增；本批只替换中性标签，完整用例 AST 一致 |

### separator.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| semantic separators expose direction without entering the tab order | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| decorative separators have presentation role and are hidden from the accessibility tree | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| the same separator can switch between semantic and decorative roles | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| render, native props, refs and caller class functions are preserved | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### switch.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| Field names the switch, activates it and registers both explanation and error | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| wrapping label names and activates the switch | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| an unchecked required switch and error content do not infer invalid | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Space switches an uncontrolled value both ways without changing the accessible name | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| controlled setting changes the current application state immediately | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| controlled value stays caller-owned when a callback does not update it | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| canceling the primitive change preserves the current setting | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| disabled is excluded from Tab and form data; readonly remains immutable and submitted | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| caller ARIA, ref, render and state styles reach the actual switch | 7→7 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Field disabled is honored without changing the active setting | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### textarea.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| Field labels the real textarea and associates explanation and supplied error | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| required and error content do not infer invalid on blur or native invalid events | 5→5 | PASS：用例本身不改；原断言 AST 完全一致 |
| standalone aria-invalid stays caller-owned | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| uncontrolled multiline editing emits real value changes and enforces native maxLength | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| controlled values follow the caller and remain unchanged without an update | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| disabled skips Tab and submission; readonly is focusable, immutable and submitted | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| uncontrolled form reset restores the default without inventing a value callback | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| Field disabled applies real native disabling and does not claim readonly | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| render-supplied readonly is reflected and ref callback cleanup is preserved | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| native properties, typed events, custom render and ref reach the textarea | 8→8 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| %s uses the same named text, bordered padding and narrow geometry | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |

### toast.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| add renders a titled toast and close removes it | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| a title and description both render | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| adding the same id updates in place instead of stacking | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| update replaces the content of an existing toast | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| close(id) dismisses only the named toast | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| the close button is labelled, hidden from AT while collapsed, and reachable by keyboard | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| actionProps renders an action button that runs its handler | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| promise resolves to the success toast | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| promise rejection shows the error toast | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| anchored toasts render beside their trigger | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| the toast region is a labelled landmark | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| overdue loading becomes persistent unknown, preserving recovery until a real result arrives | 12→12 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a completed loading toast is not overwritten by its expired deadline | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| an overdue promise can later settle from unknown to its real result | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a late %s title preserves application context without the unknown description | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a late %s string preserves the application's original title | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| anchored late results clear unknown copy with tooltipStyle=%s | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| tooltip promise shows its %s string result after deadline=%s | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| deadline presentation leaves application fields in the store untouched | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| application-owned unknown messages keep their own presentation | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| anchored loading follows the same unknown deadline | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| loading deadline rejects unsupported timer value %s | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| a real result in the same batch as its deadline wins over unknown | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| %s has a polite atomic status with its object | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| urgency is explicitly selected, not inferred from failure | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| %s remains until dismissed even with timeout=1 | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| hover pauses dismissal and leaving resumes the remaining time | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| focus does not pause the result deadline | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| an arriving toast and its updates do not steal the current input focus | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| promise %s is a real transition on the same notification | 8→8 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| closing a pending promise does not claim cancellation or resurrect on settlement | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| focus pauses a success timer and blur resumes it | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| urgent text stays accessible when the user enters the notification | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| an urgent loading deadline announces uncertainty without mutating application copy | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| an application-confirmed new pending episode gets a fresh deadline | 6→6 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

### tooltip.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| keyboard focus shows supplementary text immediately, associates it, and Escape keeps focus | 7→7 | PASS：用例本身不改；原断言 AST 完全一致 |
| Tab leaves the tooltip for the next control without a focus trap | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| %s disabled stops the hint while the named action remains usable | 4→4 | PASS：用例本身不改；原断言 AST 完全一致 |
| a natively disabled Button is skipped and its reason stays visible | 5→5 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| a directly rendered native disabled control does not open a pointer-only hint | 1→1 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Provider delays first pointer hover and shares instant opening with adjacent triggers | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Trigger can explicitly override Provider pointer delay | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |
| controlled open reports an Escape request without inventing application state | 3→3 | PASS：用例本身不改；原断言 AST 完全一致 |
| shared handle presents the payload of the focused trigger | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Popup preserves native attributes, render, ref, style and state-based class overrides | 8→8 | PASS：用例本身不改；原断言 AST 完全一致 |
| a portal container preserves local language, direction and density | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| TooltipContent retains its public Popup alias | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| open hints preserve existing descriptions through a caller rerender and remove only their own id | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| shared payload descriptions move to the active trigger only | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| React callback ref cleanup is retained for the trigger and popup | 2→2 | PASS：用例本身不改；原断言 AST 完全一致 |

### typography.test.tsx

| 用例（参数化行保持） | 断言数（前→后） | 原契约保留证据 |
|---|---|---|
| h%s keeps its semantic level independently of the title visual step | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| changing the visual step preserves the outline and changing the outline preserves the step | 3→3 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| every canonical text step has a complete class and no invented size | 1→1 | PASS：用例本身不改；原断言 AST 完全一致 |
| body, support and numeric have separate roles; zero and unknown remain distinct | 7→7 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| render controls the actual semantics and preserves native attributes, ref and handlers | 8→8 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| Text function render and caller style/class overrides preserve the chosen semantic role | 4→4 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |
| long Chinese punctuation and unbroken English retain content with wrapping capacity | 2→2 | PASS：仅中性标签/值替换；完整断言 AST 对照一致 |

## 已运行检查与观测

| 检查 | 状态 | 实际结果 |
|---|---|---|
| 开工库 typecheck | PASS | tsc --noEmit，退出 0。 |
| 开工全量 test | FAIL（既有） | 31 文件 / 465 测试；464 PASS / 1 FAIL，Select 的 Delta 高亮断言。清理前已出现；未改该断言或交互步骤。 |
| 第一轮清理后的全量 test | FAIL（本批已修） | 464/465；Textarea 名称与说明同为“说明”，精确 getByText 重复。把名称改为“名称”，保留原查询方式与焦点断言；Select 此轮已 PASS。 |
| 最终库 typecheck | PASS | pnpm --filter @qingye/ui typecheck，退出 0；baseline-typecheck.log / final-typecheck.log。 |
| 最终全量 test | PASS | pnpm --filter @qingye/ui test，31 文件 / 468 测试全部通过，退出 0；开工 465 个没有减少，增加 3 个来自并发 Select 任务；文件数 31→31。 |
| 原断言 / 测试表 / 整份改动边界 AST 对照 | PASS | 896→901，原 896 条全部保留；L5 增 2 条，另 3 条来自并发任务；开工 241 个 test 声明与参数化表不减；两份 locale 仅各改变一个提示字符串。 |
| 本批组件源码保存边界 | PASS | 首次 20 份与开工一致；最终 18 份仍一致，select/tooltip 的后续并发改动保留。本批没有写组件源码，不将其他任务的 API/行为变化算作 L5。 |
| 要求的业务关键词 grep | PASS | 原始命令无输出，grep 退出 1 表示无命中；见下一节。 |
| 扩展词扫描与人工情境检查 | PASS | TSX/locale 无交接、值班、发票、固件、人员/地区故事；generic 内容与必要状态/可访问说明保留。 |
| git diff --check（本批文件） | PASS | 退出 0；报告另核对无行尾空白、缺失末行换行或表格错列。 |
| 浏览器、computed、截图与移动适配 | NOT_RUN | 本批没有组件视觉或行为变更，不启动浏览器；没有产生本任务浏览器/服务进程，无需清理其他任务会话。 |
| build、生成产物、打包消费者与发布 | NOT_RUN | 用户要求不运行 build、不写生成物；由主任务汇总。 |

最终 test 的尾部原始输出：

```text
 Test Files  31 passed (31)
      Tests  468 passed (468)
   Start at  22:23:18
   Duration  6.59s
```

Select 基线高亮失败在后续清理后的全量运行通过，但本批未修其时序，也不声称已消除偶发风险。对比扫描测试仍报告继承/运行时级联上下文 UNVERIFIED（初轮每主题 131 个，最终计数以日志为准）；本轮 test PASS 不代表这些组合已获浏览器验收。

## 要求的 grep 原始结果与剩余命中

```text
$ grep -rnE '网关|设备|报表|巡检|杭州|华东|支出|工单' packages/ui/src packages/ui/test
（stdout 为空）
exit: 1
```

剩余命中：0；无需逐条豁免。保存的 `/tmp/qy-batch5-l5/business-grep.log` 是 0 字节原始输出；括号内说明是本报告标注，并非命令输出。

本批证据与原文快照留在 `/tmp/qy-batch5-l5/`，报告不把历史 Batch 2/3/4 的测试数、浏览器状态或生产结果当作当前通过依据。
