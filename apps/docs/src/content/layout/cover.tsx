import { Badge } from "@qingye_lab/ui/components/badge";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";

export default function Cover() {
  return <Stack gap="fields">
    <Inline><Badge>草稿</Badge><Badge>已完成</Badge></Inline>
    <Inline><Button>保存</Button><Button variant="bordered">取消</Button></Inline>
  </Stack>;
}
