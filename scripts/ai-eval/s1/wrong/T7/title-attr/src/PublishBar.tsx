import { Button } from "@qingye_lab/ui/components/button";

export type PublishBarProps = {
  blockedReason: string | null;
  onPublish: () => void;
};

// 错解：原因只放在 title 属性
export function PublishBar({ blockedReason, onPublish }: PublishBarProps) {
  return <Button disabled={blockedReason !== null} title={blockedReason ?? undefined} onClick={onPublish}>发布</Button>;
}
