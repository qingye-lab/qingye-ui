import { AvatarGroup } from "@qingye_lab/ui/components/avatar-group";
import { Link } from "@qingye_lab/ui/components/link";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "整组作为入口", titleEn: "The group as one entry" } satisfies DemoMeta;

// 整组本身不可点击；要进入成员名单，就把它放进链接（链接里可以放 div，按钮里不行）。名称与焦点归外层链接。
export default function Demo() {
  return <Link href="#members" aria-label="查看 5 位成员" className="inline-flex">
    <AvatarGroup aria-label="成员" max={3} items={[{ label: "陈致远" }, { label: "李一鸣" }, { label: "王一" }, { label: "周宁" }, { label: "赵清" }]} />
  </Link>;
}
