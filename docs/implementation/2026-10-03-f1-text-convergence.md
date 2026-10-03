# F1：文字档收敛、尺寸档案与间距审计

依据只来自 `docs/decisions/2026-10-03-foundation.md` §§1、2、3、8、14。没有读取上游或实现来源清单。下表针对开工快照 `/tmp/qingye-f1-start`：当前源码实际有 **35 个字号角色、85 个文字 token**；任务中的 38 是历史计数，快照中不存在的三个角色不能虚构。公共 `text-field-input` 使用旧 `--qy-text-input-*` token，表中同时注明这个名称差异。

## 逐项收敛（§8）

“独立”指职责不同；`-strong` 与 `-mobile` 是同一语义的强调或窄屏派生，不是新职责。`dense` 是密集区域中的内容，`support` 是帮助理解或恢复的辅助说明，即使某档同值也不合并。

| 原角色（35 项） | §8 归属 / 最终档 | 独立需要或重复 |
|---|---|---|
| display-lg | display-lg：页面级主标题 | 独立，页面标题的大幅预设 |
| display | display：页面级主标题 | 独立，常规页面标题预设 |
| title | title：区块标题 | 独立 |
| heading | heading：卡片、面板标题 | 独立；与下方两种旧表面标题收敛 |
| body | body：正文 | 独立 |
| label | label：字段与控件标签 | 独立内容语义；具体控件字样使用控件档 |
| caption | caption：最小说明文字 | 独立 |
| chapter | chapter：小节标题 | 独立 |
| lead | chapter：小节标题 | 与 chapter 重复；旧职责含小标题，未新增“导语”语义 |
| reading | reading：长阅读正文 | 独立阅读行距 |
| prose | prose：富文本内文 | 独立富文本上下文 |
| metric | metric：数字读数 | 独立，档内包含等宽数字 |
| dense-mobile | dense-mobile：密集区域文字 | dense 的窄屏派生 |
| dense | dense：密集区域文字 | 独立 |
| support-mobile | support-mobile：辅助说明 | support 的窄屏派生 |
| support | support：辅助说明 | 独立 |
| caption-strong | caption-strong：最小说明文字 | caption 的强调派生 |
| support-strong | support-strong：辅助说明 | support 的强调派生 |
| support-strong-mobile | support-strong-mobile：辅助说明 | support 的强调 + 窄屏派生；不与 dense 合并 |
| body-strong | body-strong：正文 | body 的强调派生 |
| dense-strong | dense-strong：密集区域文字 | dense 的强调派生 |
| dense-strong-mobile | dense-strong-mobile：密集区域文字 | dense 的强调 + 窄屏派生；不与 support 合并 |
| prose-strong | prose-strong：富文本内文 | prose 的强调派生 |
| subheading | heading：卡片、面板标题 | 与 heading 重复，旧职责正是有界表面的紧凑标题 |
| panel-title | heading：卡片、面板标题 | 与 heading 重复，浮层不另发明一套标题语义 |
| micro | micro：标记内文字 | 独立 |
| micro-tight | micro：标记内文字 | 与 micro 重复，原差异仅 1px 大小 |
| button | control-md（实际按控件外高选 xs/sm/md/lg） | 与 input/field-label 同一控件职责的重复命名 |
| button-mobile | control-md-mobile（同样按外高配对） | 上述控件档的窄屏派生 |
| button-lg | control-lg / control-lg-mobile | 大外高档的控件字样，旧名称被外高档取代 |
| button-xs | control-xs / control-xs-mobile | 行内外高档的控件字样，旧名称被外高档取代 |
| input（公共类 field-input） | control-md（具体控件按外高选档） | 与 button/field-label 重复 |
| input-mobile（公共类 field-input-mobile） | control-md-mobile（具体控件按外高选档） | 上述控件档的窄屏派生 |
| field-label | control-md | 与 button/input 重复；标准控件所关联的字样 |
| field-label-mobile | control-md-mobile | 上述控件档的窄屏派生 |

最终 **31 个工具类档位**：23 个内容档（含强调与窄屏派生）+ 8 个控件档（四个外高身份及窄屏派生）。`--qy-text-*` 为 124 个属性 token，因为每个幸存档都显式拥有 size / leading / tracking / weight；属性数量上升是补全契约，不是新增语义。注册表 `src/text-steps.ts` 同时供合并工具及预编译样式使用，和主题映射保持一致。

## 最终档的作用范围与真实消费（§8）

所有档的修改入口均为 `packages/ui/tokens/components.css` 中该档自己的 `--qy-text-<role>-{size,leading,tracking,weight}` 四元组；`theme.css` 只映射这个四元组。控件档不引用任何内容档，因此调整 body/title 不会连带调整控件文字。窄屏名称固定为 `<语义>-<可选 strong>-mobile`，控件名称固定为 `control-<外高字样档>-mobile`，组件使用窄屏档 + `sm:` 桌面档。

| 内容档 | 职责 / 范围 | 当前真实消费者 |
|---|---|---|
| display / display-lg | 页面级主标题；32 / 40px 预设 | Heading；PageHeader 使用 display；Heading 可显式选择 display-lg |
| title | 区块标题；24px 预设 | Heading；Prose 的 h2 |
| chapter | 小节标题；22px 预设 | Heading；Prose 的 h3；官网文章小节 |
| heading | 有独立对象边界的标题；16px 预设 | CardTitle；DialogTitle；PopoverTitle |
| body / body-strong | 正文及正文中的强调；14px | Steps；DataTable；Progress |
| reading | 长篇阅读正文；15px / 1.7 行高 | Prose 默认；官网文章正文 |
| prose / prose-strong | 富文本正文及其中强调；15px / 1.6 行高 | Prose 紧凑模式；Prose 的 strong/b |
| support / support-strong + mobile | 辅助说明与强调；14 / 16px | DrawerDescription；NavigationMenu；Tabs |
| dense / dense-strong + mobile | 密集集合/工具区文字及强调；12 / 14px | Badge；TagInput；Combobox；Prose 表格与代码 |
| caption / caption-strong | 最小说明与其中强调；12px | 日期说明；菜单分组标题；Prose figcaption |
| label | 名称性标签；13px | 布局 Text 的标签角色；Heading 的 label 预设 |
| metric | 数值读数；24px，档内含 tabular-nums / tnum | StatValue；ProgressCircle；Meter 示例 |
| micro | 固定标记内的字样；11px | AvatarFallback；Steps 标记；Badge |

| 控件外高档 | 所用独立字样档 | 桌面 / 窄屏字号 | 桌面 / 窄屏行高 | 消费范围 |
|---|---|---|---|---|
| xs | control-xs / control-xs-mobile | 12 / 14px | 16 / 20px | Button 的行内档 |
| sm | control-sm / control-sm-mobile | 13 / 14px | 18 / 20px | Button；InputGroup；SegmentedControl |
| md、lg | control-md / control-md-mobile | 14 / 15px | 20 / 22px | Button；Input；Select；FieldLabel |
| xl | control-lg / control-lg-mobile | 16 / 17px | 24 / 24px | Button 的落地页位置档 |

内容权重由档位给出：标题 / metric 600；标签 / micro / strong 500；普通文字 400。统一控件字样暂取 500。Prose 删除本地的字号、行高与字重覆盖，按结构职责消费档位；TextLink 继承所在文字的权重。CJK 的 `:lang(zh|ja|ko)` 字距清零机制保留，拉丁文 tracking 随字号选预设。

## 尺寸档案与间距审计（§§1–3）

尺寸每档包含桌面 / 窄屏外高、水平留白及边框补偿、匹配的字样档、图标尺寸与图标余量。有实际输入消费者的 sm/md/lg 另提供内部高度与文字块余量；12 个未使用的 xs/xl 派生叶子已删除。全局 spacing 不参与外高或水平留白。文字块垂直 padding 是 `(外高 − 该档行高 − 2px) / 2`；固定外高是输入，padding 是余量。NativeSelect 的 trailing 预留由同档 `padding-bordered + icon` 换算。日期触发器清除动作的 full-box 预留为 `xs 外高 + 既有放置 inset + field-gap/2`，真实消费于 DatePicker / DateRangePicker / DateTimePicker；sm inset 由 `(sm − xs)/2` 得到 2px，默认/ lg 使用 `(md − xs)/2` 得到 4px。

| 外高档 | 桌面 / 窄屏外高 | 水平留白 / 实际有边框 padding | 桌面 / 窄屏图标 |
|---|---|---|---|
| xs | 24 / 28px | 10 / 9px | 14 / 16px |
| sm | 28 / 32px | 12 / 11px | 14 / 16px |
| md | 32 / 36px | 14 / 13px | 16 / 18px |
| lg | 36 / 40px | 16 / 15px | 16 / 18px |
| xl | 40 / 44px | 16 / 15px | 18 / 20px |

9 个 §3 角色全部已存在，无缺项，无语义重复，因此不新增间距角色。它们的数值保持原样，仅补齐作用范围注释。

| 已有角色 | 关系作用范围 | 现值 | 真实消费 |
|---|---|---|---|
| field-gap | 同一字段的 label / control / error | space-2 | Field |
| field-group-gap | 字段之间 | space-5 | FieldGroup |
| action-gap | 同组动作之间 | space-2 | 组合任务动作区 |
| panel-padding | 面板内缘到内容 | space-6；窄屏 space-4 | Card（card-spacing 转发到 Header / Panel / Footer） |
| panel-padding-sm | 紧凑面板内缘到内容 | space-4 | 紧凑 Card |
| panel-gap | 面板内段落之间 | space-4；compact space-3 | CardHeader / CardPanel |
| section-gap | 分节之间 | space-5；compact space-4 | Layout 分节角色 / 任务分节 |
| row-default | 列表常规行占位 | 48px；compact 使用 row-compact | Table（DataTable 组合消费） |
| row-compact | 列表紧凑行占位 | 40px | Table compact（DataTable 组合消费） |

## 文档未定项与采用的解释

- §8 给语义而未定新合并 heading 的数值：采用 16px / 1.4 / −0.012em / 600，作为有界对象标题预设。旧 subheading 14px、heading 13px、panel-title 20px 收敛为 16px，属于显式视觉基线变化。
- §8 未要求保留旧 title 数值。为避免正文结构中 h2 比 h3 小，title 采用 24px，chapter 保留 22px，得到 display32 > title24 > chapter22 > heading16。旧 title18 → 24px 是显式视觉基线变化；控件独立字样不跟随它变大。
- §8 控件字号表优先于文字“窄屏大 1px”的概括句：xs 为 12 → 14px，sm 为 13 → 14px，md 为 14 → 15px，lg 为 16 → 17px。没有自行改成全部 +1。
- §8 未定控件字样的行高、字重及 tracking：采用上表固定 line box 与 medium500，tracking 按实际字号递减；全部集中在四元组中。消除旧 input / button / field-label 的局部权重/行高差异是要求的收敛。
- §1 未定每档图标的准确数值：沿用 STANDARDS §2 的小控件 14/16px、标准 16/18px；xl 延续既有 18/20px，作为比例不变的预设。图标 padding 仍严格由外高减图标后对半换算，未设并列控件身份。
- §1 的比例标签按整数四舍五入解读：lg 的 16/36 精确为 44.444…%，md 的 14/32 为 43.75%。保留权威表的精确尺寸，断言显示比例落在 40–44% 且精确留白 ≤ 外高 50%。
- §1 未规定内嵌清除动作的占位公式：按已有 xs 动作盒、原位置 inset 与半个 field-gap 换算完整动作预留，保留动作位置并防止标签触及动作盒；不像 trailing 图标只预留 glyph。
- 任务历史计数为 38，实检当前只有 35 个大小角色；逐项表完整覆盖当前实现，不为补齐计数新造角色。

## 验证与旧断言更新

- PASS：`pnpm --filter @qingye/ui exec vitest run test/foundation-tokens.test.ts test/text-role-css.test.ts test/type-migration.test.ts test/typography.test.tsx`，最终 29/29 通过，4 个文件通过。
- `text-role-css.test.ts`：旧 `text-field-input` / input token 改断言 `text-control-md` 的独立四元组，仍验证 `text-input` 只代表公共颜色，新增 weight / tracking 断言。
- `type-migration.test.ts`：旧 dense-strong-mobile 大小别名改断言独立属性；旧通用 medium token 改断言该档自己的 weight 属性。保留值、响应式和颜色合并检查，并新增真实 CLI 的 AST 隔离迁移回归；注释、文案与动态类不得被误改。
- 新 `foundation-tokens.test.ts`：精确五档预设、比例及上限、边框补偿、spacing 独立、四个控件档的桌面/窄屏字号、完整注册表与主题四元组编译、metric 数字对齐。
- `typography.test.tsx`：保留原三项；新增 display-lg / chapter 可消费、无本地字重覆盖的断言。
- 实际 computed 值、完整 build/typecheck/test、生成器与动效验证由同任务唯一浏览器 owner 记录在主执行报告。这里不把 token 源码与 CSS 编译断言写成运行时生效证据。
