import { render, screen, waitFor } from "@testing-library/react";
import { beforeAll, expect, test, vi } from "vitest";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  RechartsPrimitive,
  type ChartConfig,
} from "../src/components/chart";

// jsdom has no layout; give ResponsiveContainer a measurable box so it renders.
beforeAll(() => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
    { bottom: 200, height: 200, left: 0, right: 400, top: 0, width: 400, x: 0, y: 0, toJSON: () => ({}) } as DOMRect,
  );
  for (const [key, value] of [["clientWidth", 400], ["clientHeight", 200], ["offsetWidth", 400], ["offsetHeight", 200]] as const) {
    Object.defineProperty(HTMLElement.prototype, key, { configurable: true, get: () => value });
  }
  globalThis.ResizeObserver = class {
    constructor(private callback: ResizeObserverCallback) {}
    observe(target: Element) {
      this.callback([{ contentRect: { width: 400, height: 200 }, target } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver);
    }
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const config = {
  online: { label: "线上订单", color: "var(--chart-1)" },
  store: { label: "门店订单" },
  delivery: { label: "外卖", theme: { light: "#2563eb", dark: "#60a5fa" } },
} satisfies ChartConfig;

function Harness({ children }: { children: React.ReactNode }) {
  return (
    <ChartContainer config={config} id="orders">
      <RechartsPrimitive.BarChart data={[]}>{children}</RechartsPrimitive.BarChart>
    </ChartContainer>
  );
}

test("exposes series colours as CSS variables, falling back to chart tokens in config order", () => {
  const { container } = render(<Harness>{null}</Harness>);
  const chart = container.querySelector<HTMLElement>("[data-slot=chart]");
  expect(chart?.style.getPropertyValue("--color-online")).toBe("var(--chart-1)");
  expect(chart?.style.getPropertyValue("--color-store")).toBe("var(--chart-2)");
  const css = container.querySelector("style")?.textContent ?? "";
  expect(css).toContain('[data-chart="chart-orders"]');
  expect(css).toContain("--color-delivery: #60a5fa;");
});

test.each(["light", "dark"])("semantic axis styles reach the rendered Cartesian tick text in %s mode", async (theme) => {
  const { container } = render(
    <ChartContainer className={theme} config={config}>
      <RechartsPrimitive.BarChart data={[{ month: "9月", online: 100 }]}>
        <RechartsPrimitive.XAxis dataKey="month" />
        <RechartsPrimitive.YAxis />
        <RechartsPrimitive.Bar dataKey="online" isAnimationActive={false} />
      </RechartsPrimitive.BarChart>
    </ChartContainer>,
  );
  const chart = container.querySelector<HTMLElement>("[data-slot=chart]")!;
  await waitFor(() => {
    expect(chart.querySelectorAll(".recharts-cartesian-axis-tick-label text").length).toBeGreaterThan(0);
  });

  // Exercise our selector against the installed Recharts DOM. jsdom cannot
  // resolve themed CSS variables, but it can catch a rule that never reaches
  // the text, leaving Recharts' default SVG fill visible in either theme.
  const targetsFor = (utility: string) => {
    const targets = new Set<Element>();
    for (const rule of chart.className.matchAll(/\[(&[^\]]+)\]:([^ ]+)/g)) {
      if (rule[2] !== utility) continue;
      const selector = rule[1]!.replaceAll("_", " ").replace("&", ":scope");
      chart.querySelectorAll(selector).forEach((node) => targets.add(node));
    }
    return targets;
  };
  const filled = targetsFor("fill-muted-foreground");
  const numeric = targetsFor("tabular-nums");
  chart.querySelectorAll(".recharts-cartesian-axis-tick-label text").forEach((tick) => {
    expect(filled.has(tick)).toBe(true);
    expect(numeric.has(tick)).toBe(true);
  });
});

test("tooltip lists series in config order with labels and grouped numbers", () => {
  render(
    <ChartContainer config={config}>
      <ChartTooltipContent
        active
        label="9月"
        payload={[
          { dataKey: "store", name: "store", value: 7580, color: "red", graphicalItemId: "b" },
          { dataKey: "online", name: "online", value: 11920, color: "blue", graphicalItemId: "a" },
          { dataKey: "delivery", name: "delivery", value: 0, color: "green", graphicalItemId: "c" },
        ]}
      />
    </ChartContainer>,
  );
  const rows = screen.getAllByText(/订单|外卖/).map((node) => node.textContent);
  expect(rows).toEqual(["线上订单", "门店订单", "外卖"]);
  expect(screen.getByText("9月")).toBeInTheDocument();
  expect(screen.getByText("11,920")).toBeInTheDocument();
  // Zero is a value, not an absence.
  expect(screen.getByText("0")).toBeInTheDocument();
});

test("tooltip renders nothing when inactive", () => {
  const { container } = render(
    <ChartContainer config={config}>
      <ChartTooltipContent active={false} payload={[]} />
    </ChartContainer>,
  );
  expect(container.querySelector("[data-slot=chart-tooltip]")).toBeNull();
});

test("legend mirrors the mark and follows config order", () => {
  const { container } = render(
    <ChartContainer config={config}>
      <ChartLegendContent
        payload={[
          { value: "store", dataKey: "store", type: "rect", color: "red" },
          { value: "online", dataKey: "online", type: "line", color: "blue" },
        ]}
      />
    </ChartContainer>,
  );
  const items = container.querySelectorAll("[data-slot=chart-legend-item]");
  expect([...items].map((item) => item.textContent)).toEqual(["线上订单", "门店订单"]);
  expect(items[0]?.querySelector("span")).toHaveClass("h-0.5");
});
