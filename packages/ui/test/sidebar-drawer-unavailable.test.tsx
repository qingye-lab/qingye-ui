import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Sidebar, SidebarContent, SidebarDrawerTrigger, SidebarLink } from "../src/components/sidebar";
import { Workspace, WorkspaceHeader } from "../src/components/workspace";

// 抽屉宿主是按需加载的代码块：取不到（离线、发版后旧页面的文件名失效）时外壳不能整个崩掉。
vi.mock("../src/sidebar-drawer", () => { throw new Error("chunk unavailable"); });

it("keeps the shell up and the drawer closed when the drawer code cannot be loaded", async () => {
  vi.spyOn(window, "matchMedia").mockImplementation(query => ({ matches: true, media: query, onchange: null, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false }) as MediaQueryList);
  const user = userEvent.setup();
  render(<Workspace><WorkspaceHeader><SidebarDrawerTrigger /></WorkspaceHeader><Sidebar drawer><SidebarContent><SidebarLink href="#a">A</SidebarLink></SidebarContent></Sidebar></Workspace>);
  const trigger = screen.getByRole("button", { name: "打开工作区导航" });
  await user.click(trigger);
  await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
  expect(trigger).toBeInTheDocument();
  // 下一次按下重新去取，仍取不到也照样不崩。
  await user.click(trigger);
  await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
});
