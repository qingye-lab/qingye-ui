import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mergeProps } from "@base-ui/react/merge-props";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Sparkline } from "../src/components/sparkline";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("the accessible name summarises what is measured, its endpoints and its range", () => {
  render(<Sparkline label="近 6 周同步次数" values={[12, 18, 9, 22, 20, 24]} />);
  expect(screen.getByRole("img", { name: "近 6 周同步次数：从 12 到 24，最低 9，最高 24" })).toBeInTheDocument();
});

test("unknown points break the line instead of becoming zero, and the current point is marked", () => {
  const { container } = render(<Sparkline label="延迟" values={[3, 4, null, 5, 6]} />);
  // 两段：3→4 与 5→6；未知点不连线、也不画到零。
  expect(container.querySelectorAll("path")).toHaveLength(2);
  expect(container.querySelectorAll("circle")).toHaveLength(1);
  expect(screen.getByRole("img")).toHaveAccessibleName("延迟：从 3 到 6，最低 3，最高 6");
});

test("no known values is stated rather than drawn as a flat line", () => {
  const { container } = render(<Sparkline label="错误数" values={[null, null]} />);
  expect(screen.getByRole("img", { name: "错误数：没有可用的数值" })).toBeInTheDocument();
  expect(container.querySelector("path")).toBeNull();
  expect(() => render(<Sparkline label="x" values={[NaN]} />)).toThrow(TypeError);
});

test("an isolated known point between unknowns is drawn as a dot, not dropped", () => {
  const { container } = render(<Sparkline label="延迟" values={[1, null, 3, null, 5]} />);
  expect(container.querySelectorAll("path")).toHaveLength(0);
  // 两个孤立点画小点，末点由「当前点」标记承担，不重复。
  expect(container.querySelectorAll("[data-slot='sparkline-point']")).toHaveLength(2);
  expect(container.querySelectorAll("circle")).toHaveLength(3);
});

const band = { from: 40, to: 60, label: "达标区间" };

test("a target band must be a finite ascending range with a name", () => {
  const values = [50, 55];
  expect(() => render(<Sparkline label="x" values={values} band={{ from: 60, to: 40, label: "目标" }} />)).toThrow(RangeError);
  expect(() => render(<Sparkline label="x" values={values} band={{ from: 50, to: 50, label: "目标" }} />)).toThrow(RangeError);
  expect(() => render(<Sparkline label="x" values={values} band={{ from: 0, to: Infinity, label: "目标" }} />)).toThrow(RangeError);
  expect(() => render(<Sparkline label="x" values={values} band={{ from: 40, to: 60, label: " " }} />)).toThrow();
});

test("the summary states where the current value sits against the target", () => {
  const { rerender } = render(<Sparkline label="同步率" values={[50, 70]} band={band} />);
  expect(screen.getByRole("img")).toHaveAccessibleName("同步率：从 50 到 70，最低 50，最高 70；达标区间：40 至 60，当前高于目标");
  rerender(<Sparkline label="同步率" values={[50, 30]} band={band} />);
  expect(screen.getByRole("img")).toHaveAccessibleName("同步率：从 50 到 30，最低 30，最高 50；达标区间：40 至 60，当前低于目标");
  rerender(<Sparkline label="同步率" values={[30, 55, null]} band={band} />);
  expect(screen.getByRole("img")).toHaveAccessibleName("同步率：从 30 到 55，最低 30，最高 55；达标区间：40 至 60，当前在目标内");
});

test("with no known value only the target is stated", () => {
  const { container } = render(<Sparkline label="同步率" values={[null]} band={band} />);
  expect(screen.getByRole("img")).toHaveAccessibleName("同步率：没有可用的数值；达标区间：40 至 60");
  expect(container.querySelector("[data-slot='sparkline-band']")).not.toBeNull();
});

test("a band does not turn unknown points into a connected line", () => {
  const { container } = render(<Sparkline label="延迟" values={[3, 4, null, 5, 6]} band={{ from: 4, to: 5, label: "目标" }} />);
  expect(container.querySelectorAll("path")).toHaveLength(2);
  expect(container.querySelectorAll("[data-slot='sparkline-band']")).toHaveLength(1);
});

test("the band is placed by the union of the data and the band", () => {
  // 数据全在带上方：带仍在画面内，且在线的下方（y 更大）。
  const { container } = render(<Sparkline label="x" values={[80, 90]} band={band} />);
  const rect = container.querySelector("[data-slot='sparkline-band']")!;
  const y = Number(rect.getAttribute("y")), h = Number(rect.getAttribute("height"));
  expect(y).toBeGreaterThanOrEqual(0);
  expect(y + h).toBeLessThanOrEqual(20);
  const path = container.querySelector("path")!.getAttribute("d")!;
  const lineYs = [...path.matchAll(/,([0-9.]+)/g)].map(m => Number(m[1]));
  expect(Math.max(...lineYs)).toBeLessThan(y);
});

test("a single point with a band is placed against the band", () => {
  const { container } = render(<Sparkline label="x" values={[50]} band={band} />);
  const rect = container.querySelector("[data-slot='sparkline-band']")!;
  expect(Number(rect.getAttribute("height"))).toBeGreaterThan(0);
});

test("the declared tone is reflected on the root and an unknown tone throws", () => {
  const { rerender } = render(<Sparkline label="x" values={[1, 2]} tone="danger" />);
  expect(screen.getByRole("img")).toHaveAttribute("data-tone", "danger");
  rerender(<Sparkline label="x" values={[1, 2]} />);
  expect(screen.getByRole("img")).not.toHaveAttribute("data-tone");
  // @ts-expect-error 非法类别
  expect(() => render(<Sparkline label="x" values={[1, 2]} tone="loud" />)).toThrow(RangeError);
});

test("leaving the band does not change the tone by itself", () => {
  render(<Sparkline label="x" values={[50, 90]} band={band} />);
  expect(screen.getByRole("img")).not.toHaveAttribute("data-tone");
});

test.each(["line", "area"] as const)("point readouts are opt-in and do not change static %s geometry", appearance => {
  const { container, rerender } = render(<Sparkline label="延迟" values={[0, 4, null, 5, 6]} band={{ from: 2, to: 3, label: "目标" }} tone="warning" appearance={appearance} width={100} />);
  const svg = container.querySelector("svg")!.innerHTML;
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  rerender(<Sparkline label="延迟" values={[0, 4, null, 5, 6]} band={{ from: 2, to: 3, label: "目标" }} tone="warning" appearance={appearance} width={100} tooltip />);
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  expect(screen.getByRole("group")).toContainElement(screen.getByRole("button", { name: "延迟" }));
  expect(container.querySelector("svg")!.innerHTML).toBe(svg);
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

test("one focus target traverses zero, unknown and precise values without a focus trap", async () => {
  const user = userEvent.setup();
  render(<><Sparkline label="延迟" values={[0, null, 1e-30]} tooltip getPointLabel={index => ["周一", "周二", "周三"][index]!} /><button>下一条</button></>);
  const trigger = screen.getByRole("button", { name: "延迟" });
  await user.tab();
  expect(trigger).toHaveFocus();
  const popup = await screen.findByRole("tooltip");
  expect(popup).toHaveTextContent("周一：0，第 1 点，共 3 点");
  expect(trigger).toHaveAccessibleDescription(expect.stringContaining("周一：0，第 1 点，共 3 点"));
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tooltip")).toHaveTextContent("周二：未知，第 2 点，共 3 点");
  expect(document.querySelector("[data-slot='sparkline-active-point']")).not.toBeInTheDocument();
  expect(document.querySelector("[data-slot='sparkline-cursor']")).toBeInTheDocument();
  await user.keyboard("{End}");
  expect(screen.getByRole("tooltip")).toHaveTextContent("周三：0.000000000000000000000000000001，第 3 点，共 3 点");
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tooltip")).toHaveTextContent("第 3 点，共 3 点");
  await user.keyboard("{Home}{ArrowLeft}");
  expect(screen.getByRole("tooltip")).toHaveTextContent("周一：0，第 1 点，共 3 点");
  await user.tab();
  expect(screen.getByRole("button", { name: "下一条" })).toHaveFocus();
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  expect(trigger.getAttribute("aria-describedby")?.split(" ")).not.toContain(popup.id);
});

test("Escape dismisses while focus and pointer remain, and a new deliberate key reopens", async () => {
  const user = userEvent.setup();
  render(<Sparkline label="延迟" values={[0, 2]} tooltip />);
  const trigger = screen.getByRole("button", { name: "延迟" });
  await user.tab();
  await screen.findByRole("tooltip");
  await user.keyboard("{Escape}");
  expect(trigger).toHaveFocus();
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  fireEvent.pointerMove(trigger, { clientX: 50 });
  fireEvent.mouseMove(trigger, { clientX: 50 });
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  await user.keyboard("{ArrowRight}");
  expect(await screen.findByRole("tooltip")).toHaveTextContent("第 2 点：2，第 2 点，共 2 点");
  await user.keyboard("{Enter}");
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  await user.keyboard(" ");
  expect(await screen.findByRole("tooltip")).toBeInTheDocument();
});

test.each(["altKey", "ctrlKey", "metaKey"] as const)("%s navigation shortcuts preserve browser behavior and the inspected point", async modifier => {
  const user = userEvent.setup();
  render(<Sparkline label="延迟" values={[10, 20, 30]} tooltip />);
  const trigger = screen.getByRole("button", { name: "延迟" });
  await user.tab();
  await user.keyboard("{ArrowRight}");
  expect(await screen.findByRole("tooltip")).toHaveTextContent("第 2 点：20，第 2 点，共 3 点");
  for (const key of ["ArrowLeft", "ArrowRight", "Home", "End"]) {
    expect(fireEvent.keyDown(trigger, { key, [modifier]: true })).toBe(true);
    expect(screen.getByRole("tooltip")).toHaveTextContent("第 2 点：20，第 2 点，共 3 点");
  }
  await user.keyboard("{End}");
  expect(screen.getByRole("tooltip")).toHaveTextContent("第 3 点：30，第 3 点，共 3 点");
});

test.each(["preventDefault", "preventBaseUIHandler"] as const)("public root %s cancels navigation before the point changes", async method => {
  const user = userEvent.setup();
  let cancel = false;
  const called = vi.fn();
  render(<Sparkline label="延迟" values={[10, 20, 30]} tooltip onKeyDown={event => {
    called(event.currentTarget);
    if (cancel) (event as typeof event & { preventBaseUIHandler: () => void })[method]();
  }} />);
  await user.tab();
  await user.keyboard("{ArrowRight}");
  expect(await screen.findByRole("tooltip")).toHaveTextContent("第 2 点：20，第 2 点，共 3 点");
  cancel = true;
  for (const key of ["ArrowLeft", "ArrowRight", "Home", "End"]) {
    await user.keyboard(`{${key}}`);
    expect(screen.getByRole("tooltip")).toHaveTextContent("第 2 点：20，第 2 点，共 3 点");
  }
  expect(called).toHaveBeenLastCalledWith(screen.getByRole("group"));
});

test("render composition can cancel navigation through mergeProps while keeping the root event", async () => {
  const user = userEvent.setup();
  const called = vi.fn();
  render(<Sparkline label="延迟" values={[10, 20, 30]} tooltip onKeyDown={called} render={props => <span {...mergeProps<"span">(props, { onKeyDown: event => event.preventDefault() })} />} />);
  await user.tab();
  expect(await screen.findByRole("tooltip")).toHaveTextContent("第 1 点：10，第 1 点，共 3 点");
  await user.keyboard("{ArrowRight}{End}");
  expect(screen.getByRole("tooltip")).toHaveTextContent("第 1 点：10，第 1 点，共 3 点");
  expect(called).toHaveBeenCalledTimes(2);
});

function plotRect(element: HTMLElement) {
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue(new DOMRect(10, 20, 100, 20));
}

test("pointer readouts use the nearest point, stay portaled and preserve focus and root events", async () => {
  const user = userEvent.setup();
  const moved = vi.fn();
  const clicked = vi.fn();
  const ref = createRef<HTMLSpanElement>();
  render(<><button>继续编辑</button><div data-testid="card" style={{ overflow: "hidden" }}><Sparkline label="延迟" values={[0, null, 23.456789]} tooltip ref={ref} render={<div />} id="latency" data-object="request" style={{ opacity: 0.8 }} onPointerMove={moved} onClick={clicked} /></div></>);
  const trigger = screen.getByRole("button", { name: "延迟" });
  const group = screen.getByRole("group");
  plotRect(trigger);
  plotRect(group);
  await user.tab();
  const editor = screen.getByRole("button", { name: "继续编辑" });
  await user.pointer({ target: trigger, coords: { clientX: 104, clientY: 25 } });
  const popup = await screen.findByRole("tooltip");
  expect(popup).toHaveTextContent("第 3 点：23.456789，第 3 点，共 3 点");
  expect(editor).toHaveFocus();
  expect(screen.getByTestId("card")).not.toContainElement(popup);
  // jsdom has no layout: give the hover corridor the trigger and popup rectangles.
  vi.spyOn(popup, "getBoundingClientRect").mockReturnValue(new DOMRect(80, 0, 100, 16));
  vi.spyOn(popup.parentElement!, "getBoundingClientRect").mockReturnValue(new DOMRect(80, 0, 100, 16));
  await user.pointer({ target: popup, coords: { clientX: 107, clientY: 10 } });
  expect(screen.getByRole("tooltip")).toBe(popup);
  expect(ref.current).toBe(group);
  expect(group.tagName).toBe("DIV");
  expect(group).toHaveAttribute("id", "latency");
  expect(group).toHaveAttribute("data-object", "request");
  expect(group).toHaveStyle({ opacity: "0.8" });
  await user.pointer({ target: trigger, coords: { clientX: 57, clientY: 25 } });
  expect(screen.getByRole("tooltip")).toHaveTextContent("第 2 点：未知，第 2 点，共 3 点");
  expect(moved).toHaveBeenCalled();
  await user.click(trigger);
  expect(clicked).toHaveBeenCalledOnce();
  expect(editor).toHaveFocus();
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  await user.unhover(trigger);
  await user.hover(trigger);
  expect(await screen.findByRole("tooltip")).toBeInTheDocument();
});

test("an unknown point never calls the numeric formatter or paints a fabricated zero", async () => {
  const user = userEvent.setup();
  const format = vi.fn(() => { throw new Error("Unknown is not a number"); });
  const { container } = render(<Sparkline label="延迟" values={[null]} tooltip format={format} />);
  await user.tab();
  expect(await screen.findByRole("tooltip")).toHaveTextContent("第 1 点：未知，第 1 点，共 1 点");
  expect(format).not.toHaveBeenCalled();
  expect(container.querySelector("path")).not.toBeInTheDocument();
  expect(container.querySelector("circle")).not.toBeInTheDocument();
});

test("touch needs a completed tap, toggles the same point and can inspect an unknown point", async () => {
  const user = userEvent.setup();
  render(<Sparkline label="延迟" values={[0, null, 10]} tooltip />);
  const trigger = screen.getByRole("button", { name: "延迟" });
  plotRect(trigger);
  await user.pointer({ keys: "[TouchA>]", target: trigger, coords: { clientX: 13, clientY: 25 } });
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  await user.pointer({ keys: "[/TouchA]", target: trigger });
  expect(await screen.findByRole("tooltip")).toHaveTextContent("第 1 点：0，第 1 点，共 3 点");
  await user.pointer([{ keys: "[TouchA>]", target: trigger, coords: { clientX: 13, clientY: 25 } }, { keys: "[/TouchA]", target: trigger }]);
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  fireEvent.mouseMove(trigger);
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  await user.pointer([{ keys: "[TouchA>]", target: trigger, coords: { clientX: 57, clientY: 25 } }, { keys: "[/TouchA]", target: trigger }]);
  expect(await screen.findByRole("tooltip")).toHaveTextContent("第 2 点：未知，第 2 点，共 3 点");
  await user.click(document.body);
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
});

test("a touch scroll or cancellation does not commit a tap readout", async () => {
  const user = userEvent.setup();
  render(<Sparkline label="延迟" values={[0, 1]} tooltip />);
  const trigger = screen.getByRole("button", { name: "延迟" });
  plotRect(trigger);
  await user.pointer([{ keys: "[TouchA>]", target: trigger, coords: { clientX: 13, clientY: 25 } }, { pointerName: "TouchA", target: trigger, coords: { clientX: 13, clientY: 70 } }, { keys: "[/TouchA]", target: trigger }]);
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  await user.pointer({ keys: "[TouchA>]", target: trigger });
  fireEvent.pointerCancel(trigger);
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

test("localized fallback labels, unknown values and caller formatting describe the same points", async () => {
  const user = userEvent.setup();
  render(<UILocaleProvider locale={enUS}><Sparkline label="Latency" values={[12.5, null]} tooltip getPointLabel={() => " "} format={value => `${value} ms`} /></UILocaleProvider>);
  await user.tab();
  const trigger = screen.getByRole("button", { name: "Latency" });
  expect(trigger).toHaveAccessibleDescription(expect.stringContaining("Use Left and Right"));
  expect(await screen.findByRole("tooltip")).toHaveTextContent("Point 1: 12.5 ms, point 1 of 2");
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tooltip")).toHaveTextContent("Point 2: Unknown, point 2 of 2");
});

test("empty data has no point target and changing or disabling values cannot leave a stale readout", async () => {
  const user = userEvent.setup();
  const getPointLabel = vi.fn((index: number) => `日期 ${index + 1}`);
  const { rerender } = render(<Sparkline label="延迟" values={[]} tooltip getPointLabel={getPointLabel} />);
  expect(screen.getByRole("img")).toHaveAccessibleName("延迟：没有可用的数值");
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(getPointLabel).not.toHaveBeenCalled();
  rerender(<Sparkline label="延迟" values={[1, 2, 3]} tooltip />);
  await user.tab();
  await user.keyboard("{End}");
  expect(await screen.findByRole("tooltip")).toHaveTextContent("第 3 点：3");
  rerender(<Sparkline label="延迟" values={[null]} tooltip />);
  expect(screen.getByRole("tooltip")).toHaveTextContent("第 1 点：未知，第 1 点，共 1 点");
  rerender(<Sparkline label="延迟" values={[null]} />);
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});
