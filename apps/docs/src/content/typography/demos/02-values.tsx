import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "文字档与数字", titleEn: "Text steps and numbers" };
export default function Demo() {
  return <Stack gap="panel" className="w-full max-w-xl" lang="zh-CN">
    <Heading level={3}>文字 Text</Heading>
    <Stack gap="field">
      <Text>正文 Body</Text>
      <Text step="support" className="text-muted-foreground">辅助 Support</Text>
      <Text step="caption">附注 Caption</Text>
      <Text>中文标点：，。；！？ / Qingye UI</Text>
    </Stack>
    <Stack gap="field">
      <Text step="metric" numeric>0123456789</Text>
      <Text numeric>1,234.56</Text>
      <Text render={<span />}>内联文字</Text>
    </Stack>
  </Stack>;
}
