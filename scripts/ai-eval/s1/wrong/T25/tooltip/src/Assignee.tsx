import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye_lab/ui/components/hover-card";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";

export type AssigneeProps = {
  person: { name: string; email: string; profileUrl: string; deactivated: boolean };
};

// 错解：另用 Tooltip 承载“已停用”
export function Assignee({ person }: AssigneeProps) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger href={person.profileUrl}>{person.name}</HoverCardTrigger>
        <HoverCardPopup>
          <p>{person.email}</p>
        </HoverCardPopup>
      </HoverCard>
      {person.deactivated && (
        <Tooltip>
          <TooltipTrigger render={<span tabIndex={0} aria-label="状态" />}>!</TooltipTrigger>
          <TooltipPopup>已停用</TooltipPopup>
        </Tooltip>
      )}
    </>
  );
}
