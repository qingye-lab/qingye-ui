import { j as jsxRuntimeExports, C as Check, e as cn } from "./index-DM02Iz28.js";
import { M as Minus } from "./minus-CRNaljKP.js";
import { C as CheckboxRoot, a as CheckboxIndicator } from "./CheckboxIndicator-CqP__vRN.js";
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxRoot,
    {
      className: cn(
        "touch-target relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-[.25rem] border border-input bg-background not-dark:bg-clip-padding shadow-xs/5 outline-none ring-ring transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[3px] not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 data-disabled:cursor-not-allowed data-disabled:opacity-64 sm:size-4 dark:not-data-checked:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [[data-disabled],[data-checked],[aria-invalid]]:shadow-none",
        className
      ),
      "data-slot": "checkbox",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          keepMounted: true,
          className: "absolute -inset-px flex items-center justify-center rounded-[.25rem] text-primary-foreground data-unchecked:opacity-0 data-unchecked:scale-90 data-checked:bg-primary data-indeterminate:text-foreground",
          "data-slot": "checkbox-indicator",
          render: (props2, state) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...props2, children: state.indeterminate ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { "aria-hidden": "true", className: "size-3.5 sm:size-3", strokeWidth: 3 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { "aria-hidden": "true", className: "size-3.5 sm:size-3", strokeWidth: 3 }) })
        }
      )
    }
  );
}
export {
  Checkbox as C
};
