import type { ComponentMeta } from "@/lib/types";

export default {
  title: "按压按钮 Toggle", titleEn: "Toggle",
  description: "保持名称的二态按压按钮。", descriptionEn: "A two-state pressed button with a stable name.",
  category: "表单", layer: "primitive", source: "local", exports: ["Toggle", "TogglePrimitive"],
  api: [
    { name: "Toggle", description: "独立的 pressed 布尔事实。", descriptionEn: "An independent pressed boolean fact.", props: [
      { name: "pressed / defaultPressed", type: "boolean", description: "受控事实或非受控初值。默认未按压。", descriptionEn: "Controlled state or uncontrolled initial value; unpressed by default." },
      { name: "onPressedChange", type: "(pressed: boolean, details) => void", description: "提供按压事实，可用 details.cancel() 取消。", descriptionEn: "Supplies pressed facts, cancelable through details.cancel()." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "五档 control 与同名 text-control，窄屏 +4px。", descriptionEn: "Five matching control/text-control profiles with narrow-screen +4px." },
      { name: "shape", type: '"label" | "icon"', default: '"label"', description: "文字与图标几何；纯图标按钮必须有可访问名称。", descriptionEn: "Text/icon geometry; icon-only buttons need an accessible name." },
      { name: "disabled", type: "boolean", default: "false", description: "原生禁用，无法改变 pressed。", descriptionEn: "Native disabling prevents pressed changes." },
      { name: "value", type: "string", description: "仅在 ToggleGroup 内标识该项；独立 Toggle 的状态仍是 boolean，不是表单值输入。", descriptionEn: "Identifies an item only within ToggleGroup. Standalone Toggle still holds a boolean rather than a form value." },
      { name: "render / nativeButton / ref / className / style", type: "Base UI composition", description: "保留元素、ARIA、事件和原语样式回调。", descriptionEn: "Retain element, ARIA, events, and primitive style callbacks." },
    ] },
    { name: "TogglePrimitive", description: "Base UI 按压原语公共出口。", descriptionEn: "Public Base UI pressed-state primitive." },
  ],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "到达可用按钮。", descriptionEn: "Reach available buttons." }, { keys: "Space / Enter", description: "在 pressed 与 unpressed 之间切换。", descriptionEn: "Toggle pressed/unpressed." }],
  notes: ["名称不随 pressed 改写，aria-pressed 表达状态。", "pressed 不表示保存、请求或持久化已完成。", "布尔表单值用 Checkbox，即时开关用 Switch。"], notesEn: ["Names stay stable; aria-pressed expresses state.","Pressed does not establish saved, requested, or persisted completion.","Use Checkbox for boolean form values and Switch for immediate settings."],
  design: {
    methods: ["名实相符", "进退相承"], whenToUse: ["稳定名称的二态工具按钮"], avoid: ["单次动作使用 Button", "表单布尔值使用 Checkbox", "异步结果不由 Toggle 推断"],
    composition: ["可组合进 ToggleGroup；图标必须给 aria-label"], stateOwner: { library: ["非受控 pressed、按压、焦点"], application: ["受控 pressed、相关内容、持久化"] },
    responsive: ["既有 control 五档和 touch-target；实际命中未在本批浏览器验证"], customization: ["未按压 bordered，按压 solid；复用 Button 的几何与焦点角色"],
  }, designEn: {"whenToUse":["Binary tool buttons with stable names."],"avoid":["Use Button for one-time actions.","Use Checkbox for boolean form values.","Toggle cannot infer asynchronous outcomes."],"composition":["Can compose in ToggleGroup; icons require aria-label."],"stateOwner":{"library":["Uncontrolled pressed state, activation, and focus."],"application":["Controlled pressed state, associated content, and persistence."]},"responsive":["Existing five control profiles and touch-target; actual hit areas were not browser-verified in this batch."],"customization":["Unpressed uses bordered, pressed solid; shares Button geometry and focus roles."]},
} satisfies ComponentMeta;
