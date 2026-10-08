import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";

export const meta = { title: "结果未知", titleEn: "Unknown outcome" };

const snapshot = { objectId: "A", objectLabel: "A", version: 1, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };

// 结果未知阻止默认再次触发，控件不以超时或动画宣布成功。
export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
      <ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" confirmationText="A" confirmationLabel="输入 A" state="unknown" onConfirm={() => {}} />
      <ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="等待中的核对" actionLabel="请求 A → B" state="waiting" onConfirm={() => {}} />
    </div>
  );
}
