import type { ComponentMeta } from "@/lib/types";

export default {
  title: "单选组 RadioGroup", titleEn: "RadioGroup",
  description: "从同时可见的少量候选中取一个值。", descriptionEn: "Choose one value from a small set of visible options.",
  category: "表单", layer: "primitive", source: "local",
  exports: ["RadioGroup", "Radio", "RadioGroupPrimitive", "RadioPrimitive"],
  api: [
    { name: "RadioGroup", description: "可见互斥候选的共同状态与组语义。", descriptionEn: "Shared state and group semantics for visible mutually exclusive candidates.", props: [
      { name: "value / defaultValue", type: "Value", description: "受控值或真实初始选择。省略初值保持未选择；受控可用 null。", descriptionEn: "Controlled value or actual initial selection. Omitting the initial value retains no selection; controlled null is allowed." },
      { name: "onValueChange", type: "(value, eventDetails) => void", description: "原语值变化，可通过 eventDetails.cancel() 取消。", descriptionEn: "Primitive value changes can be canceled through eventDetails.cancel()." },
      { name: "name / form / inputRef", type: "string / string / Ref<HTMLInputElement>", description: "表单名、外部表单与隐藏 input 引用。未选不提交该字段。", descriptionEn: "Form name, external form, and hidden input ref. An unselected field is not submitted." },
      { name: "disabled / readOnly / required", type: "boolean", default: "false", description: "禁用、只读与原生约束；required 不自行推断 invalid。", descriptionEn: "Disabled, read-only, and native constraints; required does not infer invalid." },
      { name: "aria-labelledby / aria-label", type: "string", description: "组的名称；FieldTitle 的 id 可作为 aria-labelledby。", descriptionEn: "The group name; FieldTitle id may supply aria-labelledby." },
      { name: "render / ref / className / style", type: "Base UI composition", description: "组根元素与状态样式入口。", descriptionEn: "Group root element and state styling." },
    ] },
    { name: "Radio", description: "圆形单选入口与中心选中点。", descriptionEn: "Circular single-choice entry with a central selected dot.", props: [
      { name: "value", type: "Value", description: "组内唯一候选值；空字符串、0 与 null 未选择不同。", descriptionEn: "A unique candidate value; empty string, zero, and null/no selection differ." },
      { name: "disabled / readOnly / required", type: "boolean", description: "原语支持组与项的真实限制，Field disabled 也可传递。", descriptionEn: "Primitive group/item limits are actual restrictions, including propagated Field disabled." },
      { name: "render / nativeButton / ref / inputRef", type: "Base UI composition", description: "默认原生 button，保留隐藏 radio input；改成非 button 时显式 nativeButton=false。", descriptionEn: "Defaults to native button while retaining a hidden radio input. Set nativeButton=false for another element." },
      { name: "children / className / style", type: "ReactNode / Base UI state callbacks", description: "替换指示部位或覆写样式；名称放在 FieldLabel 中。", descriptionEn: "Replace the indicator or override styles; FieldLabel supplies the name." },
    ] },
    { name: "RadioGroupPrimitive / RadioPrimitive", description: "Base UI 组与 Radio 原语出口。", descriptionEn: "Public Base UI group and Radio primitives." },
  ],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "组保留一个停靠点；已选项或第一个可用项获得焦点。", descriptionEn: "The group retains one tab stop; the selected or first available item receives focus." },
    { keys: "↑ / ↓ / ← / →", description: "移动并选择候选，跳过禁用项，在组内循环。", descriptionEn: "Move and select candidates, skip disabled items, and wrap within the group." },
    { keys: "Space", description: "选择当前候选。Home/End、类型搜索不属于此 Radio 原语契约。", descriptionEn: "Select the current candidate. Home/End and typeahead are outside this Radio primitive contract." },
  ],
  notes: ["FieldTitle 命名组，FieldItem + FieldLabel 命名单项，FieldError 关联错误。", "未选择、0 与空字符串是不同的值。", "禁用项退出 Tab 顺序；只读保留焦点与当前值。"], notesEn: ["FieldTitle names the group, FieldItem + FieldLabel name each item, and FieldError associates errors.","No selection, zero, and empty string are different values.","Disabled items leave tab order; read-only retains focus and current values."],
  decisions: "候选需要同时比较时用 RadioGroup；可以收起时用 Select。未选择不会自动变为第一项。", decisionsEn: "Use RadioGroup when candidates must be compared together, and Select when they can collapse. No selection does not automatically choose the first item.",
  design: {
    methods: ["名实相符", "相成相制", "随境取度"],
    whenToUse: ["少量互斥候选，必须同时看见才能比较"],
    avoid: ["可收起列表用 Select", "多选用 Checkbox", "命令用 Menu，视角切换用 Tabs", "复杂属性比较用应用比较结构"],
    composition: ["FieldTitle → RadioGroup aria-labelledby；FieldItem + FieldLabel 命名单项；FieldDescription + FieldError 保留关联"],
    stateOwner: { library: ["焦点、方向键、非受控值"], application: ["受控值、候选、invalid、提交与结果"] },
    responsive: ["读既有窄屏尺寸与粗指针命中角色；本批只做桌面检查"],
    customization: ["同档文字行高、圆形身份、主题表面与边框；不新增外围焦点圈"],
  }, designEn: {"whenToUse":["A small mutually exclusive set must remain visible for comparison."],"avoid":["Use Select for collapsible lists.","Use Checkbox for multiple selection.","Use Menu for commands and Tabs for views.","Applications supply structures for comparing complex properties."],"composition":["FieldTitle → RadioGroup aria-labelledby; FieldItem + FieldLabel name items; FieldDescription + FieldError retain associations."],"stateOwner":{"library":["Focus, arrows, and uncontrolled values."],"application":["Controlled values, candidates, invalid facts, submissions, and outcomes."]},"responsive":["Uses existing narrow-screen and coarse-pointer roles; this batch checked desktop only."],"customization":["Matching text line height, circular identity, theme surfaces/borders, and no added outer focus ring."]},
} satisfies ComponentMeta;
