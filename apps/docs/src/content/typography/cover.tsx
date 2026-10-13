import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export default function Cover() {
  return <Stack gap="field" className="w-full" lang="zh-CN">
    <Heading level={4} step="title">标题 Title</Heading>
    <Text>文字与标点。</Text>
  </Stack>;
}
