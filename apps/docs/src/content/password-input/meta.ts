import type { ComponentMeta } from "@/lib/types";

export default {
  title: "密码输入 PasswordInput", titleEn: "PasswordInput",
  description: "输入密码，并可切换为明文核对。", descriptionEn: "Enter a password and switch to plain text to check it.",
  category: "表单", layer: "pattern", source: "local", exports: ["PasswordInput"],
  keywords: ["password", "password-input", "密码", "显示密码", "reveal", "visibility"],
  decisions: "密码输入是组合，不是 Input 的一个模式：编辑边界（InputGroup）里放输入与一个显示密码的开关，都是公开部件。输入框只承载值；开关是附在边界上的另一个动作，名称固定为「显示密码」，按下与否由 aria-pressed 表达。开关不改内容、不提交表单；强度、规则与校验由应用给出。",
  decisionsEn: "PasswordInput is a composition, not a mode of Input: the input and a show-password toggle sit inside one editing boundary (InputGroup), both public parts. The input only holds the value; the toggle is a separate action on the boundary with the stable name “Show password”, its state expressed by aria-pressed. The toggle changes no content and submits no form; strength, rules and validation come from the application.",
  design: {
    methods: ["名实相符", "相成相制", "进退相承"],
    whenToUse: ["登录、设置或修改密码。"],
    avoid: ["一次性验证码用 OtpField。", "用 placeholder 写密码规则：规则写在 FieldDescription。"],
    composition: ["与 FieldLabel、FieldDescription、FieldError 共处；autoComplete 写 current-password 或 new-password。"],
    stateOwner: {
      library: ["共同边界、开关的名称与按下状态、受控或非受控的可见性。"],
      application: ["密码值、规则说明、校验事实与提交结果。"],
    },
    responsive: ["宽度由所在容器决定；几何与 Input 相同，跟随密度轴。"],
    customization: ["className、style、render 与 ref 属于真实 input；controlClassName 属于编辑边界；showLabel 改写开关的名称。"],
  },
  designEn: {
    whenToUse: ["Signing in, or setting or changing a password."],
    avoid: ["Use OtpField for one-time codes.", "Password rules in a placeholder: write them in FieldDescription."],
    composition: ["Pair with FieldLabel, FieldDescription and FieldError; set autoComplete to current-password or new-password."],
    stateOwner: {
      library: ["The shared boundary, the toggle's name and pressed state, and controlled or uncontrolled visibility."],
      application: ["The password value, rule text, validation facts and the submission outcome."],
    },
    responsive: ["Width follows the container; geometry matches Input and follows the density axis."],
    customization: ["className, style, render and ref belong to the real input; controlClassName belongs to the editing boundary; showLabel renames the toggle."],
  },
  api: [{
    name: "PasswordInput",
    description: "InputGroup + Input（type=password）+ 显示密码的开关。",
    descriptionEn: "InputGroup + Input (type=password) + a show-password toggle.",
    props: [
      { name: "visible / defaultVisible / onVisibleChange", type: "boolean / boolean / (visible) => void", default: "defaultVisible: false", description: "密码是否以明文显示；支持受控与非受控。", descriptionEn: "Whether the password is shown as plain text; controlled or uncontrolled." },
      { name: "showLabel", type: "string", description: "开关的稳定名称，默认从 locale 读取；aria-pressed 表达当前是否可见。", descriptionEn: "Stable toggle name, read from the locale by default; aria-pressed reports visibility." },
      { name: "value / defaultValue / onChange / onValueChange", type: "InputProps", description: "受控与非受控值；切换可见性不改变值。", descriptionEn: "Controlled and uncontrolled values; switching visibility never changes the value." },
      { name: "disabled", type: "boolean", default: "false", description: "输入禁用时开关一并禁用，同样服从 Field 与原生 fieldset。", descriptionEn: "The toggle is disabled with the input, also following Field and a native fieldset." },
      { name: "className / style / render / ref", type: "InputProps", description: "全部作用于真实 input。", descriptionEn: "Applied to the real input." },
      { name: "controlClassName", type: "string", description: "作用于编辑边界，例如宽度。", descriptionEn: "Applied to the editing boundary, e.g. its width." },
      { name: "其余 InputProps（除 type / unstyled）", nameEn: "Other InputProps (except type / unstyled)", type: "InputProps", description: "autoComplete、name、form、aria-* 等原样透传；默认关闭自动大写、自动更正与拼写检查。", descriptionEn: "autoComplete, name, form, aria-* and the rest are forwarded; auto-capitalisation, auto-correction and spell checking are off by default." },
    ],
  }],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "在输入与开关之间移动；禁用的开关不进入顺序。", descriptionEn: "Move between the input and the toggle; a disabled toggle leaves the tab order." },
    { keys: "Enter / Space", description: "焦点在开关上时切换可见性，不提交表单。", descriptionEn: "On the toggle: switch visibility without submitting the form." },
  ],
  notes: ["此前写作 Input type=\"password\" 的用法改为 PasswordInput；Input 的 visibilityToggle / visible / defaultVisible / onVisibleChange / showLabel 已移除。"],
  notesEn: ["Replace Input type=\"password\" with PasswordInput; Input's visibilityToggle / visible / defaultVisible / onVisibleChange / showLabel are removed."],
} satisfies ComponentMeta;
