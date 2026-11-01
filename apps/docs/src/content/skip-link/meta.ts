import type { ComponentMeta } from "@/lib/types";

export default {
  title: "跳转链接 SkipLink", titleEn: "SkipLink",
  description: "让键盘用户越过重复的导航，直达主要内容。", descriptionEn: "Lets keyboard users bypass repeated navigation and reach the main content.",
  category: "导航", layer: "primitive", source: "local", exports: ["SkipLink"],
  keywords: ["skip link", "skip to content", "bypass blocks", "跳到正文", "跳转链接", "无障碍"],
  decisions: "平时不可见也不可点，却是 Tab 序里第一个到达的；获得焦点才现身。点击时把焦点真正移到目标，目标不可聚焦就补 tabindex=-1，否则下一次 Tab 又回到导航里，跳转等于没发生。找不到目标时不拦截，交还浏览器的默认锚点跳转。",
  decisionsEn: "Invisible and unclickable at rest, yet the first stop in tab order; it appears only when focused. On click it moves focus to the target for real, adding tabindex=-1 when the target is not focusable, otherwise the next Tab would return to the navigation and the skip would not have happened. A missing target is not intercepted; the browser's default anchor jump takes over.",
  design: { methods: ["名实相符", "随境取度"], whenToUse: ["每页都重复出现导航、侧栏或页眉，而主要内容在其后。"], avoid: ["不要把它当作目录或页内导航；它只做一件事：越过重复区块。"], composition: ["放在文档的最前面，href 指向主要内容容器的 id。"], stateOwner: { library: ["现身时机、焦点转移与目标补救。"], application: ["目标的位置与 id，及是否需要多个跳转目标。"] }, responsive: ["固定在视口起始侧上角；从右向左排版时在右上。"], customization: ["children 覆盖默认文字；className 调整层序。"] },
  designEn: { whenToUse: ["Every page repeats navigation, a sidebar or a header ahead of the main content."], avoid: ["Do not use it as a table of contents or in-page navigation; it does one thing, bypassing repeated blocks."], composition: ["Place it first in the document, with href pointing at the id of the main-content container."], stateOwner: { library: ["When it appears, focus transfer and target remediation."], application: ["Where the target is and its id, and whether more than one skip target is needed."] }, responsive: ["Fixed to the viewport's start-side top corner; top-right under right-to-left."], customization: ["children overrides the default text; className adjusts stacking."] },
  api: [
    { name: "SkipLink", description: "指向页内锚点的 a。", descriptionEn: "An a pointing at an in-page anchor.", props: [
      { name: "href", type: "`#${string}`", description: "必填。目标的锚点，写成 #id。", descriptionEn: "Required. The target anchor, written as #id." },
      { name: "children", type: "React.ReactNode", description: "省略时用 locale 的 skipToContent。", descriptionEn: "Defaults to the locale's skipToContent." },
      { name: "className / onClick / native props", type: "React.ComponentProps<a>", description: "onClick 在组件之前运行，调用 preventDefault 可取消转移。", descriptionEn: "onClick runs first; calling preventDefault cancels the focus transfer." },
    ] },
  ],
  notes: ["目标若不可聚焦，组件会补上 tabindex=\"-1\"。"], notesEn: ["If the target is not focusable, the component adds tabindex=\"-1\"."],
} satisfies ComponentMeta;
