import type { ComponentMeta } from "@/lib/types";
export default {
  title: "步骤 Steps", titleEn: "Steps", description: "应用事实决定的有序过程。", descriptionEn: "An ordered process with application-owned progress.",
  category: "导航", layer: "pattern", source: "local", exports: ["Steps", "Step", "StepTitle", "StepDescription"],
  decisions: "序号不证明完成；每项状态显式传入，只有 current 获得 aria-current=step。", decisionsEn: "Order does not establish completion. Every state is explicit; only current receives aria-current=step.",
  design: { methods: ["名实相符", "进退相承"], whenToUse: ["有明确顺序和状态事实的过程。"], avoid: ["时间事件用 Timeline；平级页面入口用导航链接。"], stateOwner: { library: ["顺序语义、可见状态名称与当前步骤标记。"], application: ["每一步的完成、当前位置、错误与恢复动作。"] }, responsive: ["内容纵向排列并换行，不隐藏状态。"] }, designEn: {"whenToUse":["A process has an explicit order and actual states."],"avoid":["Use Timeline for events and navigation links for peer page destinations."],"stateOwner":{"library":["Order semantics, visible state names, and current-step markers."],"application":["Each step's completion, current position, errors, and recovery actions."]},"responsive":["Content stacks and wraps without hiding states."]},
  keywords: ["stepper", "wizard", "progress steps", "步骤", "步骤条", "流程", "向导"],
  api: [
    { name: "Steps", description: "有名称的 ol。", descriptionEn: "A named ordered list.", props: [{ name: "aria-label / render / ref / native props", type: "useRender.ComponentProps<ol>", description: "默认名称来自 locale。", descriptionEn: "The default name comes from locale." }] },
    { name: "Step", description: "一个 li，状态独立于前后位置。", descriptionEn: "A li with state independent of preceding positions.", props: [{ name: "state", type: '"upcoming" | "current" | "complete" | "error"', description: "必填的应用事实，提供本地化辅助名称。", descriptionEn: "Required application fact with a localized assistive label." }, { name: "render / ref / native props", type: "useRender.ComponentProps<li>", description: "状态不自动产生导航。", descriptionEn: "State does not generate navigation." }] },
    { name: "StepTitle / StepDescription", description: "div / p 内容槽。", descriptionEn: "div / p content slots.", props: [{ name: "children / render / ref / native props", type: "useRender.ComponentProps<div | p>", description: "应用提供标题、解释和恢复链接。", descriptionEn: "The application provides titles, explanation and recovery links." }] },
  ],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "步骤本身是只读有序列表，不占 Tab 停靠点；仅当应用在步骤内容中放入链接或恢复按钮时，焦点按文档顺序经过这些原生控件。", descriptionEn: "Steps itself is a read-only ordered list with no Tab stops of its own; focus visits links or recovery buttons placed inside step content by the application in document order." },
    { keys: "Enter / Space", description: "激活步骤内由应用提供的链接（Enter）或恢复按钮（Enter / Space）。", descriptionEn: "Activate an application-provided link (Enter) or recovery button (Enter / Space) inside a step." },
  ],
  notes: ["不能由当前索引把之前各项自动标记完成。"], notesEn: ["Do not automatically complete earlier items from a current index."],
} satisfies ComponentMeta;
