import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Grid, Inline, Stack, type LayoutGap } from "../src/components/layout";

const roles: LayoutGap[] = ["pair", "field", "fields", "actions", "panel", "section"];

test.each(roles)("Stack and Inline record the %s gap role", (gap) => {
  const { container } = render(<><Stack gap={gap}>内容</Stack><Inline gap={gap}>操作</Inline><Grid gap={gap}>格</Grid></>);
  for (const element of container.children) {
    expect(element).toHaveAttribute("data-gap", gap);
  }
});

test("defaults group content vertically and wrap adjacent actions without assigning ARIA roles", () => {
  const { container } = render(<><Stack /><Inline /></>);
  expect(container.children[0]).toHaveAttribute("data-slot", "stack");
  expect(container.children[1]).toHaveAttribute("data-slot", "inline");
  expect(container.querySelector("[role]")).toBeNull();
});

test("render makes a named section and forwards native attributes, styles, ref and both event handlers", () => {
  const ref = createRef<HTMLDivElement>();
  const caller = vi.fn();
  const elementHandler = vi.fn();
  render(<Stack ref={ref} gap="section" render={<section onClick={elementHandler} />}
    aria-label="说明" dir="rtl" lang="ar" data-density="compact" data-owner="caller"
    onClick={caller} style={{ gap: "var(--qy-section-gap)" }} className="items-start">内容</Stack>);
  const section = screen.getByRole("region", { name: "说明" });
  expect(section.tagName).toBe("SECTION");
  expect(ref.current).toBe(section);
  expect(section).toHaveAttribute("lang", "ar");
  expect(section).toHaveAttribute("dir", "rtl");
  expect(section).toHaveAttribute("data-density", "compact");
  expect(section).toHaveAttribute("data-owner", "caller");
  expect(section).toHaveStyle({ gap: "var(--qy-section-gap)" });
  fireEvent.click(section);
  expect(caller).toHaveBeenCalledOnce();
  expect(elementHandler).toHaveBeenCalledOnce();
});

test("Inline supports function render, explicit no-wrap and alignment without losing children", () => {
  render(<Inline wrap={false} align="baseline" render={props => <nav {...props} aria-label="导航" />}>
    <a href="#example">说明</a><button>导出</button>
  </Inline>);
  expect(screen.getByRole("link")).toHaveAttribute("href", "#example");
  expect(screen.getByRole("button")).toHaveTextContent("导出");
});

test("long bilingual content is retained and flex children can shrink instead of forcing overflow", () => {
  const content = "这是一段用于检查中文标点（括号）：并列内容、逗号，连续文本换行的完整文字。".repeat(10) + "LongUnbrokenContentWithoutSpacesForWrappingChecks".repeat(12);
  render(<Inline><Stack data-testid="long"><p>{content}</p></Stack><button>查看</button></Inline>);
  expect(screen.getByTestId("long")).toHaveTextContent(content);
});

test("Grid lays out the requested number of equal columns and keeps every child in order", () => {
  render(<Grid columns={3} data-testid="grid"><i>1</i><i>2</i><i>3</i><i>4</i></Grid>);
  const grid = screen.getByTestId("grid");
  expect(grid).toHaveAttribute("data-slot", "grid");
  expect(grid.style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");
  expect(grid.textContent).toBe("1234");
});

test("Grid minItemWidth overrides columns and never forces a column wider than its container", () => {
  render(<Grid columns={4} minItemWidth="12rem" data-testid="grid">内容</Grid>);
  const template = screen.getByTestId("grid").style.gridTemplateColumns;
  expect(template).toContain("auto-fit");
  expect(template).toContain("min(100%, 12rem)");
  expect(template).not.toContain("repeat(4");
});

test("Grid guards invalid column counts, merges caller style and supports render", () => {
  render(<Grid columns={0} style={{ color: "red" }} aria-label="列表" render={<ul />}><li>一</li></Grid>);
  const list = screen.getByRole("list", { name: "列表" });
  expect(list.style.gridTemplateColumns).toBe("repeat(1, minmax(0, 1fr))");
  expect(list.style.color).toBe("red");
});
