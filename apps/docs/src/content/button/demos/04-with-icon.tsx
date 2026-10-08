import { Button } from "@qingye_lab/ui/components/button";
import { IconArrowRight, IconChevronDown, IconDownload } from "@tabler/icons-react";

export const meta = { title: "动作与图标", titleEn: "Actions and icons" };

export default function Demo() {
  return <>
    <Button variant="quiet"><IconDownload aria-hidden="true" />导出十月报表</Button>
    <Button>查看核对结果<IconArrowRight aria-hidden="true" /></Button>
    <Button variant="quiet">设备操作<IconChevronDown aria-hidden="true" /></Button>
  </>;
}
