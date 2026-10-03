import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { HoverCard, HoverCardPopup, HoverCardTrigger } from "../src/components/hover-card";

test("hover and actual keyboard focus reveal the same supplementary content, with Escape and navigation intact", async () => {
  const user = userEvent.setup();
  render(<><HoverCard><HoverCardTrigger href="#detail" closeDelay={0}>对象</HoverCardTrigger><HoverCardPopup>补充内容</HoverCardPopup></HoverCard><button>下一入口</button><p id="detail">可直接到达的内容</p></>);
  const trigger = screen.getByRole("link", { name: "对象" });
  await user.hover(trigger); await screen.findByText("补充内容");
  await user.unhover(trigger); await waitFor(() => expect(screen.queryByText("补充内容")).toBeNull());
  await user.tab(); expect(trigger).toHaveFocus(); await screen.findByText("补充内容");
  await user.keyboard("{Escape}"); await waitFor(() => expect(screen.queryByText("补充内容")).toBeNull());
  await user.tab(); expect(screen.getByRole("button", { name: "下一入口" })).toHaveFocus();
});
test("a default trigger without a reachable native link is rejected instead of creating hover-only access", () => {
  expect(() => render(<HoverCard><HoverCardTrigger>对象</HoverCardTrigger></HoverCard>)).toThrow("reachable link");
});
