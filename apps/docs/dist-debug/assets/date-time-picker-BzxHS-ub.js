import { q as useUILocale, r as reactExports, j as jsxRuntimeExports, e as cn, B as Button, bp as X } from "./index-DM02Iz28.js";
import { C as Calendar } from "./calendar-D2f3pu0H.js";
import { a as DatePickerTrigger, f as formatLocalDate, b as DatePickerClear } from "./date-picker-Co0Hqohd.js";
import { I as Input } from "./input-D9i-AULz.js";
import { P as Popover, a as PopoverTrigger, b as PopoverPopup, c as PopoverTitle } from "./popover-BKcHrCxN.js";
function formatLocalDateTime(date) {
  const pad = (number, width = 2) => String(number).padStart(width, "0");
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
}
function parseLocalDateTime(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?$/.test(value)) return void 0;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime()) || formatLocalDateTime(date).slice(0, 16) !== value.slice(0, 16)) return void 0;
  return date;
}
function DateTimePicker({
  label,
  value,
  defaultValue = "",
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  name,
  required,
  readOnly = false,
  disabled = false,
  placeholder,
  step = 60,
  defaultTime = "00:00",
  clearable = true,
  clearLabel,
  formatValue,
  locale,
  disabledDates,
  calendarProps,
  size = "default",
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...triggerProps
}) {
  const { code, messages } = useUILocale();
  const generatedId = reactExports.useId();
  const fieldId = id ?? generatedId;
  const triggerRef = reactExports.useRef(null);
  const valueId = reactExports.useId();
  const [localValue, setLocalValue] = reactExports.useState(defaultValue);
  const [internalOpen, setInternalOpen] = reactExports.useState(defaultOpen);
  const current = value ?? localValue;
  const date = parseLocalDateTime(current);
  const time = date ? current.split("T")[1] ?? defaultTime : defaultTime;
  const open = (openProp ?? internalOpen) && !disabled && !readOnly;
  const withSeconds = step < 60;
  const popupLabel = label ? messages.selectDateTime(label) : messages.selectDateTimePlaceholder;
  const format = formatValue ?? ((moment) => new Intl.DateTimeFormat(locale?.code ?? code, {
    dateStyle: "medium",
    timeStyle: withSeconds ? "medium" : "short"
  }).format(moment));
  const setOpen = (next) => {
    if (openProp === void 0) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const update = (next) => {
    if (value === void 0) setLocalValue(next);
    onValueChange?.(next);
  };
  const showClear = clearable && date !== void 0 && !disabled && !readOnly;
  const labelledBy = ariaLabelledBy ? `${ariaLabelledBy} ${valueId}` : void 0;
  const describedBy = !ariaLabelledBy && (ariaLabel || id) && date ? [valueId, ariaDescribedBy].filter(Boolean).join(" ") : ariaDescribedBy;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative flex w-full min-w-0", className), "data-slot": "date-time-picker", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: (next) => !readOnly && setOpen(next), children: [
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
              "aria-readonly": readOnly || void 0,
              "aria-required": required || void 0,
              className: cn(showClear && (size === "sm" ? "pe-8 sm:pe-7" : "pe-9 sm:pe-8")),
              disabled,
              icon: showClear ? null : void 0,
              id: fieldId,
              placeholder: placeholder ?? messages.selectDateTimePlaceholder,
              ref: triggerRef,
              size,
              valueId
            }
          ),
          children: date ? format(date) : null
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverPopup, { align: "start", "aria-label": popupLabel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTitle, { className: "sr-only", children: popupLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Calendar,
          {
            autoFocus: true,
            ...calendarProps,
            mode: "single",
            selected: date,
            ...calendarProps?.defaultMonth || date ? { defaultMonth: calendarProps?.defaultMonth ?? date } : {},
            onSelect: (next) => {
              if (next) update(`${formatLocalDate(next)}T${time}`);
            },
            ...locale ? { locale } : {},
            ...disabledDates ? { disabled: disabledDates } : {}
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "-mx-2 mt-2 flex items-center gap-2 border-t px-3 pt-2",
            "data-slot": "date-time-picker-footer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "shrink-0 text-muted-foreground text-sm", htmlFor: `${fieldId}-time`, children: messages.time }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "w-auto",
                  id: `${fieldId}-time`,
                  nativeInput: true,
                  onChange: (event) => {
                    if (!event.target.value) return;
                    update(`${formatLocalDate(date ?? /* @__PURE__ */ new Date())}T${event.target.value}`);
                  },
                  size: "sm",
                  step,
                  type: "time",
                  value: withSeconds ? time : time.slice(0, 5)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ms-auto flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => {
                      const now = formatLocalDateTime(/* @__PURE__ */ new Date());
                      update(withSeconds ? now.slice(0, 19) : now.slice(0, 16));
                    },
                    size: "sm",
                    variant: "ghost",
                    children: messages.now
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setOpen(false), size: "sm", variant: "outline", children: messages.done })
              ] })
            ]
          }
        )
      ] })
    ] }),
    showClear ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      DatePickerClear,
      {
        "aria-label": clearLabel ?? messages.clearDate,
        onClick: () => {
          update("");
          triggerRef.current?.focus();
        },
        size,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { "aria-hidden": "true" })
      }
    ) : null,
    name ? /* @__PURE__ */ jsxRuntimeExports.jsx("input", { disabled, name, type: "hidden", value: date ? current : "" }) : null
  ] });
}
export {
  DateTimePicker as D
};
