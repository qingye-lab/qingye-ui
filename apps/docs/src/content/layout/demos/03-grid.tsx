import { Grid, Stack } from "@qingye_lab/ui/components/layout";
import { Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "多列与成对间隔", titleEn: "Columns and paired spacing" };

const facts = [["组件", "83"], ["主题轴", "3"], ["窄屏断点", "640px"], ["触屏目标", "44px"], ["版本", "5.0.0"], ["许可", "MIT"]];

export default function Demo() {
  return (
    <Grid minItemWidth="9rem" className="w-full">
      {facts.map(([label, value]) => (
        <Stack key={label} gap="pair">
          <Text render={<span />}>{label}</Text>
          <Text step="heading" render={<span />}>{value}</Text>
        </Stack>
      ))}
    </Grid>
  );
}
