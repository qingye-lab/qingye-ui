import { useRef, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Tour } from "@qingye_lab/ui/components/tour";

export const meta = { title: "聚光遮罩", titleEn: "Spotlight" };

export default function Demo() {
  const first = useRef<HTMLButtonElement>(null);
  const second = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Inline gap="actions">
      <Button ref={first} variant="bordered">筛选</Button>
      <Button ref={second} variant="bordered">排序</Button>
      <Button variant="quiet" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour
        spotlight
        open={open}
        onOpenChange={next => setOpen(next)}
        steps={[
          { target: first, title: "筛选", description: "缩小范围。" },
          { target: second, title: "排序", description: "调整先后。" },
        ]}
      />
    </Inline>
  );
}
