import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";

export type PublishBarProps = {
  blockedReason: string | null;
  onPublish: () => void;
};

// 禁用原因留在可见内容里（指南 tooltip.md：关键后果、禁用原因与失败后的恢复说明留在可见内容中）
export function PublishBar({ blockedReason, onPublish }: PublishBarProps) {
  const blocked = blockedReason !== null;
  return (
    <Inline gap="panel" align="center">
      <Button disabled={blocked} aria-describedby={blocked ? "publish-blocked-reason" : undefined} onClick={onPublish}>发布</Button>
      {blocked && <p id="publish-blocked-reason" className="text-muted-foreground">{blockedReason}</p>}
    </Inline>
  );
}
