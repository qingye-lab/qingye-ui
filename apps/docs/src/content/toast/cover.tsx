import { Button } from "@qingye_lab/ui/components/button";
import { toastManager } from "@qingye_lab/ui/components/toast";

export default function Cover() {
  return <Button variant="bordered" onClick={() => toastManager.add({ type: "success", title: "成功", timeout: 5000 })}>成功</Button>;
}
