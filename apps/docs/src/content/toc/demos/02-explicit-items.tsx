import { Toc } from "@qingye_lab/ui/components/toc";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "手写目录与两级层级", titleEn: "A hand-written list with two levels" } satisfies DemoMeta;
export default function Demo() {
  return <Toc
    aria-label="《接入》目录"
    items={[
      { id: "install", label: "安装", level: 2 },
      { id: "styles", label: "引入样式", level: 3 },
      { id: "density", label: "密度", level: 2 },
    ]}
    current="styles"
    className="w-48"
  />;
}
