import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CornerMark } from "../src/components/corner-mark";

describe("CornerMark", () => {
  it("is decorative itself and reaches assistive tech only through the caller's label", () => {
    render(<CornerMark count={3} label="3 条未读"><span>图标</span></CornerMark>);
    const badge = document.querySelector('[data-slot="corner-mark-badge"]')!;
    expect(badge).toHaveAttribute("aria-hidden", "true");
    expect(badge).toHaveTextContent("3");
    expect(screen.getByText("3 条未读")).toHaveClass("sr-only");
  });

  it("clamps the visible count at max and keeps the real count only in the label", () => {
    render(<CornerMark count={142} max={99} label="142 条未读"><span>图标</span></CornerMark>);
    expect(document.querySelector('[data-slot="corner-mark-badge"]')).toHaveTextContent("99+");
    expect(screen.getByText("142 条未读")).toBeInTheDocument();
  });

  it("hides entirely at a zero count instead of showing an empty shell", () => {
    render(<CornerMark count={0} label="0 条未读"><span>图标</span></CornerMark>);
    expect(document.querySelector('[data-slot="corner-mark-badge"]')).toBeNull();
    expect(screen.queryByText("0 条未读")).toBeNull();
  });

  it("renders a dot with no digits for presence-only marks", () => {
    render(<CornerMark dot tone="success" label="在线"><span>头像</span></CornerMark>);
    const badge = document.querySelector('[data-slot="corner-mark-badge"]')!;
    expect(badge).toBeEmptyDOMElement();
    expect(screen.getByText("在线")).toHaveClass("sr-only");
  });

  it("throws in development when a count ships without a label", () => {
    // @ts-expect-error intentionally omitting the required label to prove the guard
    expect(() => render(<CornerMark count={3}><span>图标</span></CornerMark>)).toThrow(/label/);
  });
});
