import { Button } from "@yanqing/ui";
import { PlusIcon } from "lucide-react";

export const meta = {
  title: "仅图标",
  description: "icon-* 尺寸为正方形，与同级文字按钮等高。仅图标的按钮必须提供 aria-label。",
};

export default function Demo() {
  return (
    <>
      <Button aria-label="新建" size="icon-xs" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="新建" size="icon-sm" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="新建" size="icon" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="新建" size="icon-lg" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="新建" size="icon-xl" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
    </>
  );
}
