"use client";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import * as React from "react";
import { cn } from "../utils";
import { navLineCurrentClassName, navLineItemClassName, navLineListClassName } from "../nav-line";
export type TabsProps = TabsPrimitive.Root.Props;
export function Tabs({ className, ...props }: TabsProps) { return <TabsPrimitive.Root data-slot="tabs" {...props} className={state => cn("flex min-w-0 gap-(--qy-panel-gap)", state.orientation === "vertical" ? "flex-row items-start" : "flex-col", typeof className === "function" ? className(state) : className)} />; }
export type TabsListProps = TabsPrimitive.List.Props;
/** 标签页在同一对象的几个视图之间走动（导航线，src/nav-line.ts）；横向可滚动而不换行，标签行数变化会让下方面板跳动。 */
export function TabsList({ className, ...props }: TabsListProps) { return <TabsPrimitive.List data-slot="tabs-list" {...props} className={state => cn(navLineListClassName, state.orientation === "vertical" ? "flex-col gap-0 self-start border-b-0 border-s" : "overflow-x-auto overflow-y-hidden", typeof className === "function" ? className(state) : className)} />; }
export type TabsTabProps = TabsPrimitive.Tab.Props;
export function TabsTab({ className, ...props }: TabsTabProps) { return <TabsPrimitive.Tab data-slot="tabs-tab" {...props} className={state => cn(navLineItemClassName, state.orientation === "vertical" && "-ms-px mb-0 border-b-0 border-s ps-(--qy-field-gap)", state.active && navLineCurrentClassName, typeof className === "function" ? className(state) : className)} />; }
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
