import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { VirtualList } from "../src/components/virtual-list";

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
  const { rerender } = render(<VirtualList items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} overscan={0} />);
  const viewport = screen.getByRole("list");
  viewport.focus();
  await userEvent.keyboard("{End}");
  expect(screen.getByText("条目 100")).toHaveFocus();
  await userEvent.keyboard("{ArrowUp}");
  expect(screen.getByText("条目 99")).toHaveFocus();
  await userEvent.keyboard("{Home}");
  expect(screen.getByText("条目 1")).toHaveFocus();
  rerender(<VirtualList items={items} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} onKeyDown={event => event.preventDefault()} />);
  await userEvent.keyboard("{End}");
  expect(screen.getByText("条目 1")).toHaveFocus();
});

test("focused descendant survives scrolling/reordering and keeps its native editing keys", async () => {
  const renderInput = (item: typeof items[number]) => <input aria-label={item.label} defaultValue="初始" />;
  const { rerender } = render(<VirtualList items={items} getKey={getKey} renderItem={renderInput} itemSize={20} height={60} overscan={0} />);
  const input = screen.getByRole("textbox", { name: "条目 1" });
  input.focus();
  await userEvent.type(input, "改");
  await userEvent.keyboard("{End}");
  expect(input).toHaveFocus();
  fireEvent.scroll(screen.getByRole("list"), { target: { scrollTop: 1000 } });
  expect(input).toHaveFocus();
  expect(input).toHaveValue("初始改");
  rerender(<VirtualList items={[...items].reverse()} getKey={getKey} renderItem={renderInput} itemSize={20} height={60} overscan={0} />);
  expect(screen.getByRole("textbox", { name: "条目 1" })).toBe(input);
  expect(input).toHaveFocus();
  rerender(<VirtualList items={items.slice(1)} getKey={getKey} renderItem={renderInput} itemSize={20} height={60} overscan={0} />);
  expect(screen.queryByRole("textbox", { name: "条目 1" })).not.toBeInTheDocument();
  expect(screen.getByRole("list")).toHaveFocus();
  await userEvent.keyboard("{Home}");
  expect(screen.getAllByRole("listitem")[0]).toHaveFocus();
});

test("empty collections remain reachable, and invalid dimensions/duplicate keys fail explicitly", () => {
  render(<VirtualList items={[]} getKey={getKey} renderItem={renderItem} itemSize={20} height={60} />);
  expect(screen.getByRole("list")).toHaveAttribute("tabindex", "0");
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  expect(() => render(<VirtualList items={items} getKey={getKey} renderItem={renderItem} itemSize={0} height={60} />)).toThrow("finite positive");
  expect(() => render(<VirtualList items={items} getKey={() => "same"} renderItem={renderItem} itemSize={20} height={60} />)).toThrow("unique stable");
});
