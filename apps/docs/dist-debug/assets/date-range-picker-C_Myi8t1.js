import { q as useUILocale, r as reactExports, j as jsxRuntimeExports, e as cn, B as Button, bp as X } from "./index-DM02Iz28.js";
import { u as useMediaQuery } from "./use-media-query-CGVr0VA1.js";
import { C as Calendar } from "./calendar-D2f3pu0H.js";
import { a as DatePickerTrigger, b as DatePickerClear, f as formatLocalDate } from "./date-picker-Co0Hqohd.js";
import { P as Popover, a as PopoverTrigger, b as PopoverPopup } from "./popover-BKcHrCxN.js";
const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const sameDay = (a, b) => Boolean(a && b && formatLocalDate(a) === formatLocalDate(b));
function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}
function complete(range) {
  if (!range || !isValidDate(range.from) || !isValidDate(range.to)) return null;
  return range.from <= range.to ? { from: range.from, to: range.to } : { from: range.to, to: range.from };
}
function resolvePreset(preset) {
  return complete(typeof preset.value === "function" ? preset.value() : preset.value);
}
function DateRangePicker({
  value,
  defaultValue = null,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  startName,
  endName,
  required,
  disabled = false,
  placeholder,
  presets,
  clearable = true,
  clearLabel,
  formatDate,
  formatRange,
  numberOfMonths,
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
  const [internal, setInternal] = reactExports.useState(
    defaultValue
  );
  const [internalOpen, setInternalOpen] = reactExports.useState(defaultOpen);
  const [anchor, setAnchor] = reactExports.useState(null);
  const [hovered, setHovered] = reactExports.useState(null);
  const triggerRef = reactExports.useRef(null);
  const valueId = reactExports.useId();
  const wide = useMediaQuery("(min-width: 768px)");
  const range = complete(value === void 0 ? internal : value);
  const open = (openProp ?? internalOpen) && !disabled;
  const localeCode = locale?.code ?? code;
  const setOpen = (next) => {
    setAnchor(null);
    setHovered(null);
    if (openProp === void 0) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const update = (next) => {
    if (value === void 0) setInternal(next);
    onValueChange?.(next);
  };
  const formatDay = reactExports.useCallback(
    (date, withYear = true) => {
      if (formatDate) return formatDate(date);
      const options = withYear ? { dateStyle: "medium" } : { month: localeCode.startsWith("zh") ? "long" : "short", day: "numeric" };
      return new Intl.DateTimeFormat(localeCode, options).format(date);
    },
    [formatDate, localeCode]
  );
  const display = (from, to) => {
    if (!to) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        formatDay(from),
        " –",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", "data-slot": "date-range-picker-pending", children: messages.endDate })
      ] });
    }
    if (formatRange) return formatRange({ from, to });
    if (sameDay(from, to)) return formatDay(from);
    if (formatDate) return `${formatDate(from)} – ${formatDate(to)}`;
    if (localeCode.startsWith("zh")) {
      return `${formatDay(from)} – ${formatDay(to, from.getFullYear() !== to.getFullYear())}`;
    }
    return new Intl.DateTimeFormat(localeCode, { dateStyle: "medium" }).formatRange(from, to);
  };
  const pick = (day) => {
    if (!anchor) {
      setAnchor(startOfDay(day));
      return;
    }
    const next = day < anchor ? { from: startOfDay(day), to: anchor } : { from: anchor, to: startOfDay(day) };
    update(next);
    setOpen(false);
    triggerRef.current?.focus();
  };
  const applyPreset = (preset) => {
    const next = resolvePreset(preset);
    if (!next) return;
    update({ from: startOfDay(next.from), to: startOfDay(next.to) });
    setOpen(false);
    triggerRef.current?.focus();
  };
  const clear = () => {
    update(null);
    triggerRef.current?.focus();
  };
  const selected = anchor ? { from: anchor, to: void 0 } : range ?? void 0;
  const preview = anchor && hovered && !sameDay(anchor, hovered) ? hovered < anchor ? { from: hovered, to: anchor, forward: false } : { from: anchor, to: hovered, forward: true } : null;
  const shown = anchor ? display(anchor, void 0) : range ? display(range.from, range.to) : null;
  const showClear = clearable && range !== null && !disabled && !anchor;
  const labelledBy = ariaLabelledBy ? `${ariaLabelledBy} ${valueId}` : void 0;
  const describedBy = !ariaLabelledBy && (ariaLabel || id) && shown ? [valueId, ariaDescribedBy].filter(Boolean).join(" ") : ariaDescribedBy;
  const months = numberOfMonths ?? (wide ? 2 : 1);
  const popupLabel = ariaLabel ?? placeholder ?? messages.selectDateRange;
  const defaultMonth = calendarProps?.defaultMonth ?? range?.from;
  const previewModifiers = preview ? {
    previewMiddle: (date) => date > preview.from && date < preview.to && !sameDay(date, preview.to),
    previewEnd: (date) => sameDay(date, preview.forward ? preview.to : preview.from),
    previewAnchor: (date) => sameDay(date, anchor ?? void 0)
  } : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative flex w-full min-w-0", className), "data-slot": "date-range-picker", children: [
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
              className: cn(showClear && (size === "sm" ? "pe-8 sm:pe-7" : "pe-9 sm:pe-8")),
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
              placeholder: placeholder ?? messages.selectDateRange,
              ref: triggerRef,
              size,
              valueId
            }
          ),
          children: shown
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverPopup, { align: "start", "aria-label": popupLabel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col gap-2 md:flex-row",
          "data-slot": "date-range-picker-content",
          children: [
            presets?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-label": messages.selectDateRange,
                className: "-mx-2 -mt-2 flex shrink-0 gap-1 overflow-x-auto border-b p-2 [scrollbar-width:none] md:mx-0 md:-ms-2 md:-my-2 md:w-32 md:flex-col md:overflow-visible md:border-e md:border-b-0",
                "data-slot": "date-range-picker-presets",
                role: "group",
                children: presets.map((preset) => {
                  const resolved = resolvePreset(preset);
                  const active = Boolean(
                    resolved && range && !anchor && sameDay(resolved.from, range.from) && sameDay(resolved.to, range.to)
                  );
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      "aria-pressed": active,
                      className: "shrink-0 justify-start font-normal aria-pressed:bg-accent aria-pressed:font-medium md:w-full",
                      onClick: () => applyPreset(preset),
                      size: "sm",
                      variant: "ghost",
                      children: preset.label
                    },
                    preset.label
                  );
                })
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Calendar,
              {
                autoFocus: true,
                ...calendarProps,
                className: cn("max-md:mx-auto", calendarProps?.className),
                ...defaultMonth ? { defaultMonth } : {},
                mode: "range",
                showOutsideDays: calendarProps?.showOutsideDays ?? months === 1,
                modifiers: { ...calendarProps?.modifiers, ...previewModifiers },
                modifiersClassNames: {
                  ...calendarProps?.modifiersClassNames,
                  previewAnchor: cn(
                    preview?.forward ? "[&>button]:rounded-e-none" : "[&>button]:rounded-s-none"
                  ),
                  previewEnd: cn(
                    "[&>button]:bg-accent",
                    preview?.forward ? "[&>button]:rounded-s-none" : "[&>button]:rounded-e-none"
                  ),
                  previewMiddle: "[&>button]:rounded-none [&>button]:bg-accent"
                },
                numberOfMonths: months,
                onDayFocus: (day) => setHovered(day),
                onDayMouseEnter: (day) => setHovered(day),
                onSelect: (_range, day) => pick(day),
                selected,
                ...locale ? { locale } : {},
                ...disabledDates ? { disabled: disabledDates } : {}
              }
            )
          ]
        }
      ) })
    ] }),
    showClear ? /* @__PURE__ */ jsxRuntimeExports.jsx(DatePickerClear, { "aria-label": clearLabel ?? messages.clear, onClick: clear, size, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { "aria-hidden": "true" }) }) : null,
    startName ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        disabled,
        name: startName,
        type: "hidden",
        value: range ? formatLocalDate(range.from) : ""
      }
    ) : null,
    endName ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        disabled,
        name: endName,
        type: "hidden",
        value: range ? formatLocalDate(range.to) : ""
      }
    ) : null
  ] });
}
export {
  DateRangePicker as D
};
