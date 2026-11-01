import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Section, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "区块里的小节", titleEn: "Subsections inside a section" } satisfies DemoMeta;

const groups = [
  { title: "网络", rows: [["地址", "10.2.14.31"], ["网关", "10.2.14.1"]] },
  { title: "固件", rows: [["版本", "4.8.2"], ["更新于", "2026-10-28"]] },
];

export default function Demo() {
  return <Section className="w-full max-w-lg">
    <SectionHeader><SectionTitle>设备信息</SectionTitle></SectionHeader>
    <Stack gap="panel">
      {groups.map(group => <Section key={group.title}>
        <SectionHeader><SectionTitle level={3} step="body-strong">{group.title}</SectionTitle></SectionHeader>
        <DescriptionList>
          {group.rows.map(([term, value]) => <DescriptionListItem key={term}><DescriptionListTerm>{term}</DescriptionListTerm><DescriptionListDetail>{value}</DescriptionListDetail></DescriptionListItem>)}
        </DescriptionList>
      </Section>)}
    </Stack>
  </Section>;
}
