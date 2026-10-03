import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { Button } from "../src/components/button";
import { Tooltip, TooltipContent, TooltipCreateHandle, TooltipPopup, TooltipProvider, TooltipTrigger } from "../src/components/tooltip";

afterEach(() => vi.useRealTimers());

test("keyboard focus shows supplementary text immediately, associates it, and Escape keeps focus", async () => {
  const user = userEvent.setup();
  render(<TooltipProvider delay={10000}><Tooltip><TooltipTrigger render={<Button aria-label="复制地址" shape="icon" />}>C</TooltipTrigger><TooltipPopup>复制完整的 HTTPS 地址</TooltipPopup></Tooltip></TooltipProvider>);
  const trigger = screen.getByRole("button", { name: "复制地址" });
  await user.tab();
  const popup = await screen.findByRole("tooltip");
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAccessibleName("复制地址");
  expect(trigger).toHaveAccessibleDescription("复制完整的 HTTPS 地址");
  expect(trigger.getAttribute("aria-describedby")?.split(" ")).toContain(popup.id);
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
  expect(trigger).not.toHaveAttribute("aria-describedby");
});

test("Tab leaves the tooltip for the next control without a focus trap", async () => {
  const user = userEvent.setup();
  render(<><Tooltip><TooltipTrigger>复制地址</TooltipTrigger><TooltipPopup>HTTPS 地址</TooltipPopup></Tooltip><button>下一条</button></>);
  await user.tab();
  await screen.findByRole("tooltip");
  await user.tab();
  expect(screen.getByRole("button", { name: "下一条" })).toHaveFocus();
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
});

test.each(["root", "trigger"])("%s disabled stops the hint while the named action remains usable", async (part) => {
  const user = userEvent.setup();
  const clicked = vi.fn();
  render(<Tooltip disabled={part === "root"}><TooltipTrigger disabled={part === "trigger"} onClick={clicked}>复制地址</TooltipTrigger><TooltipPopup>HTTPS 地址</TooltipPopup></Tooltip>);
  const trigger = screen.getByRole("button", { name: "复制地址" });
  await user.tab();
  expect(trigger).toHaveFocus();
  expect(trigger).not.toBeDisabled();
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  await user.keyboard("{Enter}");
  expect(clicked).toHaveBeenCalledOnce();
});

test("a natively disabled Button is skipped and its reason stays visible", async () => {
  const user = userEvent.setup();
  const clicked = vi.fn();
  render(<><p id="disabled-reason">当前操作不可用。</p><Tooltip><TooltipTrigger render={<Button disabled aria-describedby="disabled-reason" onClick={clicked} />}>保存</TooltipTrigger><TooltipPopup>说明</TooltipPopup></Tooltip><button>返回</button></>);
  const trigger = screen.getByRole("button", { name: "保存" });
  expect(trigger).toBeDisabled();
  expect(trigger).toHaveAccessibleDescription("当前操作不可用。");
  await user.tab();
  expect(screen.getByRole("button", { name: "返回" })).toHaveFocus();
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  expect(clicked).not.toHaveBeenCalled();
});

test("a directly rendered native disabled control does not open a pointer-only hint", async () => {
  vi.useFakeTimers();
  render(<Tooltip><TooltipTrigger render={<Button disabled />}>保存</TooltipTrigger><TooltipPopup>说明</TooltipPopup></Tooltip>);
  const trigger = screen.getByRole("button", { name: "保存" });
  fireEvent.mouseEnter(trigger);
  fireEvent.mouseMove(trigger);
  await act(async () => { await vi.advanceTimersByTimeAsync(700); });
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

test("Provider delays first pointer hover and shares instant opening with adjacent triggers", async () => {
  vi.useFakeTimers();
  render(<TooltipProvider delay={600} timeout={400}><Tooltip><TooltipTrigger>复制地址</TooltipTrigger><TooltipPopup>HTTPS 地址</TooltipPopup></Tooltip><Tooltip><TooltipTrigger>复制编号</TooltipTrigger><TooltipPopup>编号</TooltipPopup></Tooltip></TooltipProvider>);
  fireEvent.mouseEnter(screen.getByRole("button", { name: "复制地址" }));
  fireEvent.mouseMove(screen.getByRole("button", { name: "复制地址" }));
  await act(async () => { await vi.advanceTimersByTimeAsync(599); });
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  await act(async () => { await vi.advanceTimersByTimeAsync(1); });
  expect(screen.getByRole("tooltip")).toHaveTextContent("HTTPS 地址");
  fireEvent.mouseLeave(screen.getByRole("button", { name: "复制地址" }));
  fireEvent.mouseEnter(screen.getByRole("button", { name: "复制编号" }));
  fireEvent.mouseMove(screen.getByRole("button", { name: "复制编号" }));
  await act(async () => { await vi.advanceTimersByTimeAsync(1); });
  expect(screen.getByRole("tooltip")).toHaveTextContent("编号");
});

test("Trigger can explicitly override Provider pointer delay", async () => {
  vi.useFakeTimers();
  render(<TooltipProvider delay={600}><Tooltip><TooltipTrigger delay={20}>复制地址</TooltipTrigger><TooltipPopup>HTTPS 地址</TooltipPopup></Tooltip></TooltipProvider>);
  fireEvent.mouseEnter(screen.getByRole("button", { name: "复制地址" }));
  fireEvent.mouseMove(screen.getByRole("button", { name: "复制地址" }));
  await act(async () => { await vi.advanceTimersByTimeAsync(19); });
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  await act(async () => { await vi.advanceTimersByTimeAsync(1); });
  expect(screen.getByRole("tooltip")).toBeInTheDocument();
});

test("controlled open reports an Escape request without inventing application state", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  const { rerender } = render(<Tooltip open onOpenChange={change}><TooltipTrigger>复制地址</TooltipTrigger><TooltipPopup>HTTPS 地址</TooltipPopup></Tooltip>);
  await screen.findByRole("tooltip");
  await user.keyboard("{Escape}");
  expect(change).toHaveBeenCalledWith(false, expect.objectContaining({ reason: "escape-key" }));
  expect(screen.getByRole("tooltip")).toBeInTheDocument();
  rerender(<Tooltip open={false}><TooltipTrigger>复制地址</TooltipTrigger><TooltipPopup>HTTPS 地址</TooltipPopup></Tooltip>);
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
});

test("shared handle presents the payload of the focused trigger", async () => {
  const user = userEvent.setup();
  const handle = TooltipCreateHandle<string>();
  render(<><TooltipTrigger handle={handle} payload="HTTPS 地址">复制地址</TooltipTrigger><TooltipTrigger handle={handle} payload="编号内容">复制编号</TooltipTrigger><Tooltip handle={handle}>{({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}</Tooltip></>);
  await user.tab();
  expect(await screen.findByRole("tooltip")).toHaveTextContent("HTTPS 地址");
  await user.tab();
  await waitFor(() => expect(screen.getByRole("tooltip")).toHaveTextContent("编号内容"));
});

test("Popup preserves native attributes, render, ref, style and state-based class overrides", async () => {
  const user = userEvent.setup();
  const popupRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();
  render(<Tooltip><TooltipTrigger ref={triggerRef} data-object="address">复制地址</TooltipTrigger><TooltipPopup id="address-hint" ref={popupRef} render={<section />} data-object="address" style={{ maxWidth: "100%" }} className={({ open }) => open ? "rounded-none shadow-none" : ""}>HTTPS 地址</TooltipPopup></Tooltip>);
  await user.tab();
  const popup = await screen.findByRole("tooltip");
  expect(popupRef.current).toBe(popup);
  expect(triggerRef.current).toBe(screen.getByRole("button", { name: "复制地址" }));
  expect(popup.tagName).toBe("SECTION");
  expect(popup).toHaveAttribute("id", "address-hint");
  expect(popup).toHaveAttribute("data-object", "address");
  expect(popup.style.maxWidth).toBe("100%");
  expect(popup).toHaveClass("rounded-none", "shadow-none");
  expect(popup).not.toHaveClass("rounded-overlay", "shadow-raised");
});

test("a portal container preserves local language, direction and density", async () => {
  const user = userEvent.setup();
  const container = createRef<HTMLDivElement>();
  render(<div ref={container} lang="ar" dir="rtl" data-density="compact"><Tooltip><TooltipTrigger>نسخ</TooltipTrigger><TooltipPopup portalProps={{ container }}>الوصف</TooltipPopup></Tooltip></div>);
  await user.tab();
  const popup = await screen.findByRole("tooltip");
  expect(container.current).toContainElement(popup);
  expect(popup.closest("[lang]")).toHaveAttribute("lang", "ar");
  expect(popup.closest("[dir]")).toHaveAttribute("dir", "rtl");
  expect(popup.closest("[data-density]")).toHaveAttribute("data-density", "compact");
});

test("TooltipContent retains its public Popup alias", () => expect(TooltipContent).toBe(TooltipPopup));

test("open hints preserve existing descriptions through a caller rerender and remove only their own id", async () => {
  const user = userEvent.setup();
  function Example({ description }: { description: string }) {
    return <><p id="format">纯文本地址</p><p id="scope">当前说明</p><Tooltip><TooltipTrigger aria-describedby={description}>复制地址</TooltipTrigger><TooltipPopup>HTTPS 格式</TooltipPopup></Tooltip></>;
  }
  const { rerender } = render(<Example description="format" />);
  await user.tab();
  const trigger = screen.getByRole("button", { name: "复制地址" });
  const popup = await screen.findByRole("tooltip");
  expect(trigger.getAttribute("aria-describedby")?.split(" ")).toEqual(["format", popup.id]);
  rerender(<Example description="scope" />);
  await waitFor(() => expect(trigger.getAttribute("aria-describedby")?.split(" ")).toEqual(["scope", popup.id]));
  await user.keyboard("{Escape}");
  await waitFor(() => expect(trigger).toHaveAttribute("aria-describedby", "scope"));
});

test("shared payload descriptions move to the active trigger only", async () => {
  const user = userEvent.setup();
  const handle = TooltipCreateHandle<string>();
  render(<><TooltipTrigger handle={handle} payload="HTTPS 格式">复制地址</TooltipTrigger><TooltipTrigger handle={handle} payload="编号说明">复制编号</TooltipTrigger><Tooltip handle={handle}>{({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}</Tooltip></>);
  await user.tab();
  const popup = await screen.findByRole("tooltip");
  const first = screen.getByRole("button", { name: "复制地址" });
  const second = screen.getByRole("button", { name: "复制编号" });
  expect(first).toHaveAttribute("aria-describedby", popup.id);
  expect(second).not.toHaveAttribute("aria-describedby");
  await user.tab();
  await waitFor(() => expect(first).not.toHaveAttribute("aria-describedby"));
  expect(second).toHaveAccessibleDescription("编号说明");
});

test("React callback ref cleanup is retained for the trigger and popup", async () => {
  const user = userEvent.setup();
  const triggerCleanup = vi.fn();
  const popupCleanup = vi.fn();
  const { unmount } = render(<Tooltip><TooltipTrigger ref={() => triggerCleanup}>复制地址</TooltipTrigger><TooltipPopup ref={() => popupCleanup}>HTTPS 格式</TooltipPopup></Tooltip>);
  await user.tab();
  await screen.findByRole("tooltip");
  unmount();
  expect(triggerCleanup).toHaveBeenCalledOnce();
  expect(popupCleanup).toHaveBeenCalledOnce();
});
