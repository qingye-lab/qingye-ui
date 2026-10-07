import type { ComponentMeta } from "@/lib/types";

export default {
  title: "原生选择 NativeSelect", titleEn: "NativeSelect",
  description: "保留平台选择器、原生选项与表单值。", descriptionEn: "Keep the platform picker, native options and form values.",
  category: "表单", layer: "primitive", source: "local", exports: ["NativeSelect"], keywords: ["native-select", "select", "原生选择", "optgroup"],
  decisions: "原生 size 只表示列表显示行数，不再与呈现几何同名混用；单值形态的几何跟随密度轴，全库一套。multiple 保留多值表单数据和平台列表容量。",
  decisionsEn: "Native size names visible list rows only and no longer doubles as a geometry profile; the single-value form follows the density axis with one geometry library-wide. multiple keeps multi-value form data and platform list capacity.",
  design: {
    methods: ["名实相符", "相成相制", "随境取度"], whenToUse: ["固定选项适合平台原生选择器。"], avoid: ["需要搜索、动态候选或命令菜单时仍用原生 select。"],
    composition: ["独立使用 Label；Field 中单值用 FieldControl render 组合。多值用显式原生名称关系。"],
    stateOwner: { library: ["输入角色、几何接线与原生选项语义。"], application: ["选项、值、禁用与错误事实。"] },
    responsive: ["单值形态一套几何，跟随密度轴；窄屏外高 +4px，粗指针最小外高读 touch-target；多行不固定单行高度。"],
    customization: ["保留平台箭头；className / style / render 属于真实 select。"],
  }, designEn: {"whenToUse":["Fixed options suit the platform's native picker."],"avoid":["Using native select when search, dynamic candidates, or command menus are required."],"composition":["Use Label independently; compose a single value through FieldControl render within Field. Multiple values use an explicit native naming relationship."],"stateOwner":{"library":["Input roles, geometry wiring, and native option semantics."],"application":["Options, values, disabled facts, and errors."]},"responsive":["One geometry for the single-value form, following the density axis; narrow height adds 4px, coarse pointers read touch-target, and multiple rows are not fixed to a single-line height."],"customization":["Retain the platform arrow; className/style/render belong to the actual select."]},
  api: [{ name: "NativeSelect", description: "真实 select，children 使用原生 option / optgroup。", descriptionEn: "A real select with native option and optgroup children.", props: [
    { name: "size / multiple / disabled / required / name", type: "native select props", description: "原生显示行数、多值、禁用、约束与表单名。", descriptionEn: "Native rows, multiple values, disabled state, constraints and form name." },
    { name: "value / defaultValue / onChange", type: "native select props", description: "保留受控与非受控；多值是字符串数组。", descriptionEn: "Controlled and uncontrolled values; multiple values use string arrays." },
    { name: "render / ref / ARIA / className / style", type: "useRender.ComponentProps<select>", description: "属性、事件与 ref 属于实际 select；render 应保留可选值的原生元素。", descriptionEn: "Props, events and ref reach the actual select; render must preserve a native value-selecting element." },
  ] }],
  keyboard: [{ keys: "Tab / 方向键 / 平台选择键", keysEn: "Tab / Arrow keys / Platform picker keys", description: "沿用所在平台的原生选择行为。", descriptionEn: "Uses native selection behavior on the current platform." }],
  notes: ["select 没有只读属性；不可改变的值由应用选择真实禁用或静态表达。", "FieldControl 的值协议为单字符串；multiple 不走该输入注册协议。"],
  notesEn: ["select has no read-only attribute; use actual disabled state or static output when a value cannot change.", "FieldControl uses a single-string value protocol; multiple does not use that input registration protocol."],
} satisfies ComponentMeta;
