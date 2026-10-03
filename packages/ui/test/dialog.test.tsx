import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Dialog, DialogClose, DialogCreateHandle, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "../src/components/dialog";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

function Editor() {
  return <><DialogHeader><DialogTitle>编辑名称</DialogTitle><DialogDescription>关闭后保留草稿。</DialogDescription></DialogHeader><label>名称<input /></label><DialogClose>关闭</DialogClose></>;
}

test("keyboard opens a named modal, enters the first control and Escape returns to the trigger", async () => {
  const user = userEvent.setup();
  render(<><Dialog><DialogTrigger>编辑</DialogTrigger><DialogPopup><Editor /></DialogPopup></Dialog><button>背景按钮</button></>);
  const trigger = screen.getByRole("button", { name: "编辑" });
  await user.tab();
  expect(trigger).toHaveFocus();
  await user.keyboard("{Enter}");
  const popup = await screen.findByRole("dialog", { name: "编辑名称" });
  expect(popup).toHaveAccessibleDescription("关闭后保留草稿。");
  expect(popup).toHaveAttribute("aria-modal", "true");
  expect(screen.queryByRole("button", { name: "背景按钮" })).not.toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole("textbox")).toHaveFocus());
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("modal Tab and Shift+Tab cycle inside the same dialog", async () => {
  const user = userEvent.setup();
  render(<><Dialog><DialogTrigger>编辑</DialogTrigger><DialogPopup><Editor /></DialogPopup></Dialog><button>背景按钮</button></>);
  await user.click(screen.getByRole("button", { name: "编辑" }));
  await waitFor(() => expect(screen.getByRole("textbox")).toHaveFocus());
  await user.tab({ shift: true });
  await waitFor(() => expect(screen.getByRole("button", { name: "关闭" })).toHaveFocus());
  await user.tab();
  await waitFor(() => expect(screen.getByRole("textbox")).toHaveFocus());
  await user.tab();
  await user.keyboard("{Enter}");
  await waitFor(() => expect(screen.getByRole("button", { name: "编辑" })).toHaveFocus());
});

test("a content-only dialog still receives initial focus", async () => {
  const user = userEvent.setup();
  render(<Dialog><DialogTrigger>详情</DialogTrigger><DialogPopup><DialogTitle>详情</DialogTitle></DialogPopup></Dialog>);
  await user.click(screen.getByRole("button", { name: "详情" }));
  await waitFor(() => expect(screen.getByRole("dialog")).toHaveFocus());
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.getByRole("button", { name: "详情" })).toHaveFocus());
});

test("an explicit initialFocus ref overrides DOM control order", async () => {
  const user = userEvent.setup();
  const field = createRef<HTMLInputElement>();
  render(<Dialog><DialogTrigger>编辑</DialogTrigger><DialogPopup initialFocus={field}><DialogTitle>名称</DialogTitle><DialogClose /><label>名称<input ref={field} /></label></DialogPopup></Dialog>);
  await user.click(screen.getByRole("button", { name: "编辑" }));
  await waitFor(() => expect(field.current).toHaveFocus());
});

test("Dialog backdrop dismisses and an explicit finalFocus restores its trigger", async () => {
  const user = userEvent.setup();
  // jsdom 的 focus 忽略 options；原语只在支持 preventScroll 时恢复外部点击焦点。
  // 模拟浏览器读取能力选项，仍使用 jsdom 的真实 focus，不伪造返回结果。
  const nativeFocus = HTMLElement.prototype.focus;
  const focus = vi.spyOn(HTMLElement.prototype, "focus").mockImplementation(function (this: HTMLElement, options) {
    void options?.preventScroll;
    nativeFocus.call(this, options);
  });
  try {
  const trigger = createRef<HTMLButtonElement>();
  render(<Dialog><DialogTrigger ref={trigger}>编辑</DialogTrigger><DialogPopup finalFocus={trigger} backdropProps={{ "data-testid": "backdrop" }}><Editor /></DialogPopup></Dialog>);
  await user.click(screen.getByRole("button", { name: "编辑" }));
  await screen.findByRole("dialog");
  await user.click(screen.getByTestId("backdrop"));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(screen.getByRole("button", { name: "编辑" })).toHaveFocus());
  } finally { focus.mockRestore(); }
});

test("controlled open reports a close request without overriding application state", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  const { rerender } = render(<Dialog open onOpenChange={change}><DialogPopup><Editor /></DialogPopup></Dialog>);
  await screen.findByRole("dialog");
  await user.keyboard("{Escape}");
  expect(change).toHaveBeenCalledWith(false, expect.objectContaining({ reason: "escape-key" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  rerender(<Dialog open={false} onOpenChange={change}><DialogPopup><Editor /></DialogPopup></Dialog>);
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("defaultOpen is an uncontrolled initial state and explicit close changes it", async () => {
  const user = userEvent.setup();
  render(<Dialog defaultOpen><DialogPopup><Editor /></DialogPopup></Dialog>);
  await screen.findByRole("dialog");
  await user.click(screen.getByRole("button", { name: "关闭" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("a removed trigger returns to the application-provided meaningful parent", async () => {
  function Example() {
    const parent = useRef<HTMLHeadingElement>(null);
    const [present, setPresent] = useState(true);
    return <><h2 ref={parent} tabIndex={-1}>标题</h2><Dialog>{present && <DialogTrigger>编辑</DialogTrigger>}<DialogPopup finalFocus={parent}><DialogTitle>名称</DialogTitle><button onClick={() => setPresent(false)}>移除入口</button><DialogClose /></DialogPopup></Dialog></>;
  }
  const user = userEvent.setup();
  render(<Example />);
  await user.click(screen.getByRole("button", { name: "编辑" }));
  await user.click(await screen.findByRole("button", { name: "移除入口" }));
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.getByRole("heading", { name: "标题" })).toHaveFocus());
});

test("nested Dialog Escape closes only the top layer and returns through both triggers", async () => {
  const user = userEvent.setup();
  render(<Dialog><DialogTrigger>编辑</DialogTrigger><DialogPopup><DialogTitle>名称</DialogTitle><Dialog><DialogTrigger>补充详情</DialogTrigger><DialogPopup><DialogTitle>详情</DialogTitle><DialogClose /></DialogPopup></Dialog><DialogClose /></DialogPopup></Dialog>);
  await user.click(screen.getByRole("button", { name: "编辑" }));
  const childTrigger = await screen.findByRole("button", { name: "补充详情" });
  await user.click(childTrigger);
  expect(await screen.findByRole("dialog", { name: "详情" })).toHaveAttribute("aria-modal", "true");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(childTrigger).toHaveFocus());
  expect(screen.getByRole("dialog", { name: "名称" })).toBeInTheDocument();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.getByRole("button", { name: "编辑" })).toHaveFocus());
});

test("application-owned drafts survive closing and re-entering", async () => {
  function Draft() {
    const [name, setName] = useState("原值");
    return <Dialog><DialogTrigger>编辑</DialogTrigger><DialogPopup><DialogTitle>名称</DialogTitle><label>名称<input value={name} onChange={(e) => setName(e.target.value)} /></label><DialogClose /></DialogPopup></Dialog>;
  }
  const user = userEvent.setup();
  render(<Draft />);
  await user.click(screen.getByRole("button", { name: "编辑" }));
  await user.clear(await screen.findByRole("textbox"));
  await user.type(screen.getByRole("textbox"), "新值");
  await user.keyboard("{Escape}");
  await user.click(await screen.findByRole("button", { name: "编辑" }));
  expect(await screen.findByRole("textbox")).toHaveValue("新值");
});

test("popup and structural parts preserve refs, render, class functions, styles and handlers", async () => {
  const user = userEvent.setup();
  const panel = createRef<HTMLDivElement>();
  const header = createRef<HTMLDivElement>();
  const click = vi.fn();
  render(<Dialog><DialogTrigger onClick={click}>编辑</DialogTrigger><DialogPopup ref={panel} id="example-dialog" render={<section />} className={() => "rounded-none shadow-none"} style={{ maxWidth: "100%" }} portalProps={{ "data-testid": "portal" }} backdropProps={{ "data-testid": "backdrop", className: () => "bg-transparent" }} viewportProps={{ "data-testid": "viewport", className: () => "p-0" }}><DialogHeader ref={header} render={<header />}><DialogTitle>名称</DialogTitle></DialogHeader><DialogPanel data-testid="content" /><DialogFooter data-testid="footer"><DialogClose /></DialogFooter></DialogPopup></Dialog>);
  await user.click(screen.getByRole("button", { name: "编辑" }));
  const popup = await screen.findByRole("dialog");
  expect(click).toHaveBeenCalledOnce();
  expect(panel.current).toBe(popup);
  expect(popup.tagName).toBe("SECTION");
  expect(popup).toHaveAttribute("id", "example-dialog");
  expect(popup).toHaveClass("rounded-none", "shadow-none");
  expect(popup).not.toHaveClass("rounded-overlay", "shadow-overlay");
  expect(popup.style.maxWidth).toBe("100%");
  expect(header.current?.tagName).toBe("HEADER");
  expect(screen.getByTestId("portal")).toContainElement(popup);
  expect(screen.getByTestId("backdrop")).toHaveClass("bg-transparent");
  expect(screen.getByTestId("viewport")).toHaveClass("p-0");
  expect(screen.getByTestId("content")).toHaveAttribute("data-slot", "dialog-panel");
  expect(screen.getByTestId("footer")).toHaveAttribute("data-slot", "dialog-footer");
});

test("default close label uses locale, while an explicit choice wins", async () => {
  render(<UILocaleProvider locale={enUS}><Dialog defaultOpen><DialogPopup><DialogTitle>Name</DialogTitle><DialogClose /><DialogClose>Keep</DialogClose></DialogPopup></Dialog></UILocaleProvider>);
  expect(await screen.findByRole("button", { name: "Close" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Keep" })).toBeInTheDocument();
});

test("shared triggers retain the active payload and return to the actual opener", async () => {
  const user = userEvent.setup();
  const handle = DialogCreateHandle<string>();
  render(<><DialogTrigger handle={handle} payload="甲">甲入口</DialogTrigger><DialogTrigger handle={handle} payload="乙">乙入口</DialogTrigger><Dialog handle={handle}>{({ payload }) => <DialogPopup><DialogTitle>{payload}名称</DialogTitle><DialogClose /></DialogPopup>}</Dialog></>);
  const trigger = screen.getByRole("button", { name: "乙入口" });
  await user.tab(); await user.tab(); await user.keyboard("{Enter}");
  expect(await screen.findByRole("dialog", { name: "乙名称" })).toBeInTheDocument();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("a local portal container retains density, language and direction", async () => {
  const user = userEvent.setup();
  const container = createRef<HTMLDivElement>();
  render(<div ref={container} data-density="compact" lang="ar" dir="rtl"><Dialog><DialogTrigger>打开</DialogTrigger><DialogPopup portalProps={{ container }}><DialogTitle>名称</DialogTitle><DialogClose /></DialogPopup></Dialog></div>);
  await user.click(screen.getByRole("button", { name: "打开" }));
  const popup = await screen.findByRole("dialog");
  expect(container.current).toContainElement(popup);
  expect(popup.closest("[data-density]")).toHaveAttribute("data-density", "compact");
  expect(popup.closest("[lang]")).toHaveAttribute("lang", "ar");
  expect(popup.closest("[dir]")).toHaveAttribute("dir", "rtl");
});
