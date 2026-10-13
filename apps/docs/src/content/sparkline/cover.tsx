import { Inline } from "@qingye_lab/ui/components/layout";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";

export default function Cover() {
  return <Inline gap="field" wrap={false} className="text-body">
    <Sparkline label="近 12 周同步次数" values={[38, 41, 39, 45, 52, 48, 50, 57, 55, 61, 58, 64]} />
    <span className="numeric">64</span>
  </Inline>;
}
