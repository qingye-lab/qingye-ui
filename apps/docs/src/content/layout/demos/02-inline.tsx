import { Button } from "@qingye/ui/components/button";
import { Inline, Stack } from "@qingye/ui/components/layout";
import { Text } from "@qingye/ui/components/typography";

export const meta = { title: "横向排列与对齐", titleEn: "Inline layout and alignment" };

export default function Demo() {
  return (
    <Stack gap="section" className="w-full">
      <Inline gap="actions" align="center"><Button size="sm">保存</Button><Button size="lg" variant="bordered">取消</Button></Inline>
      <Inline gap="panel" align="baseline" wrap={false}><Text step="heading" render={<span />}>青野</Text><Text render={<span />}>Qingye</Text></Inline>
    </Stack>
  );
}
