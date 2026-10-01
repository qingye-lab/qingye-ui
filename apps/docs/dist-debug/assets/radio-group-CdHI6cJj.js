import { j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
import { R as RadioGroup$1, a as RadioRoot } from "./RadioGroup-BEp5uKmZ.js";
import { R as RadioIndicator } from "./RadioIndicator-BxMi2w3T.js";
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RadioGroup$1,
    {
      className: cn("flex flex-col gap-3", className),
      "data-slot": "radio-group",
      ...props
    }
  );
}
function Radio({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RadioRoot,
    {
      className: cn(
        "touch-target relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-full border border-input bg-background not-dark:bg-clip-padding shadow-xs/5 outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-full not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 data-disabled:cursor-not-allowed data-disabled:opacity-64 sm:size-4 dark:not-data-checked:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [[data-disabled],[data-checked],[aria-invalid]]:shadow-none",
        className
      ),
      "data-slot": "radio",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioIndicator,
        {
          keepMounted: true,
          className: "absolute -inset-px flex size-4.5 items-center justify-center rounded-full transition-[opacity,scale,background-color] duration-(--qy-duration-fast) ease-out before:size-2 before:rounded-full before:bg-primary-foreground data-unchecked:scale-90 data-unchecked:opacity-0 data-checked:bg-primary sm:size-4 sm:before:size-1.5",
          "data-slot": "radio-indicator"
        }
      )
    }
  );
}
export {
  RadioGroup as R,
  Radio as a
};
