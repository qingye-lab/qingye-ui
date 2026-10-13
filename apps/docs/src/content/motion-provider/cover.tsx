import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { MotionProvider } from "@qingye_lab/ui/components/motion-provider";

export default function Cover() {
  return <MotionProvider><Inline><Button>保存</Button><Button variant="bordered">取消</Button></Inline></MotionProvider>;
}
