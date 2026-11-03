import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Chart } from "../src/components/chart";
import { ScatterChart } from "../src/components/scatter-chart";

// jsdom 量不出容器尺寸，ResponsiveContainer 不出图；这里给定宽高，让轴的文字真的画出来。
vi.mock("recharts", async importOriginal => ({
  ...await importOriginal<typeof import("recharts")>(),
  ResponsiveContainer: ({ children }: { children: React.ReactElement<{ width?: number; height?: number }> }) => React.cloneElement(children, { width: 600, height: 200 }),
}));

const texts = (root: Element) => [...root.querySelectorAll("svg text")].map(node => node.textContent ?? "");

test("a horizontal bar chart truncates an overlong name on the axis and keeps short names whole", () => {
  const LONG = "华东区域第三物流分拨中心冷链仓储运营".repeat(2);
  const { container } = render(<Chart type="bar-horizontal" label="分拨量" categoryLabel="仓" valueLabel="量" series={[{ key: "v", label: "值" }]} rows={[{ id: "a", label: LONG, values: { v: 90 } }, { id: "b", label: "华南仓", values: { v: 60 } }]} />);
  const drawn = texts(container);
  expect(drawn).toContain("华南仓");
  expect(drawn).not.toContain(LONG);
  expect(drawn.some(text => text.endsWith("…") && LONG.startsWith(text.slice(0, -1)))).toBe(true);
});

test("two rows sharing a name both draw that name on the axis, never their ids", () => {
  const rows = [{ id: "first", label: "同名", values: { v: 10 } }, { id: "second", label: "同名", values: { v: 20 } }];
  const props = { label: "图", categoryLabel: "仓", valueLabel: "量", series: [{ key: "v", label: "值" }], rows };
  for (const type of ["bar", "bar-horizontal", "line"] as const) {
    const { container, unmount } = render(<Chart {...props} type={type} />);
    const drawn = texts(container);
    expect(drawn.filter(text => text === "同名"), type).toHaveLength(2);
    expect(drawn.join(" "), type).not.toMatch(/first|second/);
    unmount();
  }
});

test("hovering either of two rows sharing a name reads that row, under the name", async () => {
  const { container } = render(<Chart type="bar" label="图" categoryLabel="仓" valueLabel="量" series={[{ key: "v", label: "值" }]} rows={[{ id: "first", label: "同名", values: { v: 10 } }, { id: "second", label: "同名", values: { v: 20 } }]} formatValue={(value, _key, row) => `${row.id}:${value}`} />);
  const wrapper = container.querySelector(".recharts-wrapper")!;
  wrapper.getBoundingClientRect = () => ({ x: 0, y: 0, left: 0, top: 0, right: 600, bottom: 200, width: 600, height: 200, toJSON: () => ({}) });
  for (const [clientX, reading] of [[200, "first:10"], [450, "second:20"]] as const) {
    fireEvent.mouseMove(wrapper, { clientX, clientY: 100 });
    await waitFor(() => expect(container.querySelector(".recharts-tooltip-wrapper")?.textContent).toContain(reading));
    expect(container.querySelector(".recharts-tooltip-wrapper")?.textContent).toContain("同名");
  }
});

test("scatter axes read strings and numbers from formatX and formatY and fall back when given a node", () => {
  const points = [{ id: "a", label: "甲", x: 100, y: 1000 }, { id: "b", label: "乙", x: 900, y: 9000 }];
  const props = { label: "图", xLabel: "X", yLabel: "Y", series: [{ key: "s", label: "S", points }] };
  const nodes = render(<ScatterChart {...props} formatX={value => <b>{value}</b>} formatY={value => <b>{value}</b>} />);
  expect(texts(nodes.container).length).toBeGreaterThan(0);
  expect(texts(nodes.container).join(" ")).not.toContain("[object Object]");
  expect(texts(nodes.container)).toContain("2,000");
  nodes.unmount();
  const strings = render(<ScatterChart {...props} formatY={value => `${value} 元`} />);
  expect(texts(strings.container)).toContain("2000 元");
});
