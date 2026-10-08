import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { ConfirmAction, type ConfirmActionSnapshot } from "@qingye_lab/ui/components/confirm-action";
export const meta = { title: "当前快照", titleEn: "Current snapshot" };
export default function Demo() {
  const [version, setVersion] = useState(1);
  const [requested, setRequested] = useState<ConfirmActionSnapshot>();
  const snapshot = { objectId: "A", objectLabel: "A", version, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };
  return <Inline><ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" confirmationText="A" confirmationLabel="输入 A" onConfirm={setRequested}>
    <div className="flex flex-wrap items-center gap-(--qy-action-gap)"><Button variant="quiet" onClick={() => setVersion(value => value + 1)}>版本 +1</Button>{requested && <output className="text-support text-muted-foreground">请求：{requested.objectLabel} · {requested.version}</output>}</div>
  </ConfirmAction></Inline>;
}
