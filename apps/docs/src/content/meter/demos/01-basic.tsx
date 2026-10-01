import { Meter } from "@yanqing/ui";

export const meta = { title: "基础", description: "不传子元素时自动渲染轨道与指示条；没有可见标签时提供 aria-label。" };

export default function Demo() {
  return <Meter aria-label="存储用量" className="max-w-sm" value={64} />;
}
