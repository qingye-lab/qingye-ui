const _01Basic = 'import { Progress } from "@yanqing/ui";\n\nexport const meta = { title: "基础", description: "不传子元素时自动渲染轨道与指示条；没有可见标签时提供 aria-label。" };\n\nexport default function Demo() {\n  return <Progress aria-label="同步进度" className="max-w-sm" value={40} />;\n}\n';
export {
  _01Basic as default
};
