import { Button } from "@yanqing/ui/components/button";
import { ButtonGroup } from "@yanqing/ui";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const meta = { title: "基础用法", description: "相邻按钮合并边框与圆角。" };

export default function Demo() {
  return (
    <>
      <ButtonGroup aria-label="翻页">
        <Button variant="outline">
          <ChevronLeftIcon />
          上一篇
        </Button>
        <Button variant="outline">
          下一篇
          <ChevronRightIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="对齐方式">
        <Button aria-label="左对齐" size="icon" variant="outline">
          <AlignLeftIcon />
        </Button>
        <Button aria-label="居中" size="icon" variant="outline">
          <AlignCenterIcon />
        </Button>
        <Button aria-label="右对齐" size="icon" variant="outline">
          <AlignRightIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="时间范围">
        <Button size="sm" variant="outline">
          今天
        </Button>
        <Button size="sm" variant="outline">
          本周
        </Button>
        <Button size="sm" variant="outline">
          本月
        </Button>
      </ButtonGroup>
    </>
  );
}
