import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "../src/components/timeline";

describe("Timeline", () => {
  it("preserves supplied order and machine-readable times", () => {
    render(<Timeline><TimelineItem><TimelineTime dateTime="2026-10-03T15:00">15:00</TimelineTime><TimelineTitle>后一时间</TimelineTitle></TimelineItem><TimelineItem><TimelineTime dateTime="2026-10-03T09:00">09:00</TimelineTime><TimelineTitle>前一时间</TimelineTitle></TimelineItem></Timeline>);
    expect(screen.getAllByRole("listitem").map(item => item.querySelector("time")?.dateTime)).toEqual(["2026-10-03T15:00", "2026-10-03T09:00"]);
  });
  it("does not manufacture entries for an empty sequence or replace supplied uncertainty", () => {
    const { rerender } = render(<Timeline aria-label="记录" />); expect(screen.getByRole("list")).toBeEmptyDOMElement();
    rerender(<Timeline><TimelineItem><TimelineTitle>时间未知</TimelineTitle><TimelineDescription>尚未提供时间</TimelineDescription></TimelineItem></Timeline>);
    expect(screen.getAllByRole("listitem")).toHaveLength(1); expect(screen.getByText("时间未知").closest("li")?.querySelector("time")).toBeNull();
  });
});
