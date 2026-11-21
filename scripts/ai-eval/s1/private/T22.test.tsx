import "./_env";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ViewSwitch } from "../ViewSwitch";

type View = "list" | "grid";

function Harness({ onChange }: { onChange: (v: unknown) => void }) {
  const [value, setValue] = useState<View>("list");
  return (
    <ViewSwitch
      value={value}
      onValueChange={(v) => {
        onChange(v);
        setValue(v);
      }}
    />
  );
}

// 选中状态：radio 用 aria-checked，按压按钮用 aria-pressed
const isOn = (el: HTMLElement) => el.getAttribute("aria-checked") === "true" || el.getAttribute("aria-pressed") === "true";
const options = () => [screen.getByText("列表"), screen.getByText("网格")].map((n) => (n.closest("[role='radio'],button") ?? n) as HTMLElement);

describe("T22 ViewSwitch", () => {
  it("[behavior] 点击“网格”后 onValueChange 收到 grid，网格成为选中", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await user.click(screen.getByText("网格"));
    expect(onChange).toHaveBeenLastCalledWith("grid");
    const [list, grid] = options();
    expect(isOn(grid)).toBe(true);
    expect(isOn(list)).toBe(false);
  });

  it("[behavior] 再点当前已选项不产生空值，仍恰有一项选中", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await user.click(screen.getByText("网格"));
    await user.click(screen.getByText("网格"));
    for (const call of onChange.mock.calls) expect(["list", "grid"]).toContain(call[0]);
    expect(options().filter(isOn)).toHaveLength(1);
  });

  it("[a11y] 两个选项以单选语义呈现，组名为“视图”", () => {
    render(<Harness onChange={() => {}} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);
    expect(radios.filter((r) => r.getAttribute("aria-checked") === "true")).toHaveLength(1);
    expect(screen.getByRole("radiogroup", { name: "视图" })).toBeTruthy();
  });

  // 考点是“必选互斥值不用可松开的 ToggleGroup”；库的单选族（SegmentedControl 或 RadioGroup）都合规
  it("[api] 控件来自库的单选族（segmented-control 或 radio-group）", () => {
    const { container } = render(<Harness onChange={() => {}} />);
    expect(container.querySelector("[data-slot^='segmented-control'],[data-slot^='radio-group']")).not.toBeNull();
  });
});
