import { render, screen, within } from "@testing-library/react";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
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
