import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { ConfirmProvider, useConfirm } from "@qingye_lab/ui/components/confirm";

export const meta = { title: "等待决定", titleEn: "Await a decision" };

function Decision() {
  const confirm = useConfirm();
  const [decision, setDecision] = useState<string>();
  return <div className="grid justify-items-start gap-(--qy-field-gap)">
    <Button variant="bordered" onClick={async () => {
      const approved = await confirm({ title: "离开草稿？", description: "尚未提交的内容会留在本页，离开后需要重新打开。", confirmLabel: "离开", cancelLabel: "继续编辑" });
      setDecision(approved ? "决定：离开草稿" : "决定：继续编辑");
    }}>离开草稿</Button>
    {decision && <output className="text-support text-muted-foreground">{decision}</output>}
  </div>;
}

export default function Demo() { return <ConfirmProvider><Decision /></ConfirmProvider>; }
