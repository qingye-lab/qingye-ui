import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { HoverCard, HoverCardPopup, HoverCardTrigger } from "../src/components/hover-card";

describe("HoverCard", () => {
  test("hover and actual keyboard focus reveal the same supplementary content, with Escape and navigation intact", async () => {
    const user = userEvent.setup();
    render(
      <>
        <HoverCard>
          <HoverCardTrigger href="#detail" closeDelay={0}>对象</HoverCardTrigger>
          <HoverCardPopup>补充内容</HoverCardPopup>
        </HoverCard>
        <button>下一入口</button>
        <p id="detail">可直接到达的内容</p>
      </>,
    );
    const trigger = screen.getByRole("link", { name: "对象" });
    await user.hover(trigger);
    await screen.findByText("补充内容");
    await user.unhover(trigger);
    await waitFor(() => expect(screen.queryByText("补充内容")).toBeNull());
    await user.tab();
    expect(trigger).toHaveFocus();
    await screen.findByText("补充内容");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByText("补充内容")).toBeNull());
    await user.tab();
    expect(screen.getByRole("button", { name: "下一入口" })).toHaveFocus();
  });

  test("a default trigger without a reachable native link is rejected instead of creating hover-only access", () => {
    expect(() => render(<HoverCard><HoverCardTrigger>对象</HoverCardTrigger></HoverCard>)).toThrow("reachable link");
    expect(() => render(<HoverCard><HoverCardTrigger href="   ">空白地址</HoverCardTrigger></HoverCard>)).toThrow("reachable link");
  });

  test("accepts an explicit keyboard-accessible render trigger without href and exposes data-slot hooks", async () => {
    const user = userEvent.setup();
    render(
      <HoverCard>
        <HoverCardTrigger render={<button type="button" />} closeDelay={0}>查看摘要</HoverCardTrigger>
        <HoverCardPopup>预览详情</HoverCardPopup>
      </HoverCard>,
    );
    const trigger = screen.getByRole("button", { name: "查看摘要" });
    expect(trigger).toHaveAttribute("data-slot", "hover-card-trigger");
    await user.tab();
    expect(trigger).toHaveFocus();
    const popup = await screen.findByText("预览详情");
    expect(popup).toHaveAttribute("data-slot", "hover-card-popup");
  });

  test("supports controlled open state and notifies onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <HoverCard open={false} onOpenChange={onOpenChange}>
        <HoverCardTrigger href="#item" closeDelay={0}>受控对象</HoverCardTrigger>
        <HoverCardPopup>受控说明</HoverCardPopup>
      </HoverCard>,
    );
    expect(screen.queryByText("受控说明")).toBeNull();
    await user.hover(screen.getByRole("link", { name: "受控对象" }));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything()));
    expect(screen.queryByText("受控说明")).toBeNull();

    rerender(
      <HoverCard open onOpenChange={onOpenChange}>
        <HoverCardTrigger href="#item" closeDelay={0}>受控对象</HoverCardTrigger>
        <HoverCardPopup>受控说明</HoverCardPopup>
      </HoverCard>,
    );
    expect(await screen.findByText("受控说明")).toBeInTheDocument();
  });
});
