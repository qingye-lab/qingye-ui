import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";

const snapshot = { objectId: "A", objectLabel: "A", version: 1, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };

export default function Cover() {
  return <ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" onConfirm={() => {}} />;
}
