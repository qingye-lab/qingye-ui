import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";

export default function Cover() {
  return <Inline><Button>保存</Button><Button variant="bordered">取消</Button><Button variant="quiet">编辑</Button></Inline>;
}
