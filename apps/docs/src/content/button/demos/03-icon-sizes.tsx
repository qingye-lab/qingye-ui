import { Button } from "@qingye/ui/components/button";
import { PlusIcon } from "lucide-react";

export const meta = { title: "图标形态", titleEn: "Icon shape" };

export default function Demo() {
  return <>
    {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
      <Button aria-label="新建设备" key={size} shape="icon" size={size} variant="quiet">
        <PlusIcon aria-hidden="true" />
      </Button>
    ))}
  </>;
}
