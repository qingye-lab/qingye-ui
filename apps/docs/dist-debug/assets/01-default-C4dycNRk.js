const n=`import { Button } from "@qingye/ui/components/button";
import { Group, GroupSeparator } from "@qingye/ui/components/group";
import { ArchiveIcon, ClockIcon, ReplyIcon } from "lucide-react";

export const meta = { title: "默认", description: "outline 按钮相接，用 GroupSeparator 分隔。" };

export default function Demo() {
  return (
    <Group aria-label="邮件操作">
      <Button variant="outline">
        <ReplyIcon />
        回复
      </Button>
      <GroupSeparator />
      <Button variant="outline">
        <ClockIcon />
        稍后提醒
      </Button>
      <GroupSeparator />
      <Button variant="outline">
        <ArchiveIcon />
        归档
      </Button>
    </Group>
  );
}
`;export{n as default};
