import { Inline } from "@qingye_lab/ui/components/layout";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";

export default function Cover() {
  return <Inline wrap={false}>{(["online", "warning", "error"] as const).map(status => <StatusDot key={status} status={status} />)}</Inline>;
}
