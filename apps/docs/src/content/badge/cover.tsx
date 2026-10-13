import { Badge } from "@qingye_lab/ui/components/badge";
import { Inline } from "@qingye_lab/ui/components/layout";

export default function Cover() {
  return <Inline><Badge>草稿</Badge><Badge tone="warning">待确认</Badge><Badge tone="danger">失败</Badge></Inline>;
}
