# W12：受限 AI 实现试验

目的：比较相同组件版本下，旧 README/catalog 与新 design/catalog/已构建 CLI 资料对四个固定实现任务的影响。每类 baseline/new 各 3 次，共 24 个独立 GPT-6.1-sol / xhigh 试验。此处只建设夹具与判定器；模型调用、预算执行、时间记录和全部试验由 root 负责。

这是受限夹具的小样本，不是通用 AI 编程能力测量。不能把它概括为某组模型全面更好；不能删掉失败、未完成或资料/环境失效的试验。

## 固定任务

| 任务 | 可改文件 | 客观判定 |
|---|---|---|
| t01 资料编辑 | state.ts、Editor.tsx | 实际类型检查；草稿/提交快照/迟到响应/明确错误/未知核实/返回；RTL 驱动真实 Field/Input/Textarea/Button 与注入 API |
| t02 集中字段间距 | theme.css | PostCSS 声明检查、真实 DOM selector 匹配及有限 custom-property 级联/var 求值；Sentinel 三轴组合 12px、其它品牌 20px；固定消费者真实 FieldGroup 角色消费 |
| t03 批量处理 | state.ts、BulkPanel.tsx | 跨页 IDs、查询集合、确认失效、等待、迟到结果、仅明确失败重试、未知保留；RTL 实际 API payload |
| t04 上传流程 | state.ts、UploadPanel.tsx | 真实 FileUpload 文件输入/进度/错误/行内动作；传输 100% ≠ 完成、处理、请求取消、确认取消、迟到成功、失败保留及重试 |

四类 starter 位于 `scripts/ai-eval/tasks/`，task.md 是完整公开合同。必须修改代码；仅回答方案不满足“实施”。允许各自 work/report.md，但报告自评分不参与判定。验证没有外部 API、key、网络、浏览器或模型依赖。

类型检查使用可信 TypeScript program API，直接针对当前库源码和严格编译选项；不接受提交者的 tsconfig、依赖或测试配置。invalid-import 来自 TS 2305/2307/2614/2724；invalid-prop 来自 JSX 节点归属下的 TS 2322/2353/2769。其它诊断单独保留。不是正则查“是否出现 Button”或模型自评。

隐藏断言在 `scripts/ai-eval/private/`。root 不向试验 agent 提供这些文件、参考实现、evaluate/selftest 源码或评价输出。先完成/封存该次代码，再运行隐藏验证；不得依据隐藏失败给同一试验修正机会。若研究修正成本，另存修正副本并记录人工修正数，原提交和首次失败必须保留。evaluate 保留已有 result.json 到 result-history 后再写当前结果。

## 资料冻结与公平边界

- baseline 从 `git show f0de47747040dfe98d58598c0b5039bf2baed0ba:README.md` 与同 commit 的 catalog 抽取。仅保留该任务相关组件；组件目标仍是当前源码，避免版本更换造成混淆。
- new 从冻结时的 design.md、当前 schema 2 catalog 相关组件/模式及实际已构建 CLI docs 输出抽取。CLI docs 必须返回 PASS，否则抽取失败。新资料中已公开的真实示例属于实验处理，不是假称所有状态经过验收。
- 两组 task.md、starter、模型、reasoning effort 和实际 root 预算相同；只改变 guide/catalog/CLI 资料能力。组名/绝对路径/工具可用性使包装 prompt 文本有所不同，task/fixture SHA 必须相同。wrapper 仅开放当前任务分配的 docs subjects。
- 抽取 manifest 记录原始 guide/catalog SHA、当前目标源码/token/CSS/package SHA、版本、每份分配资料 SHA。prepare 把资料复制到每个试验目录；evaluate 校验资料及目标未变。快照不随后续 docs/catalog 重生成而重写。
- 若当前 catalog 后来重生成，tool wrapper 返回冻结时由真实 CLI 得到的 docs 输出，防止进行中试验悄悄获得不同资料。冻结输出与 live CLI 可用性的差别应在报告中保留。本实验的可执行工具面限于 docs 查询；不评价完整 theme/impact/check 工具效果。
- 若组件源码/token/CSS/package 变更，prepare 拒绝混用资料，evaluate 标记 UNVERIFIED；应新建批次并重跑受影响比较，不能称两组面对相同目标。
- root 必须使用全新上下文（spawn fork_turns=none），不传父任务历史、其它 trial 输出或 hidden 结果。组别交错，避免固定先后顺序。prepare-matrix 生成交错顺序但不调用模型。
- 读写限制由提示和 root transcript 审计执行；本机 shared workspace 不是 OS 级隔离。工具执行入口可运行但源码不可读取。越界读取/写入若没有 transcript 证据，记 null，不能编造“零次”。

## 运行命令

均在仓库根目录执行，不启动浏览器。

先构建/生成最终资料（由 root 负责），然后各冻结一次：

```sh
node scripts/ai-eval/extract-materials.mjs --group baseline
node scripts/ai-eval/extract-materials.mjs --group new
```

默认目录已有快照时拒绝覆盖。新批次可用 `--output /absolute/path/to/materials/new-batch`；单次 prepare 使用 `--materials /absolute/path/to/materials/new-batch/t01`。本次默认 baseline/new 已抽取成功，可直接使用。不要因随后补文档而改写已开始批次。

单次准备与交付入口：

```sh
node scripts/ai-eval/prepare.mjs --id b-t01-1 --group baseline --task t01 --replicate 1
node scripts/ai-eval/prepare.mjs --id n-t01-1 --group new --task t01 --replicate 1
```

生成 `scripts/ai-eval/runs/<id>/prompt.txt`。root 将它的全文作为全新 agent 的唯一任务 payload；agent 只读取 input/task.md、materials/*、work/*。允许文件列表由任务固定，不允许添加依赖/组件副本/测试配置。trusted check-types 命令会出现在 prompt；new 组额外出现 docs wrapper 命令。

如尚未准备任何同 cell 试验，也可一次生成 24 个输入：

```sh
node scripts/ai-eval/prepare-matrix.mjs --batch w12-20261002 --budget-seconds 900
```

预算数字应与 root 实际执行策略一致。可加 `--budget-tokens N` 记录真实可执行的同等 token 上限；若平台不能执行，不应填入虚构上限。harness 不调用模型，不执行模型预算限制。必须由 root 对两组同样执行。

root 在 dispatch 前和完成后计时：

```sh
node scripts/ai-eval/record.mjs --run b-t01-1 --event start
node scripts/ai-eval/record.mjs --run b-t01-1 --event finish
node scripts/ai-eval/evaluate.mjs --run b-t01-1
node scripts/ai-eval/summarize.mjs
```

能完整审计工具数量时，finish 可加 `--tool-calls N --human-corrections N --transcript /absolute/path`。未采集的 elapsed/tool/humanCorrections 为 null。自动 observedHarnessToolCalls 只数可信类型/CLI wrapper 调用，不能替代全部工具数。

evaluate：exit 0 = PASS，1 = FAIL，2 = UNVERIFIED。类型错误、已执行行为断言失败或已知写入边界违规属于 FAIL；环境加载失败/未运行与资料或目标漂移属于 UNVERIFIED，不计为通过。检查细项各自保留 PASS/FAIL/NOT_RUN。汇总按四任务 × 两组 × 三次保留全部 24 cells，缺项 NOT_RUN、重复项 DUPLICATE，不挑选最好一次。

## 结果与证据

每次保留 manifest.json、prompt.txt、分配资料、原始提交 work/*、telemetry.json（如采集）、result.json 与历史。结果 schema 在 `scripts/ai-eval/result.schema.json`。

结果包含：无效 imports/props、所有类型诊断、输出目录越层/散落修改、状态丢失失败、假成功失败、断言失败、人工修正、模型任务用时、工具数、实际 wrapper 数、资料/目标/夹具哈希、每条断言状态/错误和运行环境错误。stateLoss/falseSuccess 是预先标记测试失败数量，可能与 assertionFailures 重叠；不是生产事故次数。

work 文件与固定消费者可以机械审计。其它工作区写入、禁止资料读取依赖 transcript；不能仅凭 git diff 归因，因为其他 agent 同时工作。result 的 boundary PASS 只覆盖 output 文件检查，不表示全盘隔离通过。

t02 使用 AST、实际 selectors 与有限变量级联求值，不执行完整 CSS 浏览器布局。条件媒体、复杂层叠/选择器、实际控件高度/命中区/computed geometry、真实浏览器、AT、视觉质量、输入法、真实服务端幂等和网络重试均未验证。其它三类的 Promise/RTL 是固定 injected API 与 jsdom 证据，不替代真实业务接口和终端接受测试。

## 判定器自测

```sh
node scripts/ai-eval/selftest.mjs
```

自测只运行本地参考代码，不调用 AI。四份正确参考实现必须 PASS；四份预植缺陷必须 FAIL：保存覆盖较新草稿、全局间距/控件 token 串改、未知项被纳入重试、取消未确认即标记已取消。另运行两项真实编译器探针，确认无效 import 与 prop 可分别计数。结果在 selftest-results/，生成的参考 run/evaluation 属于验证者私有，不分配给模型。

最终自测结果与实际 24 次模型结果须分开报告。参考自测通过只说明此判定器能识别这些固定缺陷，不说明任意 AI 实现或真实页面已经通过。

2026-10-02 最终执行：`selftest-results/self-0611b23c.json`，四份 good 均 PASS（共 26 条行为测试），四份 bad 均 FAIL（分别 2/2/4/2 条断言失败），invalid-import/invalid-prop 两个 TypeScript 探针各识别 1 个实际诊断。baseline/new 抽取与冻结 CLI docs wrapper smoke 均 PASS；prepare-matrix/record 语法检查及限定路径 diff-check PASS。前期异目录 Vite 配置加载失败的自测记录保留，最终运行已修复。未执行任何模型或浏览器调用；24 次独立模型结果由 root 另行汇总。

## Root 评估器修正记录

首个编辑 trial 使用合法的 `@qingye/ui/components/*` 子路径时，旧评估器只允许根入口，并缺少相应 Vite alias，导致误判边界及无法加载。root 根据已发布 exports 扩展合法 JS 子路径与测试解析；未修改模型提交、任务合同或行为断言。首次修正遗漏生成配置的一处右花括号，导致一次配置加载失败，也保留在 result-history。修正后原提交通过全部断言。新增正确子路径与错误私有路径两项判定器回归；`self-fe0a301a.json` 中 5 份正例 PASS、5 份缺陷/非法路径 FAIL，真实 TS import/prop 探针继续通过。环境失败、评估器误判与模型错误必须分开解释。

本次前几次试验未采集独立 dispatch/completion 时间，保留 null；后续记录的是 root 发起至观察完成的墙钟区间，含调度/通知延迟，不是有效编辑时长。平台未提供统一可强制的 token 上限和逐次完整 token/tool 使用统计，预算字段留空。因此不能据此声称严格等预算提效或比较有效工时。固定任务/骨架、目标组件、模型、effort 及独立上下文一致性可由保存记录核对。

## 组件目标的冻结

初次12个比较完成后，独立包浏览器发现库的 reduced-motion 与 Input 自动填充过渡叠加造成文字颜色缓慢更新。产品必须修复，同时不能静默更换试验目标。root 在修复前按原始 source SHA-256 `3917aa87202a547497226491e732082892e3d00f17b50194a5c770868addb991` 保存 `scripts/ai-eval/target-ui`，逐字节核对其 src/tokens/package/CSS 与全部已准备 trial 的 fingerprint 相同。此后的可信类型/行为检查都指向该不可变测试快照，两组仍使用同一个初始组件目标。`target-ui` 只用于评估，不能作为应用组件入口或第二产品实现。

在全新 checkout 运行评估前，先按根 lockfile 安装，再将 `target-ui/node_modules` 链接到 `packages/ui/node_modules`；这个链接是本地依赖，不入版本。冻结的 package 仍声明该组件版本，但不代表最终产品修补后的全部代码。新组的资料也保留初次冻结内容，没有用后续编辑示例修补替换进行中的实验资料。结果只适用于该固定目标和资料，不声称已经测出最终资料的净提升；最终产品的正确性由独立 unit/browser/installed-package 检查证明。

### 批量任务判定器复核

root 检查原始失败后发现三项判定器偏差：公开合同没有要求结果返回后必须消耗 confirmation，却被隐藏测试强制；pure-state 测试给 `a,c` 的请求注入未在范围中的 `z`，又要求保留它；文本选择器假定“结果待确认”只出现一处/每项恰好一处，误判同时提供汇总与逐项结果的实现。root 修正为范围中确实含 z、只检验已公开的约束、分别验证 a/z 的未知反馈与禁止失败项重试。原模型提交、资料、任务及首次 result-history 全部保留。

更新后的判定器自测 `self-e62c8e0f`：五份正确实现 PASS，五份预植缺陷/非法路径 FAIL，两个真实 TS import/prop 探针继续识别。六次 t03 原始提交统一重新评估；最终结论以修正后的结果为准，首次偏差不能当作模型错误。未公开约定的“结果后是否需要重新确认”不能用隐藏测试补充合同。全部模型完成前未向其提供这些诊断。


最终选择器继续按公开合同修正：逐项反馈可以使用资料标题或 ID、可以跨内嵌 span；上传“请求取消”按钮可以在可访问名称后附文件名。之前的精确字符串匹配会误判这两种合法无障碍实现。已统一修正所有相关 trial 的评估，原始失败保留。规则不豁免取消确认、未知保留、请求 payload、重复调用或丢失状态断言。

最终判定器自测：`self-a88b9dde` PASS，5份正确参考PASS、5份预植缺陷/非法路径FAIL，两个TS探针继续通过。最终24次原始模型提交全部通过；新旧资料在此批固定断言上无差异，见 [结果](ai-eval-results.md)。
