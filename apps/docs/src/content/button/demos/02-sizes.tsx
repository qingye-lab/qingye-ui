import { Button } from "@yanqing/ui";
import { PlusIcon } from "lucide-react";

export const meta = { title: "尺寸", description: "移动端自动加高 4px，桌面端回到标准尺寸。" };

export default function Demo() {
  return (
    <>
      <Button size="xs">超小</Button>
      <Button size="sm">小</Button>
      <Button>默认</Button>
      <Button size="lg">大</Button>
      <Button size="xl">超大</Button>
      <Button size="icon" variant="outline" aria-label="新建">
        <PlusIcon />
      </Button>
    </>
  );
}
