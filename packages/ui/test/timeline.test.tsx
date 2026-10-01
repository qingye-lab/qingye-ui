import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "../src/components/timeline";

test("renders entries with machine-readable times", () => {
  render(
    <Timeline
      items={[
        { id: "a", title: "订单已创建", time: "09:12", dateTime: "2026-10-01T09:12" },
        { id: "b", title: "已发货", status: "success", icon: <svg data-testid="icon" /> },
      ]}
    />,
  );
  const list = screen.getByRole("list", { name: "时间线" });
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getByText("09:12").tagName).toBe("TIME");
  expect(screen.getByText("09:12")).toHaveAttribute("datetime", "2026-10-01T09:12");
  const markers = list.querySelectorAll("[data-slot=timeline-marker]");
  expect(markers[0]).toHaveAttribute("data-variant", "dot");
  expect(markers[1]).toHaveAttribute("data-variant", "icon");
  expect(markers[1]).toHaveAttribute("data-status", "success");
  expect(markers[1]).toHaveAttribute("aria-hidden", "true");
});

test("composes parts and exposes density and connector", () => {
  render(
    <Timeline connector="dashed" density="compact" label="审批记录">
      <TimelineItem>
        <TimelineMarker variant="plain">林</TimelineMarker>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>林晓雯 通过了申请</TimelineTitle>
            <TimelineTime>昨天</TimelineTime>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
    </Timeline>,
  );
  const list = screen.getByRole("list", { name: "审批记录" });
  expect(list).toHaveAttribute("data-density", "compact");
  expect(list).toHaveAttribute("data-connector", "dashed");
  expect(list.querySelector("[data-slot=timeline-marker]")).toHaveAttribute("data-variant", "plain");
});
