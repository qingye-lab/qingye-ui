import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Sidebar, SidebarContent, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarToggle } from "../src/components/sidebar";
const dot = <span aria-hidden="true">●</span>;
describe("Sidebar", () => {
  it("collapses into an icon rail, not a hidden panel: content and real links stay in the accessibility tree", async () => {
    const user = userEvent.setup(); render(<Sidebar><SidebarToggle /><SidebarContent id="actual-nav" aria-label="页面"><SidebarLink href="/a" active icon={dot}>A</SidebarLink><SidebarLink href="/b" icon={dot}>B</SidebarLink></SidebarContent></Sidebar>);
    expect(screen.getByRole("button", { name: "收起" })).toHaveAttribute("aria-controls", "actual-nav");
    expect(screen.getByRole("link", { name: "A" })).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("button", { name: "收起" }));
    // 收起是 rail：导航与两个链接仍然挂载、仍然是真实链接，只是名称切到视觉隐藏（sr-only），
    // 不再像旧版那样整段 hidden——2026-10 的裁决要求收起态显示一列图标而不是消失。
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "A" })).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("button", { name: "展开" }));
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
  it("lets the sub-trigger's arrow follow its open state: the trigger is the disclosure group the arrow reads", () => {
    render(<Sidebar><SidebarContent><SidebarSub><SidebarSubTrigger icon={dot}>集合</SidebarSubTrigger><SidebarSubContent><SidebarLink href="#a">A</SidebarLink></SidebarSubContent></SidebarSub></SidebarContent></Sidebar>);
    const trigger = screen.getByRole("button", { name: "集合" });
    // DisclosureIcon rotates through `group-data-[panel-open]/disclosure`; without the group on
    // the trigger the class is inert and the arrow never turns.
    expect(trigger.className).toContain("group/disclosure");
    expect(trigger.querySelector("[data-slot=disclosure-icon]")?.getAttribute("class")).toContain("group-data-[panel-open]/disclosure:rotate-180");
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
    await waitFor(() => expect(screen.getByRole("button", { name: "展开" })).toHaveFocus());
  });
  it("honors cancellation on a controlled collapse", async () => {
    const user = userEvent.setup(); render(<Sidebar onCollapsedChange={(_, details) => details.cancel()}><SidebarToggle /><SidebarContent><SidebarLink href="#a">A</SidebarLink></SidebarContent></Sidebar>);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "收起" })).toBeInTheDocument();
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
  it("draws the current item on a surface role the project can retune, not a hard-coded paper", () => {
    render(<Sidebar><SidebarContent aria-label="页面"><SidebarLink href="/a" active>A</SidebarLink><SidebarLink href="/b">B</SidebarLink></SidebarContent></Sidebar>);
    expect(screen.getByRole("link", { name: "A" })).toHaveClass("bg-sidebar-current");
    expect(screen.getByRole("link", { name: "A" })).not.toHaveClass("bg-surface");
    expect(screen.getByRole("link", { name: "B" })).not.toHaveClass("bg-sidebar-current");
  });
  it("marks the current item with an ink line besides its surface: on the item's own edge, or on the guide line inside a sub-level", () => {
    render(<Sidebar><SidebarContent aria-label="页面">
      <SidebarLink href="/a" active>A</SidebarLink><SidebarLink href="/b">B</SidebarLink>
      <SidebarSub defaultOpen><SidebarSubTrigger>组</SidebarSubTrigger><SidebarSubContent><SidebarLink href="/c" active>C</SidebarLink><SidebarLink href="/d">D</SidebarLink></SidebarSubContent></SidebarSub>
    </SidebarContent></Sidebar>);
    const top = screen.getByRole("link", { name: "A" }); const nested = screen.getByRole("link", { name: "C" });
    for (const link of [top, nested]) expect(link).toHaveClass("relative", "before:absolute", "before:w-px", "before:bg-foreground");
    // 一级条目没有现成的线：画在自己的起始边内侧；二级条目加深的是面板引导线上自己那一段。
    expect(top).toHaveClass("before:start-0");
    expect(nested).not.toHaveClass("before:start-0");
    expect(nested.className).toContain("before:start-[calc(var(--qy-control-sm-padding)-var(--qy-control-md-icon)/2-var(--qy-control-content-gap))]");
    for (const name of ["B", "D"]) expect(screen.getByRole("link", { name }).className).not.toContain("before:bg-foreground");
  });
});
