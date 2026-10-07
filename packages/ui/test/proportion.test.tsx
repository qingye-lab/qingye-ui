import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { Proportion } from "../src/components/proportion";

const parts = [{ key: "doc", label: "文档", value: 30 }, { key: "img", label: "图片", value: 50 }];

test("the legend is the full text equivalent: names, values and shares of the whole", () => {
  render(<Proportion label="存储用量" items={parts} total={100} />);
  const group = screen.getByRole("group", { name: "存储用量" });
  const items = within(group).getAllByRole("listitem").map(item => item.textContent);
  expect(items).toEqual(["文档30（30%）", "图片50（50%）", "其余20（20%）"]);
});

test("parts take ordered series colors and the remainder is the groove, not a sixth color", () => {
  const { container } = render(<Proportion label="来源" items={parts} />);
  const segments = container.querySelectorAll<HTMLElement>("[data-slot=proportion-segment]");
  expect([...segments].map(s => s.style.background)).toEqual(["var(--qy-chart-1)", "var(--qy-chart-2)"]);
  expect(screen.queryByText("其余")).toBeNull();
});

test("a single part is a Meter and an impossible whole is rejected", () => {
  expect(() => render(<Proportion label="x" items={[parts[0]!]} />)).toThrow(/Meter/);
  expect(() => render(<Proportion label="x" items={parts} total={10} />)).toThrow(RangeError);
  expect(() => render(<Proportion label="x" items={[...parts, { key: "n", label: "负", value: -1 }]} />)).toThrow(RangeError);
});
