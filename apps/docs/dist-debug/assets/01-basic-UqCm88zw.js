const e=`import { Progress } from "@qingye/ui/components/progress";

export const meta = { title: "基础", description: "不传子元素时自动渲染轨道与指示条；没有可见标签时提供 aria-label。" };

export default function Demo() {
  return <Progress aria-label="同步进度" className="max-w-sm" value={40} />;
}
`;export{e as default};
