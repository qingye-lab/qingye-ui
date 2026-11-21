import { Button } from "@qingye_lab/ui/components/button";

export type PublishBarProps = {
  blockedReason: string | null;
  onPublish: () => void;
};

// 错解：有阻止原因时隐藏按钮，只显示原因
export function PublishBar({ blockedReason, onPublish }: PublishBarProps) {
  if (blockedReason !== null) return <p>{blockedReason}</p>;
  return <Button onClick={onPublish}>发布</Button>;
}
