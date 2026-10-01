const t=`import { Grid, Stack, Text } from "@qingye/ui/components/layout";

export const meta = { title: "Grid", description: "columns={3}：手机一列，640px 起两列，1024px 起三列。" };

const stats = [
  { label: "本月部署", value: "126", note: "较上月 +18" },
  { label: "平均构建时长", value: "48 秒", note: "较上月 −6 秒" },
  { label: "成功率", value: "99.2%", note: "失败 1 次" },
];

export default function Demo() {
  return (
    <Grid className="w-full" columns={3} gap={3}>
      {stats.map((stat) => (
        <Stack className="rounded-xl border p-4" gap={1} key={stat.label}>
          <Text size="caption" tone="muted">
            {stat.label}
          </Text>
          <Text className="numeric font-semibold text-2xl">{stat.value}</Text>
          <Text size="caption" tone="muted">
            {stat.note}
          </Text>
        </Stack>
      ))}
    </Grid>
  );
}
`;export{t as default};
