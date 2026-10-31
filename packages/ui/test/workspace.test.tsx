import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button";
import { Sidebar, SidebarContent, SidebarLink } from "../src/components/sidebar";
import { Workspace, WorkspaceActions, WorkspaceContent, WorkspaceHeader, WorkspaceHeaderPortal, WorkspaceSummary, WorkspaceSurface, WorkspaceTitle } from "../src/components/workspace";

function Shell({ header, children }: { header?: React.ReactNode; children?: React.ReactNode }) {
  return <Workspace>
    <Sidebar><SidebarContent aria-label="工作区"><SidebarLink href="/overview" active>概览</SidebarLink></SidebarContent></Sidebar>
    <WorkspaceSurface>
      <WorkspaceHeader>{header}</WorkspaceHeader>
      <WorkspaceContent>{children}</WorkspaceContent>
    </WorkspaceSurface>
  </Workspace>;
}

function Page({ title, action }: { title: string; action: string }) {
  return <>
    <WorkspaceHeaderPortal>
      <WorkspaceTitle>{title}</WorkspaceTitle>
      <WorkspaceActions><Button>{action}</Button></WorkspaceActions>
    </WorkspaceHeaderPortal>
    <p>正文</p>
  </>;
}

describe("Workspace", () => {
  it("exposes the header, one main and the page title as a level-one heading", () => {
    render(<Shell header={<><WorkspaceTitle>集合</WorkspaceTitle><WorkspaceSummary>12 个，2 个未同步</WorkspaceSummary><WorkspaceActions><Button>新建集合</Button></WorkspaceActions></>}><p>正文</p></Shell>);
    // 顶栏不在 main / section / article 里，所以是页面的 banner。
    const header = screen.getByRole("banner");
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(within(header).getByRole("heading", { level: 1, name: "集合" })).toBeInTheDocument();
    expect(within(header).getByText("12 个，2 个未同步")).toBeInTheDocument();
    expect(within(header).getByRole("button", { name: "新建集合" })).toBeInTheDocument();
    expect(within(screen.getByRole("main")).getByText("正文")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "工作区" })).toBeInTheDocument();
  });

  it("puts the header before the content in the document, so its actions come first in the tab order", () => {
    render(<Shell><Page title="成员" action="邀请成员" /><a href="/next">下一页</a></Shell>);
    const header = screen.getByRole("banner"); const main = screen.getByRole("main");
    expect(header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const action = screen.getByRole("button", { name: "邀请成员" }); const link = screen.getByRole("link", { name: "下一页" });
    expect(action.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("makes the content a programmatic focus target that stays out of the tab order while its content fits", () => {
    render(<Shell><p>正文</p></Shell>);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("tabindex", "-1");
    main.focus();
    expect(main).toHaveFocus();
  });

  it("starts the tab order with a skip link that moves focus into the content without changing the address", async () => {
    const user = userEvent.setup();
    render(<Shell><p>正文</p></Shell>);
    await user.tab();
    const skip = screen.getByRole("link", { name: "跳到主要内容" });
    expect(skip).toHaveFocus();
    const before = window.location.href;
    await user.keyboard("{Enter}");
    expect(screen.getByRole("main")).toHaveFocus();
    expect(window.location.href).toBe(before);
    expect(skip).toHaveAttribute("href", `#${screen.getByRole("main").id}`);
  });

  it("points the skip link at the content's own id when the caller gives one", async () => {
    const user = userEvent.setup();
    render(<Workspace><WorkspaceSurface><WorkspaceContent id="page-main"><p>正文</p></WorkspaceContent></WorkspaceSurface></Workspace>);
    expect(screen.getByRole("link", { name: "跳到主要内容" })).toHaveAttribute("href", "#page-main");
    await user.click(screen.getByRole("link", { name: "跳到主要内容" }));
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("updates keyboard access when content is inserted or changes inside a fixed-size wrapper", async () => {
    const content = React.createRef<HTMLElement>();
    render(<WorkspaceContent ref={content}><div style={{ height: "100%" }}><div data-testid="nested-content" /></div></WorkspaceContent>);
    const main = content.current!;
    const nested = screen.getByTestId("nested-content");
    Object.defineProperties(main, {
      clientHeight: { get: () => 200 },
      scrollHeight: { get: () => Number.parseFloat((nested.firstElementChild as HTMLElement | null)?.style.height || "0") },
    });
    const child = document.createElement("div");
    child.style.height = "600px";
    nested.appendChild(child);
    await waitFor(() => expect(main).toHaveAttribute("tabindex", "0"));
    child.style.height = "100px";
    await waitFor(() => expect(main).toHaveAttribute("tabindex", "-1"));
    child.style.height = "600px";
    await waitFor(() => expect(main).toHaveAttribute("tabindex", "0"));
    child.remove();
    await waitFor(() => expect(main).toHaveAttribute("tabindex", "-1"));
  });

  it("remeasures when a nested image loads inside a fixed-height wrapper, preserves an explicit tabIndex, and releases its observers", () => {
    const observers: MockResizeObserver[] = [];
    class MockResizeObserver {
      targets = new Set<Element>();
      constructor(private callback: ResizeObserverCallback) { observers.push(this); }
      observe(target: Element) { this.targets.add(target); }
      unobserve(target: Element) { this.targets.delete(target); }
      disconnect() { this.targets.clear(); }
      resize(target: Element) { if (this.targets.has(target)) this.callback([], this as unknown as ResizeObserver); }
    }
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    let height = 100;
    const content = React.createRef<HTMLElement>();
    const view = render(<WorkspaceContent ref={content} tabIndex={undefined}><div style={{ height: "100%" }}><img alt="记录" /></div></WorkspaceContent>);
    try {
      const main = content.current!;
      const image = screen.getByRole("img");
      expect(main).toHaveAttribute("tabindex", "-1");
      Object.defineProperties(main, { clientHeight: { get: () => 200 }, scrollHeight: { get: () => height } });
      const resize = () => act(() => { image.dispatchEvent(new Event("load")); });
      height = 600;
      resize();
      expect(main).toHaveAttribute("tabindex", "0");
      height = 100;
      resize();
      expect(main).toHaveAttribute("tabindex", "-1");
      view.rerender(<WorkspaceContent ref={content} tabIndex={3}><div style={{ height: "100%" }}><img alt="记录" /></div></WorkspaceContent>);
      height = 600;
      resize();
      expect(main).toHaveAttribute("tabindex", "3");
    } finally {
      view.unmount();
      vi.unstubAllGlobals();
    }
    expect(observers.every(observer => observer.targets.size === 0)).toBe(true);
  });

  it("returns to the top and replays the entrance when the page changes, but not on first mount; an anchor in the new page wins over the top", () => {
    const { rerender } = render(<WorkspaceContent transitionKey="/a"><p>甲</p></WorkspaceContent>);
    const main = screen.getByRole("main");
    let top = 240; Object.defineProperty(main, "scrollTop", { configurable: true, get: () => top, set: value => { top = value; } });
    expect(main).not.toHaveAttribute("data-motion");
    rerender(<WorkspaceContent transitionKey="/a"><p>甲</p></WorkspaceContent>);
    expect(top).toBe(240);
    rerender(<WorkspaceContent transitionKey="/b"><p>乙</p></WorkspaceContent>);
    expect(top).toBe(0);
    expect(main).toHaveAttribute("data-motion", "rise-in");
    const scrolled: Element[] = [];
    Element.prototype.scrollIntoView = function (this: Element) { scrolled.push(this); };
    window.location.hash = "#members";
    try {
      // 地址里残留的上一页锚点在新内容里找不到：照常回到顶部。
      top = 240; rerender(<WorkspaceContent transitionKey="/c"><p>丙</p></WorkspaceContent>);
      expect(top).toBe(0); expect(scrolled).toEqual([]);
      top = 240; rerender(<WorkspaceContent transitionKey="/d"><h2 id="members">成员</h2></WorkspaceContent>);
      expect(scrolled).toEqual([screen.getByRole("heading", { name: "成员" })]);
    } finally { window.location.hash = ""; delete (Element.prototype as Partial<Element>).scrollIntoView; }
  });

  it("replays the caller's own data-motion on a page change instead of replacing it", () => {
    const { rerender } = render(<WorkspaceContent transitionKey="/a" data-motion="fade-in"><p>甲</p></WorkspaceContent>);
    rerender(<WorkspaceContent transitionKey="/b" data-motion="fade-in"><p>乙</p></WorkspaceContent>);
    expect(screen.getByRole("main")).toHaveAttribute("data-motion", "fade-in");
  });

  it("sends a page's title and actions up into the header, and takes them away when the page unmounts", () => {
    const { rerender } = render(<Shell><Page title="成员" action="邀请成员" /></Shell>);
    const header = screen.getByRole("banner"); const main = screen.getByRole("main");
    expect(within(header).getByRole("heading", { level: 1, name: "成员" })).toBeInTheDocument();
    expect(within(header).getByRole("button", { name: "邀请成员" })).toBeInTheDocument();
    expect(within(main).queryByRole("button", { name: "邀请成员" })).not.toBeInTheDocument();
    expect(within(main).getByText("正文")).toBeInTheDocument();

    rerender(<Shell><Page key="next" title="权限" action="新建角色" /></Shell>);
    expect(within(header).getByRole("heading", { level: 1, name: "权限" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "邀请成员" })).not.toBeInTheDocument();

    rerender(<Shell><p>正文</p></Shell>);
    expect(within(header).queryByRole("heading")).not.toBeInTheDocument();
    expect(within(header).queryByRole("button")).not.toBeInTheDocument();
  });

  it("keeps the header's own children ahead of what a page sends", () => {
    render(<Shell header={<WorkspaceTitle>设置</WorkspaceTitle>}><WorkspaceHeaderPortal><WorkspaceActions><Button>保存</Button></WorkspaceActions></WorkspaceHeaderPortal></Shell>);
    const title = screen.getByRole("heading", { level: 1, name: "设置" }); const save = screen.getByRole("button", { name: "保存" });
    expect(within(screen.getByRole("banner")).getByRole("button", { name: "保存" })).toBe(save);
    expect(title.compareDocumentPosition(save) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("renders nothing for the portal when there is no header to receive it", () => {
    const { container } = render(<Workspace><WorkspaceSurface><WorkspaceContent><WorkspaceHeaderPortal><Button>保存</Button></WorkspaceHeaderPortal><p>正文</p></WorkspaceContent></WorkspaceSurface></Workspace>);
    expect(screen.queryByRole("button", { name: "保存" })).not.toBeInTheDocument();
    expect(screen.getByText("正文")).toBeInTheDocument();
    // 不在 Workspace 里同样不渲染，也不报错。
    render(<WorkspaceHeaderPortal><Button>保存</Button></WorkspaceHeaderPortal>, { container: container.appendChild(document.createElement("div")) });
    expect(screen.queryByRole("button", { name: "保存" })).not.toBeInTheDocument();
  });

  it("renders on the server without touching the document: the header is there, the page's portal waits for the client", () => {
    const html = renderToString(<Shell header={<WorkspaceTitle>集合</WorkspaceTitle>}><Page title="成员" action="邀请成员" /></Shell>);
    expect(html).toContain("集合");
    expect(html).toContain("正文");
    expect(html).not.toContain("邀请成员");
  });

  it("forwards ref, render and native props to the rendered elements", () => {
    const content = React.createRef<HTMLElement>(); const surface = React.createRef<HTMLDivElement>();
    render(<Workspace id="shell" render={<section aria-label="外壳" />}>
      <WorkspaceSurface ref={surface}>
        <WorkspaceHeader render={<div />} id="bar"><WorkspaceTitle level={2}>集合</WorkspaceTitle></WorkspaceHeader>
        <WorkspaceContent ref={content} id="main" />
      </WorkspaceSurface>
    </Workspace>);
    expect(screen.getByRole("region", { name: "外壳" })).toHaveAttribute("id", "shell");
    expect(surface.current).toContainElement(content.current);
    expect(content.current).toBe(screen.getByRole("main"));
    expect(content.current).toHaveAttribute("id", "main");
    // 页面已有自己的 banner 时，顶栏可以换成 div，不再是地标；标题层级独立于字号。
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(document.getElementById("bar")).toContainElement(screen.getByRole("heading", { level: 2, name: "集合" }));
  });
});
