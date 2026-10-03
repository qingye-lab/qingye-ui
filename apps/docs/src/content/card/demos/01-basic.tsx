import { Card } from "@qingye/ui/components/card";
import { Stack } from "@qingye/ui/components/layout";
import { Heading, Text } from "@qingye/ui/components/typography";

export const meta = { title: "内容", titleEn: "Content" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm" render={<article aria-labelledby="card-note-title" />}>
      <Stack gap="panel" className="p-(--qy-panel-padding)">
        <Heading id="card-note-title" level={3}>便签</Heading>
        <Text>青野 · Qingye</Text>
      </Stack>
    </Card>
  );
}
