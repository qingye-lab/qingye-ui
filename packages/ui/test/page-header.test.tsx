import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "../src/components/page-header";

describe("PageHeader", () => {
  it("co-locates a real page title and its command", () => {
    const action = vi.fn();
    const { container } = render(
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>内容</PageHeaderTitle>
          <PageHeaderDescription>3 项</PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions><Button onClick={action}>添加</Button></PageHeaderActions>
      </PageHeader>,
    );
    expect(container.querySelector("header")).toContainElement(screen.getByRole("heading", { level: 1 }));
    fireEvent.click(screen.getByRole("button"));
    expect(action).toHaveBeenCalledOnce();
  });

  it("allows a nested document heading level and no fabricated action", () => {
    render(<PageHeader><PageHeaderTitle level={3}>子章节</PageHeaderTitle></PageHeader>);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("子章节");
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("assigns expected data-slot hooks and semantic elements across all parts", () => {
    const { container } = render(
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>访问令牌</PageHeaderTitle>
          <PageHeaderDescription>管理自动化调用凭证</PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions><Button>新建令牌</Button></PageHeaderActions>
      </PageHeader>,
    );
    expect(container.querySelector('[data-slot="page-header"]')?.tagName).toBe("HEADER");
    expect(container.querySelector('[data-slot="page-header-content"]')?.tagName).toBe("DIV");
    expect(container.querySelector('[data-slot="page-header-title"]')?.tagName).toBe("H1");
    expect(container.querySelector('[data-slot="page-header-description"]')?.tagName).toBe("P");
    expect(container.querySelector('[data-slot="page-header-actions"]')?.tagName).toBe("DIV");
  });

  it("supports render composition and ARIA landmark labelling", () => {
    render(
      <PageHeader aria-labelledby="section-title" render={<section />}>
        <PageHeaderContent>
          <PageHeaderTitle id="section-title" level={2}>审批队列</PageHeaderTitle>
          <PageHeaderDescription render={<div />}>待处理 4 条</PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>,
    );
    const region = screen.getByRole("region", { name: "审批队列" });
    expect(region.tagName).toBe("SECTION");
    expect(region).toHaveAttribute("data-slot", "page-header");
    expect(screen.getByText("待处理 4 条").tagName).toBe("DIV");
    expect(screen.getByText("待处理 4 条")).toHaveAttribute("data-slot", "page-header-description");
  });

});
