import type { ComponentMeta } from "@/lib/types";

export default {
  title: "数值输入 NumberField", titleEn: "NumberField",
  description: "编辑可为空的数值，并按指定步长增减。", descriptionEn: "Edit an optional number and adjust it by a declared step.",
  category: "表单", source: "local", layer: "primitive",
  exports: ["NumberField", "NumberFieldGroup", "NumberFieldInput", "NumberFieldDecrement", "NumberFieldIncrement", "NumberFieldPrimitive"],
  keywords: ["number", "数值", "步进", "quantity"],
  decisions: "直接编辑超出范围时保留原值，提交由浏览器范围约束检查；步进仍限制在 min/max。空、负号和未完成小数不会被替换为 0。",
  decisionsEn: "Direct edits outside the range remain intact for native range validation. Stepping still respects min/max. Empty, minus, and partial decimal drafts are not replaced with zero.",
  api: [
    { name: "NumberField", description: "数值与编辑文本的原语上下文。", descriptionEn: "Primitive context for the numeric value and its editable text.", props: [
      { name: "value / defaultValue / onValueChange", type: "number | null / number / (value, details) => void", description: "null 表示空；受控值由调用方接受，details 支持 cancel()。", descriptionEn: "null means empty. The caller accepts controlled changes; details supports cancel()." },
      { name: "min / max / step", type: "number / number / number | 'any'", default: "step: 1", description: "范围约束直接编辑与表单校验，步进夹在范围内；step='any' 关闭步长校验，交互仍按 1 增减。显式 min 与 step 才始终启用步长提交校验。", descriptionEn: "Native range validation preserves direct edits; stepping clamps to the range. step='any' disables step validation and steps by one. Explicit min with step always enables submission step validation." },
      { name: "snapOnStep / smallStep / largeStep", type: "boolean / number / number", default: "false / 0.1 / 10", description: "是否吸附与 Alt/Shift 步长是独立的显式选项。", descriptionEn: "Snapping and Alt/Shift step sizes are explicit independent options." },
      { name: "onValueCommitted", type: "(value, details) => void", description: "blur 或步进提交回调，只描述编辑结束，不代表已保存。", descriptionEn: "A blur or stepping commit reports the end of editing, not persistence." },
      { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "共同边界、输入与步进读取同档 control/text 角色。", descriptionEn: "The boundary, input, and steppers read the same control/text profile." },
      { name: "name / form / required / disabled / readOnly", type: "Base UI Root props", description: "原生表单与语义入口；只读继续参与提交，禁用不提交。", descriptionEn: "Native form semantics. Read-only values submit; disabled values do not." },
      { name: "locale / format", type: "Intl.LocalesArgument / Intl.NumberFormatOptions", description: "显式数字格式；未指定精度时不因聚焦/失焦丢弃外部数值精度。", descriptionEn: "Explicit number formatting. Without rounding options, focus and blur preserve external precision." },
    ] },
    { name: "NumberFieldGroup", description: "输入与两个步进共享的边界；render/ref/样式与状态透传。", descriptionEn: "Shared boundary for the input and two steppers; forwards render, refs, styling, and state." },
    { name: "NumberFieldInput", description: "复用 Input 的原生出口，由数值原语注册一次 Field。", descriptionEn: "Composes the native Input outlet while the number primitive registers Field once.", props: [{ name: "render / ref / className / style / ARIA / events", type: "Base UI Input props", description: "属于真实 input；render 状态保留数值、编辑文本等 NumberField 状态。", descriptionEn: "Applied to the real input. Render retains numeric value, draft text, and other NumberField state." }] },
    { name: "NumberFieldDecrement / NumberFieldIncrement", description: "减少/增加原语复用 quiet Button；内建名称来自 locale，按钮不提交表单。", descriptionEn: "Decrease/increase primitives compose quiet Button. Locale names and non-submitting buttons." },
    { name: "NumberFieldPrimitive", description: "所用 Base UI NumberField 命名空间。", descriptionEn: "The installed Base UI NumberField namespace." },
  ],
  keyboard: [
    { keys: "ArrowUp / ArrowDown", description: "按步长增减；不因直接编辑允许超范围而越过步进边界。", descriptionEn: "Step up or down within the stepping bounds." },
    { keys: "Alt / Shift + 步进", keysEn: "Alt / Shift + Step", description: "使用 smallStep / largeStep。", descriptionEn: "Use smallStep / largeStep." },
    { keys: "Tab / Shift+Tab", description: "按文档顺序移动数值入口；步进按钮点击后保留输入焦点，键盘步进在输入上执行。只读仍可聚焦文本。", descriptionEn: "Move among numeric inputs. Stepper clicks retain input focus; keyboard stepping acts on that input. Read-only text remains focusable." },
  ],
  notes: ["FieldLabel 命名真实输入，FieldDescription 明示范围与步长。", "封装固定 allowOutOfRange=true；没有静默纠正直接编辑的入口。", "不从范围外值自动判断保存失败；invalid 由应用提供。", "新写的共同边界与五档样式是本次视觉变化，浏览器焦点/对比另验。"],
  notesEn: ["FieldLabel names the real input; FieldDescription states range and step.", "The wrapper fixes allowOutOfRange=true and does not silently correct direct edits.", "An out-of-range value is not a save failure. The caller provides invalid.", "This rebuild changes the shared boundary and size profiles. Browser focus and contrast require separate checks."],
  design: { methods: ["名实相符", "相成相制", "进退相承"], whenToUse: ["有数值含义并需要步进的值"], avoid: ["编号、验证码、前导零有意义的文本用 Input / OtpField"], composition: ["Field + FieldLabel + NumberField / Group / Input / steppers + FieldDescription / Error"], stateOwner: { library: ["编辑文本、步进、焦点、非受控数值"], application: ["受控数值、范围、无效事实与提交结果"] }, responsive: ["五档同名文字与窄屏 +4px；粗指针编辑/步进采用库内触摸目标"], customization: ["Root 与每部件支持 render/ref；集中角色决定表面与尺寸"] }, designEn: {"whenToUse":["A value has numeric meaning and needs stepping."],"avoid":["Use Input/OtpField for identifiers, verification codes, or text with meaningful leading zeros."],"composition":["Field + FieldLabel + NumberField / Group / Input / steppers + FieldDescription / Error"],"stateOwner":{"library":["Editing text, stepping, focus, and uncontrolled numeric values."],"application":["Controlled numeric values, ranges, invalid facts, and submission outcomes."]},"responsive":["Five matching text profiles and narrow-screen +4px; coarse-pointer editing/stepping use the library's touch target."],"customization":["Root and parts expose render/refs; central roles determine surfaces and dimensions."]},
} satisfies ComponentMeta;
