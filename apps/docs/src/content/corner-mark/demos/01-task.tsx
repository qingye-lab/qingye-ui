import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { CornerMark } from "@qingye/ui/components/corner-mark";
import { Inline } from "@qingye/ui/components/layout";
import { BellIcon } from "lucide-react";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "未读数与在线点", titleEn: "Unread count and an online dot" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="panel">
    <CornerMark count={3} label="3 条未读"><span className="inline-flex size-(--qy-fill-height) items-center justify-center rounded-item bg-surface-inset text-foreground"><BellIcon aria-hidden="true" /></span></CornerMark>
    <CornerMark count={142} max={99} label="142 条未读"><span className="inline-flex size-(--qy-fill-height) items-center justify-center rounded-item bg-surface-inset text-foreground"><BellIcon aria-hidden="true" /></span></CornerMark>
    <CornerMark dot tone="success" label="在线"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></CornerMark>
  </Inline>;
}
