import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Section, SectionActions, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import { Separator } from "@qingye_lab/ui/components/separator";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "区块之间", titleEn: "Between sections" } satisfies DemoMeta;

export default function Demo() {
  return <Stack gap="section" className="w-full max-w-lg">
    <Section>
      <SectionHeader><SectionTitle>近期活动</SectionTitle></SectionHeader>
      <Item><ItemContent><ItemTitle>春蚕上簇</ItemTitle><ItemDescription>10 月 12 日 08:30</ItemDescription></ItemContent></Item>
    </Section>
    <Separator />
    <Section>
      <SectionHeader><SectionTitle>待办 <span className="numeric text-muted-foreground">2</span></SectionTitle><SectionActions><Button variant="quiet" size="sm">全部完成</Button></SectionActions></SectionHeader>
      <Item><ItemContent><ItemTitle>补录湿度读数</ItemTitle></ItemContent></Item>
      <Item><ItemContent><ItemTitle>核对桑叶入库单</ItemTitle></ItemContent></Item>
    </Section>
  </Stack>;
}
