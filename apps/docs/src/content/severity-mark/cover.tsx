import { Inline } from "@qingye_lab/ui/components/layout";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";

export default function Cover() {
  return <Inline wrap={false} gap="panel">
    <SeverityMark level={3} tone="danger" label="高" />
    <SeverityMark level={2} tone="warning" label="中" />
    <SeverityMark level={1} tone="info" label="低" />
  </Inline>;
}
