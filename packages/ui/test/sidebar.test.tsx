import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../src/components/sidebar";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function State() {
  return <output data-testid="state">{useSidebar().state}</output>;
}

test("toggles without the Cookie Store API and with the keyboard shortcut", async () => {
  expect(typeof (globalThis as { cookieStore?: unknown }).cookieStore).toBe("undefined");
  render(
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>收件箱</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
      <State />
    </SidebarProvider>,
  );
  expect(screen.getByTestId("state")).toHaveTextContent("expanded");
  await userEvent.click(screen.getByRole("button", { name: "切换侧栏" }));
  expect(screen.getByTestId("state")).toHaveTextContent("collapsed");
  await userEvent.keyboard("{Control>}b{/Control}");
  expect(screen.getByTestId("state")).toHaveTextContent("expanded");
  expect(screen.getByRole("button", { name: "收件箱" })).toHaveAttribute("data-active", "true");
  expect(screen.getByRole("button", { name: "收件箱" })).toHaveAttribute("aria-current", "page");
});

test("an uncontrolled change callback observes the updated state", async () => {
  const onOpenChange = vi.fn();
  render(
    <SidebarProvider onOpenChange={onOpenChange}>
      <SidebarTrigger />
      <State />
    </SidebarProvider>,
  );
  const trigger = screen.getByRole("button", { name: "切换侧栏" });
  await userEvent.click(trigger);
  expect(onOpenChange).toHaveBeenLastCalledWith(false);
  expect(screen.getByTestId("state")).toHaveTextContent("collapsed");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("a controlled sidebar waits for its owner to accept the requested state", async () => {
  const onOpenChange = vi.fn();
  render(
    <SidebarProvider onOpenChange={onOpenChange} open>
      <SidebarTrigger />
      <State />
    </SidebarProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "切换侧栏" }));
  expect(onOpenChange).toHaveBeenLastCalledWith(false);
  expect(screen.getByTestId("state")).toHaveTextContent("expanded");
});

test("persistence records accepted state rather than a rejected controlled request", async () => {
  const set = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("cookieStore", { set });
  const { rerender } = render(
    <SidebarProvider open onOpenChange={() => {}}><SidebarTrigger /></SidebarProvider>,
  );
  expect(set).toHaveBeenLastCalledWith(expect.objectContaining({ value: "true" }));
  await userEvent.click(screen.getByRole("button", { name: "切换侧栏" }));
  expect(set).toHaveBeenCalledOnce();
  rerender(<SidebarProvider open={false} onOpenChange={() => {}}><SidebarTrigger /></SidebarProvider>);
  expect(set).toHaveBeenLastCalledWith(expect.objectContaining({ value: "false" }));
});

test("a trigger respects a cancelled click", async () => {
  render(
    <SidebarProvider>
      <SidebarTrigger onClick={(event) => event.preventDefault()} />
      <State />
    </SidebarProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "切换侧栏" }));
  expect(screen.getByTestId("state")).toHaveTextContent("expanded");
});

test("the global shortcut leaves editing, composition and claimed events with their owner", () => {
  render(
    <SidebarProvider>
      <input aria-label="搜索项目" />
      <div contentEditable suppressContentEditableWarning tabIndex={0}>草稿</div>
      <SidebarTrigger />
      <State />
    </SidebarProvider>,
  );
  const assertExpanded = () => expect(screen.getByTestId("state")).toHaveTextContent("expanded");
  fireEvent.keyDown(screen.getByRole("textbox"), { key: "b", ctrlKey: true });
  assertExpanded();
  fireEvent.keyDown(screen.getByText("草稿"), { key: "b", metaKey: true });
  assertExpanded();
  for (const details of [
    { isComposing: true },
    { repeat: true },
    { altKey: true },
    { shiftKey: true },
  ]) {
    fireEvent.keyDown(window, { key: "b", ctrlKey: true, ...details });
    assertExpanded();
  }
  const claimed = new KeyboardEvent("keydown", { key: "b", ctrlKey: true, cancelable: true });
  claimed.preventDefault();
  window.dispatchEvent(claimed);
  expect(screen.getByTestId("state")).toHaveTextContent("expanded");

  fireEvent.keyDown(window, { key: "b", ctrlKey: true });
  expect(screen.getByTestId("state")).toHaveTextContent("collapsed");
});

test("sidebar commands inside a form do not submit unless explicitly requested", async () => {
  const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
  render(
    <SidebarProvider>
      <form onSubmit={onSubmit}>
        <SidebarMenuButton>收件箱</SidebarMenuButton>
        <SidebarGroupAction aria-label="新建项目" />
        <SidebarMenuAction aria-label="项目操作" />
        <SidebarMenuButton type="submit">提交查询</SidebarMenuButton>
      </form>
    </SidebarProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "收件箱" }));
  await userEvent.click(screen.getByRole("button", { name: "新建项目" }));
  await userEvent.click(screen.getByRole("button", { name: "项目操作" }));
  expect(onSubmit).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button", { name: "提交查询" }));
  expect(onSubmit).toHaveBeenCalledOnce();
});

test("mobile navigation exposes its state and closes back to the trigger", async () => {
  const matchMedia = window.matchMedia;
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    ...matchMedia(query),
    matches: query === "(max-width: 799px)",
  }));
  render(
    <SidebarProvider>
      <Sidebar id="project-navigation" data-project="qingye" onClick={() => {}} style={{ backgroundColor: "var(--color-sidebar)" }}>
        <SidebarContent><SidebarMenuButton>收件箱</SidebarMenuButton></SidebarContent>
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>,
  );
  const trigger = screen.getByRole("button", { name: "切换侧栏" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(trigger);
  const dialog = await screen.findByRole("dialog", { name: "工作区导航" });
  expect(dialog).toHaveAttribute("id", "project-navigation");
  expect(dialog).toHaveAttribute("data-project", "qingye");
  expect(dialog.style.getPropertyValue("--sidebar-width")).toBe("18rem");
  expect(dialog.style.backgroundColor).toBe("var(--color-sidebar)");
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  await userEvent.click(screen.getByRole("button", { name: "关闭" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  await waitFor(() => expect(trigger).toHaveFocus());
});
