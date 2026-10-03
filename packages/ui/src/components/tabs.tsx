"use client";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { Button } from "./button";
import { cn } from "../utils";
export type TabsProps = TabsPrimitive.Root.Props;
export function Tabs({ className, ...props }: TabsProps) { return <TabsPrimitive.Root data-slot="tabs" {...props} className={state => cn("flex min-w-0 gap-(--qy-panel-gap)", state.orientation === "vertical" ? "flex-row items-start" : "flex-col", typeof className === "function" ? className(state) : className)} />; }
export type TabsListProps = TabsPrimitive.List.Props;
export function TabsList({ className, ...props }: TabsListProps) { return <TabsPrimitive.List data-slot="tabs-list" {...props} className={state => cn("flex min-w-0 gap-(--qy-action-gap)", state.orientation === "vertical" ? "flex-col items-start" : "max-w-full overflow-x-auto", typeof className === "function" ? className(state) : className)} />; }
export type TabsTabProps = TabsPrimitive.Tab.Props;
export function TabsTab({ className, render, ...props }: TabsTabProps) { return <TabsPrimitive.Tab data-slot="tabs-tab" render={render ?? <Button variant="quiet" />} {...props} className={state => cn("shrink-0", state.active && "bg-accent", typeof className === "function" ? className(state) : className)} />; }
export type TabsPanelProps = TabsPrimitive.Panel.Props;
export function TabsPanel({ keepMounted = true, className, ...props }: TabsPanelProps) { return <TabsPrimitive.Panel data-slot="tabs-panel" keepMounted={keepMounted} {...props} className={state => cn("min-w-0 flex-1 rounded-item outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", typeof className === "function" ? className(state) : className)} />; }
export { TabsPrimitive };
