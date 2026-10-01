import { j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
import { C as CollapsibleRoot, a as CollapsibleTrigger$1, b as CollapsiblePanel$1 } from "./CollapsiblePanel-B5cYZztf.js";
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleRoot, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleTrigger$1,
    {
      className,
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsiblePanel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsiblePanel$1,
    {
      className: cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0",
        className
      ),
      "data-slot": "collapsible-panel",
      ...props
    }
  );
}
export {
  Collapsible as C,
  CollapsiblePanel as a,
  CollapsibleTrigger as b
};
