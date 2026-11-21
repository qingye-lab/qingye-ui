import "./_env";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { AppTopBar, type AppTopBarProps } from "../AppTopBar";

function Probe() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}</output>;
}

function setup(overrides: Partial<AppTopBarProps> = {}) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const props: AppTopBarProps = {
    navItems: [{ label: "概览", to: "/" }, { label: "报表", to: "/reports" }],
    syncing: false, onOpenSearch: vi.fn(), ...overrides,
  };
  const view = render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes><Route path="*" element={<><AppTopBar {...props} /><Probe /></>} /></Routes>
    </MemoryRouter>,
  );
  return { user, props, view };
}

const location = () => screen.getByTestId("location").textContent;
const openDialog = () => Array.from(document.querySelectorAll<HTMLElement>("[role=dialog], [role=alertdialog], dialog[open]")).at(-1) ?? null;

describe("T4", () => {
  it("[a11y] “新建报表”是指向 /reports/new 的链接", () => {
    setup();
    expect(screen.getByRole("link", { name: "新建报表" })).toHaveAttribute("href", "/reports/new");
  });

  it("[behavior] 点击“新建报表”在应用内跳转", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("link", { name: "新建报表" }));
    await waitFor(() => expect(location()).toBe("/reports/new"));
  });

  it("[a11y] 搜索按钮名称为“搜索”，提示显示 ⌘K", async () => {
    const { user } = setup();
    const button = screen.getByRole("button", { name: "搜索" });
    await user.hover(button);
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("⌘K");
    expect(button).toHaveAccessibleName("搜索");
  });

  it("[behavior] 点击搜索或按 ⌘K / Ctrl+K 调用 onOpenSearch", async () => {
    const { user, props } = setup();
    await user.click(screen.getByRole("button", { name: "搜索" }));
    expect(props.onOpenSearch).toHaveBeenCalledTimes(1);
    await user.keyboard("{Meta>}k{/Meta}");
    expect(props.onOpenSearch).toHaveBeenCalledTimes(2);
    await user.keyboard("{Control>}k{/Control}");
    expect(props.onOpenSearch).toHaveBeenCalledTimes(3);
  });

  it("[api] 同步中显示库的不定进度条“正在同步”，未同步不显示", () => {
    const { view, props } = setup({ syncing: true });
    const bar = screen.getByRole("progressbar", { name: "正在同步" });
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar.closest("[data-slot]")?.getAttribute("data-slot")).toBe("progress");
    view.rerender(
      <MemoryRouter initialEntries={["/"]}>
        <Routes><Route path="*" element={<AppTopBar {...props} syncing={false} />} /></Routes>
      </MemoryRouter>,
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("[api] “打开导航”打开从左侧滑出、标题为“导航”的抽屉", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "打开导航" }));
    await waitFor(() => expect(openDialog()).not.toBeNull());
    const dialog = openDialog()!;
    expect(dialog).toHaveAccessibleName("导航");
    expect(dialog).toHaveAttribute("data-swipe-direction", "left");
  });

  it("[behavior] 抽屉里的链接在应用内跳转并关闭抽屉", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "打开导航" }));
    await waitFor(() => expect(openDialog()).not.toBeNull());
    const link = Array.from(openDialog()!.querySelectorAll("a")).find(a => a.textContent?.trim() === "报表")!;
    expect(link).toBeTruthy();
    await user.click(link);
    await waitFor(() => expect(location()).toBe("/reports"));
    await waitFor(() => expect(openDialog()).toBeNull());
  });
});
