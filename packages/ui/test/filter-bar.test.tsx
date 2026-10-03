import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilterBar, FilterBarApplied, FilterBarApply, FilterBarCancel, FilterBarClear, FilterBarFields, FilterBarStatus } from "../src/components/filter-bar";
describe("FilterBar", () => {
  it("retains draft and applied facts until the application confirms a change", async () => {
    const user = userEvent.setup(); const apply = vi.fn(); const cancel = vi.fn(); render(<FilterBar dirty appliedSummary="已应用：全部" onApply={apply} onCancel={cancel}><FilterBarFields><input aria-label="条件" defaultValue="草稿" /></FilterBarFields><FilterBarApplied /><FilterBarStatus /><FilterBarApply /><FilterBarCancel /></FilterBar>); expect(screen.getByRole("status")).toHaveTextContent("条件尚未应用"); await user.click(screen.getByRole("button", { name: "应用" })); expect(apply).toHaveBeenCalledOnce(); await user.click(screen.getByRole("button", { name: "取消" })); expect(cancel).toHaveBeenCalledOnce(); expect(screen.getByRole("textbox")).toHaveValue("草稿"); expect(screen.getByText("已应用：全部")).toBeInTheDocument();
  });
  it("honors public Base UI cancellation for cancel and clear", () => {
    const cancel = vi.fn(); const clear = vi.fn(); render(<FilterBar dirty canClear appliedSummary="全部" onApply={() => {}} onCancel={cancel} onClear={clear}><FilterBarCancel onClick={event => event.preventBaseUIHandler()} /><FilterBarClear onClick={event => event.preventBaseUIHandler()} /></FilterBar>); fireEvent.click(screen.getByRole("button", { name: "取消" })); fireEvent.click(screen.getByRole("button", { name: "清除" })); expect(cancel).not.toHaveBeenCalled(); expect(clear).not.toHaveBeenCalled();
  });
  it("respects canceled native submit and real disabled fields", async () => {
    const user = userEvent.setup(); const apply = vi.fn(); const { rerender } = render(<FilterBar dirty appliedSummary="全部" onApply={apply} onSubmit={event => event.preventDefault()}><FilterBarApply /></FilterBar>); await user.click(screen.getByRole("button")); expect(apply).not.toHaveBeenCalled(); rerender(<FilterBar dirty disabled appliedSummary="全部" onApply={apply}><FilterBarFields><input aria-label="条件" defaultValue="原值" /></FilterBarFields><FilterBarApply /></FilterBar>); await user.type(screen.getByRole("textbox"), "新"); fireEvent.submit(screen.getByRole("button").closest("form")!); expect(screen.getByRole("textbox")).toHaveValue("原值"); expect(apply).not.toHaveBeenCalled();
  });
});
