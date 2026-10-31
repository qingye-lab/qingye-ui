"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { createPortal } from "react-dom";
import { useUILocale } from "../locale";
import { createSidebarDrawerHandle, SidebarHandleContext } from "../sidebar-handle";
import { cn } from "../utils";
import { Heading, type HeadingProps } from "./typography";

/**
 * 顶栏里留给页面的那个位置。顶栏挂上来时把它登记在这里，页面经 WorkspaceHeaderPortal 把内容送进去。
 * 登记的是 DOM 元素，所以只在提交之后才有值：服务端与首次渲染时为 null，渲染期间不读 document。
 */
type WorkspaceState = {
  outlet: HTMLElement | null; setOutlet: (node: HTMLElement | null) => void;
  /** 内容区的 id：跳过链接指向它。内容区没有自己的 id 时用 defaultContentId；有时登记到 contentId（同 Sidebar 的 contentId 机制）。 */
  contentId: string; defaultContentId: string; setContentId: React.Dispatch<React.SetStateAction<string>>;
};
const WorkspaceContext = React.createContext<WorkspaceState | null>(null);

export type WorkspaceProps = useRender.ComponentProps<"div">;
/**
 * 应用外壳：底纸上并排放侧栏与一张工作面。自己不画线、不加圆角、不投影，只铺底纸（基础层 §6）。
 *
 * 侧栏与工作面是同一组，坐在同一张底纸上，离视口的边与彼此之间只有一个间隔：2 分（组内间隔，**选择**）。
 * 侧栏不画边，所以它与工作面之间的间隔就是侧栏自己的内缘——外壳给侧栏这一圈内缘，工作面朝侧栏的一侧不再加边距，
 * 两者相加仍是一个间隔，不是两个。内缘写在 :where() 里（零特异度）：调用方在 Sidebar 上写的任何内缘、
 * 以及侧栏收起成 rail 时自己的横向内缩，都盖过它。
 *
 * 有顶栏时，侧栏第一行（SidebarHeader，一个填值控件高）与顶栏里的控件同一条行中线（基础层 §19）：
 * 侧栏的上内缘 = 工作面的外边距 + 容器线 + 顶栏里控件上方的组内间隔。窄屏工作面贴边，前两项为零。
 *
 * 外壳自带跳过链接（不另立部件，名称与目标都由外壳已知）：它是外壳的第一个可聚焦项，键盘第一次 Tab 落在这里，
 * 回车把焦点交给内容区（WorkspaceContent），绕过侧栏里的全部链接（WCAG 2.4.1，**约束**）。平时视觉隐藏、仍在 Tab 顺序与
 * 辅助技术里；获焦时现身，画成浮层（`--qy-surface-raised` 的纸、浮层圆角、一道容器线、浮层阴影）——它盖在内容之上，
 * 与 Popover、Toast 同一类东西，不是外壳的一部分，所以不进文档流、不推动任何布局（fixed），离视口的边取外壳的组内间隔
 * `--qy-space-2`（与侧栏、工作面离视口的边相同）。行高取一个填值控件高，内缘取控件的起始内缩，焦点取控件的焦点环（§15）。
 * 层级 z-10 是**预设**：只需高过工作面里的吸顶部件；模态浮层有自己的层序，盖在它之上。
 * 点击不改地址：preventDefault 后直接聚焦目标，hash 路由的应用不会因此换页。
 */
export function Workspace({ render, className, children, ...props }: WorkspaceProps) {
  const { messages } = useUILocale();
  const [outlet, setOutlet] = React.useState<HTMLElement | null>(null);
  const defaultContentId = React.useId();
  const [contentId, setContentId] = React.useState(defaultContentId);
  const [sidebarHandle] = React.useState(() => createSidebarDrawerHandle());
  const context = React.useMemo(() => ({ outlet, setOutlet, contentId, defaultContentId, setContentId }), [outlet, contentId, defaultContentId]);
  const element = useRender({
    defaultTagName: "div", render,
    props: mergeProps({
      "data-slot": "workspace",
      className: cn(
        "flex h-full min-h-0 min-w-0 bg-background text-foreground",
        "[:where(&>[data-slot=sidebar])]:px-(--qy-space-2) [:where(&>[data-slot=sidebar])]:pb-(--qy-space-2)",
        "[:where(&:not(:has([data-slot=workspace-header]))>[data-slot=sidebar])]:pt-(--qy-space-2)",
        "max-sm:[:where(&:has([data-slot=workspace-header])>[data-slot=sidebar])]:pt-(--qy-field-gap)",
        "sm:[:where(&:has([data-slot=workspace-header])>[data-slot=sidebar])]:pt-[calc(var(--qy-space-2)+var(--qy-line-width)+var(--qy-field-gap))]",
        className,
      ),
      children: <>
        <a
          data-slot="workspace-skip-link" href={`#${contentId}`}
          onClick={event => { event.preventDefault(); event.currentTarget.ownerDocument.getElementById(contentId)?.focus(); }}
          className="pointer-events-none fixed start-(--qy-space-2) top-(--qy-space-2) z-10 inline-flex min-h-(--qy-fill-height) items-center rounded-overlay border border-border bg-surface-raised px-(--qy-control-sm-padding) text-body text-foreground opacity-0 shadow-raised outline-none focus:pointer-events-auto focus:opacity-100 focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color)"
        >{messages.skipToContent}</a>
        {children}
      </>,
    }, props),
  });
  // 窄屏侧栏抽屉的关联（Sidebar 的 drawer 与 SidebarDrawerTrigger 共用，见 sidebar-handle.ts）。
  return <WorkspaceContext.Provider value={context}><SidebarHandleContext.Provider value={sidebarHandle}>{element}</SidebarHandleContext.Provider></WorkspaceContext.Provider>;
}

export type WorkspaceSurfaceProps = useRender.ComponentProps<"div">;
/**
 * 工作面：底纸上的一张纸，页面的内容都在它里面。纸本色 + 清墨容器线 + 面板圆角，与 Card 同一机制（基础层 §5、§6）；
 * 另有一层很轻的面板阴影（`--qy-shadow-panel`，用户裁决 2026-10-13：消费项目里已认可的外观。它不是 §6「同一平面不加阴影」
 * 推出来的，是裁决；线仍是范围的承担者，强制颜色下阴影被移除，线留着）。
 *
 * 四周的外边距是 2 分；紧挨着侧栏的那一侧不加（见 Workspace：那道间隔是侧栏的内缘）。
 * overflow 裁切使圆角同时作用于顶栏与滚动区。
 *
 * 窄屏（< 40rem，与全库同一个点）工作面贴满视口：贴边的一侧没有圆角也没有线（基础层 §6：贴着视口的面是从边上
 * 拉出来的，不是浮在空中的卡），四边都贴，所以外边距、圆角、线与阴影一并去掉。
 */
export function WorkspaceSurface({ render, className, ...props }: WorkspaceSurfaceProps) {
  return useRender({
    defaultTagName: "div", render,
    props: mergeProps({
      "data-slot": "workspace-surface",
      className: cn(
        "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-border bg-surface",
        "sm:m-(--qy-space-2) sm:rounded-panel sm:border sm:shadow-panel",
        "sm:[[data-slot=sidebar]+&]:ms-0 sm:has-[+[data-slot=sidebar]]:me-0",
        className,
      ),
    }, props),
  });
}

export type WorkspaceHeaderProps = useRender.ComponentProps<"header">;
/**
 * 工作面里的顶栏：页面是什么（标题）、一句摘要、页面级的操作，同一条行中线（基础层 §19）。正文不再立第二个大标题（§6）。
 *
 * 高度是一行：一个填值控件 + 上下各一个组内间隔（`--qy-row-default`，默认 48、紧凑 44，**派生**，随 `data-density`）。
 * 这是线以内的高度（box-content）：下缘的容器线另占一道线宽，控件上下的空隙才是整数像素。
 * 横向内缘取页边距（`--qy-page-gutter`），标题与下面内容的左缘是同一条线——内容区的内缘由页面自己给，取同一个角色。
 * 标题组与操作之间是一个组间距（`--qy-panel-gap`）。
 *
 * 自己的 children 在前，留给页面的位置在后（`display: contents`，送进来的部件直接是顶栏的行内项，排法与直接写在顶栏里相同）。
 * 顶栏在 DOM 里先于内容区，所以页面送上来的操作在 Tab 顺序里也先于正文。
 */
export function WorkspaceHeader({ render, className, children, ...props }: WorkspaceHeaderProps) {
  const context = React.useContext(WorkspaceContext);
  return useRender({
    defaultTagName: "header", render,
    props: mergeProps({
      "data-slot": "workspace-header",
      className: cn("box-content flex h-(--qy-row-default) min-w-0 shrink-0 items-center gap-x-(--qy-panel-gap) border-b border-border px-(--qy-page-gutter)", className),
      children: <>{children}{context && <div ref={context.setOutlet} data-slot="workspace-header-outlet" className="contents" />}</>,
    }, props),
  });
}

export type WorkspaceHeaderPortalProps = { children?: React.ReactNode };
/**
 * 路由页面把自己的标题、摘要与操作送进顶栏：写在 WorkspaceContent 里的页面中，内容渲染到顶栏留出的位置。
 * 页面卸下，送上去的内容随之卸下。没有顶栏（或不在 Workspace 里）时什么也不渲染。
 * 不产生自己的元素，所以没有 className / render / ref。
 */
export function WorkspaceHeaderPortal({ children }: WorkspaceHeaderPortalProps) {
  const outlet = React.useContext(WorkspaceContext)?.outlet;
  return outlet ? createPortal(children, outlet) : null;
}

export type WorkspaceTitleProps = HeadingProps;
/**
 * 页面标题，默认 `<h1>` 与 `chapter` 档（20/28）：标题的一行要放进一个填值控件的高度里，紧凑密度下是 28，
 * chapter 是放得下的最大标题档（**约束**内的**选择**），也比正文里的 SectionTitle（heading，16/24）高一档。
 * 单行，放不下时截断而不折行——顶栏只有一行；摘要先让出位置，摘要让完才轮到标题。
 */
export function WorkspaceTitle({ className, ...props }: WorkspaceTitleProps) {
  return <Heading level={1} step="chapter" data-slot="workspace-title" className={cn("shrink overflow-hidden text-ellipsis whitespace-nowrap text-nowrap", className)} {...props} />;
}

export type WorkspaceSummaryProps = useRender.ComponentProps<"p">;
/**
 * 标题旁的一句摘要：辅助字号、浓墨、单行。它占标题与操作之间剩下的宽度（基准宽度为零），
 * 所以空间不够时先被截断的是它。紧跟标题时与标题是一组，间隔收回到组内间隔。
 */
export function WorkspaceSummary({ render, className, ...props }: WorkspaceSummaryProps) {
  return useRender({
    defaultTagName: "p", render,
    props: mergeProps({
      "data-slot": "workspace-summary",
      className: cn("m-0 min-w-0 flex-1 truncate text-support-mobile text-muted-foreground sm:text-support [[data-slot=workspace-title]+&]:-ms-[calc(var(--qy-panel-gap)-var(--qy-field-gap))]", className),
    }, props),
  });
}

export type WorkspaceActionsProps = useRender.ComponentProps<"div">;
/**
 * 页面级的操作，靠行尾；与 SectionActions 同一规则：相邻动作之间一个动作间隔，以无形的入口（有名称的 quiet 按钮）
 * 收尾时整组抵消它的横向留白，文字压在内容右缘（基础层 §19）。顶栏里的按钮是默认的 md 等，与填值控件同高；
 * 小一等的 sm 也按同一规则抵消。一个顶栏只放一组。
 */
export function WorkspaceActions({ render, className, ...props }: WorkspaceActionsProps) {
  return useRender({
    defaultTagName: "div", render,
    props: mergeProps({
      "data-slot": "workspace-actions",
      className: cn(
        "ms-auto flex min-w-0 shrink-0 items-center gap-(--qy-action-gap) [&_[data-slot=button-content]]:whitespace-nowrap",
        "[&:has(>[data-slot=button][data-variant=quiet][data-shape=label][data-size=md]:last-child)]:-me-[calc(var(--qy-fill-padding)+var(--qy-line-width))]",
        "[&:has(>[data-slot=button][data-variant=quiet][data-shape=label][data-size=sm]:last-child)]:-me-(--qy-control-sm-padding)",
        className,
      ),
    }, props),
  });
}

export type WorkspaceContentProps = useRender.ComponentProps<"main"> & {
  /**
   * 换页的标识（通常是路由路径）。变化时把滚动回到顶部、重放一次进场（`data-motion="rise-in"`，调用方给了
   * `data-motion` 时重放调用方的值）；首次挂载不动。地址的 `#锚点` 落在新内容里时滚到锚点而不是顶部。进场遵守 motion.css：键盘输入时不播，减少动效时只淡入。
   */
  transitionKey?: React.Key;
};
/**
 * 内容区：外壳里唯一的滚动容器，默认 `<main>`。内缘由页面自己给（整幅的表格要贴边），取页边距 `--qy-page-gutter` 时与顶栏标题同一条左缘。
 *
 * 焦点与 TableContainer 的可滚动容器同一条规则（基础层 §15，**约束**：WCAG 2.1.1 键盘可滚动）：
 * 内容放得下时 `tabIndex={-1}`——不在 Tab 顺序里，只作跳转链接与换页后焦点的落点；内容真的溢出时 `tabIndex={0}`，
 * 键盘能停在这里用方向键滚动，没有可聚焦子项的长页面也读得完。可滚动由实测决定（scrollHeight 对 clientHeight），
 * 容器与子节点尺寸变化、子树变化（下一帧）与资源载入时重测；服务端与首帧按「放得下」。在 Tab 顺序里就要看得见焦点：盒内一道 1px 焦墨线
 * （`--qy-focus-quiet-width`，与 framed={false} 的表格容器同一画法），外缘不变（NG9）。调用方显式传入的 tabIndex 优先。
 */
export function WorkspaceContent({ id, render, className, ref, tabIndex, transitionKey, ...props }: WorkspaceContentProps) {
  const workspace = React.useContext(WorkspaceContext);
  const actualId = id ?? workspace?.defaultContentId;
  const setContentId = workspace?.setContentId;
  React.useLayoutEffect(() => { if (actualId && setContentId) setContentId(actualId); }, [actualId, setContentId]);
  const element = React.useRef<HTMLElement | null>(null);
  const [scrollable, setScrollable] = React.useState(false);
  React.useLayoutEffect(() => {
    const node = element.current; if (!node) return;
    const measure = () => setScrollable(node.scrollHeight > node.clientHeight);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    // 尺寸：容器与直接子节点。不观察每个后代——内容区往往包着整页（上千个单元格），逐个观察代价太大。
    const observer = new ResizeObserver(measure);
    const watch = () => { observer.disconnect(); for (const child of [node, ...node.children]) observer.observe(child); };
    watch();
    // 固定高度的包装层不随内部内容变高：子树的增删、属性与文字变化合并到下一帧测一次；
    // 图片等资源载入完成不产生 DOM 变化，在捕获阶段听 load（它不冒泡）。
    let frame = 0;
    const schedule = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; measure(); }); };
    const mutations = new MutationObserver(records => {
      if (records.some(record => record.type === "childList" && record.target === node)) watch();
      if (records.some(record => record.target !== node || record.attributeName !== "tabindex")) schedule();
    });
    mutations.observe(node, { childList: true, subtree: true, attributes: true, characterData: true });
    node.addEventListener("load", measure, true);
    return () => { observer.disconnect(); mutations.disconnect(); node.removeEventListener("load", measure, true); cancelAnimationFrame(frame); };
  }, []);
  const shownKey = React.useRef(transitionKey);
  React.useLayoutEffect(() => {
    if (shownKey.current === transitionKey) return;
    shownKey.current = transitionKey;
    const node = element.current; if (!node) return;
    // 先回到顶部；地址带锚点、且锚点就在这一页的内容里时再把它滚入视野。只看「新内容里有没有这个锚点」，
    // 不只看地址有没有 #：路由可能晚于这一刻才改地址，残留的上一页锚点在新页面里找不到，照常回到顶部。
    node.scrollTop = 0;
    const anchor = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
    if (anchor && node.contains(anchor)) anchor.scrollIntoView?.();
    // 重放进场：先摘掉再挂回，中间读一次布局，浏览器才把它当作一次新的动画。
    // 调用方自己给了 data-motion 时重放的是它，不换成 rise-in。
    const motion = node.getAttribute("data-motion") ?? "rise-in";
    node.removeAttribute("data-motion"); void node.offsetWidth; node.setAttribute("data-motion", motion);
  }, [transitionKey]);
  return useRender({
    defaultTagName: "main", render, ref: [element, ref ?? null],
    props: mergeProps({ "data-slot": "workspace-content", id: actualId, tabIndex: tabIndex ?? (scrollable ? 0 : -1), className: cn("min-h-0 min-w-0 flex-1 overflow-y-auto outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className) }, props),
  });
}
