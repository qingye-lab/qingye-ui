import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SkipLink } from "../src/components/skip-link";

describe("SkipLink", () => {
  it("is the first Tab stop and reads the localized default text", async () => {
    const user = userEvent.setup();
    render(<><SkipLink href="#main" /><button type="button">导航</button><main id="main">正文</main></>);
    await user.tab();
    expect(screen.getByRole("link", { name: "跳到主要内容" })).toHaveFocus();
  });

  it("moves focus to the target even when the target is not focusable yet", async () => {
    const user = userEvent.setup();
    render(<><SkipLink href="#main">跳到正文</SkipLink><button type="button">导航</button><main id="main">正文</main></>);
    await user.click(screen.getByRole("link", { name: "跳到正文" }));
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("leaves the browser's default jump alone when the target does not exist", () => {
    render(<SkipLink href="#missing" />);
    // fireEvent returns false when the event was cancelled.
    expect(fireEvent.click(screen.getByRole("link"))).toBe(true);
  });
});
