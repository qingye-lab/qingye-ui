const n=`import { Button } from "@qingye/ui/components/button";
import { Group, GroupSeparator, GroupText } from "@qingye/ui/components/group";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { CopyIcon } from "lucide-react";

export const meta = { title: "前后缀与输入", description: "GroupText 作前缀，并渲染为 Label 关联输入框。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Group aria-label="站点地址" className="w-full">
        <GroupText render={<Label htmlFor="site-domain" />}>https://</GroupText>
        <GroupSeparator />
        <Input defaultValue="qingyan.tech" id="site-domain" />
      </Group>
      <Group aria-label="邀请链接" className="w-full">
        <Input aria-label="邀请链接" defaultValue="qingyan.tech/join/8KQ2" readOnly />
        <GroupSeparator />
        <Button aria-label="复制链接" size="icon" variant="outline">
          <CopyIcon />
        </Button>
      </Group>
      <Group aria-label="预算" className="w-full">
        <Input aria-label="月度预算" defaultValue="2000" inputMode="decimal" />
        <GroupSeparator />
        <GroupText>元 / 月</GroupText>
      </Group>
    </div>
  );
}
`;export{n as default};
