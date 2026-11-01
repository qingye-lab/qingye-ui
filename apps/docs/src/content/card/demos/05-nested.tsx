import { Card } from "@qingye_lab/ui/components/card";
import { Grid, Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "嵌套", titleEn: "Nested" };

/*
 * 同心：外圆角 R = 面板圆角（4 分）。内层卡片离外轮廓的等距内缩 d = 3 分，
 * 所以内层圆角 r = R − d = 4 分 − 3 分 = 1 分。两条轮廓的圆心重合，转角处两线之间的距离处处等于 d。
 * 内缩必须小于外圆角：面板内边距（不低于 5 分）大于 R，若用它做内缩，r 为负，内层只能是直角，
 * 同心关系也就无从谈起。因此内层卡片的内缩取 3 分，标题行与说明行再补足到面板内边距，
 * 文字仍与其它 Card 的文字起点对齐。圆角与内缩都由外圆角显式推导，不覆盖 Card 本身的取值。
 */
export default function Demo() {
  return (
    <Card className="w-full max-w-xl">
      <Stack gap="panel" className="p-[calc(3*var(--qy-fen))]">
        <header className="p-[calc(var(--qy-panel-padding)-3*var(--qy-fen))]"><Heading level={3}>本周</Heading></header>
        <Grid columns={3} gap="panel">
          {["已完成", "进行中", "待安排"].map((name, index) => (
            <Card key={name} className="rounded-[calc(var(--qy-radius-panel)-3*var(--qy-fen))]">
              <Stack gap="pair" className="p-(--qy-panel-padding)">
                <Text>{name}</Text>
                <Heading level={3}>{[12, 5, 3][index]}</Heading>
              </Stack>
            </Card>
          ))}
        </Grid>
        <footer className="p-[calc(var(--qy-panel-padding)-3*var(--qy-fen))]"><Text>数据每小时更新一次。</Text></footer>
      </Stack>
    </Card>
  );
}
