import type { ComponentMeta } from "@/lib/types";

export default {
  title: "标签集合 TagInput", titleEn: "TagInput",
  description: "确认字符串集合，保留尚未确认的编辑草稿。", descriptionEn: "Confirm a string collection while keeping its unconfirmed draft.",
  category: "表单", source: "local", layer: "primitive", exports: ["TagInput"], keywords: ["tag", "标签", "集合", "tokens"],
  decisions: "Enter 或添加按钮才确认；两端空白去除，精确字符串去重且区分大小写。空项、重复项及受控拒绝不会清空草稿。",
  decisionsEn: "Only Enter or Add confirms a tag. Confirmation trims surrounding whitespace and deduplicates exact case-sensitive strings. Empty, duplicate, and rejected changes retain the draft.",
  api: [{ name: "TagInput", description: "已确认项、草稿输入与非提交动作的公共组合。", descriptionEn: "Public composition of confirmed items, a draft input, and non-submitting actions.", props: [
    { name: "value / defaultValue", type: "readonly string[]", default: "defaultValue: []", description: "已确认集合；外部事实不重新去重、裁切或清理。", descriptionEn: "Confirmed collection. External facts are not re-deduplicated, truncated, or cleaned." },
    { name: "onValueChange", type: "(value: string[], details: TagInputChangeDetails) => void", description: "details 有 add/remove、tag、event、cancel() 与 isCanceled；受控添加接受前保留草稿。", descriptionEn: "Details includes add/remove, tag, event, cancel(), and isCanceled. Controlled additions retain the draft until accepted." },
    { name: "draft / defaultDraft / onDraftChange", type: "string / string / (draft: string) => void", default: "defaultDraft: ''", description: "独立的待确认编辑文本；刷新集合不清草稿。", descriptionEn: "Independent unconfirmed text. Refreshing the collection retains the draft." },
    { name: "name / form", type: "string", description: "只提交确认项，使用同名表单键；草稿不提交为集合项。", descriptionEn: "Submit confirmed items as repeated form keys; the draft does not become a collection item." },
    { name: "inputProps", type: "Input props (excluding collection-owned value/name/size)", description: "真实草稿 Input 的 render/ref/ARIA/事件/样式；FieldLabel 注册此入口。", descriptionEn: "The real draft Input's render, refs, ARIA, events, and styling. FieldLabel registers this input." },
    { name: "disabled / readOnly", type: "boolean", default: "false", description: "同时约束草稿与确认项操作；只读仍提交确认项，禁用不提交。", descriptionEn: "Constrain the draft and item actions together. Read-only confirmed items submit; disabled items do not." },
    { name: "render / ref / className / style / native props", type: "useRender.ComponentProps<'div'>", description: "属于根容器；改渲染元素须保持结构与子控件。", descriptionEn: "Applied to the root container. Render must retain its structure and children." },
  ] }],
  keyboard: [
    { keys: "Enter", description: "非组字时确认草稿，阻止表单提交；组字中的 Enter 不添加。", descriptionEn: "Confirm the draft outside composition without submitting a form. Composition Enter does not add." },
    { keys: "Backspace / ArrowLeft（草稿起点）", keysEn: "Backspace / ArrowLeft (start of draft)", description: "空草稿的 Backspace 或起点的左箭头先聚焦最后一项，不立即删除。", descriptionEn: "Backspace on an empty draft or Left at its start focuses the last item without deleting it." },
    { keys: "Delete / Backspace（移除按钮）", keysEn: "Delete / Backspace (remove button)", description: "移除已聚焦项，保留相邻焦点位置。", descriptionEn: "Remove the focused item and preserve an adjacent focus position." },
    { keys: "ArrowLeft / ArrowRight（移除按钮）", keysEn: "ArrowLeft / ArrowRight (remove button)", description: "在确认项间移动，边界返回草稿。", descriptionEn: "Move among confirmed items; boundaries return to the draft." },
  ],
  notes: ["FieldLabel 命名草稿入口，FieldDescription 可明示确认和去重规则。", "粘贴只编辑草稿，不自动拆分或批量确认。", "添加/移除不是保存结果；库不发请求、不清失败草稿。", "模拟 composition 已验证，真实中文输入法与辅助技术另验。"],
  notesEn: ["FieldLabel names the draft; FieldDescription may state confirmation and duplicate rules.", "Paste edits the draft without splitting or bulk confirmation.", "Adding/removing is not persistence. The library sends no requests and retains failed drafts.", "Synthetic composition is checked; real IME and assistive tech need separate verification."],
  design: { methods: ["名实相符", "相成相制", "进退相承"], whenToUse: ["由用户逐项确认的短字符串集合"], avoid: ["只能从候选选择时用 Select/Combobox；单值用 Input"], composition: ["Field + FieldLabel + TagInput + FieldDescription / Error"], stateOwner: { library: ["非受控集合与草稿、焦点、约束提示"], application: ["受控集合/草稿、权限、刷新、失败与持久化"] }, responsive: ["确认项允许换行，草稿取剩余宽度；一套几何，跟随密度轴，紧凑不缩小文字"], customization: ["root render/ref 与 inputProps 的真实输入出口分开"] }, designEn: {"whenToUse":["Short strings confirmed individually by the user."],"avoid":["Use Select/Combobox when values must come from candidates, and Input for a single value."],"composition":["Field + FieldLabel + TagInput + FieldDescription / Error"],"stateOwner":{"library":["Uncontrolled collection/draft, focus, and constraint feedback."],"application":["Controlled collection/draft, permissions, refresh, failure, and persistence."]},"responsive":["Confirmed items wrap and drafts take remaining width; five matching control/text profiles."],"customization":["Root render/refs stay separate from inputProps for the actual input."]},
} satisfies ComponentMeta;
