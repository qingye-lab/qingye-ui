# Batch 3 F：Toast 重写

2026-10-03。已从语义与关系重写 Toast，保留现有导出/Provider 类型入口。**PASS：55 条 Toast 测试、7 条组件约定检查、库 typecheck、11 个范围内 docs 文件编译和桌面操作链。** 全站 docs typecheck 为 **FAIL：156 条范围外诊断**，未将其列为通过。

## 读取、范围与来源

开工 HEAD `275d730`；工作区已有大量归档与并行重写改动，保留其现状，只修改本任务指定文件。先写[决策](../decisions/2026-10-03-toast-rewrite.md)，再写代码。读了 AGENTS、根 design、STANDARDS、基础层、逐值裁决、动作/浮层族文档与 Batch 2 A/B/C 报告。

现有 `toast.tsx` 只通过 TypeScript AST 输出声明名、函数参数/props 类型与导出：两个 Provider、两种 Props、ToastPosition、两个 manager、ToastPrimitive，以及私有 ToastData 的兼容入口。没有输出或参考函数体、className、样式；没有读取归档组件源码或 provenance-freeze。读取了当前本库的 toast 测试作为用例意图；Base UI 1.7.0 的声明与 Toast 原语实现用于核实可访问行为、暂停、Promise、Action 的事件合并；官方 Toast 文档仅核对公共能力，不采用其视觉示例。

本批写入：toast.tsx、toast.test.tsx、Toast metadata 和九个 demos、新建 `sections/30-toast.tsx`、两份任务文档。共享 locale 只新增 `toastSuccess` 的类型/中文/英文；写前立即重读，写后反向删除该插入核对与写前文本完全一致，未覆盖已有键。自定义完整 UILocaleMessages 需要补此键。

没有删除导出，没有改其他组件、token、motion.css、DesignReview 或 review-main。没有写生成副本、运行 build/gen、改来源记录、提交或发布。

## 实际契约与表达变化

- waiting / in-progress / unknown / failed / success 使用与 Button 一致的状态词汇；loading / error 保留为进行中/失败的兼容类型。未知不称为失败或完成。
- 等待、进行中、失败、未知强制持续，不接受 timeout 自动消失。普通通知与成功保留 Provider 默认 5000ms；Promise 成功回到该时限，手动 update 离开持续状态须给出结果 timeout。
- loadingTimeout 保留 30000ms 默认预设；到期只改 type/timeout，不污染应用标题、说明、操作和对象。局部超期说明在真实结果到达后消失，同批真实结果优先；应用确认的新等待阶段得到完整的新期限。
- 默认文字 `role=status` / polite / atomic；应用明确 high 才由 Base UI 的 alert 播报。聚焦高优先级通知时文字承担 alert，超期的不确定性另以 status 播报。Viewport 关闭整区 live，避免操作入口重复播报。
- Base UI 管理通知、锚定、F6、Esc、关闭、焦点和暂停。应用管理真实结果、核对、重试、撤销与取消；关闭通知不取消后台任务。
- 取消压缩堆叠、局部阴影、高光及成功/错误重播动画。完整列表使用 raised 表面与已有强边界；原语 limit 仍隐藏/inert 超额根。anchored 保留，tooltipStyle 只收紧内缘，完整说明和关闭仍在。
- `motion.css` 的 fade-in 负责原位进入，当前共享预设180ms；退出移除该属性并即时结束，没有第二套局部动效值。减少动态效果后状态、核对和关闭仍可用。
- Action / Close 组合库 Button，保留尺寸/narrow、命中和焦点机制；根有边框，聚焦只变色不加粗。下载使用合法原生链接 + cn(buttonVariants)，保留链接语义与本库焦点机制。

以上是明确的行为和视觉变化，不以“重构”掩盖外观影响。具体时限、位置、完整列表、强边界、内缘、圆角与层级均在决策中记为选择或预设；不是从理念唯一推出数值。

## 桌面真实链与关键后果

审查地址 `http://127.0.0.1:5180/review.html#toast-review`，1280×1000，一个浏览器/一个页面，主题与状态串行。

报表页提供三个确定的本地服务情形：文件生成、已确认校验拒绝、响应未到达。它们是可重复验证的服务 fixture，不是生产服务验收。

| 路径 | 观察 |
|---|---|
| 进行中→成功 | Toast 报进行中，应用确认后产生实际 CSV；下载 `十月支出汇总.csv`，内容为研发586/128400、运营412/76300、客户支持288/42500三行汇总。 |
| 进行中→失败 | 确认校验失败，通知与任务页保留“运营第18笔支出缺少日期”；关闭通知后页面仍可核对和重试。 |
| 进行中→未知→核对成功 | 响应未到达，未知持续；关闭后核对入口与未知事实仍在页面，核对原任务得到真实结果并生成CSV；已经关闭的通知不复活。 |
| 永久删除归档副本 | 操作前后果可见并关联 danger Button，输入对象名后才能执行。执行后页面持续显示“共享链接已失效”，Toast 数量0。 |

几何：根页面 scrollWidth/clientWidth 同为1265px（视口1280含滚动条），段落宽832px，未知通知402×132px；所测状态无水平溢出。最终浅深色截图已目检，标题、长说明、核对与关闭均在完整通知中。

## 测试与断言处置

开工本库 Toast 测试32条，保留全部用例意图；新增23条，共55条。覆盖七种状态/兼容类型、默认礼貌和显式紧急播报、失败/未知/等待持续、关闭、悬停与焦点暂停、期限不被暂停、Promise成功/失败/超期未知及迟到结果、同批结果优先、当前输入焦点/草稿、关闭后不复活、新等待阶段期限、anchored。

| 既有断言改动 | 理由 |
|---|---|
| unknown 图标的 `lucide-info` 改为 `lucide-circle-question-mark` | 问号独立表达不确定性；仍保留非旋转、不冒充成功的断言。 |
| tooltipStyle 成功后“不存在 description”改为精确保留“设备 #41” | 决策明确紧凑样式不删除对象说明，两种 anchored 呈现均精确核对原应用内容。 |
| 其余既有断言 | 不修改、不放宽、不跳过。Action 点击一次的原断言原样保留。 |

初次 Action 测试发现重复执行：Toast.Action 自己已消费 actionProps，本批又显式 spread，事件合并后执行两次。删除重复透传修复，保留一次调用断言。新增的移除检查按原语异步生命周期等待动画/帧完成，不假设 click 同步卸载；未删掉最终移除断言。单元 focus 只验证焦点行为，不宣称 focus-visible；浏览器样式一律用真实 Tab 后等待600ms。

浏览器自检还修复两处本批引入的消费问题：下载链接最初错误地用 nativeButton=true 的 Button，改为原生链接与公共样式组合；`text-foreground-muted` 没有当前主题映射，改为 `text-muted-foreground`，随后重新跑完整操作链、对比及局部 token 修改探针。不是只凭源码引用数记通过。

## 验证结果

| 检查 | 状态与实测 |
|---|---|
| `pnpm --filter @qingye/ui typecheck` | PASS，最终0 diagnostics。 |
| `pnpm --filter @qingye/ui exec vitest run test/toast.test.tsx test/conventions.test.ts` | PASS，Toast55 + conventions7 = 62条。 |
| `node /tmp/qy-batch3-f/check-scoped.mjs` | PASS，Toast metadata、九个demos、审查段落共11个root files，按真实docs配置解析当前库源码，0 diagnostics。 |
| `pnpm --filter docs typecheck` | FAIL，156条范围外错误，主要为外壳/示例引用已归档组件；本批Toast目录和30-toast诊断0。 |
| 55条Toast断言与既有用例意图 | PASS；两个既有表达断言的变更理由如上。 |
| 真实Tab焦点：light/dark | PASS；根1px边框变色、无shadow；Action1px边框不加粗、无非零扩展shadow；Close0px边框、自盒内1px线。全部focus-visible=true，采集前600ms。 |
| 不抢焦点、F6、Esc | PASS；到达通知后focusStolen=false；F6进入viewport，真实Tab到根/Action/Close；Esc从根关闭，数量0。当前输入保持焦点和草稿另有单元断言。 |
| 进入、退出、减少动态效果 | PASS；正常进入qy-fade-in / 0.18s，无位移缩放；Esc后50ms复查已移除（含自动化开销63ms）；reduce下0s，transform/scale/translate均none，未知/核对/关闭可读可用。 |
| 浅深色普通与辅助文字 | PASS；真实CSS颜色转sRGB、逐层合成后，浅色最低7.69:1，深色最低7.49:1，均按普通文字≥4.5:1检查。 |
| 必要边界 | PASS；相邻内/外表面浅色4.61/4.26:1，深色4.97/5.79:1。 |
| muted token实际消费 | PASS；局部将--qy-foreground-muted改rgb(80,80,80)，状态文字实际变色，删除覆盖后回到浅/深原值。 |
| 最终完整桌面操作链 pageerror / console.error | PASS，所采集的执行区间为0。首次导航有既有favicon404；早期本批nativeButton警告已修复。Canvas读色产生的性能提示属于验证工具，不宣称整个会话零日志。 |
| 范围内 `git diff --check` | PASS。 |
| full suite、build、gen、打包/发布、390px | NOT_RUN，按用户范围留给主任务或明确不做。 |
| 实体读屏朗读、完整强制颜色/RTL/200%矩阵 | NOT_RUN；DOM角色/Chromium不代替实体辅助技术验收。 |

证据位于 `/tmp/qy-batch3-f/`：`targeted-tests.log`、`ui-typecheck.log`、`docs-typecheck.log`、`scoped-docs-typecheck.log`、`browser.json`、`focus-motion.json`、`contrast.json`、实际CSV与浅深截图。普通进入与focus-motion的值另有采集；browser.json记录最终完整链。

## 来源记录交接

**不自行修改 coss-source.json / THIRD_PARTY_NOTICES.md。** 先只读 `git show HEAD:packages/ui/coss-source.json` 的JSON metadata定位来源项；最终复查当前工作树文件仍存在，再直接读取其JSON metadata，未读取上游组件源码。应删除 `components[]` 中以下对象，按 file 定位，不依赖数组索引（当前快照18、HEAD基线19）：

```json
{
  "file": "src/components/toast.tsx",
  "registry": "https://coss.com/ui/r/toast.json",
  "upstreamPath": "apps/ui/registry/default/ui/toast.tsx",
  "upstreamSha256": "6c83bd6ab5a90388aa06380924381058746bf2bd5ebb7b2187496a59e7c517d6"
}
```

删除整条toast来源对象，包括其当前 adaptedSha256 `bd2c4793fdc9136119359d7e93cf49496dd7f2a3ff435407e5c69550b2cd547c` 与 adaptations。另删除 `adaptationSummary.behaviourPriority[]` 中 `{ "file": "src/components/toast.tsx", "corrections": 3 }`（当前快照索引2）。本批只列清单，未修改来源JSON；其他来源项与最终法律文件处置由主 agent统一核对。

按要求执行的原始扫描：

```text
$ grep -rl THIRD_PARTY_NOTICES packages/ui/src
（stdout 为空；exit 1，表示无匹配）
```

本批消除了toast.tsx的派生声明；上述是与其他任务并行后的全目录快照，不能把其他文件的清理归为本批功劳，也不能仅用无声明证明全仓法律来源已完成裁定。

## 浏览器所有权与清理

看到 `qy-batch3-d` 打开时没有启动或控制其会话；CLI list变成no browsers、相关过程结束后才打开F。复用既有Vite PID59950/PPID59927，未重启或终止服务器。

本批 `qy-batch3-f` daemon PID65840/PPID1，Chrome PID65841/PPID65840，专属 profile `playwright_chromiumdev_profile-DuJ4Xi`。全程一会话、一活动页；导航失败/脚本采集失败后继续使用同一连接，未换机制或启动替代实例。已通过原连接执行 close，复查daemon/browser及记录的子进程退出、专属profile匹配的Chrome进程0。没有使用killall/pkill，也没有关闭用户或其他任务浏览器。
