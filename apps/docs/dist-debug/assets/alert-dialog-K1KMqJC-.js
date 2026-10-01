import { cc as useRenderDialogRoot, ak as DialogTrigger, j as jsxRuntimeExports, ag as DialogPortal, ah as DialogPopup, e as cn, cd as DialogTitle, ce as DialogDescription, cf as DialogClose, ai as DialogBackdrop, aj as DialogViewport } from "./index-DM02Iz28.js";
function AlertDialogRoot(props) {
  return useRenderDialogRoot("alert-dialog", props);
}
const AlertDialogTrigger$1 = DialogTrigger;
const AlertDialog = AlertDialogRoot;
const AlertDialogPortal = DialogPortal;
function AlertDialogTrigger(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger$1, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogBackdrop({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogBackdrop,
    {
      className: cn(
        "fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-(--qy-duration-base) ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-(--qy-duration-fast)",
        className
      ),
      "data-slot": "alert-dialog-backdrop",
      ...props
    }
  );
}
function AlertDialogViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogViewport,
    {
      className: cn(
        "fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
        className
      ),
      "data-slot": "alert-dialog-viewport",
      ...props
    }
  );
}
function AlertDialogPopup({
  className,
  bottomStickOnMobile = true,
  portalProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { ...portalProps, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogBackdrop, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialogViewport,
      {
        className: cn(
          bottomStickOnMobile && "max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-12"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DialogPopup,
          {
            className: cn(
              "relative row-start-2 flex max-h-full min-h-0 w-full min-w-0 max-w-lg origin-center flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground opacity-[calc(1-var(--nested-dialogs))] shadow-lg/5 outline-none transition-[scale,opacity,translate] duration-(--qy-duration-base) ease-out will-change-transform data-ending-style:duration-(--qy-duration-fast) before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:opacity-0 data-starting-style:opacity-0 sm:scale-[calc(1-0.1*var(--nested-dialogs))] sm:data-ending-style:scale-98 sm:data-starting-style:scale-98 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
              bottomStickOnMobile && "max-sm:max-w-none max-sm:origin-bottom max-sm:rounded-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:data-ending-style:translate-y-4 max-sm:data-starting-style:translate-y-4 max-sm:before:hidden max-sm:before:rounded-none",
              className
            ),
            "data-slot": "alert-dialog-popup",
            ...props
          }
        )
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex flex-col gap-2 p-6 text-center max-sm:pb-4 sm:text-start",
        className
      ),
      "data-slot": "alert-dialog-header",
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-2xl)-1px)]",
        variant === "default" && "border-t bg-muted/72 py-4 max-sm:pb-[calc(--spacing(4)+env(safe-area-inset-bottom,0px))]",
        variant === "bare" && "pb-6 max-sm:pb-[calc(--spacing(6)+env(safe-area-inset-bottom,0px))]",
        className
      ),
      "data-slot": "alert-dialog-footer",
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogTitle,
    {
      className: cn(
        "font-heading font-semibold text-xl leading-none",
        className
      ),
      "data-slot": "alert-dialog-title",
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogDescription,
    {
      className: cn(
        "text-muted-foreground text-sm max-sm:text-balance",
        className
      ),
      "data-slot": "alert-dialog-description",
      ...props
    }
  );
}
function AlertDialogClose(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { "data-slot": "alert-dialog-close", ...props });
}
export {
  AlertDialog as A,
  AlertDialogTrigger as a,
  AlertDialogPopup as b,
  AlertDialogHeader as c,
  AlertDialogTitle as d,
  AlertDialogDescription as e,
  AlertDialogFooter as f,
  AlertDialogClose as g
};
