# Batch 5 · L3：组件演示去业务场景（下半）

2026-10-03。范围为 popover、separator、switch、textarea、theme-provider、toast、tooltip、typography 的 `meta.ts` 与 `demos/`；radio-group 与 select 不在本任务内。**本范围静态检查与库测试复测 PASS；全站 typecheck 仍 FAIL，浏览器验收 NOT_RUN。**

30 个现有 demo 中，7 个保留、19 个重写、4 个删除或合并，另补 2 个尺寸 demo；最终 28 个，各目录编号连续。

## 先定语义与关系

设计依据仅为根 [design.md](../../design.md) 的「先定语义，再定关系，最后定表达」「名称与状态」「明确修改归属」与文案判据。用户本批裁决收紧演示范围：只呈现组件本身与简单组合，不在文档中编排 Capability / Experience。

| 组件 | 演示对象与关系 | 本批处置边界 |
|---|---|---|
| Popover | 触发者、面板、关闭、定位、共享 handle、局部 Portal 上下文 | 保留 Field + Textarea 的简单组合；删除成员资料、告警与权限故事。关闭仅关闭，输入值由 demo 的本地状态持有。 |
| Separator | 水平/纵向分界与 decorative 语义 | 保留真实文档链接；其余内容改为文字样本，不虚构联系人或账户。 |
| Switch | 二值、受控/初值、无效、禁用、只读与五档尺寸 | 状态文字仅对应真实 checked；不声称设备接收告警或组织权限改变。 |
| Textarea | 多行值、字符数、无效、禁用、只读与五档尺寸 | 保留 Field 关联；删除交接记录、保存与设备状态。 |
| ThemeProvider | 真实明暗选择、resolvedTheme 与首屏脚本 | 三个现有 demo 都是环境状态或简单组合，保持原样。 |
| Toast | 通知类型、正文、操作、原位更新、堆叠与锚点 | 只操作真实通知与本地计数；删除报表流程、模拟服务、下载、工单、设备数据和复制故事。等待/进行中只作为显示状态。 |
| Tooltip | 名称与补充文字、四方向、快捷键、共享 handle | 保留格式/对齐的简单组合；删除虚构编辑记录与复制权限模拟。 |
| Typography | 标题语义与视觉档、正文/辅助文字、numeric | 用文字与字形样本替换交接和结算数据。 |

数量与示例内容属于本批选择；保留已有尺寸、间距和颜色预设，不新增 token、焦点样式、层级或组件 API。浮层仍依赖 Portal 自然绘制顺序，复杂叠层遮挡为 **UNVERIFIED**。

## 基线与阅读记录

- 实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`；HEAD `275d730`，前两提交 `b93bfe4`、`9d51f7a`。工作区存在大量其他代理改动；仅增量修改本任务归属，未提交、checkout、stash 或恢复其他工作。
- 已读当前 `AGENTS.md`、`design.md`、`STANDARDS.md`、基础层、逐值裁决、相关 form / overlay / layout / display 族文档，以及 batch2 A/B/C 报告。历史文档中的组件数量与旧验证结果不当作当前证据。
- 已读取这 8 个内容目录的 30 个现有 demo 和 8 份 metadata、`apps/docs/src/lib/types.ts`、元数据本地化类型、docs 类型路径与测试配置。没有读取归档组件源码或 provenance freeze；没有读取组件实现函数体、className 或样式。本任务不重写组件，因此未用旧实现推导任何值。
- 任务文件开工快照：`/tmp/qy-l3-before/`，用于识别本任务增量，不以 HEAD 中的旧文件覆盖当前文件。
- 修改前 `pnpm --filter docs typecheck`：**FAIL**，全站 125 个 diagnostics；目标 8 目录 0 个。修改前 `pnpm --filter @qingye/ui test`：**PASS**，31 文件 / 466 用例。

## 逐 demo 处置

下表在修改前确定语义与处置，实际落盘文件与表中最终名称一致。

| 目录 | 开工 demo | 处置 | 最终 demo | 理由 |
|---|---|---|---|---|
| popover | 01-form | 重写 | 01-form | 保留字段编辑组合，删除项目与会员权限说法。 |
| popover | 02-close-button | 重写 | 02-close-button | 保留显式关闭，删除虚构告警统计。 |
| popover | 03-sides | 重写 | 03-sides | 展示四方向，用方向值替换虚构人员资料。 |
| popover | 04-shared | 重写 | 04-shared | handle 共享触发者名称，删除人员数据集。 |
| popover | 05-context | 重写 | 05-context | 保留语言/方向/密度容器，删除项目与生产环境故事。 |
| separator | 01-horizontal | 重写 | 01-horizontal | 改为文字组分界，删除账户与邮件通知场景。 |
| separator | 02-vertical | 保留 | 02-vertical | 真实指南/仓库链接的简单分界，无业务流程。 |
| separator | 03-decorative | 重写 | 03-decorative | 保留 decorative 语义，删除虚构电话号码。 |
| switch | 01-alerts | 重写 | 01-states | 改为真实控件状态，删除告警设备、离线和组织策略。 |
| switch | — | 新增 | 02-sizes | 补足已有五档尺寸，不新增业务状态。 |
| textarea | 01-handoff | 重写 | 01-value | 只编辑多行值与显示字符数，删除提交/保存交接流程。 |
| textarea | 02-access | 重写 | 02-states | 展示无效/只读/禁用，删除归档及离线设备故事。 |
| textarea | — | 新增 | 03-sizes | 补足已有五档尺寸。 |
| theme-provider | 01-menu | 保留 | 01-menu | 真实明暗切换与 Popover 简单组合。 |
| theme-provider | 02-segmented | 保留 | 02-segmented | 直接选择真实 theme 并展示 resolvedTheme。 |
| theme-provider | 03-head-script | 保留 | 03-head-script | 展示真实首屏脚本，无模拟业务。 |
| toast | 01-types | 重写 | 01-types | 直接选择通知类型，删除报表生成结果。 |
| toast | 02-default | 重写 | 02-default | 展示短/长正文，删除虚构工单地址与复制。 |
| toast | 03-loading | 删除 | 合并至 01-types | 等待/进行中已覆盖；删除生成队列推进。 |
| toast | 04-action | 重写 | 03-action | 实际操作仅增加本地计数，删除归档/恢复工单。 |
| toast | 05-promise | 删除 | — | 删除假服务、响应丢失、导出数据集与下载链。公共 Promise API 文档保留。 |
| toast | 06-update | 重写 | 04-update | 直接更新/关闭同一通知，删除巡检草稿与版本故事。 |
| toast | 07-stack | 重写 | 05-stack | 用户直接添加通知，删除虚构后台事件数据。 |
| toast | 08-anchored | 重写 | 06-anchored | 显示与真实按钮关联的通知，删除工单链接与复制。 |
| toast | 09-long-content | 删除 | 合并至 02-default | 保留长内容覆盖，删除导入清单与失败记录数据。 |
| tooltip | 01-icon-buttons | 保留 | 01-icon-buttons | 图标按钮切换文本格式，属于简单组合。 |
| tooltip | 02-sides | 重写 | 02-sides | 直接展示四方向，删除虚构编辑者/时间与文档选择。 |
| tooltip | 03-shortcut | 保留 | 03-shortcut | 真实键盘处理与格式按钮的简单组合。 |
| tooltip | 04-shared | 保留 | 04-shared | 共享提示与段落对齐属于简单组合。 |
| tooltip | 05-copy | 删除 | — | 删除临时改写 navigator.clipboard 的权限模拟；图标提示已覆盖。 |
| typography | 01-heading | 重写 | 01-heading | 标题与混排样本替换虚构交接故事。 |
| typography | 02-values | 重写 | 02-values | 文字档与数字字形替换退款、收入与结算数据。 |

## 元数据与可见变化

- 每个重写 demo 的标题同步到组件状态或组合。Tooltip metadata 删除复制权限模拟的中英文说明，并移除复制事件的状态归属；`notes` 与 `notesEn` 一并删除对应项，没有错位。
- 其他 7 份 `meta.ts` 没有引用被删除的业务示例、文件名或 demo 数量，其组件 API、decisions 与设计边界仍成立，保持原样。当前 `ComponentMeta` 没有 `demos` 字段；示例标题由各 demo 的 `meta` 提供，页面按 glob 自动取实际文件。
- 可见变化：Popover 的对象资料改为方向与局部字段；Switch / Textarea 改为状态行及五档尺寸；Toast 的报表表格、下载、工单/设备结果与导入清单移除；Tooltip 的编辑资料改为方向；Typography 使用混排样本与已有 display/title/chapter/heading 文字档。Typography 首例由 title 改用现有 display，是本批展示选择，不是理念唯一推导。没有修改库的颜色、尺寸、焦点或动效值。
- 每个 Toast demo 仅清理自己创建的通知，通知 id 使用实例 id 或 manager 返回值；没有关闭其他 demo 的全部通知。更新/关闭入口跟随当前通道是否存在该通知，不编排业务步骤。
- 没有修改组件源码、测试、审查页、locale、来源记录或生成物；没有操作 radio-group / select。**来源记录应删条目：无**，本批未重写来源组件。

## 验证结果

| 检查 | 结论 | 实际证据与边界 |
|---|---|---|
| `pnpm --filter docs typecheck` | **FAIL（全站） / PASS（本范围）** | 修改后全站 125 diagnostics；8 个目标目录各 0。与开工日志按完整 diagnostic 行比较，新增 0、消失 0。范围外错误未修改。 |
| `pnpm --filter @qingye/ui test` 首次修改后检查 | **FAIL** | 31 文件：28 PASS / 3 FAIL；465 用例：462 PASS / 3 FAIL。两项为共享工作区正在改动的根指南与生成副本/hash 不同步；一项为 Button registry 编译用例 5000ms 超时。均没有通过修改测试或生成物消除。 |
| Button 超时用例单独复测 | **PASS** | `pnpm --filter @qingye/ui exec vitest run test/button.test.tsx -t 'registry editor template'`；该用例 4474ms 通过，另 49 用例由名称过滤而未执行，不算通过。 |
| `pnpm --filter @qingye/ui test --maxWorkers=1` | **PASS** | 31 文件 / 465 用例全部通过，Button 编译用例 1048ms。只将执行 worker 调为 1，未改 timeout、断言、skip 或测试文件。并行代理同步后，该次读取到的生成指南检查也通过；不是本任务运行了生成器。 |
| 保留项与改动边界 | **PASS** | 与 `/tmp/qy-l3-before/` 比较，7 个保留 demo 逐字不变；7 份无须同步的 metadata 逐字不变。自己的写入仅落在指定内容目录和本报告。完整任务增量 diff 保存在 `/tmp/qy-l3-changes.diff`。 |
| 数量与连续编号 | **PASS** | popover 5、separator 3、switch 2、textarea 3、theme-provider 3、toast 6、tooltip 4、typography 2；共 28。每目录为 01 起连续编号。 |
| 业务化处置 | **PASS（源码审查）** | 逐 demo 对照上表检查对象、动作与状态。TypeScript AST 另外遍历 28 个最终 demo 的 CallExpression、NewExpression 与 JSXAttribute：无 fetch、计时模拟、clipboard、Promise/Blob 构造、对象 URL、Promise manager 演示调用或 download 属性。此静态检查不等于浏览器行为验证，也不推断动态别名或运行时能力。 |
| `git diff --check -- <本任务目录与报告>` | **PASS** | 无空白错误；新增文件另检查行末空白与最终换行。 |
| 桌面浏览器 / Tab / computed / 对比度 | **NOT_RUN** | 检测到 L1 拥有活动会话 `qy-batch5-l1`，daemon PID 85835、browser PID 85836，profile `playwright_chromiumdev_profile-z1HWts`。本任务没有启动、复用或终止该会话，没有桌面运行截图；由浏览器 owner 统一验收。 |
| 浮层复杂叠层遮挡 | **UNVERIFIED** | 没有新增 z-index 或层级 token；自然 Portal 绘制顺序的复杂组合没有运行验证。 |
| 390px、build、gen:catalog、打包/发布 | **NOT_RUN** | 按用户边界不执行；没有组件文件增删，也不执行 gen:index。 |

开工库测试为 466 用例，最终共享工作区为 465；中间的 `use-media-query` 测试数量由 15 变为 14，属于其他任务并行改动，本任务没有读写或删减该测试。上述数字只对应各自执行时点，不外推到未来源码。

日志：`/tmp/qy-l3-typecheck-before.log`、`/tmp/qy-l3-typecheck-after.log`、`/tmp/qy-l3-test-before.log`、`/tmp/qy-l3-test-after.log`、`/tmp/qy-l3-button-timeout-recheck.log`、`/tmp/qy-l3-test-serial.log`。

未修改任何既有测试或断言，因此没有断言放宽或改写理由待交接。未提交、checkout、stash、build 或发布；本任务未拥有浏览器或 docs server，不存在本任务待清理的浏览器进程。
