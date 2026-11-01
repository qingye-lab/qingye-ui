"use client";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import { Button, type ButtonProps } from "./button";
import { CornerMark } from "./corner-mark";
import { Popover, PopoverTrigger, PopoverPopup } from "./popover";
import { Tooltip, TooltipTrigger, TooltipPopup } from "./tooltip";
import { useUILocale } from "../locale";
import { IconChevronRight, IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "../utils";
import { hostSidebarDrawer, openSidebarDrawer, useSidebarDrawerOpen, useWorkspaceSidebarHandle, type SidebarDrawerHandle } from "../sidebar-handle";
import type { SidebarDrawerHostProps } from "../sidebar-drawer";

export { createSidebarDrawerHandle, type SidebarDrawerHandle } from "../sidebar-handle";

// 抽屉宿主只在窄屏用得到，按需加载（见 sidebar-drawer.tsx）。取到后记在模块里，之后挂上来的侧栏直接用。
// 取不到（离线、发版后旧页面引用的文件名已失效）时不能让外壳崩掉：这一次打开作罢、抽屉关上，下次按下再取。
// 不用 React.lazy：它记住失败，取不到一次就再也取不到。
type DrawerHost = React.ComponentType<SidebarDrawerHostProps>;
let drawerHost: DrawerHost | null = null; let drawerHostLoading: Promise<DrawerHost> | null = null;
function loadDrawerHost() {
  return drawerHostLoading ??= import("../sidebar-drawer").then(module => drawerHost = module.default, error => { drawerHostLoading = null; throw error; });
}

export interface SidebarChangeDetails { event: React.MouseEvent; cancel(): void }
type SidebarState = {
  collapsed: boolean; contentId: string; defaultContentId: string; setContentId: React.Dispatch<React.SetStateAction<string>>;
  toggle: React.RefObject<HTMLButtonElement | null>; content: React.RefObject<HTMLElement | null>; contentFocused: React.RefObject<boolean>;
  change(event: React.MouseEvent): void;
  /** 侧栏正承载在窄屏抽屉里（见 Sidebar 的 drawer）：永远展开，收起按钮换成关闭，点去往新页面的条目后关闭抽屉。 */
  inDrawer: boolean; closeDrawer: (() => void) | null;
};
const SidebarContext = React.createContext<SidebarState | null>(null);
/** 是否位于展开态二级面板的引导线之内；条目据此让出与引导线的间隔（见 SidebarSubContent）。 */
const InSubPanel = React.createContext(false);
/** 面板之上的父项是否带图标：引导线从图标中心垂下，没有图标时从父项文字的起笔垂下（见 SidebarSubContent）。 */
const SubTriggerHasIcon = React.createContext(true);
/** 引导线之内的条目：左内缩 = 半个图标 − 线宽，文字仍落在父项文字之下（推导见 SidebarSubContent）。 */
const subItemPadding = "ps-[calc(var(--qy-control-md-icon)/2-var(--qy-line-width))] pe-(--qy-control-sm-padding)";
/** 已在某个 SidebarSub 之内：侧栏最多两级，再出现 SidebarSub 即第三级（见 SidebarSub）。 */
const InSubTree = React.createContext(false);
function useSidebar() { const context = React.useContext(SidebarContext); if (!context) throw new Error("Sidebar parts require Sidebar."); return context; }
export type SidebarProps = useRender.ComponentProps<"div"> & {
  collapsed?: boolean; defaultCollapsed?: boolean; onCollapsedChange?: (collapsed: boolean, details: SidebarChangeDetails) => void;
  /**
   * 窄屏（< 40rem，与全库同一个点）把侧栏收进一个从起始侧滑出的抽屉，由 SidebarDrawerTrigger 打开；更宽时仍是原位的侧栏。
   * 断点固定、不开放配置（用户裁决 2026-10-31）：SidebarDrawerTrigger 的 sm:hidden 与它是同一个点。
   * 40rem 以上一律是原位侧栏，库不按宽度自动收起；中等宽度要不要收成 rail 由应用用 collapsed / defaultCollapsed 决定。
   * 抽屉里就是同一份 children：当前项照常标出，点去往新页面的条目后抽屉关闭。服务端渲染按「够宽」输出，窄屏客户端挂载后换成抽屉。
   */
  drawer?: boolean;
  /** 抽屉与它的触发按钮之间的关联。在 Workspace 里省略即可（外壳持有一个）；不在 Workspace 里时，用 createSidebarDrawerHandle() 创建并同时交给 SidebarDrawerTrigger。 */
  drawerHandle?: SidebarDrawerHandle;
};
/**
 * 侧栏铺底纸色，悬停与当前项是叠在这张底上的两级墨面（用户裁决 2026-10-30，推翻 2026-10-12 的
 * 「悬停 = 选中同一级」与「当前项不改字重」）：
 * - 悬停：--qy-sidebar-accent（全库悬停面，一级清染），字加深到焦墨；
 * - 当前：--qy-sidebar-current（一级清墨，比悬停深一级），字为焦墨并加到中等字重。
 * 此前两者同为一级清染、字同为焦墨：指针停在哪一行，那一行就和当前项一模一样，读者分不清「我在哪」和
 * 「我要去哪」。导航列表的首要任务是回答「我在哪」，所以当前项要同时在两个通道上胜过悬停：面更深一级，
 * 字更重一档。字重是不靠颜色的第二信号——一级清墨的面与底的对比远不到非文字对比的 3:1，
 * 只靠面，弱视或低质量屏幕上的读者可能认不出当前项（WCAG 1.4.1 / 1.4.11 的用意）。
 * 这与 GitHub Primer NavList、Fluent 导航、Linear 等主流导航的做法一致：悬停浅、当前深，当前另有非颜色信号。
 * 字重变化只发生在导航跳转时（当前项换了一行），不在悬停时，所以不会出现指针扫过时文字宽度跳动。
 * 底纸写在侧栏自身，当前项的关系不依赖调用方放在哪里。收起是右上角的图标按钮。
 *
 * 当前项的面因此是一个角色（--qy-sidebar-current，选中面的别名），不写死在组件里，也不随承载面改写：
 * 项目把 --qy-sidebar 调到任何面上，叠合都成立；库自己的浮层子级也是同一个入口（见 SidebarSubContent），
 * 不再局部改写。此前默认取纸本色（要「比四周更亮」）、近纸色时让项目改写，已被这条关系取代。
 *
 * 当前项只由这张面标出，不再画线（用户裁决 2026-10-12，推翻 2026-10-10 加的那段焦墨线）。
 * 骨法用笔：一个范围只用一种边界机制——当前项的范围已经由圆角的填充面划出，线与面叠加是
 * 同一范围的重复表达。用户的规则是：直的墨线与圆角的填充面不在同一个条目上并用；只用线（Toc、Tabs）可以，
 * 只用圆角填充面（侧栏当前项）也可以。
 * 二级条目左侧本来就有 SidebarSubContent 的引导线，那条线表达「这几行属于哪个父项」，
 * 当前项不再加深它。
 *
 * 收起不是消失，是变成一列图标（rail）：宽度 = 一个填值控件高 + 两侧内缩（基础层 §2、§4），
 * 恰好等于收起按钮本身的宽度——rail 的列宽由已有的「图标形按钮」几何给出，不另造一套尺寸。
 * 宽度变化本身是真实几何变化，不是装饰动效，因此随 --qy-duration-base / --qy-ease-out 过渡；
 * 文字在同一次渲染里切到 sr-only（视觉隐藏、可访问名称仍在），不随宽度一起渐变，
 * 避免过渡途中出现换行或文字被压缩的跳动。
 */
export function Sidebar({ collapsed, defaultCollapsed = false, onCollapsedChange, drawer = false, drawerHandle, render, className, ...props }: SidebarProps) {
  const [local, setLocal] = React.useState(defaultCollapsed); const defaultContentId = React.useId(); const [contentId, setContentId] = React.useState(defaultContentId); const toggle = React.useRef<HTMLButtonElement | null>(null); const content = React.useRef<HTMLElement | null>(null); const contentFocused = React.useRef(false);
  const narrow = useMediaQuery("max-sm"); const workspaceHandle = useWorkspaceSidebarHandle(); const handle = drawerHandle ?? workspaceHandle;
  const inDrawer = drawer && narrow; const [drawerOpen, setDrawerOpen] = useSidebarDrawerOpen(drawer ? handle : null);
  const [Host, setHost] = React.useState(() => drawerHost);
  // 变窄就开始取，不等按下；取不到就关上，开着（又按了一次）时再取。
  React.useEffect(() => {
    if (!inDrawer || Host) return; let live = true;
    loadDrawerHost().then(host => { if (live) setHost(() => host); }, () => { if (live) setDrawerOpen(false); });
    return () => { live = false; };
  }, [inDrawer, Host, drawerOpen, setDrawerOpen]);
  // 正在承接抽屉期间登记在 handle 上：没有承接者时按钮按下不算数；变宽或卸载即撤下登记，抽屉随之关上，
  // 下次再变窄或换一个侧栏挂上来时不会带着旧的「开」自己弹出来（见 sidebar-handle.ts）。
  React.useEffect(() => inDrawer && handle ? hostSidebarDrawer(handle) : undefined, [inDrawer, handle]);
  if (drawer && !handle) throw new Error("Sidebar drawer requires a Workspace ancestor or a drawerHandle shared with SidebarDrawerTrigger.");
  // 抽屉里没有「收起成 rail」这回事：宽度由抽屉给，永远展开。
  const current = inDrawer ? false : collapsed ?? local;
  const context: SidebarState = {
    collapsed: current, contentId, defaultContentId, setContentId, toggle, content, contentFocused,
    inDrawer, closeDrawer: inDrawer ? () => setDrawerOpen(false) : null,
    change(event) { let canceled = false; onCollapsedChange?.(!current, { event, cancel() { canceled = true; } }); if (!canceled && collapsed === undefined) setLocal(!current); },
  };
  // 外层是不产生地标的 div：侧栏里的导航由 SidebarNav 的 <nav>（带名称）作地标；再包一层 <aside> 会让读屏的地标表多出
  // 一个无名的「补充内容」，而主导航不是页面的补充内容（ARIA complementary 的定义）。确是附属内容时用 render={<aside aria-label=… />}。
  const element = useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "sidebar", "data-collapsed": current, className: cn("flex w-(--qy-sidebar-width) min-w-0 max-w-full flex-col gap-(--qy-field-gap) overflow-x-hidden bg-sidebar text-body transition-[width,padding] duration-(--qy-duration-base) ease-(--qy-ease-out) motion-reduce:transition-none data-[collapsed=true]:w-[calc(var(--qy-fill-height)+2*var(--qy-overlay-inset))] data-[collapsed=true]:px-(--qy-overlay-inset)", inDrawer && "bg-transparent", className) }, props) });
  const sidebar = <SidebarContext.Provider value={context}>{element}</SidebarContext.Provider>;
  if (!inDrawer) return sidebar;
  // 取到之前没有可见内容要占位：按下的「开」已记在 handle 上，宿主到位时直接以打开状态出现。
  return Host && <Host handle={handle!} open={drawerOpen} onOpenChange={setDrawerOpen}>{sidebar}</Host>;
}
/**
 * 窄屏打开侧栏抽屉的按钮：一枚有名称的图标按钮（名称 messages.sidebarOpen），aria-haspopup="dialog"，aria-expanded 读抽屉的开合。
 * 放在 Workspace 里任何位置（通常是 WorkspaceHeader 的第一项）即可找到外壳持有的抽屉；不在 Workspace 里时传入与 Sidebar 相同的 handle。
 * 宽屏侧栏就在原位，按钮用 sm:hidden 隐去（与 Sidebar 的窄屏断点同一个点），不占位也不进 Tab 顺序。
 * 它是普通按钮而不是 Base UI 的抽屉触发器：首屏不引入抽屉代码（见 sidebar-handle.ts）。
 */
export type SidebarDrawerTriggerProps = ButtonProps & { handle?: SidebarDrawerHandle };
export function SidebarDrawerTrigger({ handle, className, children, onClick, ref, ...props }: SidebarDrawerTriggerProps) {
  const { messages } = useUILocale(); const workspaceHandle = useWorkspaceSidebarHandle(); const actual = handle ?? workspaceHandle;
  if (!actual) throw new Error("SidebarDrawerTrigger requires a Workspace ancestor or a handle shared with Sidebar.");
  const [open] = useSidebarDrawerOpen(actual);
  return <Button data-slot="sidebar-drawer-trigger" variant="quiet" shape="icon" aria-label={messages.sidebarOpen} aria-haspopup="dialog" aria-expanded={open} data-popup-open={open ? "" : undefined} {...props}
    ref={ref}
    onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) openSidebarDrawer(actual, event.currentTarget); }}
    className={cn("sm:hidden", className)}>{children ?? <IconMenu2 aria-hidden="true" className="rtl:-scale-x-100" />}</Button>;
}
export type SidebarToggleProps = ButtonProps;
// 无 children 时名称固定为 messages.sidebar，展开/收起只由 aria-expanded 表达（ARIA disclosure）：状态不读两遍。
export function SidebarToggle({ children, ref, onClick, className, ...props }: SidebarToggleProps) {
  const context = useSidebar(); const { messages } = useUILocale();
  // 抽屉里没有可收起的 rail：这一格换成关闭，位置与名称（messages.close）都是关闭抽屉的通行写法。
  // 抽屉是受控的，关闭就是把 Sidebar 持有的开合状态置为关，不需要抽屉自己的 Close 部件。
  if (context.inDrawer) return <div data-slot="sidebar-toggle-row" className="flex justify-end"><Button data-slot="sidebar-toggle" variant="quiet" shape="icon" aria-label={messages.close} {...props} className={cn("text-muted-foreground hover:text-foreground", className)} ref={ref} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) context.closeDrawer?.(); }}>{children ?? <IconX aria-hidden="true" />}</Button></div>;
  return <div data-slot="sidebar-toggle-row" className="flex justify-end"><Button data-slot="sidebar-toggle" variant="quiet" shape={children == null ? "icon" : "label"} aria-label={children == null ? messages.sidebar : undefined} aria-expanded={!context.collapsed} aria-controls={context.contentId} {...props} className={cn("text-muted-foreground hover:text-foreground", className)} ref={node => { context.toggle.current = node; if (typeof ref === "function") { const cleanup = ref(node); if (typeof cleanup === "function") return () => { context.toggle.current = null; cleanup(); }; } else if (ref) ref.current = node; }} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) context.change(event); }}>{children ?? (context.collapsed ? <IconLayoutSidebarLeftExpand aria-hidden="true" className="rtl:-scale-x-100" /> : <IconLayoutSidebarLeftCollapse aria-hidden="true" className="rtl:-scale-x-100" />)}</Button></div>;
}
export type SidebarHeaderProps = useRender.ComponentProps<"div">;
/**
 * 侧栏的第一行：这是谁的——身份在前，收起按钮在后。展开时一行：高度 = 一个填值控件高，
 * 与下面的链接行同高，起始内缩 = 链接的起始内缩（--qy-control-sm-padding），于是身份落在
 * 链接文字所在的同一条竖线上（基础层 §19）；身份与按钮的间隔取字段内间隔。收起成 rail 时一行
 * 放不下两个东西（rail 宽度恰好是一个按钮），改为上下叠放并居中，间隔不变。
 * SidebarToggle 自带一层 justify-end 的行容器：展开时用 ms-auto 把它推到末端，
 * 不让它拉伸身份；SidebarToggle 单独使用时的行为不变。
 */
export function SidebarHeader({ render, className, ...props }: SidebarHeaderProps) {
  const context = useSidebar();
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "sidebar-header", className: cn(context.collapsed ? "grid justify-items-center gap-(--qy-field-gap)" : "flex min-h-(--qy-fill-height) min-w-0 items-center gap-(--qy-field-gap) ps-(--qy-control-sm-padding) [&>[data-slot=sidebar-toggle-row]]:ms-auto", className) }, props) });
}
export type SidebarTitleProps = useRender.ComponentProps<"span">;
/**
 * 页头里的名称：占满身份与按钮之间的余地，放不下时截断（名称在别处还会出现，截断不丢信息）。
 * 收起时切到 sr-only——与 SidebarGroupLabel、链接名称同一机制：视觉隐藏，可访问名称仍在。
 */
export function SidebarTitle({ render, className, ...props }: SidebarTitleProps) {
  const context = useSidebar();
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "sidebar-title", className: cn(context.collapsed ? "sr-only" : "min-w-0 flex-1 truncate text-body-strong", className) }, props) });
}
export type SidebarContentProps = useRender.ComponentProps<"nav">;
export function SidebarContent({ id, render, className, onFocusCapture, onBlurCapture, ref, ...props }: SidebarContentProps) {
  const context = useSidebar(); const { messages } = useUILocale(); const actualId = id ?? context.defaultContentId;
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
      // 调用方没给名称（aria-label / aria-labelledby 都没有）时用默认名称，否则多个 nav 无从区分。
      ...(props["aria-label"] === undefined && props["aria-labelledby"] === undefined ? { "aria-label": messages.sidebar } : {}),
      className: cn("grid min-w-0 content-start gap-(--qy-field-group-gap)", className),
      onFocusCapture(event: React.FocusEvent<HTMLElement>) { context.contentFocused.current = true; onFocusCapture?.(event); },
      onBlurCapture(event: React.FocusEvent<HTMLElement>) { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) context.contentFocused.current = false; onBlurCapture?.(event); },
    }, props),
  });
}
/** 组把自己的标签 id 交给 SidebarGroupLabel 登记；有标签才有分组语义（见 SidebarGroup）。 */
const GroupLabelContext = React.createContext<React.Dispatch<React.SetStateAction<string | null>> | null>(null);
export type SidebarGroupProps = useRender.ComponentProps<"div">;
/**
 * 带标签的分组是一个 `role="group"`，名称由 `aria-labelledby` 指向 SidebarGroupLabel：读屏进入这组链接时听到
 * 「导航 分组」，而不是一串没有归属的链接（名实相符：视觉上由标签与疏密成组，结构上也要成组）。
 * 没有标签的分组只是排布，不加角色——一个没有名称的 group 对辅助技术没有信息。标签登记发生在提交之后，
 * 服务端 HTML 里先没有角色。调用方自己给了 aria-label 或 aria-labelledby 时名称以调用方为准（角色仍是 group）；
 * render 成 ul 一类自带角色的元素时，group 会盖过原生语义，需要保留列表时由调用方自己传 role。
 */
export function SidebarGroup({ render, className, ...props }: SidebarGroupProps) {
  const [labelId, setLabelId] = React.useState<string | null>(null);
  const named = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;
  const element = useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "sidebar-group", ...(labelId || named ? { role: "group" } : {}), ...(labelId && !named ? { "aria-labelledby": labelId } : {}), className: cn("flex min-w-0 flex-col gap-fen-half", className) }, props) });
  return <GroupLabelContext.Provider value={setLabelId}>{element}</GroupLabelContext.Provider>;
}
export type SidebarFooterProps = useRender.ComponentProps<"div">;
/**
 * 侧栏的末位：我是谁、我的命令。mt-auto 把它推到列底（内容多少都贴底，不靠调用方量高度）；
 * 其中的条目与 SidebarGroup 同属一组，组内间隔相同（gap-fen-half）。条目用 SidebarLink 即可，
 * 收起时同样只剩图标、名称切到 sr-only。
 */
export function SidebarFooter({ render, className, ...props }: SidebarFooterProps) { return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "sidebar-footer", className: cn("mt-auto grid min-w-0 gap-fen-half", className) }, props) }); }
export type SidebarGroupLabelProps = useRender.ComponentProps<"p">;
/**
 * rail 里只隐藏文字，不画分隔线：组间距（--qy-field-group-gap，约一材）本来就比组内间距
 * （gap-fen-half）松十倍，疏密本身已经分得出组——删去检验：加一道线不会让分组更清楚，
 * 只是重复间距已经做到的事（NG12、疏密检验）。
 */
export function SidebarGroupLabel({ id, render, className, ...props }: SidebarGroupLabelProps) {
  const context = useSidebar();
  const generatedId = React.useId(); const actualId = id ?? generatedId; const setLabelId = React.useContext(GroupLabelContext);
  React.useLayoutEffect(() => { setLabelId?.(actualId); return () => setLabelId?.(current => current === actualId ? null : current); }, [actualId, setLabelId]);
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "sidebar-group-label", id: actualId, className: cn("m-0 flex min-w-0 items-center gap-(--qy-control-content-gap) px-(--qy-control-sm-padding) text-support text-muted-foreground wrap-anywhere", context.collapsed ? "sr-only" : "min-h-(--qy-fill-height)", className) }, props) });
}
type SidebarItemExtras = { icon?: React.ReactNode; count?: number; max?: number };
export type SidebarLinkProps = useRender.ComponentProps<"a"> & SidebarItemExtras & { active?: boolean };
/** 不跳转页面的条目：与 SidebarLink 同一外观，没有 active / aria-current（见 SidebarButton）。 */
export type SidebarButtonProps = useRender.ComponentProps<"button"> & SidebarItemExtras;
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
export function SidebarLink({ active = false, ...props }: SidebarLinkProps) { return useSidebarItem("a", active, props); }
/**
 * 条目的另一种形态：点它是做一件事（打开账户菜单、搜索），不是去往一个页面。原生 `<button type="button">`，
 * 外观、收起态（rail 只剩图标、名称切到 sr-only 并以 Tooltip 摆出）、count 与 SidebarLink 完全相同——两者共用同一段实现；
 * 差别只在语义：没有 `active`，也不写 `aria-current`（「当前页」只属于链接）。部位名仍是 `sidebar-link`（同一个条目部位，
 * 强制颜色下的禁用态等样式规则按这个名字写；button 与 a 的区别由元素本身和 type 表达）。
 *
 * 作为触发器时 `render={<SidebarButton … />}` 交给 MenuTrigger / PopoverTrigger，ref 与触发器给的全部属性
 * （aria-expanded、aria-haspopup、onClick）都落到这个 button 上；名称写在触发器的 children。
 * 在抽屉里它沿用 SidebarLink 的规则：触发浮层的（带 aria-haspopup）不关抽屉，其余点击后关闭，要留着用 preventBaseUIHandler。
 */
export function SidebarButton(props: SidebarButtonProps) { return useSidebarItem("button", false, props); }
function useSidebarItem(
  tag: "a" | "button", active: boolean,
  { icon, count, max, render, className, children, ...props }: (SidebarLinkProps | SidebarButtonProps) & SidebarItemExtras,
) {
  const context = useSidebar();
  const inSub = React.useContext(InSubPanel);
  const { messages } = useUILocale();
  // 粗指针下行高升到 --qy-touch-target：纵排的行之间只隔 gap-fen-half，touch-target 的命中层若靠外扩补高会盖住上下邻行
  // （STANDARDS §2）；行本身够高后它只剩横向外扩，补足 rail 态窄于 44 的图标。SidebarSubTrigger 同理。
  const frame = cn(
    "touch-target relative flex min-h-(--qy-fill-height) pointer-coarse:min-h-(--qy-touch-target) min-w-0 items-center gap-(--qy-control-content-gap) rounded-item text-start text-body text-sidebar-foreground outline-none transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) [&_svg]:size-(--qy-control-md-icon) [&_svg]:shrink-0 not-aria-[current=page]:hover:bg-sidebar-accent not-aria-[current=page]:hover:text-sidebar-accent-foreground focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset",
    context.collapsed ? "justify-center px-0" : inSub ? subItemPadding : "px-(--qy-control-sm-padding)",
    active && "bg-sidebar-current font-medium text-sidebar-current-foreground",
    className,
  );
  const hasCount = count !== undefined && count > 0;
  // rail 下底纸是 --qy-sidebar，不是 --qy-surface：角标贴着图标的纸色圈要换成实际承载面
  // （基础层 G9，库不猜父背景）；当前项另有自己的面（--qy-sidebar-current，叠在底上的选中面），圈色在那一种状态下会偏差，
  // 属于已知、可接受的边缘状态（当前项同时带未读数本身就是少见组合）。
  const hostedIcon = icon && hasCount && context.collapsed
    ? <CornerMark count={count!} {...(max !== undefined ? { max } : {})} label={messages.unreadCount(count!)} className="ring-(--qy-sidebar)">{icon}</CornerMark>
    : icon;
  const trailingCount = hasCount && !context.collapsed
    ? <span data-slot="sidebar-link-count" className="ms-auto shrink-0 ps-(--qy-control-content-gap) text-dense numeric text-muted-foreground">{count > (max ?? 99) ? `${max ?? 99}+` : count}</span>
    : null;
  const label = <span data-slot="sidebar-link-label" className={cn("min-w-0 flex-1 wrap-anywhere", context.collapsed && "sr-only")}>{children}</span>;
  // 抽屉里点了去往新页面的条目就关闭抽屉（客户端路由的链接常会 preventDefault 再自行跳转，所以不看 defaultPrevented；调用方要留着抽屉，用 preventBaseUIHandler）；条目若是浮层的触发器（如账户菜单，带 aria-haspopup），点它是为了打开浮层，不关。
  const closeDrawer = context.closeDrawer && props["aria-haspopup"] === undefined ? context.closeDrawer : null;
  const element = useRender({ defaultTagName: tag, render, props: mergeProps({ "data-slot": "sidebar-link", ...(tag === "button" ? { type: "button" } : { "aria-current": active ? "page" : undefined }), className: frame, children: <>{hostedIcon}{label}{trailingCount}</>, onClick(event: React.MouseEvent<HTMLElement> & { baseUIHandlerPrevented?: boolean }) { if (!event.baseUIHandlerPrevented) closeDrawer?.(); } }, props) });
  if (!icon) return element;
  // Tooltip 包装始终挂载，只用 disabled 切换是否可开，不随 collapsed 整段换 DOM 结构——
  // 展开态文字已经可见，提示没有新信息（NG1），所以只在收起时允许打开；但如果直接按
  // collapsed 切换成「有 Tooltip / 没有 Tooltip」两种不同的元素树，React 会在收起的瞬间
  // 把这个链接当成新节点重新挂载，焦点随之丢失——这正是「随境取度」要避免的布局跳动。
  // 收起时名称只在这里出现，它不是辅助说明，而是被收起的名字本身：立即出现，与二级导航的浮层同样不等待。
  return <Tooltip><TooltipTrigger disabled={!context.collapsed} delay={0} closeDelay={0} render={element} /><TooltipPopup side="inline-end">{children}</TooltipPopup></Tooltip>;
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
  // 侧栏到二级为止（见上）：SidebarSub 里再放 SidebarSub 就是第三级。与本库其他结构契约一致（缺名称、缺祖先、折叠项不是链接都抛错），开发期就抛，而不是悄悄多缩进一层。
  if (React.useContext(InSubTree)) throw new Error("Sidebar has at most two levels: SidebarSub cannot be nested inside another SidebarSub. Put the third level in the page (Tabs or a secondary nav).");
  let label: React.ReactNode = null; let hasIcon = false;
  React.Children.forEach(children, child => { if (React.isValidElement(child) && child.type === SidebarSubTrigger) { const props = child.props as SidebarSubTriggerProps; label = props.children; hasIcon = props.icon != null; } });
  return <SidebarSubLabelContext.Provider value={label}><SubTriggerHasIcon.Provider value={hasIcon}><InSubTree.Provider value={true}>
    <Popover>
      <CollapsiblePrimitive.Root data-slot="sidebar-sub" {...props} className={state => cn("group/sub min-w-0", typeof className === "function" ? className(state) : className)}>
        {children}
      </CollapsiblePrimitive.Root>
    </Popover>
  </InSubTree.Provider></SubTriggerHasIcon.Provider></SidebarSubLabelContext.Provider>;
}
/**
 * 外框与 SidebarLink 同一行高、同一命中区、同一悬停面（不复用 disclosureTriggerClassName——那是
 * 贴着内容左缘的行内文字触发器，没有图标位）。
 *
 * 展开记号用层级的画法，不用 DisclosureIcon（用户裁决 2026-10-30）：二级是「这个地方之下还有地方」，
 * 与 Tree 的分支同一件事，所以同一个记号——收起时朝内联结束侧（›），展开时朝下（⌄），旋转四分之一周
 * （Apple HIG 的展开三角也是这条规则）。DisclosureIcon 的「朝下、展开后朝上」说的是内容在下方铺开
 * （Accordion、Collapsible），用在地点层级上名实不符。
 * 尺寸取控件图标的下一档（--qy-control-sm-icon）：它是条目图标的从属记号，与条目图标同大就会争位；
 * 墨取装饰墨（--qy-ink-decor）：展开与否已由 aria-expanded 与露出的子项表达，记号只是提示，悬停时随字色加深。
 * rail 态完全换一套：按钮不再承担内嵌展开（否则收起侧栏会悄悄改变用户没点开过的展开记忆），
 * 只作为 Popover 的入口，悬停或聚焦都能打开；子级是否已经选中由 group-has 读取面板里的
 * aria-current，不需要再查一次 open 状态。
 */
export function SidebarSubTrigger({ icon, className, children, ...props }: SidebarSubTriggerProps) {
  const context = useSidebar();
  const inSub = React.useContext(InSubPanel);
  const frame = cn(
    "group/disclosure touch-target flex w-full min-h-(--qy-fill-height) pointer-coarse:min-h-(--qy-touch-target) min-w-0 cursor-pointer items-center gap-(--qy-control-content-gap) rounded-item text-body text-sidebar-foreground outline-none transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) [&_svg:not([data-slot=sidebar-sub-icon])]:size-(--qy-control-md-icon) [&_svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset group-has-[[aria-current=page]]/sub:text-sidebar-accent-foreground",
    context.collapsed ? "justify-center px-0" : inSub ? subItemPadding : "px-(--qy-control-sm-padding)",
    className,
  );
  const label = <span data-slot="sidebar-sub-trigger-label" className={cn("min-w-0 flex-1 text-start wrap-anywhere", context.collapsed && "sr-only")}>{children}</span>;
  // rail 态与展开态一样把调用方的属性（aria-*、data-*、事件、render）交给触发元素；入口行为与外观由本组件定。
  if (context.collapsed) return <PopoverTrigger data-slot="sidebar-sub-trigger" render={<button type="button" />} {...props as React.ComponentProps<typeof PopoverTrigger>} openOnHover delay={0} closeDelay={0} className={frame}>{icon}{label}</PopoverTrigger>;
  return <CollapsiblePrimitive.Trigger data-slot="sidebar-sub-trigger" {...props} className={frame}>{icon}{label}<IconChevronRight aria-hidden="true" data-slot="sidebar-sub-icon" className="size-(--qy-control-sm-icon) text-ink-decor transition-[rotate,color] duration-(--qy-duration-base) ease-(--qy-ease-out) group-hover/disclosure:text-sidebar-accent-foreground group-data-[panel-open]/disclosure:rotate-90 rtl:rotate-180 rtl:group-data-[panel-open]/disclosure:rotate-90 motion-reduce:transition-none" /></CollapsiblePrimitive.Trigger>;
}
export type SidebarSubContentProps = CollapsiblePrimitive.Panel.Props;
// 两条关系同时成立（§19）：
// 1. 子项文字与父项文字同一条竖线：父项文字起点 = 左内缩 + 图标 + 控件内间隔。
// 2. 子项的面不碰引导线：线在父项图标中心（左内缩 + 半个图标），线外再隔一个控件内间隔，子项的面才开始。
// 面板缩进 = 左内缩 + 半个图标 + 线宽 + 控件内间隔；子项自己的左内缩取两者之差 = 半个图标 − 线宽（subItemPadding）。
// 此前子项沿用整份左内缩、面板只缩进「图标 + 控件内间隔」，面的左缘离线只剩 1px，看上去压在线上。
// 父项没有图标时没有「图标中心」可言：线改从父项文字的起笔垂下（左内缩处），面板缩进相应去掉半个图标；
// 关系 2 不变，子项文字比父项文字缩进「线宽 + 控件内间隔 + 子项左内缩」，读作下一级。
// 此前无图标时线仍按半个图标算，落进父项第一个字的字身里。
const subIndent = "ps-[calc(var(--qy-control-sm-padding)+var(--qy-control-md-icon)/2+var(--qy-line-width)+var(--qy-control-content-gap))]";
const subIndentTextOnly = "ps-[calc(var(--qy-control-sm-padding)+var(--qy-line-width)+var(--qy-control-content-gap))]";
export function SidebarSubContent({ className, children, ...props }: SidebarSubContentProps) {
  const context = useSidebar();
  const label = React.useContext(SidebarSubLabelContext);
  const hasIcon = React.useContext(SubTriggerHasIcon);
  // 浮层本身就是「有空间显示文字」的地方：子级在这里不再是 rail 条目，名称要正常可见，
  // 不能继承外层 collapsed=true 继续把文字切成 sr-only——那会让弹出的子级看起来空白一片。
  const overlayContext = React.useMemo(() => ({ ...context, collapsed: false }), [context]);
  return <>
    {/* 面板始终挂载（keepMounted）：:has([aria-current=page]) 要在 rail 下也能读到子级是否
     *  选中，而 :has() 只认 DOM 是否存在、不认是否可见。这里用的是外面另包的一层 div 的
     *  原生 hidden（不是 Collapsible 自己管理的那个），二者各管各的：Collapsible 的 hidden
     *  表达「用户没展开」，这层 hidden 表达「rail 没有宽度摆它」；同一个焦点元素一旦落入
     *  原生 hidden 的子树，SidebarContent 的回退逻辑才需要把焦点交回 Toggle。 */}
    <div hidden={context.collapsed || undefined} className="min-w-0">
      <CollapsiblePrimitive.Panel data-slot="sidebar-sub-content" keepMounted {...props} className={state => cn("qy-sidebar-sub-content relative grid min-w-0 gap-fen-half text-body wrap-anywhere [&[hidden]:not([hidden=until-found])]:hidden", hasIcon ? subIndent : subIndentTextOnly, typeof className === "function" ? className(state) : className)}>
        {/* 引导竖线：同一 SidebarGroup 里可能有几个 SidebarSub 前后相邻，缩进本身对每一级都
         *  一样深，无法区分「这几行属于上面哪一个父项」；面划不出这层边界，补一条清墨线
         *  （骨法用笔：线只在面无法划出范围时出现）。线的位置是父项图标的几何中心，
         *  从子级看是正上方那枚图标的延伸；父项没有图标时是父项文字起笔的延伸。 */}
        <span aria-hidden="true" className={cn("absolute inset-y-0 w-line bg-border", hasIcon ? "start-[calc(var(--qy-control-sm-padding)+var(--qy-control-md-icon)/2)]" : "start-(--qy-control-sm-padding)")} />
        <InSubPanel.Provider value={true}>{children}</InSubPanel.Provider>
      </CollapsiblePrimitive.Panel>
    </div>
    {context.collapsed && (
      <PopoverPopup
        side="inline-end" align="start"
        viewportProps={{ className: "grid min-w-0 gap-fen-half p-(--qy-overlay-inset)" }}
        // 浮层的承载面是 surface-raised：当前项的面是叠合的选中面，在它上面同样比底深一级，不需要局部改写。
        className="min-w-[calc(8*var(--qy-cai))]"
      >
        {/* 浮层里没有行气之外的空间重复父项名称，但图标本身不认字——保留一行浓墨小标题，
         *  删去检验：去掉它，读者分不清这组链接属于哪一个父项。 */}
        {label && <p className="m-0 min-w-0 px-(--qy-control-sm-padding) pt-(--qy-space-1) pb-(--qy-space-1) text-caption text-muted-foreground wrap-anywhere">{label}</p>}
        <SidebarContext.Provider value={overlayContext}>{children}</SidebarContext.Provider>
      </PopoverPopup>
    )}
  </>;
}
