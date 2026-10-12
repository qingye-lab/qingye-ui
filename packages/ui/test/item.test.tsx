import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemLink, ItemTitle } from "../src/components/item";

describe("Item", () => {
  it("allows a list item with a primary link and a separate command", () => {
    const action = vi.fn(); render(<ul><Item render={<li />}><ItemContent><ItemTitle><ItemLink href="/entry">条目</ItemLink></ItemTitle><ItemDescription>附属内容</ItemDescription></ItemContent><ItemActions><Button onClick={action}>操作</Button></ItemActions></Item></ul>);
    const link = screen.getByRole("link"); const button = screen.getByRole("button"); expect(screen.getByRole("listitem")).toContainElement(link); expect(link).not.toContainElement(button); fireEvent.click(button); expect(action).toHaveBeenCalledOnce();
  });
  it("keeps a standalone rendered link ref, attributes and merged click handlers", () => {
    const clicked = vi.fn(); const rendered = vi.fn((event: React.MouseEvent) => event.preventDefault()); let node: HTMLElement | null = null;
    render(<Item ref={element => { node = element; }} render={<a href="/item" onClick={rendered} />} onClick={clicked}><ItemTitle>条目链接</ItemTitle></Item>);
    const link = screen.getByRole("link"); fireEvent.click(link); expect(node).toBe(link); expect(link).toHaveAttribute("data-slot", "item"); expect(clicked).toHaveBeenCalledOnce(); expect(rendered).toHaveBeenCalledOnce();
  });
});

describe("ItemActions reveal", () => {
  const row = (reveal?: "always" | "hover") => <ul><Item render={<li />}><ItemContent><ItemTitle>蚕室 3</ItemTitle></ItemContent><ItemActions reveal={reveal} resting={<time dateTime="2026-10-12T08:30">08:30</time>}><Button variant="quiet" size="sm">编辑</Button><Button variant="quiet" size="sm">归档</Button></ItemActions></Item></ul>;
  it("hides by opacity only: the actions stay in the document, the accessibility tree and the tab order", async () => {
    const user = userEvent.setup(); render(row("hover"));
    expect(screen.getByRole("button", { name: "编辑" })).toBeVisible();
    expect(screen.getByRole("button", { name: "归档" })).toBeInTheDocument();
    expect(screen.getByText("08:30")).toBeInTheDocument();
    await user.tab(); expect(screen.getByRole("button", { name: "编辑" })).toHaveFocus();
    await user.tab(); expect(screen.getByRole("button", { name: "归档" })).toHaveFocus();
  });
  it("without reveal, actions render as before, directly in the actions container", () => {
    const { container } = render(row());
    const actions = container.querySelector("[data-slot=item-actions]")!;
    expect(actions).toHaveAttribute("data-reveal", "always");
    expect(container.querySelector("[data-slot=item-actions-group]")).toBeNull();
    expect(actions).toContainElement(screen.getByRole("button", { name: "编辑" }));
  });
  it("puts the resting content and the actions in one container", () => {
    const { container } = render(row("hover"));
    const actions = container.querySelector("[data-slot=item-actions]")!;
    expect(actions).toHaveAttribute("data-reveal", "hover");
    expect(actions).toContainElement(screen.getByText("08:30"));
    expect(actions).toContainElement(screen.getByRole("button", { name: "归档" }));
  });
});
