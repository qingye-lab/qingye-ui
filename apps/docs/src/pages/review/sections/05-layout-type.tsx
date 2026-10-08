import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export default function LayoutTypeReview() {
  return (
    <Stack id="layout-type-review" gap="section" className="border-t border-border py-(--qy-section-gap)" lang="zh-CN" render={<section aria-labelledby="layout-type-heading" />}>
      <Heading id="layout-type-heading" level={2}>Layout · Typography</Heading>
      <div className="grid grid-cols-2 items-start gap-(--qy-section-gap)">
        <Stack gap="panel" data-testid="panel-gap">
          <Heading level={3}>Stack</Heading>
          <Stack gap="field" data-testid="field-gap"><Text>第一行</Text><Text>第二行</Text></Stack>
          <Heading level={3}>Inline</Heading>
          <Inline gap="actions" data-testid="action-gap"><Button>保存</Button><Button variant="bordered">取消</Button></Inline>
        </Stack>
        <Stack gap="panel" data-density="compact" data-testid="compact-gap">
          <Heading level={3}>compact</Heading>
          <Stack gap="field"><Text>第一行</Text><Text>第二行</Text></Stack>
          <Inline gap="actions"><Button>保存</Button><Button variant="bordered">取消</Button></Inline>
        </Stack>
      </div>
      <div className="grid grid-cols-2 gap-(--qy-panel-gap)">
        <Stack gap="field"><Heading level={3} step="display">display</Heading><Heading level={3} step="title">title</Heading><Heading level={3} step="heading">heading</Heading></Stack>
        <Stack gap="field"><Text step="reading">中文标点：「青野」，Qingye UI。</Text><Text step="body">body</Text><Text step="support">support</Text><Text step="caption">caption</Text><Text step="metric" numeric data-testid="metric">0</Text></Stack>
      </div>
    </Stack>
  );
}
