# 视觉评审清单（待用户确认）

本文件收集**技术判断已完成、审美判断待定**的视觉变更。按用户 2026-10-03 裁决：视觉定稿不是在最初进行，而是在改动落地、浏览器审计与截图完成后集中一次确认。

原则：

- 满足硬要求且无审美分歧的（可访问行为、状态语义、token 真实接通）由主 agent 直接处理，不入此表。
- 具体配色、轮廓重量、密度观感、间距手感入此表，附可观察后果，由用户定。
- 表中每一项都必须给出**实际渲染色值或位移量**，不给数字感受。

| # | 项目 | 当前值 | 技术约束 | 可选范围 | 后果 |
|---|---|---|---|---|---|
| V1 | 控件边框重量（浅色） | `--qy-border-input: oklch(0 0 0 / 0.50)` → `#7b7b7b`，3.92:1 | 必要控件边界 ≥ 3:1；原 1.25:1 不达标 | `black/38%`≈3.0:1 到 `black/54%`≈4.5:1 | 全部输入框、下拉框、按钮的描边轻重 |
| V2 | 控件边框重量（深色） | `--qy-border-input: oklch(1 0 0 / 0.44)` → `#767676`，4.35:1 | 同上；原 1.18:1 不达标 | `white/36%`≈3.0:1 到 `white/50%`≈5.3:1 | 深色下控件描边轻重 |
| V3 | 强边框（浅/深） | `black/54%`→`#717171` 4.51:1；`white/50%`→`#858585` 5.33:1 | 同上 | 同上 | 分隔、面板边界 |
| V4 | 示例间距网格归位 | Dashboard 桌面上下 padding 各 +2px；窄屏 +2/+1px。Mail 桌面信件顶 +1px；窄屏底 +4px。Studio 桌面左右各 −2px；窄屏上下 −2px、左右 +1px | 4px 网格；原为 `calc(8px + 2px × 0.5)` 形式的非网格值 | 接受或回调个别值 | 三个示例的疏密 |
| V5 | 示例稀疏步长位移 | `55→48`、`36→40`、`60→64px` 三处较大变化 | 同上 | 接受或为个别位置定义尺寸角色 | 三处局部疏密 |

## 覆盖情况

本清单覆盖全部已完成的改造：W6a（对比度）、W6b（组件契约与状态色）、W6c（外壳布局）、W6d（站点重复）、W6e（示例内容）、W3.2b（示例间距）、F1/F3（状态区分与源文订正）。W6f 的四项完成后补入。

## 评审方式（拟定）

1. 所有改动落地，不处于并发中间态。
2. 构建后跑浏览器审计，出浅色/深色 × 桌面/窄屏截图。
3. 一次性提供：清单表 + 对比截图（改前/改后并置）。
4. 用户逐项裁决；接受则记录为定稿，调整则由主 agent 下发修改。

## 补充项（W6a 对比度修复引入）

| # | 项目 | 当前值 | 技术约束 | 后果 |
|---|---|---|---|---|
| V6 | 图表系列色（浅色） | `chart-1` blue-500（未变）；`chart-2` emerald-500→**emerald-700**；`chart-3` amber-500→**amber-700** | 白底实心图形 ≥ 3:1；原 2.46:1 / 2.15:1 不达标 | 浅色下图表由明快转为深沉 |
| V7 | 图表系列色（深色） | `chart-1` blue-500→**blue-400**；`chart-2` emerald-400；`chart-3` amber-400 | 暗底实心图形 ≥ 3:1 | 深色下第一条序列略提亮 |
| V8 | `--qy-warning` 浅色 | amber-500→**amber-700** | 作为实心标记时的对比度 | 警告色深浅，影响 Badge/StatusDot/Meter 的观感 |
| V9 | 焦点环（浅色） | `--qy-ring` neutral-400→**neutral-800**（9.65:1） | 焦点可见性属必要非文本信息 | 焦点环明显变深；`--qy-sidebar-ring` 改为引用 `--qy-ring`，两处不再分叉 |

**待定的是取值深浅，不是"要不要达标"。** 上述四项原始值均低于 3:1，必须提高；可选范围见 V1–V3 的说明方式。

## 补充项（W6c 外壳布局）

| # | 项目 | 当前值 | 技术约束 | 后果 |
|---|---|---|---|---|
| V10 | 文章列宽 | 原跨断点 768→672px；现恒定 768px | 变化检验：目录出现不得使正在阅读的内容重新排版 | 1280px 下目录出现时不再收窄正文 |
| V11 | H2 / H3 字号 | H2 统一 22px、H3 统一 16px（原 API 区 H3 为 15px） | 同一语义层级不应有两种字号 | API 区的节标题略大 |
| V12 | 示例三页 H1 | 统一 32px（原两套外壳两个尺度） | NG3：同一产品面不得混用设计语言 | 三个示例页头一致 |
| V13 | 示例预览内边距 | 横向 移动 16px / 桌面 24px；工具条纵向 8px | C54：面板与其 chrome 条原为 24/40px 对 4px | 预览内容与工具条对齐 |

## 后续修复项

| # | 项目 | 问题 | 建议解法 |
|---|---|---|---|
| F1 ✅ 已修 | `StatusDot` 的 `pending` 与 `unknown` 视觉相同 | 两者样式字符串完全一致（`bg-transparent text-muted-foreground` + 1.5px 内嵌环），且与 `neutral` 仅差 64% 透明度。读屏名称不同，视觉无法区分 | `Badge` 已确立词汇（`pending` 实线边框、`unknown` `border-dashed`）。`StatusDot` 应沿用同一语言：给 `unknown` 加中断/虚线圆环 |
| F2 ✅ 已修 | `native-select`、`progress-circle` 缺 `descriptionEn` | **已定性**：翻译任务拒绝为错误的中文源文写翻译并上报，非遗漏。见 F3 | 随 F3 一并解决 |
| F3 ✅ 已修 | 三处中文源文缺陷 | ① `native-select:7` 说「需要搜索时用 Select」，而 `select:6` 自己说搜索改用 Combobox，两页矛盾 ② `progress-circle:6` 说展示「占用率」，但它是 `role="progressbar"`；占用率属 Meter，且其自身 `avoid` 已警告「环颜色被当作成功结论」 ③ `otp-field:12` 正文写 `OtpField`，实际导出为 `OTPField`，照抄会失败 | 由 W4c 订正中文并补两处 `descriptionEn` |
| F4 ✅ 已修 | `StatusDot` 三态可辨性 | 已改为 `pending` 完整环 / `unknown` 90° 开口环（`clip-path`，实测裁掉 25.5% 面积）/ `neutral` 实心点。与 `Badge` 的实线/虚线词汇一致 | — |

**F1 验证记录**：`clip-path:polygon(50% 50%, 100% 0%, 0% 0%, 0% 100%, 100% 100%)` 排除顶部以中心为顶点的三角形，几何复算裁掉 25.5%（理论 25%）。内嵌环随元素一同裁切，缺口处无描边。测试覆盖 sm/default/lg 三尺寸，断言 `pending` 无开口、`unknown` 有开口。

**F3 验证记录**：三处订正均已核实 —— `native-select` 改为「需要图标或自定义选项时用 Select，需要搜索时用 Combobox」；`progress-circle` 改为「展示任务完成度……占用率用 Meter 展示」并同步更新 `value` 属性说明（`NaN`/`Infinity` 抛 `RangeError`，与 `progress-circle.tsx:72` 实现一致）；`otp-field` 的 `OtpField` 改为 `OTPField`。英文覆盖随之为 88/88 三项全齐。

| F5 🔧 修复中 | `truthfulness.test.mjs` 从不运行 | `apps/docs` 的测试脚本是 `node --test test/*.test.mjs`，只收集 `test/` 目录；W6e 把 188 行、9 项回归测试放在 `src/examples/`，因此本地 `pnpm test` 与 CI 都不会执行它 | 移入 `apps/docs/test/` 并按新深度修正两处相对路径（`../../../../` → `../../../`，`../..` → `..`），要求给出 9 项测试真实执行的输出 |

## 补充项（W6e 示例内容）

| # | 项目 | 说明 |
|---|---|---|
| V15 | 仪表盘卡片表面消失 | `.metric-card`、`.revenue-panel`、`.progress-panel`、`.projects-panel`、`.files-panel` 由 `Card` 改为开放 `section`；`.client-card` 保留围合（每张对应独立客户对象） |
| V16 | 财务控制位置与文案 | 汇总控制移入收入图表，标签改为「收入图表汇总粒度」（按月汇总／按季度汇总）；金额改为与月度记录同源求和；撤下无数据支持的按周与支出选项 |
| V17 | 指标数值 | 「活跃客户」改为进行中项目的**去重**客户数；「进行中项目」改为 active 计数；「完成率」改为 `已完成/全部` 并标注分母；删除无依据的环比 |
| V18 | mail 日期与草稿 | 各邮件显示自身日期（原全部显示 2026-09-30）；回复草稿按邮件 ID 存入会话，关闭/切换/搜索/刷新均保留；新增草稿标记与「保留草稿／继续回复」 |
| V19 | studio 新增界面 | 失败占位、失败计数「6 个文件 · 1 个预览失败」、删除按钮与确认弹窗 |

## 补充项（`Prose` 长文标题的两套字号逻辑）

| # | 项目 | 当前值 | 说明 |
|---|---|---|---|
| V20 | `Prose` 内 h1 与 h2–h4 的字号来源不同 | h1 = `text-display`（绝对令牌，32px 固定）；h2 = `text-[1.25em]`、h3 = `text-[1.0625em]`、h4–h6 = `text-[1em]`（相对父级） | 同一容器内两套逻辑。相对值让 h2–h4 随父级字号缩放，h1 不随。取决于长文阅读的预期：若希望整段随容器缩放，h1 也应相对；若希望 h1 稳定，h2–h4 也应绝对。**未擅自更改**，属长文视觉比例，待评审 |

## 已识别的检查覆盖缺口（不影响当前运行）

| # | 项目 | 说明 |
|---|---|---|
| G1 | 字面字号检查只覆盖官网 | `apps/docs/test/type-scale.test.mjs:47,58` 只扫 `apps/docs/src`，不扫 `packages/ui/src`。库内有 8 处 `text-[…em]`（`typography.tsx` 六处、`code-block.tsx` 一处等），均属 `Prose` 内有意保留的相对字号，但无人看守，未来可能混入真正的绝对字号 |
| G2 | 审计单页导航次数受限 | `scripts/audit.mjs:97-115` 每个变体复用单个 page 扫全部 slug。本机（16GB，swap 已用 3.9/5.1GB）在约第 38 次页面导航后浏览器断开。**非代码缺陷**：改为每批 11 slug 后 32 个子进程全部 EXIT=0。若长期在低内存机器上跑，`audit.mjs` 应定期重建 page |

## 最后一批缺陷（W6f 已修复，验证由主 agent 补完）

审计 91 项中，此前未分配且未修复的 6 项：C30、C32 已分别由 W3.2b（示例间距归位）与 W6e（草稿持久化）解决；以下四项由 W6f 处理。

| # | 项目 | 问题 |
|---|---|---|
| C69 | `Button` 加载态被移出 Tab 序 | `button.tsx:101` 的 `disabled: isDisabled` 让 `loading` 的按钮无法被键盘到达；已有 `aria-disabled`/`aria-busy`，但原生 `disabled` 同时移出焦点。需区分「真禁用」与「暂时不可用」 |
| C70 | `StatusDot` 的 `neutral`/`offline` 叠加透明度 | `text-muted-foreground/64` 与 `/80` 叠在可能已带 alpha 的 token 上，实际对比度取决于背景，同一状态在不同表面可能一个通过一个失败 |
| C71 | `Calendar` 禁用/非本月日期双重透明度 | `disabled:opacity-64` 叠 `text-muted-foreground/72`，实测浅色 1.96:1、深色 2.15:1。禁用日期仍须可读，应"看起来不可用"而非"消失" |
| C72 | `TableHead` 从不设置 `scope` | 全库无 `scope`，表头与单元格无关联，读屏器无法说明某单元格属哪一列 |

### W6f 验证记录（原任务被会话中断，验证由主 agent 补跑）

| # | 修复前 → 修复后 | 实测 | 状态 |
|---|---|---|---|
| C69 | `disabled: isDisabled` → `disabled: Boolean(disabledProp)` + 捕获阶段激活拦截 | 库测试新增 2 项：加载中按钮**可聚焦**（`toBeEnabled` + `toHaveFocus`）但三处激活路径（点击、Enter、Space）全部拦截；真禁用按钮**移出焦点**且不触发 | ✅ 485 测试通过 |
| C70 | `neutral: text-muted-foreground/64` → `text-muted-foreground`；`offline` 的 `/80` 同去 | 浅色 2.36:1 → **4.39:1**；深色 3.66:1 → **7.15:1**（图形要求 ≥3:1） | ✅ |
| C71 | 移除 `disabled:opacity-64`，改为 `in-data-disabled:not-in-data-selected:text-muted-foreground` + 删除线 | 浅色 1.80:1 → **4.39:1**；深色 2.50:1 → **7.15:1**（审计原测 1.96 / 2.15） | ✅ |
| C72 | `TableHead` 新增 `scope = "col"` 默认值并透传 | 库测试新增 1 项：列头 `scope="col"`、行头可声明 `scope="row"` | ✅ |

**视觉影响（入评审）**

| # | 项目 | 说明 |
|---|---|---|
| V21 | Calendar 禁用日期 | 由「双重淡化至近乎不可见」改为「全值 muted 色 + 删除线」。可读性从 1.80:1 升至 4.39:1，但外观由"很淡"变为"清楚但划线" |
| V22 | StatusDot 中性/离线 | 去掉透明度叠加后颜色变实。浅色下 3.66→7.15 的深色感知变化明显 |
| V23 | Button 加载态 | 视觉不变，但键盘行为改变：加载中的按钮现在可被 Tab 到达（此前无法到达） |

**主 agent 直接修改的文件（应记录）**：`packages/ui/test/button.test.tsx`（更新旧断言为验证新行为 + 新增真禁用用例）、`packages/ui/test/status-dot.test.tsx`（断言 `/64` → 全值）、`packages/ui/test/table.test.tsx`（新增 scope 用例）。这三处是 W6f 被中断后遗留的验证缺口，主 agent 补完。

## 承载能力实测（计划 W1.4 / W3.3 要求，本次补做）

| 路由 | 390px | 390px+200% | 1280px | 1280px+200% |
|---|---|---|---|---|
| `/docs/components/button` | ✓ | ✓ | ✓ | ✓ |
| `/docs/components/date-range-picker` | ✓ | ✓ | ✓ | ✓ |
| `/docs/tokens` | ✓ | **✗ 溢出 17px** | ✓ | ✓ |

方法：视口宽 × 根字号 200%，检查文档级横向溢出，并排除 `overflow-x: auto` 容器内的合法横向滚动（代码块、`TokenTable` 的长表格）。

### 未解决缺陷：`/docs/tokens` 在 390px + 200% 下溢出 17px

- **现象**：文档 `scrollWidth - clientWidth = 17`。文章容器右边界 358px，有一个元素到 365px。
- **疑似位置**：`apps/docs/src/pages/docs/tokens.tsx:188` 的 `<span className="font-mono">{utilities.join(" / ")}</span>`（如「`secondary / muted / surface-inset`」，200% 下宽 1296px），其外层裁切 span 的 `min-width` 为 `auto`，在 flex 中不可收缩。
- **已验证无效的修法**：给 `.font-mono` 加 `min-w-0`；给裁切 span 加 `min-w-0`；给 `.docs-inline-code` 加 `overflow-wrap: anywhere`。三者均未改变溢出值，说明我对溢出元素的判定仍有误，**未找到已确认的根因**。
- **影响范围**：仅这一个页面、这一个断点与放大组合。
- **状态**：`UNVERIFIED` —— 已定位到可疑代码，但未证实，修法未确认。
