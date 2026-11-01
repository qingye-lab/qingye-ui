import type { ComponentMeta } from "@/lib/types";

export default {
  title: "新手引导 Tour",
  titleEn: "Tour",
  description: "依次指向页面上的元素并逐步说明的非阻断引导，可选聚光遮罩。",
  descriptionEn: "A non-modal, step-by-step guide that points at page elements one after another, with an optional spotlight.",
  category: "浮层",
  layer: "pattern",
  source: "local",
  exports: ["Tour"],
  keywords: ["tour", "引导", "新手", "导览", "onboarding", "聚光"],
  decisions: "引导只指路，不替用户完成任务，也不阻断页面：遮罩不拦截指针，只有 Esc 是退出。找不到锚点的步骤会被跳过，「第 N / M 步」的 M 只数实际能走的步数；结束后是否不再提示由应用记录。",
  decisionsEn: "A tour only points the way: it neither does the task for the user nor blocks the page. The mask does not intercept the pointer and only Escape exits. Steps without an anchor are skipped, and M in \"Step N of M\" counts only the steps that can be shown. The application records whether the tour should not appear again.",
  api: [
    {
      name: "Tour",
      description: "按 steps 顺序把浮层锚定到各步的元素；定位复用 Popover，锚点在视口外时先滚入视口。",
      descriptionEn: "Anchors a popup to each step's element in order, reusing Popover positioning. Scrolls the anchor into view first when it is outside the viewport.",
      props: [
        { name: "steps", type: "TourStep[]", description: "每步含 target（元素、ref 或返回元素的函数）、title、description、side、align。锚点只在打开与换步时解析。", descriptionEn: "Each step has target (element, ref or function returning an element), title, description, side and align. Anchors are resolved on open and on step change." },
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控打开状态。Tour 只请求关闭，打开由应用决定。", descriptionEn: "Controlled / uncontrolled open state. Tour only requests closing; the application decides to open." },
        { name: "onOpenChange", type: "(open, { reason }) => void", description: "reason 为 finish、skip、escape 或 unavailable（没有任何一步的锚点可用）。", descriptionEn: "reason is finish, skip, escape or unavailable (no step has a usable anchor)." },
        { name: "step / defaultStep", type: "number", default: "0", description: "当前步在 steps 中的下标，受控 / 非受控。非受控时结束后回到起点。", descriptionEn: "Index of the current step in steps, controlled / uncontrolled. An uncontrolled step returns to the start after the tour ends." },
        { name: "onStepChange", type: "(step: number) => void", description: "换步时调用，参数是新步的下标；被跳过的步不会出现。", descriptionEn: "Called with the new step index; skipped steps never appear." },
        { name: "onFinish / onSkip", type: "() => void / (step) => void", description: "在最后一步点「完成」，或在某步点「跳过」。随后各自触发 onOpenChange。", descriptionEn: "Called on Done at the last step or Skip at any step, each followed by onOpenChange." },
        { name: "spotlight", type: "boolean", default: "false", description: "在锚点处挖洞的遮罩；不拦截指针，随窗口尺寸与滚动跟随锚点。", descriptionEn: "A mask with a cutout at the anchor. It does not intercept the pointer and follows window size and scroll." },
        { name: "className", type: "string", description: "追加到浮层。", descriptionEn: "Appended to the popup." },
      ],
    },
  ],
  keyboard: [
    { keys: "← / →", description: "上一步 / 下一步（RTL 下方向相反）；焦点在输入控件内时不处理。", descriptionEn: "Previous / next step (reversed in RTL). Ignored while focus is in an input control." },
    { keys: "Esc", description: "退出引导并把焦点还给打开之前的位置。", descriptionEn: "Exit the tour and return focus to where it was before opening." },
    { keys: "Tab / Shift+Tab", description: "在浮层内的按钮间移动，也可回到页面。", descriptionEn: "Move between the popup's buttons, or back to the page." },
  ],
  notes: [
    "浮层是非模态 dialog，名称取自当前步骤的标题，说明取自 description。",
    "步骤的 target 用函数或 ref 时，锚点晚于 Tour 出现也能被找到；缺失的步骤在开发环境给出警告。",
    "开启 spotlight 后页面依然可操作；需要阻断时用 Dialog。",
    "减弱动效时遮罩的洞直接到位，滚动不再平滑。",
  ],
  notesEn: [
    "The popup is a non-modal dialog named by the current step's title and described by its description.",
    "Function and ref targets are found even when the anchor appears after Tour mounts. Missing steps warn in development.",
    "The page stays operable with spotlight on. Use Dialog when blocking is needed.",
    "With reduced motion the cutout jumps into place and scrolling is no longer smooth.",
  ],
  design: {
    methods: ["名实相符", "进退相承", "相成相制"],
    whenToUse: ["首次使用时依次指出几处关键入口。"],
    avoid: ["把必须完成的操作放进引导；用遮罩阻断页面；步数过多。"],
    composition: ["锚点是页面上已有的元素；Tour 只持有当前步与打开请求，不改动锚点。"],
    stateOwner: { library: ["当前步、可用步的解析与跳过、焦点移入与返回、定位。"], application: ["何时开始、是否已看过、受控的 open 与 step。"] },
    responsive: ["浮层宽度受可用宽度限制；锚点在视口外时先滚入。"],
    customization: ["浮层宽度与方向可调；遮罩外扩与圆角随系统尺度，不单设令牌。"],
  },
} satisfies ComponentMeta;
