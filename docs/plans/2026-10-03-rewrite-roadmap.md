# Qingye UI 重写路线图

2026-10-03 起草，本次依据 `a94e8b4` 与独立库存审核继续执行。覆盖从当前状态到发布的全部后续任务。依据：根 `design.md`（唯一设计依据）、
`docs/decisions/component-layering.md`（83 个组件的分层与取舍）、`docs/decisions/2026-10-03-value-adjudication.md`（逐值裁决）。

## 一、目标与边界

全部 83 个组件按 `design.md` 从零重写，不以保留任何既存实现为目标；仓库内不保留上游派生代码。

| 层 | 数量 | 说明 |
|---|---|---|
| Foundation | 6 | 值、角色与底线，不含交互 |
| Primitive | 44 | 不能继续拆分而不破坏交互语义 |
| Pattern | 33 | 无业务对象仍成立的组合结构 |
| **合计** | **83** | 另有 9 个已判删除，永不恢复：sheet、disclosure、frame、preview-card、spinner、skeleton、command、menubar、resizable |

## 二、持续有效的用户裁决

| 裁决 | 落实方式 |
|---|---|
| 组件完全按用户理念重写，不抄上游 | 子代理禁止读取归档与冻结的组件源码；值无唯一依据时标「选择/预设」 |
| 每个值说明「哪条关系决定了它」 | 基础层与各族决策文档逐值定性：推导 / 约束 / 选择 / 预设 |
| 控件外面不出现任何一圈焦点 | 有边框的只变色不加粗；有填充的在填充内侧反色线；无边界的自身盒内 1px |
| 按钮三档 solid / bordered / quiet | bordered 为白底、50% 边框（与输入框同强度） |
| 尺寸五档各用同名文字档 | 留白 4/5/6/6/7，不得只涨高度不涨字号 |
| 页面不需要适配移动端 | 审查页、演示、文档只做桌面验证；组件既有窄屏接线保留但不新增工作 |
| 演示只展示组件与简单组合 | 不编排业务流程、假数据、假服务；`design.md` 的 Examples 定义已改 |
| 组件库不含业务内容 | 源码、测试、文案中不出现虚构业务对象或故事 |
| 执行交给 Codex 子代理 | gpt-6.1-sol / xhigh；每批 2–4 个；主 agent 只下发、审核与统一验收 |
| 发布前不重新发布 | 全部重写并测试完成后，经用户批准才发布 |
| 本次要求精准回归，避免过度测试 | 子代理只验证新增/修改的行为与相关失败路径；主 agent 合并已有证据，不重复全量测试。共享底层按真实影响扩展，交付前统一验收一次 |

### 本次执行的品质判据

「世界顶级」不作为无证据的评级。以可观察的完成条件落实：语义单一、组合边界清楚；空/零/未知与结果不混淆；键盘、名称、可见焦点和退出正确；主题角色实际控制尺寸与表达；长文本、真实状态和中英内容成立。视觉判断以真实浅深桌面渲染为准，先审关系与任务，再审表达，不以另一套风格指南替代根 `design.md`。

## 三、执行状态（2026-10-04 持续更新）

### 本轮起点（20 个，第五批结束）

| 层 | 已完成 | 数量 |
|---|---|---|
| Foundation | layout、typography、separator；theme-provider、motion-provider（**保留未重审**，见阶段四） | 5 / 6 |
| Primitive | button、input、checkbox、radio-group、select、switch、textarea、field、fieldset、popover、tooltip、toast、dialog | 13 / 44 |
| Pattern | card、alert-dialog | 2 / 33 |

本次库存审核核对源码、根入口、metadata、catalog 均为 20，演示为 69，根入口缺失导出 0；尚缺 63（1 + 31 + 31），另有两项 Provider 待重审。metadata 仍把 separator、alert-dialog 错列 Primitive，分发分类为 4/15/1；须修正为 5/13/2，不能混淆分类缺陷与源码缺失。分层文档的「84」与规范的「11」也是历史计数，须与现状同步。

### 第五批统一验收（主 agent，2026-10-03）

| 检查 | 结果 |
|---|---|
| `gen:index` → `build` | PASS |
| `typecheck` | PASS，0 错误 |
| 全量测试 | PASS，31 文件 / 468 用例 |
| 包源码、样式、脚本、LICENSE 中的 coss 引用 | 0 |
| 审查页 1280px 浅/深：pageerror、console.error、水平溢出 | 0 / 0 / 0 |
| 审查页真实 Tab 60 次 × 2 主题：控件外焦点圈 | 0 |
| 审查页业务场景（目视） | 已无；只剩状态矩阵与简单组合 |
| 官网 `docs typecheck` | FAIL，125 条（归档组件引用，已接受） |

第五批内容（L1–L5、M、N）已随提交 `a94e8b4` 入库；该提交由另一会话完成，非本路线图的主 agent。

上述第五批统一验收是前一执行会话的报告证据，本次库存审核没有重新运行；另有本提交的审查修复证据 `docs/implementation/2026-10-03-review-followup.md`。来源状态以来源决定末尾 N 节为准；16 份无对应冻结原文的文件仍为 UNVERIFIED，不升级为完整历史来源证明。

### 本次执行：第六批

| 子代理 | 所有权 | 状态 |
|---|---|---|
| forms_structure | label、form、input-group、native-select、button-group、group；各自决策、测试与文档 | 完成。26 项初次精准回归；长附件修复 5 项及桌面真实容量确认通过，Group 分层已纠正 |
| forms_values → forms_selection | number-field、otp-field、tag-input；各自决策、测试与文档 | 完成。初次 31 项；独立审核后的 8 项定向修复确认通过，表单草稿、原生 reset、超长值删除恢复已补齐 |
| forms_selection | checkbox-group、toggle、toggle-group、segmented-control、slider；各自决策、测试与文档 | 完成。17 项与 Slider 8 项；最终 3 项定向确认。浅深桌面、实际尺寸与深色抓手已确认 |
| inventory_review | 只读库存、结构和值输入独立审核 | 审核已完成；转入独立内容 Pattern 开发 |

第六批新增 14 个源组件及对应文档。浏览器已观察 OTP 原生粘贴/选区/前导零、NumberField 步进焦点、TagInput 重复草稿、Slider 键盘/只读/实际错误输入。三个审查段 1280px 浅深无水平溢出、无 pageerror；截图只证明所测状态。五档实测控件外高与同名文字档对应。

### 后续批次与当前所有权

| 所有权 | 内容 | 状态 |
|---|---|---|
| forms_selection | copy-button、scroll-area、aspect-ratio、locale-switch、virtual-list | 完成，12 项初次精准回归；相关恢复与原生事件尾项定向通过，真实剪贴板/语言/跨窗口焦点与草稿保留已实测 |
| inventory_review | breadcrumb、steps、timeline、table、pagination、empty、item、description-list、stat、page-header、toolbar、code-block | 完成，28 项不同精准用例及定点 TS 通过；真实排序/分页/禁用命令/原文复制和浅深容量已实测 |
| forms_structure | badge、avatar、kbd、status-dot、alert、pending-value、meter、progress、progress-circle | 完成，25 项不同精准用例及本地化尾项定向通过；零/已知/未知、圆形尺寸与 token 覆写已实测 |
| forms_structure | accordion、collapsible、drawer、hover-card；Provider 重审；共享浮层、布局与 Card 尾项 | 完成，可集成。相关行为/生命周期与 UI/docs 定点 TS 通过；真实嵌套层级、退出返回、草稿和浅深容量已确认。Modal Portal 收窄不支持 keepMounted，三种公共面按名称可达与返回已实测 |
| forms_selection | calendar、date-picker、date-range-picker、date-time-picker、combobox、autocomplete | 完成，可集成。日期 12 个行为用例初次缺口定向修复，候选最终 9 项与 UI/docs 定点 TS 通过；真实日期、范围草稿取消、FormData、候选确认、自由文本及浅深容量已实测 |
| inventory_review | menu、context-menu、navigation-menu、tabs、tree、sidebar、filter-bar、bulk-action-bar、data-table | 完成，可集成。26 项不同精准用例与 UI/docs 定点 TS 通过，metadata 与71个runtime导出一致；filtered选择、空Tree焦点和公共取消边界已修。真实菜单、手动Tabs、筛选、树键盘与排序选择浅深已确认 |
| forms_selection | confirm-action、file-upload | 完成行为与源码回归。主代理真实确认v2请求/不推断成功、原生FormData仅接受File且保留同名字段、移除焦点与同文件重选已通过；meta/demo收尾与picker可见语义修正由同作者处理 |

源码与 metadata 已齐 **83 个**，主代理 `gen:index` PASS（83）。carousel/chart 作者 8 项精准行为与定点 TS 已通过；真实 Carousel 往返草稿保留、Chart 局部尺寸角色覆写已确认。Chart 纵轴裁切已在实际刻度测量链修复，浅深负号、长数值及长中英类别复核通过。FileUpload 的可见「选择文件」出口保留原生 input，真实 Space 选择、焦点与 FormData 已确认。阶段一至六的实现与本地交付验收已完成：库、官网与 Studio 最终构建 PASS，中英指南与 1.0.0 分发投影已生成；Tailwind / 预编译 CSS × 按钮 / 完整组合四种实际安装消费全部 PASS。

UI 包已准备 **1.0.0 本地未发布候选**；tooling 未因展示迁移改版本。旧 v0.4.0 版本资源保留起点快照，本轮临时生成的旧版本增量已定点恢复，当前 1.0.0 投影由唯一生成源产生。未发布、未推送、未创建 tag。

最终统一验收已观察：库初次 706 PASS / 3 FAIL；编译超时单独确认通过，两处过时断言修正后与新增 AST 负例共 3 项定向通过，不重跑已通过的 706 项。公共资源链接检查另新增 1 项并定向通过，当前库共有 711 项通过证据；官网 51、tooling 31、Studio 14 项均 PASS，不声称最终完整 suite 又执行了一遍。83 × 浅深桌面扫描共 166 页 PASS，26 个新增全局 token 的实际 computed 覆写逐项 PASS。基础探针三处错误适用条件定向确认、六个简单组合的行为及24个文字角色/间距容量检查均 PASS，未以修改外观迎合检查。Studio 最终11条流程、1100/1600px容量与真实文本对比 PASS；最后 catalog 变更使旧构建快照失效，重建后版本/源码/catalog 一致，不放宽兼容检查。打包 tooling 的真实安装、冲突、诊断与报告失效路径 PASS。详细验证与限制见 [执行记录](../implementation/2026-10-03-roadmap-execution.md)。

阶段五由 inventory_review 承接：恢复桌面网站及真实公共控件消费，不恢复缺失的业务 examples/patterns。阶段六由 forms_selection 承接英文字段及真正的本地化出口；forms_structure 在最后两组件后承接 tarball 两种 CSS 消费与本地 CI 脚本，并迁移已确认受影响的 Studio 公共 API。工具端的实际 session/theme 操作保留，不以改假业务预览扩大工具架构。

不依赖浮层或首页定稿的内容按空闲槽位推进；实际顺序可以跨批，阶段完成仍以完整库存与真实证据为准。

主 agent 负责下发、审核、唯一计划/证据同步、统一生成与集成验收。全局共享文件按明确所有权串行修改。浏览器由主 agent 独占，一会话一活动页面，其他代理不得启动浏览器。

### 第五批遗留

| 项 | 归属 |
|---|---|
| quiet 按钮在强制颜色下 outline 2px / offset −1px，外扩 1px（L1 实测） | 第六批顺带修 `styles.css`：outline 宽度改用 `--qy-focus-ring-width` |
| 审查页「RadioGroup / Select」标题层级比其他段落高一级 | 第六批顺带 |
| Select「选中与高亮同时存在」用例在并发修改期间曾间歇失败；统一验收时通过 | 观察，复现即修 |

## 四、实现中的设计选择与外部批准门槛

D1、D2、D4 的偏好已异步征询，尚无回复。本次请求已授权完整开发；这些可逆设计选择先按推荐方向实现并接受后续纠正，不新增开发批准流程，也不把默认选择写成用户已裁决。D3 与发布保持原有明确批准要求。

| # | 事项 | 现状与证据 | 阻塞 |
|---|---|---|---|
| D1 | Card 默认要不要阴影 | 面/底 1.08:1 不证明阴影必要。先采用无默认阴影；需要独立浮起身份的承载由相应主题/组合表达 | 实现后核对线、面与内容边界；不宣称该选择由理念唯一推出 |
| D2 | 浮层层级（z-index）是否设角色 | 已建立共享顺序，真实父子面、候选与通知角色及覆写通过 | 具体数字是集中预设，关系是约束；不把此可逆实现默认写成用户偏好裁决 |
| D3 | 归档区与冻结副本何时删除 | 位于仓库外，是取证依据 | 仅阶段七 |
| D4 | 官网首页与组件页的视觉方向 | 已按开放内容、清晰排版、可操作组件展示恢复桌面官网，公共组件消费、搜索与深链接通过 | 用户后续偏好可修正；默认方向不等于已批准偏好 |

## 五、阶段与批次

每批按可用容量安排 2–4 个子代理，按族分配、文件归属不重叠。本会话主 agent 加最多 3 个活动子代理。每批结束只做对应边界的集成检查与桌面实测；无需每批重复全库测试，规则见第六节。

### 阶段一：清理与来源收尾（第五批，已有完成证据）

见第三节。完成标准：演示、审查页、库源码中无业务内容；`src` 与 token 取证通过；MIT 声明与来源清单删除；`AGENTS.md` 记录完成日期。

### 阶段二：原语（31 个 + 基础层 1 个）

| 批 | 子代理 1 | 子代理 2 | 子代理 3 | 子代理 4 |
|---|---|---|---|---|
| 第六批 · 表单 | label、form、input-group、native-select、button-group、group | number-field、otp-field、tag-input | checkbox-group、toggle、toggle-group、segmented-control、slider | 按空闲槽位安排独立审核 |
| 第七批 · 展示与反馈 | badge、avatar、kbd、status-dot | alert、pending-value（新增）、meter | progress、progress-circle | accordion、collapsible、drawer、hover-card |
| 第八批 · 工具与基础 | copy-button、scroll-area、aspect-ratio | locale-switch（新增）、virtual-list（新增） | 重审 theme-provider、motion-provider | 基础层补遗：浮层层级角色（依 D2） |

要点：
- `pending-value` 承担「写入结果未知」，与 Button、Toast 的状态词汇一致。
- `drawer` 吸收 sheet 的方向参数；`collapsible` 吸收 disclosure。
- `copy-button` 复用已重写的 `useCopyToClipboard`（成功只在真实写入之后）。
- `virtual-list` 只承担可达性与渲染边界，不带业务列定义。

### 阶段三：模式（31 个）

依赖顺序：先菜单与集合基础，再组合框与日期，最后复合模式。

| 批 | 子代理 1 | 子代理 2 | 子代理 3 | 子代理 4 |
|---|---|---|---|---|
| 第九批 · 菜单与导航 | menu、context-menu | navigation-menu、breadcrumb | tabs、steps | timeline、tree |
| 第十批 · 输入组合与日期 | combobox、autocomplete | calendar、date-picker | date-range-picker、date-time-picker | code-block、chart |
| 第十一批 · 集合 | table、data-table、pagination | filter-bar（新增）、bulk-action-bar（新增）、empty | item、description-list、stat | page-header、sidebar、toolbar |
| 第十二批 · 复合 | confirm-action（新增） | carousel | file-upload | 全库一致性复核（焦点、尺寸、文字档、token 消费） |

要点：
- `menu` 是命令，`select` 是值；命令面板（原 command）用 menu + input 组合表达，不恢复独立组件。
- `confirm-action` 针对当前对象、版本与变更内容，与 alert-dialog 分工（容器 vs 契约）。
- `data-table` 依赖 `table`，`date-*` 依赖 `calendar` 与 `popover`，`combobox` 依赖 `input` 与浮层层级（D2）。

### 阶段四：基础层与文档定稿

- 依 D1、D2 的裁决更新基础层 §5、§6、§15 与相关族文档。
- 重审 theme-provider、motion-provider（第八批）后，基础层 6 个全部按 `design.md` 定稿。
- 七份族文档与基础层逐节对照现状，删除已不成立的表述。
- `STANDARDS.md` 只保留实现规则，设计要求一律引用 `design.md`（已有测试约束）。

### 阶段五：官网（第一方消费端）

- 依 D4 定首页与组件页视觉。官网外壳只消费本库公共组件（`website-as-consumer.md`）。
- 恢复 `/playground/<name>`、组件页、`/design.md` 投影；删除 `review.html` 之外的临时审查入口。
- 演示遵守「组件与简单组合」；只做桌面。
- `scripts/audit.mjs` 与 CI：审计视口与「页面不适配移动端」对齐（需改审计变体，单独决策记录）；恢复 CI 绿灯。
- 原 Pattern 文档页（编辑、集合、审阅、队列、阅读、详情）按新规则改写为模式契约说明，不带业务故事，或删除——随阶段三的对应模式决定。

### 阶段六：分发资产与本地化

- 重建 `catalog.json`、`ai/SKILL.md`、`ai/style.md`、registry；核对生成物与源码一致。
- 英文本地化：除示例外的全部非示例内容（组件元数据、决策摘要、站点文案）；示例不翻译（用户裁决）。
- 打包消费验证（Tailwind 与预编译两条路径）。

### 阶段七：发布

- 用户批准后发布新主版本（破坏性变更清单单列：Button 变体、Field 删除别名与自动校验、`useIsMobile` 删除、9 个删除组件、视觉基线变化）。
- 依 D3 处置仓库外归档区与冻结副本。

## 六、每批的固定流程与验收

1. **任务书**：语义与关系先行（决策文档），再写代码；只依据 `design.md`；禁止读取归档/冻结源码；
   文件归属不重叠；生成物与 build 由主 agent 统一；测试不得为通过而放宽；演示只展示组件与简单组合；只做桌面。
2. **监视**：使用本会话 collaboration 的代理状态与完成报告，不把评论、静态计划或未结束日志当完成。
3. **主 agent 验收**：先审真实实现与契约，复用子代理已观察的定向测试；新增/删除组件后 `gen:index`，metadata/生成源变更后统一生成并构建，每批合并后库 typecheck 一次。只因新增修复或新风险重跑受影响测试，不重复通过的检查。视觉/交互变更由唯一浏览器 owner 一轮串行检查相关桌面浅深主题与真实键盘/关键状态，集中修复后只确认受影响状态。
   浮层调整验证父子层级、关闭顺序、焦点返回与点击可达；表单验证输入/集合、受控更新及相关禁用/只读/取消或失败路径；静态部件检查内容容量与主题消费。共享底层影响未界定或交付准备时才运行一次全库与分发消费门禁。PASS / FAIL / UNVERIFIED / NOT_RUN 分层记录，不宣称截图等于完整无障碍通过。
4. **汇报**：结果、新增破坏性变更、待裁决事项；更新本文件。

## 七、风险与已知未验证项

| 项 | 状态 |
|---|---|
| 浮层同时出现的遮挡顺序 | 所测嵌套候选/后开工作面/退出顺序 PASS；不外推到任意自定义 zIndex 或完整辅助技术矩阵 |
| Base UI 对话框背景未使用原生 `inert`（以 ARIA 隐藏、焦点管理与遮罩截获实现） | 已记录，接受原语机制 |
| 辅助技术真实朗读、强制颜色完整矩阵、任意组合 RTL、原生浏览器 200% 缩放 | NOT_RUN / UNVERIFIED；限定 Button 强制颜色与 Carousel RTL 已 PASS，Chart CSS zoom 探针不代替原生浏览器缩放 |
| 官网外壳与本地 CI | 官网构建、真实首页/搜索/深链接及166页扫描 PASS；本地组合、基础定向确认、Studio、四种UI安装消费及tooling消费 PASS；远端 GitHub CI 未执行 |
| 静态 token 链 | 3018路径，PASS19 / UNVERIFIED18，当前指纹匹配、stale=false；37条角色runtime已有实际变化证据。Studio实际点击button-content的DOM所属Button已确认，但精确静态路径仍UNVERIFIED |
| 发布与外部消费 | 1.0.0本地候选、公共资源及破坏性变更说明已完成；阶段七等待明确发布批准，真实外部项目迁移与线上新版本未验证 |
| 窄屏 | 不验证（用户裁决） |
