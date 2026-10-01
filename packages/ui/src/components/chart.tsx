"use client";

// Recharts integration in the shape of shadcn/ui's chart: a config maps each
// series key to a label and colour, exposed as `--color-<key>` on the
// container so marks can use `var(--color-<key>)`. `recharts` is an optional
// peer dependency; install it to use this module.
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type {
  LegendPayload,
  TooltipContentProps,
  TooltipPayloadEntry,
} from "recharts";
import { useUILocale } from "../locale";
import { cn } from "../utils";

/** Theme selectors for `theme`-based colours; light is the unscoped default. */
const THEMES = {
  dark: ':is(.dark, [data-theme="dark"])',
  light: "",
} as const;

type ChartTheme = keyof typeof THEMES;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<ChartTheme, string> }
  )
>;

type ChartContextValue = { config: ChartConfig };

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart(): ChartContextValue {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("Chart parts must be used within <ChartContainer />");
  }
  return context;
}

// Series without a colour take the categorical tokens in config order, so an
// entity keeps its hue when others are filtered out. Past five, fall back to a
// neutral rather than inventing hues.
function fallbackColor(position: number): string {
  return position < 5
    ? `var(--chart-${position + 1})`
    : "var(--color-muted-foreground)";
}

function colorVariables(config: ChartConfig): React.CSSProperties {
  const style: Record<string, string> = {};
  Object.entries(config).forEach(([key, item], position) => {
    if (item.theme) return;
    style[`--color-${key}`] = item.color ?? fallbackColor(position);
  });
  return style as React.CSSProperties;
}

export function ChartStyle({
  id,
  config,
}: {
  id: string;
  config: ChartConfig;
}): React.ReactElement | null {
  const themed = Object.entries(config).filter(([, item]) => item.theme);
  if (!themed.length) return null;

  const css = (Object.entries(THEMES) as [ChartTheme, string][])
    .map(([theme, scope]) => {
      const declarations = themed
        .map(([key, item]) => {
          const color = item.theme?.[theme];
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");
      return `${scope ? `${scope} ` : ""}[data-chart="${id}"] {\n${declarations}\n}`;
    })
    .join("\n");

  // biome-ignore lint/security/noDangerouslySetInnerHtml: generated from config keys and colours
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export interface ChartContainerProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
  /** Size used before the container is measured (server render, tests). */
  initialDimension?: { width: number; height: number };
}

/**
 * Sizes a Recharts chart to its box (default 16:9; override with `aspect-*`
 * or a height) and restyles Recharts' defaults to the library's quiet chrome.
 */
export function ChartContainer({
  id,
  className,
  style,
  children,
  config,
  initialDimension = { height: 200, width: 320 },
  ...props
}: ChartContainerProps): React.ReactElement {
  const uniqueId = React.useId();
  const chartId = `chart-${(id ?? uniqueId).replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const context = React.useMemo(() => ({ config }), [config]);

  return (
    <ChartContext.Provider value={context}>
      <div
        className={cn(
          "flex aspect-video min-w-0 justify-center rounded-md text-xs outline-none",
          // Axes and grid: hairlines in the border colour, muted figures.
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-axis-tick_text]:tabular-nums [&_.recharts-polar-angle-axis-tick_text]:fill-muted-foreground [&_.recharts-polar-radius-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-axis-line[stroke='#666']]:stroke-border-strong [&_.recharts-cartesian-axis-tick-line[stroke='#666']]:stroke-border-strong [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border-strong",
          // Hover: a hairline crosshair on lines and areas, a faint band on bars.
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border-strong [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
          // Dots and slices are ringed in the surface colour instead of white.
          "[&_.recharts-dot[stroke='#fff']]:stroke-card [&_.recharts-sector[stroke='#fff']]:stroke-card",
          "[&_.recharts-label]:fill-muted-foreground [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
          // Recharts' keyboard layer focuses the surface; show it like any control.
          "has-[.recharts-surface:focus-visible]:ring-2 has-[.recharts-surface:focus-visible]:ring-ring has-[.recharts-surface:focus-visible]:ring-offset-1 has-[.recharts-surface:focus-visible]:ring-offset-background",
          className,
        )}
        data-chart={chartId}
        data-slot="chart"
        style={{ ...colorVariables(config), ...style }}
        {...props}
      >
        <ChartStyle config={config} id={chartId} />
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={initialDimension}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export const ChartTooltip: typeof RechartsPrimitive.Tooltip =
  RechartsPrimitive.Tooltip;

type ChartValue = TooltipPayloadEntry["value"];

export type ChartTooltipContentProps = Partial<
  Pick<
    TooltipContentProps,
    "active" | "payload" | "label" | "labelFormatter" | "formatter"
  >
> & {
  className?: string;
  labelClassName?: string;
  /** Hide the heading row (the category or time under the pointer). */
  hideLabel?: boolean;
  hideIndicator?: boolean;
  /** Series key: a dot, a vertical line, or a dashed line. */
  indicator?: "dot" | "line" | "dashed";
  /** Payload field used to look up the series in `config`. */
  nameKey?: string;
  /** Payload field used to look up the heading in `config`. */
  labelKey?: string;
  /** Forces one indicator colour for every row. */
  color?: string;
  /** Formats each value; numbers default to locale grouping (1,284). */
  valueFormatter?: (
    value: NonNullable<ChartValue>,
    name: string,
    item: TooltipPayloadEntry,
  ) => React.ReactNode;
};

// Finds the config entry for a payload item: the item may name its series
// directly (`dataKey`, `name`) or through a field of its datum (`nameKey`).
function resolveConfigKey(
  config: ChartConfig,
  payload: unknown,
  key: string,
): string {
  if (typeof payload !== "object" || payload === null) return key;
  const record = payload as Record<string, unknown>;
  const inner =
    typeof record.payload === "object" && record.payload !== null
      ? (record.payload as Record<string, unknown>)
      : undefined;
  const candidate =
    typeof record[key] === "string"
      ? (record[key] as string)
      : inner && typeof inner[key] === "string"
        ? (inner[key] as string)
        : undefined;
  return candidate !== undefined && candidate in config ? candidate : key;
}

function getPayloadConfig(
  config: ChartConfig,
  payload: unknown,
  key: string,
): ChartConfig[string] | undefined {
  return config[resolveConfigKey(config, payload, key)];
}

// Recharts sorts tooltip and legend rows by name; list series in config order
// instead, so rows read the same everywhere. Unknown keys keep their order last.
function orderByConfig<T>(
  config: ChartConfig,
  items: readonly T[],
  keyOf: (item: T) => string,
): T[] {
  const order = Object.keys(config);
  const rank = (item: T): number => {
    const position = order.indexOf(keyOf(item));
    return position === -1 ? order.length : position;
  };
  return items
    .map((item, index) => ({ index, item, rank: rank(item) }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map((entry) => entry.item);
}

/** Tooltip surface for `<ChartTooltip content={<ChartTooltipContent />} />`. */
export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  formatter,
  className,
  labelClassName,
  hideLabel = false,
  hideIndicator = false,
  indicator = "dot",
  nameKey,
  labelKey,
  color,
  valueFormatter,
}: ChartTooltipContentProps): React.ReactElement | null {
  const { config } = useChart();
  const { code } = useUILocale();

  if (!active || !payload?.length) return null;

  const itemKey = (item: TooltipPayloadEntry): string =>
    `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
  const items = orderByConfig(
    config,
    payload.filter((item) => item.type !== "none"),
    (item) => resolveConfigKey(config, item, itemKey(item)),
  );
  const [first] = items;

  let heading: React.ReactNode = null;
  if (!hideLabel && first) {
    const key = `${labelKey ?? first.dataKey ?? first.name ?? "value"}`;
    const itemConfig = getPayloadConfig(config, first, key);
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : (itemConfig?.label ?? label);
    const content = labelFormatter ? labelFormatter(value, payload) : value;
    if (content !== undefined && content !== null && content !== "") {
      heading = (
        <div
          className={cn("font-medium text-foreground", labelClassName)}
          data-slot="chart-tooltip-label"
        >
          {content}
        </div>
      );
    }
  }

  const nestLabel = items.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "relative grid min-w-32 items-start gap-1.5 rounded-lg border bg-popover not-dark:bg-clip-padding px-2.5 py-2 text-popover-foreground text-xs shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className,
      )}
      data-slot="chart-tooltip"
    >
      {nestLabel ? null : heading}
      <div className="grid gap-1.5">
        {items.map((item, index) => {
          const itemConfig = getPayloadConfig(config, item, itemKey(item));
          const indicatorColor =
            color ??
            (item.payload as { fill?: string } | undefined)?.fill ??
            item.color;
          const name = itemConfig?.label ?? item.name;
          const hasValue = item.value !== undefined && item.value !== null;

          return (
            <div
              className={cn(
                "flex w-full flex-wrap gap-2 [&>svg]:size-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" ? "items-center" : "items-stretch",
              )}
              data-slot="chart-tooltip-item"
              key={`${item.dataKey ?? item.name ?? index}`}
            >
              {formatter && hasValue && item.name !== undefined ? (
                formatter(
                  item.value as never,
                  item.name as never,
                  item,
                  index,
                  payload,
                )
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : hideIndicator ? null : (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 rounded-[2px] border-(--indicator) bg-(--indicator)",
                        indicator === "dot" && "size-2",
                        indicator === "line" && "w-1",
                        indicator === "dashed" &&
                          "w-0 border-[1.5px] border-dashed bg-transparent",
                        nestLabel && indicator === "dashed" && "my-0.5",
                      )}
                      data-slot="chart-tooltip-indicator"
                      style={
                        { "--indicator": indicatorColor } as React.CSSProperties
                      }
                    />
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between gap-4 leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? heading : null}
                      <span className="text-muted-foreground">{name}</span>
                    </div>
                    {hasValue ? (
                      <span className="font-medium text-foreground tabular-nums">
                        {valueFormatter
                          ? valueFormatter(
                              item.value as NonNullable<ChartValue>,
                              `${item.name ?? ""}`,
                              item,
                            )
                          : typeof item.value === "number"
                            ? item.value.toLocaleString(code)
                            : `${item.value}`}
                        {item.unit ? (
                          <span className="ms-0.5 font-normal text-muted-foreground">
                            {item.unit}
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ChartLegend: typeof RechartsPrimitive.Legend =
  RechartsPrimitive.Legend;

export interface ChartLegendContentProps {
  className?: string;
  payload?: readonly LegendPayload[];
  verticalAlign?: "top" | "middle" | "bottom";
  hideIcon?: boolean;
  /** Payload field used to look up the series in `config`. */
  nameKey?: string;
}

/** Legend for `<ChartLegend content={<ChartLegendContent />} />`. */
export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: ChartLegendContentProps): React.ReactElement | null {
  const { config } = useChart();
  if (!payload?.length) return null;
  const legendKey = (item: LegendPayload): string =>
    `${nameKey ?? item.dataKey ?? "value"}`;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
      data-slot="chart-legend"
    >
      {orderByConfig(
        config,
        payload.filter((item) => item.type !== "none"),
        (item) => resolveConfigKey(config, item, legendKey(item)),
      ).map((item, index) => {
        const itemConfig = getPayloadConfig(config, item, legendKey(item));
        // The swatch mirrors the mark: a stroke for lines, a block otherwise.
        const isLine = item.type === "line" || item.type === "plainline";

        return (
          <div
            className="flex items-center gap-1.5 text-muted-foreground [&>svg]:size-3"
            data-slot="chart-legend-item"
            key={`${item.value ?? index}`}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <span
                aria-hidden="true"
                className={cn(
                  "shrink-0",
                  isLine ? "h-0.5 w-3 rounded-full" : "size-2 rounded-[2px]",
                )}
                style={{ backgroundColor: item.color }}
              />
            )}
            <span>{itemConfig?.label ?? item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

/** The Recharts namespace, so charts can be composed from one import. */
export { RechartsPrimitive };
