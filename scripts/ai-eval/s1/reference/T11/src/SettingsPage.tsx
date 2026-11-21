import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Link } from "@qingye_lab/ui/components/link";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderTitle } from "@qingye_lab/ui/components/page-header";
import { Section, SectionActions, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import { Separator } from "@qingye_lab/ui/components/separator";

export type SettingsPageProps = {
  name: string;
  email: string;
  onSignOut: () => void;
};

// 指南 section.md：区块靠间距分组、不画框；页面名称与页面级动作用 PageHeader
export function SettingsPage({ name, email, onSignOut }: SettingsPageProps) {
  return (
    <Stack gap="section">
      <PageHeader>
        <PageHeaderContent><PageHeaderTitle>账户设置</PageHeaderTitle></PageHeaderContent>
        <PageHeaderActions><Button variant="bordered" onClick={onSignOut}>退出登录</Button></PageHeaderActions>
      </PageHeader>
      <Section>
        <SectionHeader>
          <SectionTitle>个人资料</SectionTitle>
          <SectionActions><Link href="/settings/profile">编辑</Link></SectionActions>
        </SectionHeader>
        <p>{name}</p>
        <p>{email}</p>
      </Section>
      <Separator />
      <Section>
        <SectionHeader><SectionTitle>通知</SectionTitle></SectionHeader>
        <p>每周一发送摘要邮件</p>
      </Section>
    </Stack>
  );
}
