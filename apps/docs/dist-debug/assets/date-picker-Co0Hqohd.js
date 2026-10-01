import { q as useUILocale, r as reactExports, j as jsxRuntimeExports, e as cn, bp as X } from "./index-DM02Iz28.js";
import { C as Calendar } from "./calendar-D2f3pu0H.js";
import { P as Popover, a as PopoverTrigger, b as PopoverPopup } from "./popover-BKcHrCxN.js";
import { s as selectTriggerIconClassName, e as selectTriggerVariants } from "./select-D8_OW39t.js";
import { C as Calendar$1 } from "./calendar-DI6AfLRW.js";
const pad = (value, width = 2) => String(value).padStart(width, "0");
function formatLocalDate(date) {
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
const datePickerTriggerVariants = selectTriggerVariants;
function DatePickerTrigger({
  className,
  size = "default",
  placeholder,
  icon,
  valueId,
  children,
  disabled,
  type = "button",
  ...props
}) {
  const empty = children === void 0 || children === null || children === "" || children === false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: cn(datePickerTriggerVariants({ size }), "min-w-0", className),
      "data-disabled": disabled ? "" : void 0,
      "data-placeholder": empty ? "" : void 0,
      disabled,
      type,
      ...props,
      "data-slot": "date-picker-trigger",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "min-w-0 flex-1 truncate numeric in-data-placeholder:text-muted-foreground",
            "data-slot": "date-picker-value",
            id: valueId,
            children: empty ? placeholder : children
          }
        ),
        icon === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar$1, { "aria-hidden": "true", className: selectTriggerIconClassName, "data-slot": "date-picker-icon" }) : icon
      ]
    }
  );
}
function DatePickerClear({
  className,
  size = "default",
  type = "button",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: cn(
        "qy-pressable touch-target absolute top-1/2 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-foreground opacity-72 outline-none transition-[opacity,background-color] hover:bg-accent hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring sm:size-6 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        size === "sm" ? "end-0.5" : "end-1",
        className
      ),
      "data-slot": "date-picker-clear",
      type,
      ...props
    }
  );
}
function DatePicker({
  value,
  defaultValue = null,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  name,
  required,
  disabled = false,
  placeholder,
  clearable = true,
  clearLabel,
  formatDate,
  locale,
  disabledDates,
  calendarProps,
  size = "default",
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  onKeyDown,
  ...triggerProps
}) {
  const { code, messages } = useUILocale();
  const [internal, setInternal] = reactExports.useState(defaultValue);
  const [internalOpen, setInternalOpen] = reactExports.useState(defaultOpen);
  const triggerRef = reactExports.useRef(null);
  const valueId = reactExports.useId();
  const raw = value === void 0 ? internal : value;
  const date = raw && !Number.isNaN(raw.getTime()) ? raw : null;
  const open = (openProp ?? internalOpen) && !disabled;
  const format = formatDate ?? ((day) => new Intl.DateTimeFormat(locale?.code ?? code, { dateStyle: "medium" }).format(day));
  const setOpen = (next) => {
    if (openProp === void 0) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const update = (next) => {
    if (value === void 0) setInternal(next);
    onValueChange?.(next);
  };
  const clear = () => {
    update(null);
    triggerRef.current?.focus();
  };
  const showClear = clearable && date !== null && !disabled;
  const labelledBy = ariaLabelledBy ? `${ariaLabelledBy} ${valueId}` : void 0;
  const describedBy = !ariaLabelledBy && (ariaLabel || id) && date ? [valueId, ariaDescribedBy].filter(Boolean).join(" ") : ariaDescribedBy;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative flex w-full min-w-0", className), "data-slot": "date-picker", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PopoverTrigger,
        {
          render: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DatePickerTrigger,
            {
              ...triggerProps,
              "aria-describedby": describedBy,
              "aria-label": ariaLabel,
              "aria-labelledby": labelledBy,
              "aria-required": required || void 0,
              disabled,
              icon: showClear ? null : void 0,
              id,
              onKeyDown: (event) => {
                onKeyDown?.(event);
                if (!event.defaultPrevented && showClear && (event.key === "Backspace" || event.key === "Delete")) {
                  event.preventDefault();
                  update(null);
                }
              },
              placeholder: placeholder ?? messages.selectDate,
              ref: triggerRef,
              size,
              valueId,
              className: cn(showClear && (size === "sm" ? "pe-8 sm:pe-7" : "pe-9 sm:pe-8"))
            }
          ),
          children: date ? format(date) : null
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverPopup, { align: "start", "aria-label": ariaLabel ?? placeholder ?? messages.selectDate, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Calendar,
        {
          autoFocus: true,
          ...calendarProps,
          mode: "single",
          selected: date ?? void 0,
          ...calendarProps?.defaultMonth || date ? { defaultMonth: calendarProps?.defaultMonth ?? date } : {},
          onSelect: (next) => {
            update(next ?? null);
            setOpen(false);
          },
          ...locale ? { locale } : {},
          ...disabledDates ? { disabled: disabledDates } : {}
        }
      ) })
    ] }),
    showClear ? /* @__PURE__ */ jsxRuntimeExports.jsx(DatePickerClear, { "aria-label": clearLabel ?? messages.clearDate, onClick: clear, size, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { "aria-hidden": "true" }) }) : null,
    name ? /* @__PURE__ */ jsxRuntimeExports.jsx("input", { disabled, name, type: "hidden", value: date ? formatLocalDate(date) : "" }) : null
  ] });
}
export {
  DatePicker as D,
  DatePickerTrigger as a,
  DatePickerClear as b,
  formatLocalDate as f
};
