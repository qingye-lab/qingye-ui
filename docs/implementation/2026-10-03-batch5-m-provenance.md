# Batch 5 M：删除 useIsMobile 与来源收尾

2026-10-03。**冻结比对门禁、M 范围 API/包验证 PASS；全仓引用收尾 FAIL，待主 agent/owner 接手。** 当前没有发现签名、语法、公开原语组合及短通用 class 以外的实质逐字相同。已删除无消费者的公开导出与三份来源文件；范围外引用正在请求授权，不写成全部清理完成。

## 语义、关系与破坏性 API

先于代码写入的 [来源收尾决定](../decisions/2026-10-03-provenance-closure.md) 保留 H 的 FAIL 与当时停止决定，并增加 M 的主 agent 裁决。依据只有根 [design.md「删去检验」](../../design.md#判据)：`useIsMobile` 没有仓库内运行消费者，`useMediaQuery` 已有同一查询入口；删除后当前任务、执行与保护不受损。页面只做桌面的用户裁决不等于删除库内窄屏 token，本轮没有改任何控件尺寸或样式。

**破坏性公开 API 变更**：`useIsMobile` 不再导出。外部未登记消费者为 `UNVERIFIED`；若使用此导出，改为显式 `useMediaQuery("max-md")`，只表达宽度匹配。没有用改名、换行、变量替换或重排消除 H 的证据。

## 基线、阅读与所有权

- 实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`。开工 HEAD 为 `275d7300496dbda93c25899ea6e4eab6720cf31c`；最近三条为 `275d730`、`b93bfe4`、`9d51f7a`。工作区已有大量未提交改动；只做 M 指定文件及明确获准的后续扩展，不 reset/clean/stash/checkout/commit。
- 已读实际 AGENTS.md、design.md、STANDARDS.md、基础层、逐值裁决、浮层族与 Tooltip/hooks 决定；上一批 A/B/C 和 H 报告作为现状与证据定位，不沿用旧行号或旧 PASS。
- 按 M 例外读取冻结 `upstream-repo-copy/` 中 57 份文件，以及当前全部 27 份 src、7 份 CSS 和 `git show HEAD:<path>`；只读比对。没有读取归档组件源码、冻结 `repo-copies/` 正文，没有写回冻结或归档的任何内容。当前 hook 函数体读取用于删除裁决与比对，不从上游推导设计值。
- 取证快照：2026-10-03T13:49:01.909Z（北京时间21:49:01）。20 个组件、27 份 src、7 份 CSS，共34文件。与 H 快照相比 alert-dialog、dialog、radio-group、select、typography 和本轮 hook 共6文件改变，均已按当前内容重跑。
- 不启动浏览器，不新增演示/审查段落，不改其他组件。唯一授权 build 由官方生成器同步产物，没有手改 catalog、AI、registry、包内 design.md 或 dist。

## 方法与数字定义

直接复用 H 的临时 `audit.mjs` 和 `compare.py`；下方数字来自本轮快照。临时路径：/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/qy-batch5-m-kiitg0n8。

1. TypeScript 5.9.3 `createSourceFile`/AST 提取 class 字符串、原始字面量、标识符与位置。JSX className、cn/clsx/classnames、cva base/variants/compound class 递归解析本文件常量；条件只取结果分支，逻辑与只取右侧，不把比较条件、defaultVariants、compound 匹配条件或未知调用参数当 class。动态拼接、未知函数与调用方 class 为 `UNVERIFIED`。
2. **C** = 各 token 当前/上游次数较小值之和 / 当前 class token 总数；按空白分 token，不剥前缀、不机械改名。0/0 为 N/A。完全相同字面 class 含原始引号另列，不用百分比裁定来源。
3. **I** = 同名标识符集合交集 / 当前不同标识符数。API 与原语名自然重合，此量只定位。
4. 去空白行，用 Python `difflib.SequenceMatcher(..., autojunk=False)`；**L** = strip 后顺序匹配块行数 M / 当前非空行 N；**R** = 2M/(当前N + 上游N)。另给保留缩进的 strict R。匹配块不宣称最大匹配。
5. 所有相同文本另按物理行号列出，不仅看 difflib 的顺序匹配块。人工判读所有相同行与完整 class；AST 标签只定位，不自动决定排除。
6. 无同名冻结材料保留 `UNVERIFIED`；HEAD 只说明仓库基线变化，不能替代上游、也不能把本库原有实现自动归为派生。本次7份CSS均无冻结对应原文，已覆盖其当前/HEAD扫描，但没有冒充上游CSS来源证明。

提取器正反例 `PASS`：正确提取 inline-flex/items-center、cva h-4/h-8、compound font-medium、条件结果 text-muted/text-body/opacity-64，排除比较值 search、默认值 small 和未知变体调用参数。当前、冻结、HEAD 的 AST 解析诊断总数0；15个清单中仍记录的同名冻结原文 SHA 全部匹配，0 mismatches。

## 逐文件统计

路径相对 packages/ui。`PASS` 限于本任务的冻结比对门禁；16份无对应材料保留 `UNVERIFIED`。CSS 的 C/I 不适用。

| 文件 | C 相同/总数 (%) | I 相同/总数 (%) | L 匹配/当前 (%) | R strip / strict | HEAD 匹配/当前；R | 结论 |
| --- | --- | --- | --- | --- | --- | --- |
| motion.css | N/A | N/A | N/A：无对应上游 | N/A | 104/355；44.26% | UNVERIFIED：无对应上游 |
| src/components/alert-dialog.tsx | 10/35 (28.57%) | 28/51 (54.90%) | 11/57 (19.30%) | 10.48% / 10.48% | 12/57；11.06% | PASS：仅签名/样板/短通用class |
| src/components/button.tsx | 18/161 (11.18%) | 26/145 (17.93%) | 14/217 (6.45%) | 9.12% / 9.77% | 18/217；11.21% | PASS：仅签名/样板/短通用class |
| src/components/card.tsx | 3/9 (33.33%) | 12/13 (92.31%) | 20/28 (71.43%) | 15.81% / 15.81% | 22/28；16.79% | PASS：仅签名/样板/短通用class |
| src/components/checkbox.tsx | 11/39 (28.21%) | 15/29 (51.72%) | 5/32 (15.62%) | 10.31% / 8.25% | 6/32；16.44% | PASS：仅签名/样板/短通用class |
| src/components/dialog.tsx | 12/47 (25.53%) | 36/56 (64.29%) | 13/64 (20.31%) | 9.77% / 9.77% | 15/64；11.03% | PASS：仅签名/样板/短通用class |
| src/components/field.tsx | 8/53 (15.09%) | 20/92 (21.74%) | 14/121 (11.57%) | 14.51% / 10.36% | 15/121；8.98% | PASS：仅签名/样板/短通用class |
| src/components/fieldset.tsx | 1/16 (6.25%) | 10/18 (55.56%) | 17/38 (44.74%) | 50.75% / 50.75% | 18/38；45.00% | PASS：仅签名/样板/短通用class |
| src/components/input.tsx | 13/95 (13.68%) | 22/167 (13.17%) | 18/242 (7.44%) | 11.80% / 11.15% | 19/242；12.38% | PASS：仅签名/样板/短通用class |
| src/components/layout.tsx | N/A | N/A | N/A：无对应上游 | N/A | 7/52；5.19% | UNVERIFIED：无对应上游 |
| src/components/motion-provider.tsx | N/A | N/A | N/A：无对应上游 | N/A | 26/26；100.00% | UNVERIFIED：无对应上游 |
| src/components/popover.tsx | 13/35 (37.14%) | 33/42 (78.57%) | 68/158 (43.04%) | 50.94% / 50.94% | 69/158；51.30% | PASS：仅签名/样板/短通用class |
| src/components/radio-group.tsx | 11/33 (33.33%) | 12/29 (41.38%) | 6/35 (17.14%) | 16.44% / 13.70% | 7/35；18.42% | PASS：仅签名/样板/短通用class |
| src/components/select.tsx | 30/93 (32.26%) | 44/95 (46.32%) | 19/115 (16.52%) | 10.70% / 7.32% | 20/115；11.40% | PASS：仅签名/样板/短通用class |
| src/components/separator.tsx | 1/8 (12.50%) | 8/14 (57.14%) | 9/26 (34.62%) | 38.30% / 38.30% | 10/26；40.82% | PASS：仅签名/样板/短通用class |
| src/components/switch.tsx | 7/41 (17.07%) | 9/21 (42.86%) | 5/25 (20.00%) | 19.23% / 15.38% | 6/25；22.22% | PASS：仅签名/样板/短通用class |
| src/components/textarea.tsx | 6/47 (12.77%) | 17/63 (26.98%) | 6/73 (8.22%) | 9.45% / 4.72% | 7/73；10.85% | PASS：仅签名/样板/短通用class |
| src/components/theme-provider.tsx | N/A | N/A | N/A：无对应上游 | N/A | 150/150；100.00% | UNVERIFIED：无对应上游 |
| src/components/toast.tsx | 11/64 (17.19%) | 53/131 (40.46%) | 38/187 (20.32%) | 15.64% / 11.52% | 42/187；16.41% | PASS：仅签名/样板/短通用class |
| src/components/tooltip.tsx | 2/14 (14.29%) | 27/102 (26.47%) | 22/149 (14.77%) | 21.05% / 20.10% | 24/149；22.43% | PASS：仅签名/样板/短通用class |
| src/components/typography.tsx | N/A | N/A | N/A：无对应上游 | N/A | 20/74；16.19% | UNVERIFIED：无对应上游 |
| src/hooks/use-copy-to-clipboard.ts | N/A（0/0） | 16/27 (59.26%) | 9/58 (15.52%) | 18.00% / 18.00% | 13/58；18.84% | PASS：仅签名/样板/短通用class |
| src/hooks/use-media-query.ts | N/A（0/0） | 26/43 (60.47%) | 7/49 (14.29%) | 10.94% / 10.94% | 7/49；10.77% | PASS：仅签名/样板/短通用class |
| src/index.ts | N/A | N/A | N/A：无对应上游 | N/A | 26/26；43.33% | UNVERIFIED：无对应上游 |
| src/locale.tsx | N/A | N/A | N/A：无对应上游 | N/A | 62/81；83.78% | UNVERIFIED：无对应上游 |
| src/locales/en-US.ts | N/A | N/A | N/A：无对应上游 | N/A | 26/35；82.54% | UNVERIFIED：无对应上游 |
| src/text-steps.ts | N/A | N/A | N/A：无对应上游 | N/A | NOT_RUN：HEAD无此文件 | UNVERIFIED：无对应上游 |
| src/utils.ts | N/A | N/A | N/A：无对应上游 | N/A | 11/18；62.86% | UNVERIFIED：无对应上游 |
| styles.css | N/A | N/A | N/A：无对应上游 | N/A | 37/55；80.43% | UNVERIFIED：无对应上游 |
| theme.css | N/A | N/A | N/A：无对应上游 | N/A | 223/348；73.72% | UNVERIFIED：无对应上游 |
| tokens/components.css | N/A | N/A | N/A：无对应上游 | N/A | 82/403；29.71% | UNVERIFIED：无对应上游 |
| tokens/primitives.css | N/A | N/A | N/A：无对应上游 | N/A | 42/42；100.00% | UNVERIFIED：无对应上游 |
| tokens/semantic.css | N/A | N/A | N/A：无对应上游 | N/A | 131/157；84.52% | UNVERIFIED：无对应上游 |
| utilities.css | N/A | N/A | N/A：无对应上游 | N/A | 40/57；80.81% | UNVERIFIED：无对应上游 |

## 人工实质判读

| 片段 | 排除理由与边界 |
| --- | --- |
| Button cva / variants / variant、children / Fragment | 公共变体结构与 JSX 容器；实际变体表、状态逻辑和完整样式不同。 |
| Button `pointer-events-none absolute` | 当前215 / 冻结77，仅两个通用类描述不命中的定位层；沿用 H 的短通用样板排除，不据此排除完整状态样式。 |
| Card useRender / mergeProps / defaultTagName / data-slot | 公开 render 与 props 合并的最小透传样板；当前单一边界，没有保留上游完整解剖或完整样式。71.43% L 不等于实质派生比例。 |
| Field / Fieldset / Separator | 原语包装、slot、props、orientation 与括号；错误投影、invalid、legend 与 decorative 的逻辑不逐字相同。 |
| Popover Portal→Positioner→Popup→Viewport、位置透传、createHandle | Base UI 原语公开组合样板与公开别名；当前完整class、状态回调、modal与属性接线不同。 |
| Tooltip / Toast | 原语部件、Provider透传与位置属性；关联/同步、真实结果与清理实现不同。Toast 当前156 / 冻结194 的 `outline-none` 为单个通用工具类。 |
| AlertDialog / Dialog / RadioGroup / Select | 相同行仅为签名、import、原语/属性透传与闭合语法。Select 当前122 / 冻结58 的 `min-w-0` 为单个工具类；新增的 value/list 分工与状态处理没有实质逐字相同。 |
| Checkbox / Switch / Textarea | API名、公开原语与少量工具 token；没有相同完整实质 class 或实现行。 |
| useCopyToClipboard `return;` / `}, timeout);` / `}, []);` | 单独return、计时器与effect闭合样板，不携带相同整段复制请求逻辑；请求归属、异常与卸载处理不同。默认 timeout=2000 位于公开参数签名，按 H 口径排除。 |
| useMediaQuery MediaQueryInput 字段 | 公开类型签名及闭合括号；删除 useIsMobile 后没有非样板相同实现行。原始媒体查询输入保留。 |
| 无对应原文的16份文件 | 当前内容与HEAD已扫描；没有冻结CSS/相应文件，来源的进一步独立证明为UNVERIFIED。theme.css 的旧“from the coss registry”注释是待交 owner 的历史来源引用，不能只删注释就声称证明来源。 |

## 用例处置：逐条理由

- 从 hook import 删除 `useIsMobile`：该公开导出已按裁决删除，测试不应导入不存在的 API。
- 删除唯一 `useIsMobile is a width query, not a device assertion` 用例。其中“调用 matchMedia 参数为 width<768px”与“结果为true”两个断言都仅以被删除导出为被测入口，因此随入口删除。`useMediaQuery` 的 `max-md` 参数化用例与已匹配首帧用例继续覆盖查询和布尔快照，没有降低任何保留断言。
- 没有修改其他既有断言或截图；`useMediaQuery` 剩余14条测试全部PASS。来源字段相关测试处置以最终引用范围为准，尚未变更。

## 来源文件与消费者处置

- 已删除 `packages/ui/coss-source.json`、`packages/ui/THIRD_PARTY_NOTICES.md`、`packages/ui/scripts/check-upstream.mjs`；删除前本轮备份仅留在临时证据目录，不随包发布。
- package.json 删除两份来源文件的 files 项与 check:upstream 脚本；不改本库 `license: "MIT"`、版本号、依赖或其他分发入口。
- 两份README删除现存coss改编说明和无效检查命令，保留本库MIT与依赖自身许可，公开记明破坏性API删除。
- `gen-catalog.mjs` 无来源清单读取，按当前 metadata 投影 source；20份当前metadata均为local。不将来源统一硬编码，不修改已有来源断言迁就结果。workflow未调用check:upstream，不需改。
- 原M文件清单以外的真实引用已提交范围澄清，等待裁决：两个根脚本、两份LICENSE来源附注、官网introduction/nav/types与component页注释、conventions注释、theme.css注释。没有越界修改，完整引用收尾尚未完成。

## 实际验证

| 检查 | 状态 | 实际观察与边界 |
| --- | --- | --- |
| 全量当前源码/CSS取证 | PASS（覆盖与冻结门禁）；16文件UNVERIFIED | 34文件、18对应；AST解析0错误，15清单指纹0mismatches；3个完整class均为已判读短通用样板。 |
| useIsMobile源码引用 | PASS | 运行源码、测试与构建输出中0引用；历史文档保留本次变更说明，不把历史提及当消费者。 |
| 媒体查询定向测试 | PASS | `pnpm --filter @qingye/ui exec vitest run test/use-media-query.test.ts`：14/14；覆盖SSR/hydration、查询输入、订阅换位/清理、缺API与legacy路径。 |
| 删除后typecheck | PASS | `pnpm --filter @qingye/ui typecheck`退出0；最终日志typecheck-final.log。 |
| 默认完整test（构建前） | FAIL | 462PASS / 3FAIL：public-guidance/style-contract源指南投影未同步，Select高亮用例一次失败；不改这些断言。 |
| 默认完整test（构建后） | FAIL | 464PASS / 1FAIL：Button注册模板编译测试超时5000ms。指南/样式/Select均PASS。默认并行下未稳定全通过，超时原因UNVERIFIED。 |
| 最终完整test，单worker | PASS | `pnpm --filter @qingye/ui test --maxWorkers=1`：31文件、465/465，25.86s。仅串行调度，不增加超时、不改断言；Button模板1083ms，Select19/19。两个先前完整失败的日志保留。 |
| 唯一一次build | PASS | `pnpm --filter @qingye/ui build`退出0；生成20组件、0patterns；dist/ui.css77.8KB。build共1次，未额外运行gen:catalog、gen:index或prepack。 |
| catalog来源投影 | PASS | 包/官网catalog均20组件，所有source=local，extras20；生成器保持原样，未硬编码来源。 |
| 构建后公开导出/声明 | PASS | 实际import dist/index.js，useIsMobile不存在、useMediaQuery仍为函数；hook.d.ts同样只保留useMediaQuery。 |
| npm pack --dry-run --ignore-scripts --json | PASS（包清单目标） | 在packages/ui运行，@qingye/ui0.4.0，123包文件；两来源文件与check-upstream均不含，LICENSE仍含。ignore-scripts避免prepack隐式第二次build；并非安装/发布验收。 |
| capabilities实际读取方 | FAIL（删除清单引入的跨边界依赖断裂） | 只读调用generateCapabilities()：ENOENT packages/ui/coss-source.json；脚本范围外、未获授权，不改为忽略错误。首次stdin探针被既有CLI argv检查拒绝，随后用node -e正确调用，最终路径失败为以上真实观测。 |
| 全部活动来源引用清理 | FAIL（未全部收尾） | 清单外10个文件仍有实际读取或过时表述；范围澄清待答复。LICENSE附注仍指向已删声明，pack不含两文件不等于这些正文已清理。 |
| AGENTS当前表述 | PASS（事实）；完成句NOT_WRITTEN | 保留禁止复制规则，记取证通过/声明清单删除/库许可保留及清单外待交接；因引用仍断裂，没有写“完成来源收尾”。 |
| project-guidance校验 | PASS | seed_project_guidance.py validate --file AGENTS.md：valid=true、errors=[]；实路径在本仓库，按开工快照确认只改指定来源段，禁止复制规则保留。 |
| workflow/来源字段既有断言 | PASS（无需变更） | workflow无check:upstream调用；20份metadata已为local。gen-catalog与其他测试断言保持原样，唯一删除用例理由见上文。 |
| 保存/边界核对 | PASS | hook/test/manifest与开工快照的最小指定变更完全一致；12个范围外/无需改文件未变；34份源码/CSS无新增遗漏、0drift，57冻结原文0drift。 |
| 文档与diff检查 | PASS | 新报告/决策文件链接、围栏、全行空白检查；git diff --check退出0。报告未跟踪，另做全文件检查，不假称git diff覆盖它。 |
| 浏览器/实体设备/包安装/发布 | NOT_RUN | 无UI表达变更，不启动浏览器；没有部署、提交或发布。 |

证据目录中的 audit.mjs SHA-256：`ce75b188905e092c63583243c7e1286a15cc2dadc79c5d60bec73aba410c85d9`；compare.py：`afda86ff381100f0eef68e6dbfc103e05b952aec2db8bf3349b826dadbe6583f`。两个脚本与H原脚本逐字一致，只换输出目录。日志及最终保存核对为ui-test-before-cleanup.log、ui-test-final.log、ui-test-serial.log、typecheck-final.log、build.log、pack-dry-run.json、capabilities-consumer-final.log和final-preservation.json。


## 证据指纹

冻结路径前缀 `/Volumes/SUNSANG 1/Codex/qingye-provenance-freeze/upstream-repo-copy/`；完整57份原文清单在 snapshots.json。

| 当前文件 | 当前 SHA-256 | 冻结文件；SHA-256 |
| --- | --- | --- |
| motion.css | 35348981bd0e5e487f8dc03d30a33d6285c8bc447b58935c63aa2ca3526c8394 | 无对应上游 |
| src/components/alert-dialog.tsx | 21e2832b614bd90f5594b7818c96d69c3a8a3e9358e111dded83e4bccc69f59e | alert-dialog.tsx；e6e8d2aee4115cb2e2d5bba7e3f16941a2cfaa12a2bceae70d605b1751706d82 |
| src/components/button.tsx | 8ce98a093d8ada83f28ed805733269684452c9cdba5b848000a9b8ef65a6e420 | button.tsx；1e65556bde3071f90f61825cf573aec74bdd8695824470bea3dae4d68a6b8fc8 |
| src/components/card.tsx | fb1b47e9219579390a5ed90258feb36d089dfa6f4393bfb769048626fd04e083 | card.tsx；b59dbc0bd5d61694fcf1948fb8134795b0f5a1bf0a28d8d6bc817297c73a006e |
| src/components/checkbox.tsx | e26f238e4ac7e3639b3a97216d825d867d7e7df132b2e486b527de1201a2ac02 | checkbox.tsx；a1b8b4180a39a47c47bd2b50e432d0911da6efe3b963b065b3b5cb8893760047 |
| src/components/dialog.tsx | b2886f992ce7fa5b406ea7aaeac6c04ef31728adf4ed1c76150a4965a564479b | dialog.tsx；14ad87a5f81d7753e9a954aa0624df49168eccc2c8d3074a41ea0a8bed3970d5 |
| src/components/field.tsx | 4f3e1980271449013140a6fefb8c901af3205262a643cbce344ed7df67e1676e | field.tsx；02ffda39f73f04638f580fd1fbb76e783cb252f9a87ecebdd62fb4bd0d1393ff |
| src/components/fieldset.tsx | 1dc3ff00ae8d76f9a5ff80c54074232c4e41d08f8c7d8cde196d2aed27e4f046 | fieldset.tsx；1ec36d2a2c60fd1ba229682a876f8d672ade66019513bac1a6747885d369f2a6 |
| src/components/input.tsx | 5c4c1e1a52bdf42332b150a7ac805f98fc8468a37c336c537d80ea1879fb24ab | input.tsx；3d488d491eb4e63642adc8b9354b0b0cc5b8ec4e284bbc26da7e2516f24980a4 |
| src/components/layout.tsx | 76c9ecaa123470a79aebc6bb300ed77a776f7f5232922ce7200a6821aad213a8 | 无对应上游 |
| src/components/motion-provider.tsx | 8afcccdffccd39281b9211a5d474b7e4121f0e3895ba39e1c4d79777f664f8b2 | 无对应上游 |
| src/components/popover.tsx | d7ab675f6f0670100370b276b4176bb9de11a29b4fedef31787f2918192e689d | popover.tsx；ff9b981ce4e68b86a266f69480c59967c7065aacfa2d4ce927d91a1eff0035cf |
| src/components/radio-group.tsx | daeeb0c15d39c4ba850fd2d6e5e9dba613e835d4776d44f7b7dc33ab78bf1a71 | radio-group.tsx；b2479e9967f0ba48d1acbb58a4fff7b919aa746bb8a61cbbff389baac02abbb7 |
| src/components/select.tsx | 4207b9e9c1cba92479f8239405afd044cc0babb1ab1f1089f4d75ee700e7f2f2 | select.tsx；aa8821bbb4bd6b8b52a6cbaaf8d995f48b1001ad93d4bfa4e5b91b5e6d5f66a0 |
| src/components/separator.tsx | 050cdccb70cb4d1d342f31fb6721107b46497f2ad1baaf444270cc082555a103 | separator.tsx；48393a9f365097e350bb33f0e84d2df25efd6b374868aa075f8d6011378c1d6e |
| src/components/switch.tsx | 703471aef9cb0db0fcc831071e07e2039c5cc11e6b685d336bca4cc8e623ec62 | switch.tsx；2b3bada3d7234149b4d29918d5e312e62919938c2ae0ee61db81350438ad43c4 |
| src/components/textarea.tsx | 0c4f16373d4eee7859a9bd9c5c58e7d9b8e143c05e023bb1d68eaec2f96093d4 | textarea.tsx；3e30e41c099d7343cb0a603557acd4e8b7c94b43139a7a489df322c04c5f601c |
| src/components/theme-provider.tsx | 7b0b37626ab5203a847354abfd607dbd0369fe3472a3e4cbb9a9062f38a6c822 | 无对应上游 |
| src/components/toast.tsx | 59e04532dff441f50f345231a1a7d3c9c06c03c9f59deb5abdf2a99d7ac80edc | toast.tsx；6c83bd6ab5a90388aa06380924381058746bf2bd5ebb7b2187496a59e7c517d6 |
| src/components/tooltip.tsx | 96082bad541d435ff346238a62d13e2694cc6fe154309fcda6d59bc6b6f76a71 | tooltip.tsx；0ac59089d1d813b7eb1cd9e08ed2ff3b3931e4024df649ddb45b1eb43d50f694 |
| src/components/typography.tsx | a25be1083ddc026428a32026614e3f4eaddcdf6b883012b297f764aac42ef11a | 无对应上游 |
| src/hooks/use-copy-to-clipboard.ts | a81fd8b442cd6e6de19b37caae73e2fc784e24e8f7625c7bf89702bc48a3ae19 | use-copy-to-clipboard.ts；d2e9ba430e34dafd4ae7fe5403d2ad4987fdcd73f2a47bd0571c1f84c143536d |
| src/hooks/use-media-query.ts | a81b8b0281d384a8ab0c5bb1daacdad035786bd80a25e4cc6ab2babbda804e61 | use-media-query.ts；17d75ccaf898415db77dd72659c9b1fdb9338290ae54e8371b772e0b221c9fca |
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

## 相同行与完整class附录

下表列出全部相同文本，当前与冻结物理行号可复核。A为公共签名/import/别名，B为语法/公开组合样板；候选行已经按上文逐项人工判读，不以提取器标签自动认定。相同文本集合与difflib的M不同；相同行重排与重复也列出。

### src/components/alert-dialog.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { AlertDialog as AlertDialogPrimitive } from &quot;@base-ui/react/alert-dialog&quot;;</code> | A：公开签名/import/别名 |
| 15,21,42,47,52,57,61,64,67 | 22,38,54,87,103,124,140,153,161 | <code>}</code> | B：语法/原语组合样板 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/button.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 4 | 5 | <code>import { cva, type VariantProps } from &quot;class-variance-authority&quot;;</code> | A：公开签名/import/别名 |
| 26,152,162,168,180 | 89 | <code>};</code> | B：语法/原语组合样板 |
| 28 | 10 | <code>export const buttonVariants = cva(</code> | B：语法/原语组合样板 |
| 30 | 12 | <code>{</code> | B：语法/原语组合样板 |
| 31 | 17 | <code>variants: {</code> | B：语法/原语组合样板 |
| 36 | 32 | <code>variant: {</code> | B：语法/原语组合样板 |
| 40,44,77 | 16,31,46,47,48 | <code>},</code> | B：语法/原语组合样板 |
| 78,102,142,225 | 49 | <code>);</code> | B：语法/原语组合样板 |
| 85,103,114,145,226 | 55,96 | <code>}</code> | B：语法/原语组合样板 |
| 98,212 | 74 | <code>{children}</code> | B：语法/原语组合样板 |
| 116 | 57 | <code>export function Button({</code> | A：公开签名/import/别名 |
| 122 | 66 | <code>}: ButtonProps): React.ReactElement {</code> | A：公开签名/import/别名 |
| 146,179 | 95 | <code>});</code> | B：语法/原语组合样板 |
| 186 | 73 | <code>&lt;&gt;</code> | B：语法/原语组合样板 |
| 219 | 80 | <code>)}</code> | B：语法/原语组合样板 |
| 224 | 81 | <code>&lt;/&gt;</code> | B：语法/原语组合样板 |

完全相同class字面量：
- 当前215 / 冻结77：`pointer-events-none absolute`。短通用工具样板，理由见上文。

### src/components/card.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { mergeProps } from &quot;@base-ui/react/merge-props&quot;;</code> | A：公开签名/import/别名 |
| 4 | 4 | <code>import { useRender } from &quot;@base-ui/react/use-render&quot;;</code> | A：公开签名/import/别名 |
| 5 | 5 | <code>import type React from &quot;react&quot;;</code> | A：公开签名/import/别名 |
| 11 | 8 | <code>export function Card({</code> | A：公开签名/import/别名 |
| 12 | 9,16,29,36,49,56,69,86,103,110,123,140,147,160,177,194,201,214,221,234,241 | <code>className,</code> | A：公开签名/import/别名 |
| 13 | 10,24,30,44,50,64,70,81,87,98,104,118,124,135,141,155,161,172,178,189,195,209,215,229,235,249 | <code>render,</code> | A：公开签名/import/别名 |
| 14 | 11,31,51,71,88,105,125,142,162,179,196,216,236 | <code>...props</code> | A：公开签名/import/别名 |
| 19 | 13,33,53,73,90,107,127,144,164,181,198,218,238 | <code>const defaultProps = {</code> | B：语法/原语组合样板 |
| 20 | 14,34,54,108,145,199,219,239 | <code>className: cn(</code> | B：语法/原语组合样板 |
| 22 | 9,16,29,36,49,56,69,86,103,110,123,140,147,160,177,194,201,214,221,234,241 | <code>className,</code> | B：语法/原语组合样板 |
| 23 | 17,37,57,111,148,202,222,242 | <code>),</code> | B：语法/原语组合样板 |
| 24 | 18 | <code>&quot;data-slot&quot;: &quot;card&quot;,</code> | B：语法/原语组合样板 |
| 25 | 19,39,59,76,93,113,130,150,167,184,204,224,244 | <code>};</code> | B：语法/原语组合样板 |
| 26 | 21,41,61,78,95,115,132,152,169,186,206,226,246 | <code>return useRender({</code> | B：语法/原语组合样板 |
| 27 | 22,42,62,79,96,116,133,153,170,187,207,227,247 | <code>defaultTagName: &quot;div&quot;,</code> | B：语法/原语组合样板 |
| 28 | 23,43,63,80,97,117,134,154,171,188,208,228,248 | <code>props: mergeProps&lt;&quot;div&quot;&gt;(defaultProps, props),</code> | B：语法/原语组合样板 |
| 29 | 10,24,30,44,50,64,70,81,87,98,104,118,124,135,141,155,161,172,178,189,195,209,215,229,235,249 | <code>render,</code> | B：语法/原语组合样板 |
| 30 | 25,45,65,82,99,119,136,156,173,190,210,230,250 | <code>});</code> | B：语法/原语组合样板 |
| 31 | 26,46,66,83,100,120,137,157,174,191,211,231,251 | <code>}</code> | B：语法/原语组合样板 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/checkbox.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { Checkbox as CheckboxPrimitive } from &quot;@base-ui/react/checkbox&quot;;</code> | A：公开签名/import/别名 |
| 27 | 16,60,62 | <code>)}</code> | B：语法/原语组合样板 |
| 34 | 66 | <code>}</code> | B：语法/原语组合样板 |
| 36 | 68 | <code>export { CheckboxPrimitive };</code> | A：公开签名/import/别名 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/dialog.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { Dialog as DialogPrimitive } from &quot;@base-ui/react/dialog&quot;;</code> | A：公开签名/import/别名 |
| 4 | 5 | <code>import { useRender } from &quot;@base-ui/react/use-render&quot;;</code> | A：公开签名/import/别名 |
| 5 | 7 | <code>import type React from &quot;react&quot;;</code> | A：公开签名/import/别名 |
| 15,21,33,49,54,59,64,70,74,78 | 24,30,46,62,112,132,158,174,187,214 | <code>}</code> | B：语法/原语组合样板 |
| 30 | 76 | <code>portalProps?: DialogPrimitive.Portal.Props;</code> | A：公开签名/import/别名 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/field.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { Field as FieldPrimitive } from &quot;@base-ui/react/field&quot;;</code> | A：公开签名/import/别名 |
| 22,45,51,57,64,71,78,86,102,132 | 18,34,47,60,73 | <code>}</code> | B：语法/原语组合样板 |
| 25 | 11,24,40,53,66 | <code>return (</code> | B：语法/原语组合样板 |
| 27 | 12 | <code>&lt;FieldPrimitive.Root</code> | B：语法/原语组合样板 |
| 28 | 14 | <code>data-slot=&quot;field&quot;</code> | B：语法/原语组合样板 |
| 30 | 15,31,44,57,70 | <code>{...props}</code> | B：语法/原语组合样板 |
| 41 | 29 | <code>)}</code> | B：语法/原语组合样板 |
| 42 | 16,32,45,58,71 | <code>/&gt;</code> | B：语法/原语组合样板 |
| 44,119 | 17,33,46,59,72 | <code>);</code> | B：语法/原语组合样板 |
| 136 | 80 | <code>export { FieldPrimitive };</code> | A：公开签名/import/别名 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/fieldset.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { Fieldset as FieldsetPrimitive } from &quot;@base-ui/react/fieldset&quot;;</code> | A：公开签名/import/别名 |
| 14,28 | 11,23 | <code>return (</code> | B：语法/原语组合样板 |
| 15 | 12 | <code>&lt;FieldsetPrimitive.Root</code> | B：语法/原语组合样板 |
| 16 | 14 | <code>data-slot=&quot;fieldset&quot;</code> | B：语法/原语组合样板 |
| 17,32 | 15,27 | <code>{...props}</code> | B：语法/原语组合样板 |
| 23,39 | 16,28 | <code>/&gt;</code> | B：语法/原语组合样板 |
| 24,40 | 17,29 | <code>);</code> | B：语法/原语组合样板 |
| 25,41 | 18,30 | <code>}</code> | B：语法/原语组合样板 |
| 29 | 24 | <code>&lt;FieldsetPrimitive.Legend</code> | B：语法/原语组合样板 |
| 30 | 26 | <code>data-slot=&quot;fieldset-legend&quot;</code> | B：语法/原语组合样板 |
| 43 | 32 | <code>export { FieldsetPrimitive };</code> | A：公开签名/import/别名 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/input.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { Input as InputPrimitive } from &quot;@base-ui/react/input&quot;;</code> | A：公开签名/import/别名 |
| 18 | 12 | <code>unstyled?: boolean;</code> | A：公开签名/import/别名 |
| 20 | 13 | <code>nativeInput?: boolean;</code> | A：公开签名/import/别名 |
| 32,43,86,190,217 | 14 | <code>};</code> | B：语法/原语组合样板 |
| 55,107,114,252 | 43,66 | <code>}</code> | B：语法/原语组合样板 |
| 116 | 16 | <code>export function Input({</code> | A：公开签名/import/别名 |
| 118 | 17,41 | <code>className,</code> | A：公开签名/import/别名 |
| 120 | 19 | <code>unstyled = false,</code> | A：公开签名/import/别名 |
| 121 | 20 | <code>nativeInput = false,</code> | A：公开签名/import/别名 |
| 135 | 22 | <code>...props</code> | A：公开签名/import/别名 |
| 136 | 23 | <code>}: InputProps): React.ReactElement {</code> | A：公开签名/import/别名 |
| 222 | 35 | <code>return (</code> | B：语法/原语组合样板 |
| 224 | 45 | <code>data-slot=&quot;input-control&quot;</code> | B：语法/原语组合样板 |
| 236 | 63 | <code>)}</code> | B：语法/原语组合样板 |
| 238 | 46 | <code>&gt;</code> | B：语法/原语组合样板 |
| 248 | 64 | <code>&lt;/span&gt;</code> | B：语法/原语组合样板 |
| 251 | 33,65 | <code>);</code> | B：语法/原语组合样板 |
| 254 | 68 | <code>export { InputPrimitive };</code> | A：公开签名/import/别名 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/popover.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { Popover as PopoverPrimitive } from &quot;@base-ui/react/popover&quot;;</code> | A：公开签名/import/别名 |
| 4 | 4 | <code>import type React from &quot;react&quot;;</code> | A：公开签名/import/别名 |
| 7 | 7 | <code>export const PopoverCreateHandle: typeof PopoverPrimitive.createHandle =</code> | A：公开签名/import/别名 |
| 8 | 8 | <code>PopoverPrimitive.createHandle;</code> | A：公开签名/import/别名 |
| 21,39,43,54,92,102,114,123,134,138,149,153,164,168 | 26,84,90,103,116 | <code>}</code> | B：语法/原语组合样板 |
| 30 | 12 | <code>export function PopoverTrigger({</code> | A：公开签名/import/别名 |
| 31,58,126,141,156 | 13,30,64,93,106 | <code>className,</code> | A：公开签名/import/别名 |
| 32,67,127,142,157 | 15,38,87,94,107 | <code>...props</code> | A：公开签名/import/别名 |
| 33 | 16 | <code>}: PopoverPrimitive.Trigger.Props): React.ReactElement {</code> | A：公开签名/import/别名 |
| 34,76,129,144,159 | 17,48,96,109 | <code>return (</code> | B：语法/原语组合样板 |
| 35 | 18 | <code>&lt;PopoverPrimitive.Trigger</code> | B：语法/原语组合样板 |
| 36,96,131,146,161 | 21,67,100,113 | <code>{...props}</code> | B：语法/原语组合样板 |
| 40 | 20 | <code>data-slot=&quot;popover-trigger&quot;</code> | B：语法/原语组合样板 |
| 41,136,151,166 | 101,114 | <code>/&gt;</code> | B：语法/原语组合样板 |
| 42,122,137,152,167 | 25,83,102,115 | <code>);</code> | B：语法/原语组合样板 |
| 46 | 40 | <code>portalProps?: PopoverPrimitive.Portal.Props;</code> | A：公开签名/import/别名 |
| 49 | 41 | <code>side?: PopoverPrimitive.Positioner.Props[&quot;side&quot;];</code> | A：公开签名/import/别名 |
| 50 | 42 | <code>align?: PopoverPrimitive.Positioner.Props[&quot;align&quot;];</code> | A：公开签名/import/别名 |
| 51 | 43 | <code>sideOffset?: PopoverPrimitive.Positioner.Props[&quot;sideOffset&quot;];</code> | A：公开签名/import/别名 |
| 52 | 44 | <code>alignOffset?: PopoverPrimitive.Positioner.Props[&quot;alignOffset&quot;];</code> | A：公开签名/import/别名 |
| 53 | 46 | <code>anchor?: PopoverPrimitive.Positioner.Props[&quot;anchor&quot;];</code> | A：公开签名/import/别名 |
| 56 | 28 | <code>export function PopoverPopup({</code> | A：公开签名/import/别名 |
| 57 | 14,29 | <code>children,</code> | A：公开签名/import/别名 |
| 59 | 31 | <code>side = &quot;bottom&quot;,</code> | A：公开签名/import/别名 |
| 60 | 32 | <code>align = &quot;center&quot;,</code> | A：公开签名/import/别名 |
| 63 | 36 | <code>anchor,</code> | A：公开签名/import/别名 |
| 64 | 37 | <code>portalProps,</code> | A：公开签名/import/别名 |
| 77 | 49 | <code>&lt;PopoverPrimitive.Portal {...portalProps}&gt;</code> | B：语法/原语组合样板 |
| 78 | 50 | <code>&lt;PopoverPrimitive.Positioner</code> | B：语法/原语组合样板 |
| 79 | 56 | <code>side={side}</code> | B：语法/原语组合样板 |
| 80 | 51 | <code>align={align}</code> | B：语法/原语组合样板 |
| 81 | 57 | <code>sideOffset={sideOffset}</code> | B：语法/原语组合样板 |
| 82 | 52 | <code>alignOffset={alignOffset}</code> | B：语法/原语组合样板 |
| 83 | 53 | <code>anchor={anchor}</code> | B：语法/原语组合样板 |
| 93 | 55 | <code>data-slot=&quot;popover-positioner&quot;</code> | B：语法/原语组合样板 |
| 94,104,116 | 22,58,68,77 | <code>&gt;</code> | B：语法/原语组合样板 |
| 95 | 59 | <code>&lt;PopoverPrimitive.Popup</code> | B：语法/原语组合样板 |
| 103 | 66 | <code>data-slot=&quot;popover-popup&quot;</code> | B：语法/原语组合样板 |
| 105 | 69 | <code>&lt;PopoverPrimitive.Viewport</code> | B：语法/原语组合样板 |
| 115 | 76 | <code>data-slot=&quot;popover-viewport&quot;</code> | B：语法/原语组合样板 |
| 117 | 23,78 | <code>{children}</code> | B：语法/原语组合样板 |
| 118 | 79 | <code>&lt;/PopoverPrimitive.Viewport&gt;</code> | B：语法/原语组合样板 |
| 119 | 80 | <code>&lt;/PopoverPrimitive.Popup&gt;</code> | B：语法/原语组合样板 |
| 120 | 81 | <code>&lt;/PopoverPrimitive.Positioner&gt;</code> | B：语法/原语组合样板 |
| 121 | 82 | <code>&lt;/PopoverPrimitive.Portal&gt;</code> | B：语法/原语组合样板 |
| 125 | 86 | <code>export function PopoverClose({</code> | A：公开签名/import/别名 |
| 128 | 88 | <code>}: PopoverPrimitive.Close.Props): React.ReactElement {</code> | A：公开签名/import/别名 |
| 140 | 92 | <code>export function PopoverTitle({</code> | A：公开签名/import/别名 |
| 143 | 95 | <code>}: PopoverPrimitive.Title.Props): React.ReactElement {</code> | A：公开签名/import/别名 |
| 145 | 97 | <code>&lt;PopoverPrimitive.Title</code> | B：语法/原语组合样板 |
| 150 | 99 | <code>data-slot=&quot;popover-title&quot;</code> | B：语法/原语组合样板 |
| 155 | 105 | <code>export function PopoverDescription({</code> | A：公开签名/import/别名 |
| 158 | 108 | <code>}: PopoverPrimitive.Description.Props): React.ReactElement {</code> | A：公开签名/import/别名 |
| 160 | 110 | <code>&lt;PopoverPrimitive.Description</code> | B：语法/原语组合样板 |
| 165 | 112 | <code>data-slot=&quot;popover-description&quot;</code> | B：语法/原语组合样板 |
| 170 | 118 | <code>export { PopoverPrimitive, PopoverPopup as PopoverContent };</code> | A：公开签名/import/别名 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/radio-group.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { Radio as RadioPrimitive } from &quot;@base-ui/react/radio&quot;;</code> | A：公开签名/import/别名 |
| 4 | 4 | <code>import { RadioGroup as RadioGroupPrimitive } from &quot;@base-ui/react/radio-group&quot;;</code> | A：公开签名/import/别名 |
| 20,38 | 19,40 | <code>}</code> | B：语法/原语组合样板 |
| 35 | 30 | <code>)}</code> | B：语法/原语组合样板 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/select.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 4 | <code>import { Select as SelectPrimitive } from &quot;@base-ui/react/select&quot;;</code> | A：公开签名/import/别名 |
| 4 | 5 | <code>import { useRender } from &quot;@base-ui/react/use-render&quot;;</code> | A：公开签名/import/别名 |
| 25 | 61 | <code>};</code> | B：语法/原语组合样板 |
| 30,35,40,51,78,90,107,119,123,127 | 37,68,89,105,171,208,221,227,243,255 | <code>}</code> | B：语法/原语组合样板 |
| 71 | 100,155,183,238 | <code>)}</code> | B：语法/原语组合样板 |
| 76 | 86 | <code>&lt;/SelectPrimitive.Icon&gt;</code> | B：语法/原语组合样板 |
| 95 | 129 | <code>&lt;SelectPrimitive.Positioner</code> | B：语法/原语组合样板 |
| 97 | 137 | <code>sideOffset={sideOffset}</code> | B：语法/原语组合样板 |
| 98,102,113 | 82,138,143,147,157,164,186,199 | <code>&gt;</code> | B：语法/原语组合样板 |
| 99 | 139 | <code>&lt;SelectPrimitive.Popup</code> | B：语法/原语组合样板 |
| 104 | 167 | <code>&lt;/SelectPrimitive.Popup&gt;</code> | B：语法/原语组合样板 |
| 105 | 168 | <code>&lt;/SelectPrimitive.Positioner&gt;</code> | B：语法/原语组合样板 |
| 117 | 54 | <code>&lt;/span&gt;</code> | B：语法/原语组合样板 |

完全相同class字面量：
- 当前122 / 冻结58：`min-w-0`。短通用工具样板，理由见上文。

### src/components/separator.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 3 | 1 | <code>import { Separator as SeparatorPrimitive } from &quot;@base-ui/react/separator&quot;;</code> | A：公开签名/import/别名 |
| 13 | 10 | <code>return (</code> | B：语法/原语组合样板 |
| 14 | 11 | <code>&lt;SeparatorPrimitive</code> | B：语法/原语组合样板 |
| 15 | 16 | <code>data-slot=&quot;separator&quot;</code> | B：语法/原语组合样板 |
| 16 | 18 | <code>{...props}</code> | B：语法/原语组合样板 |
| 17 | 17 | <code>orientation={orientation}</code> | B：语法/原语组合样板 |
| 25 | 15 | <code>)}</code> | B：语法/原语组合样板 |
| 26 | 19 | <code>/&gt;</code> | B：语法/原语组合样板 |
| 27 | 20 | <code>);</code> | B：语法/原语组合样板 |
| 28 | 21 | <code>}</code> | B：语法/原语组合样板 |
| 30 | 23 | <code>export { SeparatorPrimitive };</code> | A：公开签名/import/别名 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/switch.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { Switch as SwitchPrimitive } from &quot;@base-ui/react/switch&quot;;</code> | A：公开签名/import/别名 |
| 24 | 16,23 | <code>)}</code> | B：语法/原语组合样板 |
| 27 | 28 | <code>}</code> | B：语法/原语组合样板 |
| 29 | 30 | <code>export { SwitchPrimitive };</code> | A：公开签名/import/别名 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/textarea.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 12,20,38 | 12 | <code>};</code> | B：语法/原语组合样板 |
| 57 | 49 | <code>data-slot=&quot;textarea&quot;</code> | B：语法/原语组合样板 |
| 71 | 48,52 | <code>)}</code> | B：语法/原语组合样板 |
| 73 | 51,53 | <code>/&gt;</code> | B：语法/原语组合样板 |
| 76 | 29,56 | <code>}</code> | B：语法/原语组合样板 |

完全相同class字面量：
无；仅token交集，见统计。

### src/components/toast.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 1 | <code>&quot;use client&quot;;</code> | B：语法/原语组合样板 |
| 3 | 3 | <code>import { Toast } from &quot;@base-ui/react/toast&quot;;</code> | A：公开签名/import/别名 |
| 11 | 289 | <code>export interface ToastProviderProps extends Toast.Provider.Props {</code> | A：公开签名/import/别名 |
| 12 | 290 | <code>position?: ToastPosition;</code> | A：公开签名/import/别名 |
| 16,20,33,36,40,41,64,134,175,185,194 | 40,44,47,58,60,182,207,273,292,306,310,323 | <code>}</code> | B：语法/原语组合样板 |
| 17 | 308 | <code>export interface AnchoredToastProviderProps extends Toast.Provider.Props {</code> | A：公开签名/import/别名 |
| 21 | 25 | <code>type ToastData = {</code> | A：公开签名/import/别名 |
| 23 | 30 | <code>tooltipStyle?: boolean;</code> | A：公开签名/import/别名 |
| 24,144 | 31 | <code>};</code> | B：语法/原语组合样板 |
| 88,150,179,188 | 72,94,191,209,300,317 | <code>return (</code> | B：语法/原语组合样板 |
| 90 | 95,217 | <code>&lt;Toast.Root</code> | B：语法/原语组合样板 |
| 96 | 75,97,218 | <code>className={cn(</code> | B：语法/原语组合样板 |
| 99,159 | 84,139,154,174,224,243,263,265 | <code>)}</code> | B：语法/原语组合样板 |
| 103,160,168 | 87,144,151,171,196,216,228,240,260 | <code>&gt;</code> | B：语法/原语组合样板 |
| 119,123,125 | 153,165,166,242,254,255 | <code>&lt;/div&gt;</code> | B：语法/原语组合样板 |
| 129 | 175,232,264 | <code>&lt;/Toast.Content&gt;</code> | B：语法/原语组合样板 |
| 130 | 176,266 | <code>&lt;/Toast.Root&gt;</code> | B：语法/原语组合样板 |
| 133,174,184,193 | 177,181,268,272,305,322 | <code>);</code> | B：语法/原语组合样板 |
| 152 | 74,193 | <code>&lt;Toast.Viewport</code> | B：语法/原语组合样板 |
| 153 | 86 | <code>data-slot=&quot;toast-viewport&quot;</code> | B：语法/原语组合样板 |
| 162 | 210 | <code>&lt;Toast.Positioner</code> | B：语法/原语组合样板 |
| 165 | 213 | <code>data-slot=&quot;toast-positioner&quot;</code> | B：语法/原语组合样板 |
| 170 | 267 | <code>&lt;/Toast.Positioner&gt;</code> | B：语法/原语组合样板 |
| 172 | 179,270 | <code>&lt;/Toast.Viewport&gt;</code> | B：语法/原语组合样板 |
| 173 | 180,271 | <code>&lt;/Toast.Portal&gt;</code> | B：语法/原语组合样板 |
| 180 | 301 | <code>&lt;Toast.Provider toastManager={toastManager} {...props}&gt;</code> | B：语法/原语组合样板 |
| 181,190 | 302,319 | <code>{children}</code> | B：语法/原语组合样板 |
| 183,192 | 304,321 | <code>&lt;/Toast.Provider&gt;</code> | B：语法/原语组合样板 |
| 189 | 318 | <code>&lt;Toast.Provider toastManager={anchoredToastManager} {...props}&gt;</code> | B：语法/原语组合样板 |
| 195 | 325 | <code>export { Toast as ToastPrimitive };</code> | A：公开签名/import/别名 |

完全相同class字面量：
- 当前156 / 冻结194：`outline-none`。短通用工具样板，理由见上文。

### src/components/tooltip.tsx

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 1 | 3 | <code>import { Tooltip as TooltipPrimitive } from &quot;@base-ui/react/tooltip&quot;;</code> | A：公开签名/import/别名 |
| 17,21,36,42,56,67,68,78,147 | 19,65 | <code>}</code> | B：语法/原语组合样板 |
| 81 | 31 | <code>align?: TooltipPrimitive.Positioner.Props[&quot;align&quot;];</code> | A：公开签名/import/别名 |
| 83 | 32 | <code>side?: TooltipPrimitive.Positioner.Props[&quot;side&quot;];</code> | A：公开签名/import/别名 |
| 84 | 33 | <code>sideOffset?: TooltipPrimitive.Positioner.Props[&quot;sideOffset&quot;];</code> | A：公开签名/import/别名 |
| 85 | 34 | <code>anchor?: TooltipPrimitive.Positioner.Props[&quot;anchor&quot;];</code> | A：公开签名/import/别名 |
| 86 | 35 | <code>portalProps?: TooltipPrimitive.Portal.Props;</code> | A：公开签名/import/别名 |
| 94 | 26 | <code>anchor,</code> | B：语法/原语组合样板 |
| 95 | 28 | <code>portalProps,</code> | B：语法/原语组合样板 |
| 96 | 22,50 | <code>className,</code> | B：语法/原语组合样板 |
| 97 | 27 | <code>children,</code> | B：语法/原语组合样板 |
| 122 | 37 | <code>return (</code> | B：语法/原语组合样板 |
| 124 | 39 | <code>&lt;TooltipPrimitive.Positioner</code> | B：语法/原语组合样板 |
| 125 | 43 | <code>data-slot=&quot;tooltip-positioner&quot;</code> | B：语法/原语组合样板 |
| 126 | 40 | <code>align={align}</code> | B：语法/原语组合样板 |
| 128 | 44 | <code>side={side}</code> | B：语法/原语组合样板 |
| 129 | 45 | <code>sideOffset={sideOffset}</code> | B：语法/原语组合样板 |
| 130 | 41 | <code>anchor={anchor}</code> | B：语法/原语组合样板 |
| 131,141 | 46,54,58 | <code>&gt;</code> | B：语法/原语组合样板 |
| 132 | 47 | <code>&lt;TooltipPrimitive.Popup</code> | B：语法/原语组合样板 |
| 133 | 52 | <code>data-slot=&quot;tooltip-popup&quot;</code> | B：语法/原语组合样板 |
| 142 | 59 | <code>{children}</code> | B：语法/原语组合样板 |
| 143 | 61 | <code>&lt;/TooltipPrimitive.Popup&gt;</code> | B：语法/原语组合样板 |
| 144 | 62 | <code>&lt;/TooltipPrimitive.Positioner&gt;</code> | B：语法/原语组合样板 |
| 145 | 63 | <code>&lt;/TooltipPrimitive.Portal&gt;</code> | B：语法/原语组合样板 |
| 146 | 64 | <code>);</code> | B：语法/原语组合样板 |

完全相同class字面量：
无；仅token交集，见统计。

### src/hooks/use-copy-to-clipboard.ts

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 3 | 5 | <code>export function useCopyToClipboard({</code> | A：公开签名/import/别名 |
| 4 | 6 | <code>timeout = 2000,</code> | A：公开签名/import/别名 |
| 5 | 7 | <code>onCopy,</code> | A：公开签名/import/别名 |
| 7 | 8 | <code>}: {</code> | A：公开签名/import/别名 |
| 8 | 9 | <code>timeout?: number;</code> | A：公开签名/import/别名 |
| 9 | 10 | <code>onCopy?: () =&gt; void;</code> | A：公开签名/import/别名 |
| 24 | 39,47 | <code>};</code> | B：语法/原语组合样板 |
| 25 | 48 | <code>}, []);</code> | B：语法/原语组合样板 |
| 40,47,49,63 | 18,25,30,37,46,51 | <code>}</code> | B：语法/原语组合样板 |
| 48 | 17 | <code>return;</code> | B：语法/原语组合样板 |
| 57 | 36 | <code>}, timeout);</code> | B：语法/原语组合样板 |

完全相同class字面量：
无；仅token交集，见统计。

### src/hooks/use-media-query.ts

| 当前行 | 冻结行 | 相同文本 | 判读 |
| --- | --- | --- | --- |
| 8 | 64 | <code>export type MediaQueryInput = {</code> | A：公开签名/import/别名 |
| 9 | 65 | <code>min?: Breakpoint &#124; number;</code> | A：公开签名/import/别名 |
| 10 | 66 | <code>max?: Breakpoint &#124; number;</code> | A：公开签名/import/别名 |
| 11 | 68 | <code>pointer?: &quot;coarse&quot; &#124; &quot;fine&quot;;</code> | A：公开签名/import/别名 |
| 12 | 69 | <code>};</code> | B：语法/原语组合样板 |
| 16,25,30,33,35,49,55 | 25,30,43,54,55,58,62,92,96 | <code>}</code> | B：语法/原语组合样板 |

完全相同class字面量：
无；仅token交集，见统计。

## 保留与验证边界

- 仓库外冻结 `upstream-repo-copy/`、`repo-copies/` 与 `/Volumes/SUNSANG 1/Codex/qingye-ui-archive/2026-10-03-pending-rewrite/` 全部保留；后两处未读取正文。用途为历史来源与法律记录，不作为实现源。
- docs/历史报告与决策（仅本任务决策更新当前裁决，H记录保留）、scripts/ai-eval、test-results、node_modules、旧dist资料排除在手工清理之外；生成产物只由唯一授权build更新。
- 浏览器、实体设备、外部消费者、发布均NOT_RUN；本轮没有UI实现或视觉基线变化，没有任务自有浏览器/服务器需要清理。
- 最终保存核对：12个范围外/无需改文件均未变，34份源码/CSS及扫描清单没有漂移，57份冻结原文指纹未变；结果为PASS。不得外推后续并行改动。

## 清单外引用交接

题面“只改任务列出的文件”限制仍有效；范围澄清尚未收到回复，未将无回复当授权。下列是实际保留项，不在本轮删除内容里隐藏：

| 文件 | 剩余项 | 必须处理的关系 |
| --- | --- | --- |
| scripts/gen-capabilities.mjs | 读取已删清单、coss分支/counts、源注释扫描 | 由owner移除旧清单协议并按当前local事实输出，保留事实/UNVERIFIED区分；当前真实调用FAIL。 |
| scripts/lib/ui-facts.mjs | pathsForFacts仍加入已删清单 | 指纹输入应对应现存事实；不能吞掉缺文件错误。 |
| LICENSE、packages/ui/LICENSE | 末尾coss来源附注与已删声明链接 | 仅删过时附注，保留本库MIT正文。 |
| apps/docs/src/pages/docs/introduction.tsx | 当前coss改编、清单/上游/声明说明 | 写当前来源与Base UI公共原语关系，不新增已归档能力。 |
| apps/docs/src/lib/nav.ts | 来源描述与关键词 | 跟随当前介绍事实。 |
| apps/docs/src/lib/types.ts | source=coss或local | 当前metadata全local，owner决定移除过时枚举值；不凭改类型证明原创。 |
| apps/docs/src/pages/docs/component.tsx | coss参考的旧注释 | 清理当前代码的过时说明。 |
| packages/ui/test/conventions.test.ts | coss继承例外的旧注释 | 只修事实注释，不放宽样式规则。 |
| packages/ui/theme.css | “from the coss registry”注释 | 来源说明需独立核实/由owner处置；本轮无冻结CSS原文，不用删除注释代替证据。 |

本轮已按授权完成三来源文件删除与包清单核验，但**不表示全仓来源收尾已完成**。主agent可接管上列引用，或明确扩展M所有权后续处理；仓库外冻结/归档继续保留，不再重建库以弥补文字引用。
