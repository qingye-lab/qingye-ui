# Qingye UI 改造执行记录

**记录阶段：前一轮改造及审查修复已推送 main（9d51f7a，关联 CI 通过）；下方 W00–W12 保留该轮证据。当前追加的官网、跨项目指南与 88 组件设计已完成下述本地验证，以本文末尾补充记录为准。远端状态以对应提交关联 CI 为准；本次不创建发布 tag。**

后续修复：[三项审查问题及回归证据](2026-10-02-review-fixes.md)。

范围来源：[已授权计划](../plans/2026-10-02-design-system-renovation.md)。基线 `f0de477`（0.3.0）。开始时只有本任务新增的 `design.md` 与 `docs/plans/` 未提交；未还原、清理或覆盖其他任务。保留本地版本号，打包件只用于验证。

用户明确要求主 agent 下发和审核，多个 GPT-6.1 sol / xhigh 子 agent 并行。三张视觉提案全部拒绝，最终视觉后置；Q01–Q04 保持有效。下列实现不意味着用户接受了最终外观。

## 工作包交付

| 工作包 | 已交付结果 | 验收边界 |
|---|---|---|
| W00 基线/来源 | 88模块处置、四个coss家族评估、别名owner与来源指纹 | 保留成熟底座有证据；未宣称全自研 |
| W01 规范/理念 | design.md、STANDARDS、AGENTS、执行决策，硬要求与默认预设分开 | 视觉定稿后置，不影响语义/可访问性硬要求 |
| W02 事实索引 | schema 2 catalog，真实exports/API/来源/设计判断/示例 | 动态未知保留；不把声明等同运行时验证 |
| W03 公共组件 | Field关系、InputGroup事件、Table刷新/批量、Upload去重/描述、Tree惰性/焦点、TagInput播报，motion补修 | 默认关系8/20px保持；布局/API影响单列 |
| W04 六种任务 | 编辑、集合比较、详情、审阅、队列、阅读；真实失败/未知/取消/返回与恢复路径 | 合成应用状态，没有真实业务后端 |
| W05 全量处置 | 88项逐项归属、处置、单测/几何/联合证据登记 | 完整C验收仍UNVERIFIED，不将352页几何视为所有交互通过 |
| W06 主题核心 | ui.config/ui.theme、生成CSS、diff/apply、指纹并发保护、旧CSS只读迁移候选 | 旧手写CSS不承诺无损往返 |
| W07 工具 | 安装版本查询、docs、init、AST check、report/gate、impact、多项目已存报告 | publicControlBypass等未覆盖项明确UNVERIFIED，执行故障exit2 |
| W08 Studio | 两独立文档、真实Portal/状态、编辑/导入/导出/应用/冲突、归属与报告 | 要求目标包与构建版本/catalog/源码一致；不冒充任意旧版本 |
| W09 AI入口 | 同源design/catalog/AI资料、llms.txt、registry；合法公共路径和错误prop/import探针 | 客户端/模型不会被文件自动保证遵循 |
| W10 官网 | 任务优先首页、公开理念、基础规则、六模式、主题/AI入口与组件判断 | 内部原始文件/绝对路径不进入站点 |
| W11 集成 | 源/预编译真实安装消费、真实CLI包、浏览器/主题/状态、CI与Release接线 | 本地检查已运行，远端CI/tag发布未运行 |
| W12 对照 | 同模型/effort/独立上下文24次，固定任务/资料/目标、原始结果与判定器自测 | 24/24固定断言PASS，两组无错误率差异；没有可靠效率提升结论 |

具体 owner 报告：[库](library-report.md)、[模块处置](library-module-review.json)、[任务与文档](docs-patterns-report.md)、[工具/Studio](tooling-studio-report.md)。主 agent 集成与独立检查以下列证据为准，早期 agent 报告中的 NOT_RUN 不代表这些后续检查未发生。

## 实际检查结果

| 检查 | 结果 | 当前证据及限制 |
|---|---|---|
| pnpm typecheck | PASS | test-results/review-fixes/typecheck.log；全部工作区 |
| pnpm test | PASS，381项 | UI 314、tooling 31、docs 22、Studio 14；test-results/review-fixes/test.log |
| facts-ledger | PASS | exports/alias、source-only、AST、转发、stale/NOT_RUN；test-results/review-fixes/facts.log |
| 库/工具/docs/Studio build | PASS | 最终构建日志；构建不代替运行时 |
| 88×4组件审计 | PASS，352页，0问题 | component-audit-summary.json；此轮保存控制台汇总，没有逐页JSON；发生在最终motion修补前，最终包另验其文字颜色 |
| 六种任务实际浏览器 | PASS，138检查 | test-results/task-patterns/report.json；108组明暗/320、390、1280/200%文字/文字间距及联合组合 |
| 最终主题实测 | PASS 74，NOT_RUN 4 | test-results/ui-foundations-final/runtime.json；24截图；4项为细指针环境不满足粗指针前提，不能当PASS |
| Studio | PASS，11核心检查 | test-results/studio/run-Mu74Dw/report.json；两文档真实Select/Menu/Dialog/Toast、表面RGBA、焦点/草稿、主题/密度与source冲突；1600/390无页面溢出 |
| 实际UI tgz四消费项目 | PASS | test-results/packed-consumers/run-PXygRU/report.json；Tailwind/precompiled × Button-only/full；安装、TS、build、真实浏览器、对比度与触摸模拟 |
| 最终tar一致性 | PASS，398文件逐字节相同 | final-package-equivalence.json；最终UI tar与上述已测安装内容相同，避免仅因重打包重复跑全部浏览器 |
| 实际工具tgz | PASS | test-results/packed-tooling/run-Rt2tPL/report.json；bin/info/docs/init/diff/apply/conflict/report/gate，新增源文件使已存报告陈旧 |
| 六个AI集中主题输出的消费诊断 | 无确定违规；报告保持UNVERIFIED | test-results/ai-consumer-diagnostics/report.json；root额外运行真实安装CLI，不冒充agent自行调用；scanner未覆盖部分不改成PASS |
| 公开产物边界 | PASS（指定规则） | public-artifacts.json；UI398文件、tooling24文件、docs1059文件；未发现指定私有路径/原稿/权限字段，不是一般保密保证 |
| 24次AI固定实现 | PASS 24/24 | [AI结果](ai-eval-results.md)；全部原始输出与首次失败保留，判定器合法性问题统一修正 |
| 真实IME/物理触屏/读屏/人工视觉 | NOT_RUN | 仍待独立人工验收，不以合成事件、截图或模型自评分替代 |
| GitHub CI/Release/真实业务上线 | NOT_RUN | 本表保存推送前状态；用户已授权 main 推送，远端 CI 看提交关联运行；未创建 tag 或业务上线 |

浏览器均为本任务唯一、串行的 Chromium 153.0.8010.12 会话。默认 headless_shell 在本机约30秒自行正常退出，最小空页复现后改用同版完整 Chromium 的受支持 executable override，随后运行完成。所有浏览器与临时preview均记录PID/父子关系/profile并关闭；未关闭用户浏览器。清理时 preview 的 SIGTERM/143 日志是主动退出，wrapper最终退出0才算成功。

## 真正修复与判定器修正

- 库根因修复：公共事件覆盖、满额文件重复计数、刷新卸载工作面、丢失Tree焦点/惰性声明、重复播报；最终真实安装又发现 reduced-motion 将 Input 的超长自动填充背景过渡错误扩展到 color，导致深色文字旧颜色停留，已按背景属性修复并复验。
- 任务根因修复：在途保存及A/B切换保留请求身份与后续草稿；窄屏审核长动作、上传名称/大小/状态/动作使用可换行布局。没有隐藏溢出或删列。
- 验收修正：隐藏details不参与可见文字测量；宽末列标题按其实际可达滚动位置检查；异步报告等待真实响应；模态打开时从DOM检查背后草稿，不用被无障碍树正确隐藏的role查询。
- AI判定器修正依据公共合同，未改模型产出，也没有放宽取消/未知/请求ID/归属/状态断言；详情见 [协议](ai-eval-protocol.md)。

## 待验收及公开表述

[V01–V30结果](scenario-results.md)：所列自动夹具已通过；23项在该范围内PASS，7项完整验收UNVERIFIED。后者集中在V02/V04人工层级与注意力、V14物理触屏、V15状态可见线索、V20真实IME、V22完整对比度适用性、V30人工任务/视觉评审。读屏是另列的通用未验收边界。所有88模块仍不能据此声称全部状态和辅助技术通过。

后台鉴权、幂等、取消与撤销只定义应用合同，本地fixture不证明生产服务；真实业务迁移是单独项目。AI对照没有测出新资料在本批固定任务中的错误率优势，也没有统一可强制的token预算与有效工时数据，不能宣传提效倍数。

[变更与消费说明](2026-10-02-release-notes.md) 单列DataTable工具行、长错误/动作换行、官网/Studio布局及Tree加法API；不把可见变化隐藏为refactor。最终人工视觉定稿仍按用户裁决后置。

## 复现入口

常规：`pnpm install --frozen-lockfile`、`pnpm typecheck`、`pnpm test`、`pnpm verify:facts`、库/docs/Studio build。浏览器：`node scripts/run-browser-audit.mjs --patterns`、`--foundations`、`node scripts/verify-studio.mjs`，严格串行。本机需要设置上述完整Chromium路径；Linux CI使用已安装Playwright浏览器，不硬编码本机路径。

包消费：`node scripts/verify-packed-consumers.mjs --tgz <ui.tgz>`；工具：`node scripts/verify-packed-tooling.mjs <ui.tgz> <tooling.tgz>`。AI复现依据 [协议](ai-eval-protocol.md)，不能把私有参考实现作为模型输入。

## 官网与跨项目设计入口补充

用户要求理念在项目 AGENTS/design 中持续可见、官网使用公共组件；随后明确反对说明书式 UI，要求首页参考 coss 布局，并启用子代理认真设计全部组件。当前以此为准，见 [官网消费端决策](../decisions/website-as-consumer.md)。

根 design.md 的项目合并片段同源进入网站、包、Skill 和复制入口。官网原生控件及导航语义错误在拥有边界修复，并新增 AST 检查。首页按简短产品介绍与真实组件预览目录重做；早期摘记方案已放弃，旧的 35 项首页检查只属于该方案，不能作为最终首页证据。

本轮以 `9d51f7a` 为开始基线，开始时工作区干净。由主 agent 调度并审核三个 GPT-6.1 sol / xhigh 组件家族：输入 21、操作与浮层 28、内容与数据 39，合计 88、无重复。每项都有独立设计判断并进入 `meta.design`，45 个组件实现及复制 Hook 实际修改；保留实现有具体理由，不以重写数量作为成果。

组件判断的组合、响应式与修改入口同时导出到 AI Markdown，不能仅在网站或 catalog 内找到。生成器保持根设计指南单源，网站与包的副本、项目接入片段和组件 Markdown 有回归约束。官网控件 AST 检查实际覆盖 462 个 TSX、2 个合法 library render 根元素、0 违规；结构 HTML 和原生导航语义不被冒充为违规。

逐项台账：[输入](2026-10-02-component-forms.md)、[操作与浮层](2026-10-02-component-surfaces.md)、[内容与数据](2026-10-02-component-content.md)。子代理台账保留交接时的未验状态，以下主 agent 集成证据覆盖本轮已测部分。

### 独立复查与浏览器修补

- 独立复查发现稳定 children 下 TagInput 继承禁用不同步，NumberFieldInput 显式 aria-label 被 root aria-labelledby 覆盖；新增 6 个场景先失败，再修复，相关 36 tests PASS。随后两组交叉复查高风险组件与复制 Hook，无新增可证实阻断问题；其中内容方向复跑 68 tests PASS。
- 真实短视口发现 NavigationMenu 禁止翻转、弹层出现在屏幕外；恢复原语碰撞避让，Popup/Viewport 按可用高度限制并提供内部滚动。最终 390×320 下弹层和最后一项均可达。
- 初始可见文字实测发现辅助文案、输入空值、危险 Badge、Kbd 的真实低对比；在各自公共部位修复完整语义色，不更改全局阈值。展开状态另发现深色菜单高亮快捷键 4.08:1，Menu/ContextMenu/Command 统一继承当前高亮项文字。修后危险快捷键实测 4.57:1，命令面板高亮快捷键 12.10:1。
- 验收脚本修正等待对象：SPA URL 改变不等于页面已挂载；全量预览等待真实 88 卡片；Tabs 方向键移焦点后 Enter 激活；OTP 按位输入后验证末格焦点与滚动。未放宽真实行为、对比或几何断言。

### 本轮实际验证

| 检查 | 结果 | 证据和范围 |
| --- | --- | --- |
| 工作区类型/测试 | PASS | `final-typecheck.log`；`final-test.log` 全工作区 441 项（UI 365、tooling 31、docs 31、Studio 14）。随后新增公开投影回归并修改高亮样式，定向 17 项 PASS（包含 3 项指南投影），不把重复执行累计成新测试。 |
| 库/docs/Studio 构建与 UI pack | PASS | `final-build.log`、`final-studio-build.log`、`final-pack.log`；UI tgz 用于本地消费验收，未创建新 Release。 |
| 官网实际访问 | PASS：21 项 | `gallery-report.json`；1440/390×明暗；全部 88 个真实预览，无浮层泄漏；键盘卡片、安装/示例链接、两份指南真实剪贴板、页面/console/network 无错误。 |
| 组件初始几何 | PASS：352 页，0 问题 | `final-audit.json`；1100/390×明暗。全量后只修正 3 个快捷键高亮字色，`final-shortcut-audit.json` 对该 3 组件×4组合的 12 页复验 PASS。 |
| 组件行为 | PASS：57 项 | `component-runtime.json`；NumberField/NativeSelect 实际尺寸覆盖、真实 FileList/FormData、Combobox 长标签焦点、继承 disabled、侧栏关闭返回、纵向 ToggleGroup、日期约束、折叠草稿、嵌套键盘、Toast 后续动作、短视口导航；390/320 coarse OTP 44px 和最后一位可达。 |
| 弹层与代码展示 | PASS：32 项 | `overlay-runtime.json`；390/1280×明暗，Menu/ContextMenu/Command 高亮文字、长菜单标签、长 Dialog 标题避让关闭、关闭焦点返回、代码行顺序与内部滚动。 |
| 初始可见文字 | PASS：176 页、6986 个实测样本，0 FAIL | `text-contrast-after.json`；另有 66 项 UNVERIFIED，涉及测量器不能解析的组合。未展开浮层、disabled、占位伪元素、图形边界不属于此扫描结论。后续高亮修补由上述展开状态复测覆盖。 |
| 占位文字 | PASS：74 个样本 | `placeholders-after.json`；实际存在且可见的空值/placeholder，最小 4.96:1；没有样本的部位不宣称测过。 |
| 六任务模式 | PASS：138 项 | `test-results/task-patterns/report.json`；完整状态、中文/长内容/窄屏、返回与恢复；合成业务状态不代表真实后端。 |
| 主题与 token | PASS 74；NOT_RUN 4 | `test-results/ui-foundations-final/runtime.json` 与 `docs/token-ledger.json`；最终源码指纹一致、无 stale，24 张截图。4项为细指针环境不满足粗指针前提；另有真实 coarse 模拟通过。 |
| Studio | PASS：11 项 | `test-results/studio/run-ajetKv/report.json`；两文档隔离、实际浮层、应用/冲突/草稿与乱序响应，owned server 和浏览器关闭。 |
| 实际安装 UI tgz | PASS：4 个消费者 | `test-results/packed-consumers/run-xInMNx/report.json`；Tailwind / 预编译 × Button-only / full，分别安装、TS、build、真实浏览器与文字/触屏模拟。 |
| 来源与公开边界 | PASS（指定规则） | 57个 upstream 登记源未改、29个派生源更新真实 hash/说明；根指导文件校验、事实台账测试、进程退出测试、diff check PASS。208份公开文本与398文件UI包未含检查的本机路径/内部实施目录；`public-projection.json`。 |

以上未列完整路径的本轮证据均在 `test-results/home-renovation/`。每个浏览器按唯一 owner 串行运行并记录关闭；默认本机预览沿用同一个 task-owned server，不关闭其他任务或用户浏览器。真实 IME、物理触屏、读屏、所有自定义主题和人工审美仍未由这些测试证明。外观与真实契约变化已汇总到 [消费说明](2026-10-02-release-notes.md)。
