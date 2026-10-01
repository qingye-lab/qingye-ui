import { q as useUILocale, j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
function Timeline({
  items,
  children,
  density = "default",
  connector = "solid",
  label,
  className,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ol",
    {
      "aria-label": label ?? messages.timeline,
      className: cn(
        "group/timeline m-0 flex min-w-0 list-none flex-col p-0 [--timeline-dot:--spacing(2)] [--timeline-gap:--spacing(6)] [--timeline-marker:--spacing(6)] data-[density=compact]:[--timeline-dot:--spacing(1.5)] data-[density=compact]:[--timeline-gap:--spacing(3.5)] data-[density=compact]:[--timeline-marker:--spacing(5)]",
        className
      ),
      "data-connector": connector,
      "data-density": density,
      "data-slot": "timeline",
      ...props,
      children: items ? items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineMarker, { status: item.status, children: item.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineTitle, { children: item.title }),
            item.time ? /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineTime, { dateTime: item.dateTime, children: item.time }) : null
          ] }),
          item.description ? /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineDescription, { children: item.description }) : null,
          item.content ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5", children: item.content }) : null
        ] })
      ] }, item.id)) : children
    }
  );
}
function TimelineItem({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      className: cn(
        "relative flex min-w-0 gap-3 pb-(--timeline-gap) last:pb-0",
        "before:pointer-events-none before:absolute before:start-[calc(var(--timeline-marker)/2-0.5px)] before:top-[calc(var(--timeline-marker)+--spacing(1.5))] before:bottom-1.5 before:border-s before:border-input last:before:hidden",
        // Dots are small, so their rail runs from 4px under one dot to 4px above the next.
        "has-[>[data-variant=dot]]:before:top-[calc(var(--timeline-marker)/2_+_var(--timeline-dot)/2_+_--spacing(1))] has-[>[data-variant=dot]]:before:bottom-[calc(var(--timeline-dot)/2_+_--spacing(1)_-_var(--timeline-marker)/2)]",
        "group-data-[connector=dashed]/timeline:before:border-dashed group-data-[connector=none]/timeline:before:hidden",
        className
      ),
      "data-slot": "timeline-item",
      ...props
    }
  );
}
const markerStatusClassNames = {
  default: { dot: "bg-muted-foreground/48", icon: "text-muted-foreground" },
  error: {
    dot: "bg-destructive",
    icon: "border-destructive/24 bg-[color-mix(in_srgb,var(--color-background),var(--color-destructive)_8%)] text-destructive-foreground dark:bg-[color-mix(in_srgb,var(--color-background),var(--color-destructive)_16%)]"
  },
  info: {
    dot: "bg-info",
    icon: "border-info/24 bg-[color-mix(in_srgb,var(--color-background),var(--color-info)_8%)] text-info-foreground dark:bg-[color-mix(in_srgb,var(--color-background),var(--color-info)_16%)]"
  },
  primary: { dot: "bg-primary", icon: "border-primary bg-primary text-primary-foreground" },
  success: {
    dot: "bg-success",
    icon: "border-success/24 bg-[color-mix(in_srgb,var(--color-background),var(--color-success)_8%)] text-success-foreground dark:bg-[color-mix(in_srgb,var(--color-background),var(--color-success)_16%)]"
  },
  warning: {
    dot: "bg-warning",
    icon: "border-warning/32 bg-[color-mix(in_srgb,var(--color-background),var(--color-warning)_10%)] text-warning-foreground dark:bg-[color-mix(in_srgb,var(--color-background),var(--color-warning)_16%)]"
  }
};
function TimelineMarker({
  status = "default",
  variant,
  className,
  children,
  ...props
}) {
  const kind = variant ?? (children == null ? "dot" : "icon");
  const tone = markerStatusClassNames[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: cn(
        "relative flex size-(--timeline-marker) shrink-0 items-center justify-center",
        kind === "icon" && "rounded-full border bg-background shadow-xs/5 [&_svg:not([class*='size-'])]:size-3.5 group-data-[density=compact]/timeline:[&_svg:not([class*='size-'])]:size-3 [&_svg]:shrink-0",
        kind === "icon" && tone.icon,
        className
      ),
      "data-slot": "timeline-marker",
      "data-status": status,
      "data-variant": kind,
      ...props,
      children: kind === "dot" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "size-(--timeline-dot) rounded-full",
            tone.dot
          )
        }
      ) : children
    }
  );
}
function TimelineContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        // Centres the first line of the title on the marker.
        "min-w-0 flex-1 pt-[calc((var(--timeline-marker)-1.25rem)/2)]",
        className
      ),
      "data-slot": "timeline-content",
      ...props
    }
  );
}
function TimelineHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5", className),
      "data-slot": "timeline-header",
      ...props
    }
  );
}
function TimelineTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "min-w-0 font-medium text-foreground text-sm leading-5 [&_strong]:font-medium [&_strong]:text-foreground [&>a:hover]:underline [&>a]:underline-offset-4",
        className
      ),
      "data-slot": "timeline-title",
      ...props
    }
  );
}
function TimelineTime({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "time",
    {
      className: cn("shrink-0 whitespace-nowrap text-muted-foreground text-xs leading-5 numeric", className),
      "data-slot": "timeline-time",
      ...props
    }
  );
}
function TimelineDescription({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "mt-0.5 text-pretty text-muted-foreground text-sm group-data-[density=compact]/timeline:text-xs",
        className
      ),
      "data-slot": "timeline-description",
      ...props
    }
  );
}
export {
  Timeline as T,
  TimelineItem as a,
  TimelineMarker as b,
  TimelineContent as c,
  TimelineHeader as d,
  TimelineTitle as e,
  TimelineTime as f,
  TimelineDescription as g
};
