import { Button } from "@qingye_lab/ui/components/button";
import { ConfirmProvider, useConfirm } from "@qingye_lab/ui/components/confirm";

function Entry() {
  const confirm = useConfirm();
  return <Button variant="bordered" onClick={async () => { await confirm({ title: "离开草稿？", description: "草稿内容会保留，返回后可以继续编辑。", confirmLabel: "离开", cancelLabel: "继续编辑" }); }}>离开草稿</Button>;
}

export default function Cover() { return <ConfirmProvider><Entry /></ConfirmProvider>; }
