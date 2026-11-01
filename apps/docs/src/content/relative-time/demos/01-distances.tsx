import { RelativeTime } from "@qingye_lab/ui/components/relative-time";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "远近不同的时刻", titleEn: "Moments at different distances" };
const loaded = Date.now();
const offsets = [20 * 1000, 3 * 60_000, 5 * 3_600_000, 2 * 86_400_000, 40 * 86_400_000];
export default function Demo() {
  return <Stack gap="field" align="start">{offsets.map(offset => <RelativeTime key={offset} value={loaded - offset} />)}</Stack>;
}
