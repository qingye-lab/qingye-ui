# Qingye UI 改造执行记录

**记录阶段：实现及独立审查修复后的本地验收完成，待人工验收；用户已授权提交并推送 main。远端状态以提交关联 CI 为准，本轮不创建发布 tag。**

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
