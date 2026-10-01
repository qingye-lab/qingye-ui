import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as cn, q as useUILocale, e0 as Sheet, e3 as SheetPopup, e4 as SheetHeader, e5 as SheetTitle, ee as SheetDescription, bq as ScrollArea, a8 as useRender, a9 as mergeProps, T as Tooltip, v as TooltipTrigger, w as TooltipPopup, B as Button, a7 as cva } from "./index-DM02Iz28.js";
import { u as useMediaQuery } from "./use-media-query-CGVr0VA1.js";
import { I as Input } from "./input-D9i-AULz.js";
import { S as Separator } from "./separator-CcYO5Zxi.js";
import { S as Skeleton } from "./skeleton-Dv0NPbHI.js";
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }]
];
const PanelLeft = createLucideIcon("panel-left", __iconNode);
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-start text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-64 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-64 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default"
    },
    variants: {
      size: {
        default: "h-9 text-sm sm:h-8",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
        sm: "h-8 text-xs sm:h-7"
      },
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      }
    }
  }
);
const SidebarContext = reactExports.createContext(null);
function useSidebar() {
  const context = reactExports.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useMediaQuery("max-md");
  const [openMobile, setOpenMobile] = reactExports.useState(false);
  const [_open, _setOpen] = reactExports.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = reactExports.useCallback(
    async (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      if (typeof cookieStore === "undefined") return;
      await cookieStore.set({
        expires: Date.now() + SIDEBAR_COOKIE_MAX_AGE * 1e3,
        name: SIDEBAR_COOKIE_NAME,
        path: "/",
        value: String(openState)
      }).catch(() => {
      });
    },
    [setOpenProp, open]
  );
  const toggleSidebar = reactExports.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen]);
  reactExports.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = reactExports.useMemo(
    () => ({
      isMobile,
      open,
      openMobile,
      setOpen,
      setOpenMobile,
      state,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
        className
      ),
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      ...props,
      children
    }
  ) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        ),
        "data-slot": "sidebar",
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { onOpenChange: setOpenMobile, open: openMobile, ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetPopup,
      {
        className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
        "data-mobile": "true",
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        side,
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: messages.sidebar }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: messages.sidebarDescription })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group peer hidden text-sidebar-foreground md:block",
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-side": side,
      "data-slot": "sidebar",
      "data-state": state,
      "data-variant": variant,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            ),
            "data-slot": "sidebar-gap"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            "data-slot": "sidebar-container",
            ...props,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm/5",
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { messages } = useUILocale();
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      className: cn("size-7", className),
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      size: "icon",
      variant: "ghost",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeft, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: messages.toggleSidebar })
      ]
    }
  );
}
function SidebarRail({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      "aria-label": messages.toggleSidebar,
      className: cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      onClick: toggleSidebar,
      tabIndex: -1,
      title: messages.toggleSidebar,
      type: "button",
      ...props
    }
  );
}
function SidebarInset({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "main",
    {
      className: cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm/5",
        className
      ),
      "data-slot": "sidebar-inset",
      ...props
    }
  );
}
function SidebarInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      className: cn("h-8 w-full bg-background shadow-none", className),
      "data-sidebar": "input",
      "data-slot": "sidebar-input",
      ...props
    }
  );
}
function SidebarHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex flex-col gap-2 p-2", className),
      "data-sidebar": "header",
      "data-slot": "sidebar-header",
      ...props
    }
  );
}
function SidebarFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex flex-col gap-2 p-2", className),
      "data-sidebar": "footer",
      "data-slot": "sidebar-footer",
      ...props
    }
  );
}
function SidebarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator,
    {
      className: cn(
        "mx-2 w-auto bg-sidebar-border data-[orientation=horizontal]:w-auto",
        className
      ),
      "data-sidebar": "separator",
      "data-slot": "sidebar-separator",
      ...props
    }
  );
}
function SidebarContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "min-h-0 flex-1", fill: true, overscrollContain: true, scrollFade: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex h-full flex-col gap-2 group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      "data-sidebar": "content",
      "data-slot": "sidebar-content",
      ...props
    }
  ) });
}
function SidebarGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      "data-sidebar": "group",
      "data-slot": "sidebar-group",
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex h-8 shrink-0 items-center rounded-lg px-2 font-medium text-sidebar-foreground text-xs outline-hidden ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
      "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
      className
    ),
    "data-sidebar": "group-label",
    "data-slot": "sidebar-group-label"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function SidebarGroupAction({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "absolute end-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-lg p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
      // Increases the hit area of the button on mobile.
      "after:absolute after:-inset-2 md:after:hidden",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    "data-sidebar": "group-action",
    "data-slot": "sidebar-group-action"
  };
  return useRender({
    defaultTagName: "button",
    props: mergeProps(defaultProps, props),
    render
  });
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("w-full text-sm", className),
      "data-sidebar": "group-content",
      "data-slot": "sidebar-group-content",
      ...props
    }
  );
}
function SidebarMenu({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      "data-sidebar": "menu",
      "data-slot": "sidebar-menu",
      ...props
    }
  );
}
function SidebarMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      className: cn("group/menu-item relative", className),
      "data-sidebar": "menu-item",
      "data-slot": "sidebar-menu-item",
      ...props
    }
  );
}
function SidebarMenuButton({
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  render,
  ...props
}) {
  const { isMobile, state } = useSidebar();
  const defaultProps = {
    className: cn(sidebarMenuButtonVariants({ size, variant }), className),
    "data-active": isActive,
    "data-sidebar": "menu-button",
    "data-size": size,
    "data-slot": "sidebar-menu-button"
  };
  const buttonProps = mergeProps(defaultProps, props);
  const buttonElement = useRender({
    defaultTagName: "button",
    props: buttonProps,
    render
  });
  if (!tooltip) {
    return buttonElement;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TooltipTrigger,
      {
        render: buttonElement
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TooltipPopup,
      {
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        side: "right",
        ...tooltip
      }
    )
  ] });
}
function SidebarMenuAction({
  className,
  showOnHover = false,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "absolute end-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-lg p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
      // Increases the hit area of the button on mobile.
      "after:absolute after:-inset-2 md:after:hidden",
      "peer-data-[size=sm]/menu-button:top-1.5 sm:peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-2 sm:peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
      className
    ),
    "data-sidebar": "menu-action",
    "data-slot": "sidebar-menu-action"
  };
  return useRender({
    defaultTagName: "button",
    props: mergeProps(defaultProps, props),
    render
  });
}
function SidebarMenuBadge({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "pointer-events-none absolute end-1 flex h-5 min-w-5 select-none items-center justify-center rounded-lg px-1 font-medium text-sidebar-foreground text-xs tabular-nums",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1.5 sm:peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-2 sm:peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      "data-sidebar": "menu-badge",
      "data-slot": "sidebar-menu-badge",
      ...props
    }
  );
}
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}) {
  const width = reactExports.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("flex h-8 items-center gap-2 rounded-lg px-2", className),
      "data-sidebar": "menu-skeleton",
      "data-slot": "sidebar-menu-skeleton",
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "size-4 rounded-lg",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
}
function SidebarMenuSub({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      className: cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-sidebar-border border-s px-2.5 py-0.5 rtl:-translate-x-px",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      "data-sidebar": "menu-sub",
      "data-slot": "sidebar-menu-sub",
      ...props
    }
  );
}
function SidebarMenuSubItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      className: cn("group/menu-sub-item relative", className),
      "data-sidebar": "menu-sub-item",
      "data-slot": "sidebar-menu-sub-item",
      ...props
    }
  );
}
function SidebarMenuSubButton({
  size = "md",
  isActive = false,
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex h-8 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-lg px-2 text-sidebar-foreground outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-64 aria-disabled:pointer-events-none aria-disabled:opacity-64 rtl:translate-x-px sm:h-7 [&>span:last-child]:truncate [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
      "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
      size === "sm" && "text-xs",
      size === "md" && "text-sm",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    "data-active": isActive,
    "data-sidebar": "menu-sub-button",
    "data-size": size,
    "data-slot": "sidebar-menu-sub-button"
  };
  return useRender({
    defaultTagName: "a",
    props: mergeProps(defaultProps, props),
    render
  });
}
export {
  SidebarProvider as S,
  Sidebar as a,
  SidebarHeader as b,
  SidebarMenu as c,
  SidebarMenuItem as d,
  SidebarMenuButton as e,
  SidebarContent as f,
  SidebarGroup as g,
  SidebarGroupLabel as h,
  SidebarMenuBadge as i,
  SidebarGroupAction as j,
  SidebarGroupContent as k,
  SidebarMenuAction as l,
  SidebarMenuSub as m,
  SidebarMenuSubItem as n,
  SidebarMenuSubButton as o,
  SidebarFooter as p,
  SidebarRail as q,
  SidebarInset as r,
  SidebarTrigger as s,
  SidebarSeparator as t,
  SidebarInput as u,
  SidebarMenuSkeleton as v
};
