import type { ComponentMeta } from "@/lib/types";

export default {
  title: "表单 Form", titleEn: "Form",
  description: "原生字段提交范围与重置上下文。", descriptionEn: "A native field submission scope and reset context.",
  category: "表单", layer: "primitive", source: "local", exports: ["Form"], keywords: ["form", "表单", "submit", "reset"],
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
  ] }],
  keyboard: [{ keys: "Enter", description: "按平台规则进行隐式提交；原生约束可阻止无效值提交。", descriptionEn: "Implicit submission follows platform rules; native constraints can block invalid values." }],
  notes: ["FieldError.errors 是调用方给出的错误，Field.invalid 单独由调用方声明。"],
  notesEn: ["FieldError.errors contains caller-provided messages; Field.invalid is separately declared by the caller."],
} satisfies ComponentMeta;
