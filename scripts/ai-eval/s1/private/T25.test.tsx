import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Assignee } from "../Assignee";

const person = { name: "林远", email: "linyuan@example.com", profileUrl: "https://example.com/u/linyuan", deactivated: false };
const gone = { ...person, deactivated: true };
const nameLink = () => screen.getByRole("link", { name: "林远" });

describe("T25 Assignee", () => {
  it("[behavior] 姓名是指向资料页的链接", () => {
    render(<Assignee person={person} />);
    expect(nameLink().getAttribute("href")).toBe(person.profileUrl);
  });

  it("[behavior] 悬停姓名后预览显示邮箱", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<Assignee person={person} />);
    await user.hover(nameLink());
    expect(await screen.findByText(person.email, {}, { timeout: 3000 })).toBeTruthy();
  });

  it("[behavior] 聚焦姓名后预览显示邮箱", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<Assignee person={person} />);
    await user.tab();
    expect(document.activeElement).toBe(nameLink());
    expect(await screen.findByText(person.email, {}, { timeout: 3000 })).toBeTruthy();
  });

  it("[state] 未停用时不显示“已停用”", async () => {
    render(<Assignee person={person} />);
    expect(screen.queryAllByText(/已停用/).length).toBe(0);
  });

  it("[a11y] 停用状态无需悬停即可见", () => {
    render(<Assignee person={gone} />);
    // 不做任何悬停、聚焦：“已停用”已是页面上的文字，且不在预览卡片或提示浮层里
    const nodes = screen.queryAllByText(/已停用/).filter(el => !el.closest("[data-slot^='hover-card']") && !el.closest("[data-slot^='tooltip']"));
    expect(nodes.length).toBeGreaterThan(0);
  });

  it("[api] 预览来自库（hover-card 相关 data-slot，悬停后出现）", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<Assignee person={person} />);
    await user.hover(nameLink());
    const email = await screen.findByText(person.email, {}, { timeout: 3000 });
    expect(email.closest("[data-slot^='hover-card']")).toBeTruthy();
  });
});
