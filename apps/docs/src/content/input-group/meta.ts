import type { ComponentMeta } from "@/lib/types";

export default {
  title: "输入组合 InputGroup", titleEn: "InputGroup",
  description: "让输入与标记、单位或附属动作共用编辑边界。", descriptionEn: "Give an input and its markers, units or actions one editing boundary.",
  category: "表单", layer: "primitive", source: "local", exports: ["InputGroup", "InputGroupAddon", "InputGroupText", "InputGroupInput", "InputGroupTextarea", "InputGroupNumberField", "InputGroupSelectTrigger", "InputGroupButton"], keywords: ["input-group", "输入组合", "单位", "附件"],
  decisions: "InputGroupInput 复用 Input 的 unstyled 出口。静态附件不抢焦点；需要动作时用 InputGroupButton，它与输入共用同一条外边界、自己不画框，并保留动作自己的名称与状态。清空、显示密码这类动作不内置在输入框里，都由这里组合；SearchInput 与 PasswordInput 就是这样搭出来的。",
  decisionsEn: "InputGroupInput uses Input's unstyled outlet. Static addons do not redirect focus; use InputGroupButton for actions: it shares the outer boundary, draws no frame of its own, and keeps its own name and state. Clearing and password visibility are not built into Input; they are composed here, which is how SearchInput and PasswordInput are built.",
  design: {
    methods: ["名实相符", "相成相制", "布白有用"], whenToUse: ["输入与单位、标记或附属动作属于同一编辑范围。"], avoid: ["把无关动作附在输入上；只靠附件或 Placeholder 命名输入。"],
    composition: ["FieldLabel 命名输入；附件的必要说明由 aria-describedby 显式关联。搜索与密码已有现成组合 SearchInput、PasswordInput。"],
    stateOwner: { library: ["共同边界、几何接线及 Input 的原生交互。"], application: ["输入值、附件动作、名称及校验事实。"] },
    responsive: ["输入占剩余宽度；边界与内部 Input 一套几何，跟随密度轴，紧凑不缩小文字，粗指针目标单独保持。"],
    customization: ["root 样式属于共同边界，Input 的 className/style/render/ref 属于实际输入；附件有独立 render。"],
  }, designEn: {"whenToUse":["An input shares one editing scope with units, markers, or adjunct actions."],"avoid":["Unrelated actions attached to an input; naming the input through an adjunct or placeholder alone."],"composition":["FieldLabel names the input; aria-describedby explicitly associates necessary adjunct explanations. SearchInput and PasswordInput are ready-made compositions for search and passwords."],"stateOwner":{"library":["Shared boundary, geometry wiring, and Input's native interaction."],"application":["Input values, adjunct actions, names, and validation facts."]},"responsive":["Input takes remaining width; boundary and inner Input share one geometry following the density axis, while coarse-pointer targets remain separate."],"customization":["Root styles own the shared boundary. Input className/style/render/refs own the actual input; adjuncts have independent render."]},
  api: [
    { name: "InputGroup", description: "共同编辑边界，不自动建立另一个字段角色。", descriptionEn: "A shared editing boundary with no extra field role.", props: [
      { name: "loading", type: "boolean", default: "false", description: "组内内容正在取回或校验的事实：行尾出现与 Button 同一个忙碌标记，根节点标 aria-busy，并以礼貌的实时区域播报 locale 的「正在加载」。输入不被禁用；组件不发请求。", descriptionEn: "The fact that content in the group is being fetched or validated: the same busy mark as Button appears at the inline end, the root is marked aria-busy, and the locale's loading text is announced through a polite live region. Inputs stay enabled; the component sends no request." },
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<div>", description: "共同边界组合入口。", descriptionEn: "Composition props for the common boundary." },
    ] },
    { name: "InputGroupTextarea / InputGroupNumberField / InputGroupSelectTrigger", description: "Textarea、NumberField、SelectTrigger 的 unstyled 组合：成员保留原生语义与几何，边框与焦点、悬停、无效、禁用、只读的状态由组统一承担。", descriptionEn: "Unstyled compositions of Textarea, NumberField and SelectTrigger: members keep their native semantics and geometry while the group draws the border and the focus, hover, invalid, disabled and read-only states.", props: [
      { name: "TextareaProps / NumberFieldProps / SelectTriggerProps（除 unstyled）", nameEn: "TextareaProps / NumberFieldProps / SelectTriggerProps (except unstyled)", type: "InputGroupTextareaProps / InputGroupNumberFieldProps / InputGroupSelectTriggerProps", description: "与独立使用时相同。数值成员内部用 NumberFieldGroup unstyled；选择成员的宽度随候选名称，需要占满剩余宽度时传 className=\"flex-1\"。", descriptionEn: "Same as standalone use. A number member holds NumberFieldGroup unstyled; a select member's width follows its candidate names, pass className=\"flex-1\" to fill the remaining width." },
    ] },
    { name: "InputGroupInput", description: "Input 的 unstyled 组合，尺寸来自组。", descriptionEn: "Input's unstyled composition with the group's size.", props: [
      { name: "InputProps（除 size / unstyled）", nameEn: "InputProps (except size / unstyled)", type: "InputGroupInputProps", description: "保留原生输入、受控值、nativeInput 与实际输入 ref。", descriptionEn: "Retains native input props, controlled values, nativeInput and the actual input ref." },
    ] },
    { name: "InputGroupAddon", description: "默认静态 span；不添加 tabIndex、聚焦处理或自动名称。", descriptionEn: "A static span by default, with no tabIndex, focus redirection or automatic name.", props: [
      { name: "align", type: '"inline-start" | "inline-end" | "block-start" | "block-end"', description: "附件相对成员的位置。省略时按 DOM 顺序在行内排列（与此前一致）；inline-* 把附件固定在行首/行尾；block-* 独占一行，置于成员之上/之下，高度不小于边界内高，用于多行成员的页眉与页脚。", descriptionEn: "Where the addon sits relative to the members. Omitted, it follows DOM order inline (unchanged); inline-* pins it to the line start/end; block-* takes a full row above/below the members with at least the inner height, for headers and footers of multiline members." },
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<span>", description: "单位、前缀、图标等静态内容的承载位。", descriptionEn: "A position for static content: units, prefixes, icons." },
    ] },
    { name: "InputGroupText", description: "附件内的静态文字（单位、分隔、计数）：只承担文字样式，不抢焦点。", descriptionEn: "Static text inside an addon (unit, separator, count): carries text styling only and never takes focus.", props: [
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<span>", description: "文字承载位。", descriptionEn: "Carrier for the text." },
    ] },
    { name: "InputGroupButton", description: "编辑边界内的动作：不画自己的框，铺满边界内高；图标形为内高见方。", descriptionEn: "An action inside the editing boundary: no frame of its own, filling the inner height; the icon shape is an inner-height square.", props: [
      { name: "shape", type: '"label" | "icon"', default: '"label"', description: "图标形需要 aria-label。", descriptionEn: "The icon shape requires aria-label." },
      { name: "variant", type: "ButtonProps[\"variant\"]", default: '"quiet"', description: "边界内默认无框。", descriptionEn: "Frameless inside the boundary by default." },
      { name: "其余 ButtonProps", nameEn: "Other ButtonProps", type: "ButtonProps", description: "loading、disabled、onClick、render 等与 Button 相同。", descriptionEn: "loading, disabled, onClick, render and the rest behave as on Button." },
    ] },
  ],
  notes: ["多个数值成员并置时（如区间），每个输入各自有可访问名称（aria-label），组的整体名称由外层 group 的 aria-labelledby 给出；分隔符用 InputGroupText，它对读屏是普通文字而非名称。", "FieldControl 注册组合时传 InputGroupInput nativeInput，避免重复注册。", "禁用输入不意味着禁用任意附属动作；应用应声明每个动作的真实状态。"],
  notesEn: ["When several number members sit side by side (a range), each input has its own accessible name (aria-label) and the outer group supplies the collective name through aria-labelledby; the separator is an InputGroupText, plain text to assistive technology rather than a name.", "Use InputGroupInput nativeInput when FieldControl registers the composition, avoiding duplicate registration.", "Disabling the input does not disable arbitrary addon actions; the application declares each action's real state."],
} satisfies ComponentMeta;
