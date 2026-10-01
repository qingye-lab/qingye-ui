import { j as jsxRuntimeExports, e as cn, a7 as cva } from "./index-DM02Iz28.js";
const alertVariants = cva(
  "relative grid w-full items-start gap-x-2 gap-y-0.5 rounded-xl border px-3.5 py-3 text-card-foreground text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:has-data-[slot=alert-action]:grid-cols-[calc(var(--spacing)*4)_1fr_auto] [&>svg]:h-lh [&>svg]:w-4",
  {
    defaultVariants: {
      variant: "default"
    },
    variants: {
      variant: {
        default: "bg-transparent dark:bg-input/32 [&>svg]:text-muted-foreground",
        destructive: "border-destructive/32 bg-destructive/4 [&>svg]:text-destructive",
        error: "border-destructive/32 bg-destructive/4 [&>svg]:text-destructive",
        info: "border-info/32 bg-info/4 [&>svg]:text-info",
        success: "border-success/32 bg-success/4 [&>svg]:text-success",
        warning: "border-warning/32 bg-warning/4 [&>svg]:text-warning"
      }
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(alertVariants({ variant }), className),
      "data-slot": "alert",
      role: "alert",
      ...props
    }
  );
}
function AlertTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("font-medium [svg~&]:col-start-2", className),
      "data-slot": "alert-title",
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex flex-col gap-2.5 text-muted-foreground [svg~&]:col-start-2",
        className
      ),
      "data-slot": "alert-description",
      ...props
    }
  );
}
function AlertAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex gap-1 max-sm:col-span-2 max-sm:mt-2 sm:row-start-1 sm:row-end-3 sm:self-center sm:[[data-slot=alert-description]~&]:col-start-2 sm:[[data-slot=alert-title]~&]:col-start-2 sm:[svg~&]:col-start-2 sm:[svg~[data-slot=alert-description]~&]:col-start-3 sm:[svg~[data-slot=alert-title]~&]:col-start-3",
        className
      ),
      "data-slot": "alert-action",
      ...props
    }
  );
}
export {
  Alert as A,
  AlertTitle as a,
  AlertDescription as b,
  AlertAction as c
};
