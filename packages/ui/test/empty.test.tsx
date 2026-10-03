import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button";
import { Empty, EmptyActions, EmptyDescription, EmptyTitle } from "../src/components/empty";

describe("Empty", () => {
  it("keeps a real zero-result title and an operable entry", () => {
    const create = vi.fn(); render(<Empty state="empty"><EmptyTitle level={3}>0 条内容</EmptyTitle><EmptyDescription>添加第一条内容</EmptyDescription><EmptyActions><Button onClick={create}>添加</Button></EmptyActions></Empty>);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("0 条内容"); fireEvent.click(screen.getByRole("button")); expect(create).toHaveBeenCalledOnce();
  });
  it.each(["unknown", "not-applicable"] as const)("does not replace %s with a zero-result message", state => {
    const { container } = render(<Empty state={state}><EmptyTitle>{state}</EmptyTitle></Empty>); expect(container.firstChild).toHaveAttribute("data-state", state); expect(screen.queryByText(/0 条/)).toBeNull(); expect(screen.queryByRole("button")).toBeNull();
  });
});
