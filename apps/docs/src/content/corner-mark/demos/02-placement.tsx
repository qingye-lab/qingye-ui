import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { CornerMark } from "@qingye_lab/ui/components/corner-mark";
import { Inline } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "头像右下角的在线点", titleEn: "An online dot at an avatar's bottom end" } satisfies DemoMeta;

// 头像是圆，所以 hostShape="circle"：在线点落在圆周 45° 处，而不是悬在方框的角外。
export default function Demo() {
  return <Inline gap="panel">
    <CornerMark dot tone="success" placement="bottom-end" hostShape="circle" label="在线"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></CornerMark>
    <CornerMark dot tone="neutral" placement="bottom-end" hostShape="circle" label="离线"><Avatar label="李一鸣"><AvatarFallback>李</AvatarFallback></Avatar></CornerMark>
    <CornerMark count={3} placement="top-start" label="3 条未读"><Avatar label="王一"><AvatarFallback>王</AvatarFallback></Avatar></CornerMark>
  </Inline>;
}
