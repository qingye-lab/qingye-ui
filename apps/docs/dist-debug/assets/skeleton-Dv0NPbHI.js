import { j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "animate-skeleton rounded-sm [--skeleton-highlight:--alpha(var(--color-white)/64%)] [background:linear-gradient(120deg,transparent_40%,var(--skeleton-highlight),transparent_60%)_var(--color-muted)_0_0/200%_100%_fixed] dark:[--skeleton-highlight:--alpha(var(--color-white)/4%)]",
        className
      ),
      "data-slot": "skeleton",
      ...props
    }
  );
}
export {
  Skeleton as S
};
