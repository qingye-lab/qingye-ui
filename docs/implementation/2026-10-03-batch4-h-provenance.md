# Batch 4 H：来源取证与删除门禁

2026-10-03。**FAIL：发现实现体逐字相同，停止删除来源声明。** 本轮只新增本报告与 [来源收尾决定](../decisions/2026-10-03-provenance-closure.md)，没有改组件、测试、来源文件、包配置、README、AGENTS、workflow 或生成器。

## 基线、读取范围与边界

- 实路径：/Volumes/SUNSANG 1/Codex/qingye-ui。开工 HEAD：275d730；最近三条提交为 275d730、b93bfe4、9d51f7a。工作区已有大量并行重写、删除与未跟踪文件；原样保留，不提交、不恢复、不 stash。
- 已读 AGENTS.md、design.md、STANDARDS.md、基础层、逐值裁决，以及 action/form/overlay/display/layout/selector 族文档和上一批 A/B/C 报告。历史来源谱系与归档决定只作证据定位，不沿用旧重合度作本轮结论。
- 按 H 专属例外，只读冻结 upstream-repo-copy 中的 57 个上游文件以及 git show HEAD:<path>。本轮没有读取归档组件源码，没有从冻结原文恢复或写入任何实现。报告中的相同行摘录来自当前本库源码，仅作比对证据。
- 第一次扫描覆盖题面所列 14 个组件及其他 src/CSS，共 28 文件。并行期间新增 alert-dialog/dialog/layout/radio-group/select/typography；最终取证扩展到 **20 个组件、27 个 src 文件、7 个 CSS，共 34 文件**。新增文件的所有权仍属对应代理。
- 最终快照：2026-10-03T13:07:35.081Z（北京时间 2026-10-03 21:07:35）；HEAD 完整 SHA：275d7300496dbda93c25899ea6e4eab6720cf31c。结论约束到下表 SHA 指纹，不能外推后续并行改动。

## 删除门禁的阻断证据

当前 src/hooks/use-media-query.ts 第 58 行与冻结 use-media-query.ts 第 95 行完全相同：

```ts
return useMediaQuery("max-md");
```

第 57/94 行的函数签名与第 59/96 行的闭合括号不计实质。排除这两项后，仍有整段 helper 的实现体相同；它选择了 max-md 查询，属于本任务门禁中的实现逻辑。按用户“实质逻辑或样式串逐字相同 → 判为派生，不得删声明”的要求，列为 **FAIL / 派生阻断项**。H 不改 hook，也不通过改名、换行或重排让数字下降。

该结论是删除门禁的保守处置，不是凭一行短程序证明作者复制或给出版权法律结论。E 的 [重写决定](../decisions/2026-10-03-tooltip-hooks-rewrite.md) 记录了独立流程及 max-md 选择；当前 md=768px、冻结 md=800px，行为阈值不同。这些反向证据如实保留，交主 agent 判断，H 不自行扩大签名/样板例外。

因此没有进入题面第 2/3 步：三份待删除文件及所有引用保留；AGENTS 不写“来源收尾已完成”。尚不能发布“全部独立编写已获证明”的结论。

## 方法与数字定义

使用本仓库 TypeScript 5.9.3 的 createSourceFile / AST。每个 TS/TSX 文件提取字符串字面量、模板片段、标识符与原始位置；不是正则扫描整份 TSX 决定规则。

1. class 字符串从 JSX className、cn/clsx/classnames 调用和 cva 的 base / variants / compoundVariants.class 收集；递归解析本文件常量。条件表达式只取呈现分支，逻辑与只取右侧，cva.defaultVariants 和 compoundVariants 的匹配条件不作为 class。未知函数调用不宣称可求值，计数只覆盖 AST 可提取的字面 class；运行时拼接与调用方 class 为 UNVERIFIED。
2. **C** = sum(min(当前某 token 出现次数, 上游次数)) / 当前 class token 总数。字符串按空白切 token，不把 sm: 前缀或任意值机械改名；完全相同 class 串另按原始字面量（含引号）比对。0/0 写 N/A，不写 0% PASS。
3. **I** = 两方同名标识符集合交集数 / 当前不同标识符数。公共 API 与原语名自然重合，I 只用于定位，不作为派生结论。
4. 去除空白行后，使用 Python difflib.SequenceMatcher(..., autojunk=False)。**L** 的覆盖率 = 匹配块行数 M / 当前非空行数 N；**R** = 2M / (N + 上游非空行数)。主口径对每行 strip，另给保留缩进的 strict R。difflib 的匹配块不一定是最大匹配，不将百分比当作版权或原创阈值。
5. 相同行附录是所有相同文本的集合，保留当前/上游物理行号；重排和重复行也列出。它与顺序匹配的 M 不是同一个量。签名、import、独立括号、JSX 透传、原语组合等按内容人工判读，不能用 AST 的 candidate 标签自动裁定派生。
6. 冻结中无对应文件时写“无对应上游”。HEAD 用来辨认重写前后保留情况，不能替代 coss 对照或证明作者来源；ThemeProvider、MotionProvider 等与本库 HEAD 完全相同，不据此指控为 coss 派生。

提取器的临时正反例 **PASS**：提取 inline-flex/items-center、cva 变体 h-4/h-8、compound class font-medium 和条件结果 text-muted/text-body/opacity-64；排除比较条件 search、默认变体 small 以及 v({size:"small"}) 的参数。三个 AST（当前、冻结、HEAD）解析诊断总数为 0。

## 每个文件的结果

路径相对 packages/ui。PASS 只表示本轮未发现签名/样板以外的实质逐字相同；UNVERIFIED 表示无对应冻结材料，不能当作独立来源已完全证明。CSS 的 class/identifier 不适用，均注明无对应上游。

| 文件 | C 相同/总数 (%) | I 相同/总数 (%) | L 相同行/当前行 (%) | R strip / strict | HEAD 相同行/当前行；R | 结论 |
| --- | --- | --- | --- | --- | --- | --- |
| motion.css | N/A | N/A | N/A：无对应上游 | N/A | 104/355；44.26% | UNVERIFIED：无对应上游 |
| src/components/alert-dialog.tsx | 10/35 (28.57%) | 28/50 (56.00%) | 11/57 (19.30%) | 10.48% / 10.48% | 12/57；11.06% | PASS：仅签名/透传样板或短通用 class |
| src/components/button.tsx | 18/161 (11.18%) | 26/145 (17.93%) | 14/217 (6.45%) | 9.12% / 9.77% | 18/217；11.21% | PASS：仅签名/透传样板或短通用 class |
| src/components/card.tsx | 3/9 (33.33%) | 12/13 (92.31%) | 20/28 (71.43%) | 15.81% / 15.81% | 22/28；16.79% | PASS：仅签名/透传样板或短通用 class |
| src/components/checkbox.tsx | 11/39 (28.21%) | 15/29 (51.72%) | 5/32 (15.62%) | 10.31% / 8.25% | 6/32；16.44% | PASS：仅签名/透传样板或短通用 class |
| src/components/dialog.tsx | 12/47 (25.53%) | 36/55 (65.45%) | 13/64 (20.31%) | 9.77% / 9.77% | 15/64；11.03% | PASS：仅签名/透传样板或短通用 class |
| src/components/field.tsx | 8/53 (15.09%) | 20/92 (21.74%) | 14/121 (11.57%) | 14.51% / 10.36% | 15/121；8.98% | PASS：仅签名/透传样板或短通用 class |
| src/components/fieldset.tsx | 1/16 (6.25%) | 10/18 (55.56%) | 17/38 (44.74%) | 50.75% / 50.75% | 18/38；45.00% | PASS：仅签名/透传样板或短通用 class |
| src/components/input.tsx | 13/95 (13.68%) | 22/167 (13.17%) | 18/242 (7.44%) | 11.80% / 11.15% | 19/242；12.38% | PASS：仅签名/透传样板或短通用 class |
| src/components/layout.tsx | N/A | N/A | N/A：无对应上游 | N/A | 7/52；5.19% | UNVERIFIED：无对应上游 |
| src/components/motion-provider.tsx | N/A | N/A | N/A：无对应上游 | N/A | 26/26；100.00% | UNVERIFIED：无对应上游 |
| src/components/popover.tsx | 13/35 (37.14%) | 33/42 (78.57%) | 68/158 (43.04%) | 50.94% / 50.94% | 69/158；51.30% | PASS：仅签名/透传样板或短通用 class |
| src/components/radio-group.tsx | 11/33 (33.33%) | 13/26 (50.00%) | 6/35 (17.14%) | 16.44% / 13.70% | 7/35；18.42% | PASS：仅签名/透传样板或短通用 class |
| src/components/select.tsx | 30/93 (32.26%) | 40/68 (58.82%) | 18/91 (19.78%) | 10.88% / 6.04% | 19/91；11.62% | PASS：仅签名/透传样板或短通用 class |
| src/components/separator.tsx | 1/8 (12.50%) | 8/14 (57.14%) | 9/26 (34.62%) | 38.30% / 38.30% | 10/26；40.82% | PASS：仅签名/透传样板或短通用 class |
| src/components/switch.tsx | 7/41 (17.07%) | 9/21 (42.86%) | 5/25 (20.00%) | 19.23% / 15.38% | 6/25；22.22% | PASS：仅签名/透传样板或短通用 class |
| src/components/textarea.tsx | 6/47 (12.77%) | 17/63 (26.98%) | 6/73 (8.22%) | 9.45% / 4.72% | 7/73；10.85% | PASS：仅签名/透传样板或短通用 class |
| src/components/theme-provider.tsx | N/A | N/A | N/A：无对应上游 | N/A | 150/150；100.00% | UNVERIFIED：无对应上游 |
| src/components/toast.tsx | 11/64 (17.19%) | 53/131 (40.46%) | 38/187 (20.32%) | 15.64% / 11.52% | 42/187；16.41% | PASS：仅签名/透传样板或短通用 class |
| src/components/tooltip.tsx | 2/14 (14.29%) | 27/102 (26.47%) | 22/149 (14.77%) | 21.05% / 20.10% | 24/149；22.43% | PASS：仅签名/透传样板或短通用 class |
| src/components/typography.tsx | N/A | N/A | N/A：无对应上游 | N/A | 20/73；16.26% | UNVERIFIED：无对应上游 |
| src/hooks/use-copy-to-clipboard.ts | N/A（0/0） | 16/27 (59.26%) | 9/58 (15.52%) | 18.00% / 18.00% | 13/58；18.84% | PASS：仅签名/透传样板或短通用 class |
| src/hooks/use-media-query.ts | N/A（0/0） | 27/44 (61.36%) | 9/52 (17.31%) | 13.74% / 13.74% | 9/52；13.53% | FAIL：useIsMobile 实现体相同 |
| src/index.ts | N/A | N/A | N/A：无对应上游 | N/A | 26/26；43.33% | UNVERIFIED：无对应上游 |
| src/locale.tsx | N/A | N/A | N/A：无对应上游 | N/A | 62/81；83.78% | UNVERIFIED：无对应上游 |
| src/locales/en-US.ts | N/A | N/A | N/A：无对应上游 | N/A | 26/35；82.54% | UNVERIFIED：无对应上游 |
| src/text-steps.ts | N/A | N/A | N/A：无对应上游 | N/A | NOT_RUN：HEAD 无此文件 | UNVERIFIED：无对应上游 |
| src/utils.ts | N/A | N/A | N/A：无对应上游 | N/A | 11/18；62.86% | UNVERIFIED：无对应上游 |
| styles.css | N/A | N/A | N/A：无对应上游 | N/A | 37/55；80.43% | UNVERIFIED：无对应上游 |
| theme.css | N/A | N/A | N/A：无对应上游 | N/A | 223/348；73.72% | UNVERIFIED：无对应上游 |
| tokens/components.css | N/A | N/A | N/A：无对应上游 | N/A | 82/403；29.71% | UNVERIFIED：无对应上游 |
| tokens/primitives.css | N/A | N/A | N/A：无对应上游 | N/A | 42/42；100.00% | UNVERIFIED：无对应上游 |
| tokens/semantic.css | N/A | N/A | N/A：无对应上游 | N/A | 131/157；84.52% | UNVERIFIED：无对应上游 |
| utilities.css | N/A | N/A | N/A：无对应上游 | N/A | 40/57；80.81% | UNVERIFIED：无对应上游 |

## 实质判读与排除理由

| 文件/片段 | 处置理由 |
| --- | --- |
| Button 的 cva 入口、variants/variant 键、children/fragment | 变体结构的公共样板，不是相同的完整变体表；当前三档、tone、尺寸、状态逻辑与上游不同。 |
| Button 的 pointer-events-none absolute（当前 215；上游 77） | 两个通用工具类表达不参与命中的绝对定位层；没有相同的整段状态样式或控制流程。单独这两个 class 按短通用样板排除，未借此排除更长的完整样式串。 |
| Card 的 useRender / mergeProps / defaultTagName / data-slot | Base UI 公共 render 与 props 合并机制的透传样板；当前仅一个边界，未保留上游标题/副标题/面板/动作/分隔等解剖；完整 class 不同。71.43% 是当前短文件对长上游文件的行覆盖，双边 R 为15.81%，不能直接作派生比例。 |
| Field / Fieldset / Separator | 原语名、props 展开、slot、orientation、return 和 JSX 括号是包装样板。字段错误内容、显式 invalid、真实 legend 及 decorative 处理不与上游实现体逐字相同。 |
| Popover | Portal→Positioner→Popup→Viewport 是这些公开原语的组合结构；位置参数按公开属性透传。createHandle 与 Primitive/Content 出口是公共 API 别名。当前完整 class、状态 class 回调、modal=false、viewportProps/positionerProps 接线不同；不以多行 JSX 包装样板判定实质复制。 |
| Tooltip / Toast | 共享原语部件名、位置属性与 Provider 透传为样板；补充信息关联、DOM 同步、未知结果及清理实现不同。Toast 当前156/上游194的 outline-none 是单个通用工具类，排除。 |
| 新增 Select / RadioGroup / Dialog / AlertDialog | 相同完整行均为 import、类型声明、闭合符号、原语包裹或属性透传；Select 当前95/上游58的 min-w-0 是单个通用工具类，排除。完整样式/状态逻辑未逐字相同。 |
| Checkbox / Switch / Textarea | API 名、原语标识符与少量基础工具 token 共同出现；没有相同完整实质 class 串或非样板实现行。 |
| useCopyToClipboard 的 return; / }, timeout); / }, []); | 单独 return 与计时器/effect 的闭合语法样板不携带整段请求逻辑。当前请求归属、卸载与异常分支不同。 |
| useMediaQuery 的 MediaQueryInput 字段与类型 | min/max/pointer 与 BreakpointQuery 是公开签名；change 事件名和 JS typeof 字符串是平台/语言惯用值，排除。 |
| useIsMobile 的 return useMediaQuery("max-md"); | 选定查询的整个实现体，不是签名；按本任务判据 FAIL，交主 agent，不由 H 改 hook 或降低判据。 |
| 无对应冻结上游的 16 文件 | 本次冻结只有57个 registry TS/TSX 文件，不含CSS；无对应文件只说明覆盖边界。本库 HEAD 相同或改动不足以推出 coss 来源，也不足以推出历史作者独立性。 |

## 仍存的引用与消费者

没有执行删除或全局替换。读取扫描排除了 docs 历史报告、scripts/ai-eval、test-results、node_modules、dist；生成的 catalog/ai/registry/design 副本另行排除，避免把生成物当作编辑入口。没有改历史决策或历史报告。

| 位置 | 实测 | 本轮处置 |
| --- | --- | --- |
| packages/ui/package.json:59-60,70 | files 含两份来源文件；check:upstream 调用待删除脚本。 | 保留；门禁未通过。 |
| packages/ui/scripts/gen-catalog.mjs:193,207 | source 从 meta.source 投影；extras 按 local 筛选；不读取 coss-source.json。 | 未改生成器与来源字段，未改相关断言。 |
| README.md:5,110；packages/ui/README.md:3,122-128；AGENTS.md:35-37 | 来源/许可说明仍在。AGENTS 中“来源记录已移出”与实际原件仍存在不一致。 | 未写“已完成”，主 agent 后续按真实处置更新。 |
| .github/workflows/* | rg 未发现 check:upstream 或 check-upstream 调用。 | 不需删 workflow 步骤，本轮未修改。 |
| scripts/gen-capabilities.mjs:13,18,31 | 读取清单并用于组件来源解析；是实际运行消费者。 | 超出 H 文件所有权，交主 agent；不能只删清单。 |
| scripts/lib/ui-facts.mjs:94 | 把 coss-source.json 加入指纹输入。 | 超出 H 文件所有权，交主 agent。 |
| apps/docs/src/pages/docs/introduction.tsx；src/lib/types.ts；src/lib/nav.ts | 当前介绍页、source union 与导航内容仍说明 coss 来源。 | 超出 H 文件所有权，交对应 owner；不是 docs/ 历史报告豁免。 |
| packages/ui/test/conventions.test.ts:93 | 有继承来源的旧注释；没有改变其断言。 | 保留，后续不能为来源清理放宽规则。 |

## 本轮实际验证

| 检查 | 状态 | 观察与边界 |
| --- | --- | --- |
| src 与 CSS 全量取证 | PASS（覆盖），删除门禁 FAIL | 34 文件逐行统计，18 对应冻结文件；当前/冻结/HEAD AST 解析无错误。 |
| 原文指纹核对 | PASS | 15 个仍有来源清单条目的当前对应文件，其冻结 SHA 与清单 upstreamSha256 一致，0 mismatches。无清单条目的 field/fieldset/separator 按同名冻结比对。 |
| 提取器正反例 | PASS | 比较条件、cva 默认值/匹配条件及未知调用参数没有混成 class；结果见方法。 |
| pnpm --filter @qingye/ui typecheck | PASS（21:05 时点） | 退出0。并行文件可继续改变，不能外推至后续构建。 |
| pnpm --filter @qingye/ui test | FAIL；归属 UNVERIFIED | 21:05:37运行；31 文件，448 PASS / 13 FAIL，共461。5失败文件为 alert-dialog、dialog、radio-group、select、typography，均含并行新增工作。H未改运行时代码，不修他人文件，不宣称失败由 H 引入或已解决。 |
| pnpm --filter @qingye/ui build | NOT_RUN | 命中用户“派生 → 停止删除”分支，未进入删除后最终build。build次数0；未运行prepack或手工生成任何产物。 |
| npm pack --dry-run --ignore-scripts --json | PASS（现状观察）；删除目标 FAIL | 退出0，@qingye/ui@0.4.0，107个包文件；THIRD_PARTY_NOTICES.md 与 coss-source.json 均仍包含。禁用scripts避免prepack隐式build。它不证明包已完成来源删除或最终dist重建。 |
| 修改既有测试断言 | NOT_RUN | 本轮没有改测试、删除断言或更新截图。临时 AST fixture 是取证器的自检，不是仓库断言变更。 |
| 浏览器与实体设备 | NOT_RUN | 本轮无界面实现变更，不启动浏览器，无任务自有浏览器进程需要清理。 |

失败测试按实际内容分组：AlertDialog 3条（初始焦点、Tab闭环、嵌套恢复）；Dialog 4条（进入/退出、Tab闭环、遮罩关闭、嵌套Escape）；RadioGroup 2条（Home/End、禁用及表单值）；Select 3条（键盘选择、空串/零值、Field焦点关联）；Typography 1条（caller style中的inherit观测）。这些只是本次未修的观测，不把jsdom结果替代浏览器验收。

临时证据目录：/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/qy-batch4-h-xyp9j0ax。包含 audit.mjs、compare.py、snapshots.json、metrics.json、extractor-fixture.json、summary.txt、ui-test.log、pack-dry-run.json、references.txt、owned-before-docs.json。目录为临时文件，不作为源码或生成产物发布；关键数字、相同行和SHA已写入本报告。

## 证据指纹

下面 SHA-256 对应本轮快照；冻结文件绝对路径前缀为 /Volumes/SUNSANG 1/Codex/qingye-provenance-freeze/upstream-repo-copy/。完整HEAD指纹及无对应材料的边界已在上文记录。

| 当前文件 | 当前 SHA-256 | 冻结文件；SHA-256 |
| --- | --- | --- |
| motion.css | 35348981bd0e5e487f8dc03d30a33d6285c8bc447b58935c63aa2ca3526c8394 | 无对应上游 |
| src/components/alert-dialog.tsx | 12f69786deb4d5fe4174ce132c59b23ea17b4b0ab7d6a73ad3159a3e1b3b2a40 | alert-dialog.tsx；e6e8d2aee4115cb2e2d5bba7e3f16941a2cfaa12a2bceae70d605b1751706d82 |
| src/components/button.tsx | 8ce98a093d8ada83f28ed805733269684452c9cdba5b848000a9b8ef65a6e420 | button.tsx；1e65556bde3071f90f61825cf573aec74bdd8695824470bea3dae4d68a6b8fc8 |
| src/components/card.tsx | fb1b47e9219579390a5ed90258feb36d089dfa6f4393bfb769048626fd04e083 | card.tsx；b59dbc0bd5d61694fcf1948fb8134795b0f5a1bf0a28d8d6bc817297c73a006e |
| src/components/checkbox.tsx | e26f238e4ac7e3639b3a97216d825d867d7e7df132b2e486b527de1201a2ac02 | checkbox.tsx；a1b8b4180a39a47c47bd2b50e432d0911da6efe3b963b065b3b5cb8893760047 |
| src/components/dialog.tsx | 9d4fb3cd8370176a1b820b90d2cbdd990187438340f3bbb1400842a43689b1d9 | dialog.tsx；14ad87a5f81d7753e9a954aa0624df49168eccc2c8d3074a41ea0a8bed3970d5 |
| src/components/field.tsx | 4f3e1980271449013140a6fefb8c901af3205262a643cbce344ed7df67e1676e | field.tsx；02ffda39f73f04638f580fd1fbb76e783cb252f9a87ecebdd62fb4bd0d1393ff |
| src/components/fieldset.tsx | 1dc3ff00ae8d76f9a5ff80c54074232c4e41d08f8c7d8cde196d2aed27e4f046 | fieldset.tsx；1ec36d2a2c60fd1ba229682a876f8d672ade66019513bac1a6747885d369f2a6 |
| src/components/input.tsx | 5c4c1e1a52bdf42332b150a7ac805f98fc8468a37c336c537d80ea1879fb24ab | input.tsx；3d488d491eb4e63642adc8b9354b0b0cc5b8ec4e284bbc26da7e2516f24980a4 |
| src/components/layout.tsx | 76c9ecaa123470a79aebc6bb300ed77a776f7f5232922ce7200a6821aad213a8 | 无对应上游 |
| src/components/motion-provider.tsx | 8afcccdffccd39281b9211a5d474b7e4121f0e3895ba39e1c4d79777f664f8b2 | 无对应上游 |
| src/components/popover.tsx | d7ab675f6f0670100370b276b4176bb9de11a29b4fedef31787f2918192e689d | popover.tsx；ff9b981ce4e68b86a266f69480c59967c7065aacfa2d4ce927d91a1eff0035cf |
| src/components/radio-group.tsx | 093a93f19cbada9b6ff22d3c75cac95fb4e46f98144ab750cec839c01b58596e | radio-group.tsx；b2479e9967f0ba48d1acbb58a4fff7b919aa746bb8a61cbbff389baac02abbb7 |
| src/components/select.tsx | d621676718d718a7d01001a348d5ea6b316b917c6e4e14d8670ec8155bc02232 | select.tsx；aa8821bbb4bd6b8b52a6cbaaf8d995f48b1001ad93d4bfa4e5b91b5e6d5f66a0 |
| src/components/separator.tsx | 050cdccb70cb4d1d342f31fb6721107b46497f2ad1baaf444270cc082555a103 | separator.tsx；48393a9f365097e350bb33f0e84d2df25efd6b374868aa075f8d6011378c1d6e |
| src/components/switch.tsx | 703471aef9cb0db0fcc831071e07e2039c5cc11e6b685d336bca4cc8e623ec62 | switch.tsx；2b3bada3d7234149b4d29918d5e312e62919938c2ae0ee61db81350438ad43c4 |
| src/components/textarea.tsx | 0c4f16373d4eee7859a9bd9c5c58e7d9b8e143c05e023bb1d68eaec2f96093d4 | textarea.tsx；3e30e41c099d7343cb0a603557acd4e8b7c94b43139a7a489df322c04c5f601c |
| src/components/theme-provider.tsx | 7b0b37626ab5203a847354abfd607dbd0369fe3472a3e4cbb9a9062f38a6c822 | 无对应上游 |
| src/components/toast.tsx | 59e04532dff441f50f345231a1a7d3c9c06c03c9f59deb5abdf2a99d7ac80edc | toast.tsx；6c83bd6ab5a90388aa06380924381058746bf2bd5ebb7b2187496a59e7c517d6 |
| src/components/tooltip.tsx | 96082bad541d435ff346238a62d13e2694cc6fe154309fcda6d59bc6b6f76a71 | tooltip.tsx；0ac59089d1d813b7eb1cd9e08ed2ff3b3931e4024df649ddb45b1eb43d50f694 |
| src/components/typography.tsx | 6432685134e66df53eea53618e9a8294df2152dbdcb4c451803cc0f253c71fca | 无对应上游 |
| src/hooks/use-copy-to-clipboard.ts | a81fd8b442cd6e6de19b37caae73e2fc784e24e8f7625c7bf89702bc48a3ae19 | use-copy-to-clipboard.ts；d2e9ba430e34dafd4ae7fe5403d2ad4987fdcd73f2a47bd0571c1f84c143536d |
| src/hooks/use-media-query.ts | afbe6dffe77de7c41c6e3467927b4241dc111ecc7e73716978d818fb6ab799b9 | use-media-query.ts；17d75ccaf898415db77dd72659c9b1fdb9338290ae54e8371b772e0b221c9fca |
| src/index.ts | 3fdf464e5e2c3fee4a50da6e814b909dc62be4713c44baab5ba5e5eeab931f92 | 无对应上游 |
| src/locale.tsx | 190f5e3cbcedeb66f2331c274e0bc86ff7fff9a1c8887d2300fbeb3806c229a3 | 无对应上游 |
| src/locales/en-US.ts | 5a297fd8f51abfe3d113b8de04f035dec978e63454b115a236d906f740728cb1 | 无对应上游 |
| src/text-steps.ts | 233f281b7f2c6401ae73194d0dfb329b335cee8edff4690a33d8e55e1925bd0d | 无对应上游 |
| src/utils.ts | e18c29b808d2936efbeaccc2de8bbf715ed4dfd9f7741f719190643e3ef27dd7 | 无对应上游 |
| styles.css | 2f87a701f223c56408d88fcebe6ce92bdbee55143317b1e800bf1ffcb293d0b3 | 无对应上游 |
| theme.css | 568b0e6d24d860498f8e6ad523355ab93f99dfbfb1323480429414b3e31b232b | 无对应上游 |
| tokens/components.css | 4bbdc9d3932b5aa16543ccb3a4c44ba1e7708426cf73e1ef7db3cab1fa6102fa | 无对应上游 |
| tokens/primitives.css | af3e9384486903d7c9550503137ead4902480ebb695a09a484e84c2e71083ae6 | 无对应上游 |
| tokens/semantic.css | 3dd6922921a849a0327fbced931d66ec39eb53664bec22716ccd2b49c5cf4022 | 无对应上游 |
| utilities.css | ab6a388bd2373eb55e5be75d8df20cf4c6597c77d1877a66a04ace5467962ee5 | 无对应上游 |

57个冻结文件的有序 path/SHA manifest SHA-256：88f6900c81fe1903207f930eb4e27acc3c9a5476b33ed1e1e403e6710da37f00。计算口径是 sort_keys=True、separators=(",",":") 的JSON数组；不包含本库当前文件。

## 相同行完整列表（冻结对照）

以下仅列与冻结对应文件相同的当前行；使用物理行号。空白行不列，所有同文重复位置合并为一行。类别 B=独立括号/use-client/JSX或透传样板，A=import/类型/公开签名，F=本任务阻断实现体。列表文本来自当前库文件。没有对应上游的16文件已在逐文件表标明，没有伪造0%相同。

### src/components/alert-dialog.tsx

冻结：alert-dialog.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";</code> | A：签名/import/公开别名 |
| 15,21,42,47,52,57,61,64,67 | 22,38,54,87,103,124,140,153,161 | <code>}</code> | B：语法/公开组合样板 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/button.tsx

冻结：button.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 4 | 5 | <code>import { cva, type VariantProps } from "class-variance-authority";</code> | A：签名/import/公开别名 |
| 26,152,162,168,180 | 89 | <code>};</code> | B：语法/公开组合样板 |
| 28 | 10 | <code>export const buttonVariants = cva(</code> | B：语法/公开组合样板 |
| 30 | 12 | <code>{</code> | B：语法/公开组合样板 |
| 31 | 17 | <code>variants: {</code> | B：语法/公开组合样板 |
| 36 | 32 | <code>variant: {</code> | B：语法/公开组合样板 |
| 40,44,77 | 16,31,46,47,48 | <code>},</code> | B：语法/公开组合样板 |
| 78,102,142,225 | 49 | <code>);</code> | B：语法/公开组合样板 |
| 85,103,114,145,226 | 55,96 | <code>}</code> | B：语法/公开组合样板 |
| 98,212 | 74 | <code>{children}</code> | B：语法/公开组合样板 |
| 116 | 57 | <code>export function Button({</code> | A：签名/import/公开别名 |
| 122 | 66 | <code>}: ButtonProps): React.ReactElement {</code> | A：签名/import/公开别名 |
| 146,179 | 95 | <code>});</code> | B：语法/公开组合样板 |
| 186 | 73 | <code>&lt;&gt;</code> | B：语法/公开组合样板 |
| 219 | 80 | <code>)}</code> | B：语法/公开组合样板 |
| 224 | 81 | <code>&lt;/&gt;</code> | B：语法/公开组合样板 |

完全相同的 class 字面量：
- 当前215；冻结77：'pointer-events-none absolute'。按上文短通用工具类说明排除。

### src/components/card.tsx

冻结：card.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { mergeProps } from "@base-ui/react/merge-props";</code> | A：签名/import/公开别名 |
| 4 | 4 | <code>import { useRender } from "@base-ui/react/use-render";</code> | A：签名/import/公开别名 |
| 5 | 5 | <code>import type React from "react";</code> | A：签名/import/公开别名 |
| 11 | 8 | <code>export function Card({</code> | A：签名/import/公开别名 |
| 12,22 | 9,16,29,36,49,56,69,86,103,110,123,140,147,160,177,194,201,214,221,234,241 | <code>className,</code> | A：签名/import/公开别名 |
| 13,29 | 10,24,30,44,50,64,70,81,87,98,104,118,124,135,141,155,161,172,178,189,195,209,215,229,235,249 | <code>render,</code> | A：签名/import/公开别名 |
| 14 | 11,31,51,71,88,105,125,142,162,179,196,216,236 | <code>...props</code> | A：签名/import/公开别名 |
| 19 | 13,33,53,73,90,107,127,144,164,181,198,218,238 | <code>const defaultProps = {</code> | B：语法/公开组合样板 |
| 20 | 14,34,54,108,145,199,219,239 | <code>className: cn(</code> | B：语法/公开组合样板 |
| 23 | 17,37,57,111,148,202,222,242 | <code>),</code> | B：语法/公开组合样板 |
| 24 | 18 | <code>"data-slot": "card",</code> | B：语法/公开组合样板 |
| 25 | 19,39,59,76,93,113,130,150,167,184,204,224,244 | <code>};</code> | B：语法/公开组合样板 |
| 26 | 21,41,61,78,95,115,132,152,169,186,206,226,246 | <code>return useRender({</code> | B：语法/公开组合样板 |
| 27 | 22,42,62,79,96,116,133,153,170,187,207,227,247 | <code>defaultTagName: "div",</code> | B：语法/公开组合样板 |
| 28 | 23,43,63,80,97,117,134,154,171,188,208,228,248 | <code>props: mergeProps&lt;"div"&gt;(defaultProps, props),</code> | B：语法/公开组合样板 |
| 30 | 25,45,65,82,99,119,136,156,173,190,210,230,250 | <code>});</code> | B：语法/公开组合样板 |
| 31 | 26,46,66,83,100,120,137,157,174,191,211,231,251 | <code>}</code> | B：语法/公开组合样板 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/checkbox.tsx

冻结：checkbox.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";</code> | A：签名/import/公开别名 |
| 27 | 16,60,62 | <code>)}</code> | B：语法/公开组合样板 |
| 34 | 66 | <code>}</code> | B：语法/公开组合样板 |
| 36 | 68 | <code>export { CheckboxPrimitive };</code> | A：签名/import/公开别名 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/dialog.tsx

冻结：dialog.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";</code> | A：签名/import/公开别名 |
| 4 | 5 | <code>import { useRender } from "@base-ui/react/use-render";</code> | A：签名/import/公开别名 |
| 5 | 7 | <code>import type React from "react";</code> | A：签名/import/公开别名 |
| 15,21,33,49,54,59,64,70,74,78 | 24,30,46,62,112,132,158,174,187,214 | <code>}</code> | B：语法/公开组合样板 |
| 30 | 76 | <code>portalProps?: DialogPrimitive.Portal.Props;</code> | A：签名/import/公开别名 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/field.tsx

冻结：field.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { Field as FieldPrimitive } from "@base-ui/react/field";</code> | A：签名/import/公开别名 |
| 22,45,51,57,64,71,78,86,102,132 | 18,34,47,60,73 | <code>}</code> | B：语法/公开组合样板 |
| 25 | 11,24,40,53,66 | <code>return (</code> | B：语法/公开组合样板 |
| 27 | 12 | <code>&lt;FieldPrimitive.Root</code> | B：语法/公开组合样板 |
| 28 | 14 | <code>data-slot="field"</code> | B：语法/公开组合样板 |
| 30 | 15,31,44,57,70 | <code>{...props}</code> | B：语法/公开组合样板 |
| 41 | 29 | <code>)}</code> | B：语法/公开组合样板 |
| 42 | 16,32,45,58,71 | <code>/&gt;</code> | B：语法/公开组合样板 |
| 44,119 | 17,33,46,59,72 | <code>);</code> | B：语法/公开组合样板 |
| 136 | 80 | <code>export { FieldPrimitive };</code> | A：签名/import/公开别名 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/fieldset.tsx

冻结：fieldset.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";</code> | A：签名/import/公开别名 |
| 14,28 | 11,23 | <code>return (</code> | B：语法/公开组合样板 |
| 15 | 12 | <code>&lt;FieldsetPrimitive.Root</code> | B：语法/公开组合样板 |
| 16 | 14 | <code>data-slot="fieldset"</code> | B：语法/公开组合样板 |
| 17,32 | 15,27 | <code>{...props}</code> | B：语法/公开组合样板 |
| 23,39 | 16,28 | <code>/&gt;</code> | B：语法/公开组合样板 |
| 24,40 | 17,29 | <code>);</code> | B：语法/公开组合样板 |
| 25,41 | 18,30 | <code>}</code> | B：语法/公开组合样板 |
| 29 | 24 | <code>&lt;FieldsetPrimitive.Legend</code> | B：语法/公开组合样板 |
| 30 | 26 | <code>data-slot="fieldset-legend"</code> | B：语法/公开组合样板 |
| 43 | 32 | <code>export { FieldsetPrimitive };</code> | A：签名/import/公开别名 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/input.tsx

冻结：input.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { Input as InputPrimitive } from "@base-ui/react/input";</code> | A：签名/import/公开别名 |
| 18 | 12 | <code>unstyled?: boolean;</code> | A：签名/import/公开别名 |
| 20 | 13 | <code>nativeInput?: boolean;</code> | A：签名/import/公开别名 |
| 32,43,86,190,217 | 14 | <code>};</code> | B：语法/公开组合样板 |
| 55,107,114,252 | 43,66 | <code>}</code> | B：语法/公开组合样板 |
| 116 | 16 | <code>export function Input({</code> | A：签名/import/公开别名 |
| 118 | 17,41 | <code>className,</code> | A：签名/import/公开别名 |
| 120 | 19 | <code>unstyled = false,</code> | A：签名/import/公开别名 |
| 121 | 20 | <code>nativeInput = false,</code> | A：签名/import/公开别名 |
| 135 | 22 | <code>...props</code> | A：签名/import/公开别名 |
| 136 | 23 | <code>}: InputProps): React.ReactElement {</code> | A：签名/import/公开别名 |
| 222 | 35 | <code>return (</code> | B：语法/公开组合样板 |
| 224 | 45 | <code>data-slot="input-control"</code> | B：语法/公开组合样板 |
| 236 | 63 | <code>)}</code> | B：语法/公开组合样板 |
| 238 | 46 | <code>&gt;</code> | B：语法/公开组合样板 |
| 248 | 64 | <code>&lt;/span&gt;</code> | B：语法/公开组合样板 |
| 251 | 33,65 | <code>);</code> | B：语法/公开组合样板 |
| 254 | 68 | <code>export { InputPrimitive };</code> | A：签名/import/公开别名 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/popover.tsx

冻结：popover.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { Popover as PopoverPrimitive } from "@base-ui/react/popover";</code> | A：签名/import/公开别名 |
| 4 | 4 | <code>import type React from "react";</code> | A：签名/import/公开别名 |
| 7 | 7 | <code>export const PopoverCreateHandle: typeof PopoverPrimitive.createHandle =</code> | A：签名/import/公开别名 |
| 8 | 8 | <code>PopoverPrimitive.createHandle;</code> | A：签名/import/公开别名 |
| 21,39,43,54,92,102,114,123,134,138,149,153,164,168 | 26,84,90,103,116 | <code>}</code> | B：语法/公开组合样板 |
| 30 | 12 | <code>export function PopoverTrigger({</code> | A：签名/import/公开别名 |
| 31,58,126,141,156 | 13,30,64,93,106 | <code>className,</code> | A：签名/import/公开别名 |
| 32,67,127,142,157 | 15,38,87,94,107 | <code>...props</code> | A：签名/import/公开别名 |
| 33 | 16 | <code>}: PopoverPrimitive.Trigger.Props): React.ReactElement {</code> | A：签名/import/公开别名 |
| 34,76,129,144,159 | 17,48,96,109 | <code>return (</code> | B：语法/公开组合样板 |
| 35 | 18 | <code>&lt;PopoverPrimitive.Trigger</code> | B：语法/公开组合样板 |
| 36,96,131,146,161 | 21,67,100,113 | <code>{...props}</code> | B：语法/公开组合样板 |
| 40 | 20 | <code>data-slot="popover-trigger"</code> | B：语法/公开组合样板 |
| 41,136,151,166 | 101,114 | <code>/&gt;</code> | B：语法/公开组合样板 |
| 42,122,137,152,167 | 25,83,102,115 | <code>);</code> | B：语法/公开组合样板 |
| 46 | 40 | <code>portalProps?: PopoverPrimitive.Portal.Props;</code> | A：签名/import/公开别名 |
| 49 | 41 | <code>side?: PopoverPrimitive.Positioner.Props["side"];</code> | A：签名/import/公开别名 |
| 50 | 42 | <code>align?: PopoverPrimitive.Positioner.Props["align"];</code> | A：签名/import/公开别名 |
| 51 | 43 | <code>sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];</code> | A：签名/import/公开别名 |
| 52 | 44 | <code>alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];</code> | A：签名/import/公开别名 |
| 53 | 46 | <code>anchor?: PopoverPrimitive.Positioner.Props["anchor"];</code> | A：签名/import/公开别名 |
| 56 | 28 | <code>export function PopoverPopup({</code> | A：签名/import/公开别名 |
| 57 | 14,29 | <code>children,</code> | A：签名/import/公开别名 |
| 59 | 31 | <code>side = "bottom",</code> | A：签名/import/公开别名 |
| 60 | 32 | <code>align = "center",</code> | A：签名/import/公开别名 |
| 63 | 36 | <code>anchor,</code> | A：签名/import/公开别名 |
| 64 | 37 | <code>portalProps,</code> | A：签名/import/公开别名 |
| 77 | 49 | <code>&lt;PopoverPrimitive.Portal {...portalProps}&gt;</code> | B：语法/公开组合样板 |
| 78 | 50 | <code>&lt;PopoverPrimitive.Positioner</code> | B：语法/公开组合样板 |
| 79 | 56 | <code>side={side}</code> | B：语法/公开组合样板 |
| 80 | 51 | <code>align={align}</code> | B：语法/公开组合样板 |
| 81 | 57 | <code>sideOffset={sideOffset}</code> | B：语法/公开组合样板 |
| 82 | 52 | <code>alignOffset={alignOffset}</code> | B：语法/公开组合样板 |
| 83 | 53 | <code>anchor={anchor}</code> | B：语法/公开组合样板 |
| 93 | 55 | <code>data-slot="popover-positioner"</code> | B：语法/公开组合样板 |
| 94,104,116 | 22,58,68,77 | <code>&gt;</code> | B：语法/公开组合样板 |
| 95 | 59 | <code>&lt;PopoverPrimitive.Popup</code> | B：语法/公开组合样板 |
| 103 | 66 | <code>data-slot="popover-popup"</code> | B：语法/公开组合样板 |
| 105 | 69 | <code>&lt;PopoverPrimitive.Viewport</code> | B：语法/公开组合样板 |
| 115 | 76 | <code>data-slot="popover-viewport"</code> | B：语法/公开组合样板 |
| 117 | 23,78 | <code>{children}</code> | B：语法/公开组合样板 |
| 118 | 79 | <code>&lt;/PopoverPrimitive.Viewport&gt;</code> | B：语法/公开组合样板 |
| 119 | 80 | <code>&lt;/PopoverPrimitive.Popup&gt;</code> | B：语法/公开组合样板 |
| 120 | 81 | <code>&lt;/PopoverPrimitive.Positioner&gt;</code> | B：语法/公开组合样板 |
| 121 | 82 | <code>&lt;/PopoverPrimitive.Portal&gt;</code> | B：语法/公开组合样板 |
| 125 | 86 | <code>export function PopoverClose({</code> | A：签名/import/公开别名 |
| 128 | 88 | <code>}: PopoverPrimitive.Close.Props): React.ReactElement {</code> | A：签名/import/公开别名 |
| 140 | 92 | <code>export function PopoverTitle({</code> | A：签名/import/公开别名 |
| 143 | 95 | <code>}: PopoverPrimitive.Title.Props): React.ReactElement {</code> | A：签名/import/公开别名 |
| 145 | 97 | <code>&lt;PopoverPrimitive.Title</code> | B：语法/公开组合样板 |
| 150 | 99 | <code>data-slot="popover-title"</code> | B：语法/公开组合样板 |
| 155 | 105 | <code>export function PopoverDescription({</code> | A：签名/import/公开别名 |
| 158 | 108 | <code>}: PopoverPrimitive.Description.Props): React.ReactElement {</code> | A：签名/import/公开别名 |
| 160 | 110 | <code>&lt;PopoverPrimitive.Description</code> | B：语法/公开组合样板 |
| 165 | 112 | <code>data-slot="popover-description"</code> | B：语法/公开组合样板 |
| 170 | 118 | <code>export { PopoverPrimitive, PopoverPopup as PopoverContent };</code> | A：签名/import/公开别名 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/radio-group.tsx

冻结：radio-group.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { Radio as RadioPrimitive } from "@base-ui/react/radio";</code> | A：签名/import/公开别名 |
| 4 | 4 | <code>import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";</code> | A：签名/import/公开别名 |
| 20,38 | 19,40 | <code>}</code> | B：语法/公开组合样板 |
| 35 | 30 | <code>)}</code> | B：语法/公开组合样板 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/select.tsx

冻结：select.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 4 | <code>import { Select as SelectPrimitive } from "@base-ui/react/select";</code> | A：签名/import/公开别名 |
| 24 | 61 | <code>};</code> | B：语法/公开组合样板 |
| 29,55,63,80,92,96,100 | 37,68,89,105,171,208,221,227,243,255 | <code>}</code> | B：语法/公开组合样板 |
| 48 | 100,155,183,238 | <code>)}</code> | B：语法/公开组合样板 |
| 53 | 86 | <code>&lt;/SelectPrimitive.Icon&gt;</code> | B：语法/公开组合样板 |
| 68 | 129 | <code>&lt;SelectPrimitive.Positioner</code> | B：语法/公开组合样板 |
| 70 | 137 | <code>sideOffset={sideOffset}</code> | B：语法/公开组合样板 |
| 71,75,86 | 82,138,143,147,157,164,186,199 | <code>&gt;</code> | B：语法/公开组合样板 |
| 72 | 139 | <code>&lt;SelectPrimitive.Popup</code> | B：语法/公开组合样板 |
| 77 | 167 | <code>&lt;/SelectPrimitive.Popup&gt;</code> | B：语法/公开组合样板 |
| 78 | 168 | <code>&lt;/SelectPrimitive.Positioner&gt;</code> | B：语法/公开组合样板 |
| 90 | 54 | <code>&lt;/span&gt;</code> | B：语法/公开组合样板 |

完全相同的 class 字面量：
- 当前95；冻结58：'min-w-0'。按上文短通用工具类说明排除。

### src/components/separator.tsx

冻结：separator.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 3 | 1 | <code>import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";</code> | A：签名/import/公开别名 |
| 13 | 10 | <code>return (</code> | B：语法/公开组合样板 |
| 14 | 11 | <code>&lt;SeparatorPrimitive</code> | B：语法/公开组合样板 |
| 15 | 16 | <code>data-slot="separator"</code> | B：语法/公开组合样板 |
| 16 | 18 | <code>{...props}</code> | B：语法/公开组合样板 |
| 17 | 17 | <code>orientation={orientation}</code> | B：语法/公开组合样板 |
| 25 | 15 | <code>)}</code> | B：语法/公开组合样板 |
| 26 | 19 | <code>/&gt;</code> | B：语法/公开组合样板 |
| 27 | 20 | <code>);</code> | B：语法/公开组合样板 |
| 28 | 21 | <code>}</code> | B：语法/公开组合样板 |
| 30 | 23 | <code>export { SeparatorPrimitive };</code> | A：签名/import/公开别名 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/switch.tsx

冻结：switch.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { Switch as SwitchPrimitive } from "@base-ui/react/switch";</code> | A：签名/import/公开别名 |
| 24 | 16,23 | <code>)}</code> | B：语法/公开组合样板 |
| 27 | 28 | <code>}</code> | B：语法/公开组合样板 |
| 29 | 30 | <code>export { SwitchPrimitive };</code> | A：签名/import/公开别名 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/textarea.tsx

冻结：textarea.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 12,20,38 | 12 | <code>};</code> | B：语法/公开组合样板 |
| 57 | 49 | <code>data-slot="textarea"</code> | B：语法/公开组合样板 |
| 71 | 48,52 | <code>)}</code> | B：语法/公开组合样板 |
| 73 | 51,53 | <code>/&gt;</code> | B：语法/公开组合样板 |
| 76 | 29,56 | <code>}</code> | B：语法/公开组合样板 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/components/toast.tsx

冻结：toast.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>"use client";</code> | B：语法/公开组合样板 |
| 3 | 3 | <code>import { Toast } from "@base-ui/react/toast";</code> | A：签名/import/公开别名 |
| 11 | 289 | <code>export interface ToastProviderProps extends Toast.Provider.Props {</code> | A：签名/import/公开别名 |
| 12 | 290 | <code>position?: ToastPosition;</code> | A：签名/import/公开别名 |
| 16,20,33,36,40,41,64,134,175,185,194 | 40,44,47,58,60,182,207,273,292,306,310,323 | <code>}</code> | B：语法/公开组合样板 |
| 17 | 308 | <code>export interface AnchoredToastProviderProps extends Toast.Provider.Props {</code> | A：签名/import/公开别名 |
| 21 | 25 | <code>type ToastData = {</code> | A：签名/import/公开别名 |
| 23 | 30 | <code>tooltipStyle?: boolean;</code> | A：签名/import/公开别名 |
| 24,144 | 31 | <code>};</code> | B：语法/公开组合样板 |
| 88,150,179,188 | 72,94,191,209,300,317 | <code>return (</code> | B：语法/公开组合样板 |
| 90 | 95,217 | <code>&lt;Toast.Root</code> | B：语法/公开组合样板 |
| 96 | 75,97,218 | <code>className={cn(</code> | B：语法/公开组合样板 |
| 99,159 | 84,139,154,174,224,243,263,265 | <code>)}</code> | B：语法/公开组合样板 |
| 103,160,168 | 87,144,151,171,196,216,228,240,260 | <code>&gt;</code> | B：语法/公开组合样板 |
| 119,123,125 | 153,165,166,242,254,255 | <code>&lt;/div&gt;</code> | B：语法/公开组合样板 |
| 129 | 175,232,264 | <code>&lt;/Toast.Content&gt;</code> | B：语法/公开组合样板 |
| 130 | 176,266 | <code>&lt;/Toast.Root&gt;</code> | B：语法/公开组合样板 |
| 133,174,184,193 | 177,181,268,272,305,322 | <code>);</code> | B：语法/公开组合样板 |
| 152 | 74,193 | <code>&lt;Toast.Viewport</code> | B：语法/公开组合样板 |
| 153 | 86 | <code>data-slot="toast-viewport"</code> | B：语法/公开组合样板 |
| 162 | 210 | <code>&lt;Toast.Positioner</code> | B：语法/公开组合样板 |
| 165 | 213 | <code>data-slot="toast-positioner"</code> | B：语法/公开组合样板 |
| 170 | 267 | <code>&lt;/Toast.Positioner&gt;</code> | B：语法/公开组合样板 |
| 172 | 179,270 | <code>&lt;/Toast.Viewport&gt;</code> | B：语法/公开组合样板 |
| 173 | 180,271 | <code>&lt;/Toast.Portal&gt;</code> | B：语法/公开组合样板 |
| 180 | 301 | <code>&lt;Toast.Provider toastManager={toastManager} {...props}&gt;</code> | B：语法/公开组合样板 |
| 181,190 | 302,319 | <code>{children}</code> | B：语法/公开组合样板 |
| 183,192 | 304,321 | <code>&lt;/Toast.Provider&gt;</code> | B：语法/公开组合样板 |
| 189 | 318 | <code>&lt;Toast.Provider toastManager={anchoredToastManager} {...props}&gt;</code> | B：语法/公开组合样板 |
| 195 | 325 | <code>export { Toast as ToastPrimitive };</code> | A：签名/import/公开别名 |

完全相同的 class 字面量：
- 当前156；冻结194：'outline-none'。按上文短通用工具类说明排除。

### src/components/tooltip.tsx

冻结：tooltip.tsx。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 3 | <code>import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";</code> | A：签名/import/公开别名 |
| 17,21,36,42,56,67,68,78,147 | 19,65 | <code>}</code> | B：语法/公开组合样板 |
| 81 | 31 | <code>align?: TooltipPrimitive.Positioner.Props["align"];</code> | A：签名/import/公开别名 |
| 83 | 32 | <code>side?: TooltipPrimitive.Positioner.Props["side"];</code> | A：签名/import/公开别名 |
| 84 | 33 | <code>sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];</code> | A：签名/import/公开别名 |
| 85 | 34 | <code>anchor?: TooltipPrimitive.Positioner.Props["anchor"];</code> | A：签名/import/公开别名 |
| 86 | 35 | <code>portalProps?: TooltipPrimitive.Portal.Props;</code> | A：签名/import/公开别名 |
| 94 | 26 | <code>anchor,</code> | B：语法/公开组合样板 |
| 95 | 28 | <code>portalProps,</code> | B：语法/公开组合样板 |
| 96 | 22,50 | <code>className,</code> | B：语法/公开组合样板 |
| 97 | 27 | <code>children,</code> | B：语法/公开组合样板 |
| 122 | 37 | <code>return (</code> | B：语法/公开组合样板 |
| 124 | 39 | <code>&lt;TooltipPrimitive.Positioner</code> | B：语法/公开组合样板 |
| 125 | 43 | <code>data-slot="tooltip-positioner"</code> | B：语法/公开组合样板 |
| 126 | 40 | <code>align={align}</code> | B：语法/公开组合样板 |
| 128 | 44 | <code>side={side}</code> | B：语法/公开组合样板 |
| 129 | 45 | <code>sideOffset={sideOffset}</code> | B：语法/公开组合样板 |
| 130 | 41 | <code>anchor={anchor}</code> | B：语法/公开组合样板 |
| 131,141 | 46,54,58 | <code>&gt;</code> | B：语法/公开组合样板 |
| 132 | 47 | <code>&lt;TooltipPrimitive.Popup</code> | B：语法/公开组合样板 |
| 133 | 52 | <code>data-slot="tooltip-popup"</code> | B：语法/公开组合样板 |
| 142 | 59 | <code>{children}</code> | B：语法/公开组合样板 |
| 143 | 61 | <code>&lt;/TooltipPrimitive.Popup&gt;</code> | B：语法/公开组合样板 |
| 144 | 62 | <code>&lt;/TooltipPrimitive.Positioner&gt;</code> | B：语法/公开组合样板 |
| 145 | 63 | <code>&lt;/TooltipPrimitive.Portal&gt;</code> | B：语法/公开组合样板 |
| 146 | 64 | <code>);</code> | B：语法/公开组合样板 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/hooks/use-copy-to-clipboard.ts

冻结：use-copy-to-clipboard.ts。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 3 | 5 | <code>export function useCopyToClipboard({</code> | A：签名/import/公开别名 |
| 4 | 6 | <code>timeout = 2000,</code> | A：签名/import/公开别名 |
| 5 | 7 | <code>onCopy,</code> | A：签名/import/公开别名 |
| 7 | 8 | <code>}: {</code> | A：签名/import/公开别名 |
| 8 | 9 | <code>timeout?: number;</code> | A：签名/import/公开别名 |
| 9 | 10 | <code>onCopy?: () =&gt; void;</code> | A：签名/import/公开别名 |
| 24 | 39,47 | <code>};</code> | B：语法/公开组合样板 |
| 25 | 48 | <code>}, []);</code> | B：语法/公开组合样板 |
| 40,47,49,63 | 18,25,30,37,46,51 | <code>}</code> | B：语法/公开组合样板 |
| 48 | 17 | <code>return;</code> | B：语法/公开组合样板 |
| 57 | 36 | <code>}, timeout);</code> | B：语法/公开组合样板 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

### src/hooks/use-media-query.ts

冻结：use-media-query.ts。

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 8 | 64 | <code>export type MediaQueryInput = {</code> | A：签名/import/公开别名 |
| 9 | 65 | <code>min?: Breakpoint &#124; number;</code> | A：签名/import/公开别名 |
| 10 | 66 | <code>max?: Breakpoint &#124; number;</code> | A：签名/import/公开别名 |
| 11 | 68 | <code>pointer?: "coarse" &#124; "fine";</code> | A：签名/import/公开别名 |
| 12 | 69 | <code>};</code> | B：语法/公开组合样板 |
| 16,25,30,33,35,49,55,59 | 25,30,43,54,55,58,62,92,96 | <code>}</code> | B：语法/公开组合样板 |
| 57 | 94 | <code>export function useIsMobile(): boolean {</code> | A：签名/import/公开别名 |
| 58 | 95 | <code>return useMediaQuery("max-md");</code> | F：实现体，阻断 |

完全相同的 class 字面量：
无（仅 token 交集，见上表）。

## 后续与保留

三份来源文件与包内分发入口仍在。主 agent 先裁定或处理 blocker，再在各 owner 的最终源码上重新取证；不能用删除注释或metadata local代替这一门禁。本轮不请求额外权限，不擅自扩展H的组件修改范围。

仓库外 upstream-repo-copy、repo-copies 与 qingye-ui-archive/2026-10-03-pending-rewrite 均保留，位置与用途见决策；后两处未读取正文。历史来源说明保留原样。

### 交接时的保存核对

写完两份文档后，再核对所有34个源码/CSS指纹与扫描清单：没有新增未扫描文件，但并行代理继续修改了 alert-dialog.tsx、dialog.tsx、radio-group.tsx、select.tsx。因此这4行的 PASS **仅限21:07:35快照，交接时的新内容为 UNVERIFIED**，主 agent 收尾时须重跑对应取证；其余30文件与快照一致，useIsMobile 的阻断证据仍在。不循环追逐并行改动，也不把旧指纹当最终源码证明。

57个冻结原文 SHA 均未变化。H所有权中原有的10份文件（来源三文件、package、生成器、两README、AGENTS、两workflow）与写报告前指纹均相同。两份新文档链接与代码围栏检查 PASS；git diff --check 退出0（新文档未跟踪，另用全文件检查覆盖，不以git diff替代）。核对结果保存在临时 final-preservation.json。
