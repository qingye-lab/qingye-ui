import type { ComponentMeta } from "@/lib/types";

export default {
  title: "表单 Form", titleEn: "Form",
  description: "原生字段提交范围与重置上下文。", descriptionEn: "A native field submission scope and reset context.",
  category: "表单", layer: "primitive", source: "local", exports: ["Form", "focusFirstInvalid"], keywords: ["form", "表单", "submit", "reset"],
  decisions: "Form 不推断校验或提交结果。应用使用原生 onSubmit 与 FormData，显式给 Field.invalid 和就地 FieldError；失败或取消不自动清空输入。",
  decisionsEn: "Form infers no validation or submission outcome. Use native onSubmit and FormData, with explicit Field.invalid and local FieldError; failure or cancellation never clears input automatically.",
  design: {
    methods: ["名实相符", "相成相制", "进退相承"], whenToUse: ["字段需要一个真实提交或重置范围。"], avoid: ["把容器当作保存服务、成功状态或自动校验上下文。"],
    composition: ["Field / Fieldset 命名字段和范围；FieldGroup 或布局组件安排关系；Button 明确声明 type。"],
    stateOwner: { library: ["原生表单元素与组合入口。"], application: ["草稿、显式校验、请求、外部错误与结果。"] },
    responsive: ["Form 不强加围合或字段布局。"], customization: ["原生属性与事件、render、className、style 和 ref 属于实际 form。"],
  }, designEn: {"whenToUse":["Fields need an actual submission or reset scope."],"avoid":["Treating a container as a saving service, success state, or automatic validation context."],"composition":["Field/Fieldset name fields and scopes; FieldGroup or layout components organize relationships. Button declares type explicitly."],"stateOwner":{"library":["The native form element and composition entry."],"application":["Drafts, explicit validation, requests, external errors, and outcomes."]},"responsive":["Form imposes neither enclosure nor field layout."],"customization":["Native props/events, render, className, style, and refs belong to the actual form."]},
  api: [{ name: "Form", description: "真实原生 form，无内置请求和错误聚合。", descriptionEn: "A real native form with no request or error aggregation.", props: [
    { name: "onSubmit / onReset", type: "native form event handlers", description: "原生事件，支持 preventDefault；提交值由应用使用 FormData 读取。", descriptionEn: "Native events with preventDefault; the application reads values using FormData." },
    { name: "action / method / noValidate / id / name", type: "native form props", description: "保留平台提交与约束校验；不默认关闭 constraint validation。", descriptionEn: "Keeps platform submission and constraints; native validation remains enabled by default." },
    { name: "render / ref / ARIA / className / style", type: "useRender.ComponentProps<form>", description: "保留原生组合。render 必须继续承载实际表单语义。", descriptionEn: "Native composition props; render must keep actual form semantics." },
  ] }, { name: "focusFirstInvalid(form)", description: "纯函数：按文档顺序聚焦 form 里第一个无效字段并 scrollIntoView({ block: \"nearest\" })，找到返回 true。无效 = aria-invalid=\"true\" 或原生 :invalid 的 input/select/textarea；落点是用户看得见、键盘本来就能走到的部件（Select 触发器、Checkbox/Switch 的标记、Radio、Slider 滑块、OtpField 输入等），跳过禁用、aria-hidden、不可见与 tabindex=-1 的隐藏原生副本。由应用在设置完 Field.invalid 后调用（先让 aria-invalid 渲染，再调用，例如放进 effect）；Form 自身不调用它，默认行为不变。", descriptionEn: "A pure function: focuses the first invalid field in document order and calls scrollIntoView({ block: \"nearest\" }); returns true when found. Invalid means aria-invalid=\"true\" or a native :invalid input/select/textarea. It lands on the part the user can see and reach by keyboard (Select trigger, Checkbox/Switch mark, Radio, Slider thumb, OtpField input, ...), skipping disabled, aria-hidden, invisible, and tabindex=-1 hidden native copies. The application calls it after setting Field.invalid (let aria-invalid render first, e.g. in an effect); Form never calls it, so default behaviour is unchanged." }],
  keyboard: [{ keys: "Enter", description: "按平台规则进行隐式提交；原生约束可阻止无效值提交。", descriptionEn: "Implicit submission follows platform rules; native constraints can block invalid values." }],
  notes: ["FieldError.errors 是调用方给出的错误，Field.invalid 单独由调用方声明。", "不提供 Form 的自动落焦点选项：Form 不知道应用何时设置了 invalid，也不推断校验；原生约束校验（未设 noValidate）本来就由浏览器聚焦第一个无效控件。应用自行校验时调用 focusFirstInvalid。"],
  notesEn: ["FieldError.errors contains caller-provided messages; Field.invalid is separately declared by the caller.", "Form has no auto-focus option: it cannot know when the application set invalid and infers no validation; native constraint validation (without noValidate) already makes the browser focus the first invalid control. Call focusFirstInvalid when the application validates itself."],
} satisfies ComponentMeta;
