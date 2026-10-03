import { Button } from "@qingye/ui/components/button";
import { ArrowRightIcon, ChevronDownIcon, DownloadIcon } from "lucide-react";

export const meta = { title: "动作与图标", titleEn: "Actions and icons" };

export default function Demo() {
  return <>
    <Button variant="quiet"><DownloadIcon aria-hidden="true" />导出十月报表</Button>
    <Button>查看核对结果<ArrowRightIcon aria-hidden="true" /></Button>
    <Button variant="quiet">设备操作<ChevronDownIcon aria-hidden="true" /></Button>
  </>;
}
