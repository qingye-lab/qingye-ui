"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export interface SidebarChangeDetails { event: React.MouseEvent; cancel(): void }
type SidebarState = { collapsed: boolean; contentId: string; defaultContentId: string; setContentId: React.Dispatch<React.SetStateAction<string>>; toggle: React.RefObject<HTMLButtonElement | null>; contentFocused: React.RefObject<boolean>; change(event: React.MouseEvent): void };
const SidebarContext = React.createContext<SidebarState | null>(null);
function useSidebar() { const context = React.useContext(SidebarContext); if (!context) throw new Error("Sidebar parts require Sidebar."); return context; }
export type SidebarProps = useRender.ComponentProps<"aside"> & { collapsed?: boolean; defaultCollapsed?: boolean; onCollapsedChange?: (collapsed: boolean, details: SidebarChangeDetails) => void };
export function Sidebar({ collapsed, defaultCollapsed = false, onCollapsedChange, render, className, ...props }: SidebarProps) {
  const [local, setLocal] = React.useState(defaultCollapsed); const current = collapsed ?? local; const defaultContentId = React.useId(); const [contentId, setContentId] = React.useState(defaultContentId); const toggle = React.useRef<HTMLButtonElement | null>(null); const contentFocused = React.useRef(false);
  const context: SidebarState = { collapsed: current, contentId, defaultContentId, setContentId, toggle, contentFocused, change(event) { let canceled = false; onCollapsedChange?.(!current, { event, cancel() { canceled = true; } }); if (!canceled && collapsed === undefined) setLocal(!current); } };
  const element = useRender({ defaultTagName: "aside", render, props: mergeProps({ "data-slot": "sidebar", "data-collapsed": current, className: cn("flex min-w-0 max-w-full flex-col gap-(--qy-panel-gap) text-body", className) }, props) });
  return <SidebarContext.Provider value={context}>{element}</SidebarContext.Provider>;
}
export type SidebarToggleProps = ButtonProps;
export function SidebarToggle({ children, ref, onClick, ...props }: SidebarToggleProps) {
  const context = useSidebar(); const { messages } = useUILocale();
  return <Button data-slot="sidebar-toggle" variant="quiet" aria-expanded={!context.collapsed} aria-controls={context.contentId} {...props} ref={node => { context.toggle.current = node; if (typeof ref === "function") { const cleanup = ref(node); if (typeof cleanup === "function") return () => { context.toggle.current = null; cleanup(); }; } else if (ref) ref.current = node; }} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) context.change(event); }}>{children ?? (context.collapsed ? messages.expand : messages.collapse)}</Button>;
}
export type SidebarContentProps = useRender.ComponentProps<"nav">;
export function SidebarContent({ id, render, className, onFocusCapture, onBlurCapture, ...props }: SidebarContentProps) {
  const context = useSidebar(); const actualId = id ?? context.defaultContentId;
  React.useLayoutEffect(() => { context.setContentId(actualId); }, [actualId, context.setContentId]);
  React.useLayoutEffect(() => { if (context.collapsed && context.contentFocused.current) { context.toggle.current?.focus(); context.contentFocused.current = false; } }, [context.collapsed, context.toggle, context.contentFocused]);
  return useRender({ defaultTagName: "nav", render, props: mergeProps({ "data-slot": "sidebar-content", id: actualId, hidden: context.collapsed, className: cn("min-w-0", className), onFocusCapture(event: React.FocusEvent<HTMLElement>) { context.contentFocused.current = true; onFocusCapture?.(event); }, onBlurCapture(event: React.FocusEvent<HTMLElement>) { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) context.contentFocused.current = false; onBlurCapture?.(event); } }, props) });
}
export type SidebarGroupProps = useRender.ComponentProps<"div">;
export function SidebarGroup({ render, className, ...props }: SidebarGroupProps) { return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "sidebar-group", className: cn("flex min-w-0 flex-col gap-(--qy-action-gap)", className) }, props) }); }
export type SidebarGroupLabelProps = useRender.ComponentProps<"p">;
export function SidebarGroupLabel({ render, className, ...props }: SidebarGroupLabelProps) { return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "sidebar-group-label", className: cn("m-0 min-w-0 text-body-strong wrap-anywhere", className) }, props) }); }
export type SidebarLinkProps = useRender.ComponentProps<"a"> & { active?: boolean };
export function SidebarLink({ active = false, render, className, ...props }: SidebarLinkProps) { return useRender({ defaultTagName: "a", render, props: mergeProps({ "data-slot": "sidebar-link", "aria-current": active ? "page" : undefined, className: cn("touch-target min-w-0 rounded-item text-body text-foreground underline underline-offset-2 outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", active && "text-body-strong", className) }, props) }); }
