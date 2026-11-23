import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button";
import { Empty, EmptyActions, EmptyDescription, EmptyTitle } from "../src/components/empty";

describe("Empty", () => {
  it("keeps a real zero-result title and an operable entry", () => {
    const create = vi.fn();
    render(
      <Empty state="empty">
        <EmptyTitle level={3}>0 条内容</EmptyTitle>
        <EmptyDescription>添加第一条内容</EmptyDescription>
        <EmptyActions><Button onClick={create}>添加</Button></EmptyActions>
      </Empty>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("0 条内容");
    fireEvent.click(screen.getByRole("button"));
    expect(create).toHaveBeenCalledOnce();
  });

  it.each(["unknown", "not-applicable"] as const)("does not replace %s with a zero-result message", (state) => {
    const { container } = render(<Empty state={state}><EmptyTitle>{state}</EmptyTitle></Empty>);
    expect(container.firstChild).toHaveAttribute("data-state", state);
    expect(screen.queryByText(/0 条/)).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("attaches expected data-slot hooks and semantic elements to every part", () => {
    const { container } = render(
      <Empty state="empty">
        <EmptyTitle level={2}>没有筛选结果</EmptyTitle>
        <EmptyDescription>调整筛选条件后再试</EmptyDescription>
        <EmptyActions><Button>清除筛选</Button></EmptyActions>
      </Empty>,
    );
    expect(container.querySelector('[data-slot="empty"]')?.tagName).toBe("DIV");
    expect(container.querySelector('[data-slot="empty-title"]')?.tagName).toBe("H2");
    expect(container.querySelector('[data-slot="empty-description"]')?.tagName).toBe("P");
    expect(container.querySelector('[data-slot="empty-actions"]')?.tagName).toBe("DIV");
  });

  it("supports render composition while retaining data-slot, data-state, and ARIA attributes", () => {
    render(
      <Empty state="unknown" aria-labelledby="empty-heading" render={<section />}>
        <EmptyTitle id="empty-heading" level={4}>数据状态未知</EmptyTitle>
        <EmptyDescription render={<div />}>上游服务尚未返回确认结果</EmptyDescription>
      </Empty>,
    );
    const region = screen.getByRole("region", { name: "数据状态未知" });
    expect(region.tagName).toBe("SECTION");
    expect(region).toHaveAttribute("data-slot", "empty");
    expect(region).toHaveAttribute("data-state", "unknown");
    expect(screen.getByText("上游服务尚未返回确认结果").tagName).toBe("DIV");
    expect(screen.getByText("上游服务尚未返回确认结果")).toHaveAttribute("data-slot", "empty-description");
  });
});
