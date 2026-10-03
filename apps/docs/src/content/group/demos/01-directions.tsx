import { Button } from "@qingye/ui/components/button";
import { Group } from "@qingye/ui/components/group";
import { Stack } from "@qingye/ui/components/layout";

export const meta = { title: "横向与纵向", titleEn: "Horizontal and vertical" };
export default function Demo() {
  return <Stack gap="panel"><Group gap="actions"><Button variant="bordered">一</Button><Button variant="bordered">二</Button></Group><Group orientation="vertical" gap="actions" align="start"><Button variant="bordered">一</Button><Button variant="bordered">二</Button></Group></Stack>;
}
