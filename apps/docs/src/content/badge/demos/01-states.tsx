import { Badge } from "@qingye/ui/components/badge";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "标记", titleEn: "Markers" };
export default function Demo() {
  return <Inline>{(["xs","sm","md","lg","xl"] as const).map(size => <Badge key={size} size={size}>{size}</Badge>)}<Badge variant="emphasis">重点</Badge></Inline>;
}
