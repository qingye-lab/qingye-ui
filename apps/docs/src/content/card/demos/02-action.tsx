import { Card } from "@qingye/ui/components/card";
import { Stack } from "@qingye/ui/components/layout";
import { Heading, Text } from "@qingye/ui/components/typography";

export const meta = { title: "整卡链接", titleEn: "Linked card" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm" render={<a href="/docs/card" />}>
      <Stack gap="panel" className="p-(--qy-panel-padding)">
        <Heading level={3}>Card</Heading>
        <Text>组件文档</Text>
      </Stack>
    </Card>
  );
}
