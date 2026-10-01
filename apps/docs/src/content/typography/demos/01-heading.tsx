import { Heading } from "@yanqing/ui/components/typography";

export const meta = { title: "标题", description: "level 决定语义层级，size 决定字号，二者可以独立设置。" };

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Heading level={1}>门店运营概览</Heading>
      <Heading level={2}>本周订单与营收</Heading>
      <Heading level={3}>徐汇漕溪北路店</Heading>
      <Heading level={4} size="label">
        设备与人员
      </Heading>
      <Heading level={2} size="heading" className="text-muted-foreground">
        level 2 · size heading
      </Heading>
    </div>
  );
}
