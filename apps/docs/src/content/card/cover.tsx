import { Card } from "@qingye_lab/ui/components/card";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export default function Cover() {
  return <Card className="w-full">
    <Stack gap="field" className="p-(--qy-panel-padding)"><Heading level={3}>便签</Heading><Text>青野 · Qingye</Text></Stack>
  </Card>;
}
