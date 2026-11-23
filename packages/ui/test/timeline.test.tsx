import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "../src/components/timeline";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

describe("Timeline", () => {
  it("preserves supplied order and machine-readable times", () => {
    render(
      <Timeline>
        <TimelineItem><TimelineTime dateTime="2026-10-03T15:00">15:00</TimelineTime><TimelineTitle>后一时间</TimelineTitle></TimelineItem>
        <TimelineItem><TimelineTime dateTime="2026-10-03T09:00">09:00</TimelineTime><TimelineTitle>前一时间</TimelineTitle></TimelineItem>
      </Timeline>,
    );
    expect(screen.getAllByRole("listitem").map((item) => item.querySelector("time")?.dateTime)).toEqual(["2026-10-03T15:00", "2026-10-03T09:00"]);
  });

  it("does not manufacture entries for an empty sequence or replace supplied uncertainty", () => {
    const { rerender } = render(<Timeline aria-label="记录" />);
    expect(screen.getByRole("list")).toBeEmptyDOMElement();
    rerender(
      <Timeline>
        <TimelineItem><TimelineTitle>时间未知</TimelineTitle><TimelineDescription>尚未提供时间</TimelineDescription></TimelineItem>
      </Timeline>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("时间未知").closest("li")?.querySelector("time")).toBeNull();
  });

  it("uses locale default aria-label and lets caller aria-label override it", () => {
    const { rerender } = render(<Timeline><TimelineItem><TimelineTitle>创建</TimelineTitle></TimelineItem></Timeline>);
    expect(screen.getByRole("list", { name: "时间线" })).toBeInTheDocument();

    rerender(<UILocaleProvider locale={enUS}><Timeline><TimelineItem><TimelineTitle>Created</TimelineTitle></TimelineItem></Timeline></UILocaleProvider>);
    expect(screen.getByRole("list", { name: "Timeline" })).toBeInTheDocument();

    rerender(<UILocaleProvider locale={enUS}><Timeline aria-label="Deployment history"><TimelineItem><TimelineTitle>Deployed</TimelineTitle></TimelineItem></Timeline></UILocaleProvider>);
    expect(screen.getByRole("list", { name: "Deployment history" })).toBeInTheDocument();
  });

  it("exposes expected data-slot hooks and semantic elements across every subpart", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineTime dateTime="2026-11-23">2026-11-23</TimelineTime>
          <TimelineTitle>发布 5.5.0</TimelineTitle>
          <TimelineDescription>新增组件规范守卫</TimelineDescription>
        </TimelineItem>
      </Timeline>,
    );
    expect(container.querySelector('[data-slot="timeline"]')?.tagName).toBe("OL");
    expect(container.querySelector('[data-slot="timeline-item"]')?.tagName).toBe("LI");
    expect(container.querySelector('[data-slot="timeline-time"]')?.tagName).toBe("TIME");
    expect(container.querySelector('[data-slot="timeline-title"]')?.tagName).toBe("DIV");
    expect(container.querySelector('[data-slot="timeline-description"]')?.tagName).toBe("P");
  });

  it("supports render composition", () => {
    const { container } = render(
      <Timeline render={<ul />}>
        <TimelineItem>
          <TimelineTime dateTime="2026-11-23">今天</TimelineTime>
          <TimelineTitle render={<h3 />}>审计完成</TimelineTitle>
          <TimelineDescription>全部项通过检查</TimelineDescription>
        </TimelineItem>
      </Timeline>,
    );
    expect(container.querySelector('[data-slot="timeline"]')?.tagName).toBe("UL");
    expect(screen.getByRole("heading", { level: 3, name: "审计完成" })).toHaveAttribute("data-slot", "timeline-title");
  });
});
