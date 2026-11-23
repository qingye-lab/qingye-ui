import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { Badge, type BadgeTone } from "../src/components/badge";

describe("Badge", () => {
  test("a marker stays passive, and an explicit native render preserves ref and events", async () => {
    const ref = createRef<HTMLSpanElement>();
    const clicked = vi.fn();
    const { rerender } = render(<Badge>标记</Badge>);
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
    rerender(<Badge ref={ref} onClick={clicked} render={<a href="#marker" />}>标记</Badge>);
    expect(ref.current).toBe(screen.getByRole("link", { name: "标记" }));
    await userEvent.click(screen.getByRole("link"));
    expect(clicked).toHaveBeenCalledOnce();
  });

  test("distinguishes neutral and emphasis variants through data-variant", () => {
    const { rerender } = render(<Badge>草稿</Badge>);
    const neutral = screen.getByText("草稿");
    expect(neutral.tagName).toBe("SPAN");
    expect(neutral).toHaveAttribute("data-slot", "badge");
    expect(neutral).toHaveAttribute("data-variant", "neutral");
    expect(neutral).not.toHaveAttribute("data-tone");

    rerender(<Badge variant="emphasis">当前版本</Badge>);
    const emphasis = screen.getByText("当前版本");
    expect(emphasis).toHaveAttribute("data-variant", "emphasis");
    expect(emphasis).not.toHaveAttribute("data-tone");
  });

  test.each<BadgeTone>(["neutral", "info", "success", "warning", "danger"])(
    "tone=%s overrides variant to tone",
    (tone) => {
      render(<Badge variant="neutral" tone={tone}>{tone}</Badge>);
      const badge = screen.getByText(tone);
      expect(badge).toHaveAttribute("data-variant", "tone");
      expect(badge).toHaveAttribute("data-tone", tone);
    },
  );

  test("forwards id, ARIA, and data attributes", () => {
    render(<Badge id="release-tag" aria-describedby="release-note" data-custom="v5" className="uppercase text-foreground">v5.5</Badge>);
    const badge = screen.getByText("v5.5");
    expect(badge).toHaveAttribute("id", "release-tag");
    expect(badge).toHaveAttribute("aria-describedby", "release-note");
    expect(badge).toHaveAttribute("data-custom", "v5");
  });

  test("combines render element props with outer handlers without losing data-slot", async () => {
    const innerClick = vi.fn();
    const outerClick = vi.fn();
    render(<Badge onClick={outerClick} render={<button type="button" onClick={innerClick} />}>已归档</Badge>);
    const button = screen.getByRole("button", { name: "已归档" });
    expect(button).toHaveAttribute("data-slot", "badge");
    await userEvent.click(button);
    expect(innerClick).toHaveBeenCalledOnce();
    expect(outerClick).toHaveBeenCalledOnce();
  });
});
