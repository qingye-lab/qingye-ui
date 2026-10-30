import type { ComponentMeta } from "@/lib/types";
export default {
  title: "分栏 Resizable", titleEn: "Resizable",
  description: "两个或多个面板之间放可拖动的分隔条，调整各自占比。", descriptionEn: "Draggable separators between two or more panels that change how the space is shared.",
  category: "布局", layer: "pattern", source: "local", exports: ["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"], keywords: ["resizable", "splitter", "split", "pane", "分栏", "拖拽", "调整大小", "左右分栏"],
  decisions: "分隔条只改变它前后两个面板，其余面板不动，占比总和恒为 100。像素下限（\"240px\"）按组的实际长度换算，量不到长度时不生效。折叠是面板自己的状态，由指针越过折叠与最小值的中点、或分隔条上的 Enter 触发；内容是否随之隐藏、折叠后如何再打开由应用决定。",
  decisionsEn: "A separator changes only the two panels around it; the rest stay put and the shares always add up to 100. Pixel limits (\"240px\") are converted with the measured group length and do not apply when no length can be measured. Collapsing belongs to the panel: it is triggered by the pointer passing the midpoint between collapsed and minimum size, or by Enter on the separator. What the content does when collapsed, and how it is reopened, is up to the application.",
  design: {
    methods: ["名实相符", "布白有用"],
    whenToUse: ["左右（或上下）两块内容的占比需要由使用者调整，例如左列表、右详情。"],
    avoid: ["占比固定不变时用普通的 flex 或 grid；只需要一条分界线时用 Separator。"],
    composition: ["面板内放 ScrollArea、Tree、DataTable 等自己负责滚动的内容；分隔条的名称写它调整的主面板，如「列表」。"],
    stateOwner: { library: ["各面板占比的求解与夹紧、拖动与按键、折叠状态、书写方向。"], application: ["占比是否持久化（onLayout / layout）、折叠后的入口、面板里的内容。"] },
    responsive: ["占比相对分栏组；窄屏是否改成上下排列或单栏切换由应用决定，组件不替换布局。"],
    customization: ["线宽与墨色读系统线宽和墨阶；命中区、键盘步长为预设。className 最后合并，原生属性透传。"],
  },
  designEn: {
    whenToUse: ["The share between two blocks side by side (or stacked) should be adjusted by the user, such as a list on the left and details on the right."],
    avoid: ["Use plain flex or grid when the shares are fixed, and Separator when only a dividing line is needed."],
    composition: ["Put content that scrolls itself in the panels (ScrollArea, Tree, DataTable). Name the separator after the main panel it resizes, for example \"List\"."],
    stateOwner: { library: ["Solving and clamping each panel's share, dragging and keys, collapse state, writing direction."], application: ["Whether the layout is persisted (onLayout / layout), how a collapsed panel is reopened, and the panel content."] },
    responsive: ["Shares are relative to the group. Whether a narrow screen stacks the panels or switches to a single pane is up to the application; the component does not swap layouts."],
    customization: ["Line width and ink read the system line width and ink ladder; the hit area and the keyboard step are presets. className merges last and native attributes forward."],
  },
  api: [
    { name: "ResizablePanelGroup", description: "弹性容器，按 orientation 排列面板与分隔条，并量取自身长度以换算像素界限。", descriptionEn: "A flex container that lays out panels and separators along orientation and measures its own length to convert pixel limits.", props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "面板的排列方向。horizontal 左右并排，分隔条是竖线。", descriptionEn: "Direction the panels are laid out. Horizontal places them side by side with vertical separators." },
      { name: "onLayout", type: "(sizes: number[]) => void", description: "一次拖动或一次按键调整结束时调用，参数是按面板顺序的百分比，和为 100。组长度变化引起的界限修正不调用。", descriptionEn: "Called when a drag or a key press finishes, with the percentages in panel order adding up to 100. Not called for corrections caused by the group changing length." },
      { name: "layout", type: "number[]", description: "受控布局，按面板顺序。长度与面板数不符时忽略。拖动中的中间值只用于显示，松手时才调用 onLayout。", descriptionEn: "Controlled layout in panel order; ignored when its length differs from the panel count. Intermediate drag values are display-only; onLayout is called on release." },
      { name: "className / ref / div props", type: "ComponentProps<\"div\">", description: "作用于容器；默认撑满父元素，高度由父元素或 className 给出。", descriptionEn: "Applied to the container. It fills its parent by default; give it a height through the parent or className." },
    ] },
    { name: "ResizablePanel", description: "一个面板，大小由分栏组决定；内容超出时被裁切。", descriptionEn: "A panel whose size is decided by the group; overflowing content is clipped.", props: [
      { name: "id", type: "string", description: "面板 id，也是前一个分隔条的 aria-controls。省略时自动生成。", descriptionEn: "Panel id, used as aria-controls of the separator before it. Generated when omitted." },
      { name: "defaultSize", type: "number", description: "初始百分比；省略的面板均分其余部分。", descriptionEn: "Initial percentage; panels without it share the rest equally." },
      { name: "minSize / maxSize", type: "number | `${number}px`", default: "0 / 100", description: "数字是百分比，\"240px\" 是像素。像素按组的可用长度（扣除分隔条）换算。", descriptionEn: "A number is a percentage, \"240px\" is pixels, converted with the group's usable length (separators excluded)." },
      { name: "collapsible / collapsedSize", type: "boolean / number", default: "false / 0", description: "允许折叠，折叠后保留的百分比。指针越过折叠值与最小值的中点吸附折叠；方向键不会折叠。", descriptionEn: "Allow collapsing and the percentage kept when collapsed. The pointer snaps to collapsed past the midpoint between collapsed and minimum size; arrow keys never collapse." },
      { name: "onCollapse / onExpand", type: "() => void", description: "折叠或还原时调用。折叠中的面板带 data-collapsed。", descriptionEn: "Called when the panel collapses or is restored. A collapsed panel carries data-collapsed." },
    ] },
    { name: "ResizableHandle", description: "分隔条，role=\"separator\"，可聚焦，调整它前后两个面板。", descriptionEn: "The separator: role=\"separator\", focusable, resizing the panels before and after it.", props: [
      { name: "aria-label / aria-labelledby", type: "string", description: "必填其一，缺失时抛错。名称写它调整的主面板（前一个面板），如「列表」。", descriptionEn: "One is required and a missing name throws. Name it after the main (previous) panel it resizes, for example \"List\"." },
      { name: "className / ref / div props", type: "ComponentProps<\"div\">", description: "作用于分隔条；aria-orientation、aria-valuenow / min / max、aria-controls 由组件给出，valuenow 是前一个面板的百分比。", descriptionEn: "Applied to the separator. aria-orientation, aria-valuenow / min / max and aria-controls come from the component; valuenow is the previous panel's percentage." },
    ] },
  ],
  keyboard: [
    { keys: "← → / ↑ ↓", keysEn: "Left Right / Up Down", description: "横向分栏用左右键，纵向分栏用上下键，每次移动 10 个百分点；从右向左书写时左右键含义对调。", descriptionEn: "Left and right in a horizontal group, up and down in a vertical one, 10 percentage points at a time. Left and right swap in right-to-left text." },
    { keys: "Home / End", description: "前一个面板取最小 / 最大（折叠面板计入）。", descriptionEn: "Move the previous panel to its smallest or largest size, counting a collapsed state." },
    { keys: "Enter", description: "折叠或还原可折叠的相邻面板，优先前一个。", descriptionEn: "Collapse or restore the adjacent collapsible panel, the previous one first." },
  ],
  notes: ["方向键的步长 10% 是预设；APG 没有规定步长。", "分隔条的命中区在细指针下为 8px、粗指针下为 44px，可见的只是一条线。", "面板裁切溢出：需要滚动的内容自己放进 ScrollArea。"],
  notesEn: ["The 10% arrow step is a preset; APG does not prescribe one.", "The hit area is 8px with a fine pointer and 44px with a coarse one; only a line is visible.", "Panels clip overflow: put content that needs to scroll in a ScrollArea."],
} satisfies ComponentMeta;
