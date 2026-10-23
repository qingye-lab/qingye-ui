import type { ComponentMeta } from "@/lib/types";
export default {
  title: "虚拟列表 VirtualList", titleEn: "Virtual list",
  description: "以稳定项身份呈现等高或动态高度长集合，保留阅读位置与正在编辑的内容。", descriptionEn: "Window fixed or measured-height collections while retaining the reading position and active editing.",
  category: "工具", layer: "primitive", source: "local", exports: ["VirtualList"],
  keywords: ["virtualized", "windowing", "dynamic height", "chat", "虚拟列表", "长列表", "虚拟滚动", "动态高度", "尾部跟随"],
  api: [{ name: "VirtualList<Item>", description: "集合渲染边界，真实 list/listitem，不提供选择、请求或业务列。", descriptionEn: "Collection rendering boundary with actual list/listitem semantics, without selection, requests, or business columns.", props: [
    { name: "items / getKey / renderItem", type: "readonly Item[] / (item,index)=>React.Key / (item,index)=>ReactNode", description: "真实集合、稳定唯一 key 与内容；重复 key 显式报错。插入、排序时用持久身份，不用位置。", descriptionEn: "Actual collection, stable unique keys, and content; duplicate keys throw. Use persistent identities across insertion and reordering, rather than positions." },
    { name: "itemSize / height", type: "number", description: "项外高与视口高，CSS px，均为有限正数。默认固定高度；动态模式中 itemSize 是未测量行的估计值，不限制内容高度。", descriptionEn: "Outer item height and viewport height in CSS px, both finite and positive. Rows are fixed by default; in dynamic mode itemSize estimates unmeasured rows without constraining their content height." },
    { name: "measurement", type: "'fixed' | 'dynamic'", default: "'fixed'", description: "dynamic 用 ResizeObserver 测量已挂载行的实际 border-box 高度；整行高度应由正常内容流决定，外部 margin 不计入测量。", descriptionEn: "dynamic uses ResizeObserver to measure each mounted row's actual border-box height. Let normal content flow determine row height; external margins are excluded." },
    { name: "actionsRef", type: "React.Ref<VirtualListActions>", description: "独立动作出口：scrollToIndex(index, { align?: 'auto' | 'start' | 'center' | 'end' }) 与 scrollToEnd()。立即滚动，不转移焦点。非法或越界 index 抛 RangeError；空集合 scrollToEnd 无操作。", descriptionEn: "Separate actions: scrollToIndex(index, { align?: 'auto' | 'start' | 'center' | 'end' }) and scrollToEnd(). Scroll instantly without moving focus. Invalid or out-of-bounds indices throw RangeError; scrollToEnd is a no-op for empty collections." },
    { name: "followEnd", type: "boolean", default: "false", description: "显式尾部跟随。仅原先停在底部（1 CSS px 容差）时跟随追加项；向上阅读后保持阅读位置，不在初次挂载时跳到底部。", descriptionEn: "Explicit end following. Follow appended items only when previously at the bottom (within 1 CSS px). Reading history keeps its position, and initial mounting never jumps to the end." },
    { name: "overscan", type: "number", default: "2", description: "窗口两侧的渲染预算预设，非负整数；不是视觉尺寸。", descriptionEn: "A nonnegative integer rendering-budget preset on both window edges, rather than a visual dimension." },
    { name: "render / ref / style / className / events / ARIA", type: "useRender.ComponentProps<'div'>", description: "ref 仍是原生滚动视口。显式 height 承担视口高度；初始服务端窗口使用它。浏览器默认滚动锚定关闭，由组件统一维持阅读位置。给集合可识别名称。", descriptionEn: "ref remains the native scroll viewport. Explicit height owns its height and supplies the initial server-rendered window. Browser scroll anchoring is disabled so the component owns reading continuity. Give the collection an identifiable name." },
  ] }],
  keyboard: [{ keys: "Tab", description: "到达集合视口与已挂载的内部操作。", descriptionEn: "Reach the collection viewport and mounted internal actions." }, { keys: "方向 / Home / End", keysEn: "Arrow keys / Home / End", description: "从视口或行本身到相邻/首末真实行，跨窗口滚动挂载；内嵌编辑/按钮键位不被接管。", descriptionEn: "From the viewport or row, reach adjacent/first/last actual rows across windows. Embedded editing/button keys remain intact." }],
  notes: [
    "固定模式保持 itemSize 契约；内容会换行、展开或流式增长时显式选 dynamic，并给未测量行合理估计。动态跳转可随实际测量修正位置，不承诺平滑滚动。",
    "稳定 key 在前插和排序后保留同一可见项及项内像素偏移；视口上方整行高度变化会补偿滚动。尾部跟随不代替应用的未读计数或加载状态。",
    "键只在 items 或 getKey 变化时派生。滚动时只处理窗口和最多一个保留焦点行，不重新遍历 50,000 项；数据变化或测量更新仍可能更新尺寸缓存。",
    "聚焦行即使离屏也保留挂载；真实移除后焦点回到视口。aria-posinset/setsize 表达完整集合位置。搜索、打印或需要全量辅助技术遍历时改用普通集合或 ScrollArea。",
    "窗口示例的 48px 等高、动态示例的 72px 估计及视口高度均是消费示例选择，修改入口为 itemSize/height；未新增库 token。",
  ], notesEn: [
    "Fixed mode retains the itemSize contract. Explicitly choose dynamic for wrapping, expanding, or streaming content and provide a reasonable estimate. Dynamic jumps may correct their position as measurements arrive; smooth scrolling is not promised.",
    "Stable keys retain the visible item and within-item pixel offset across prepends and reorders. Height changes of rows entirely above the viewport compensate the scroll offset. Following does not own unread counts or loading state.",
    "Keys are derived only when items or getKey change. Scrolling processes the window and at most one retained focused row, without rewalking 50,000 items. Data changes or measurements can still update the size cache.",
    "Focused rows remain mounted offscreen; actual removal returns focus to the viewport. aria-posinset/setsize express complete collection positions. Use ordinary collections or ScrollArea for search, printing, or complete assistive-technology traversal.",
    "The fixed demo's 48px rows, dynamic demo's 72px estimate, and viewport heights are consumer choices adjusted through itemSize/height. No library token was added.",
  ],
  decisions: "VirtualList 只拥有窗口、测量、阅读锚点与焦点连续性。集合、稳定 key、未读状态及是否跟随由消费项目决定；默认保持固定高度和手动滚动。", decisionsEn: "VirtualList owns windowing, measurement, reading anchors, and focus continuity. The consumer owns the collection, stable keys, unread state, and following policy; fixed heights and manual scrolling remain the defaults.",
  design: { methods: ["随境取度", "进退相承", "名实相符"], whenToUse: ["具有稳定身份的等高或动态高度长集合"], avoid: ["需要完整 DOM 的内容、业务表格"], composition: ["视口 + 总高空间 + 当前窗口/保留焦点项 + 可选应用滚动入口"], stateOwner: { library: ["窗口、测量、真实位置、阅读与焦点连续性"], application: ["集合、稳定 key、内容、估计尺寸、尾部跟随策略"] }, customization: ["itemSize / height / measurement / overscan / actionsRef / followEnd 与公开内容出口"] },
  designEn: { whenToUse: ["Long fixed or measured-height collections with stable identities."], avoid: ["Content requiring complete DOM, or business tables."], composition: ["Viewport + total-height space + current window/retained focused item + optional consumer scroll controls."], stateOwner: { library: ["Windowing, measurement, actual positions, and reading/focus continuity."], application: ["Collections, stable keys, content, estimated sizes, and following policy."] }, customization: ["itemSize / height / measurement / overscan / actionsRef / followEnd and public content composition."] },
} satisfies ComponentMeta;
