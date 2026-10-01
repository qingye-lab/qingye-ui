import { CopyButton } from "@yanqing/ui";

export const meta = { title: "样式与尺寸", description: "透传 Button 的 variant 与 size；icon-* 尺寸只显示图标。" };

export default function Demo() {
  return (
    <>
      <CopyButton size="sm" value="SO-20260930-0042" variant="ghost" />
      <CopyButton value="SO-20260930-0042" variant="secondary" />
      <CopyButton size="lg" value="SO-20260930-0042" variant="default" />
      <CopyButton copyLabel="复制订单号" size="icon-sm" value="SO-20260930-0042" variant="ghost" />
      <CopyButton copyLabel="复制订单号" size="icon" value="SO-20260930-0042" />
    </>
  );
}
