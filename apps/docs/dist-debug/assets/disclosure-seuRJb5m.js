import { j as jsxRuntimeExports, e as cn, r as reactExports } from "./index-DM02Iz28.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
import { C as CollapsibleRoot, a as CollapsibleTrigger, b as CollapsiblePanel } from "./CollapsiblePanel-B5cYZztf.js";
const DisclosureContext = reactExports.createContext("plain");
function Disclosure({
  className,
  variant = "plain",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosureContext.Provider, { value: variant, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleRoot,
    {
      className: cn(
        "min-w-0",
        variant === "inset" && "rounded-xl border bg-card not-dark:bg-clip-padding text-card-foreground",
        variant === "separated" && "border-t",
        className
      ),
      "data-slot": "disclosure",
      "data-variant": variant,
      ...props
    }
  ) });
}
function DisclosureTrigger({
  className,
  children,
  ...props
}) {
  const variant = reactExports.useContext(DisclosureContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    CollapsibleTrigger,
    {
      className: cn(
        "group/disclosure relative flex cursor-pointer select-none items-center font-medium text-base outline-none transition-[color,background-color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 data-disabled:pointer-events-none data-disabled:opacity-64 sm:text-sm",
        "[&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        variant === "plain" && "touch-target -mx-1 w-fit gap-1 rounded-md px-1 py-0.5 text-muted-foreground hover:text-foreground focus-visible:ring-offset-1 focus-visible:ring-offset-background data-panel-open:text-foreground",
        variant === "inset" && "min-h-12 w-full justify-between gap-3 rounded-[calc(var(--radius-xl)-1px)] px-4 text-start hover:bg-accent focus-visible:ring-inset data-panel-open:rounded-b-none sm:min-h-11",
        variant === "separated" && "min-h-12 w-full justify-between gap-3 rounded-md text-start text-muted-foreground hover:text-foreground focus-visible:ring-offset-1 focus-visible:ring-offset-background data-panel-open:text-foreground sm:min-h-11",
        className
      ),
      "data-slot": "disclosure-trigger",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex min-w-0 items-center gap-2", "data-slot": "disclosure-label", children }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronDown,
          {
            "aria-hidden": "true",
            className: "transition-transform duration-(--qy-duration-base) ease-(--qy-ease-out) group-data-panel-open/disclosure:rotate-180",
            "data-slot": "disclosure-indicator"
          }
        )
      ]
    }
  );
}
function DisclosurePanel({
  className,
  children,
  keepMounted = true,
  ...props
}) {
  const variant = reactExports.useContext(DisclosureContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsiblePanel,
    {
      className: "h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-(--qy-duration-base) ease-(--qy-ease-out) data-ending-style:h-0 data-starting-style:h-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-(--qy-duration-fast)",
      "data-slot": "disclosure-panel",
      keepMounted,
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "min-w-0",
            variant === "plain" && "pt-3",
            variant === "inset" && "px-4 pb-4",
            variant === "separated" && "pb-4",
            className
          ),
          "data-slot": "disclosure-content",
          children
        }
      )
    }
  );
}
export {
  Disclosure as D,
  DisclosureTrigger as a,
  DisclosurePanel as b
};
