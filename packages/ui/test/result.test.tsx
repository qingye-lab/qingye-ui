import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Result, ResultActions, ResultDescription, ResultTitle } from "../src/components/result";

describe("Result", () => {
  it("assembles mark, title, description and actions in reading order", () => {
    render(<Result tone="success"><ResultTitle>付款完成</ResultTitle><ResultDescription>回执已发送。</ResultDescription><ResultActions><button type="button">查看订单</button></ResultActions></Result>);
    expect(screen.getByRole("heading", { name: "付款完成" })).toBeInTheDocument();
    expect(screen.getByText("回执已发送。")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "查看订单" })).toBeInTheDocument();
  });

  it("carries the category to assistive tech beyond color, and the mark itself is decorative", () => {
    const { container } = render(<Result tone="danger"><ResultTitle>保存失败</ResultTitle></Result>);
    expect(container.querySelector('[data-slot="result-category"]')).toHaveTextContent(/./);
    expect(container.querySelector('[data-slot="result-icon"]')).toHaveAttribute("aria-hidden", "true");
  });

  it("neutral has no default mark and no category prefix; a custom icon replaces the default; false removes it", () => {
    const { container, rerender } = render(<Result><ResultTitle>没有权限</ResultTitle></Result>);
    expect(container.querySelector('[data-slot="result-mark"]')).toBeNull();
    expect(container.querySelector('[data-slot="result-category"]')).toBeNull();
    rerender(<Result tone="warning" icon={<svg data-testid="own" aria-hidden="true" />}><ResultTitle>没有权限</ResultTitle></Result>);
    expect(screen.getByTestId("own")).toBeInTheDocument();
    expect(container.querySelector('[data-slot="result-icon"]')).toBeNull();
    rerender(<Result tone="warning" icon={false}><ResultTitle>没有权限</ResultTitle></Result>);
    expect(container.querySelector('[data-slot="result-mark"]')).toBeNull();
    expect(container.querySelector('[data-slot="result-category"]')).toBeInTheDocument();
  });
});
