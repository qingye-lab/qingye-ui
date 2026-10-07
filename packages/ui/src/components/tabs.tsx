"use client";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "../utils";
import { navLineCurrentClassName, navLineItemClassName, navLineListClassName } from "../nav-line";
export type TabsProps = TabsPrimitive.Root.Props;
export function Tabs({ className, ...props }: TabsProps) { return <TabsPrimitive.Root data-slot="tabs" {...props} className={state => cn("flex min-w-0 gap-(--qy-panel-gap)", state.orientation === "vertical" ? "flex-row items-start" : "flex-col", typeof className === "function" ? className(state) : className)} />; }
export type TabsListProps = TabsPrimitive.List.Props;
/** 标签页在同一对象的几个视图之间走动（导航线，src/nav-line.ts）；横向可滚动而不换行，标签行数变化会让下方面板跳动。 */
export function TabsList({ className, ...props }: TabsListProps) { return <TabsPrimitive.List data-slot="tabs-list" {...props} className={state => cn(navLineListClassName, state.orientation === "vertical" ? "flex-col gap-0 self-start border-b-0 border-s" : "overflow-x-auto overflow-y-hidden", typeof className === "function" ? className(state) : className)} />; }
export type TabsTabProps = TabsPrimitive.Tab.Props;
export function TabsTab({ className, ...props }: TabsTabProps) { return <TabsPrimitive.Tab data-slot="tabs-tab" {...props} className={state => cn(navLineItemClassName, state.orientation === "vertical" && "-ms-px mb-0 border-b-0 border-s ps-(--qy-field-gap)", state.active && navLineCurrentClassName, typeof className === "function" ? className(state) : className)} />; }
export type TabsPanelProps = TabsPrimitive.Panel.Props;
export function TabsPanel({ keepMounted = true, className, ...props }: TabsPanelProps) { return <TabsPrimitive.Panel data-slot="tabs-panel" keepMounted={keepMounted} {...props} className={state => cn("min-w-0 flex-1 rounded-item outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", typeof className === "function" ? className(state) : className)} />; }
export { TabsPrimitive };
