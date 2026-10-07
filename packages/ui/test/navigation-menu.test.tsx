import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NavigationMenu, NavigationMenuContent, NavigationMenuGroup, NavigationMenuGroupLabel, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuPopup, NavigationMenuPortal, NavigationMenuPositioner, NavigationMenuTrigger, NavigationMenuViewport } from "../src/components/navigation-menu";
describe("NavigationMenu", () => {
  it("keeps true links and caller-owned current location", () => {
    const ref = React.createRef<HTMLAnchorElement>(); render(<NavigationMenu aria-label="导航"><NavigationMenuList><NavigationMenuItem><NavigationMenuLink ref={ref} active href="/a">A</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="/b">B</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>); expect(screen.getByRole("navigation", { name: "导航" })).toBeInTheDocument(); expect(ref.current).toBe(screen.getByRole("link", { name: "A" })); expect(ref.current).toHaveAttribute("aria-current", "page"); expect(screen.getByRole("link", { name: "B" })).not.toHaveAttribute("aria-current");
  });
  it("opens its own navigation popup and supports cancellation", async () => {
    const user = userEvent.setup(); render(<NavigationMenu aria-label="导航" delay={0} onValueChange={(value, details) => { if (value === null) details.cancel(); }}><NavigationMenuList><NavigationMenuItem value="group"><NavigationMenuTrigger>入口</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="#one">内容</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList><NavigationMenuPortal><NavigationMenuPositioner><NavigationMenuPopup><NavigationMenuViewport /></NavigationMenuPopup></NavigationMenuPositioner></NavigationMenuPortal></NavigationMenu>); await user.click(screen.getByRole("button", { name: "入口" })); await screen.findByRole("link", { name: "内容" }); await user.keyboard("{Escape}"); await waitFor(() => expect(screen.getByRole("link", { name: "内容" })).toBeInTheDocument());
  });
  it("groups panel links under a non-interactive group name and shows a decision-relevant description line", async () => {
    const user = userEvent.setup();
    render(<NavigationMenu aria-label="导航" delay={0}><NavigationMenuList><NavigationMenuItem value="group"><NavigationMenuTrigger>集合</NavigationMenuTrigger><NavigationMenuContent>
      <NavigationMenuGroup><NavigationMenuGroupLabel>本地集合</NavigationMenuGroupLabel><NavigationMenuLink href="#devices" description="1,284 条记录">接入设备</NavigationMenuLink></NavigationMenuGroup>
      <NavigationMenuGroup><NavigationMenuGroupLabel>工作区</NavigationMenuGroupLabel><NavigationMenuLink href="#members">成员</NavigationMenuLink></NavigationMenuGroup>
    </NavigationMenuContent></NavigationMenuItem></NavigationMenuList><NavigationMenuPortal><NavigationMenuPositioner><NavigationMenuPopup><NavigationMenuViewport /></NavigationMenuPopup></NavigationMenuPositioner></NavigationMenuPortal></NavigationMenu>);
    await user.click(screen.getByRole("button", { name: "集合" }));
    const devices = await screen.findByRole("link", { name: /接入设备/ });
    expect(devices).toHaveTextContent("1,284 条记录");
    // 组名本身不是链接也不是按钮——它只识别，不操作。
    expect(screen.getByText("本地集合").tagName).toBe("P");
    expect(screen.queryByRole("link", { name: "本地集合" })).toBeNull();
    expect(screen.getByRole("link", { name: "成员" })).toBeInTheDocument();
  });
});
