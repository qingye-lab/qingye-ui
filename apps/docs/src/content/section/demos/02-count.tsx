import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemContent, ItemTitle } from "@qingye_lab/ui/components/item";
import { Section, SectionActions, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "标题里的计数与小号按钮", titleEn: "A count in the title and a small button" } satisfies DemoMeta;

const members = ["林岚", "周青", "沈野"];

export default function Demo() {
  return <Section className="w-full max-w-lg">
    <SectionHeader>
      <SectionTitle>成员 <span className="numeric text-muted-foreground">{members.length}</span></SectionTitle>
      <SectionActions><Button variant="quiet" size="sm">邀请成员</Button></SectionActions>
    </SectionHeader>
    <ul className="m-0 list-none p-0">
      {members.map(name => <Item render={<li />} key={name}><ItemContent><ItemTitle>{name}</ItemTitle></ItemContent></Item>)}
    </ul>
  </Section>;
}
