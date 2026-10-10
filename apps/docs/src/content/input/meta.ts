import type { ComponentMeta } from "@/lib/types";

export default {
  title: "输入框 Input",
  titleEn: "Input",
  description: "输入一个文本值。",
  descriptionEn: "Enter one text value.",
  category: "表单",
  source: "local",
  layer: "primitive",
  exports: ["Input"],
  keywords: ["input", "输入框", "文本框", "text", "file"],
  decisions: "输入框只做一件事：承载一个值的输入。清空、搜索图标与显示密码是附在编辑边界上的另一件事，由 SearchInput、PasswordInput 或 InputGroup 组合出来，输入框不内置。Placeholder 不能代替持续可见的名称。",
  decisionsEn: "Input does one thing: it carries the entry of one value. Clearing, a search icon and password visibility are a separate matter on the editing boundary, composed by SearchInput, PasswordInput or InputGroup rather than built into Input. A placeholder does not replace a persistent visible name.",
  design: {
    methods: ["名实相符", "相成相制", "进退相承"],
    whenToUse: ["输入一个文本值，原生 type 与内容匹配。"],
    avoid: ["搜索用 SearchInput，密码用 PasswordInput。", "用 placeholder 代替名称；把超时变成无效；把未知转成空串或 0；校验失败清空草稿。"],
    composition: ["与 FieldLabel、FieldDescription、FieldError 共处；单位、标记与附属动作（清空、应用）交给 InputGroup + InputGroupButton。"],
    stateOwner: {
      library: ["原生输入、Field 关联、焦点与只读标记。"],
      application: ["值的含义、校验事实、候选范围、未知/不适用及送达结果。"],
    },
    responsive: ["xs/sm/md/lg/xl 消费基础层档案；窄屏增加 4px，粗指针编辑区至少 44px。"],
    customization: ["className、style、render 与 ref 属于真实 input；controlClassName 属于编辑边界。"],
  }, designEn: {"whenToUse":["Enter one text value with a matching native type."],"avoid":["Use SearchInput for search and PasswordInput for passwords.","Placeholders replacing names; timeouts treated as invalid; unknown converted to empty or zero; drafts cleared after validation failure."],"composition":["Keep FieldLabel, FieldDescription, and FieldError together; InputGroup + InputGroupButton supply units, markers, and adjunct actions such as clearing or applying."],"stateOwner":{"library":["Native input, Field associations, focus, and the read-only marker."],"application":["Value meaning, validation facts, candidate scope, unknown/not-applicable values, and delivery outcomes."]},"responsive":["xs/sm/md/lg/xl use foundation profiles; narrow heights add 4px and coarse-pointer editing areas are at least 44px."],"customization":["className, style, render, and refs belong to the actual input; controlClassName belongs to its editing boundary."]},
  api: [{
    name: "Input",
    description: "真实边框界定编辑区；Base UI Input 保留 Field 注册和原生属性。",
    descriptionEn: "A real border identifies the editable area. Base UI Input retains Field registration and native attributes.",
    props: [
      { name: "type", type: "React.HTMLInputTypeAttribute", default: '"text"', description: "原生类型原样生效，不附带任何额外动作。搜索与密码用 SearchInput / PasswordInput。", descriptionEn: "The native type applies as is, with no extra action attached. Use SearchInput / PasswordInput for search and passwords." },
      { name: "value / defaultValue / onValueChange", type: "原生值 / 初始值 / (value, details) => void", typeEn: "Native value / initial value / (value, details) => void", description: "支持受控与非受控值；onChange 同样透传。", descriptionEn: "Controlled and uncontrolled values; onChange is also forwarded." },
      { name: "readOnly", type: "boolean", default: "false", description: "保留焦点、复制与表单提交，阻止编辑；默认显示只读标记。", descriptionEn: "Retains focus, copying, and form submission while blocking edits. Shows a read-only marker." },
      { name: "className / style / render / ref", type: "Base UI Input props", description: "全部作用于真实 input；className/style 支持状态函数。", descriptionEn: "Applied to the real input. className/style support state functions." },
      { name: "controlClassName", type: "string", description: "调整共同编辑边界，例如宽度与所在布局；不替代原生属性。", descriptionEn: "Styles the shared editable boundary, including its width and placement." },
      { name: "unstyled", type: "boolean", default: "false", description: "由 InputGroup 等公共组合承担边界；保留内高、档案与原生状态。", descriptionEn: "Lets a public composition such as InputGroup supply the boundary while retaining inner geometry and native state." },
      { name: "nativeInput", type: "boolean", default: "false", description: "已由 FieldControl 或其他原语注册时使用原生出口；保留 render/ref/事件，避免重复注册。", descriptionEn: "Native outlet for an input already registered by FieldControl or another primitive. Retains render, refs, and events without double registration." },
    ],
  }],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "进入与离开输入。", descriptionEn: "Enter and leave the input." },
  ],
  notes: [
    "aria-invalid 来自应用或浏览器校验；值的真伪与是否送达分开表达。",
    "提供 FieldLabel、原生 label 或 aria-label。Placeholder 是输入提示，不是名称。",
    "clearable / clearLabel / onClear 与 visibilityToggle / visible / defaultVisible / onVisibleChange / showLabel 已移除：搜索用 SearchInput，密码用 PasswordInput，其他附属动作用 InputGroup + InputGroupButton 组合。",
    "type=\"file\" 保留浏览器文件选择行为与语言；文件列表和业务校验由调用方提供。",
  ],
  notesEn: [
    "aria-invalid comes from application or browser validation. Value validity and delivery are separate facts.",
    "Provide FieldLabel, a native label, or aria-label. A placeholder is a hint rather than a name.",
    "clearable / clearLabel / onClear and visibilityToggle / visible / defaultVisible / onVisibleChange / showLabel are removed: use SearchInput for search, PasswordInput for passwords, and compose InputGroup + InputGroupButton for other adjunct actions.",
    "type=\"file\" retains browser behavior and language. The caller owns file lists and business validation.",
  ],
} satisfies ComponentMeta;
