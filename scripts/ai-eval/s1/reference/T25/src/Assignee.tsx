import { Badge } from "@qingye_lab/ui/components/badge";
import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye_lab/ui/components/hover-card";
import { Inline } from "@qingye_lab/ui/components/layout";

export type AssigneeProps = {
  person: { name: string; email: string; profileUrl: string; deactivated: boolean };
};

// 停用状态（收不到任务通知）放在姓名旁的可见内容里，不只在预览卡片中
export function Assignee({ person }: AssigneeProps) {
  return (
    <Inline gap="fields" align="center">
      <HoverCard>
        <HoverCardTrigger href={person.profileUrl}>{person.name}</HoverCardTrigger>
        <HoverCardPopup>
          <p>{person.email}</p>
          {person.deactivated && <p>账号已停用，不会收到任务通知</p>}
        </HoverCardPopup>
      </HoverCard>
      {person.deactivated && <Badge>已停用</Badge>}
    </Inline>
  );
}
