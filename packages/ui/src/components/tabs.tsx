"use client";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import * as React from "react";
import { useOverflowEdges } from "../hooks/use-scrollable";
import { cn } from "../utils";
import { navLineCurrentClassName, navLineItemClassName, navLineListClassName } from "../nav-line";
import { trackClassName, trackItemFaceClassName } from "../track";
/**
 * 外观与语义分开：`line` 是导航线（src/nav-line.ts），`track` 是轨道（src/track.ts）。两种外观都能承载
 * 「几个并列的去处」，用哪一种与条目从哪来无关；tablist / tab / tabpanel 的语义不随外观变化。
 */
export type TabsAppearance = "line" | "track";
const AppearanceContext = React.createContext<TabsAppearance>("line");
export type TabsProps = TabsPrimitive.Root.Props & {
  /** 标签栏的外观，一处设置整组生效。`line`（默认）是导航线；`track` 是围在轨道里的选中面，横纵都成立。 */
  appearance?: TabsAppearance;
};
export function Tabs({ className, appearance = "line", ...props }: TabsProps) { return <AppearanceContext.Provider value={appearance}><TabsPrimitive.Root data-slot="tabs" data-appearance={appearance} {...props} className={state => cn("flex min-w-0 gap-(--qy-panel-gap)", state.orientation === "vertical" ? "flex-row items-start" : "flex-col", typeof className === "function" ? className(state) : className)} /></AppearanceContext.Provider>; }
export type TabsListProps = TabsPrimitive.List.Props;
/*
 * 横向放不下时，列表可滑动；两端是否还有内容由实测决定（useOverflowEdges），只在真有内容被切掉的那一端渐隐，
 * 滚到头的一端不渐隐（否则头一个标签永远发虚）。起止端用 data-overflow-start / data-overflow-end 暴露，
 * 只有画遮罩的方向（物理的 to right / to left）随 rtl 翻转。渐隐是遮罩（只取透明度、不引入颜色），不依赖承载面的颜色。
 * 纵向列表不横向溢出，量出来两端都没有，也不带遮罩。
 */
/*
 * 渐隐宽度 = 一个条目高（--qy-fill-height，随密度）。这是预设，不是推导：关系只保证渐隐与条目同尺度、
 * 随密度一起变，窄了看不出、宽了吃掉太多可读标签。
 * 焦点环：条目的焦点环画在条目自己的盒内（inset），不外扩；键盘把焦点移到被切掉的条目时，浏览器按
 * scroll-padding 把它滚进「渐隐之内」的可视区——scroll-padding-inline 取同一个宽度，所以获得焦点的条目整个落在
 * 渐隐区之外，焦点环不会被遮。原语用原生 focus() 移动焦点，浏览器会自行滚入可见区，不另写 scrollIntoView。
 */
const tabsListFadeClassName = "[--qy-tabs-fade:var(--qy-fill-height)] [--qy-tabs-fade-start:0px] [--qy-tabs-fade-end:0px] data-overflow-start:[--qy-tabs-fade-start:var(--qy-tabs-fade)] data-overflow-end:[--qy-tabs-fade-end:var(--qy-tabs-fade)] scroll-px-(--qy-tabs-fade) [&[data-overflow-start],&[data-overflow-end]]:[mask-image:linear-gradient(to_right,transparent_0,currentcolor_var(--qy-tabs-fade-start),currentcolor_calc(100%-var(--qy-tabs-fade-end)),transparent_100%)] rtl:[&[data-overflow-start],&[data-overflow-end]]:[mask-image:linear-gradient(to_left,transparent_0,currentcolor_var(--qy-tabs-fade-start),currentcolor_calc(100%-var(--qy-tabs-fade-end)),transparent_100%)]";
/** 标签页在同一对象的几个视图之间走动（默认画成导航线，src/nav-line.ts；`appearance="track"` 时画成轨道，src/track.ts）；横向可滚动而不换行，标签行数变化会让下方面板跳动。放不下时在被切掉的那一端渐隐，并且横向滚到头不带动页面。 */
export function TabsList({ className, ref, ...props }: TabsListProps) {
  const [listRef, edges] = useOverflowEdges<HTMLDivElement>(ref);
  const track = React.useContext(AppearanceContext) === "track";
  // 轨道外观下，列表是 inline-flex：在纵排的根里要 self-start 才不被拉成整行；max-w-full 让放不下时仍是横向滚动，而不是撑破父级。
  return <TabsPrimitive.List data-slot="tabs-list" {...props} ref={listRef} data-overflow-start={edges.start ? "" : undefined} data-overflow-end={edges.end ? "" : undefined} className={state => cn(track ? trackClassName("md") : navLineListClassName, state.orientation === "vertical" ? (track ? "flex-col items-stretch" : "flex-col gap-0 self-start border-b-0 border-s") : cn("overflow-x-auto overflow-y-hidden overscroll-x-contain", track && "self-start", tabsListFadeClassName), typeof className === "function" ? className(state) : className)} />;
}
export type TabsTabProps = TabsPrimitive.Tab.Props;
export function TabsTab({ className, ...props }: TabsTabProps) {
  const track = React.useContext(AppearanceContext) === "track";
  // 轨道外观：当前面板的标签是选中面（trackItemFaceClassName 与 SegmentedControl 同一份）。shrink-0 让放不下时由列表滚动，而不是压扁标签；
  // 纵排是起始对齐的列表，名称不居中。
  return <TabsPrimitive.Tab data-slot="tabs-tab" {...props} className={state => track
    ? cn(trackItemFaceClassName(state.active), "shrink-0 data-disabled:cursor-not-allowed data-disabled:opacity-disabled", state.orientation === "vertical" && "justify-start", typeof className === "function" ? className(state) : className)
    : cn(navLineItemClassName, state.orientation === "vertical" ? "-ms-line mb-0 border-b-0 border-s ps-(--qy-field-gap)" : "pointer-coarse:justify-center", state.active && navLineCurrentClassName, typeof className === "function" ? className(state) : className)} />;
}
export type TabsPanelProps = Omit<TabsPrimitive.Panel.Props, "keepMounted"> & {
  /**
   * "visited"（默认）：第一次到达时才挂载，之后保留；true：一开始就全部挂载；false：离开即卸载。
   */
  keepMounted?: boolean | "visited";
};
// 只在面板真的渲染出来时才挂载，用来得知「到达过」，不读原语的内部状态。
function Arrival({ onArrive }: { onArrive: () => void }) { React.useLayoutEffect(onArrive, [onArrive]); return null; }
/**
 * 保留面板是为了不丢失已经在里面做过的事（输入、滚动位置、已取回的数据）；没到过的面板里
 * 没有可丢的东西，提前挂载只会让它的请求与副作用在用户没看之前就发生。所以默认是
 * 「到达后保留」。跨标签页一起提交的原生表单字段需要全部在场，这时显式 keepMounted。
 */
export function TabsPanel({ keepMounted = "visited", className, children, ...props }: TabsPanelProps) {
  const [visited, setVisited] = React.useState(false);
  const arrive = React.useCallback(() => setVisited(true), []);
  return <TabsPrimitive.Panel data-slot="tabs-panel" keepMounted={keepMounted === "visited" ? visited : keepMounted} {...props} className={state => cn("min-w-0 flex-1 rounded-item outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", typeof className === "function" ? className(state) : className)}>{keepMounted === "visited" && !visited && <Arrival onArrive={arrive} />}{children}</TabsPrimitive.Panel>;
}
export { TabsPrimitive };
