import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useRef, useState } from "react";
import { expect, test, vi } from "vitest";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverCreateHandle,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "../src/components/popover";

function Editor() {
  return <><PopoverTitle>编辑备注</PopoverTitle><PopoverDescription>仅自己可见。</PopoverDescription><label>备注<input /></label><PopoverClose>关闭</PopoverClose></>;
}

test("keyboard opens a named non-modal popup and Escape returns to its trigger", async () => {
  const user = userEvent.setup();
  render(<><Popover><PopoverTrigger>备注</PopoverTrigger><PopoverPopup><Editor /></PopoverPopup></Popover><button>下一条</button></>);
  const trigger = screen.getByRole("button", { name: "备注" });
  trigger.focus();
  await user.keyboard("{Enter}");
  const popup = await screen.findByRole("dialog", { name: "编辑备注" });
  expect(popup).toHaveAccessibleDescription("仅自己可见。");
  expect(popup).not.toHaveAttribute("aria-modal", "true");
  expect(screen.getByRole("button", { name: "下一条" }).closest("[aria-hidden=true]")).toBeNull();
  await waitFor(() => expect(screen.getByRole("textbox", { name: "备注" })).toHaveFocus());
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("Space opens the popup and its explicit close action returns keyboard focus", async () => {
  const user = userEvent.setup();
  render(<Popover><PopoverTrigger>备注</PopoverTrigger><PopoverPopup><Editor /></PopoverPopup></Popover>);
  const trigger = screen.getByRole("button", { name: "备注" });
  trigger.focus();
  await user.keyboard(" ");
  await screen.findByRole("dialog");
  await waitFor(() => expect(screen.getByRole("textbox", { name: "备注" })).toHaveFocus());
  await user.tab();
  expect(screen.getByRole("button", { name: "关闭" })).toHaveFocus();
  await user.keyboard("{Enter}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("Tab can leave a non-modal popup for the next background control", async () => {
  const user = userEvent.setup();
  render(<><Popover><PopoverTrigger>备注</PopoverTrigger><PopoverPopup><Editor /></PopoverPopup></Popover><button>下一条</button></>);
  const trigger = screen.getByRole("button", { name: "备注" });
  trigger.focus();
  await user.keyboard("{Enter}");
  await waitFor(() => expect(screen.getByRole("textbox", { name: "备注" })).toHaveFocus());
  await user.tab();
  await user.tab();
  await waitFor(() => expect(screen.getByRole("button", { name: "下一条" })).toHaveFocus());
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("clicking outside dismisses without moving focus away from the clicked control", async () => {
  const user = userEvent.setup();
  render(<><Popover><PopoverTrigger>备注</PopoverTrigger><PopoverPopup><Editor /></PopoverPopup></Popover><button>下一条</button></>);
  await user.click(screen.getByRole("button", { name: "备注" }));
  await screen.findByRole("dialog");
  const outside = screen.getByRole("button", { name: "下一条" });
  await user.click(outside);
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(outside).toHaveFocus();
});

test.each(["top", "left"] as const)("a %s popup keeps its native close path and focus return", async (side) => {
  const user = userEvent.setup();
  render(<Popover><PopoverTrigger>备注</PopoverTrigger><PopoverPopup side={side}><Editor /></PopoverPopup></Popover>);
  const trigger = screen.getByRole("button", { name: "备注" });
  await user.click(trigger);
  const popup = await screen.findByRole("dialog", { name: "编辑备注" });
  expect(popup).toHaveAttribute("data-side", side);
  await user.click(screen.getByRole("button", { name: "关闭" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("controlled open reports requests while the application retains the final decision", async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();
  const { rerender } = render(<Popover open onOpenChange={onOpenChange}><PopoverTrigger>备注</PopoverTrigger><PopoverPopup><Editor /></PopoverPopup></Popover>);
  await screen.findByRole("dialog");
  await user.keyboard("{Escape}");
  expect(onOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ reason: "escape-key" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  rerender(<Popover open={false} onOpenChange={onOpenChange}><PopoverTrigger>备注</PopoverTrigger><PopoverPopup><Editor /></PopoverPopup></Popover>);
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("a shared handle returns focus to the trigger that opened the active content", async () => {
  const user = userEvent.setup();
  const handle = PopoverCreateHandle<string>();
  render(<><PopoverTrigger handle={handle} payload="甲">对象甲</PopoverTrigger><PopoverTrigger handle={handle} payload="乙">对象乙</PopoverTrigger><Popover handle={handle}>{({ payload }) => <PopoverPopup><PopoverTitle>对象{payload}</PopoverTitle><PopoverClose>关闭</PopoverClose></PopoverPopup>}</Popover></>);
  const second = screen.getByRole("button", { name: "对象乙" });
  second.focus();
  await user.keyboard("{Enter}");
  await screen.findByRole("dialog", { name: "对象乙" });
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(second).toHaveFocus());
});

test("finalFocus can return to a meaningful parent when the trigger has been removed", async () => {
  function Example() {
    const parent = useRef<HTMLHeadingElement>(null);
    const [showTrigger, setShowTrigger] = useState(true);
    return <><h2 ref={parent} tabIndex={-1}>标题</h2><Popover>{showTrigger && <PopoverTrigger>备注</PopoverTrigger>}<PopoverPopup finalFocus={parent}><PopoverTitle>编辑备注</PopoverTitle><button onClick={() => setShowTrigger(false)}>移除入口</button><PopoverClose>关闭</PopoverClose></PopoverPopup></Popover></>;
  }
  const user = userEvent.setup();
  render(<Example />);
  screen.getByRole("button", { name: "备注" }).focus();
  await user.keyboard("{Enter}");
  await screen.findByRole("dialog");
  await user.click(screen.getByRole("button", { name: "移除入口" }));
  expect(screen.queryByRole("button", { name: "备注" })).not.toBeInTheDocument();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(screen.getByRole("heading", { name: "标题" })).toHaveFocus());
});

test("closing and reopening preserves an application-owned draft", async () => {
  function Draft() {
    const [value, setValue] = useState("原备注");
    return <Popover><PopoverTrigger>备注</PopoverTrigger><PopoverPopup><PopoverTitle>编辑备注</PopoverTitle><label>备注<input value={value} onChange={(event) => setValue(event.target.value)} /></label></PopoverPopup></Popover>;
  }
  const user = userEvent.setup();
  render(<Draft />);
  await user.click(screen.getByRole("button", { name: "备注" }));
  const input = await screen.findByRole("textbox", { name: "备注" });
  await user.clear(input);
  await user.type(input, "保留草稿");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await user.click(screen.getByRole("button", { name: "备注" }));
  expect(await screen.findByRole("textbox", { name: "备注" })).toHaveValue("保留草稿");
});

test("all styleable native parts preserve refs, state class functions, styles and composition", async () => {
  const popupRef = createRef<HTMLDivElement>();
  const positionerRef = createRef<HTMLDivElement>();
  const viewportRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();
  const click = vi.fn();
  const user = userEvent.setup();
  render(<Popover><PopoverTrigger className={({ open }) => open ? "text-primary" : "text-foreground"} onClick={click} ref={triggerRef}>备注</PopoverTrigger><PopoverPopup aria-label="备注面板" className={({ open }) => open ? "rounded-none shadow-none" : ""} data-object="note-1" id="note-popup" positionerProps={{ className: () => "z-40", "data-testid": "positioner", ref: positionerRef, style: { isolation: "isolate" } }} ref={popupRef} render={<section />} style={{ maxWidth: "100%" }} viewportProps={{ className: () => "p-0", "data-testid": "viewport", ref: viewportRef }}><PopoverClose>关闭</PopoverClose></PopoverPopup></Popover>);
  const trigger = screen.getByRole("button", { name: "备注" });
  await user.click(trigger);
  const popup = await screen.findByRole("dialog", { name: "备注面板" });
  expect(triggerRef.current).toBe(trigger);
  expect(trigger).toHaveClass("text-primary");
  expect(click).toHaveBeenCalledOnce();
  expect(popupRef.current).toBe(popup);
  expect(popup.tagName).toBe("SECTION");
  expect(popup).toHaveAttribute("id", "note-popup");
  expect(popup).toHaveAttribute("data-object", "note-1");
  expect(popup.style.maxWidth).toBe("100%");
  expect(popup).toHaveClass("rounded-none", "shadow-none");
  expect(popup).not.toHaveClass("rounded-overlay", "shadow-raised");
  expect(positionerRef.current).toBe(screen.getByTestId("positioner"));
  expect(positionerRef.current).toHaveClass("z-40");
  expect(positionerRef.current?.style.isolation).toBe("isolate");
  expect(viewportRef.current).toBe(screen.getByTestId("viewport"));
  expect(viewportRef.current).toHaveClass("p-0");
  expect(viewportRef.current).not.toHaveClass("p-(--qy-panel-padding-sm)");
});

test("an explicit portal container preserves a local density, direction and language context", async () => {
  const container = createRef<HTMLDivElement>();
  const user = userEvent.setup();
  render(<div data-density="compact" dir="rtl" lang="ar" ref={container}><Popover><PopoverTrigger>الاسم</PopoverTrigger><PopoverPopup aria-label="الاسم" portalProps={{ container }}>المحتوى</PopoverPopup></Popover></div>);
  await user.click(screen.getByRole("button", { name: "الاسم" }));
  const popup = await screen.findByRole("dialog", { name: "الاسم" });
  expect(container.current).toContainElement(popup);
  expect(popup.closest("[data-density]")).toHaveAttribute("data-density", "compact");
  expect(popup.closest("[dir]")).toHaveAttribute("dir", "rtl");
  expect(popup.closest("[lang]")).toHaveAttribute("lang", "ar");
  expect(popup).not.toHaveAttribute("data-density");
  expect(popup).not.toHaveAttribute("dir");
  expect(popup).not.toHaveAttribute("lang");
});

test("PopoverContent is the current popup composition", () => {
  expect(PopoverContent).toBe(PopoverPopup);
});
