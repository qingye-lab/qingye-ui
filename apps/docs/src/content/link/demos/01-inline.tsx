import { Link } from "@qingye/ui/components/link";
export const meta = { title: "正文中的链接", titleEn: "Links in text" };
export default function Demo() {
  return <p className="max-w-prose text-body text-foreground">同步失败的记录保留在 <Link href="#records">接入记录</Link> 中，修正来源后可以 <Link href="#retry">重新同步</Link>。删除集合前，请先阅读 <Link href="#retention">保留策略</Link>。</p>;
}
