# 强制颜色模式取证（2026-10-12）

范围：`forced-colors: active`（Windows 高对比度）下，库的各部位 × {浅, 深} × {边界可见 B, 状态可辨 S, 焦点可见 F}。
结论：修复前 135 PASS / 95 FAIL / 0 UNVERIFIED，修复后 230 PASS / 0 FAIL / 0 UNVERIFIED（另有 250 格不适用）。
修复只在 `packages/ui/styles.css` 的 `@media (forced-colors: active)` 内，未改任何组件、token 与 utilities.css。

## 方法与环境

- 脚本：`scripts/forced-colors-audit.mjs`（`DOCS_URL` 默认 `http://localhost:5180`；有 FAIL 时退出码 1；截图只在内存，不写仓库；`--out` 指定输出目录，默认系统临时目录）。
- 浏览器：Playwright 1.63 驱动 Chromium 153.0.8010.12，`forcedColors: 'active'`，1100×900，`reducedMotion: reduce`，浅、深各一遍。
- **边界：这是 Chromium 对 forced-colors 媒体特性的模拟，不是真实的 Windows 对比主题。** Chromium 在浅色下给出白底黑字、`Highlight` = 深靛半透明、`GrayText` = 暗红；深色下黑底白字、`Highlight` = 青色、`GrayText` = 绿色。真实 Windows 主题（Aquatic、Desert、Dusk、Night sky 与自定义）各有自己的 Highlight / GrayText 配对，**未逐一实测**。所以 PASS 的含义是「信号存在、由系统色关键字画出、在这套模拟配色下可见」，不是「所有 Windows 主题下都通过」。
- 度量是真实截图的像素：边界 = 元素四边与其外一像素处至少 60% 的采样点对比 ≥ 3:1（线或填充边缘都算）；状态 = 与对照元素比较底面、外缘、墨量、边框与字色，字形类标记（勾、点、抓手）逐像素比较，另检查文字下是否垫了与表面不同的底板；填充类读数 = 填充与轨道（或与页面底）≥ 3:1；焦点 = 真实 Tab 之后 `focus({focusVisible:true})`，等 600ms，聚焦前后截图差异像素 ≥ 周长的一半、盒子尺寸不变。computed style 只作旁证。
- 数据编码类（图系列、热力图浓淡、占比段）只要求「与底可辨」与「相邻编码可辨」（色相差或 1.5:1），数值与名称由文字承担。
- 「修复前」矩阵 = 同一份当前组件代码，用 `--without-fixes` 在页面里删掉本库的 forced-colors 规则（只保留原有的 `:focus-visible` outline 一条）后测得。因此它反映的是今天的组件（含 Pagination 当前页改淡染、`chart.tsx` 新增的 bar-share / area-share / 阶梯线 / 背景系列 / 事件点 / 参照带线），不是旧版本。
- 普通模式零差异：`--normal-compare` 在非强制颜色下逐页截图（182 页：91 个 playground × 浅深），删掉 forced-colors 规则后再截一次，逐像素比较，并扫描 forced-colors 媒体之外是否出现系统色关键字。结果：182 页 0 差异，0 处泄漏。规则全部写在 `@media (forced-colors: active)` 里，普通模式下不会匹配。

## 修复前后矩阵

每格三字母依次为 B / S / F，浅色与深色以空格分开；P = PASS，F = FAIL，U = UNVERIFIED，· = 不适用。

| 部位 | 修复前 浅 / 深 | 修复后 浅 / 深 |
|---|---|---|
| `button-solid` | F·P F·P | P·P P·P |
| `button-bordered` | P·P P·P | P·P P·P |
| `button-quiet` | ··P ··P | ··P ··P |
| `button-disabled` | ·P· ·P· | ·P· ·P· |
| `input` | P·P P·P | P·P P·P |
| `input-disabled` | ·P· ·P· | ·P· ·P· |
| `checkbox` | PPP PPP | PPP PPP |
| `checkbox-unchecked-focus` | ··P ··P | ··P ··P |
| `checkbox-mixed` | ·P· ·P· | ·P· ·P· |
| `checkbox-disabled` | ·F· ·F· | ·P· ·P· |
| `radio` | PFP PFP | PPP PPP |
| `switch` | FFP FFP | PPP PPP |
| `switch-checked-focus` | ··P ··P | ··P ··P |
| `switch-thumb` | FF· FF· | PP· PP· |
| `slider-track` | FF· FF· | PP· PP· |
| `slider-thumb` | F·F F·F | P·P P·P |
| `segmented-control` | PFP PFP | PPP PPP |
| `segmented-control-unselected-focus` | ··P ··P | ··P ··P |
| `toggle-pressed-focus` | ··P ··P | ··P ··P |
| `toggle-group-pressed-focus` | ··P ··P | ··P ··P |
| `toggle-group` | PFP PFP | PPP PPP |
| `toggle` | ·FP ·FP | ·PP ·PP |
| `tabs` | ·FP ·FP | ·PP ·PP |
| `pagination` | ·FP ·FP | ·PP ·PP |
| `pagination-current-focus` | ··P ··P | ··P ··P |
| `sidebar` | ·FP ·FP | ·PP ·PP |
| `sidebar-current-focus` | ··P ··P | ··P ··P |
| `navigation-menu` | ·FP ·FP | ·PP ·PP |
| `navigation-menu-current-focus` | ··P ··P | ··P ··P |
| `tabs-unselected-focus` | ··P ··P | ··P ··P |
| `calendar-selected` | ·FP ·FP | ·PP ·PP |
| `calendar-range` | ·F· ·F· | ·P· ·P· |
| `tree-selected` | ·FP ·FP | ·PP ·PP |
| `table-row-selected` | ·FP ·PP | ·PP ·PP |
| `select-item` | PPP PPP | PPP PPP |
| `select-item-selected` | ·P· ·P· | ·P· ·P· |
| `combobox-item-selected` | ·P· ·P· | ·P· ·P· |
| `menu-item` | PP· PP· | PP· PP· |
| `combobox-item` | PFP PFP | PPP PPP |
| `progress` | FF· FF· | PP· PP· |
| `progress-indeterminate` | F·· F·· | P·· P·· |
| `progress-segments` | FF· FF· | PP· PP· |
| `meter` | FF· FF· | PP· PP· |
| `meter-tone` | ·F· ·F· | ·P· ·P· |
| `meter-segments` | FF· FF· | PP· PP· |
| `proportion` | FF· FF· | PP· PP· |
| `proportion-segments-differ` | ·F· ·F· | ·P· ·P· |
| `proportion-legend` | F·· F·· | P·· P·· |
| `sparkline` | P·· P·· | P·· P·· |
| `sparkline-band` | ·P· ·P· | ·P· ·P· |
| `skeleton` | F·· F·· | P·· P·· |
| `chart-bar` | P·· P·· | P·· P·· |
| `chart-line` | P·· P·· | P·· P·· |
| `chart-area` | P·· P·· | P·· P·· |
| `chart-reference-band` | P·· P·· | P·· P·· |
| `chart-reference-line` | P·· P·· | P·· P·· |
| `chart-legend-key` | P·· P·· | P·· P·· |
| `chart-bar-share` | P·· P·· | P·· P·· |
| `chart-area-share` | P·· P·· | P·· P·· |
| `chart-event-point` | P·· P·· | P·· P·· |
| `chart-background-series` | P·· P·· | P·· P·· |
| `chart-bar-series-differ` | ·P· ·P· | ·P· ·P· |
| `scatter-chart` | P·· P·· | P·· P·· |
| `heatmap-cell` | ·FP ·FP | ·PP ·PP |
| `heatmap-scale-differ` | ·F· ·F· | ·P· ·P· |
| `heatmap-levels` | ·F· ·F· | ·P· ·P· |
| `heatmap-unknown` | ·F· ·F· | ·P· ·P· |
| `heatmap-legend` | F·· F·· | P·· P·· |
| `heatmap-scale-key` | F·· F·· | P·· P·· |
| `badge` | P·· P·· | P·· P·· |
| `status-dot` | F·· F·· | P·· P·· |
| `status-dot-differ` | ·F· ·F· | ·P· ·P· |
| `alert` | F·· F·· | P·· P·· |
| `toast` | P·· P·· | P·· P·· |
| `tooltip` | F·· F·· | P·· P·· |
| `popover` | P·· P·· | P·· P·· |
| `dialog` | P·· P·· | P·· P·· |
| `kbd` | P·· P·· | P·· P·· |
| `separator` | P·· P·· | P·· P·· |
| `card` | P·· P·· | P·· P·· |

## 修复规则与部位（均在 `styles.css`）

| 规则 | 部位 | 丢了什么 → 补什么 |
|---|---|---|
| `[data-disabled], [aria-disabled=true]` 的 `color / border-color: GrayText` | 所有禁用项 | 只靠 opacity 表达，强制颜色下与可用项同色 → 用 GrayText 角色 |
| 选中集合：`background: Highlight; color: HighlightText; forced-color-adjust: none` | 分段控件选中段、Toggle / ToggleGroup 按下、Pagination 当前页、Sidebar / NavigationMenu 当前项、Tabs 当前项、Combobox / Autocomplete 高亮项、Tree 选中行、Calendar 单选日 | 淡染面（`--qy-track-selected`、`--qy-surface-active`）与「加深一道线」都被抹掉 → 填 Highlight。`forced-color-adjust: none` 必需：Chromium 对仍被调整的文字垫一块 Canvas 色底板，白字落在白板上读不出（实测 Tabs 当前项只剩两条色带） |
| 同集合的子元素 `color: inherit` | 上述项里的图标、计数、描述 | 各自的 `text-muted-foreground` 被压成 CanvasText，落在 Highlight 上 → 回到 HighlightText |
| Sidebar 当前项 `::before` 用 `HighlightText` | 侧栏竖线 | `bg-foreground` 变 Canvas，落在 Highlight 上不可见 |
| Calendar 区间整段 Highlight、去渐变；base 层里把日期字 `HighlightText !important` | 区间起止与中段 | 半格渐变保留而底色丢失；组件自带 utilities 层的 `!important` 字色，只能在更靠前的 base 层以 `!important` 对 `!important` 压过 |
| `tr[data-selected]` 2px Highlight 内线 | DataTable 选中行 | 行底丢失；整行填 Highlight 会吞掉同色的已勾复选框，所以只描线 |
| `[role=checkbox]` 勾选 / 半选：Highlight 实心 + HighlightText 勾 | Checkbox、DataTable 全选与行选择、Tree 勾选 | 空框里的细勾与未选几乎无差别 |
| `radio-group-indicator` 填 Highlight | Radio | 中心点变 Canvas，选中与未选相同 |
| `[role=switch]` 1px ButtonBorder outline；开启时填 Highlight，抓手 ButtonText / HighlightText | Switch | 轨道边是 `inset-ring`（box-shadow）、抓手是背景色，两者全丢，整个开关空白 |
| Slider 轨道 outline、已填段 Highlight、抓手 ButtonFace + outline | Slider | 轨道、已填段、抓手全是纯填充，全部消失 |
| Progress / Meter 轨道 outline、填充 Highlight | Progress（含不定态、`segments`）、Meter（含 `tone`、`segments`） | 轨道与填充都是背景色。`segments` 的 `mask-image` 把 outline 与填充一并切成格，实测分格保留。Meter 的 `tone` 在强制颜色下收成同一色，级别由格数与读数文字承担 |
| `forced-color-adjust: none`：占比段、热力图格、图例色块（占比、图、热力图分档与连续色阶图例条）、StatusDot | 数据编码 | 收成系统色等于丢数据，保留原色；名称、数值由图例文字、格的可访问名称与数据表承担 |
| 实心 Button 1px ButtonBorder 内线 | Button solid | 无边框、填充被抹，只剩字 |
| Tooltip、Alert 的 1px CanvasText 内线 | Tooltip、Alert | 靠表面色（Tooltip 还有阴影）与页面分开，两者全丢 |
| Skeleton 占位条与块的 1px GrayText 内线 | Skeleton | 底色全丢，加载态是一片空白 |
| `:focus-visible` 的颜色在选中项上改为 HighlightText | 选中项的焦点 | 原 outline 画成 Highlight，压在 Highlight 底上零像素变化（实测勾选框、分段选中段） |
| `slider-thumb:has(:focus-visible)` outline | Slider 抓手焦点 | 焦点在隐藏的 input 上，outline 画在了不可见元素 |

所有补线都用负偏移 `outline`，不改盒模型与尺寸（NG9）。没有补规则、本来就 PASS 的部位：Input、bordered / quiet Button 焦点、Select / Menu 高亮、Chart 的柱、线、面积、参照带线、事件点、背景系列、图例键（SVG 的 fill / stroke 被系统保留或写成 currentColor）、Scatter、Sparkline、Badge、Popover、Dialog、Toast、Kbd、Separator、Card。

## 仍需主 agent 或后续处理

- **未被矩阵覆盖（UNVERIFIED，没测过）**：Steps、Accordion、Timeline、Avatar、Stat 的增减标记、Link、Breadcrumb、Drawer、Toast 的各类型、Input 的 invalid 态、只读态、悬停态、Menu 的勾选 / 单选项。需要时往 `PARTS` 加条目即可。
- **缺属性、选择器较脆**：热力图连续色阶的图例条没有 `data-slot`，目前靠 `[data-slot=heatmap] [aria-hidden=true] > span[style*="gradient"]` 定位；Proportion 与 Chart 图例的色块是「`li` 里第一个 `aria-hidden` span」。建议给这些色块加 `data-slot`（如 `heatmap-scale-key`、`legend-key`），规则才不依赖结构。
- Slider 只读抓手（`border-border-strong bg-card`）未单独验证。
- 真实 Windows 对比主题（见上）与 Firefox、Safari 的 forced-colors 实现未测。

## 复跑

```sh
DOCS_URL=http://localhost:5180 node scripts/forced-colors-audit.mjs                    # 矩阵，有 FAIL 则退出码 1
DOCS_URL=http://localhost:5180 node scripts/forced-colors-audit.mjs --without-fixes    # 去掉本库规则后的矩阵（修复前）
DOCS_URL=http://localhost:5180 node scripts/forced-colors-audit.mjs --normal-compare   # 普通模式零差异与泄漏检查
```
