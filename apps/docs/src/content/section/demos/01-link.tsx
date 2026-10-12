import { Item, ItemContent, ItemDescription, ItemLink, ItemTitle } from "@qingye_lab/ui/components/item";
import { Link } from "@qingye_lab/ui/components/link";
import { Section, SectionActions, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "标题与文字链接", titleEn: "Title with a text link" } satisfies DemoMeta;

export default function Demo() {
  return <Section className="w-full max-w-lg">
    <SectionHeader>
      <SectionTitle>最近编辑</SectionTitle>
      <SectionActions><Link href="/components/item">查看全部</Link></SectionActions>
    </SectionHeader>
    <ul className="m-0 list-none p-0">
      <Item render={<li />}><ItemContent><ItemTitle><ItemLink href="/components/table">蚕室温湿度表</ItemLink></ItemTitle><ItemDescription>今天 08:30</ItemDescription></ItemContent></Item>
      <Item render={<li />}><ItemContent><ItemTitle><ItemLink href="/components/chart">产茧量走势</ItemLink></ItemTitle><ItemDescription>昨天 17:12</ItemDescription></ItemContent></Item>
    </ul>
  </Section>;
}
