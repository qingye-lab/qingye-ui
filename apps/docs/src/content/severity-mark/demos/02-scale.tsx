import { Inline } from "@qingye_lab/ui/components/layout";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "五级，不声明类别", titleEn: "Five levels without a tone" } satisfies DemoMeta;

const names = ["一级", "二级", "三级", "四级", "五级"];

export default function Demo() {
  return <Inline gap="panel">{names.map((name, index) => <SeverityMark key={name} level={index + 1} max={5} label={name} />)}</Inline>;
}
