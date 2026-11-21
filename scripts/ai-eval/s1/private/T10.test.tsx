import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GranularityPicker, type Granularity } from "../GranularityPicker";

function setup(value: Granularity = "week") {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const onChange = vi.fn();
  render(<GranularityPicker value={value} onChange={onChange} />);
  return { user, onChange };
}

describe("T10 GranularityPicker", () => {
  it("[a11y] 粒度是一组互斥单选值，组名为“时间粒度”", () => {
    setup("week");
    const group = screen.getByRole("radiogroup", { name: "时间粒度" });
    const radios = Array.from(group.querySelectorAll("[role='radio']"));
    expect(radios.map(r => r.textContent)).toEqual(["日", "周", "月"]);
    expect(radios.map(r => r.getAttribute("aria-checked"))).toEqual(["false", "true", "false"]);
  });

  it("[behavior] 选择另一粒度调用 onChange", async () => {
    const { user, onChange } = setup("week");
    await user.click(screen.getByText("月"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("month");
  });

  it("[behavior] 再次点击当前粒度不会取消选择", async () => {
    const { user, onChange } = setup("week");
    await user.click(screen.getByText("周"));
    for (const call of onChange.mock.calls) expect(["day", "week", "month"]).toContain(call[0]);
    expect(document.querySelector("[aria-checked='true'], [aria-selected='true'], [data-pressed], [aria-pressed='true']")).not.toBeNull();
  });

  it("[api] 来自库（带 data-slot）", () => {
    setup();
    // 选项文字所在的最近一个库部位
    expect(screen.getByText("周").closest("[data-slot]")?.getAttribute("data-slot")).toBeTruthy();
  });
});
