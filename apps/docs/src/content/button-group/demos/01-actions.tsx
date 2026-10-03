import { Button } from "@qingye/ui/components/button";
import { ButtonGroup } from "@qingye/ui/components/button-group";

export const meta = { title: "动作范围", titleEn: "Action scope" };
export default function Demo() {
  return <ButtonGroup aria-label="编辑"><Button>应用</Button><Button variant="bordered">重置</Button><Button variant="quiet" disabled>撤销</Button></ButtonGroup>;
}
