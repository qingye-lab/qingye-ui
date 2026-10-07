import type { ComponentMeta } from "@/lib/types";

export default {
  title: "复选框 Checkbox", titleEn: "Checkbox", description: "选择独立的是/否或集合中的多个项。", descriptionEn: "Choose an independent yes/no value or multiple items in a set.",
  category: "表单", layer: "primitive", source: "local", exports: ["Checkbox", "CheckboxPrimitive"],
  api: [{ name: "Checkbox", description: "Base UI 复选语义及混合状态。", descriptionEn: "Base UI checkbox semantics and mixed state.", props: [
    { name: "checked / defaultChecked", type: "boolean", description: "受控选中值或非受控初值。", descriptionEn: "Controlled checked value or uncontrolled initial value." },
    { name: "indeterminate", type: "boolean", default: "false", description: "集合部分选中的事实；aria-checked 为 mixed。", descriptionEn: "Actual partial collection selection; aria-checked is mixed." },
    { name: "onCheckedChange", type: "(checked, eventDetails) => void", description: "选择变化，可取消。集合更新由应用处理。", descriptionEn: "Cancelable selection change; the application handles collection updates." },
    { name: "disabled / readOnly", type: "boolean", default: "false", description: "禁用跳过键盘并不提交；只读可聚焦、提交但不可切换。", descriptionEn: "Disabled skips keyboard access and submission; read-only retains focus/submission without toggling." },
    { name: "aria-invalid", type: "boolean | 'true' | 'false'", description: "显式无效事实；Field invalid 也可传入。", descriptionEn: "An explicit invalid fact, also available through Field invalid." },
    { name: "name / value / uncheckedValue / form", type: "string", description: "保留原语隐藏输入的真实表单提交语义。", descriptionEn: "Preserve actual form submission through the primitive's hidden input." },
    { name: "render / ref / inputRef / className / style", type: "Base UI composition", description: "根部位与隐藏 input 的组合；渲染 button 时同时设置 nativeButton。", descriptionEn: "Compose the root and hidden input; also set nativeButton when rendering a button." },
  ] }, { name: "CheckboxPrimitive", description: "完整 Base UI Checkbox 命名空间，包含 Root 与 Indicator。", descriptionEn: "The complete Base UI Checkbox namespace, including Root and Indicator." }],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "按文档顺序进入每项。", descriptionEn: "Reach each item in document order." }, { keys: "Space", description: "切换选中值；只读与禁用不切换。", descriptionEn: "Toggle selection; read-only and disabled items do not toggle." }],
  notes: ["indeterminate 由真实集合计算，不是独立视觉变体。", "FieldLabel 或真实 label 关联名称，说明和错误留在 Field 中。", "选中与无效可以同时存在；错误不会清空选中值。"], notesEn: ["Compute indeterminate from the actual collection rather than choosing a visual variant.","FieldLabel or an actual label supplies the name; keep descriptions and errors within Field.","Selected and invalid may coexist; errors do not clear selection."],
  decisions: "多个独立选项用 Checkbox，立即切换设置用 Switch。部分选中由调用方根据子项计算。",
  decisionsEn: "Use Checkbox for independent options and Switch for an immediate setting change. The caller calculates partial selection from the child values.",
  design: { methods: ["名实相符", "相成相制"], whenToUse: ["独立二值、集合多选、待提交选择"], avoid: ["立即生效的设置用 Switch", "互斥单选用 Radio"], composition: ["Field 的名称、说明、错误结构"], stateOwner: { library: ["焦点、键盘、非受控 checked"], application: ["受控 checked、indeterminate、集合范围、invalid"] }, responsive: ["可见几何与命中区分开；本批只验桌面"], customization: ["同名文字行高、marker圆角、主题颜色"] }, designEn: {"whenToUse":["Independent binary choices, multiple collection selection, or selections awaiting submission."],"avoid":["Use Switch for settings taking effect immediately.","Use Radio for mutually exclusive selection."],"composition":["Field supplies names, descriptions, and errors."],"stateOwner":{"library":["Focus, keyboard, and uncontrolled checked state."],"application":["Controlled checked state, indeterminate, collection scope, and invalid facts."]},"responsive":["Visible geometry and hit areas are separate; this batch checked desktop only."],"customization":["Matching text line heights, marker radius, and theme colors."]},
} satisfies ComponentMeta;
