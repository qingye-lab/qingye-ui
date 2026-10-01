import { j as jsxRuntimeExports, bf as Separator$1, e as cn } from "./index-DM02Iz28.js";
function Separator({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator$1,
    {
      className: cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch",
        className
      ),
      "data-slot": "separator",
      orientation,
      ...props
    }
  );
}
export {
  Separator as S
};
