import { Toc } from "@qingye_lab/ui/components/toc";

const items = [
  { id: "install", level: 2 as const, label: "安装" },
  { id: "styles", level: 3 as const, label: "引入样式" },
  { id: "density", level: 2 as const, label: "密度" },
];

export default function Cover() {
  return <Toc items={items} current="styles" className="w-full" />;
}
