import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Link } from "@qingye_lab/ui/components/link";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "可点击的头像", titleEn: "A clickable avatar" } satisfies DemoMeta;

// 头像本身不可交互：点击是外层按钮或链接的事。名称来自头像的 label（读作「陈致远」），
// 外层需要说明动作时再给 aria-label（此时它取代头像的名称）。
export default function Demo() {
  return <Inline gap="panel">
    <Button variant="quiet" shape="icon"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></Button>
    <Button variant="quiet" shape="icon" aria-label="打开李一鸣的资料"><Avatar label="李一鸣"><AvatarFallback>李</AvatarFallback></Avatar></Button>
    <Link href="#profile" className="inline-flex rounded-full"><Avatar label="王一"><AvatarFallback>王</AvatarFallback></Avatar></Link>
  </Inline>;
}
