import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderBack,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "../src/components/page-header";

test("renders a header with an h1 and a localised back button", async () => {
  const onBack = vi.fn();
  render(
    <PageHeader>
      <PageHeaderBack onClick={onBack} />
      <PageHeaderContent>
        <PageHeaderTitle>设备管理</PageHeaderTitle>
        <PageHeaderDescription>查看终端状态</PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <button type="button">添加设备</button>
      </PageHeaderActions>
    </PageHeader>,
  );
  expect(screen.getByRole("banner")).toHaveAttribute("data-slot", "page-header");
  expect(screen.getByRole("heading", { level: 1, name: "设备管理" })).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "返回" }));
  expect(onBack).toHaveBeenCalledOnce();
});

test("back button can be a link", () => {
  render(<PageHeaderBack aria-label="返回订单列表" nativeButton={false} render={<a href="/orders" />} />);
  const back = screen.getByRole("button", { name: "返回订单列表" });
  expect(back.tagName).toBe("A");
  expect(back).toHaveAttribute("href", "/orders");
});
