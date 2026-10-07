# Batch 5 N：来源尾项与最后一段派生动画

2026-10-03。**N 授权来源尾项 PASS；UI 类型、测试、构建与包清单 PASS；官网 typecheck FAIL（125 条既有诊断，本轮前后完全一致）。** 本报告承接 [M「清单外引用交接」](2026-10-03-batch5-m-provenance.md#清单外引用交接)，不替代 M 的取证边界。

## 依据、阅读与所有权

- 实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`；HEAD `275d7300496dbda93c25899ea6e4eab6720cf31c`。开工检查最近三次提交与 dirty worktree，不 reset、clean、stash、checkout 或 commit。
- 先读 AGENTS.md、根 design.md、STANDARDS.md、基础层、逐值裁决、浮层/展示族决定、上一批 A/B/C 与 M 报告。先在 [来源收尾决定](../decisions/2026-10-03-provenance-closure.md#n来源尾项的语义与关系实施前) 写语义与关系，再改源码。
- N 没有读取冻结副本、归档组件源码或归档测试。仅阅读当前授权文件、其当前消费者/检查器与交接文档；theme.css 的待删除 CSS 正文按 N 专属例外读取，以核对整段删除边界，不用于推导新设计值。
- 手工修改 12 个授权文件：theme.css、motion.css、两份 LICENSE、gen-capabilities.mjs、ui-facts.mjs、introduction.tsx、nav.ts、types.ts、gen-catalog.mjs、component.tsx、conventions.test.ts；另新增本报告并向来源收尾决定追加 N 记录。
- metadata 全部已为 local，未修改任何 meta.ts；未修改组件实现、locale、其他子代理的审查页或演示。事实产物由 gen-capabilities 更新，catalog/AI/registry/包内 design.md/dist 由唯一一次授权 build 刷新，没有手改生成产物。

## 删除与当前来源事实

1. **theme.css**：删除六个 `--animate-*` 变量及对应六套 keyframes：skeleton、caret-blink、toast-success-odd/even、toast-error-odd/even，连同来源注释整段删除。修改前在题面指定的 src、motion.css、utilities.css、styles.css、tokens 中 grep 无命中；exit 1 表示无匹配，没有读取错误。PostCSS 对照开工快照确认其余 theme 声明原值不变。
2. **motion.css**：删除 skeleton 的 reduced-motion 选择器、preview-card-content 的四处选择器、command-dialog-popup/backdrop 与 sheet-popup/backdrop 的规则和分组成员。disclosure、frame、spinner、menubar、resizable 在此文件原本无选择器，复查仍无命中。menu/context-menu、autocomplete、combobox、navigation-menu、drawer 与 otp-field-caret 等归档待重写部位保留。PostCSS 对照证明所有保留目标、声明值及媒体上下文不变。
3. **两份 LICENSE**：仅去掉两行过时附注及其分隔空行，本库 MIT 正文保留；逐字对照修改前正文通过。没有改依赖自身的许可。
4. **事实生成器**：gen-capabilities 不再读取已删清单，不再调用旧来源匹配器或扫描文件头，不再输出 coss 分支/计数。当前 20 个组件统一按本库编写事实输出，design.md 进入事实输入指纹。`provenance.verificationStatus = NOT_RUN` 明示本生成器不做独立来源比对；静态一致性和 metadata 不符仍分别为 PASS / UNVERIFIED。ui-facts 的真实文件读取与指纹读取没有加 catch 或忽略缺失的过滤。
5. **metadata/catalog**：保留 `source: "local"` 字段和既有 catalog 投影/筛选，只移除类型中的 coss 枚举值；20 份 meta.ts 原本全为 local。gen-catalog 新增分类校验，缺少或不符时抛错，不强制改写来源。保留字段是为维持当前 catalog 消费契约，字段本身不证明历史作者独立性。
6. **官网与注释**：介绍/导航写当前 design.md 与 Base UI 公共原语的分工，不再引用已删来源文件或宣称缺席的日期、上传、表格等组件可用。原语示例使用当前存在的 DialogPrimitive。component 页删除以其他组件库作为排版理由的过时注释；conventions 只更新注释。

**CSS 契约与视觉边界**：六个动画别名和对应 keyframes 不再可用，外部未登记消费者为 UNVERIFIED；旧站点外壳仍有失效引用，N 不恢复它们。对当前库源码无消费者的结论来自删除前扫描；未运行浏览器，不把 AST 值保留或 build 成功当作视觉验收。未来 OTP 若需要闪烁，由其重写任务根据 design.md 另作判断，不恢复本段。没有新增 token、z-index、阴影或窄屏适配。

## 既有断言逐条处置

| 位置 | 本轮处置与理由 |
| --- | --- |
| conventions 的 duration scale、drawer/toast 例外、offenders 断言 | 全部原样保留，只修注释；TypeScript printer 移除注释后，修改前后 AST 输出完全相等，未增加任何例外或放宽断言。 |
| metadata 的 source 与依赖它的测试 | 收窄为 local；20 份实际 metadata 无变化，catalog 字段与 extras 投影保留，因此无需修改测试断言。 |
| 其余 UI 测试 | 没有修改；完整单线程测试 31 文件 / 468 条通过，不更新截图或快照。 |

临时验证工具首次 CSS 对照因删除 selector 后的逗号归一化顺序错误而失败；修正采集器后，保留目标/声明/媒体上下文逐项相等。没有为此修改生产声明值或既有测试。首次独立 TypeScript API 对照使用了根 cwd，得到 139=139；最终对照改用官网 CLI 的 cwd/config filename，得到 125=125。前者不冒充官网 CLI 证据，两份日志都保留。

## 来源 grep：每条剩余命中

实际使用多个 include 参数展开题面后缀集合，避开 grep 把花括号当作普通 glob 的差异：

```sh
grep -rniE 'coss|THIRD_PARTY|upstream' \
  --include='*.ts' --include='*.tsx' --include='*.mjs' \
  --include='*.css' --include='*.json' --include='*.md' \
  --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=ai-eval \
  --exclude-dir=test-results --exclude-dir=ai --exclude=catalog.json \
  packages/ui apps/docs/src scripts LICENSE
grep -niE 'coss|THIRD_PARTY|upstream' LICENSE packages/ui/LICENSE
```

构建后主扫描恰好两条，LICENSE 补查零条；coss 与 THIRD_PARTY 均零条：

| 文件与行 | 剩余原文 | 保留理由 |
| --- | --- | --- |
| packages/ui/scripts/gen-catalog.mjs:229 | `a website or upstream namesake may describe another API` | 指其他来源中的同名组件 API，要求先读已安装版本；不陈述本库由其改编、不引用已删文件。保留安装版本优先的有效约束。 |
| apps/docs/src/lib/design-guidance.ts:102 | `its decision has been selected upstream` | 指 `localizedMeta(found, locale)` 在数据流前一步已经选定语言决策；与组件实现来源无关，也是 N 范围外的正常说明。 |

历史决定/报告、初始 baseline、scripts/ai-eval、test-results 与生成的 AI 资料按题面排除，不删除历史证据。生成目录仅由官方 build 更新。

## 验证

| 检查 | 状态 | 实测结果 |
| --- | --- | --- |
| 删除前六动画消费 grep | PASS | 指定源码/样式范围零命中。 |
| PostCSS / MIT / conventions AST 对照 | PASS | 六变量+六 keyframes 整段删除；其他主题声明与保留动效规则不变；两份 MIT 正文不变；既有规则与断言不变。 |
| `node scripts/gen-capabilities.mjs` | PASS | 20 components、357 qy tokens；components/catalog/dist/local 均20，全部静态一致性 PASS，独立来源比较全部 NOT_RUN。最终指纹 `0f76a057638c7dbe02e5274bc9e7e4c217648fe7f88879aefc8ebf8b059698e1`。 |
| 事实生成器临时夹具 | PASS | 无 dist 为 NOT_RUN；错误 metadata 分类与缺 catalog 项为 UNVERIFIED；必要 metadata/design.md 缺失真实抛 ENOENT。夹具已在 finally 删除。 |
| `pnpm --filter @qingye/ui typecheck` | PASS | exit 0。 |
| `pnpm --filter @qingye/ui test --maxWorkers=1` | PASS | 31 文件、468 测试通过。contrast 测试里的未解析运行组合仍明确是 UNVERIFIED。 |
| `pnpm --filter docs typecheck`（构建前及构建后） | FAIL | 两次均125条：TS2307 94、TS7006 21、TS2322 5、TS2305 3、TS7053 2。 |
| 官网本轮前后诊断对照 | PASS | 保持当前依赖/其余工作区文件，只在 TypeScript CompilerHost 中替换 N 的修改前 TS/TSX 快照；相同 cwd、版本、配置下125条诊断的文件/code/start/message逐项相同。没有替换仓库文件。 |
| 唯一一次 `pnpm --filter @qingye/ui build` | PASS | 20组件、0 patterns；AI/registry 刷新，tsc通过，预编译CSS 76.5KB。发生在源码修改与 UI 测试之后。 |
| `npm pack --dry-run --ignore-scripts --json`（packages/ui） | PASS | 123个文件；LICENSE 1076字节，与当前保留正文大小一致，不含过时附注；不含三份已删来源文件。ignore-scripts 避免 prepack 隐式再次 build，没有生成或安装 tarball。 |
| 构建CSS / catalog补查 | PASS | CSS无六动画变量或 keyframes；catalog20组件全local。 |
| 最终范围 grep / diff 空白检查 | PASS | 只有上表两条普通 upstream 用语；没有coss/THIRD_PARTY；授权源码 diff 无空白错误。 |

125条官网错误含四条在本轮触及文件：nav.ts 缺 `../patterns/metadata` 及其参数隐式 any；component.tsx 缺 kbd/table。对应 import 与 map 回调未由 N 修改，且诊断对照相同。introduction.tsx 与 types.ts 无诊断。完整官网外壳恢复不属于来源收尾，不把其 typecheck 标成通过。

## 证据与未验证边界

任务临时证据目录：`/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/qy-batch5-n-fplcebnr`，含授权文件修改前副本与指纹；仅当前文件快照，不是冻结上游副本。日志：

- `/tmp/qy-batch5-n-{ui-typecheck,ui-test,build}.log`
- `/tmp/qy-batch5-n-{docs-typecheck,docs-typecheck-final,docs-baseline,docs-baseline-final}.log`
- `/tmp/qy-batch5-n-{invariants,capability-probes,capabilities-final}.log`
- `/tmp/qy-batch5-n-pack.json`、`/tmp/qy-batch5-n-pack.stderr`、`/tmp/qy-batch5-n-grep.txt`

浏览器/桌面渲染、实体设备、打包消费者安装、外部消费者、发布均 NOT_RUN。本轮没有启动浏览器、服务或后台常驻进程，临时测试进程均已结束。M 对无对应冻结原文文件的独立来源证明仍为 UNVERIFIED；N 根据明确裁决删除已知尾段，不将此升级成全历史法律证明。

范围外的 AGENTS.md/STANDARDS.md/基础层文档仍可能叙述旧动画或“引用待收尾”；本轮仅在来源收尾决定追加当前记录，不越权重写这些文件。其历史文字不能作为恢复已删动画的依据。
