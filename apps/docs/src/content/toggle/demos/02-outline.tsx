import { Toggle } from "@qingye/ui/components/toggle";
import { Grid3X3Icon, PinIcon } from "lucide-react";

export const meta = { title: "描边", description: "放在工具栏或卡片上，需要与背景区分时使用。" };

export default function Demo() {
  return (
    <>
      <Toggle defaultPressed variant="outline">
        <Grid3X3Icon />
        显示网格
      </Toggle>
      <Toggle variant="outline">
        <PinIcon />
        固定到顶部
      </Toggle>
    </>
  );
}
