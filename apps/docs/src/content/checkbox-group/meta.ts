import type { ComponentMeta } from "@/lib/types";

export default {
  title: "复选组 CheckboxGroup", titleEn: "CheckboxGroup",
  description: "把复选项接入同一个集合与共同范围。", descriptionEn: "Connect checkboxes to one collection and shared scope.",
  category: "表单", layer: "primitive", source: "local",
  exports: ["CheckboxGroup", "CheckboxGroupPrimitive"],
  keywords: ["checkboxes", "多选", "复选", "多选组", "勾选"],
  api: [
    { name: "CheckboxGroup", description: "集合状态，不只是排列复选项。", descriptionEn: "Collection state beyond checkbox layout.", props: [
      { name: "value / defaultValue", type: "string[]", description: "受控集合或初始集合；空数组表示未选任何项。Checkbox.value 标识集合项。", descriptionEn: "Controlled or initial collection; an empty array means no selected items. Checkbox.value identifies members." },
      { name: "onValueChange", type: "(value: string[], details) => void", description: "提供增删后的集合，可用 details.cancel() 取消本次变化。", descriptionEn: "Supplies the changed collection; details.cancel() cancels this change." },
      { name: "allValues", type: "string[]", description: "完整范围；配合 Checkbox parent 计算全选、未选和 mixed。由调用方给出，不从业务推断。", descriptionEn: "The complete scope used with a parent Checkbox for all/none/mixed. Supplied by the caller rather than inferred from business data." },
      { name: "disabled", type: "boolean", default: "false", description: "真正禁用组内复选项；单项 readOnly 放在 Checkbox。", descriptionEn: "Actually disables group checkboxes; per-item readOnly belongs on Checkbox." },
      { name: "aria-labelledby / aria-label", type: "string", description: "共同名称；可引用 FieldTitle 或 FieldsetLegend。", descriptionEn: "A shared name, optionally referencing FieldTitle or FieldsetLegend." },
      { name: "render / ref / className / style", type: "Base UI composition", description: "透传根部位、原生属性与事件；样式支持原语状态回调。", descriptionEn: "Forward root/native props and events; styles support primitive state callbacks." },
    ] },
    { name: "CheckboxGroupPrimitive", description: "Base UI 集合原语公共出口。", descriptionEn: "The public Base UI collection primitive." },
  ],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "逐个到达可用复选项。", descriptionEn: "Reach available checkboxes individually." }, { keys: "Space", description: "增删当前项；父项作用于 allValues 的完整范围。", descriptionEn: "Add/remove the current item; the parent operates on the complete allValues scope." }],
  notes: ["Field.name 或各 Checkbox.name 决定表单字段；相同 name 提交多项值。", "FieldItem/FieldLabel 必须放在 Field 内；组外也可使用原生 label。", "只读是项的限制，disabled 是组的限制；不从空集合推断 invalid。"], notesEn: ["Field.name or each Checkbox.name determines the form field; repeated names submit multiple values.","FieldItem/FieldLabel belong inside Field; native labels also work outside a group.","Read-only limits an item; disabled limits the group. An empty collection does not imply invalid."],
  decisions: "CheckboxGroup 持有集合值。allValues 是父项操作的范围，改变它必须对应真实候选范围。", decisionsEn: "CheckboxGroup owns a collection value. allValues defines the parent action's scope and must change with the actual candidate set.",
  design: {
    methods: ["名实相符", "相成相制", "进退相承"],
    whenToUse: ["一组可同时选择的候选", "父复选项控制明确的完整集合"],
    avoid: ["只排列内容时用布局组件", "互斥候选用 RadioGroup", "开关设置用 Switch"],
    composition: ["FieldTitle 命名组；FieldItem + Checkbox + FieldLabel 命名单项；FieldDescription/FieldError 关联同一集合"],
    stateOwner: { library: ["非受控集合、焦点、键盘、父项 mixed"], application: ["受控集合、allValues、候选、invalid、提交"] },
    responsive: ["复用 Checkbox 尺寸与触摸目标；本批未运行浏览器几何验收"],
    customization: ["组内 field-gap；单项通过 Checkbox 的 size 和样式入口调整"],
  }, designEn: {"whenToUse":["Several candidates can be selected together.","A parent checkbox controls an explicit complete collection."],"avoid":["Use layout components when only arranging content.","Use RadioGroup for mutually exclusive candidates.","Use Switch for settings."],"composition":["FieldTitle names the group; FieldItem + Checkbox + FieldLabel name an item; FieldDescription/FieldError refer to the same collection."],"stateOwner":{"library":["Uncontrolled collection, focus, keyboard, and parent mixed state."],"application":["Controlled collection, allValues, candidates, invalid facts, and submission."]},"responsive":["Uses Checkbox dimensions and touch targets; this batch did not run browser geometry acceptance."],"customization":["field-gap within the group; each Checkbox exposes size and styling."]},
} satisfies ComponentMeta;
