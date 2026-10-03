import type { ComponentMeta } from "@/lib/types";

export default {
  title: "标签 Label", titleEn: "Label",
  description: "用原生标签为一个控件命名。", descriptionEn: "Name one control with a native label.",
  category: "表单", layer: "primitive", source: "local", exports: ["Label"],
  keywords: ["label", "标签", "名称", "htmlFor"],
  decisions: "Field 内使用 FieldLabel。通用 Label 用 htmlFor 或原生嵌套关联一个控件，不能用 Placeholder 替代。",
  decisionsEn: "Use FieldLabel inside Field. A standalone Label associates one control through htmlFor or native nesting; a placeholder cannot replace it.",
  design: {
    methods: ["名实相符", "相成相制"], whenToUse: ["原生控件需要持续可读的名称。"],
    avoid: ["用通用 Label 替代 Field 内的注册标签。"], composition: ["用 htmlFor 指向 Input 或 NativeSelect 的实际 id。"],
    stateOwner: { library: ["原生标签关联与 text-label 角色。"], application: ["名称、控件 id 与状态。"] },
    responsive: ["长名称允许换行。"], customization: ["className、style 与 render 属于标签。"],
  }, designEn: {"whenToUse":["A native control needs a persistent readable name."],"avoid":["Replacing Field's registered label with a general Label."],"composition":["htmlFor points to the actual id of Input or NativeSelect."],"stateOwner":{"library":["Native label association and the text-label role."],"application":["Names, control ids, and state."]},"responsive":["Long names can wrap."],"customization":["className, style, and render belong to the label."]},
  api: [{ name: "Label", description: "默认原生 label。", descriptionEn: "A native label by default.", props: [
    { name: "htmlFor", type: "string", description: "实际控件的 id。", descriptionEn: "The actual control id." },
    { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<label>", description: "保留标签语义、事件、ref 与原生属性。替换标签元素后需显式维护命名关系。", descriptionEn: "Preserves semantics, events, ref and native attributes. An alternate tag must provide an explicit naming relationship." },
  ] }],
  notes: ["Label 不拥有禁用状态；被命名控件使用自己的真实 disabled。"],
  notesEn: ["Label owns no disabled state; the named control uses its real disabled attribute."],
} satisfies ComponentMeta;
