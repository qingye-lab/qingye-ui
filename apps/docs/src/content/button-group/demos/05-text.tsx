import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@qingye_lab/ui/components/button-group";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "文字段与分隔", titleEn: "Text segment and separator" } satisfies DemoMeta;
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-section-gap)">
    <ButtonGroup aria-label="分页" attached><Button variant="bordered">上一页</Button><ButtonGroupText>3 / 12</ButtonGroupText><Button variant="bordered">下一页</Button></ButtonGroup>
    <ButtonGroup aria-label="文本样式"><Button variant="quiet">加粗</Button><ButtonGroupSeparator /><Button variant="quiet">斜体</Button><ButtonGroupSeparator /><Button variant="quiet">下划线</Button></ButtonGroup>
  </div>;
}
