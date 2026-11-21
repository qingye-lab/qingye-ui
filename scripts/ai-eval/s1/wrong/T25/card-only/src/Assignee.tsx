import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye_lab/ui/components/hover-card";

export type AssigneeProps = {
  person: { name: string; email: string; profileUrl: string; deactivated: boolean };
};

// 错解：“已停用”只放在预览卡片内
export function Assignee({ person }: AssigneeProps) {
  return (
    <HoverCard>
      <HoverCardTrigger href={person.profileUrl}>{person.name}</HoverCardTrigger>
      <HoverCardPopup>
        <p>{person.email}</p>
        {person.deactivated && <p>已停用</p>}
      </HoverCardPopup>
    </HoverCard>
  );
}
