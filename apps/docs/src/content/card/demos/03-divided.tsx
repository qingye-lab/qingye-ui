import { Button } from "@qingye/ui/components/button";
import { Card } from "@qingye/ui/components/card";
import { Inline } from "@qingye/ui/components/layout";
import { Heading, Text } from "@qingye/ui/components/typography";

export const meta = { title: "分节与动作", titleEn: "Sections and actions" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm">
      <header className="border-b p-(--qy-panel-padding)"><Heading level={3}>便签</Heading></header>
      <div className="p-(--qy-panel-padding)"><Text>青野 · Qingye</Text></div>
      <Inline gap="actions" className="border-t p-(--qy-panel-padding)">
        <Button size="sm">编辑</Button><Button size="sm" variant="quiet">关闭</Button>
      </Inline>
    </Card>
  );
}
