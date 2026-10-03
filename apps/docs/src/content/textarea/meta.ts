import type { ComponentMeta } from "@/lib/types";

export default {
  title: "多行输入 Textarea", titleEn: "Textarea",
  description: "编辑备注、消息等多行文本。", descriptionEn: "Edit multiline notes and messages.",
  category: "表单", layer: "primitive", source: "local", exports: ["Textarea", "TextareaPrimitive"],
  api: [{ name: "Textarea", description: "可与 Field 组合的原生 textarea。", props: [
    { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "同档控件几何、文字及有边框内距。" },
    { name: "rows", type: "number", default: "3", description: "最小起始行数；内容可自动增高，仍可手工调整高度。" },
    { name: "value / defaultValue", type: "string", description: "受控值或非受控初值。" },
    { name: "onValueChange", type: "(value, eventDetails) => void", description: "原语的值变化回调，可调用 eventDetails.cancel()。" },
    { name: "aria-invalid", type: "boolean | 'true' | 'false'", description: "调用方声明的错误事实；也可由 Field invalid 传入。" },
    { name: "disabled / readOnly", type: "boolean", default: "false", description: "禁用不参与 Tab/提交；只读仍可聚焦和提交，显示已有 locale 的只读文案。" },
    { name: "maxLength", type: "number", description: "浏览器执行的字符长度上限，不由计数文案实施限制。" },
    { name: "render / ref / className / style", type: "Base UI render / textarea ref / state-aware styling", description: "真实 textarea 的组合与样式入口；render 必须保留 textarea 语义、属性及事件。" },
  ] }, { name: "TextareaPrimitive", description: "Base UI Field 命名空间；Textarea 使用其 Control 的 textarea render 出口。" }],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "按文档顺序移动焦点。" }, { keys: "Enter", description: "插入换行，不提交表单。" }],
  notes: ["名称使用 FieldLabel 或真实 label；placeholder 不代替名称。", "自动增高使用 CSS field-sizing:content；不支持时保留 rows 与原生手工调整。", "错误、提交与持久化事实由应用提供，失败后保留草稿。", "默认表面与尺寸是集中预设；聚焦只变边框颜色。"],
  decisions: "字符计数只描述当前值。限制由 maxLength 或应用规则执行；错误内容不会让 Textarea 自行判定 invalid。",
  design: {
    methods: ["名实相符", "相成相制", "进退相承"], whenToUse: ["多行纯文本、备注、消息"], avoid: ["单行值用 Input", "富文本编辑需编辑器"],
    composition: ["Field + FieldLabel + Textarea + FieldDescription / FieldError"],
    stateOwner: { library: ["焦点、原生编辑、非受控值"], application: ["受控值、invalid、保存与错误事实"] },
    responsive: ["同名文字档及 -narrow 尺寸已接线；本批只验桌面"], customization: ["已有控制档 token；className/style 属于实际 textarea"],
  },
} satisfies ComponentMeta;
