"use client";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { CornerMark } from "./corner-mark";
import { Popover, PopoverTrigger, PopoverPopup } from "./popover";
import { Tooltip, TooltipTrigger, TooltipPopup } from "./tooltip";
import { DisclosureIcon } from "../disclosure";
import { useUILocale } from "../locale";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import { cn } from "../utils";

export interface SidebarChangeDetails { event: React.MouseEvent; cancel(): void }
type SidebarState = {
  collapsed: boolean; /** 条目位于内嵌的二级面板里：左侧已有一条引导线。 */ nested?: boolean; contentId: string; defaultContentId: string; setContentId: React.Dispatch<React.SetStateAction<string>>;
  toggle: React.RefObject<HTMLButtonElement | null>; content: React.RefObject<HTMLElement | null>; contentFocused: React.RefObject<boolean>;
  change(event: React.MouseEvent): void;
};
const SidebarContext = React.createContext<SidebarState | null>(null);
function useSidebar() { const context = React.useContext(SidebarContext); if (!context) throw new Error("Sidebar parts require Sidebar."); return context; }
export type SidebarProps = useRender.ComponentProps<"aside"> & { collapsed?: boolean; defaultCollapsed?: boolean; onCollapsedChange?: (collapsed: boolean, details: SidebarChangeDetails) => void };
/**
 * 侧栏铺底纸色，当前项是一张纸（纸本色）：当前位置比四周更亮，读来是「这一页摊开在这里」；
 * 悬停是清墨。底纸写在侧栏自身，当前项的关系不依赖调用方放在哪里。收起是右上角的图标按钮。
 *
 * 「比四周更亮」只在侧栏的底比纸深时成立。当前项的面因此是一个角色（--qy-sidebar-current，
 * 默认纸本色），不写死在组件里：项目把 --qy-sidebar 调到接近纸色时，把它改为淡染
 * （--qy-surface-active）；库自己的浮层子级也是同一个入口（见 SidebarSubContent）。
 *
 * 当前项还有第二个线索：一段焦墨线（2026-10-10，使用方反馈「当前项只靠底色区分」）。
 * 纸本色与侧栏底的明度差很小，只靠面，低视力与强光下的读者认不出「我在哪」；
 * 做法取库里已有的导航线画法（nav-line.ts）：当前项把自己那一段线加深为焦墨，不加粗、不改字重。
 * 二级条目左侧本来就有引导线，当前项加深的就是那一段；一级条目没有线，线画在条目自己的起始边内侧。
 * 线宽 1px 与导航线相同；上下各让出一个条目圆角，不压到圆角上（这两个取值是预设）。
 *
 * 收起不是消失，是变成一列图标（rail）：宽度 = 一个填值控件高 + 两侧内缩（基础层 §2、§4），
 * 恰好等于收起按钮本身的宽度——rail 的列宽由已有的「图标形按钮」几何给出，不另造一套尺寸。
 * 宽度变化本身是真实几何变化，不是装饰动效，因此随 --qy-duration-base / --qy-ease-out 过渡；
 * 文字在同一次渲染里切到 sr-only（视觉隐藏、可访问名称仍在），不随宽度一起渐变，
 * 避免过渡途中出现换行或文字被压缩的跳动。
 */
export function Sidebar({ collapsed, defaultCollapsed = false, onCollapsedChange, render, className, ...props }: SidebarProps) {
  const [local, setLocal] = React.useState(defaultCollapsed); const current = collapsed ?? local; const defaultContentId = React.useId(); const [contentId, setContentId] = React.useState(defaultContentId); const toggle = React.useRef<HTMLButtonElement | null>(null); const content = React.useRef<HTMLElement | null>(null); const contentFocused = React.useRef(false);
  const context: SidebarState = { collapsed: current, contentId, defaultContentId, setContentId, toggle, content, contentFocused, change(event) { let canceled = false; onCollapsedChange?.(!current, { event, cancel() { canceled = true; } }); if (!canceled && collapsed === undefined) setLocal(!current); } };
  const element = useRender({ defaultTagName: "aside", render, props: mergeProps({ "data-slot": "sidebar", "data-collapsed": current, className: cn("flex min-w-0 max-w-full flex-col gap-(--qy-field-gap) overflow-x-hidden bg-sidebar text-body transition-[width,padding] duration-(--qy-duration-base) ease-(--qy-ease-out) motion-reduce:transition-none data-[collapsed=true]:w-[calc(var(--qy-fill-height)+2*var(--qy-overlay-inset))] data-[collapsed=true]:px-(--qy-overlay-inset)", className) }, props) });
  return <SidebarContext.Provider value={context}>{element}</SidebarContext.Provider>;
}
export type SidebarToggleProps = ButtonProps;
export function SidebarToggle({ children, ref, onClick, className, ...props }: SidebarToggleProps) {
  const context = useSidebar(); const { messages } = useUILocale();
  return <div data-slot="sidebar-toggle-row" className="flex justify-end"><Button data-slot="sidebar-toggle" variant="quiet" shape={children == null ? "icon" : "label"} aria-label={children == null ? (context.collapsed ? messages.expand : messages.collapse) : undefined} aria-expanded={!context.collapsed} aria-controls={context.contentId} {...props} className={cn("text-muted-foreground hover:text-foreground", className)} ref={node => { context.toggle.current = node; if (typeof ref === "function") { const cleanup = ref(node); if (typeof cleanup === "function") return () => { context.toggle.current = null; cleanup(); }; } else if (ref) ref.current = node; }} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) context.change(event); }}>{children ?? (context.collapsed ? <IconLayoutSidebarLeftExpand aria-hidden="true" /> : <IconLayoutSidebarLeftCollapse aria-hidden="true" />)}</Button></div>;
}
export type SidebarContentProps = useRender.ComponentProps<"nav">;
export function SidebarContent({ id, render, className, onFocusCapture, onBlurCapture, ref, ...props }: SidebarContentProps) {
  const context = useSidebar(); const actualId = id ?? context.defaultContentId;
  React.useLayoutEffect(() => { context.setContentId(actualId); }, [actualId, context.setContentId]);
  // 回退到 Toggle 的条件是「焦点所在之处收起后不可达」，不是「侧栏收起」本身——
  // rail 仍渲染同一个条目（只是换成图标），焦点留在原地才是进退相承：改变布局不打断正在
  // 发生的位置。两种情况算不可达：(1) 焦点原本落在一个二级面板（SidebarSubContent）里，
  // 该面板在 rail 下用原生 hidden 清零占位；(2) 焦点所在的控件本身在 rail 下换了实现
  // （如 SidebarSubTrigger 从 CollapsibleTrigger 换成 PopoverTrigger），浏览器会在它被
  // 卸载时把焦点清到 document.body——这种「焦点彻底丢失」同样需要交回 Toggle，而不是
  // 留在 body 上无声消失。
  React.useLayoutEffect(() => {
    if (!context.collapsed || !context.contentFocused.current) return;
    const node = context.content.current; const active = document.activeElement;
    const reachable = node && active instanceof HTMLElement && active !== document.body && node.contains(active) && active.closest("[hidden]") === null;
    if (!reachable) context.toggle.current?.focus();
    context.contentFocused.current = false;
  }, [context.collapsed, context.toggle, context.content, context.contentFocused]);
  return useRender({
    defaultTagName: "nav", render,
    ref: [context.content, ref ?? null],
    props: mergeProps({
      "data-slot": "sidebar-content", id: actualId,
      className: cn("grid min-w-0 content-start gap-(--qy-field-group-gap)", className),
      onFocusCapture(event: React.FocusEvent<HTMLElement>) { context.contentFocused.current = true; onFocusCapture?.(event); },
      onBlurCapture(event: React.FocusEvent<HTMLElement>) { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) context.contentFocused.current = false; onBlurCapture?.(event); },
    }, props),
  });
}
export type SidebarGroupProps = useRender.ComponentProps<"div">;
export function SidebarGroup({ render, className, ...props }: SidebarGroupProps) { return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "sidebar-group", className: cn("flex min-w-0 flex-col gap-0.5", className) }, props) }); }
export type SidebarGroupLabelProps = useRender.ComponentProps<"p">;
/**
 * rail 里只隐藏文字，不画分隔线：组间距（--qy-field-group-gap，约一材）本来就比组内间距
 * （gap-0.5）松十倍，疏密本身已经分得出组——删去检验：加一道线不会让分组更清楚，
 * 只是重复间距已经做到的事（NG12、疏密检验）。
 */
export function SidebarGroupLabel({ render, className, ...props }: SidebarGroupLabelProps) {
  const context = useSidebar();
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "sidebar-group-label", className: cn("m-0 flex min-w-0 items-center gap-(--qy-control-content-gap) px-(--qy-control-sm-padding) text-support text-muted-foreground wrap-anywhere", context.collapsed ? "sr-only" : "min-h-(--qy-fill-height)", className) }, props) });
}
export type SidebarLinkProps = useRender.ComponentProps<"a"> & { active?: boolean; icon?: React.ReactNode; count?: number; max?: number };
/**
 * icon 与 children（名称）分属两段：rail 下图标是唯一可见的识别物，名称切到 sr-only——
 * 可访问名称仍来自这段文字，不是新增 aria-label；悬停或聚焦时用 Tooltip 把名称重新摆出来，
 * Tooltip 只负责「让看得见的人也看到」，不改变名称本身（tooltip.tsx 的既有分工）。
 * 没有图标时收起也无物可认，这种条目不接 Tooltip。
 *
 * count 是同一个数字的两种摆法（随境取度，不是两件事）：展开态有一整行的空间，数字跟在
 * 名称后面、浓墨、等宽，是正文的一部分，直接进可访问名称；rail 态图标才是唯一能钉东西的
 * 角，数字换成 CornerMark 钉在图标右上角，CornerMark 自己的 label 走 messages.unreadCount，
 * 调用方不需要为同一个数字另写一遍无障碍文案。
 */
export function SidebarLink({ active = false, icon, count, max, render, className, children, ...props }: SidebarLinkProps) {
  const context = useSidebar();
  const { messages } = useUILocale();
  const frame = cn(
    "touch-target relative flex min-h-(--qy-fill-height) min-w-0 items-center gap-(--qy-control-content-gap) rounded-item text-body text-sidebar-foreground outline-none transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) [&_svg]:size-(--qy-control-md-icon) [&_svg]:shrink-0 not-aria-[current=page]:hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset",
    context.collapsed ? "justify-center px-0" : "px-(--qy-control-sm-padding)",
    active && "bg-sidebar-current text-sidebar-accent-foreground before:pointer-events-none before:absolute before:inset-y-(--qy-radius-item) before:w-px before:bg-foreground",
    // 二级条目加深的是面板引导线上自己那一段（位置与 SidebarSubContent 的引导线同一算式，换到条目自己的坐标）。
    active && (context.nested ? "before:inset-y-0 before:start-[calc(var(--qy-control-sm-padding)-var(--qy-control-md-icon)/2-var(--qy-control-content-gap))]" : "before:start-0"),
    className,
  );
  const hasCount = count !== undefined && count > 0;
  // rail 下底纸是 --qy-sidebar，不是 --qy-surface：角标贴着图标的纸色圈要换成实际承载面
  // （基础层 G9，库不猜父背景）；当前项另有自己的面（--qy-sidebar-current），圈色在那一种状态下会偏差，
  // 属于已知、可接受的边缘状态（当前项同时带未读数本身就是少见组合）。
  const hostedIcon = icon && hasCount && context.collapsed
    ? <CornerMark count={count!} {...(max !== undefined ? { max } : {})} label={messages.unreadCount(count!)} className="ring-(--qy-sidebar)">{icon}</CornerMark>
    : icon;
  const trailingCount = hasCount && !context.collapsed
    ? <span data-slot="sidebar-link-count" className="ms-auto shrink-0 ps-(--qy-control-content-gap) text-dense numeric text-muted-foreground">{count > (max ?? 99) ? `${max ?? 99}+` : count}</span>
    : null;
  const label = <span data-slot="sidebar-link-label" className={cn("min-w-0 flex-1 wrap-anywhere", context.collapsed && "sr-only")}>{children}</span>;
  const element = useRender({ defaultTagName: "a", render, props: mergeProps({ "data-slot": "sidebar-link", "aria-current": active ? "page" : undefined, className: frame, children: <>{hostedIcon}{label}{trailingCount}</> }, props) });
  if (!icon) return element;
  // Tooltip 包装始终挂载，只用 disabled 切换是否可开，不随 collapsed 整段换 DOM 结构——
  // 展开态文字已经可见，提示没有新信息（NG1），所以只在收起时允许打开；但如果直接按
  // collapsed 切换成「有 Tooltip / 没有 Tooltip」两种不同的元素树，React 会在收起的瞬间
  // 把这个链接当成新节点重新挂载，焦点随之丢失——这正是「随境取度」要避免的布局跳动。
  // 收起时名称只在这里出现，它不是辅助说明，而是被收起的名字本身：立即出现，与二级导航的浮层同样不等待。
  return <Tooltip><TooltipTrigger disabled={!context.collapsed} delay={0} closeDelay={0} render={element} /><TooltipPopup side="right">{children}</TooltipPopup></Tooltip>;
}

const SidebarSubLabelContext = React.createContext<React.ReactNode>(null);
export type SidebarSubTriggerProps = CollapsiblePrimitive.Trigger.Props & { icon?: React.ReactNode };
export type SidebarSubProps = Omit<CollapsiblePrimitive.Root.Props, "children"> & { children: React.ReactNode };
/**
 * 二级导航：展开态用内嵌的 Collapsible 面板；rail 态没有宽度展开，换成 Popover 弹出同一组子级
 * （选 Popover 不选 Menu：子级是真实链接要去的地方，不是要执行的命令，Menu 的 role="menu" 只接受
 * menuitem 一类子项，用在导航链接上名实不符——design.md「名实相符」、「Menu 执行命令，Select
 * 选择值」的既有区分同样适用于这里）。两种形态共用同一个 open 状态，由 CollapsiblePrimitive.Root
 * 持有；rail 下即使视觉上换成了 Popover，用户对「这组展没展开」的记忆不因收起/展开侧栏而改变。
 */
export function SidebarSub({ className, children, ...props }: SidebarSubProps) {
  let label: React.ReactNode = null;
  React.Children.forEach(children, child => { if (React.isValidElement(child) && child.type === SidebarSubTrigger) label = (child.props as SidebarSubTriggerProps).children; });
  return <SidebarSubLabelContext.Provider value={label}>
    <Popover>
      <CollapsiblePrimitive.Root data-slot="sidebar-sub" {...props} className={state => cn("group/sub min-w-0", typeof className === "function" ? className(state) : className)}>
        {children}
      </CollapsiblePrimitive.Root>
    </Popover>
  </SidebarSubLabelContext.Provider>;
}
/**
 * 展开态复用骨法用笔的箭头画法（DisclosureIcon），不复用 disclosureTriggerClassName——那是
 * 贴着内容左缘的行内文字触发器，没有图标位、没有整行悬停；侧栏的二级入口要和 SidebarLink
 * 同一行高、同一命中区、同一悬停面，所以外框另写，只借展开箭头这一处共同画法。
 * rail 态完全换一套：按钮不再承担内嵌展开（否则收起侧栏会悄悄改变用户没点开过的展开记忆），
 * 只作为 Popover 的入口，悬停或聚焦都能打开；子级是否已经选中由 group-has 读取面板里的
 * aria-current，不需要再查一次 open 状态。
 */
export function SidebarSubTrigger({ icon, className, children, ...props }: SidebarSubTriggerProps) {
  const context = useSidebar();
  const frame = cn(
    "group/disclosure touch-target flex w-full min-h-(--qy-fill-height) min-w-0 cursor-pointer items-center gap-(--qy-control-content-gap) rounded-item text-body text-sidebar-foreground outline-none transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) [&_svg]:size-(--qy-control-md-icon) [&_svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset group-has-[[aria-current=page]]/sub:text-sidebar-accent-foreground",
    context.collapsed ? "justify-center px-0" : "px-(--qy-control-sm-padding)",
    className,
  );
  const label = <span data-slot="sidebar-sub-trigger-label" className={cn("min-w-0 flex-1 text-start wrap-anywhere", context.collapsed && "sr-only")}>{children}</span>;
  if (context.collapsed) return <PopoverTrigger data-slot="sidebar-sub-trigger" openOnHover delay={0} closeDelay={0} render={<button type="button" />} className={frame}>{icon}{label}</PopoverTrigger>;
  return <CollapsiblePrimitive.Trigger data-slot="sidebar-sub-trigger" {...props} className={frame}>{icon}{label}<DisclosureIcon /></CollapsiblePrimitive.Trigger>;
}
export type SidebarSubContentProps = CollapsiblePrimitive.Panel.Props;
// 子项文字与父项文字同一条竖线（§19）：父项文字起点 = 左内缩 + 图标 + 控件内间隔；子项自己也带左内缩，
// 所以面板只缩进「图标 + 控件内间隔」，子项的框从父项图标之后开始，文字落在父项文字之下。
const subIndent = "ps-[calc(var(--qy-control-md-icon)+var(--qy-control-content-gap))]";
export function SidebarSubContent({ className, children, ...props }: SidebarSubContentProps) {
  const context = useSidebar();
  const label = React.useContext(SidebarSubLabelContext);
  // 浮层本身就是「有空间显示文字」的地方：子级在这里不再是 rail 条目，名称要正常可见，
  // 不能继承外层 collapsed=true 继续把文字切成 sr-only——那会让弹出的子级看起来空白一片。
  const overlayContext = React.useMemo(() => ({ ...context, collapsed: false, nested: false }), [context]);
  const nestedContext = React.useMemo(() => ({ ...context, nested: true }), [context]);
  return <>
    {/* 面板始终挂载（keepMounted）：:has([aria-current=page]) 要在 rail 下也能读到子级是否
     *  选中，而 :has() 只认 DOM 是否存在、不认是否可见。这里用的是外面另包的一层 div 的
     *  原生 hidden（不是 Collapsible 自己管理的那个），二者各管各的：Collapsible 的 hidden
     *  表达「用户没展开」，这层 hidden 表达「rail 没有宽度摆它」；同一个焦点元素一旦落入
     *  原生 hidden 的子树，SidebarContent 的回退逻辑才需要把焦点交回 Toggle。 */}
    <div hidden={context.collapsed || undefined} className="min-w-0">
      <CollapsiblePrimitive.Panel data-slot="sidebar-sub-content" keepMounted {...props} className={state => cn("relative grid min-w-0 gap-0.5 text-body wrap-anywhere [&[hidden]:not([hidden=until-found])]:hidden", subIndent, typeof className === "function" ? className(state) : className)}>
        {/* 引导竖线：同一 SidebarGroup 里可能有几个 SidebarSub 前后相邻，缩进本身对每一级都
         *  一样深，无法区分「这几行属于上面哪一个父项」；面划不出这层边界，补一条清墨线
         *  （骨法用笔：线只在面无法划出范围时出现）。线的位置是父项图标的几何中心，
         *  从子级看是正上方那枚图标的延伸。 */}
        <span aria-hidden="true" className="absolute inset-y-0 start-[calc(var(--qy-control-sm-padding)+var(--qy-control-md-icon)/2)] w-px bg-border" />
        <SidebarContext.Provider value={nestedContext}>{children}</SidebarContext.Provider>
      </CollapsiblePrimitive.Panel>
    </div>
    {context.collapsed && (
      <PopoverPopup
        side="right" align="start" sideOffset={4}
        viewportProps={{ className: "grid min-w-0 gap-0.5 p-(--qy-overlay-inset)" }}
        // 浮层的承载面是 surface-raised（纸色）：纸色的当前项在这里与底同色，换成淡染（基础层 §6、§10）。
        className="min-w-[calc(8*var(--qy-cai))] [--qy-sidebar-current:var(--qy-surface-active)]"
      >
        {/* 浮层里没有行气之外的空间重复父项名称，但图标本身不认字——保留一行浓墨小标题，
         *  删去检验：去掉它，读者分不清这组链接属于哪一个父项。 */}
        {label && <p className="m-0 min-w-0 px-(--qy-control-sm-padding) pt-(--qy-space-1) pb-(--qy-space-1) text-caption text-muted-foreground wrap-anywhere">{label}</p>}
        <SidebarContext.Provider value={overlayContext}>{children}</SidebarContext.Provider>
      </PopoverPopup>
    )}
  </>;
}
