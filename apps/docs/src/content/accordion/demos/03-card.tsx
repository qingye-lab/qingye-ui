import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@yanqing/ui/components/accordion";
import { BellIcon, LockIcon, PaletteIcon } from "lucide-react";

export const meta = { title: "放在卡片中", description: "加上边框与内边距，作为设置页的分组。" };

const sections = [
  { value: "appearance", icon: PaletteIcon, title: "外观", text: "主题、字号与界面密度。" },
  { value: "notify", icon: BellIcon, title: "通知", text: "提及、指派与评论提醒的接收方式。" },
  { value: "security", icon: LockIcon, title: "安全", text: "两步验证、登录设备与访问令牌。" },
];

export default function Demo() {
  return (
    <Accordion className="w-full max-w-md rounded-xl border bg-card px-4">
      {sections.map((s) => (
        <AccordionItem key={s.value} value={s.value}>
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <s.icon aria-hidden="true" className="size-4 text-muted-foreground" />
              {s.title}
            </span>
          </AccordionTrigger>
          <AccordionPanel className="ps-6.5">{s.text}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
