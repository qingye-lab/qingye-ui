import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { RelativeTime } from "../src/components/relative-time";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const now = new Date("2026-11-01T10:00:00Z");
const ago = (ms: number) => new Date(now.getTime() - ms);
const MIN = 60_000, HOUR = 60 * MIN, DAY = 24 * HOUR;

afterEach(() => { vi.useRealTimers(); });

test("renders a time element whose dateTime is the machine-readable ISO instant, whatever the input form", () => {
  const { container } = render(<><RelativeTime value={ago(3 * MIN)} now={now} /><RelativeTime value={ago(3 * MIN).toISOString()} now={now} /><RelativeTime value={ago(3 * MIN).getTime()} now={now} /></>);
  const times = container.querySelectorAll("time");
  expect([...times].map(time => time.getAttribute("datetime"))).toEqual(Array(3).fill("2026-11-01T09:57:00.000Z"));
});

test("with a fixed now the relative text is determined by value and now, in the locale", () => {
  const { rerender } = render(<RelativeTime value={ago(3 * MIN)} now={now} data-testid="t" />);
  expect(screen.getByTestId("t").querySelector("[data-slot=relative-time-text]")).toHaveTextContent("3分钟前");
  rerender(<RelativeTime value={ago(5 * HOUR)} now={now} data-testid="t" />);
  expect(screen.getByTestId("t").querySelector("[data-slot=relative-time-text]")).toHaveTextContent("5小时前");
  rerender(<RelativeTime value={ago(20 * 1000)} now={now} data-testid="t" />);
  expect(screen.getByTestId("t").querySelector("[data-slot=relative-time-text]")).toHaveTextContent("现在");
  rerender(<RelativeTime value={new Date(now.getTime() + 2 * DAY)} now={now} data-testid="t" />);
  expect(screen.getByTestId("t").querySelector("[data-slot=relative-time-text]")).toHaveTextContent("后天");
  rerender(<UILocaleProvider locale={enUS}><RelativeTime value={ago(3 * MIN)} now={now} data-testid="t" /></UILocaleProvider>);
  expect(screen.getByTestId("t").querySelector("[data-slot=relative-time-text]")).toHaveTextContent("3 minutes ago");
});

test("the absolute time reaches screen readers as text inside the element, not only as a title", () => {
  render(<RelativeTime value={ago(3 * MIN)} now={now} data-testid="t" />);
  const element = screen.getByTestId("t");
  expect(element).not.toHaveAttribute("title");
  const absolute = element.querySelector("[data-slot=relative-time-absolute]")!;
  expect(absolute).toHaveClass("sr-only");
  expect(absolute.textContent).toMatch(/2026/);
  expect(element).toHaveTextContent(/3分钟前.*2026/);
});

test("it adds no tab stop and no live region", () => {
  render(<RelativeTime value={ago(3 * MIN)} now={now} data-testid="t" />);
  const element = screen.getByTestId("t");
  expect(element.tagName).toBe("TIME");
  expect(element).not.toHaveAttribute("tabindex");
  expect(element.closest("[aria-live]")).toBeNull();
  expect(element.querySelector("[aria-live]")).toBeNull();
});

test("hovering reveals the absolute time in a tooltip", async () => {
  render(<RelativeTime value={ago(3 * MIN)} now={now} data-testid="t" />);
  fireEvent.mouseEnter(screen.getByTestId("t"));
  fireEvent.mouseMove(screen.getByTestId("t"));
  expect(await screen.findByRole("tooltip", {}, { timeout: 2000 })).toHaveTextContent(/2026/);
});

test("passes through ordinary attributes, class names and refs", () => {
  const ref = { current: null as HTMLElement | null };
  render(<RelativeTime value={ago(MIN)} now={now} id="when" className="text-support" data-extra="x" ref={ref} />);
  const element = document.getElementById("when")!;
  expect(element).toHaveClass("text-support");
  expect(element).toHaveAttribute("data-extra", "x");
  expect(ref.current).toBe(element);
});

test("an invalid value or now throws a descriptive error", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  for (const bad of ["not a date", "", NaN, new Date("x"), undefined, null, {}] as unknown[]) {
    expect(() => render(<RelativeTime value={bad as string} now={now} />)).toThrow(/RelativeTime value must be a valid Date/);
  }
  expect(() => render(<RelativeTime value={now} now={"soon"} />)).toThrow(/RelativeTime now must be a valid Date.*"soon"/);
  error.mockRestore();
});

test("without now it refreshes by itself; all instances share one timer, tiered by distance", () => {
  vi.useFakeTimers({ now: now.getTime() });
  render(<><RelativeTime value={now} data-testid="a" /><RelativeTime value={ago(2 * HOUR)} data-testid="b" /><RelativeTime value={ago(3 * DAY)} data-testid="c" /></>);
  const text = (id: string) => screen.getByTestId(id).querySelector("[data-slot=relative-time-text]")!.textContent;
  expect([text("a"), text("b"), text("c")]).toEqual(["现在", "2小时前", "3天前"]);
  // 三个实例只排了一个计时器。
  expect(vi.getTimerCount()).toBe(1);
  act(() => { vi.advanceTimersByTime(MIN + 10_000); });
  expect(text("a")).toBe("1分钟前");
  expect(text("b")).toBe("2小时前");
  act(() => { vi.advanceTimersByTime(HOUR); });
  expect(text("a")).toBe("1小时前");
  expect(text("b")).toBe("3小时前");
  expect(vi.getTimerCount()).toBe(1);
});

test("the timer stops when the last instance unmounts, and a fixed now never starts one", () => {
  vi.useFakeTimers({ now: now.getTime() });
  const fixed = render(<RelativeTime value={now} now={now} />);
  expect(vi.getTimerCount()).toBe(0);
  fixed.unmount();
  const live = render(<RelativeTime value={now} />);
  expect(vi.getTimerCount()).toBe(1);
  live.unmount();
  expect(vi.getTimerCount()).toBe(0);
});

test("refreshing does not announce: only the text changes and nothing is a live region", () => {
  vi.useFakeTimers({ now: now.getTime() });
  render(<RelativeTime value={now} data-testid="t" />);
  act(() => { vi.advanceTimersByTime(2 * MIN); });
  expect(screen.getByTestId("t").querySelector("[data-slot=relative-time-text]")).toHaveTextContent("2分钟前");
  expect(document.querySelector("[aria-live], [role=status], [role=alert]")).toBeNull();
});
