import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { InputModalityProvider } from "@qingye_lab/ui/components/input-modality-provider";

export default function Cover() {
  return <InputModalityProvider><Inline><Button>保存</Button><Button variant="bordered">取消</Button></Inline></InputModalityProvider>;
}
