# 来源收尾：M 删除裁决与重新取证

2026-10-03，M。Status：**取证门禁与 M 范围 API/包验证 PASS；全仓引用收尾 FAIL，待 owner 接手**。下面的 M 裁决更新当前处理方式；H 的 FAIL 证据与当时保留决定在后文原样保留。

## M：先定语义与关系

当前 `useIsMobile` 没有仓库内运行消费者，只有声明与专属测试引用。用户明确页面只做桌面；`useMediaQuery` 已完整提供媒体查询能力。按根 [design.md「判据一：删去检验」](../../design.md#判据)，删除这个无独立用途的便捷导出不会损害当前理解、执行、保护或协调关系。

**决定：删除 `useIsMobile`，这是破坏性公开 API 变更。** 同时删除只调用该导出的测试用例及其 import；仍保留 `useMediaQuery` 的 `max-md` 查询、SSR/hydration、订阅更新与清理、无 API 和旧浏览器路径测试。删除理由是 API 不成立，不是改写相同实现体或降低 H 的门禁。库内既有窄屏 token 与尺寸约定不随此决定修改。外部未登记消费者未验证；若使用该导出，可显式调用 `useMediaQuery("max-md")`，仅报告宽度匹配，不断言设备身份。

重新取证覆盖当前全部 `packages/ui/src/**` 与 7 份 CSS，沿用 H 的 AST class token、标识符、非空行 difflib 与相同行人工判读。签名、import、括号及公开原语组合样板可以排除；任何其他实质逻辑或完整样式串逐字相同即 FAIL，停止来源文件删除。通过前不更改许可完成表述。冻结副本仅用于只读比对，不作实现来源。

可选方案已拒绝：保留无消费者的 API；改名、换行或重排实现以降低重合；用 `source: "local"` 或比例阈值代替实质判读。来源清单删除后的实际读取方必须同步处理，不能以无条件忽略缺失文件掩盖断裂。若需要新增范围，先取得明确授权；历史报告与仓库外材料继续保留。

## M：重新取证与删除决定

快照为 2026-10-03T13:49:01.909Z（北京时间 21:49:01），HEAD 为 `275d7300496dbda93c25899ea6e4eab6720cf31c`。覆盖 20 个组件、27 份 src 文件、7 份 CSS，共 34 份当前文件；读取 57 份冻结原文，其中 18 份有同名当前文件。AST 解析诊断为 0；15 个仍有清单指纹的对应冻结文件全部匹配。相同行与 3 个完整 class 字面量经过人工判读后，仅为签名、透传/原语组合及短通用工具类，与 H 的排除口径一致。删除 hook 后，当前 `useMediaQuery` 不再包含 H 的实质阻断行。详细数字与指纹写入 [M 报告](../implementation/2026-10-03-batch5-m-provenance.md)。

**按本任务门禁，允许删除三个来源文件与分发入口。** 无对应冻结原文的 16 份文件保留 `UNVERIFIED`：扫描已覆盖其当前内容与 HEAD，但本库 HEAD 不能替代上游原文，不据此声称全部历史作者独立性已得到证明。冻结比对通过不改变外部依赖自身的许可；本库的 MIT 许可正文继续分发。

额外引用包括两个根脚本、两份 LICENSE 末尾的来源说明、官网介绍/导航/metadata 类型，以及 theme.css 的历史来源注释。它们不在原 M 清单，正在请求必要范围授权；未获授权前不改这些文件，不把引用清理写成已全部完成。`gen-catalog.mjs` 不读取来源清单，当前 20 份组件 metadata 已全部为 `local`，无需把投影规则改成无条件改写来源。

三来源文件及包内 files/check:upstream 入口已删除；两份 README 已更新公开 API 与许可说明，AGENTS 保留禁止复制上游规则及仓库外证据位置边界。**尚未采用“完成来源收尾”句式**：实际调用 `generateCapabilities()` 因读取已删清单报 ENOENT，LICENSE 仍有过时附注；原 M 所有权不足以完成这部分。范围澄清尚无答复，不把无回复当批准。

验证：删除后 UI typecheck PASS，唯一一次 build PASS，最终 `pnpm --filter @qingye/ui test --maxWorkers=1` 为 31 文件/465 测试 PASS；默认并行测试曾有生成投影/Select 失败、随后有编译测试超时，完整日志保留，不放宽断言。`npm pack --dry-run --ignore-scripts --json` 确认123个包文件中不含两来源文件或检查脚本，实际构建 JS/类型声明无 useIsMobile，useMediaQuery 仍存在。34份源码/CSS及57份冻结原文最终指纹无漂移。包清单通过不等于所有正文引用已清理，外部消费者/安装/发布未验证。

重新审视条件：主 agent/owner 清理报告所列10份清单外文件并验证事实生成器；任何后续源码/CSS改动需重核对应来源门禁。仓库外冻结与归档原样保留，历史报告不删除。全部引用完成前，来源收尾整体保持 FAIL。

## H：当时的交接记录

2026-10-03。Status：**FAIL（来源收尾条件），声明未删除**。这是 H 的取证交接，不是已经完成来源清理的决定。

## 语义与关系

本次处理的是 Qingye 当前分发内容是否可以脱离 coss 来源声明。组件按 [design.md](../../design.md) 重新设计、删除来源注释、metadata 标成 local，均不能单独证明实现来源已经改变。公开 API、无障碍原语的透传样板与具体实现体分别判断，不能用相似度阈值替代逐项判断，也不能把 HEAD 中的本库原有实现自动归为 coss。

用户为 H 指定了先取证后删除的门禁：实质逻辑或样式串逐字相同，按本次任务判为派生，保留声明并交回主 agent。冻结上游仅供只读比对，不作为组件实现或设计值的来源。

## 本轮决定

**保留 `packages/ui/THIRD_PARTY_NOTICES.md`、`packages/ui/coss-source.json`、`packages/ui/scripts/check-upstream.mjs` 及其包内引用。** 不把 AGENTS.md 的条件说明改成“已完成”，不清除 README 的来源段落，不将现存来源字段强制改成 local。

阻断证据是 [use-media-query.ts](../../packages/ui/src/hooks/use-media-query.ts#L58) 的 `useIsMobile` 实现体：

```ts
return useMediaQuery("max-md");
```

当前文件第 58 行与冻结 `upstream-repo-copy/use-media-query.ts` 第 95 行逐字相同；排除公开签名及闭合括号后，这仍是整个 helper 的实现体，包含选择 `max-md` 查询的实际行为。按 H 的保守门禁，列为**派生阻断项**，不自行把它归入签名例外。它不能以改变量名或换排版消除证据。

这是本任务的删除门禁结论，不是依据一行短程序作出的法律裁判，也不能证明作者确实读取或复制了上游。已有 [Tooltip/hooks 重写决定](2026-10-03-tooltip-hooks-rewrite.md) 记录了独立编写流程及选择 max-md 的理由；当前 md=768px、上游 md=800px，实际查询阈值不同。这些事实保留供主 agent 判断，但不由 H 擅自扩大用户指定的样板例外。

其他同名文件的相同行主要为公共签名、Base UI 组合/透传和短通用 class。Card 的行覆盖率高于其他组件，检查后其相同行是 useRender/mergeProps 的公开组合样板，不能仅凭比例认定派生。逐文件数字、相同行、排除理由和证据指纹见 [H 取证报告](../implementation/2026-10-03-batch4-h-provenance.md)。无对应冻结上游的文件如实标记，不把无对应材料当作独立编写的完整证明。

## 留给主 agent 的边界

- 先处理或裁定 `useIsMobile` 的实现体匹配，再重新按最终源码取证。hook 不在 H 的实现修改范围内，本轮没有改它。
- 来源清理还涉及 H 文件列表外的真实消费者：`scripts/gen-capabilities.mjs` 读取 `coss-source.json`，`scripts/lib/ui-facts.mjs` 把它加入指纹输入，官网 introduction/types/nav 仍说明或表达 coss 来源。门禁通过后须由相应 owner 同步处理，不能只删清单导致生成器失败。
- `gen-catalog.mjs` 不读取来源清单；其 `source` 来自组件 metadata，`extras` 筛选 local。当前投影规则与测试均未修改，不能说已完成新的来源字段验收。
- 本轮没有 build；用户要求遇到派生证据停止删除，故未进入删除后的最终构建阶段。pack 只运行 `--dry-run --ignore-scripts`，避免 prepack 隐式构建；两份来源文件仍在包清单内。

## 仓库外证据保留

以下位置保持原状，未删除、未修改；本轮只读取第一项的文件正文：

- `/Volumes/SUNSANG 1/Codex/qingye-provenance-freeze/upstream-repo-copy/`：冻结上游原文，本轮 57 个文件的只读比对依据。
- `/Volumes/SUNSANG 1/Codex/qingye-provenance-freeze/repo-copies/`：既有决定记录的仓库来源材料备份，本轮未读取其正文。
- `/Volumes/SUNSANG 1/Codex/qingye-ui-archive/2026-10-03-pending-rewrite/`：待重写组件与配套资料归档，本轮未读取组件源码。

这些目录用于来源证据与历史记录。删除它们须由用户另行决定，不包含在本次来源收尾授权内。历史报告和决策中的来源提及也保留原样。

## N：来源尾项的语义与关系（实施前）

2026-10-03。N 获得本轮题面列出的来源文件、生成器、LICENSE、官网描述与 CSS 清理授权；它覆盖 M「清单外引用交接」的剩余范围。只读当前仓库，不读取冻结副本或归档组件源码，也不重新解释 M 的逐字取证结论。

依据根 [design.md「删去检验」](../../design.md#判据)：六个旧动画没有当前消费者，已删除的组件不再需要专属动效。删除 theme.css 的整段六个变量与六套 keyframes，删除 motion.css 内指向已判删除的 skeleton、sheet、disclosure、frame、preview-card、spinner、command、menubar、resizable 的选择器；归档待重写组件的选择器保留。实施前 grep 在 src、motion.css、utilities.css、styles.css、tokens 中无六动画命中（exit 1，非读取错误）。未来 OTP 重写自行判断光标行为，不恢复这段 CSS。此项按授权删除既知上游派生内容，不以删来源注释冒充来源证明。

当前 metadata 的 source 全为 local。保留该字段及 catalog 的来源投影，只将类型收窄为 local，避免无必要改变 catalog 消费契约；生成器校验当前来源，拒绝缺失或不符的分类。能力事实生成器移除已删除清单及其匹配、计数、注释扫描，按当前本库编写事实输出；缺少真实输入仍抛错。PASS 仅表示静态目录一致，UNVERIFIED 与 NOT_RUN 不转为成功，来源标签不构成独立历史作者证明。

两份 LICENSE 只删除末尾两行过时附注，MIT 正文保留。官网来源写为依据 design.md 编写、Base UI 公共原语承担相应可访问行为；不声称已归档能力仍可用。conventions 仅改过时注释，原规则、例外集合与断言不变。运行授权的类型检查、测试、一次库 build 与忽略 prepack 的 pack dry-run；后者避免隐式第二次 build。生成产物仅由授权命令刷新，历史资料与范围外文件不手改。最终结果及每条 grep 保留理由将记入 N 报告。

## N：来源尾项完成记录

2026-10-03。**N 授权来源尾项 PASS**。上述 M/H 段落保留各自当时证据；其“清单外引用待收尾”状态现由本节更新。完整删除边界、逐条 grep 保留理由、既有断言处置与日志见 [N 报告](../implementation/2026-10-03-batch5-n-provenance-tail.md)。

六个动画变量与六套 keyframes 已整段删除；删前指定消费者范围无命中，删后保留主题声明及动效目标/值/媒体上下文的 AST 对照通过。motion.css 中 skeleton、preview-card、command、sheet 部位已删，其余指定已删除组件无选择器；归档待重写组件的选择器保留。两份 LICENSE 的 MIT 正文逐字保留，过时两行附注已删。未来 OTP 的光标决定由重写任务承担。

旧清单读取、来源匹配分支和 coss 计数已移除。事实生成器可运行：20个组件、357个 qy token；当前组件/catalog/dist/local 均20，静态一致性全部 PASS，独立来源比较明确 NOT_RUN。缺 metadata/必要指纹文件抛 ENOENT；分类错误或缺 catalog 项保持 UNVERIFIED，无 dist 保持 NOT_RUN。source 类型收窄到 local，20份 metadata 不变，catalog 投影契约保留且生成器新增分类校验。官网来源与注释已经同步；conventions 的规则、例外与断言未变。

UI typecheck PASS；31文件/468测试 PASS；唯一一次库 build PASS（20组件、0 patterns、76.5KB CSS）。packages/ui 下 pack dry-run 用 ignore-scripts 避免重复 build，123文件含1076字节 MIT LICENSE，无已删来源文件或旧动画。构建后范围 grep 只保留两条普通 upstream 用语：gen-catalog 的安装版本优先约束，以及 design-guidance 的前置数据流说明，逐条理由见报告。

**官网 typecheck 仍 FAIL，125条既有诊断**，构建前后均如此。保持当前其余工作区/依赖、用 CompilerHost 代入 N 修改前快照后，全部125条诊断逐项相同，N 未引入新的类型错误。官网外壳、浏览器验收与发布不纳入来源尾项完成状态。M 无对应原文文件的进一步独立来源证明继续 UNVERIFIED；没有读取或修改冻结/归档源码，没有把标签或本轮删除冒充完整历史作者证明。
