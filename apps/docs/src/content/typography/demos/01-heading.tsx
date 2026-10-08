import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "标题与正文", titleEn: "Headings and body text" };
export default function Demo() {
  return <Stack gap="section" className="w-full max-w-xl" lang="zh-CN">
    <Heading level={3} step="display">青野 Qingye UI</Heading>
    <Heading level={4} step="title">标题 Title</Heading>
    <Heading level={5} step="chapter">章节 Chapter</Heading>
    <Stack gap="field"><Heading level={6} step="heading">小标题 Heading</Heading><Text step="reading">青野 Qingye UI，文字与标点。</Text><Text>第一行文字。第二行文字。</Text></Stack>
  </Stack>;
}
