import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye_lab/ui/components/hover-card";

export type AssigneeProps = {
  person: { name: string; email: string; profileUrl: string; deactivated: boolean };
};

// 错解：“已停用”只放在链接的 title 属性
export function Assignee({ person }: AssigneeProps) {
  return (
    <HoverCard>
      <HoverCardTrigger href={person.profileUrl} title={person.deactivated ? "已停用" : undefined}>{person.name}</HoverCardTrigger>
      <HoverCardPopup>
        <p>{person.email}</p>
      </HoverCardPopup>
    </HoverCard>
  );
}
