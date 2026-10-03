import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Card } from "../src/components/card";
import { Input } from "../src/components/input";

test("Card bounds the supplied object without generating content structure", () => {
  render(<Card data-testid="card"><h2>名称</h2><p>说明</p></Card>);
  const card = screen.getByTestId("card");
  expect(card.children).toHaveLength(2);
  expect(card.firstElementChild).toBe(screen.getByRole("heading", { name: "名称" }));
  expect(card).toHaveAttribute("data-slot", "card");
  expect(card.className).not.toMatch(/(?:^|\s)(?:p[xyse]?|gap|flex|grid)-/);
});

test("native attributes, style, event handlers and the DOM ref survive render composition", () => {
  const ref = createRef<HTMLDivElement>();
  const onClick = vi.fn();
  const renderedClick = vi.fn();
  render(
    <Card
      aria-label="内容"
      className="rounded-none shadow-none"
      data-object="example"
      id="example"
      onClick={onClick}
      ref={ref}
      render={<section onClick={renderedClick} />}
      style={{ borderRadius: "var(--qy-radius-panel)" }}
    >说明</Card>,
  );
  const card = screen.getByRole("region", { name: "内容" });
  expect(card.tagName).toBe("SECTION");
  expect(ref.current).toBe(card);
  expect(card).toHaveAttribute("id", "example");
  expect(card).toHaveAttribute("data-object", "example");
  expect(card.style.borderRadius).toBe("var(--qy-radius-panel)");
  expect(card).toHaveClass("rounded-none", "shadow-none");
  expect(card).not.toHaveClass("rounded-panel", "shadow-panel");
  fireEvent.click(card);
  expect(onClick).toHaveBeenCalledOnce();
  expect(renderedClick).toHaveBeenCalledOnce();
});

test("the object boundary can be a native link without an extra wrapper", () => {
  render(<Card render={<a href="/example" />}>查看</Card>);
  const card = screen.getByRole("link", { name: "查看" });
  expect(card).toHaveAttribute("href", "/example");
  expect(card).toHaveAttribute("data-slot", "card");
});

test("composition inherits context and explicit concentric rounding does not replace control identity", () => {
  render(
    <section data-density="compact" dir="rtl" lang="ar">
      <Card className="p-(--qy-field-gap)" data-testid="outer">
        <Card
          data-testid="inner"
          style={{ borderRadius: "max(0px, calc(var(--qy-radius-panel) - var(--qy-field-gap) - 1px))" }}
        >
          <Input aria-label="الاسم" />
        </Card>
      </Card>
    </section>,
  );
  const inner = screen.getByTestId("inner");
  expect(inner.closest("[data-density]")).toHaveAttribute("data-density", "compact");
  expect(inner.closest("[dir]")).toHaveAttribute("dir", "rtl");
  expect(inner.closest("[lang]")).toHaveAttribute("lang", "ar");
  expect(inner).not.toHaveAttribute("data-density");
  expect(inner).not.toHaveAttribute("dir");
  expect(inner).not.toHaveAttribute("lang");
  expect(inner.style.borderRadius).toContain("var(--qy-field-gap)");
  expect(screen.getByRole("textbox").closest('[data-slot="input-control"]')).toHaveClass("rounded-control");
  expect(screen.getByTestId("outer").style.getPropertyValue("--qy-radius-control")).toBe("");
});
