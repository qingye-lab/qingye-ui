# 第五批 L2：组件演示去业务场景（上半）

## 编辑前的语义与关系决定

设计依据仅为根 `design.md`。用户本批裁决将演示限定为组件状态与简单组合，优先于指南中对完整产品情境的示例建议。本批任务是辨认组件 API 与状态，不执行业务能力。

- Button 展示三档、五档尺寸、图标、状态、链接和简单按钮组。等待、失败与未知直接由示例属性声明，不用计时器、下载或假服务产生结果；danger 仍有在场且可关联的后果。
- Card 展示内容边界、链接、分节与密度。不提供财务数据、部署故事、通知设置或嵌套项目；不修改默认阴影。
- Checkbox 展示选中、未选中、部分选中、禁用、只读、无效与五档尺寸。部分选中由两个真实本地选项计算；不编排提交或开通服务。
- Field、Fieldset、Input 保留名称、说明、错误、分组与输入的关系。原生格式校验与字数计数属于简单组合；不显示审核、权限、提交结果或业务数据集。重复文件输入与纯业务事实删除。
- Dialog 只保留打开、关闭、焦点返回和一项输入的组合；AlertDialog 保留明确选择与可见后果，不设置对象版本、名称确认、删除结果或消失触发者流程。
- Stack、Inline 展示纵向、横向、关系间隔及对齐；MotionProvider 只显示真实输入方式与即时变化，不提供交接或草稿流程。

示例的个数、默认文字及布局宽度属于本次**选择/预设**，不称为理念推导。仅复用既有角色，不新增 token、尺寸或 z-index；不新增窄屏适配。

## 范围与阅读记录

开工实路径为 `/Volumes/SUNSANG 1/Codex/qingye-ui`，HEAD `275d730`；前两提交 `b93bfe4`、`9d51f7a`。工作区已有大量并行修改，保留现有工作，只写指定 10 个内容目录的 `meta.ts` / `demos/` 及本报告。

已读当前 `AGENTS.md`、`design.md`、`STANDARDS.md`、基础层、逐值裁决，相关 action / form / display / layout / overlay / selector 族文档与 batch2 A/B/C 报告；检查当前演示、元数据、`ComponentMeta` / `DemoMeta` 类型与测试引用。当前这些内容目录已属于前批重写后的消费示例。

不读取两个禁止目录的组件源码或冻结文件；没有直接读取组件实现，API 由当前元数据及 TypeScript 消费检查核对。没有修改组件、测试、审查页、locale 或来源文件。应删来源条目：无（本批仅改消费演示，不产生组件来源处置）。

## 逐 demo 处置

原有 **47** 个 demo：**保留 10、重写 26、删除 11**；另补充 1 个 Checkbox 尺寸演示，最终 **37** 个。保留项只在需要时改文件编号，正文与开工快照逐字相同。

表内路径以 `apps/docs/src/content/` 为根；“最终文件”在组件目录的 `demos/` 下。

| 组件 | 原 demo | 处置 | 最终文件 | 理由 |
|---|---|---|---|---|
| alert-dialog | 01-delete-gateway | 重写 | 01-confirmation | 删除版本更新、名称确认、删除记录及触发者消失流程；仅确认清空本地输入，返回不会清空。 |
| button | 01-variants | 重写 | 01-variants | 移除网关版本与历史记录故事；同处展示 solid/bordered/quiet × neutral/danger，保留可见后果关联。 |
| button | 02-sizes | 保留 | 02-sizes | 五档尺寸是静态控件，没有数据或流程。 |
| button | 03-icon-sizes | 保留 | 03-icon-sizes | 五档图标形态及可访问名称，没有业务动作处理。 |
| button | 04-with-icon | 保留 | 04-with-icon | 图标与标签组合；没有模拟下载、计时器或结果。 |
| button | 05-link | 重写 | 05-link | 移除虚构帮助地址、网关记录与展开故事；使用现有文档和设计指南的原生链接。 |
| button | 06-loading | 重写 | 06-states | 统一文字与图标的五种状态及禁用；属性直接声明状态，无下载或状态推进。 |
| button | 07-loading-custom | 删除 | — | 图标状态并入 06-states，避免重复。 |
| button | 08-disabled | 删除 | — | 移除审核限制故事；禁用在 06-states 中覆盖。 |
| button | 09-form-actions | 删除 | — | 草稿保存、恢复、丢弃是流程；简单按钮组已在 01-variants 中出现。 |
| button | 10-card-button | 删除 | — | 虚构地区、设备数量和当前业务范围；对 Button 没有新增覆盖。 |
| button | 11-boundary | 保留 | 07-boundary | 单个同底色入口的边界组合，无请求或流程；仅重编号，未改焦点/样式值。 |
| card | 01-basic | 重写 | 01-basic | 移除生产环境、版本和域名；保留 article、标题和文本。 |
| card | 02-action | 重写 | 02-action | 移除生产环境关注状态；展示 Card render 为真实文档链接。 |
| card | 03-divided | 重写 | 03-divided | 移除名称保存、草稿比较及结果提示；保留静态分节与简单动作组。 |
| card | 04-context | 重写 | 04-context | 移除报告周期和访问量；同一短内容展示 default/compact 继承。 |
| card | 05-stats | 删除 | — | 虚构收入、退款与结算数据；不属于 Card 的组件状态。 |
| card | 06-settings | 删除 | — | 虚构用户与通知服务，且重复卡内控件组合。 |
| card | 07-table | 删除 | — | 虚构账单数据集与业务比较；不需要为 Card 编排表格场景。 |
| card | 08-nested | 删除 | — | 工作区/项目故事与额外嵌套样式，无新增基础 Card 状态覆盖。 |
| checkbox | 01-channels | 重写 | 01-selection | 移除渠道提交及保存副本；两个本地选项计算全选和 mixed。 |
| checkbox | 02-access | 重写 | 02-states | 移除组织权限与短信开通故事；展示普通、选中、只读、禁用和无效。 |
| checkbox | 新增 | 新增 | 03-sizes | 补齐 xs/sm/md/lg/xl，以同档复选框与标签直接比较。 |
| dialog | 01-device-name | 重写 | 01-field | 移除保存、放弃和草稿提示；只组合标题、说明、字段与关闭入口。 |
| field | 01-default | 重写 | 01-default | 移除评论/提及故事；标签、长度说明与 Input 共处。 |
| field | 02-validation | 重写 | 02-validation | 保留原生 validity 的就地校验；移除工单通知说明，不产生提交结果。 |
| field | 03-horizontal | 重写 | 03-horizontal | 移除设备离线、短信服务和定时报告；用 Checkbox + FieldContent 展示横向关联。 |
| field | 04-group | 重写 | 04-group | 移除收货/备用联系人结构；保留 FieldGroup、Fieldset 与带文字分隔。 |
| field | 05-title | 重写 | 05-title | 移除配送范围、通讯录与出行事实；标题显式命名 Input，并展示无控件的短事实。 |
| field | 06-errors | 保留 | 06-errors | 实时校验与错误列表是组件组合；没有保存、网络或模拟服务。 |
| field | 07-disabled | 重写 | 07-disabled | 移除审核状态与组织 ID；只展示 Field 禁用传播。 |
| fieldset | 01-default | 重写 | 01-default | 移除公司发票数据；两个字段共享名称。 |
| fieldset | 02-label-legend | 重写 | 02-label-legend | 移除通知渠道数据；复用 Checkbox 展示 label 档 Legend，不另造基础控件。 |
| fieldset | 03-disabled | 重写 | 03-disabled | 移除开户审核、银行及账号数据；只展示整组禁用。 |
| input | 01-default | 保留 | 01-default | 单个 Field + Input，短名称与初值没有业务流程。 |
| input | 02-sizes | 保留 | 02-sizes | 五档真实输入尺寸，无业务编排。 |
| input | 03-with-label | 删除 | — | 标签、说明与 Input 已由基本示例和 Field 覆盖；工单通知说明无新增覆盖。 |
| input | 04-states | 保留 | 03-states | 无效、只读与禁用的静态状态；仅重编号。 |
| input | 05-file | 重写 | 04-file | 保留文件选择与 accept；删除营业执照审核及重新上传承诺。 |
| input | 06-character-count | 保留 | 05-character-count | maxLength 与实时字数是简单输入组合；仅重编号。 |
| input | 07-native-file | 删除 | — | 与文件选择示例重复，无独立业务状态。 |
| input | 08-search | 重写 | 06-search | 删除假项目列表、过滤结果与空结果；只保留 search 输入及清空。 |
| input | 09-password | 保留 | 07-password | 仅受控密码可见性，未编排登录/提交；仅重编号。 |
| input | 10-value-facts | 删除 | — | 通讯录核实、分机编辑及出行事实超出 Input；无控件事实标题留在 Field。 |
| layout | 01-stack | 重写 | 01-stack | 删除值班交接与已阅流程；只纵向排列两个字段。 |
| layout | 02-inline | 重写 | 02-inline | 删除报告订阅、邮箱与访问量；展示动作对齐和文字基线。 |
| motion-provider | 01-modality | 重写 | 01-modality | 删除草稿保存流程；只观察当前真实 data-ui-input，不注册第二套输入事件监听。 |
| motion-provider | 02-custom | 重写 | 02-custom | 删除交接优先级；以两个本地按下状态展示普通与 data-instant。 |

## 元数据与视觉变化

10 个 `meta.ts` 的相关 decisions、组合说明及示例引用已同步；`ComponentMeta` 没有 `demos` 数组，演示按文件自动发现。所有最终 demo 都有默认组件和中英文标题。没有手工改 catalog/ai/registry 等投影。

- AlertDialog、Dialog 说明收敛到选择、关闭及输入归属，不再以版本核对或草稿故事引导示例。
- Button 保留真实状态、危险后果与链接契约；删除维护者式的基础层缺口自述。
- Card 的同心说明限定为同一轮廓的等距内缩，不对独立子控件广播圆角；默认阴影未改。
- Field/Fieldset/Input/Layout 的提示围绕当前 API、标签、校验、组名和排列关系。
- 官网根 `apps/docs/src/main.tsx` 已挂载唯一 MotionProvider。两个演示复用它，移除原先每个 demo 的独立 Provider，避免多个 document owner。观察属性的 MutationObserver 在卸载时清理。

**视觉基线变化单列**：演示数量减少；财务、账单、订阅和审核内容删除；Card 缩为基础内容、链接、分节与密度；布局改为字段和动作。组件样式、焦点规则与 tokens 未变。本批未更新任何截图基线，未以类型通过代替视觉验收。

## 验证与边界

| 检查 | 状态 | 实际结果 |
|---|---|---|
| 开工 `pnpm --filter docs typecheck` | FAIL（既有） | 125 个范围外错误；L2 十目录错误为 0。 |
| 最终 `pnpm --filter docs typecheck` | PASS（L2） / FAIL（全站） | 最终重编号后再次运行：L2 十目录错误为 0；全站仍 125 条，诊断文本与开工逐条相同。 |
| 开工 `pnpm --filter @qingye/ui test` | PASS | 31 文件、466 用例。 |
| 最终 `pnpm --filter @qingye/ui test` | PASS | 最终重编号后再次运行：31 文件、465 用例，无失败。并行期间 use-media-query.test.ts 从 15 条变为 14 条；本批未写该测试。 |
| TypeScript AST 结构检查 | PASS | 37 个 demo、10 份元数据无解析问题；演示有 default/meta；仅导入 React、lucide 与本库组件，未出现 fetch/XMLHttpRequest/WebSocket 或计时器调用。该静态检查不声称运行行为已通过。 |
| 编号与保留项快照 | PASS | 十目录编号分别连续；10 个保留 demo 正文与开工逐字一致，包含 4 个仅改编号的文件。 |
| 本范围 `git diff --check` | PASS | 无空白错误；新增/未跟踪文件另用全文件扫描覆盖。 |
| 桌面浏览器、真实键盘焦点和 computed 值 | NOT_RUN | 检测到 L1 的 qy-batch5-l1 浏览器会话运行中，不打开第二个会话、不接管其页面。未以其观察作为本批证据。 |
| 浮层与高 z-index 宿主组合 | UNVERIFIED | 没有新增层级值；本批没有浏览器遮挡证据。 |
| 移动端页面适配与 390px 截图 | NOT_RUN | 按本批用户裁决不执行；组件原有窄屏约定未动。 |
| build / gen:catalog / 生成投影 / 发布 | NOT_RUN | 按文件归属由主 agent 收尾，本批未执行。 |

既有 docs 错误涉及外壳/安装/主题/示例等范围外页面对已归档组件和删除 API 的引用；本批没有改这些页面或弱化检查。没有任何既有测试断言修改，故无断言变更理由项。

日志与快照位于 `/tmp/qy-batch5-l2/`：`before.json`、`after.json`、`owned.diff`、`docs-before.log`、`docs-after.log`、`docs-final.log`、`typecheck-summary.json`、`ui-before.log`、`ui-after.log`、`ui-final.log`、`static-check.json`、`final-source-check.json`。证据只对应各次检查时的工作区快照，不保证并行任务后续状态。

浏览器所有权记录：已存在的 L1 daemon PID 85835、浏览器 PID 85836（父进程 85835）、profile `playwright_chromiumdev_profile-z1HWts`；既有 Vite PID 59950（父进程 59927）。本批没有启动或关闭 browser/server，也没有待清理的本批浏览器进程。
