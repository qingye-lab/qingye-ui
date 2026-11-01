import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "连体", titleEn: "Attached" } satisfies DemoMeta;
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-section-gap)">
    <ButtonGroup aria-label="视图" attached><Button variant="bordered">列表</Button><Button variant="bordered">网格</Button><Button variant="bordered">时间线</Button></ButtonGroup>
    <ButtonGroup aria-label="排序" attached orientation="vertical" align="start"><Button variant="bordered">按名称</Button><Button variant="bordered">按时间</Button><Button variant="bordered">按大小</Button></ButtonGroup>
  </div>;
}
