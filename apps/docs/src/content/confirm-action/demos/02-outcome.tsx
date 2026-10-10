import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";

export const meta = { title: "请求中", titleEn: "Requesting" };

const snapshot = { objectId: "A", objectLabel: "A", version: 1, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };

// 请求发出后两枚按钮都表示忙碌并挡住再次请求；控件不以超时或动画宣布结果。
export default function Demo() {
  return <ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" loading onConfirm={() => {}} />;
}
