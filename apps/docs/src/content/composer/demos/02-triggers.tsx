import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, type ComposerItem, type ComposerTrigger } from "@qingye_lab/ui/components/composer";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "提及与命令", titleEn: "Mentions and commands" } satisfies DemoMeta;

const people: ComposerItem[] = [
  { id: "u1", label: "林青", group: "成员", description: "设计" },
  { id: "u2", label: "苏野", group: "成员", description: "前端" },
  { id: "t1", label: "设计组", group: "团队" },
];

const mention: ComposerTrigger = {
  char: "@",
  getItems: (query) => people.filter((item) => item.label.includes(query)),
};

const commands: ComposerItem[] = [
  { id: "clear", label: "清空", description: "/clear" },
  { id: "topic", label: "话题", description: "/topic", select: "token" },
];

const command: ComposerTrigger = {
  char: "/",
  startOnly: true,
  select: "action",
  getItems: (query) => commands.filter((item) => item.label.includes(query) || item.description?.includes(query)),
};

export default function Demo() {
  return <Composer className="w-full">
    <ComposerInput aria-label="消息" placeholder="@ 提及，/ 命令" triggers={[mention, command]} />
    <ComposerToolbar><ComposerSubmit /></ComposerToolbar>
  </Composer>;
}
