import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from "../src/components/toolbar";

describe("Toolbar", () => {
  it("uses one tab stop and arrow navigation across actual controls", async () => {
    const user = userEvent.setup(); const action = vi.fn();
    render(<Toolbar aria-label="操作"><ToolbarGroup aria-label="编辑"><ToolbarButton onClick={action}>一</ToolbarButton><ToolbarButton>二</ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarLink href="#detail">详情</ToolbarLink></Toolbar>);
    await user.tab(); expect(screen.getByRole("button", { name: "一" })).toHaveFocus(); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("button", { name: "二" })).toHaveFocus(); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("link")).toHaveFocus(); await user.keyboard("{ArrowRight}"); await user.keyboard("{Enter}"); expect(action).toHaveBeenCalledOnce();
    expect(screen.getByRole("toolbar", { name: "操作" })).toBeInTheDocument(); expect(screen.getByRole("group", { name: "编辑" })).toBeInTheDocument();
  });
  it("retains disabled-group protection and a rendered button ref", async () => {
    const user = userEvent.setup(); const action = vi.fn(); const ref = React.createRef<HTMLButtonElement>();
    render(<Toolbar aria-label="操作" orientation="vertical"><ToolbarGroup disabled><ToolbarButton onClick={action}>禁用</ToolbarButton></ToolbarGroup><ToolbarButton ref={ref} render={<button data-command="real" />} onClick={action}>启用</ToolbarButton></Toolbar>);
    await user.tab(); expect(screen.getByRole("button", { name: "禁用" })).toHaveFocus(); await user.keyboard("{Enter}"); await user.click(screen.getByRole("button", { name: "禁用" })); expect(action).not.toHaveBeenCalled(); await user.keyboard("{ArrowDown}"); expect(screen.getByRole("button", { name: "启用" })).toHaveFocus(); await user.keyboard("{Enter}"); expect(action).toHaveBeenCalledOnce(); expect(ref.current).toBe(screen.getByRole("button", { name: "启用" })); expect(ref.current).toHaveAttribute("data-slot", "toolbar-button");
  });
});
