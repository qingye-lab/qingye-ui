import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";

export type PublishBarProps = {
  blockedReason: string | null;
  onPublish: () => void;
};

// DN 自然解：把禁用原因放进悬停提示
export function PublishBar({ blockedReason, onPublish }: PublishBarProps) {
  if (blockedReason === null) return <Button onClick={onPublish}>发布</Button>;
  return (
    <Tooltip>
      <TooltipTrigger render={<Button disabled onClick={onPublish} />}>发布</TooltipTrigger>
      <TooltipPopup>{blockedReason}</TooltipPopup>
    </Tooltip>
  );
}
