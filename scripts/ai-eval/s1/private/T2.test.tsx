import "./_env";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SourceFilterTable, columns, type Lead, type Source } from "../SourceFilterTable";

const sources: Source[] = [{ id: "ads", name: "广告投放" }, { id: "expo", name: "线下展会" }];
const leads: Lead[] = [
  { id: "l1", name: "青石科技", sourceId: "ads", sourceName: "广告投放", status: "进行中" },
  { id: "l2", name: "远山物流", sourceId: "expo", sourceName: "线下展会", status: "已暂停" },
  { id: "l3", name: "白鹭医疗", sourceId: "ads", sourceName: "广告投放", status: "进行中" },
];

function setup(rows: Lead[] = leads) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(<SourceFilterTable leads={rows} sources={sources} />);
  return { user };
}

const sourceControl = () => screen.getByRole("combobox", { name: "来源" });
const shownNames = () => within(screen.getByRole("table", { name: "线索" })).queryAllByRole("rowheader").map(cell => cell.textContent?.trim());

async function pickSource(user: ReturnType<typeof userEvent.setup>, label: string) {
  const control = sourceControl();
  if (control instanceof HTMLSelectElement) { await user.selectOptions(control, label); return; }
  await user.click(control);
  await user.click(await screen.findByRole("option", { name: label }));
}

const displayed = (control: HTMLElement) => control instanceof HTMLSelectElement ? control.selectedOptions[0]?.textContent ?? "" : control.textContent ?? "";

describe("T2 SourceFilterTable", () => {
  it("[api] 线索表格来自库（带 data-slot）", () => {
    setup();
    const table = screen.getByRole("table", { name: "线索" });
    expect(table.closest("[data-slot^='data-table']")).not.toBeNull();
  });

  it("[behavior] 初始选中“全部来源”并显示全部线索", () => {
    setup();
    expect(displayed(sourceControl())).toContain("全部来源");
    expect(shownNames()).toEqual(["青石科技", "远山物流", "白鹭医疗"]);
  });

  it("[behavior] 选某个来源只显示该来源，选回“全部来源”恢复", async () => {
    const { user } = setup();
    await pickSource(user, "线下展会");
    await waitFor(() => expect(shownNames()).toEqual(["远山物流"]));
    await pickSource(user, "全部来源");
    await waitFor(() => expect(shownNames()).toEqual(["青石科技", "远山物流", "白鹭医疗"]));
    expect(displayed(sourceControl())).toContain("全部来源");
  });

  it("[behavior] 没有线索时显示“没有线索”", () => {
    setup([]);
    expect(screen.getByText("没有线索")).toBeTruthy();
  });

  it("[api] 列宽关系写在导出的列定义上", () => {
    const list = columns as Record<string, unknown>[];
    const byId = (id: string) => list.find(column => column.id === id) ?? {};
    const name = byId("name"), source = byId("source"), status = byId("status");
    expect(name.grow).toBe(2);
    expect(name.minSize).toBe(160);
    expect(name.size).toBeUndefined();
    expect(status.fit).toBe(true);
    expect(status.size).toBeUndefined();
    for (const key of ["size", "minSize", "maxSize", "grow", "fit"]) expect(source[key]).toBeUndefined();
  });
});
