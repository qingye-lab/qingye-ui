import "./_env";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServerLoad } from "../ServerLoad";

const servers = [
  { name: "api-01", load: "低" as const },
  { name: "db-02", load: "高" as const },
  { name: "cache-03", load: "中" as const },
];
// 行：包含该服务器名称、且不包含其他服务器名称的最外层祖先（不限定 ul/li、表格或库的 Item）
const rowOf = (name: string) => {
  const own = screen.queryAllByText((_, el) => !!el && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent?.includes(name)));
  if (own.length === 0) throw new Error(`没有找到显示“${name}”的元素`);
  const others = servers.map(s => s.name).filter(n => n !== name);
  let row: HTMLElement = own[0]!;
  for (let a = row.parentElement; a && a !== document.body; a = a.parentElement) {
    if (others.some(n => a!.textContent?.includes(n))) break;
    row = a;
  }
  return row;
};

describe("T29 ServerLoad", () => {
  it("[behavior] 每台服务器一行，显示名称", () => {
    render(<ServerLoad servers={servers} />);
    const rows = servers.map(s => rowOf(s.name));
    expect(new Set(rows).size).toBe(servers.length);
  });

  it("[a11y] 负载读作三级中的第几级", () => {
    render(<ServerLoad servers={servers} />);
    const expected = { 低: 1, 中: 2, 高: 3 } as const;
    for (const s of servers) {
      const row = rowOf(s.name);
      const meters = within(row).getAllByRole("meter");
      expect(meters).toHaveLength(1);
      const meter = meters[0]!;
      expect(Number(meter.getAttribute("aria-valuemax"))).toBe(3);
      const min = Number(meter.getAttribute("aria-valuemin") ?? 0);
      expect(min === 0 || min === 1).toBe(true);
      expect(Number(meter.getAttribute("aria-valuenow"))).toBe(expected[s.load]);
      // 读数能与该服务器对应：可访问名称或读数文字里带服务器名或“负载”
      const label = `${meter.getAttribute("aria-label") ?? ""}${meter.getAttribute("aria-valuetext") ?? ""}`;
      const labelledBy = (meter.getAttribute("aria-labelledby") ?? "").split(/\s+/).map(id => document.getElementById(id)?.textContent ?? "").join("");
      expect(`${label}${labelledBy}`).toMatch(new RegExp(`${s.name}|负载`));
    }
  });

  it("[api] 每行的负载读数来自库（带 data-slot）", () => {
    render(<ServerLoad servers={servers} />);
    for (const s of servers) expect(rowOf(s.name).querySelector("[data-slot]")).not.toBeNull();
  });
});
