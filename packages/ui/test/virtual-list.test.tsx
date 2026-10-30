import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode, createRef } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, expect, test, vi } from "vitest";
import { VirtualList, type VirtualListActions } from "../src/components/virtual-list";

const items = Array.from({ length: 100 }, (_, id) => ({ id, label: `条目 ${id + 1}` }));
const getKey = (item: typeof items[number]) => item.id;
const renderItem = (item: typeof items[number]) => item.label;

test("windowing renders a bounded range with truthful positions and forwards actual scrolling", () => {
  const ref = createRef<HTMLDivElement>();
  const onScroll = vi.fn();
  render(<VirtualList items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} overscan={1} aria-label="条目" ref={ref} onScroll={onScroll} render={<div data-custom="yes" />} />);
  const viewport = screen.getByRole("list");
  expect(ref.current).toBe(viewport);
  expect(screen.getAllByRole("listitem")).toHaveLength(4);
  fireEvent.scroll(viewport, { target: { scrollTop: 1000 } });
  expect(screen.queryByText("条目 1")).not.toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(5);
  expect(screen.getByText("条目 51")).toHaveAttribute("aria-posinset", "51");
  expect(screen.getByText("条目 51")).toHaveAttribute("aria-setsize", "100");
  expect(onScroll).toHaveBeenCalledOnce();
  expect(viewport).toHaveAttribute("data-custom", "yes");
});

test("keyboard reaches the last/first row across windows, with caller cancellation honored", async () => {
  const { rerender } = render(<VirtualList aria-label="条目" items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} overscan={0} />);
  const viewport = screen.getByRole("list");
  viewport.focus();
  await userEvent.keyboard("{End}");
  expect(screen.getByText("条目 100")).toHaveFocus();
  await userEvent.keyboard("{ArrowUp}");
  expect(screen.getByText("条目 99")).toHaveFocus();
  await userEvent.keyboard("{Home}");
  expect(screen.getByText("条目 1")).toHaveFocus();
  rerender(<VirtualList aria-label="条目" items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} onKeyDown={event => event.preventDefault()} />);
  await userEvent.keyboard("{End}");
  expect(screen.getByText("条目 1")).toHaveFocus();
});

test("focused descendant survives scrolling/reordering and keeps its native editing keys", async () => {
  const renderInput = (item: typeof items[number]) => <input aria-label={item.label} defaultValue="初始" />;
  const { rerender } = render(<VirtualList aria-label="条目" items={items} getKey={getKey} renderItem={renderInput} itemSize={20} height={60} overscan={0} />);
  const input = screen.getByRole("textbox", { name: "条目 1" });
  input.focus();
  await userEvent.type(input, "改");
  await userEvent.keyboard("{End}");
  expect(input).toHaveFocus();
  fireEvent.scroll(screen.getByRole("list"), { target: { scrollTop: 1000 } });
  expect(input).toHaveFocus();
  expect(input).toHaveValue("初始改");
  rerender(<VirtualList aria-label="条目" items={[...items].reverse()} getKey={getKey} renderItem={renderInput} itemSize={20} height={60} overscan={0} />);
  expect(screen.getByRole("textbox", { name: "条目 1" })).toBe(input);
  expect(input).toHaveFocus();
  rerender(<VirtualList aria-label="条目" items={items.slice(1)} getKey={getKey} renderItem={renderInput} itemSize={20} height={60} overscan={0} />);
  expect(screen.queryByRole("textbox", { name: "条目 1" })).not.toBeInTheDocument();
  expect(screen.getByRole("list")).toHaveFocus();
  await userEvent.keyboard("{Home}");
  expect(screen.getAllByRole("listitem")[0]).toHaveFocus();
});

test("empty collections remain reachable, and invalid dimensions/duplicate keys fail explicitly", () => {
  render(<VirtualList aria-label="条目" items={[]} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} />);
  expect(screen.getByRole("list")).toHaveAttribute("tabindex", "0");
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  expect(() => render(<VirtualList aria-label="条目" items={items} getKey={getKey} renderItem={renderItem} itemSize={0} height={60} />)).toThrow("finite positive");
  expect(() => render(<VirtualList aria-label="条目" items={items} getKey={() => "same"} renderItem={renderItem} itemSize={20} height={60} />)).toThrow("unique stable");
});

test("scrolling a large collection renders only the window and does not walk the data again", async () => {
  const many = Array.from({ length: 50_000 }, (_, id) => ({ id, label: `条目 ${id + 1}` }));
  const keyOf = vi.fn((item: typeof many[number]) => item.id);
  render(<VirtualList aria-label="条目" items={many} getKey={keyOf} renderItem={renderItem} itemSize={20} height={100} overscan={2} />);
  const viewport = screen.getByRole("list");
  const initial = keyOf.mock.calls.length;
  for (const top of [0, 20, 400_000, 999_000, 999_900]) fireEvent.scroll(viewport, { target: { scrollTop: top } });
  // Scrolling re-renders only the viewport state; it must not re-derive keys for all 50 000 items.
  expect(keyOf.mock.calls.length).toBe(initial);
  const rows = screen.getAllByRole("listitem");
  expect(rows.length).toBeLessThanOrEqual(5 + 2 * 2 + 1);
  expect(screen.getByText("条目 50000")).toHaveAttribute("aria-posinset", "50000");
  expect(screen.queryByText("条目 1")).not.toBeInTheDocument();
  fireEvent.scroll(viewport, { target: { scrollTop: 400_000 } });
  expect(screen.getByText("条目 20001")).toHaveAttribute("aria-posinset", "20001");
  viewport.focus();
  await userEvent.keyboard("{End}");
  expect(screen.getByText("条目 50000")).toHaveFocus();
});


const nativeScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTo");

// jsdom has no layout/scrolling. These browser doubles derive geometry from the
// rendered spacer/content and deliver actual observer/scroll events to the adapter.
function installLayout() {
  const observers: { targets: Set<Element>; callback: ResizeObserverCallback }[] = [];
  class Observer {
    targets = new Set<Element>();
    constructor(public callback: ResizeObserverCallback) { observers.push(this); }
    observe(target: Element) { this.targets.add(target); }
    unobserve(target: Element) { this.targets.delete(target); }
    disconnect() { this.targets.clear(); }
  }
  vi.stubGlobal("ResizeObserver", Observer);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockImplementation(function () {
    return this.dataset.slot === "virtual-list" ? Number.parseFloat(this.style.height) : 0;
  });
  vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockImplementation(function () {
    return this.dataset.slot === "virtual-list" ? Math.max(this.clientHeight, Number.parseFloat((this.firstElementChild as HTMLElement)?.style.height) || 0) : 0;
  });
  vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(function () {
    const content = this.firstElementChild as HTMLElement | null;
    return this.dataset.slot === "virtual-list-item" ? Number(content?.dataset.size) || Number.parseFloat(this.style.height) || 20 : 0;
  });
  const scrollTo = vi.fn(function (this: HTMLElement, options: ScrollToOptions) {
    const next = Math.max(0, Math.min(options.top ?? 0, this.scrollHeight - this.clientHeight));
    if (next !== this.scrollTop) {
      this.scrollTop = next;
      queueMicrotask(() => this.dispatchEvent(new Event("scroll")));
    }
  });
  Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable: true, writable: true, value: scrollTo });
  return {
    scrollTo,
    resize(row: HTMLElement, size: number) {
      (row.firstElementChild as HTMLElement).dataset.size = String(size);
      act(() => {
        for (const observer of observers) if (observer.targets.has(row)) observer.callback([
          { target: row, borderBoxSize: [{ blockSize: size, inlineSize: 300 }] } as unknown as ResizeObserverEntry,
        ], observer as unknown as ResizeObserver);
      });
    },
    observedCount: () => observers.reduce((sum, observer) => sum + observer.targets.size, 0),
  };
}
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  if (nativeScrollTo) Object.defineProperty(HTMLElement.prototype, "scrollTo", nativeScrollTo);
  else Reflect.deleteProperty(HTMLElement.prototype, "scrollTo");
});

test("SSR renders an initial bounded window before a scroll element exists", () => {
  const html = renderToString(<VirtualList aria-label="条目" items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} overscan={1} />);
  expect((html.match(/role="listitem"/g) ?? [])).toHaveLength(4);
  expect(html).toContain('aria-setsize="100"');
  expect(html).not.toContain("条目 100");
});

test("actions keep the native ref, honor alignment, reject invalid indices, and retain focus", async () => {
  const { scrollTo } = installLayout();
  const ref = createRef<HTMLDivElement>();
  const actionsRef = createRef<VirtualListActions>();
  render(<VirtualList aria-label="条目" ref={ref} actionsRef={actionsRef} items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} overscan={0} />);
  const viewport = screen.getByRole("list");
  viewport.focus();
  await act(async () => actionsRef.current!.scrollToIndex(10, { align: "center" }));
  expect(ref.current).toBe(viewport);
  expect(viewport.scrollTop).toBe(180);
  expect(screen.getByText("条目 11")).toBeInTheDocument();
  expect(viewport).toHaveFocus();
  await act(async () => actionsRef.current!.scrollToIndex(10, { align: "start" }));
  expect(viewport.scrollTop).toBe(200);
  await act(async () => actionsRef.current!.scrollToIndex(10, { align: "end" }));
  expect(viewport.scrollTop).toBe(160);
  await act(async () => actionsRef.current!.scrollToEnd());
  expect(viewport.scrollTop).toBe(1940);
  expect(screen.getByText("条目 100")).toBeInTheDocument();
  expect(scrollTo.mock.calls.at(-1)?.[0].behavior).toBe("instant");
  for (const invalid of [-1, 100, 1.5, Number.NaN]) expect(() => actionsRef.current!.scrollToIndex(invalid)).toThrow("within the collection");
});

test("dynamic rows measure their content, remeasure above the viewport, and release observers", () => {
  const layout = installLayout();
  const varied = items.map(item => ({ ...item, size: item.id === 0 ? 40 : 20 }));
  const { unmount } = render(<StrictMode><VirtualList aria-label="条目" items={varied} getKey={getKey} renderItem={item => <div data-size={item.size}>{item.label}</div>} measurement="dynamic" itemSize={20} height={60} overscan={2} /></StrictMode>);
  const viewport = screen.getByRole("list");
  expect(screen.getByText("条目 2").parentElement).toHaveStyle({ top: "40px" });
  expect(viewport.firstElementChild).toHaveStyle({ height: "2020px" });
  fireEvent.scroll(viewport, { target: { scrollTop: 50 } });
  const first = screen.getByText("条目 1").parentElement!;
  layout.resize(first, 70);
  expect(viewport.scrollTop).toBe(80);
  expect(screen.getByText("条目 2").parentElement).toHaveStyle({ top: "70px" });
  expect(viewport.firstElementChild).toHaveStyle({ height: "2050px" });
  // A row that spans the reading point grows below it and must not drag it down.
  layout.resize(screen.getByText("条目 2").parentElement!, 50);
  expect(viewport.scrollTop).toBe(80);
  unmount();
  expect(layout.observedCount()).toBe(0);
});

test("stable identity anchors prepends and same-edge reorders at the same pixel offset", async () => {
  installLayout();
  const { rerender } = render(<VirtualList aria-label="条目" items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} overscan={1} />);
  const viewport = screen.getByRole("list");
  fireEvent.scroll(viewport, { target: { scrollTop: 205 } });
  const prepended = [{ id: -1, label: "更早" }, ...items];
  rerender(<VirtualList aria-label="条目" items={prepended} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} overscan={1} />);
  await act(async () => {});
  expect(viewport.scrollTop).toBe(225);
  expect(screen.getByText("条目 11")).toHaveStyle({ top: "220px" });
  const reordered = [...prepended];
  [reordered[1], reordered[11]] = [reordered[11]!, reordered[1]!];
  rerender(<VirtualList aria-label="条目" items={reordered} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} overscan={1} />);
  await act(async () => {});
  expect(viewport.scrollTop).toBe(25);
  expect(screen.getByText("条目 11")).toHaveStyle({ top: "20px" });
});

test("followEnd is opt-in, follows only a previously pinned append, and respects reading history", async () => {
  installLayout();
  const actionsRef = createRef<VirtualListActions>();
  const { rerender } = render(<VirtualList aria-label="条目" actionsRef={actionsRef} items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} followEnd />);
  const viewport = screen.getByRole("list");
  expect(viewport.scrollTop).toBe(0);
  await act(async () => actionsRef.current!.scrollToEnd());
  const appended = [...items, { id: 100, label: "最新" }];
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={appended} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} followEnd />);
  await act(async () => {});
  expect(viewport.scrollTop).toBe(1960);
  // A user scroll cancels any still-correcting jump before new output arrives.
  fireEvent.wheel(viewport, { deltaY: -100 });
  fireEvent.scroll(viewport, { target: { scrollTop: 200 } });
  const more = [...appended, { id: 101, label: "后来" }];
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={more} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} followEnd />);
  expect(viewport.scrollTop).toBe(200);
  await act(async () => actionsRef.current!.scrollToEnd());
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={[...more, { id: 102, label: "末项" }]} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} />);
  expect(viewport.scrollTop).toBe(1980);
});

test("removing a pending command's item never restores its old numeric target", async () => {
  installLayout();
  const actionsRef = createRef<VirtualListActions>();
  const { rerender } = render(<VirtualList aria-label="条目" actionsRef={actionsRef} items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} />);
  await act(async () => actionsRef.current!.scrollToIndex(50));
  const replacement = items.map(item => item.id === 50 ? { id: 1000, label: "替换" } : item);
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={replacement} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} />);
  fireEvent.wheel(screen.getByRole("list"));
  fireEvent.scroll(screen.getByRole("list"), { target: { scrollTop: 0 } });
  await act(() => new Promise(resolve => setTimeout(resolve, 40)));
  expect(screen.getByRole("list").scrollTop).toBe(0);
  expect(screen.queryByText("替换")).not.toBeInTheDocument();
});


test("dynamic initial estimates never jump to the last row and empty actions remain usable", async () => {
  installLayout();
  const actionsRef = createRef<VirtualListActions>();
  const short = items.slice(0, 3);
  const { rerender } = render(<VirtualList aria-label="条目" actionsRef={actionsRef} items={short} getKey={getKey} renderItem={item => <div data-size="80">{item.label}</div>} measurement="dynamic" itemSize={20} height={60} followEnd />);
  await act(async () => {});
  expect(screen.getByRole("list").scrollTop).toBe(0);
  expect(screen.getByText("条目 1")).toBeInTheDocument();
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={[]} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} />);
  expect(() => actionsRef.current!.scrollToEnd()).not.toThrow();
  expect(() => actionsRef.current!.scrollToIndex(0)).toThrow("within the collection");
});

test("dynamic end jumps include newly measured tail content and stop following after manual scroll", async () => {
  installLayout();
  const actionsRef = createRef<VirtualListActions>();
  const measured = items.map(item => ({ ...item, size: item.id === 0 ? 40 : 20 }));
  const renderMeasured = (item: typeof measured[number]) => <div data-size={item.size}>{item.label}</div>;
  const { rerender } = render(<VirtualList aria-label="条目" actionsRef={actionsRef} items={measured} getKey={getKey} renderItem={renderMeasured} measurement="dynamic" itemSize={20} height={60} followEnd />);
  const viewport = screen.getByRole("list");
  await act(async () => actionsRef.current!.scrollToEnd());
  expect(viewport.scrollTop).toBe(1960);
  const appended = [...measured, { id: 100, label: "较长的新记录", size: 80 }];
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={appended} getKey={getKey} renderItem={renderMeasured} measurement="dynamic" itemSize={20} height={60} followEnd />);
  await act(async () => {});
  await waitFor(() => expect(viewport.scrollTop).toBe(2040));
  expect(screen.getByText("较长的新记录").parentElement).toHaveStyle({ top: "2020px" });
  fireEvent.wheel(viewport, { deltaY: -1 });
  fireEvent.scroll(viewport, { target: { scrollTop: 50 } });
  const prepended = [{ id: -1, label: "更早的记录", size: 20 }, ...appended];
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={prepended} getKey={getKey} renderItem={renderMeasured} measurement="dynamic" itemSize={20} height={60} followEnd />);
  await act(async () => {});
  expect(viewport.scrollTop).toBe(70);
  expect(screen.getByText("条目 2").parentElement).toHaveStyle({ top: "60px" });
});


test("followEnd accepts simultaneous history and output, but not replacing the last identity", async () => {
  installLayout();
  const actionsRef = createRef<VirtualListActions>();
  const { rerender } = render(<VirtualList aria-label="条目" actionsRef={actionsRef} items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} followEnd />);
  const viewport = screen.getByRole("list");
  await act(async () => actionsRef.current!.scrollToEnd());
  const simultaneous = [{ id: -1, label: "更早" }, ...items, { id: 100, label: "新增" }];
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={simultaneous} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} followEnd />);
  await act(async () => {});
  expect(viewport.scrollTop).toBe(1980);
  const replacement = [...simultaneous.slice(0, -1), { id: 101, label: "替换末项" }];
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={replacement} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} followEnd />);
  fireEvent.scroll(viewport, { target: { scrollTop: 100 } });
  await act(() => new Promise(resolve => setTimeout(resolve, 40)));
  expect(viewport.scrollTop).toBe(100);
});

test("shrinking the collection cancels an outstanding target outside its new bounds", async () => {
  const { scrollTo } = installLayout();
  const actionsRef = createRef<VirtualListActions>();
  const { rerender } = render(<VirtualList aria-label="条目" actionsRef={actionsRef} items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} />);
  await act(async () => actionsRef.current!.scrollToIndex(90));
  rerender(<VirtualList aria-label="条目" actionsRef={actionsRef} items={items.slice(0, 20)} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} />);
  const viewport = screen.getByRole("list");
  // A real element clamps itself when its content shrinks; deliver that event.
  fireEvent.scroll(viewport, { target: { scrollTop: 340 } });
  const writesAfterShrink = scrollTo.mock.calls.length;
  await act(() => new Promise(resolve => setTimeout(resolve, 40)));
  expect(scrollTo).toHaveBeenCalledTimes(writesAfterShrink);
  expect(screen.getByText("条目 20")).toHaveAttribute("aria-setsize", "20");
  expect(() => actionsRef.current!.scrollToIndex(90)).toThrow("within the collection");
});

test("a missing or blank accessible name fails explicitly, an aria-labelledby name is accepted", () => {
  const list = (props: Record<string, unknown>) => <VirtualList items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} {...props} />;
  expect(() => render(list({}))).toThrow(/VirtualList requires a nonempty aria-label or aria-labelledby/);
  expect(() => render(list({ "aria-label": "  " }))).toThrow(/aria-label/);
  render(<><h2 id="log-title">日志</h2>{list({ "aria-labelledby": "log-title" })}</>);
  expect(screen.getByRole("list", { name: "日志" })).toBeInTheDocument();
});
