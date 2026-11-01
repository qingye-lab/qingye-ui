import { Link } from "@qingye_lab/ui/components/link";
import { Stack } from "@qingye_lab/ui/components/layout";
import { SkipLink } from "@qingye_lab/ui/components/skip-link";
import { Text } from "@qingye_lab/ui/components/typography";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "越过导航", titleEn: "Bypass the navigation" } satisfies DemoMeta;

// 真实页面里它固定在视口一角，只在获得焦点时现身；这里为了在样例中可见，改为静态并常显。
// 目标 <main> 本身不可聚焦，点击后组件会补 tabindex="-1" 并把焦点移过去。
export default function Demo() {
  return <Stack gap="panel">
    <SkipLink href="#skip-demo-main" className="static opacity-100 pointer-events-auto self-start">跳到正文</SkipLink>
    <nav aria-label="示例导航"><Stack gap="pair"><Link href="#a">首页</Link><Link href="#b">文档</Link><Link href="#c">更新记录</Link></Stack></nav>
    <main id="skip-demo-main" className="outline-none focus-visible:ring-2"><Text>正文从这里开始。</Text></main>
  </Stack>;
}
