import { ConfirmAction } from "@qingye/ui/components/confirm-action";
export const meta = { title: "五档与未知", titleEn: "Five sizes and unknown" };
const snapshot = { objectId: "A", objectLabel: "A", version: 1, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <ConfirmAction key={size} size={size} snapshot={snapshot} title={`${size} · A → B`} triggerLabel={size} actionLabel="请求 A → B" confirmationText="A" confirmationLabel="输入 A" onConfirm={() => {}} />)}<ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" state="unknown" onConfirm={() => {}} /></div>;
}
