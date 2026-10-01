# 受控布局间距与文字角色

## Status

Applied；阶段单元295/295，最终全库299/299、类型检查与实际 Tailwind 编译通过；登记部位的浏览器间距/字号/前景验证通过。默认字号、控件尺寸及绝大多数默认间距保持；具体视觉变化见 Consequences。

## Context

原组件布局同时读取 Tailwind 数字 spacing 与 `--qy-space-*`，修改库间距不能控制全部布局。全局改 Tailwind `--spacing` 或 `--spacing-N` 会同时改变图标、宽高、定位等几何尺寸。

## Evidence

最终 runtime 首轮发现桌面 Input/Select/InputGroup 字号仍16px。实际生成 CSS 的 `sm:text-input` 只有 `color:var(--qy-border-input)`，没有 font-size；移动16px类因此没有被桌面14px覆盖。修正仅将本次新增的字号 utility 改为 field-input，已有颜色 input 契约保持。

基线 `layout.tsx` 已用 `gap-(--qy-space-N)`；Button/Input 的固定几何与 padding 使用同一个 Tailwind基础尺度。`card.tsx` 的 panel padding 已消费库角色，card gap 却来自独立 Tailwind `--spacing(4)`。

## Decision

整库布局 gap、padding、正 margin、scroll padding 显式消费既有 `--qy-space-*`；命名 scale 由 `--qy-space-1` 推导，仍允许单独覆盖各命名步。半档直接乘基础步，不增加每一个散值对应的新 token。组件自己的 layout alias（card/carousel/toast/timeline gap、viewport padding、drawer inset）接入同一源。

结构零、auto、百分比、fr、边框补偿、负 margin 光学对齐、重叠头像、字形相关 em 距离保留其本义。固定图标大小、控件高度、缩放/位移、thumb/cell/marker 的尺寸、阴影和行几何仍用自己的尺寸角色/常量，完全不覆盖 Tailwind 的全局 spacing。Slider Indicator 对齐轨道的 2px margin 保持固定；Tree guide 改为受控 row padding + 固定 chevron 半宽 − 光学偏移，避免把半个图标也乘入布局 scale。Steps/Timeline connector 的 gap 跟随布局尺度，而 marker 大小保持独立。带图标输入的 leading padding 与 NativeSelect trailing padding 拆开固定字形 reserve 与可调文字 gap；NativeSelect 的 end gap 接同一尺度，保持图标预留和位置关系。Autocomplete/Combobox 尾部预留保留固定 glyph/居中空白/end offset，只有剩余文字 gap 可调；三种 DatePicker 的 clear 预留保留固定 clear-button 宽/end offset，再加可调文字 gap，尺度缩小时仍不进入图标区域；图标本身不随布局尺度变化。

首批排版接管部位是 Button、Input/InputGroup、Textarea、NativeSelect、NumberField、SelectTrigger/SelectButton、Label/FieldLabel/FieldTitle 及 CardDescription；未声称全部菜单/日历/复杂内容排版都已迁移。Button 与这些输入类使用独立语义 text 角色；输入字号 utility 使用 `text-field-input` / `text-field-input-mobile`，源变量仍为 `--qy-text-input-*`。保留公共 `--color-input` 和 `text-input` 的颜色语义，避免 Tailwind 在同名色彩/字号 namespace 中优先生成 color 声明。保留移动 16px/24px / 桌面 14px/20px 的字号/行高；Input 的内层仍由独立内部几何 line-height覆盖，不丢失 InputGroup addon 的原 line box；按钮 xs/lg 继续保持原字号与 line box。表单 Label/FieldLabel 的角色与一般 13px 标签区分，保留移动 16px/18px、桌面 14px/16px 的字号/行高。CardDescription 明确使用 body。`font-normal/medium/semibold` 映射现有 400/500/600 weight tokens。共享 `:lang(zh|ja|ko)` 保持 CJK 字距自然。

## Alternatives

未映射 Tailwind `--spacing-N`：这些值也控制 `size-*`、`h-*`、定位等，会把布局旋钮变成几何旋钮。未把所有数值命名成 token：结构值与光学补偿不是可调间距角色。未把表单字号直接改为 label=13px：会改变既有移动输入/按钮16px约定。

## Consequences

默认布局尺度仍为 4px，原控件几何不变。新语义控件文字在拉丁语言下采用既有 label tracking −0.006em；CJK 保持 0。CardDescription 的 body 行高由原 20px 变为 21px，并采用 body tracking。这两项是明确的排版变化，不称为纯 refactor。compact Card gap 读取 panel-gap 的密度值，这是密度联动，不是默认品牌外观变化。

覆盖入口为文档级 `html[data-brand]` 的 `--qy-space-1`（整套间距）、个别 `--qy-space-N`（一步）、panel roles（高价值部位），以及 text/weight 角色。CSS 派生值在声明元素解析；局部覆盖基础间距不能被解释为全库根角色自动重算。

## Verification

字号 namespace 修正后相关真实4测试文件/18例、全库50文件/299例及类型检查 PASS；新增真实 Tailwind 编译测试验证 desktop/mobile/sm 字号和行高声明，公共 text-input 仍生成颜色，真实 cn 验证颜色与字号共存并分别覆写。修正后的 desktop14/mobile16/组合addon实际字号待 A 重测；不能以编译测试当作浏览器 PASS。收据见 `docs/baseline/task9-token-wiring/input-role-followup-receipt.json`。

Live 全量单元 295/295、类型检查 PASS。此前隔离树 Tailwind 4.3.3 编译 PASS；最终构建产物已在真实浏览器验收登记部位。真实 `cn` 的字体角色/颜色共存和调用方字号覆写测试已覆盖。浏览器需注入根 scale 并读取 Field gap/Card padding/Button padding，同时证明控制高度、图标宽高不随 spacing 改动；分别测 fine 桌面与窄屏、拉丁/CJK文本，不能以类型检查代替视觉验证。

最终实测：根 spacing 4→2→8px 时 Button/Select padding 13→6→27px、gap 8→4→16px，Field gap 同步8→4→16px；默认控件高度与图标几何保持。DatePicker、NativeSelect、Combobox 的固定图标预留在 spacing 缩至2px时仍有正间隙。Input/Select/InputGroup 在两主题下均为桌面14px、窄屏16px，InputGroup addon 保留20/24px行高，inner input 保留30/34px内部行高；实际文字前景与 foreground 一致。拉丁 Button tracking 为−0.084px（14px时），中文为normal。Card 内部 padding/间距转发另由正式台账探针证明；不把外层 Card 的0px padding误报成内层测量。

收据：`docs/baseline/task9-token-wiring/receipt.json`；后续见 `input-role-followup-receipt.json` 与 `test-results/ui-foundations-accepted/runtime.json`。

## Revisit

当新增间距写法、出现图标 reserve 重叠、局部主题需求或新的 body/label role 时，扩展对应部位的真实浏览器探针。不要以截图更新掩盖未知视觉变化。
