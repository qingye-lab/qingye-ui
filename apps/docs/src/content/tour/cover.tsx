import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";

export default function Cover() {
  return <Inline gap="actions"><Button variant="quiet">跳过</Button><Button variant="bordered">上一步</Button><Button>下一步</Button></Inline>;
}
