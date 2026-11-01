import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { Tour, type TourProps, type TourStep } from "../src/components/tour";

afterEach(() => vi.restoreAllMocks());

const byId = (id: string) => () => document.getElementById(id);
const steps: TourStep[] = [
  { target: byId("a"), title: "第一处", description: "先看这里。" },
  { target: byId("b"), title: "第二处", description: "再看这里。" },
  { target: byId("c"), title: "第三处", description: "最后看这里。" },
];

function Page(props: Partial<TourProps> & { children?: React.ReactNode }) {
  const { children, ...rest } = props;
  return (
    <>
      <button id="a">甲</button>
      <button id="b">乙</button>
      <button id="c">丙</button>
      {children}
      <Tour defaultOpen steps={steps} {...rest} />
    </>
  );
}

const dialog = (name?: string) => screen.findByRole("dialog", name ? { name } : undefined);

function rect(top: number, left = 40): DOMRect {
  return { top, left, width: 100, height: 30, right: left + 100, bottom: top + 30, x: left, y: top, toJSON: () => ({}) } as DOMRect;
}

test("opens as a named, described, non-modal dialog and reports the step position", async () => {
  render(<Page />);
  const popup = await dialog("第一处");
  expect(popup).toHaveAccessibleDescription("先看这里。");
  expect(popup).not.toHaveAttribute("aria-modal", "true");
  expect(popup).toHaveTextContent("第 1 / 3 步");
  expect(screen.getByRole("button", { name: "甲" }).closest("[aria-hidden=true]")).toBeNull();
});

test("focus moves into the popup when it opens", async () => {
  render(<Page />);
  const popup = await dialog();
  await waitFor(() => expect(popup).toContainElement(document.activeElement as HTMLElement));
});

test("next, previous and finish move through the steps and report them", async () => {
  const user = userEvent.setup();
  const onStepChange = vi.fn();
  const onFinish = vi.fn();
  const onOpenChange = vi.fn();
  render(<Page onStepChange={onStepChange} onFinish={onFinish} onOpenChange={onOpenChange} />);
  await dialog("第一处");
  expect(screen.getByRole("button", { name: "上一步" })).toHaveAttribute("aria-disabled", "true");
  await user.click(screen.getByRole("button", { name: "下一步" }));
  expect(await dialog("第二处")).toHaveTextContent("第 2 / 3 步");
  expect(onStepChange).toHaveBeenLastCalledWith(1);
  await user.click(screen.getByRole("button", { name: "上一步" }));
  expect(await dialog("第一处")).toBeInTheDocument();
  expect(onStepChange).toHaveBeenLastCalledWith(0);
  await user.click(screen.getByRole("button", { name: "下一步" }));
  await user.click(screen.getByRole("button", { name: "下一步" }));
  await dialog("第三处");
  expect(screen.queryByRole("button", { name: "跳过" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "完成" }));
  expect(onFinish).toHaveBeenCalledTimes(1);
  expect(onOpenChange).toHaveBeenCalledWith(false, { reason: "finish" });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("skip reports the step it was pressed on and closes", async () => {
  const user = userEvent.setup();
  const onSkip = vi.fn();
  const onOpenChange = vi.fn();
  render(<Page defaultStep={1} onSkip={onSkip} onOpenChange={onOpenChange} />);
  await dialog("第二处");
  await user.click(screen.getByRole("button", { name: "跳过" }));
  expect(onSkip).toHaveBeenCalledWith(1);
  expect(onOpenChange).toHaveBeenCalledWith(false, { reason: "skip" });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("controlled open and step are owned by the application", async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();
  function Controlled() {
    const [step, setStep] = useState(0);
    return <Page open step={step} onStepChange={setStep} onOpenChange={onOpenChange} />;
  }
  render(<Controlled />);
  await dialog("第一处");
  await user.click(screen.getByRole("button", { name: "下一步" }));
  await dialog("第二处");
  await user.click(screen.getByRole("button", { name: "跳过" }));
  expect(onOpenChange).toHaveBeenCalledWith(false, { reason: "skip" });
  // 应用没有把 open 改为 false，引导就还在。
  expect(screen.getByRole("dialog", { name: "第二处" })).toBeInTheDocument();
});

test("a controlled step that the application does not advance stays put", async () => {
  const user = userEvent.setup();
  const onStepChange = vi.fn();
  render(<Page step={0} onStepChange={onStepChange} />);
  await dialog("第一处");
  await user.click(screen.getByRole("button", { name: "下一步" }));
  expect(onStepChange).toHaveBeenCalledWith(1);
  expect(screen.getByRole("dialog", { name: "第一处" })).toBeInTheDocument();
});

test("closing from outside the component leaves and later restarts at the first step", async () => {
  const user = userEvent.setup();
  function Toggle() {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(value => !value)}>开关</button>
        <Page open={open} />
      </>
    );
  }
  render(<Toggle />);
  await dialog("第一处");
  await user.click(screen.getByRole("button", { name: "下一步" }));
  await dialog("第二处");
  await user.click(screen.getByRole("button", { name: "开关" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await user.click(screen.getByRole("button", { name: "开关" }));
  expect(await dialog("第一处")).toBeInTheDocument();
});

test("a step whose anchor is missing is skipped with a development warning", async () => {
  const user = userEvent.setup();
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const onStepChange = vi.fn();
  const gapped: TourStep[] = [steps[0]!, { target: byId("nowhere"), title: "不存在" }, steps[2]!];
  render(<Page steps={gapped} onStepChange={onStepChange} />);
  expect(await dialog("第一处")).toHaveTextContent("第 1 / 2 步");
  expect(warn).toHaveBeenCalledTimes(1);
  expect(String(warn.mock.calls[0]![0])).toContain("step 2");
  await user.click(screen.getByRole("button", { name: "下一步" }));
  expect(await dialog("第三处")).toHaveTextContent("第 2 / 2 步");
  expect(onStepChange).toHaveBeenLastCalledWith(2);
});

test("an initial step without an anchor moves on to the next available one", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  const gapped: TourStep[] = [{ target: byId("nowhere"), title: "不存在" }, steps[1]!, steps[2]!];
  const onStepChange = vi.fn();
  render(<Page steps={gapped} onStepChange={onStepChange} />);
  expect(await dialog("第二处")).toHaveTextContent("第 1 / 2 步");
  expect(onStepChange).toHaveBeenCalledWith(1);
});

test("anchors that appear or disappear while the tour is open are picked up again", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  const onStepChange = vi.fn();
  const early = document.createElement("button"); early.id = "early"; document.body.appendChild(early);
  const gapped: TourStep[] = [{ target: byId("early"), title: "先到" }, { target: byId("late"), title: "迟到" }, steps[2]!];
  render(<Page steps={gapped} onStepChange={onStepChange} />);
  expect(await dialog("先到")).toHaveTextContent("第 1 / 2 步");
  const late = document.createElement("button"); late.id = "late"; document.body.appendChild(late);
  await waitFor(() => expect(screen.getByRole("dialog", { name: "先到" })).toHaveTextContent("第 1 / 3 步"));
  early.remove();
  expect(await dialog("迟到")).toHaveTextContent("第 1 / 2 步");
  expect(onStepChange).toHaveBeenLastCalledWith(1);
  late.remove();
});

test("when no anchor exists the tour ends instead of showing an empty popup", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  const onOpenChange = vi.fn();
  render(<Page steps={[{ target: byId("nowhere"), title: "不存在" }]} onOpenChange={onOpenChange} />);
  await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false, { reason: "unavailable" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("anchors may be elements, refs or functions", async () => {
  const user = userEvent.setup();
  const ref = createRef<HTMLButtonElement>();
  const element = document.createElement("button");
  document.body.append(element);
  try {
    render(
      <>
        <button ref={ref}>引用</button>
        <Tour defaultOpen steps={[{ target: ref, title: "引用" }, { target: element, title: "元素" }, { target: () => ref.current, title: "函数" }]} />
      </>,
    );
    await dialog("引用");
    await user.click(screen.getByRole("button", { name: "下一步" }));
    await dialog("元素");
    await user.click(screen.getByRole("button", { name: "下一步" }));
    await dialog("函数");
  } finally {
    element.remove();
  }
});

test("Escape closes the tour and returns focus to where it was", async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();
  function Launcher() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>开始引导</button>
        <Page open={open} onOpenChange={(next, details) => { onOpenChange(next, details); setOpen(next); }} />
      </>
    );
  }
  render(<Launcher />);
  const launcher = screen.getByRole("button", { name: "开始引导" });
  await user.click(launcher);
  await dialog("第一处");
  await user.keyboard("{Escape}");
  expect(onOpenChange).toHaveBeenCalledWith(false, { reason: "escape" });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(launcher).toHaveFocus());
});

test("pressing elsewhere on the page does not end the tour", async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();
  render(<Page onOpenChange={onOpenChange}><button>页面里的按钮</button></Page>);
  await dialog("第一处");
  await user.click(screen.getByRole("button", { name: "页面里的按钮" }));
  expect(onOpenChange).not.toHaveBeenCalled();
  expect(screen.getByRole("dialog", { name: "第一处" })).toBeInTheDocument();
});

test("left and right arrows move between steps but leave input controls alone", async () => {
  const user = userEvent.setup();
  const withInput: TourStep[] = [
    { target: byId("a"), title: "第一处", description: <input aria-label="备注" defaultValue="abc" /> },
    steps[1]!,
    steps[2]!,
  ];
  render(<Page steps={withInput} />);
  const popup = await dialog("第一处");
  await waitFor(() => expect(popup).toContainElement(document.activeElement as HTMLElement));
  screen.getByRole("textbox", { name: "备注" }).focus();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("dialog", { name: "第一处" })).toBeInTheDocument();
  screen.getByRole("button", { name: "下一步" }).focus();
  await user.keyboard("{ArrowRight}");
  expect(await dialog("第二处")).toBeInTheDocument();
  await user.keyboard("{ArrowLeft}");
  expect(await dialog("第一处")).toBeInTheDocument();
  // 第一步再往前没有去处。
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("dialog", { name: "第一处" })).toBeInTheDocument();
});

test("the spotlight is optional, inert and follows the anchor", async () => {
  let top = 100;
  const { rerender } = render(<Page />);
  await dialog("第一处");
  expect(document.querySelector("[data-slot=tour-spotlight]")).toBeNull();

  const target = document.getElementById("a")!;
  vi.spyOn(target, "getBoundingClientRect").mockImplementation(() => rect(top));
  rerender(<Page spotlight />);
  const hole = await waitFor(() => {
    const node = document.querySelector<HTMLElement>("[data-slot=tour-spotlight]");
    if (!node) throw new Error("no spotlight");
    return node;
  });
  expect(hole).toHaveAttribute("aria-hidden", "true");
  expect(hole.className).toContain("pointer-events-none");
  // 洞比锚点外扩 1 分（样式表未加载时取预设 4px）。
  expect(hole.style.top).toBe("96px");
  expect(hole.style.left).toBe("36px");
  expect(hole.style.width).toBe("108px");
  expect(hole.style.height).toBe("38px");

  top = 300;
  act(() => { window.dispatchEvent(new Event("resize")); });
  await waitFor(() => expect(hole.style.top).toBe("296px"));
});

test("an anchor outside the viewport is scrolled into view before the popup is shown", async () => {
  const scroll = vi.spyOn(Element.prototype, "scrollIntoView").mockImplementation(() => {});
  render(<Page />);
  await dialog("第一处");
  expect(scroll).not.toHaveBeenCalled();
  const target = document.getElementById("b")!;
  vi.spyOn(target, "getBoundingClientRect").mockReturnValue(rect(5000, 0));
  await userEvent.setup().click(screen.getByRole("button", { name: "下一步" }));
  await dialog("第二处");
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(scroll.mock.contexts[0]).toBe(target);
  expect(scroll.mock.calls[0]![0]).toMatchObject({ behavior: "smooth" });
});

test("reduced motion scrolls straight to the anchor", async () => {
  const scroll = vi.spyOn(Element.prototype, "scrollIntoView").mockImplementation(() => {});
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: query.includes("reduce"), media: query, addEventListener() {}, removeEventListener() {},
    addListener() {}, removeListener() {}, dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  const target = document.createElement("button");
  document.body.append(target);
  vi.spyOn(target, "getBoundingClientRect").mockReturnValue(rect(-400, 0));
  try {
    render(<Tour defaultOpen steps={[{ target, title: "远处" }]} />);
    await dialog("远处");
    expect(scroll.mock.calls[0]![0]).toMatchObject({ behavior: "auto" });
  } finally {
    target.remove();
    window.matchMedia = original;
  }
});
