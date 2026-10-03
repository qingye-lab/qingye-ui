import type { ComponentMeta } from "@/lib/types";
export default {
  title: "滚动区域 ScrollArea", titleEn: "Scroll area",
  description: "在有限视口内保留真实原生滚动。", descriptionEn: "Native scrolling within a bounded viewport.",
  category: "工具", layer: "primitive", source: "local", exports: ["ScrollArea"],
  api: [{ name: "ScrollArea", description: "真实可滚动 div；原生滚动条尊重平台设置。", descriptionEn: "An actual scrollable div; native scrollbars respect platform settings.", props: [
    { name: "children", type: "ReactNode", description: "完整内容，不窗口化或隐藏集合项。", descriptionEn: "Complete content without windowing or hiding collection items." },
    { name: "style / className", type: "div props", description: "消费布局给出 height/maxHeight 与宽度；默认 overflow:auto。", descriptionEn: "Consumer layout supplies height/maxHeight and width; overflow defaults to auto." },
    { name: "tabIndex", type: "number", default: "0", description: "默认能从键盘到达；原生方向/Page/Home/End 滚动保留。", descriptionEn: "Keyboard-reachable by default; retains native arrows/Page/Home/End scrolling." },
    { name: "render / ref / ARIA / events", type: "useRender.ComponentProps<'div'>", description: "真实视口的组合、名称、引用和原生滚动/键盘事件；有名称的独立区域可由调用方加 role=region。", descriptionEn: "Actual viewport composition, names, refs, and native scroll/keyboard events. The caller may add role=region for a named independent area." },
  ] }],
  keyboard: [{ keys: "Tab", description: "进入真实滚动视口或内容内入口。", descriptionEn: "Reach the actual viewport or entries within its content." }, { keys: "方向 / PageUp / PageDown / Home / End", keysEn: "Arrow keys / PageUp / PageDown / Home / End", description: "按浏览器原生规则滚动，嵌套控件保留自己的键位。", descriptionEn: "Use native browser scrolling; nested controls retain their own keys." }],
  notes: ["原生滚动条可见性由操作系统/浏览器/用户设置决定，组件不强制覆盖自动隐藏。", "尺寸由消费布局给出；内容需全量渲染时使用此组件，等高长集合可使用 VirtualList。"], notesEn: ["OS/browser/user preferences determine native scrollbar visibility; automatic hiding is not forcibly overridden.","Consumer layout owns dimensions. Use ScrollArea for complete rendering and VirtualList for long equal-height collections."],
  design: { methods: ["随境取度", "进退相承"], whenToUse: ["有限工作区内的完整内容"], avoid: ["隐藏必要滚动入口或吞掉文本编辑键位"], composition: ["有限视口 + 原生滚动内容"], stateOwner: { library: ["默认键盘可达与盒内焦点"], application: ["视口尺寸与内容"] }, customization: ["style/className 为消费布局入口，无新增尺寸角色"] }, designEn: {"whenToUse":["Complete content within a finite workspace."],"avoid":["Hiding necessary scroll access or consuming text-editing keys."],"composition":["Finite viewport with native scrolling content."],"stateOwner":{"library":["Default keyboard access and internal focus."],"application":["Viewport dimensions and content."]},"customization":["style/className are consumer layout entries; no new dimension roles."]},
} satisfies ComponentMeta;
