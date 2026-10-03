import type { ComponentMeta } from "@/lib/types";

export default {
  title: "分段文本 OtpField", titleEn: "OtpField",
  description: "分段呈现一个固定长度文本值。", descriptionEn: "Present a fixed-length text value in segments.",
  category: "表单", source: "local", layer: "primitive", exports: ["OtpField"], keywords: ["otp", "验证码", "固定长度", "分段"],
  decisions: "只有一个真实文本输入，分段跟随它的光标与选择。前导零保留，长度填满只说明文本长度；核对、请求和结果归应用。",
  decisionsEn: "One real text input owns the caret and selection. Leading zeros remain intact. Filling the length reports no verification result; the application owns checking and requests.",
  api: [{ name: "OtpField", description: "Input 的分段呈现，Field 注册一次。", descriptionEn: "Segmented presentation of Input with one Field registration.", props: [
    { name: "length", type: "number", description: "必填正整数，以 Unicode code point 计。超长用户插入整次拒绝并说明；外部值完整呈现，不截断。", descriptionEn: "Required positive integer, counted as Unicode code points. Over-capacity insertions are rejected whole with feedback. External values are shown in full." },
    { name: "value / defaultValue", type: "string", default: "defaultValue: ''", description: "受控或非受控文本，保留前导零。", descriptionEn: "Controlled or uncontrolled text; leading zeros remain." },
    { name: "onValueChange", type: "(value: string, event: React.ChangeEvent<HTMLInputElement>) => void", description: "请求文本变化；受控调用方拒绝更新时原值不变。", descriptionEn: "Requests a text change. A controlled caller may retain the previous value." },
    { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "分段读同档控件宽高与文字；粗指针读取触摸目标。", descriptionEn: "Segments use matching control dimensions and text; coarse pointers use the touch target." },
    { name: "inputMode / autoComplete", type: "native input props", default: "autoComplete: 'one-time-code'", description: "inputMode 由真实字符范围决定；type 始终 text，不自动转换为数值。", descriptionEn: "Choose inputMode for the character set. The input type remains text." },
    { name: "render / ref / className / style / ARIA / events", type: "Input props", description: "全部属于真实 input；render 必须保持 input 语义、受控值和事件。", descriptionEn: "Applied to the real input. Render must retain input semantics, its controlled value, and events." },
    { name: "controlClassName", type: "string", description: "调整分段容器的位置与布局。", descriptionEn: "Styles the segmented container's placement and layout." },
    { name: "disabled / readOnly / name / form / required", type: "native input props", description: "禁用不提交；只读可聚焦、复制与提交。", descriptionEn: "Disabled text does not submit. Read-only text remains focusable, copyable, and submitted." },
  ] }],
  keyboard: [
    { keys: "字符输入 / 粘贴", keysEn: "Typing / Paste", description: "替换原生选择并推进光标；粘贴超出容量时保留原文。", descriptionEn: "Replace the native selection and advance the caret; over-capacity paste preserves the original text." },
    { keys: "ArrowLeft / ArrowRight / Home / End", description: "移动原生文本光标；Shift 保留原生文本选择。", descriptionEn: "Move the native caret; Shift extends native selection." },
    { keys: "Backspace / Delete", description: "按原生光标或选择删除文本。", descriptionEn: "Delete according to the native caret or selection." },
    { keys: "Tab / Shift+Tab", description: "整个字段只有一个焦点入口。", descriptionEn: "The whole field has one focus stop." },
  ],
  notes: ["点击一段选中该字符，后续输入替换它；空段将光标放在当前文本末尾。", "与 FieldLabel、FieldDescription、FieldError 共处；分段本身对辅助技术隐藏。", "本批采用单输入分段结构，不恢复旧分段 API。", "真实移动端自动填充、IME、辅助技术与焦点对比仍需浏览器/设备验证。"],
  notesEn: ["Clicking a segment selects its character. An empty segment places the caret at the end.", "Compose with FieldLabel, FieldDescription, and FieldError. Visual segments are hidden from assistive tech.", "This rebuild chooses one segmented input and does not restore a prior segmented API.", "Mobile autofill, real IME, assistive tech, and focus contrast need browser/device verification."],
  design: { methods: ["名实相符", "相成相制", "进退相承"], whenToUse: ["任务明确给出长度的短文本"], avoid: ["数值步进用 NumberField；不确定长度用 Input"], composition: ["Field 持有持续名称、说明和错误；不内建登录业务"], stateOwner: { library: ["文本草稿、光标、选择与容量拒绝提示"], application: ["长度、字符规则、受控值、核对与提交结果"] }, responsive: ["分段使用同档 control/text；超出外部值完整显示，容器可由项目调整"], customization: ["输入 props 属于真实 input；controlClassName 属于外容器"] }, designEn: {"whenToUse":["The task specifies a short text length."],"avoid":["Use NumberField for numeric stepping and Input for unspecified lengths."],"composition":["Field supplies persistent names, descriptions, and errors; no built-in sign-in business logic."],"stateOwner":{"library":["Text drafts, caret, selection, and capacity rejection feedback."],"application":["Length, character rules, controlled values, verification, and submission outcomes."]},"responsive":["Segments use matching control/text profiles; over-capacity external values display fully, with consumer-adjustable containers."],"customization":["Input props belong to the actual input; controlClassName belongs to the outer container."]},
} satisfies ComponentMeta;
