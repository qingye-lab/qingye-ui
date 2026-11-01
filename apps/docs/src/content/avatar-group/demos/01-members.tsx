import { AvatarGroup } from "@qingye_lab/ui/components/avatar-group";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "成员与收起", titleEn: "Members and overflow" } satisfies DemoMeta;

const people = [{ label: "陈致远" }, { label: "李一鸣" }, { label: "王一" }, { label: "周宁" }, { label: "赵清" }, { label: "孙墨" }, { label: "吴桐" }];

export default function Demo() {
  return <Stack gap="panel">
    <AvatarGroup aria-label="全部成员" max={7} items={people} />
    <AvatarGroup aria-label="项目成员" max={4} items={people} />
    <Inline gap="panel">
      {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <AvatarGroup key={size} aria-label={`成员（${size}）`} size={size} max={3} items={people} />)}
    </Inline>
  </Stack>;
}
