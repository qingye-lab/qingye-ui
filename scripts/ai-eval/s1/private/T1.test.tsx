import "./_env";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WorkspaceSettings, type Owner, type Workspace, type WorkspaceSettingsProps } from "../WorkspaceSettings";

const regions = [{ id: "east", name: "华东" }, { id: "north", name: "华北" }, { id: "south", name: "华南" }];
const workspace: Workspace = { id: "w1", name: "增长分析", version: 3, regionId: "east", ownerId: null };

function deferredSearch() {
  const calls: { query: string; signal: AbortSignal; resolve: (items: Owner[]) => void }[] = [];
  const searchOwners = vi.fn((query: string, signal: AbortSignal) => new Promise<Owner[]>(resolve => { calls.push({ query, signal, resolve }); }));
  return { calls, searchOwners };
}

function setup(overrides: Partial<WorkspaceSettingsProps> = {}) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const search = deferredSearch();
  const props: WorkspaceSettingsProps = {
    workspace, regions, searchOwners: search.searchOwners,
    onOwnerChange: vi.fn(), onRegionChange: vi.fn(() => Promise.resolve()), ...overrides,
  };
  const view = render(<WorkspaceSettings {...props} />);
  return { user, ...search, props, view };
}

function regionControl(): HTMLElement {
  const group = screen.queryByRole("radiogroup", { name: "数据区域" });
  if (group) return group;
  return screen.getByRole("combobox", { name: "数据区域" });
}

async function pickRegion(user: ReturnType<typeof userEvent.setup>, name: string) {
  const radio = screen.queryByRole("radio", { name });
  if (radio) { await user.click(radio); return; }
  const control = screen.getByRole("combobox", { name: "数据区域" });
  if (control.tagName === "SELECT") { await user.selectOptions(control, name); return; }
  await user.click(control);
  await user.click(await screen.findByRole("option", { name }));
}

const isDisabled = (el: HTMLElement) => (el as HTMLButtonElement).disabled || el.getAttribute("aria-disabled") === "true";
const ownerInput = () => screen.getByRole("combobox", { name: "负责人" });
const openDialog = () => Array.from(document.querySelectorAll<HTMLElement>("[role=alertdialog], [role=dialog], dialog[open]")).at(-1) ?? null;
const findDialog = async () => { await waitFor(() => expect(openDialog()).not.toBeNull()); return openDialog()!; };

describe("T1", () => {
  it("[api] 数据区域控件来自库（带 data-slot）", () => {
    setup();
    const control = regionControl();
    const slot = control.closest("[data-slot]")?.getAttribute("data-slot") ?? "";
    expect(slot).toMatch(/^(select|native-select|radio-group|segmented-control|toggle-group)/);
  });

  it("[behavior] 远程候选原样显示，不在本地二次过滤", async () => {
    const { user, calls, searchOwners } = setup();
    await user.click(ownerInput());
    await user.type(ownerInput(), "王");
    await waitFor(() => expect(searchOwners).toHaveBeenCalledWith("王", expect.anything()));
    const call = calls.filter(c => c.query === "王").at(-1)!;
    await act(async () => { call.resolve([{ id: "u2", name: "李四" }]); });
    expect(await screen.findByRole("option", { name: "李四" })).toBeInTheDocument();
  });

  it("[behavior] 旧查询的迟到结果不覆盖新查询", async () => {
    const { user, calls } = setup();
    await user.click(ownerInput());
    await user.type(ownerInput(), "王");
    await waitFor(() => expect(calls.some(c => c.query === "王")).toBe(true));
    await user.type(ownerInput(), "五");
    await waitFor(() => expect(calls.some(c => c.query === "王五")).toBe(true));
    const late = calls.filter(c => c.query === "王").at(-1)!;
    const fresh = calls.filter(c => c.query === "王五").at(-1)!;
    await act(async () => { fresh.resolve([{ id: "u5", name: "王五" }]); });
    expect(await screen.findByRole("option", { name: "王五" })).toBeInTheDocument();
    await act(async () => { late.resolve([{ id: "u9", name: "过期结果" }]); });
    expect(screen.queryByRole("option", { name: "过期结果" })).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "王五" })).toBeInTheDocument();
  });

  it("[behavior] 选中负责人后回调成员 id", async () => {
    const { user, calls, props } = setup();
    await user.click(ownerInput());
    await user.type(ownerInput(), "李");
    await waitFor(() => expect(calls.some(c => c.query === "李")).toBe(true));
    await act(async () => { calls.filter(c => c.query === "李").at(-1)!.resolve([{ id: "u2", name: "李四" }]); });
    await user.click(await screen.findByRole("option", { name: "李四" }));
    await waitFor(() => expect(props.onOwnerChange).toHaveBeenLastCalledWith("u2"));
  });

  it("[behavior] 区域未改时“应用区域变更”不可用", () => {
    setup();
    expect(isDisabled(screen.getByRole("button", { name: "应用区域变更" }))).toBe(true);
  });

  it("[behavior] 先确认再提交：对话框显示名称、版本与变更，关闭不提交，确认提交一次", async () => {
    const { user, props } = setup();
    await pickRegion(user, "华北");
    const trigger = screen.getByRole("button", { name: "应用区域变更" });
    expect(isDisabled(trigger)).toBe(false);
    await user.click(trigger);
    let dialog = await findDialog();
    expect(dialog).toHaveTextContent("增长分析");
    expect(dialog.textContent).toMatch(/版本\s*[:：]?\s*3/);
    expect(dialog).toHaveTextContent("华东 → 华北");
    expect(props.onRegionChange).not.toHaveBeenCalled();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(openDialog()).toBeNull());
    expect(props.onRegionChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "应用区域变更" }));
    dialog = await findDialog();
    await user.click(within(dialog).getByRole("button", { name: "确认变更" }));
    await waitFor(() => expect(props.onRegionChange).toHaveBeenCalledTimes(1));
    expect(props.onRegionChange).toHaveBeenCalledWith({ workspaceId: "w1", version: 3, regionId: "north" });
  });

  it("[behavior] 对话框打开期间版本变化，不得以旧版本提交", async () => {
    const { user, props, view } = setup();
    await pickRegion(user, "华北");
    await user.click(screen.getByRole("button", { name: "应用区域变更" }));
    await findDialog();
    view.rerender(<WorkspaceSettings {...props} workspace={{ ...workspace, version: 4 }} />);
    const dialog = await findDialog();
    await user.click(within(dialog).getByRole("button", { name: "确认变更" }));
    await new Promise(resolve => setTimeout(resolve, 50));
    const versions = vi.mocked(props.onRegionChange).mock.calls.map(([change]) => change.version);
    expect(versions).not.toContain(3);
  });
});
