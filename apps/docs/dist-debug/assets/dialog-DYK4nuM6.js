import { af as DialogRoot, j as jsxRuntimeExports, ak as DialogTrigger$1, q as useUILocale, ag as DialogPortal$1, ah as DialogPopup$1, cf as DialogClose$1, bp as X, B as Button, e as cn, a8 as useRender, a9 as mergeProps, cd as DialogTitle$1, ce as DialogDescription$1, bq as ScrollArea, ai as DialogBackdrop$1, aj as DialogViewport$1 } from "./index-DM02Iz28.js";
const Dialog = DialogRoot;
const DialogPortal = DialogPortal$1;
function DialogTrigger(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger$1, { "data-slot": "dialog-trigger", ...props });
}
function DialogClose(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose$1, { "data-slot": "dialog-close", ...props });
}
function DialogBackdrop({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogBackdrop$1,
    {
      className: cn(
        "fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-(--qy-duration-base) ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-(--qy-duration-fast)",
        className
      ),
      "data-slot": "dialog-backdrop",
      ...props
    }
  );
}
function DialogViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogViewport$1,
    {
      className: cn(
        "fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
        className
      ),
      "data-slot": "dialog-viewport",
      ...props
    }
  );
}
function DialogPopup({
  className,
  children,
  showCloseButton = true,
  bottomStickOnMobile = true,
  closeProps,
  portalProps,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { ...portalProps, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBackdrop, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogViewport,
      {
        className: cn(
          bottomStickOnMobile && "max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-12"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogPopup$1,
          {
            className: cn(
              "relative row-start-2 flex max-h-full min-h-0 w-full min-w-0 max-w-lg origin-center flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground opacity-[calc(1-var(--nested-dialogs))] shadow-lg/5 outline-none transition-[scale,opacity,translate] duration-(--qy-duration-base) ease-out will-change-transform data-ending-style:duration-(--qy-duration-fast) before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:opacity-0 data-starting-style:opacity-0 sm:scale-[calc(1-0.1*var(--nested-dialogs))] sm:data-ending-style:scale-98 sm:data-starting-style:scale-98 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
              bottomStickOnMobile && "max-sm:max-w-none max-sm:origin-bottom max-sm:rounded-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:data-ending-style:translate-y-4 max-sm:data-starting-style:translate-y-4 max-sm:before:hidden max-sm:before:rounded-none",
              className
            ),
            "data-slot": "dialog-popup",
            ...props,
            children: [
              children,
              showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsx(
                DialogClose$1,
                {
                  "aria-label": messages.close,
                  className: "absolute end-2 top-2",
                  render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost" }),
                  ...closeProps,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {})
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
function DialogHeader({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex flex-col gap-2 p-6 in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pb-3 max-sm:pb-4",
      className
    ),
    "data-slot": "dialog-header"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function DialogFooter({
  className,
  variant = "default",
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-2xl)-1px)]",
      variant === "default" && "border-t bg-muted/72 py-4 max-sm:pb-[calc(--spacing(4)+env(safe-area-inset-bottom,0px))]",
      variant === "bare" && "in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pt-3 pt-4 pb-6 max-sm:pb-[calc(--spacing(6)+env(safe-area-inset-bottom,0px))]",
      className
    ),
    "data-slot": "dialog-footer"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogTitle$1,
    {
      className: cn(
        "font-heading font-semibold text-xl leading-none",
        className
      ),
      "data-slot": "dialog-title",
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogDescription$1,
    {
      className: cn("text-muted-foreground text-sm", className),
      "data-slot": "dialog-description",
      ...props
    }
  );
}
function DialogPanel({
  className,
  scrollFade = true,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "p-6 in-[[data-slot=dialog-popup]:has([data-slot=dialog-header])]:pt-1 in-[[data-slot=dialog-popup]:has([data-slot=dialog-footer]:not(.border-t))]:pb-1",
      className
    ),
    "data-slot": "dialog-panel"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { overscrollContain: true, scrollFade, children: useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  }) });
}
export {
  Dialog as D,
  DialogTrigger as a,
  DialogPopup as b,
  DialogHeader as c,
  DialogTitle as d,
  DialogDescription as e,
  DialogPanel as f,
  DialogFooter as g,
  DialogClose as h
};
