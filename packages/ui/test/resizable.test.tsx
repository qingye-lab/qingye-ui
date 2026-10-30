import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, type ResizablePanelGroupProps, type ResizablePanelProps } from "../src/components/resizable";

// jsdom 不做布局：只有分栏组量得出长度（像素界限与指针位移都靠它换算），其余元素仍是 0。
const GROUP_LENGTH = 1000;
beforeEach(() => {
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
    const length = this.getAttribute("data-slot") === "resizable-panel-group" ? GROUP_LENGTH : 0;
    return { x: 0, y: 0, left: 0, top: 0, right: length, bottom: length, width: length, height: length, toJSON: () => ({}) };
  });
});
afterEach(() => { vi.restoreAllMocks(); document.body.removeAttribute("style"); });

function Split({ first, second, group, handle = "列表" }: { first?: ResizablePanelProps; second?: ResizablePanelProps; group?: ResizablePanelGroupProps; handle?: string }) {
  return <ResizablePanelGroup {...group}>
    <ResizablePanel id="list" defaultSize={30} {...first}>列表</ResizablePanel>
    <ResizableHandle aria-label={handle} />
    <ResizablePanel id="detail" defaultSize={70} {...second}>详情</ResizablePanel>
  </ResizablePanelGroup>;
}
const handleEl = () => screen.getByRole("separator");

test("the handle is a focusable separator whose values describe the previous panel", () => {
  render(<Split />);
  expect(handleEl()).toHaveAttribute("tabindex", "0");
  expect(handleEl()).toHaveAttribute("aria-orientation", "vertical");
  expect(handleEl()).toHaveAttribute("aria-valuenow", "30");
  expect(handleEl()).toHaveAttribute("aria-valuemin", "0");
  expect(handleEl()).toHaveAttribute("aria-valuemax", "100");
  expect(handleEl()).toHaveAttribute("aria-controls", "list");
  expect(screen.getByRole("separator", { name: "列表" })).toBe(handleEl());
});

test("a vertical group has a horizontal separator", () => {
  render(<Split group={{ orientation: "vertical" }} />);
  expect(handleEl()).toHaveAttribute("aria-orientation", "horizontal");
});

test("valuemin and valuemax follow both panels' limits", () => {
  render(<Split first={{ minSize: 20 }} second={{ minSize: 25 }} />);
  expect(handleEl()).toHaveAttribute("aria-valuemin", "20");
  expect(handleEl()).toHaveAttribute("aria-valuemax", "75");
});

test("a handle without an accessible name throws; aria-labelledby is enough", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<ResizablePanelGroup><ResizablePanel>A</ResizablePanel><ResizableHandle /><ResizablePanel>B</ResizablePanel></ResizablePanelGroup>)).toThrow(/aria-label or aria-labelledby/);
  expect(() => render(<ResizablePanelGroup><ResizablePanel>A</ResizablePanel><ResizableHandle aria-label="  " /><ResizablePanel>B</ResizablePanel></ResizablePanelGroup>)).toThrow(/aria-label or aria-labelledby/);
  render(<ResizablePanelGroup><ResizablePanel>A</ResizablePanel><ResizableHandle aria-labelledby="name" /><ResizablePanel>B</ResizablePanel></ResizablePanelGroup>);
  expect(handleEl()).toHaveAttribute("aria-labelledby", "name");
});

test("panels without defaultSize share the rest equally", () => {
  const onLayout = vi.fn();
  render(<ResizablePanelGroup onLayout={onLayout}>
    <ResizablePanel id="a" defaultSize={50}>A</ResizablePanel><ResizableHandle aria-label="A" />
    <ResizablePanel id="b">B</ResizablePanel><ResizableHandle aria-label="B" />
    <ResizablePanel id="c">C</ResizablePanel>
  </ResizablePanelGroup>);
  const [first, second] = screen.getAllByRole("separator");
  expect(first).toHaveAttribute("aria-valuenow", "50");
  expect(second).toHaveAttribute("aria-valuenow", "25");
  expect(onLayout).not.toHaveBeenCalled();
});

test("arrow keys move the splitter by a step and report each result", async () => {
  const onLayout = vi.fn();
  render(<Split group={{ onLayout }} />);
  handleEl().focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(onLayout).toHaveBeenLastCalledWith([40, 60]);
  expect(handleEl()).toHaveAttribute("aria-valuenow", "40");
  await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
  expect(onLayout).toHaveBeenLastCalledWith([20, 80]);
  expect(onLayout).toHaveBeenCalledTimes(3);
});

test("a vertical group answers to the up and down arrows only", async () => {
  const onLayout = vi.fn();
  render(<Split group={{ orientation: "vertical", onLayout }} />);
  handleEl().focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(onLayout).not.toHaveBeenCalled();
  await userEvent.keyboard("{ArrowDown}");
  expect(onLayout).toHaveBeenLastCalledWith([40, 60]);
  await userEvent.keyboard("{ArrowUp}");
  expect(onLayout).toHaveBeenLastCalledWith([30, 70]);
});

test("Home and End go to the smallest and largest size both panels allow", async () => {
  const onLayout = vi.fn();
  render(<Split first={{ minSize: 15 }} second={{ minSize: 35 }} group={{ onLayout }} />);
  handleEl().focus();
  await userEvent.keyboard("{End}");
  expect(onLayout).toHaveBeenLastCalledWith([65, 35]);
  await userEvent.keyboard("{Home}");
  expect(onLayout).toHaveBeenLastCalledWith([15, 85]);
});

test("limits clamp the result, and a key that cannot move anything reports nothing", async () => {
  const onLayout = vi.fn();
  render(<Split first={{ defaultSize: 25, minSize: 20 }} second={{ defaultSize: 75 }} group={{ onLayout }} />);
  handleEl().focus();
  await userEvent.keyboard("{ArrowLeft}");
  expect(onLayout).toHaveBeenLastCalledWith([20, 80]);
  await userEvent.keyboard("{ArrowLeft}");
  expect(onLayout).toHaveBeenCalledTimes(1);
});

test("maxSize on the other side is enforced as well", async () => {
  const onLayout = vi.fn();
  render(<Split second={{ maxSize: 75 }} group={{ onLayout }} />);
  handleEl().focus();
  await userEvent.keyboard("{ArrowLeft}");
  // 后一个面板上限 75：前一个至少 25，所以 30 → 25 而不是 20。
  expect(onLayout).toHaveBeenLastCalledWith([25, 75]);
  expect(handleEl()).toHaveAttribute("aria-valuemin", "25");
});

test("pixel limits are converted with the measured group length", async () => {
  const onLayout = vi.fn();
  render(<Split first={{ minSize: "240px", maxSize: "600px" }} group={{ onLayout }} />);
  expect(handleEl()).toHaveAttribute("aria-valuemin", "24");
  expect(handleEl()).toHaveAttribute("aria-valuemax", "60");
  handleEl().focus();
  await userEvent.keyboard("{Home}");
  expect(onLayout).toHaveBeenLastCalledWith([24, 76]);
  await userEvent.keyboard("{End}");
  expect(onLayout).toHaveBeenLastCalledWith([60, 40]);
});

test("a pixel limit that the initial layout violates is applied at once", () => {
  render(<Split first={{ defaultSize: 10, minSize: "200px" }} />);
  expect(handleEl()).toHaveAttribute("aria-valuenow", "20");
});

test("an invalid bound is rejected", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Split first={{ minSize: "20em" as "20px" }} />)).toThrow(/minSize/);
});

test("Enter collapses a collapsible panel and restores its previous size", async () => {
  const onLayout = vi.fn(); const onCollapse = vi.fn(); const onExpand = vi.fn();
  render(<Split first={{ defaultSize: 30, minSize: 20, collapsible: true, onCollapse, onExpand }} group={{ onLayout }} />);
  handleEl().focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(onLayout).toHaveBeenLastCalledWith([40, 60]);
  await userEvent.keyboard("{Enter}");
  expect(onLayout).toHaveBeenLastCalledWith([0, 100]);
  expect(onCollapse).toHaveBeenCalledTimes(1);
  expect(handleEl()).toHaveAttribute("aria-valuenow", "0");
  expect(document.getElementById("list")).toHaveAttribute("data-collapsed");
  // 折叠后再按「更小」不会被夹回最小值而展开。
  await userEvent.keyboard("{ArrowLeft}");
  expect(onExpand).not.toHaveBeenCalled();
  await userEvent.keyboard("{Enter}");
  expect(onLayout).toHaveBeenLastCalledWith([40, 60]);
  expect(onExpand).toHaveBeenCalledTimes(1);
  expect(document.getElementById("list")).not.toHaveAttribute("data-collapsed");
});

test("collapsedSize is the size a collapsed panel keeps", async () => {
  const onLayout = vi.fn();
  render(<Split first={{ minSize: 20, collapsible: true, collapsedSize: 5 }} group={{ onLayout }} />);
  expect(handleEl()).toHaveAttribute("aria-valuemin", "5");
  handleEl().focus();
  await userEvent.keyboard("{Enter}");
  expect(onLayout).toHaveBeenLastCalledWith([5, 95]);
});

test("Enter does nothing when neither neighbour is collapsible", async () => {
  const onLayout = vi.fn();
  render(<Split group={{ onLayout }} />);
  handleEl().focus();
  await userEvent.keyboard("{Enter}");
  expect(onLayout).not.toHaveBeenCalled();
});

test("in right-to-left text the left and right arrows swap meaning", async () => {
  const onLayout = vi.fn();
  render(<div dir="rtl"><Split group={{ onLayout }} /></div>);
  handleEl().focus();
  // 前一个面板在右边：分隔条往左走才是把它变大。
  await userEvent.keyboard("{ArrowLeft}");
  expect(onLayout).toHaveBeenLastCalledWith([40, 60]);
  await userEvent.keyboard("{ArrowRight}");
  expect(onLayout).toHaveBeenLastCalledWith([30, 70]);
});

test("a controlled layout is displayed as given and changes only when the parent says so", async () => {
  const onLayout = vi.fn();
  const { rerender } = render(<Split group={{ layout: [30, 70], onLayout }} />);
  handleEl().focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(onLayout).toHaveBeenLastCalledWith([40, 60]);
  expect(handleEl()).toHaveAttribute("aria-valuenow", "30");
  rerender(<Split group={{ layout: [40, 60], onLayout }} />);
  expect(handleEl()).toHaveAttribute("aria-valuenow", "40");
});

test("dragging moves the handle live, reports once on release, and restores the body", () => {
  const onLayout = vi.fn();
  render(<Split group={{ onLayout }} />);
  const handle = handleEl();
  fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientX: 300 });
  expect(document.body.style.cursor).toBe("col-resize");
  expect(document.body.style.userSelect).toBe("none");
  expect(handle).toHaveAttribute("data-dragging");
  fireEvent.pointerMove(handle, { pointerId: 1, clientX: 400 });
  expect(handle).toHaveAttribute("aria-valuenow", "40");
  expect(onLayout).not.toHaveBeenCalled();
  fireEvent.pointerUp(handle, { pointerId: 1, clientX: 400 });
  expect(onLayout).toHaveBeenCalledTimes(1);
  expect(onLayout).toHaveBeenCalledWith([40, 60]);
  expect(document.body.style.cursor).toBe("");
  expect(document.body.style.userSelect).toBe("");
  expect(handle).not.toHaveAttribute("data-dragging");
  expect(handle).toHaveAttribute("aria-valuenow", "40");
});

test("dragging past a limit stops at the limit, and past half way to collapsed it collapses", () => {
  const onLayout = vi.fn();
  render(<Split first={{ minSize: 20, collapsible: true }} group={{ onLayout }} />);
  const handle = handleEl();
  fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientX: 300 });
  fireEvent.pointerMove(handle, { pointerId: 1, clientX: 150 });
  expect(handle).toHaveAttribute("aria-valuenow", "20");
  fireEvent.pointerMove(handle, { pointerId: 1, clientX: 50 });
  expect(handle).toHaveAttribute("aria-valuenow", "0");
  fireEvent.pointerUp(handle, { pointerId: 1 });
  expect(onLayout).toHaveBeenCalledWith([0, 100]);
});

test("dragging in right-to-left text follows the pointer", () => {
  const onLayout = vi.fn();
  render(<div dir="rtl"><Split group={{ onLayout }} /></div>);
  const handle = handleEl();
  fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientX: 700 });
  fireEvent.pointerMove(handle, { pointerId: 1, clientX: 600 });
  fireEvent.pointerUp(handle, { pointerId: 1 });
  expect(onLayout).toHaveBeenCalledWith([40, 60]);
});

test("a released drag that moved nothing reports nothing", () => {
  const onLayout = vi.fn();
  render(<Split group={{ onLayout }} />);
  fireEvent.pointerDown(handleEl(), { pointerId: 1, button: 0, clientX: 300 });
  fireEvent.pointerUp(handleEl(), { pointerId: 1 });
  expect(onLayout).not.toHaveBeenCalled();
});

test("the sizes always add up to 100 across three panels", async () => {
  const onLayout = vi.fn();
  render(<ResizablePanelGroup onLayout={onLayout}>
    <ResizablePanel id="a" defaultSize={20}>A</ResizablePanel><ResizableHandle aria-label="A" />
    <ResizablePanel id="b" defaultSize={30} minSize={10}>B</ResizablePanel><ResizableHandle aria-label="B" />
    <ResizablePanel id="c" defaultSize={50}>C</ResizablePanel>
  </ResizablePanelGroup>);
  screen.getAllByRole("separator")[1]!.focus();
  await userEvent.keyboard("{ArrowLeft}{ArrowLeft}{ArrowLeft}");
  const last = onLayout.mock.calls.at(-1)![0] as number[];
  expect(last).toEqual([20, 10, 70]);
  expect(last.reduce((sum, value) => sum + value, 0)).toBe(100);
});
