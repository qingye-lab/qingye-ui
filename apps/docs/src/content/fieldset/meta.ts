import type { ComponentMeta } from "@/lib/types";
export default {
  title: "字段组 Fieldset", titleEn: "Fieldset",
  description: "为一组相关字段提供共同名称与禁用范围。", descriptionEn: "Give related fields a shared name and disabled scope.",
  category: "表单", layer: "primitive", source: "local",
  exports: ["Fieldset", "FieldsetLegend"], keywords: ["fieldset", "legend", "字段组", "共同问题"],
  decisions: "共同名称说明范围；每个字段仍由自己的标签命名。只有位置关系时用 FieldGroup。",
  decisionsEn: "The shared name identifies the scope; every field keeps its own label. Use FieldGroup for placement alone.",
  design: {
    methods: ["名实相符", "相成相制", "布白有用"],
    whenToUse: ["一组字段或选项需要共同名称。"],
    avoid: ["仅为排版创建语义分组；共同名称代替单项名称。"],
    composition: ["Legend 命名组；Field 命名单值；原生控件同样保留字段组语义。"],
    stateOwner: {library: ["Base UI 分组命名、原生字段组与禁用传播。"], application: ["共同问题、成员和值。"]},
    responsive: ["组与长 legend 可收缩换行；字段间消费 field-group-gap。"],
    customization: ["无额外围合；variant 改共同名称的文字档，render 可替换 legend 元素。"],
  }, designEn: {"whenToUse":["A group of fields or options needs a shared name."],"avoid":["Semantic groups for layout alone or a shared name replacing individual names."],"composition":["Legend names the group; Field names one value. Native controls retain fieldset semantics."],"stateOwner":{"library":["Base UI group naming, native fieldsets, and disabled propagation."],"application":["The shared question, members, and values."]},"responsive":["Groups and long legends shrink/wrap; fields consume field-group-gap."],"customization":["No extra enclosure. variant chooses the shared name's text profile; render can replace the legend element."]},
  api: [
    {name: "Fieldset", description: "Base UI Root，默认 fieldset；使用字段组间隔。", descriptionEn: "Base UI Root, rendered as fieldset with field-group spacing.", props: [
      {name: "disabled", type: "boolean", default: "false", description: "禁用整组控件。", descriptionEn: "Disables controls throughout the group."},
      {name: "className / style / render / ref", type: "Base UI Fieldset.Root props", description: "透传原生属性；样式支持状态函数。", descriptionEn: "Native props are forwarded; styles support state functions."},
    ]},
    {name: "FieldsetLegend", description: "默认真实 legend；Base UI 同时维护 aria-labelledby。", descriptionEn: "A real legend by default; Base UI also maintains aria-labelledby.", props: [
      {name: "variant", type: '"legend" | "label"', default: '"legend"', description: "分节名称用 heading 档，共同问题用 label 档。具体文字值是预设。", descriptionEn: "Heading profile for a section name, label profile for a shared question. Text values are presets."},
      {name: "render", type: "Base UI render", description: "可替换元素，命名关联仍保留。", descriptionEn: "Replaces the element while retaining the naming association."},
    ]},
    {name: "FieldsetPrimitive", description: "Base UI 公共组合出口。", descriptionEn: "Base UI public composition outlet."},
  ],
  keyboard: [{keys: "Tab / Shift+Tab", description: "按文档顺序访问组内控件；禁用控件不进入焦点顺序。", descriptionEn: "Visit controls in document order; disabled controls leave the tab order."}],
  notes: ["Fieldset 不绘制额外卡片或边框。共同名称不能代替每个输入的名称。", "FieldSet / FieldLegend 别名已删除，统一用 Fieldset / FieldsetLegend。"],
  notesEn: ["Fieldset adds no card or border. A shared name does not replace individual input names.", "FieldSet / FieldLegend aliases have been removed. Use Fieldset / FieldsetLegend."],
} satisfies ComponentMeta;
