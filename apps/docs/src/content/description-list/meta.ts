import type { ComponentMeta } from "@/lib/types";
export default {
  title: "名称与值 DescriptionList", titleEn: "DescriptionList", description: "名称和值的原生关系。", descriptionEn: "Native relationships between names and values.",
  category: "数据展示", layer: "pattern", source: "local", exports: ["DescriptionList", "DescriptionListItem", "DescriptionListTerm", "DescriptionListDetail"],
  decisions: "dl 中以 div 组织 dt/dd，值作为 children 原样呈现，不用真假判断替换零。", decisionsEn: "A dl groups dt/dd in div elements; children render unchanged without replacing zero through truthiness checks.",
  design: { methods: ["名实相符", "布白有用"], whenToUse: ["一个对象的名称与值需要对应呈现。"], avoid: ["多个对象跨维度比较使用 Table。"], stateOwner: { library: ["dl、dt、dd 及分组关系。"], application: ["名称、值、单位、零、未知与不适用文字。"] }, responsive: ["默认纵向；宽容器可组合分列，长值完整换行。"] }, designEn: {"whenToUse":["Present corresponding names and values for one object."],"avoid":["Use Table to compare several objects across dimensions."],"stateOwner":{"library":["dl, dt, dd, and grouping relationships."],"application":["Names, values, units, zero, unknown, and not-applicable text."]},"responsive":["Vertical by default; wide containers may compose columns, and long values wrap fully."]},
  api: [
    { name: "DescriptionList", description: "原生 dl。", descriptionEn: "A native dl.", props: [{ name: "children / render / ref / native props", type: "useRender.ComponentProps<dl>", description: "属性与 ref 属于实际名称值列表。", descriptionEn: "Props and ref reach the actual description list." }] },
    { name: "DescriptionListItem", description: "div 成组名称与值。", descriptionEn: "A div grouping names and values.", props: [{ name: "children / render / ref / native props", type: "useRender.ComponentProps<div>", description: "默认纵向；消费者可以选择多列排列，关系不变。", descriptionEn: "Stacked by default; callers may select multiple columns without changing semantics." }] },
    { name: "DescriptionListTerm / DescriptionListDetail", description: "原生 dt / dd。", descriptionEn: "Native dt / dd.", props: [{ name: "children / render / ref / native props", type: "useRender.ComponentProps<dt | dd>", description: "0、未知、不适用由应用分别提供，可含合法链接。", descriptionEn: "The application supplies zero, unknown and not applicable separately; valid links are supported." }] },
  ], notes: ["需要跨多个对象比较同一维度时使用 Table。"], notesEn: ["Use Table to compare the same dimension across multiple objects."],
} satisfies ComponentMeta;
