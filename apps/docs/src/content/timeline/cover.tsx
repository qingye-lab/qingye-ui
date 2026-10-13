import { Timeline, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";

export default function Cover() {
  return <Timeline>
    <TimelineItem><TimelineTime dateTime="2026-10-03T15:00:00+08:00">15:00</TimelineTime><TimelineTitle>第二条记录</TimelineTitle></TimelineItem>
    <TimelineItem><TimelineTime dateTime="2026-10-03T09:00:00+08:00">09:00</TimelineTime><TimelineTitle>第一条记录</TimelineTitle></TimelineItem>
  </Timeline>;
}
