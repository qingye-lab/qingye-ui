import { Button } from "@qingye/ui/components/button";
import { Group, GroupSeparator } from "@qingye/ui/components/group";
import { ChevronLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon } from "lucide-react";

export const meta = { title: "纵向与嵌套", description: "纵向组里分隔线用 horizontal；嵌套的子组之间保留间距。" };

export default function Demo() {
  return (
    <div className="flex items-center gap-8">
      <Group aria-label="地图缩放" orientation="vertical">
        <Button aria-label="放大" size="icon" variant="outline">
          <PlusIcon />
        </Button>
        <GroupSeparator orientation="horizontal" />
        <Button aria-label="缩小" size="icon" variant="outline">
          <MinusIcon />
        </Button>
      </Group>
      <Group aria-label="翻页">
        <Group aria-label="页码">
          <Button className="numeric" variant="outline">1</Button>
          <GroupSeparator />
          <Button className="numeric" variant="outline">2</Button>
          <GroupSeparator />
          <Button className="numeric" variant="outline">3</Button>
        </Group>
        <Group aria-label="前后翻页">
          <Button aria-label="上一页" size="icon" variant="outline">
            <ChevronLeftIcon className="rtl:-scale-x-100" />
          </Button>
          <GroupSeparator />
          <Button aria-label="下一页" size="icon" variant="outline">
            <ChevronRightIcon className="rtl:-scale-x-100" />
          </Button>
        </Group>
      </Group>
    </div>
  );
}
