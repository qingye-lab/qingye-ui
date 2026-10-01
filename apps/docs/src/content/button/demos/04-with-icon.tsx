import { Button } from "@yanqing/ui/components/button";
import { ArrowRightIcon, ChevronDownIcon, DownloadIcon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "带图标",
  description: "图标放在文字前表示动作类型，放在文字后表示去向或展开。图标会自动调整尺寸与透明度。",
};

export default function Demo() {
  return (
    <>
      <Button variant="outline">
        <DownloadIcon aria-hidden="true" />
        导出报表
      </Button>
      <Button>
        下一步
        <ArrowRightIcon aria-hidden="true" />
      </Button>
      <Button variant="ghost">
        全部状态
        <ChevronDownIcon aria-hidden="true" />
      </Button>
      <Button variant="destructive-outline">
        <Trash2Icon aria-hidden="true" />
        移入回收站
      </Button>
    </>
  );
}
