import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Sidebar, SidebarContent, SidebarLink, SidebarToggle } from "../src/components/sidebar";
describe("Sidebar", () => {
  it("keeps collapse reversible and route location explicit", async () => {
    const user = userEvent.setup(); render(<Sidebar><SidebarToggle /><SidebarContent id="actual-nav" aria-label="页面"><SidebarLink href="/a" active>A</SidebarLink><SidebarLink href="/b">B</SidebarLink></SidebarContent></Sidebar>); expect(screen.getByRole("button", { name: "收起" })).toHaveAttribute("aria-controls", "actual-nav"); expect(screen.getByRole("link", { name: "A" })).toHaveAttribute("aria-current", "page"); await user.click(screen.getByRole("button", { name: "收起" })); expect(screen.queryByRole("navigation")).toBeNull(); await user.click(screen.getByRole("button", { name: "展开" })); expect(screen.getAllByRole("link")).toHaveLength(2);
  });
  it("honors cancellation and restores focus on a controlled collapse", async () => {
    const user = userEvent.setup(); const { rerender } = render(<Sidebar onCollapsedChange={(_, details) => details.cancel()}><SidebarToggle /><SidebarContent><SidebarLink href="#a">A</SidebarLink></SidebarContent></Sidebar>); await user.click(screen.getByRole("button")); expect(screen.getByRole("link")).toBeInTheDocument(); screen.getByRole("link").focus(); rerender(<Sidebar collapsed><SidebarToggle /><SidebarContent><SidebarLink href="#a">A</SidebarLink></SidebarContent></Sidebar>); await waitFor(() => expect(screen.getByRole("button", { name: "展开" })).toHaveFocus());
  });
});
