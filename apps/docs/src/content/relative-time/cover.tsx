import { RelativeTime } from "@qingye_lab/ui/components/relative-time";

const FIXED = new Date("2026-11-01T10:00:00+08:00");

export default function Cover() {
  return <p className="text-body">最后同步于 <RelativeTime value={new Date(FIXED.getTime() - 3 * 60_000)} now={FIXED} /></p>;
}
