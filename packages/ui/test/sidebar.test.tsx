import * as React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UILocaleProvider } from "../src/locale";
import { Avatar, AvatarFallback } from "../src/components/avatar";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "../src/components/menu";
import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTrigger } from "../src/components/drawer";
import { Popover, PopoverPopup, PopoverTrigger } from "../src/components/popover";
import { Workspace, WorkspaceHeader } from "../src/components/workspace";
import { createSidebarDrawerHandle, Sidebar, SidebarButton, SidebarContent, SidebarDrawerTrigger, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarTitle, SidebarToggle } from "../src/components/sidebar";
const dot = <span aria-hidden="true">●</span>;
describe("Sidebar", () => {
  it("names the nav by default, lets the caller override, and keeps the toggle name fixed while aria-expanded changes", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Sidebar><SidebarToggle /><SidebarContent><SidebarLink href="/a">A</SidebarLink></SidebarContent></Sidebar>);
    expect(screen.getByRole("navigation", { name: "工作区导航" })).toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "工作区导航" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "工作区导航" })).toHaveAttribute("aria-expanded", "false");
    unmount();
    render(<Sidebar><SidebarContent aria-label="页面"><SidebarLink href="/a">A</SidebarLink></SidebarContent></Sidebar>);
    expect(screen.getByRole("navigation", { name: "页面" })).toBeInTheDocument();
  });
  it("collapses into an icon rail, not a hidden panel: content and real links stay in the accessibility tree", async () => {
    const user = userEvent.setup(); render(<Sidebar><SidebarToggle /><SidebarContent id="actual-nav" aria-label="页面"><SidebarLink href="/a" active icon={dot}>A</SidebarLink><SidebarLink href="/b" icon={dot}>B</SidebarLink></SidebarContent></Sidebar>);
    expect(screen.getByRole("button", { name: "工作区导航" })).toHaveAttribute("aria-controls", "actual-nav");
    expect(screen.getByRole("link", { name: "A" })).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("button", { name: "工作区导航" }));
    // 收起是 rail：导航与两个链接仍然挂载、仍然是真实链接，只是名称切到视觉隐藏（sr-only），
    // 不再像旧版那样整段 hidden——2026-10 的裁决要求收起态显示一列图标而不是消失。
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "A" })).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("button", { name: "工作区导航" }));
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
  it("keeps focus on a rail item after a controlled collapse, since it is still reachable there", async () => {
    const { rerender } = render(<Sidebar><SidebarToggle /><SidebarContent><SidebarLink href="#a" icon={dot}>A</SidebarLink></SidebarContent></Sidebar>);
    screen.getByRole("link").focus();
    rerender(<Sidebar collapsed><SidebarToggle /><SidebarContent><SidebarLink href="#a" icon={dot}>A</SidebarLink></SidebarContent></Sidebar>);
    // 随境取度（判据三 变化检验）：rail 仍渲染同一个条目，焦点原地保留，不再回退到 Toggle——
    // 这是对旧断言的有意改动：旧版收起会让内容整段 hidden，浏览器强制清空焦点，所以当时
    // 必须把焦点交回 Toggle；现在内容仍然可见可达，交回反而打断了正在发生的位置。
    await waitFor(() => expect(screen.getByRole("link", { name: "A" })).toHaveFocus());
  });
  it("returns focus to Toggle when a focused sub-item becomes unreachable inside the rail", async () => {
    const tree = (collapsed: boolean) => <Sidebar collapsed={collapsed}><SidebarToggle /><SidebarContent><SidebarSub defaultOpen><SidebarSubTrigger icon={dot}>集合</SidebarSubTrigger><SidebarSubContent><SidebarLink href="#a">A</SidebarLink></SidebarSubContent></SidebarSub></SidebarContent></Sidebar>;
    const { rerender } = render(tree(false));
    screen.getByRole("link", { name: "A" }).focus();
    rerender(tree(true));
    // 子级的内嵌面板在 rail 下用原生 hidden 清零占位（没有宽度展开它），焦点原本落在
    // 其中的链接因此真的不可达，这时才需要回退——保留了「焦点在收起时的回退逻辑」，
    // 只是把触发条件从「侧栏收起」收紧为「所在容器确实不可达」。
    await waitFor(() => expect(screen.getByRole("button", { name: "工作区导航" })).toHaveFocus());
  });
  it("honors cancellation on a controlled collapse", async () => {
    const user = userEvent.setup(); render(<Sidebar onCollapsedChange={(_, details) => details.cancel()}><SidebarToggle /><SidebarContent><SidebarLink href="#a">A</SidebarLink></SidebarContent></Sidebar>);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "工作区导航" })).toBeInTheDocument();
  });
  it("exposes the sub-item's active state up to its SidebarSubTrigger via :has(), and reaches sub-links through the rail's Popover", async () => {
    const user = userEvent.setup();
    render(<Sidebar collapsed><SidebarToggle /><SidebarContent aria-label="工作区"><SidebarSub defaultOpen><SidebarSubTrigger icon={dot}>集合</SidebarSubTrigger><SidebarSubContent><SidebarLink href="#devices" active icon={dot}>接入设备</SidebarLink><SidebarLink href="#roles" icon={dot}>权限与角色</SidebarLink></SidebarSubContent></SidebarSub></SidebarContent></Sidebar>);
    const trigger = screen.getByRole("button", { name: "集合" });
    await user.click(trigger);
    expect(await screen.findByRole("link", { name: "接入设备" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "权限与角色" })).toBeInTheDocument();
  });
  it("shows the same unread count inline when expanded and as a corner mark on the icon in the rail", () => {
    const { rerender } = render(<Sidebar><SidebarToggle /><SidebarContent><SidebarLink href="#a" icon={dot} count={3}>A</SidebarLink></SidebarContent></Sidebar>);
    // 展开态：数字是正文的一部分，直接进可访问名称，不需要另外的 label。
    expect(screen.getByRole("link", { name: /^A ?3$/ })).toBeInTheDocument();
    expect(document.querySelector('[data-slot="corner-mark-badge"]')).toBeNull();
    rerender(<Sidebar collapsed><SidebarToggle /><SidebarContent><SidebarLink href="#a" icon={dot} count={3}>A</SidebarLink></SidebarContent></Sidebar>);
    // rail 态：同一个数字换成图标角上的 CornerMark，可访问名称改由 messages.unreadCount 给出
    // （CornerMark 的隐藏文字在图标里、排在「A」之前，顺序不是断言要核对的事实）。
    expect(screen.getByRole("link", { name: /3 条未读/ })).toHaveAccessibleName(/A/);
    expect(document.querySelector('[data-slot="corner-mark-badge"]')).toHaveTextContent("3");
  });
  it("hides the count once it reaches zero in both sidebar states", () => {
    const { rerender } = render(<Sidebar><SidebarToggle /><SidebarContent><SidebarLink href="#a" icon={dot} count={0}>A</SidebarLink></SidebarContent></Sidebar>);
    expect(screen.getByRole("link", { name: "A" })).toBeInTheDocument();
    rerender(<Sidebar collapsed><SidebarToggle /><SidebarContent><SidebarLink href="#a" icon={dot} count={0}>A</SidebarLink></SidebarContent></Sidebar>);
    expect(document.querySelector('[data-slot="corner-mark-badge"]')).toBeNull();
  });
  it("forwards the caller's props to the rail's sub-trigger, as it does when expanded", async () => {
    const user = userEvent.setup(); const focus = vi.fn();
    render(<Sidebar collapsed><SidebarToggle /><SidebarContent><SidebarSub><SidebarSubTrigger icon={dot} data-testid="rail-trigger" aria-describedby="hint" onFocus={focus}>集合</SidebarSubTrigger><SidebarSubContent><SidebarLink href="#a">A</SidebarLink></SidebarSubContent></SidebarSub></SidebarContent></Sidebar>);
    const trigger = screen.getByTestId("rail-trigger");
    expect(trigger).toHaveAttribute("aria-describedby", "hint");
    await user.tab(); await user.tab(); expect(trigger).toHaveFocus(); expect(focus).toHaveBeenCalled();
  });
  it("under rtl the rail's sub-links still open on the logical side: data-side is inline-end", async () => {
    const user = userEvent.setup();
    render(<UILocaleProvider dir="rtl"><Sidebar collapsed><SidebarContent><SidebarSub><SidebarSubTrigger icon={dot}>集合</SidebarSubTrigger><SidebarSubContent><SidebarLink href="#a">A</SidebarLink></SidebarSubContent></SidebarSub></SidebarContent></Sidebar></UILocaleProvider>);
    await user.click(screen.getByRole("button", { name: "集合" }));
    expect((await screen.findByRole("link", { name: "A" })).closest("[data-side]")).toHaveAttribute("data-side", "inline-end");
  });
  it("header, title and footer carry their slots, forward ref and native attributes, and accept render", () => {
    const header = React.createRef<HTMLDivElement>(); const title = React.createRef<HTMLSpanElement>(); const footer = React.createRef<HTMLDivElement>();
    render(<Sidebar><SidebarHeader ref={header} data-testid="header" aria-label="标识"><SidebarTitle ref={title} id="title" render={<h2 />}>工作区</SidebarTitle><SidebarToggle /></SidebarHeader><SidebarFooter ref={footer} data-testid="footer" render={<section aria-label="本人" />}>末位</SidebarFooter></Sidebar>);
    expect(screen.getByTestId("header")).toHaveAttribute("data-slot", "sidebar-header");
    expect(header.current).toBe(screen.getByTestId("header"));
    expect(screen.getByRole("heading", { name: "工作区" })).toHaveAttribute("data-slot", "sidebar-title");
    expect(title.current).toBe(screen.getByRole("heading"));
    expect(footer.current).toBe(screen.getByRole("region", { name: "本人" }));
    expect(footer.current).toHaveAttribute("data-slot", "sidebar-footer");
  });
  it("keeps the title in the accessibility tree when the sidebar collapses to the rail", () => {
    const { rerender } = render(<Sidebar><SidebarHeader><SidebarTitle>工作区</SidebarTitle><SidebarToggle /></SidebarHeader></Sidebar>);
    expect(screen.getByText("工作区")).toBeInTheDocument();
    rerender(<Sidebar collapsed><SidebarHeader><SidebarTitle>工作区</SidebarTitle><SidebarToggle /></SidebarHeader></Sidebar>);
    // 名称切到视觉隐藏，节点与文字仍在，辅助技术照常读到。
    expect(screen.getByText("工作区")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "工作区导航" })).toBeInTheDocument();
  });
  it("lets a SidebarLink rendered as a button open a Menu: role button, accessible name from the label, in both states", async () => {
    const user = userEvent.setup();
    const tree = (collapsed: boolean) => <Sidebar collapsed={collapsed}><SidebarFooter><Menu><MenuTrigger render={<SidebarLink icon={<Avatar size="sm" label="陈致远" aria-hidden="true"><AvatarFallback>陈</AvatarFallback></Avatar>} render={<button type="button" />} />}>陈致远</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem>退出登录</MenuItem></MenuPopup></MenuPositioner></MenuPortal></Menu></SidebarFooter></Sidebar>;
    const { rerender } = render(tree(false));
    const trigger = screen.getByRole("button", { name: "陈致远" });
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger.querySelector('[data-slot="sidebar-link-label"]')).toHaveTextContent("陈致远");
    rerender(tree(true));
    expect(screen.getByRole("button", { name: "陈致远" })).toBe(trigger);
    await user.click(screen.getByRole("button", { name: "陈致远" }));
    expect(await screen.findByRole("menuitem", { name: "退出登录" })).toBeInTheDocument();
  });
  it("renders SidebarButton as a plain button without a current-page claim, and keeps its name in the rail", () => {
    const onClick = vi.fn();
    const tree = (collapsed: boolean) => <Sidebar collapsed={collapsed}><SidebarContent><SidebarButton icon={dot} onClick={onClick} count={3}>搜索</SidebarButton></SidebarContent></Sidebar>;
    const { rerender } = render(tree(false));
    const button = screen.getByRole("button", { name: /搜索/ });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toHaveAttribute("aria-current");
    expect(screen.queryByRole("link")).toBeNull();
    rerender(tree(true));
    expect(screen.getByRole("button", { name: /搜索/ })).toBe(button);
    button.click();
    expect(onClick).toHaveBeenCalledOnce();
  });
  it("lets SidebarButton be the render target of MenuTrigger and PopoverTrigger with ref and aria-expanded on the button", async () => {
    const user = userEvent.setup();
    const ref = React.createRef<HTMLButtonElement>();
    render(<Sidebar><SidebarFooter>
      <Menu><MenuTrigger render={<SidebarButton ref={ref} icon={dot} />}>账户</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem>退出登录</MenuItem></MenuPopup></MenuPositioner></MenuPortal></Menu>
      <Popover><PopoverTrigger render={<SidebarButton icon={dot} />}>通知</PopoverTrigger><PopoverPopup>没有新通知</PopoverPopup></Popover>
    </SidebarFooter></Sidebar>);
    const menu = screen.getByRole("button", { name: "账户" });
    expect(ref.current).toBe(menu);
    expect(menu).toHaveAttribute("aria-expanded", "false");
    await user.click(menu);
    expect(await screen.findByRole("menuitem", { name: "退出登录" })).toBeInTheDocument();
    expect(menu).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    const popover = screen.getByRole("button", { name: "通知" });
    expect(popover).toHaveAttribute("aria-expanded", "false");
    await user.click(popover);
    expect(await screen.findByText("没有新通知")).toBeInTheDocument();
    expect(popover).toHaveAttribute("aria-expanded", "true");
  });
  it("makes a labelled group a named group and leaves an unlabelled one as plain layout", () => {
    render(<Sidebar><SidebarContent><SidebarGroup><SidebarGroupLabel>导航</SidebarGroupLabel><SidebarLink href="#a">A</SidebarLink></SidebarGroup><SidebarGroup data-testid="plain"><SidebarLink href="#b">B</SidebarLink></SidebarGroup></SidebarContent></Sidebar>);
    expect(within(screen.getByRole("group", { name: "导航" })).getByRole("link", { name: "A" })).toBeInTheDocument();
    expect(screen.getAllByRole("group")).toHaveLength(1);
    expect(screen.getByTestId("plain")).not.toHaveAttribute("role");
  });
  it("keeps the group name when the sidebar collapses, and lets the caller name the group itself", () => {
    const tree = (collapsed: boolean) => <Sidebar collapsed={collapsed}><SidebarContent><SidebarGroup><SidebarGroupLabel>导航</SidebarGroupLabel><SidebarLink href="#a">A</SidebarLink></SidebarGroup><SidebarGroup aria-label="自定"><SidebarGroupLabel>标签</SidebarGroupLabel><SidebarLink href="#b">B</SidebarLink></SidebarGroup></SidebarContent></Sidebar>;
    const { rerender } = render(tree(false));
    expect(screen.getByRole("group", { name: "自定" })).toBeInTheDocument();
    rerender(tree(true));
    expect(screen.getByRole("group", { name: "导航" })).toBeInTheDocument();
  });
  it("can be carried by a Drawer on narrow screens: opened by a named button, closed after navigating, focus back on the button", async () => {
    const user = userEvent.setup(); const navigate = vi.fn();
    function Narrow() {
      const [open, setOpen] = React.useState(false);
      return <Drawer swipeDirection="left" open={open} onOpenChange={setOpen}>
        <DrawerTrigger aria-label="工作区导航">菜单</DrawerTrigger>
        <DrawerPopup>
          <DrawerContent>
            <Sidebar><SidebarHeader><SidebarTitle render={<h2 />}>青野</SidebarTitle><DrawerClose /></SidebarHeader>
              <SidebarContent><SidebarGroup><SidebarGroupLabel>导航</SidebarGroupLabel><SidebarLink href="#a" onClick={event => { event.preventDefault(); navigate(); setOpen(false); }}>A</SidebarLink></SidebarGroup></SidebarContent></Sidebar>
          </DrawerContent>
        </DrawerPopup>
      </Drawer>;
    }
    render(<Narrow />);
    const trigger = screen.getByRole("button", { name: "工作区导航" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(await screen.findByRole("navigation", { name: "工作区导航" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "导航" })).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "A" }));
    expect(navigate).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole("navigation")).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
  });
  describe("on narrow screens (drawer)", () => {
    const narrow = (matches: boolean) => vi.spyOn(window, "matchMedia").mockImplementation(query => ({ matches, media: query, onchange: null, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false }) as MediaQueryList);
    const shell = (navigate: () => void) => <Workspace>
      <WorkspaceHeader><SidebarDrawerTrigger /></WorkspaceHeader>
      <Sidebar drawer><SidebarHeader><SidebarTitle render={<h2 />}>青野</SidebarTitle><SidebarToggle /></SidebarHeader>
        <SidebarContent aria-label="页面"><SidebarGroup>
          <SidebarLink href="#a" active onClick={event => { event.preventDefault(); navigate(); }}>A</SidebarLink>
          <SidebarLink href="#b" onClick={event => { event.preventDefault(); navigate(); }}>B</SidebarLink>
        </SidebarGroup></SidebarContent></Sidebar>
    </Workspace>;
    it("moves the sidebar into a drawer opened by a named button; the current page is marked there and navigating closes it", async () => {
      const spy = narrow(true); const user = userEvent.setup(); const navigate = vi.fn();
      render(shell(navigate));
      expect(screen.queryByRole("navigation")).toBeNull();
      const trigger = screen.getByRole("button", { name: "打开工作区导航" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      // 抽屉宿主按需加载：这一下按在宿主到位之前，仍要打开，不能无声落空。
      await user.click(trigger);
      await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));
      expect(await screen.findByRole("link", { name: "A" })).toHaveAttribute("aria-current", "page");
      // 抽屉里没有收起成 rail 这回事：切换按钮换成关闭。
      expect(screen.queryByRole("button", { name: "工作区导航" })).toBeNull();
      await user.click(screen.getByRole("link", { name: "B" }));
      expect(navigate).toHaveBeenCalledOnce();
      await waitFor(() => expect(screen.queryByRole("link", { name: "B" })).toBeNull());
      await waitFor(() => expect(trigger).toHaveFocus());
      spy.mockRestore();
    });
    it("closes with the close button, and does not close for a link that only opens a popup", async () => {
      const spy = narrow(true); const user = userEvent.setup();
      render(<Workspace><WorkspaceHeader><SidebarDrawerTrigger /></WorkspaceHeader><Sidebar drawer><SidebarToggle /><SidebarContent><SidebarLink href="#a" aria-haspopup="menu">账户</SidebarLink></SidebarContent></Sidebar></Workspace>);
      await user.click(screen.getByRole("button", { name: "打开工作区导航" }));
      await user.click(await screen.findByRole("link", { name: "账户" }));
      expect(screen.getByRole("link", { name: "账户" })).toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: "关闭" }));
      await waitFor(() => expect(screen.queryByRole("navigation")).toBeNull());
      spy.mockRestore();
    });
    it("ignores the button while no sidebar carries the drawer, and closes when the carrying sidebar leaves", async () => {
      const spy = narrow(true); const user = userEvent.setup();
      const page = (sidebar: boolean | "inline") => <Workspace><WorkspaceHeader><SidebarDrawerTrigger /></WorkspaceHeader>
        {sidebar && <Sidebar drawer={sidebar === true}><SidebarContent><SidebarLink href="#a">A</SidebarLink></SidebarContent></Sidebar>}</Workspace>;
      const { rerender } = render(page("inline"));
      const trigger = screen.getByRole("button", { name: "打开工作区导航" });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      rerender(page(true));
      await user.click(trigger);
      await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));
      // 侧栏换走（例如换了布局）时抽屉一并关上；再挂上来的侧栏不带着旧的「开」自己弹出。
      rerender(page(false));
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      rerender(page(true));
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByRole("link", { name: "A" })).toBeNull();
      spy.mockRestore();
    });
    it("works outside a Workspace with a shared handle, and returns focus to whichever button opened it", async () => {
      const spy = narrow(true); const user = userEvent.setup(); const handle = createSidebarDrawerHandle();
      render(<>
        <SidebarDrawerTrigger handle={handle} aria-label="顶栏导航" />
        <SidebarDrawerTrigger handle={handle} aria-label="工具栏导航" />
        <Sidebar drawer drawerHandle={handle}><SidebarToggle /><SidebarContent><SidebarLink href="#a">A</SidebarLink></SidebarContent></Sidebar>
      </>);
      const first = screen.getByRole("button", { name: "顶栏导航" });
      await user.click(first);
      await user.click(await screen.findByRole("button", { name: "关闭" }));
      await waitFor(() => expect(screen.queryByRole("link", { name: "A" })).toBeNull());
      await waitFor(() => expect(first).toHaveFocus());
      spy.mockRestore();
    });
    it("stays in place on wide screens", () => {
      const spy = narrow(false);
      render(shell(() => {}));
      expect(screen.getByRole("navigation", { name: "页面" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "工作区导航" })).toHaveAttribute("aria-expanded", "true");
      spy.mockRestore();
    });
    it("needs a Workspace or a shared handle", () => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => render(<Sidebar drawer><SidebarContent>x</SidebarContent></Sidebar>)).toThrow(/drawer requires/);
      expect(() => render(<SidebarDrawerTrigger />)).toThrow(/requires a Workspace/);
      error.mockRestore();
    });
  });
  it("has at most two levels: a SidebarSub inside another SidebarSub throws, in the expanded state and in the rail", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const tree = (collapsed: boolean) => <Sidebar collapsed={collapsed}><SidebarContent>
      <SidebarSub defaultOpen><SidebarSubTrigger>一级</SidebarSubTrigger><SidebarSubContent>
        <SidebarSub defaultOpen><SidebarSubTrigger>二级</SidebarSubTrigger><SidebarSubContent><SidebarLink href="#c">三级</SidebarLink></SidebarSubContent></SidebarSub>
      </SidebarSubContent></SidebarSub></SidebarContent></Sidebar>;
    expect(() => render(tree(false))).toThrow(/at most two levels/);
    expect(() => render(tree(true))).toThrow(/at most two levels/);
    error.mockRestore();
  });
});
