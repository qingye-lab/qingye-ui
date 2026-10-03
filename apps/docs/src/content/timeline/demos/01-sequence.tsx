import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye/ui/components/timeline";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "输入序列", titleEn: "Input sequence" } satisfies DemoMeta;
export default function Demo() {
  return <Timeline><TimelineItem><TimelineTime dateTime="2026-10-03T15:00:00+08:00">15:00</TimelineTime><TimelineTitle>第二条记录</TimelineTitle></TimelineItem><TimelineItem><TimelineTime dateTime="2026-10-03T09:00:00+08:00">09:00</TimelineTime><TimelineTitle>第一条记录</TimelineTitle></TimelineItem><TimelineItem><TimelineTitle>时间未知</TimelineTitle><TimelineDescription>未提供时间</TimelineDescription></TimelineItem></Timeline>;
}
