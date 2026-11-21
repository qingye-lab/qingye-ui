import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PlanChange } from "../PlanChange";

const props = { charges: "本月补差价 128 元", refundPolicy: "七天内可申请原路退回", invoice: "电子发票将发送至账户邮箱", nonRefundable: true };
const NOTE = "变更后不可退款";
const SECTIONS: [string, string][] = [["费用明细", props.charges], ["退款规则", props.refundPolicy], ["发票", props.invoice]];

// 收起的面板：自身或祖先带 hidden 属性，或位于手风琴面板内
const concealed = (el: Element) => !!el.closest("[hidden], [data-slot^='accordion-panel']");
const bodyOf = (text: string) => screen.queryAllByText(text);

describe("T26 PlanChange", () => {
  it("[behavior] 三个分节默认收起，展开后显示对应内容", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlanChange {...props} />);
    for (const [name, text] of SECTIONS) {
      const trigger = screen.getByRole("button", { name });
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
      expect(bodyOf(text).filter(el => !el.closest("[hidden]"))).toHaveLength(0);
      await user.click(trigger);
      expect(trigger.getAttribute("aria-expanded")).toBe("true");
      expect(bodyOf(text).filter(el => !el.closest("[hidden]")).length).toBeGreaterThan(0);
    }
  });

  it("[a11y] 不可退款无需展开即可见", () => {
    render(<PlanChange {...props} />);
    // 不展开任何分节
    expect(screen.queryAllByRole("button").filter(b => b.getAttribute("aria-expanded") === "true")).toHaveLength(0);
    const visible = screen.queryAllByText(NOTE).filter(el => !concealed(el));
    expect(visible.length).toBeGreaterThan(0);
  });

  it("[state] nonRefundable 为 false 时不显示该文字", () => {
    render(<PlanChange {...props} nonRefundable={false} />);
    expect(screen.queryAllByText(NOTE)).toHaveLength(0);
  });

  it("[api] 分节来自库（带 accordion 或 collapsible data-slot）", () => {
    const { container } = render(<PlanChange {...props} />);
    expect(container.querySelectorAll("[data-slot^='accordion'], [data-slot^='collapsible']").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "费用明细" }).getAttribute("data-slot")).toMatch(/^(accordion|collapsible)/);
  });
});
