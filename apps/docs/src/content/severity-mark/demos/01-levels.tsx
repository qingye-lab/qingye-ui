import { Inline } from "@qingye_lab/ui/components/layout";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "三级", titleEn: "Three levels" } satisfies DemoMeta;

export default function Demo() {
  return <Inline gap="panel">
    <SeverityMark level={3} tone="danger" label="高" />
    <SeverityMark level={2} tone="warning" label="中" />
    <SeverityMark level={1} tone="info" label="低" />
  </Inline>;
}
