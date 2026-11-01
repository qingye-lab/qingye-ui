import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Transfer, type TransferItem } from "../src/components/transfer";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const items: TransferItem[] = [
  { value: "a", label: "苹果" },
  { value: "b", label: "香蕉" },
  { value: "c", label: "橙子", disabled: true },
  { value: "d", label: "葡萄" },
];

const list = (name: string) => screen.getByRole("group", { name });
const box = (listName: string, itemName: string) => within(list(listName)).getByRole("checkbox", { name: itemName });
const toTarget = () => screen.getByRole("button", { name: /移到“已选”/ });
const toSource = () => screen.getByRole("button", { name: /移到“候选”/ });

test("splits items by value into two named lists with counts", () => {
  render(<Transfer items={items} defaultValue={["b"]} />);
  expect(within(list("候选")).getAllByRole("checkbox", { name: /苹果|橙子|葡萄/ })).toHaveLength(3);
  expect(within(list("已选")).getByRole("checkbox", { name: "香蕉" })).toBeInTheDocument();
  expect(list("候选")).toHaveAccessibleDescription("0 / 3");
  expect(list("已选")).toHaveAccessibleDescription("0 / 1");
});

test("moving checked items to the right updates the uncontrolled value and reports details", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Transfer items={items} onValueChange={onValueChange} />);
  await user.click(box("候选", "苹果"));
  await user.click(box("候选", "葡萄"));
  expect(toTarget()).toHaveAccessibleName("将所选 2 项移到“已选”");
  await user.click(toTarget());
  expect(onValueChange).toHaveBeenCalledWith(["a", "d"], { direction: "toTarget", moved: ["a", "d"] });
  expect(within(list("已选")).getByRole("checkbox", { name: "苹果" })).toBeInTheDocument();
  expect(within(list("候选")).queryByRole("checkbox", { name: "苹果" })).toBeNull();
  expect(screen.getByRole("status")).toHaveTextContent("已移到“已选” 2 项");
});

test("moving back to the left", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Transfer items={items} defaultValue={["a", "b"]} onValueChange={onValueChange} />);
  await user.click(box("已选", "苹果"));
  await user.click(toSource());
  expect(onValueChange).toHaveBeenCalledWith(["b"], { direction: "toSource", moved: ["a"] });
  expect(within(list("候选")).getByRole("checkbox", { name: "苹果" })).toBeInTheDocument();
});

test("with nothing checked the move buttons are aria-disabled and do nothing", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Transfer items={items} onValueChange={onValueChange} />);
  expect(toTarget()).toHaveAttribute("aria-disabled", "true");
  await user.click(toTarget());
  expect(onValueChange).not.toHaveBeenCalled();
});

test("disabled items cannot be checked and select-all skips them", async () => {
  const user = userEvent.setup();
  render(<Transfer items={items} />);
  expect(box("候选", "橙子")).toHaveAttribute("aria-disabled", "true");
  await user.click(within(list("候选")).getByRole("checkbox", { name: "全选" }));
  expect(box("候选", "苹果")).toBeChecked();
  expect(box("候选", "香蕉")).toBeChecked();
  expect(box("候选", "葡萄")).toBeChecked();
  expect(box("候选", "橙子")).not.toBeChecked();
  await user.click(toTarget());
  expect(within(list("已选")).getAllByRole("checkbox", { name: /苹果|香蕉|葡萄/ })).toHaveLength(3);
  expect(within(list("候选")).getByRole("checkbox", { name: "橙子" })).toBeInTheDocument();
});

test("controlled value changes only when the parent applies it", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  const { rerender } = render(<Transfer items={items} value={[]} onValueChange={onValueChange} />);
  await user.click(box("候选", "苹果"));
  await user.click(toTarget());
  expect(onValueChange).toHaveBeenCalledWith(["a"], expect.objectContaining({ direction: "toTarget" }));
  expect(within(list("候选")).getByRole("checkbox", { name: "苹果" })).toBeInTheDocument();
  rerender(<Transfer items={items} value={["a"]} onValueChange={onValueChange} />);
  expect(within(list("已选")).getByRole("checkbox", { name: "苹果" })).toBeInTheDocument();
});

test("controlled use through state", async () => {
  const user = userEvent.setup();
  function Controlled() {
    const [value, setValue] = useState<string[]>([]);
    return <><Transfer items={items} value={value} onValueChange={setValue} /><output data-testid="value">{value.join(",")}</output></>;
  }
  render(<Controlled />);
  await user.click(box("候选", "香蕉"));
  await user.click(toTarget());
  expect(screen.getByTestId("value")).toHaveTextContent("b");
});

test("searchable filters each side; select-all and move act only on visible items", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Transfer items={items} searchable onValueChange={onValueChange} />);
  await user.click(box("候选", "苹果"));
  await user.type(screen.getByRole("searchbox", { name: "筛选候选" }), "葡");
  expect(within(list("候选")).queryByRole("checkbox", { name: "苹果" })).toBeNull();
  expect(list("候选")).toHaveAccessibleDescription("0 / 1");
  // 苹果 is checked but hidden by the filter: it is not moved.
  expect(toTarget()).toHaveAttribute("aria-disabled", "true");
  await user.click(within(list("候选")).getByRole("checkbox", { name: "全选" }));
  await user.click(toTarget());
  expect(onValueChange).toHaveBeenCalledWith(["d"], { direction: "toTarget", moved: ["d"] });
});

test("no match and empty states are stated", async () => {
  const user = userEvent.setup();
  render(<Transfer items={items} searchable />);
  expect(within(list("已选")).getByText("没有条目")).toBeInTheDocument();
  await user.type(screen.getByRole("searchbox", { name: "筛选候选" }), "zzz");
  expect(within(list("候选")).getByText("没有匹配项")).toBeInTheDocument();
});

test("name submits the selected keys as repeated form fields", async () => {
  const user = userEvent.setup();
  render(<form aria-label="f"><Transfer name="fruit" items={items} defaultValue={["b"]} /></form>);
  await user.click(box("候选", "苹果"));
  await user.click(toTarget());
  const data = new FormData(screen.getByRole("form", { name: "f" }) as HTMLFormElement);
  expect(data.getAll("fruit")).toEqual(["b", "a"]);
});

test("form reset restores the default value", async () => {
  const user = userEvent.setup();
  render(<form aria-label="f"><Transfer name="fruit" items={items} defaultValue={["b"]} /><button type="reset">重置</button></form>);
  await user.click(box("候选", "苹果"));
  await user.click(toTarget());
  await user.click(screen.getByRole("button", { name: "重置" }));
  await screen.findByRole("checkbox", { name: "苹果" });
  expect(within(list("候选")).getByRole("checkbox", { name: "苹果" })).toBeInTheDocument();
  expect(new FormData(screen.getByRole("form", { name: "f" }) as HTMLFormElement).getAll("fruit")).toEqual(["b"]);
});

test("disabled disables every checkbox and the move buttons", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Transfer items={items} disabled onValueChange={onValueChange} />);
  expect(box("候选", "苹果")).toHaveAttribute("aria-disabled", "true");
  await user.click(toTarget());
  expect(onValueChange).not.toHaveBeenCalled();
});

test("custom titles name the lists and the move buttons", () => {
  render(<Transfer items={items} titles={["可选权限", "已授予"]} />);
  expect(list("可选权限")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "将所选 0 项移到“已授予”" })).toBeInTheDocument();
});

test("names follow the locale", () => {
  render(<UILocaleProvider locale={enUS}><Transfer items={items} searchable /></UILocaleProvider>);
  expect(screen.getByRole("group", { name: "Available" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Move 0 selected to “Selected”" })).toBeInTheDocument();
  expect(screen.getByRole("searchbox", { name: "Filter available" })).toBeInTheDocument();
});

test("rejects duplicate or unnamed items", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Transfer items={[{ value: "a", label: "A" }, { value: "a", label: "B" }]} />)).toThrow(/repeats the value "a"/);
  expect(() => render(<Transfer items={[{ value: "a", label: " " }]} />)).toThrow(/nonempty label/);
  error.mockRestore();
});
