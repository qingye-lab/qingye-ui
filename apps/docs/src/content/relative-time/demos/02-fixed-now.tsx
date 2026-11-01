import { RelativeTime } from "@qingye_lab/ui/components/relative-time";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "固定参照时间", titleEn: "A fixed reference time" };
const now = new Date("2026-11-01T10:00:00+08:00");
export default function Demo() {
  return <Stack gap="field" align="start">
    <RelativeTime value="2026-11-01T09:57:00+08:00" now={now} />
    <RelativeTime value="2026-11-01T14:00:00+08:00" now={now} />
    <RelativeTime value="2026-10-30T10:00:00+08:00" now={now} />
  </Stack>;
}
