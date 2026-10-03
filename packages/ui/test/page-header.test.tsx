import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "../src/components/page-header";

describe("PageHeader", () => {
  it("co-locates a real page title and its command", () => {
    const action = vi.fn(); const { container } = render(<PageHeader><PageHeaderContent><PageHeaderTitle>内容</PageHeaderTitle><PageHeaderDescription>3 项</PageHeaderDescription></PageHeaderContent><PageHeaderActions><Button onClick={action}>添加</Button></PageHeaderActions></PageHeader>);
    expect(container.querySelector("header")).toContainElement(screen.getByRole("heading", { level: 1 })); fireEvent.click(screen.getByRole("button")); expect(action).toHaveBeenCalledOnce();
  });
  it("allows a nested document heading level and no fabricated action", () => {
    render(<PageHeader><PageHeaderTitle level={3}>子章节</PageHeaderTitle></PageHeader>); expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("子章节"); expect(screen.queryByRole("button")).toBeNull(); expect(screen.queryByRole("navigation")).toBeNull();
  });
});
