import { q as useUILocale, j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
import { C as ChevronsUpDown } from "./chevrons-up-down-BLzcfRd-.js";
import { F as FieldControl } from "./FieldControl-CFc5_9rC.js";
function NativeSelect({
  className,
  selectClassName,
  size = "default",
  placeholder,
  children,
  onValueChange,
  value,
  defaultValue,
  required,
  "aria-invalid": ariaInvalid,
  ...props
}) {
  const { messages } = useUILocale();
  const placeholderText = placeholder === true ? messages.selectPlaceholder : placeholder || void 0;
  const initialValue = value === void 0 && defaultValue === void 0 && placeholderText ? "" : defaultValue;
  const invalid = ariaInvalid === false || ariaInvalid === "false" ? void 0 : ariaInvalid;
  const controlProps = {
    ...props,
    ...value !== void 0 ? { value } : {},
    ...initialValue !== void 0 ? { defaultValue: initialValue } : {},
    "aria-invalid": invalid,
    required,
    onValueChange: (next) => onValueChange?.(next)
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "relative inline-flex w-full min-w-36 rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base text-foreground shadow-xs/5 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-[select:disabled]:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:border-ring has-focus-visible:ring-[3px] has-aria-invalid:border-destructive/36 has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-[select:disabled]:pointer-events-none has-[select:disabled]:opacity-64 has-[select:disabled,select:focus-visible,select[aria-invalid=true]]:shadow-none sm:text-sm dark:bg-input/32 dark:has-aria-invalid:ring-destructive/24 dark:not-has-[select:disabled]:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className
      ),
      "data-size": size,
      "data-slot": "native-select-control",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          FieldControl,
          {
            className: cn(
              "h-8.5 w-full min-w-0 cursor-default appearance-none truncate rounded-[inherit] bg-transparent ps-[calc(--spacing(3)-1px)] pe-[calc(--spacing(8.5)-1px)] text-foreground outline-none pointer-coarse:min-h-[calc(var(--qy-touch-target)-2px)] has-[option[value='']:checked]:text-muted-foreground/72 sm:h-7.5 sm:pe-[calc(--spacing(8)-1px)] [&_optgroup]:bg-popover [&_optgroup]:text-muted-foreground [&_option]:bg-popover [&_option]:text-popover-foreground",
              size === "sm" && "h-7.5 ps-[calc(--spacing(2.5)-1px)] pe-[calc(--spacing(7.5)-1px)] sm:h-6.5 sm:pe-[calc(--spacing(7)-1px)]",
              size === "lg" && "h-9.5 sm:h-8.5",
              selectClassName
            ),
            "data-slot": "native-select",
            render: /* @__PURE__ */ jsxRuntimeExports.jsx("select", {}),
            ...controlProps,
            children: [
              placeholderText ? /* @__PURE__ */ jsxRuntimeExports.jsx("option", { disabled: required, value: "", children: placeholderText }) : null,
              children
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronsUpDown,
          {
            "aria-hidden": "true",
            className: cn(
              "pointer-events-none absolute top-1/2 size-4.5 -translate-y-1/2 opacity-80 sm:size-4",
              size === "sm" ? "end-[calc(--spacing(1.5)-1px)]" : "end-[calc(--spacing(2)-1px)]"
            ),
            "data-slot": "native-select-icon"
          }
        )
      ]
    }
  );
}
function NativeSelectOption({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className, "data-slot": "native-select-option", ...props });
}
function NativeSelectOptGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "optgroup",
    {
      className,
      "data-slot": "native-select-optgroup",
      ...props
    }
  );
}
export {
  NativeSelect as N,
  NativeSelectOption as a,
  NativeSelectOptGroup as b
};
