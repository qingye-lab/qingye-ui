import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { Inline } from "@qingye_lab/ui/components/layout";

export default function Cover() {
  return <Inline><code className="text-body">Qingye</code><CopyButton value="Qingye" /><CopyButton value="Qingye" shape="icon" /></Inline>;
}
