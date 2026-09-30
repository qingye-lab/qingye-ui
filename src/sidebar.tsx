"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";
import { useUILocale } from "./locale";
import { cn } from "./utils";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "15rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarId: string;
  toggleSidebar: () => void;
};
const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

export function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange, className, style, children, ...props }: React.ComponentProps<"div"> & { defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [_open, _setOpen] = React.useState(defaultOpen);
  const [isMobile, setIsMobile] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);
  const sidebarId = React.useId();
  const open = openProp ?? _open;
  const setOpen = React.useCallback((value: boolean | ((open: boolean) => boolean)) => {
    const next = typeof value === "function" ? value(open) : value;
    onOpenChange?.(next);
    if (!onOpenChange) _setOpen(next);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [onOpenChange, open]);
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((value) => !value);
    else setOpen((value) => !value);
  }, [isMobile, setOpen]);
  React.useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setIsMobile(media.matches);
      if (!media.matches) setOpenMobile(false);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) { event.preventDefault(); toggleSidebar(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state: SidebarContextValue["state"] = open ? "expanded" : "collapsed";
  const value = React.useMemo(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, sidebarId, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, sidebarId, toggleSidebar],
  );
  return <SidebarContext.Provider value={value}><div data-slot="sidebar-wrapper" style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style } as React.CSSProperties} className={cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className)} {...props}>{children}</div></SidebarContext.Provider>;
}

export function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }: React.ComponentProps<"div"> & { side?: "left" | "right"; variant?: "sidebar" | "floating" | "inset"; collapsible?: "offcanvas" | "icon" | "none" }) {
  const { messages } = useUILocale();
  const { state, isMobile, openMobile, setOpenMobile, sidebarId } = useSidebar();
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side={side}
          className={cn("w-(--sidebar-width) p-0 [&>button]:top-2 [&>button]:right-2", className)}
          data-mobile="true"
          {...props}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{messages.sidebar}</SheetTitle>
            <SheetDescription>{messages.sidebarDescription}</SheetDescription>
          </SheetHeader>
          <div id={sidebarId} data-sidebar="sidebar" data-slot="sidebar-inner" className="flex size-full flex-col bg-sidebar text-sidebar-foreground">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  if (collapsible === "none") return <div id={sidebarId} data-slot="sidebar" className={cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className)} {...props}>{children}</div>;
  return <div className="group peer hidden text-sidebar-foreground md:block" data-state={state} data-collapsible={state === "collapsed" ? collapsible : ""} data-variant={variant} data-side={side} data-slot="sidebar"><div data-slot="sidebar-gap" className={cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-(--motion-base) ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")} /><div data-slot="sidebar-container" data-side={side} className={cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-(--motion-base) ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className)} {...props}><div id={sidebarId} data-sidebar="sidebar" data-slot="sidebar-inner" className="flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-panel group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border">{children}</div></div></div>;
}

export function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { messages } = useUILocale();
  const { isMobile, open, openMobile, sidebarId, toggleSidebar } = useSidebar();
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn("[@media(pointer:coarse)]:min-h-(--control-hit-target) [@media(pointer:coarse)]:min-w-(--control-hit-target)", className)}
      {...props}
      aria-controls={sidebarId}
      aria-expanded={isMobile ? openMobile : open}
      onClick={(event) => { onClick?.(event); toggleSidebar(); }}
    >
      <PanelLeftIcon /><span className="sr-only">{messages.toggleSidebar}</span>
    </Button>
  );
}
export function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { messages } = useUILocale(); const { toggleSidebar } = useSidebar(); return <button data-sidebar="rail" data-slot="sidebar-rail" aria-label={messages.toggleSidebar} tabIndex={-1} onClick={toggleSidebar} title={messages.toggleSidebar} className={cn("absolute inset-y-0 z-20 hidden w-4 transition-[transform,background-color] ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className)} {...props} />; }
export function SidebarInset({ className, ...props }: React.ComponentProps<"main">) { return <main data-slot="sidebar-inset" className={cn("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-panel md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className)} {...props} />; }
export function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) { return <Input data-slot="sidebar-input" data-sidebar="input" className={cn("h-8 w-full bg-background shadow-none", className)} {...props} />; }
export function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="sidebar-header" data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />; }
export function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="sidebar-footer" data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />; }
export function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) { return <Separator data-slot="sidebar-separator" data-sidebar="separator" className={cn("mx-2 w-auto bg-sidebar-border", className)} {...props} />; }
export function SidebarContent({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="sidebar-content" data-sidebar="content" className={cn("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:px-0.5!", className)} {...props} />; }
export function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="sidebar-group" data-sidebar="group" className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />; }
export function SidebarGroupLabel({ className, render, ...props }: useRender.ComponentProps<"div">) { return useRender({ defaultTagName: "div", props: mergeProps<"div">({ className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-caption font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-(--motion-base) ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", className) }, props), render, state: { slot: "sidebar-group-label", sidebar: "group-label" } }); }
export function SidebarGroupAction({ className, render, ...props }: useRender.ComponentProps<"button">) { return useRender({ defaultTagName: "button", props: mergeProps<"button">({ className: cn("absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", className) }, props), render, state: { slot: "sidebar-group-action", sidebar: "group-action" } }); }
export function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="sidebar-group-content" data-sidebar="group-content" className={cn("w-full text-body", className)} {...props} />; }
export function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) { return <ul data-slot="sidebar-menu" data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-0", className)} {...props} />; }
export function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) { return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />; }

const sidebarMenuButtonVariants = cva("peer/menu-button group/menu-button flex w-full items-center gap-2.5 overflow-hidden rounded-md px-2.5 text-left text-label font-medium text-sidebar-foreground/75 ring-sidebar-ring outline-hidden transition-[width,height,padding,color,background-color] group-has-data-[sidebar=menu-action]/menu-item:pr-9 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0! hover:bg-sidebar-accent/55 hover:text-sidebar-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:text-sidebar-foreground data-active:bg-sidebar-accent data-active:text-sidebar-primary [@media(pointer:coarse)]:min-h-(--control-hit-target)! [@media(pointer:coarse)]:min-w-(--control-hit-target)! [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", { variants: { variant: { default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", outline: "border border-sidebar-border bg-background hover:border-sidebar-accent hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" }, size: { default: "h-9 text-label", sm: "h-8 text-caption", lg: "h-12 text-body group-data-[collapsible=icon]:p-0!" } }, defaultVariants: { variant: "default", size: "default" } });

export function SidebarMenuButton({ render, isActive = false, variant = "default", size = "default", tooltip, className, ...props }: useRender.ComponentProps<"button"> & { isActive?: boolean; tooltip?: string | React.ComponentProps<typeof TooltipContent> } & VariantProps<typeof sidebarMenuButtonVariants>) {
  const { state } = useSidebar();
  const component = useRender({ defaultTagName: "button", props: mergeProps<"button">({ className: cn(sidebarMenuButtonVariants({ variant, size }), className) }, props), render: tooltip ? <TooltipTrigger render={render} /> : render, state: { slot: "sidebar-menu-button", sidebar: "menu-button", size, active: isActive } });
  if (!tooltip) return component;
  const content = typeof tooltip === "string" ? { children: tooltip } : tooltip;
  return <Tooltip>{component}<TooltipContent side="right" align="center" hidden={state !== "collapsed"} {...content} /></Tooltip>;
}
export function SidebarMenuAction({ className, render, ...props }: useRender.ComponentProps<"button">) { return useRender({ defaultTagName: "button", props: mergeProps<"button">({ className: cn("absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", className) }, props), render, state: { slot: "sidebar-menu-action", sidebar: "menu-action" } }); }
export function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="sidebar-menu-badge" data-sidebar="menu-badge" className={cn("pointer-events-none absolute right-3 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-caption font-medium text-sidebar-foreground/70 tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-2.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1.5 peer-data-active/menu-button:text-sidebar-primary", className)} {...props} />; }
export function SidebarMenuSkeleton({ className, showIcon = false, ...props }: React.ComponentProps<"div"> & { showIcon?: boolean }) { return <div data-slot="sidebar-menu-skeleton" data-sidebar="menu-skeleton" className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)} {...props}>{showIcon ? <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" /> : null}<Skeleton className="h-4 max-w-[70%] flex-1" data-sidebar="menu-skeleton-text" /></div>; }
export function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) { return <ul data-slot="sidebar-menu-sub" className={cn("mx-4 flex min-w-0 translate-x-px flex-col gap-0.5 border-l border-sidebar-border/80 px-2 py-1 group-data-[collapsible=icon]:hidden", className)} {...props} />; }
export function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) { return <li data-slot="sidebar-menu-sub-item" className={cn("group/menu-sub-item relative", className)} {...props} />; }
export function SidebarMenuSubButton({ render, size = "md", isActive = false, className, ...props }: useRender.ComponentProps<"a"> & { size?: "sm" | "md"; isActive?: boolean }) { return useRender({ defaultTagName: "a", props: mergeProps<"a">({ className: cn("flex h-7.5 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2.5 text-label font-normal text-sidebar-foreground/68 ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent/55 hover:text-sidebar-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-primary [@media(pointer:coarse)]:min-h-(--control-hit-target) [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", className) }, props), render, state: { slot: "sidebar-menu-sub-button", sidebar: "menu-sub-button", size, active: isActive } }); }
