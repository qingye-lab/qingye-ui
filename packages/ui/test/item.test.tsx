import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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
