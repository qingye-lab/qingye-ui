import type { ComponentMeta } from "@/lib/types";

export default {
  title: "输入组合 InputGroup", titleEn: "InputGroup",
  description: "让输入与标记、单位或附属动作共用编辑边界。", descriptionEn: "Give an input and its markers, units or actions one editing boundary.",
  category: "表单", layer: "primitive", source: "local", exports: ["InputGroup", "InputGroupAddon", "InputGroupInput"], keywords: ["input-group", "输入组合", "单位", "附件"],
  decisions: "InputGroupInput 复用 Input 的 unstyled 出口。静态附件不抢焦点；需要动作时组合 Button，并保留动作自己的名称与状态。",
  decisionsEn: "InputGroupInput uses Input's unstyled outlet. Static addons do not redirect focus; compose Button for actions and keep their own names and states.",
  design: {
    methods: ["名实相符", "相成相制", "布白有用"], whenToUse: ["输入与单位、标记或附属动作属于同一编辑范围。"], avoid: ["把无关动作附在输入上；只靠附件或 Placeholder 命名输入。"],
    composition: ["FieldLabel 命名输入；附件的必要说明由 aria-describedby 显式关联。已有搜索和密码形态直接用 Input。"],
    stateOwner: { library: ["共同边界、五档尺寸及 Input 的原生交互。"], application: ["输入值、附件动作、名称及校验事实。"] },
    responsive: ["输入占剩余宽度；尺寸读取同名文字和控件档，粗指针目标单独保持。"],
    customization: ["root 样式属于共同边界，Input 的 className/style/render/ref 属于实际输入；附件有独立 render。"],
  }, designEn: {"whenToUse":["An input shares one editing scope with units, markers, or adjunct actions."],"avoid":["Unrelated actions attached to an input; naming the input through an adjunct or placeholder alone."],"composition":["FieldLabel names the input; aria-describedby explicitly associates necessary adjunct explanations. Existing search/password forms use Input directly."],"stateOwner":{"library":["Shared boundary, five size profiles, and Input's native interaction."],"application":["Input values, adjunct actions, names, and validation facts."]},"responsive":["Input takes remaining width; matching text/control profiles determine dimensions while coarse-pointer targets remain separate."],"customization":["Root styles own the shared boundary. Input className/style/render/refs own the actual input; adjuncts have independent render."]},
  api: [
    { name: "InputGroup", description: "共同编辑边界，不自动建立另一个字段角色。", descriptionEn: "A shared editing boundary with no extra field role.", props: [
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "外部边界与内部 Input 同一档；具体值为基础层预设。", descriptionEn: "One profile for the outer boundary and inner Input; values are foundation presets." },
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<div>", description: "共同边界组合入口。", descriptionEn: "Composition props for the common boundary." },
    ] },
    { name: "InputGroupInput", description: "Input 的 unstyled 组合，尺寸来自组。", descriptionEn: "Input's unstyled composition with the group's size.", props: [
      { name: "InputProps（除 size / unstyled）", nameEn: "InputProps (except size / unstyled)", type: "InputGroupInputProps", description: "保留原生输入、受控值、搜索/密码、nativeInput 与实际输入 ref。", descriptionEn: "Retains native input props, controlled values, search/password, nativeInput and the actual input ref." },
    ] },
    { name: "InputGroupAddon", description: "默认静态 span；不添加 tabIndex、聚焦处理或自动名称。", descriptionEn: "A static span by default, with no tabIndex, focus redirection or automatic name.", props: [
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<span>", description: "单位、标记或显式 Button 的承载位。", descriptionEn: "A position for units, markers or an explicit Button." },
    ] },
  ],
  notes: ["FieldControl 注册组合时传 InputGroupInput nativeInput，避免重复注册。", "禁用输入不意味着禁用任意附属动作；应用应声明每个动作的真实状态。"],
  notesEn: ["Use InputGroupInput nativeInput when FieldControl registers the composition, avoiding duplicate registration.", "Disabling the input does not disable arbitrary addon actions; the application declares each action's real state."],
} satisfies ComponentMeta;
