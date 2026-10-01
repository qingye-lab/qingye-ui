import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test } from "vitest";
import { Grid, Inline, Stack, Text } from "../src/components/layout";

test("maps gaps to spacing tokens", () => {
  render(
    <Stack data-testid="stack" gap={6}>
      <Inline data-testid="inline">
        <span>标签</span>
      </Inline>
    </Stack>,
  );
  expect(screen.getByTestId("stack")).toHaveClass("flex", "flex-col", "gap-(--qy-space-6)");
  expect(screen.getByTestId("stack")).toHaveAttribute("data-slot", "stack");
  expect(screen.getByTestId("inline")).toHaveClass("gap-(--qy-space-2)", "items-center", "flex-wrap");
});

test("renders the element named by as, with its own props and ref", () => {
  const ref = createRef<HTMLOListElement>();
  render(
    <>
      <Stack aria-label="待办" as="ol" ref={ref}>
        <li>评审设计稿</li>
      </Stack>
      <Text as="time" dateTime="2026-10-01" tone="muted">
        10 月 1 日
      </Text>
    </>,
  );
  expect(screen.getByRole("list", { name: "待办" }).tagName).toBe("OL");
  expect(ref.current?.tagName).toBe("OL");
  const time = screen.getByText("10 月 1 日");
  expect(time.tagName).toBe("TIME");
  expect(time).toHaveAttribute("datetime", "2026-10-01");
  expect(time).toHaveClass("text-body", "text-muted-foreground");
});

test("Text inherits colour unless a tone is given", () => {
  render(<Text>正文</Text>);
  expect(screen.getByText("正文").className).toBe("text-body");
});

test("Grid fits columns to the container when minItemWidth is set", () => {
  render(
    <>
      <Grid columns={3} data-testid="fixed" />
      <Grid data-testid="fluid" minItemWidth="14rem" style={{ marginTop: 8 }} />
    </>,
  );
  expect(screen.getByTestId("fixed")).toHaveClass("grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3");
  const fluid = screen.getByTestId("fluid");
  expect(fluid.style.getPropertyValue("--grid-min-item")).toBe("14rem");
  expect(fluid.style.marginTop).toBe("8px");
});
