import type { ComponentMeta } from "@/lib/types";

export default {
  title: "复选框 Checkbox", titleEn: "Checkbox", description: "选择独立的是/否或集合中的多个项。", descriptionEn: "Choose an independent yes/no value or multiple items in a set.",
  category: "表单", layer: "primitive", source: "local", exports: ["Checkbox", "CheckboxPrimitive"],
  api: [{ name: "Checkbox", description: "Base UI 复选语义及混合状态。", props: [
    { name: "checked / defaultChecked", type: "boolean", description: "受控选中值或非受控初值。" },
    { name: "indeterminate", type: "boolean", default: "false", description: "集合部分选中的事实；aria-checked 为 mixed。" },
    { name: "onCheckedChange", type: "(checked, eventDetails) => void", description: "选择变化，可取消。集合更新由应用处理。" },
    { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "可见方框采用同名文字行高，命中区另由 touch-target 提供。" },
    { name: "disabled / readOnly", type: "boolean", default: "false", description: "禁用跳过键盘并不提交；只读可聚焦、提交但不可切换。" },
    { name: "aria-invalid", type: "boolean | 'true' | 'false'", description: "显式无效事实；Field invalid 也可传入。" },
    { name: "name / value / uncheckedValue / form", type: "string", description: "保留原语隐藏输入的真实表单提交语义。" },
    { name: "render / ref / inputRef / className / style", type: "Base UI composition", description: "根部位与隐藏 input 的组合；渲染 button 时同时设置 nativeButton。" },
  ] }, { name: "CheckboxPrimitive", description: "完整 Base UI Checkbox 命名空间，包含 Root 与 Indicator。" }],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "按文档顺序进入每项。" }, { keys: "Space", description: "切换选中值；只读与禁用不切换。" }],
  notes: ["indeterminate 由真实集合计算，不是独立视觉变体。", "FieldLabel 或真实 label 关联名称，说明和错误留在 Field 中。", "选中与无效可以同时存在；错误不会清空选中值。"],
  decisions: "多个独立选项用 Checkbox，立即切换设置用 Switch。部分选中由调用方根据子项计算。",
  decisionsEn: "Use Checkbox for independent options and Switch for an immediate setting change. The caller calculates partial selection from the child values.",
  design: { methods: ["名实相符", "相成相制"], whenToUse: ["独立二值、集合多选、待提交选择"], avoid: ["立即生效的设置用 Switch", "互斥单选用 Radio"], composition: ["Field 的名称、说明、错误结构"], stateOwner: { library: ["焦点、键盘、非受控 checked"], application: ["受控 checked、indeterminate、集合范围、invalid"] }, responsive: ["可见几何与命中区分开；本批只验桌面"], customization: ["同名文字行高、marker圆角、主题颜色"] },
} satisfies ComponentMeta;
