const _01Sizes = 'import { ProgressCircle } from "@yanqing/ui";\n\nexport const meta = { title: "尺寸", description: "环的粗细随尺寸增长但增长得更慢，大环依然轻盈。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-wrap items-center justify-center gap-6">\n      <ProgressCircle aria-label="上传进度" size="xs" value={68} />\n      <ProgressCircle aria-label="上传进度" size="sm" value={68} />\n      <ProgressCircle aria-label="上传进度" showValue value={68} />\n      <ProgressCircle aria-label="上传进度" showValue size="lg" value={68} />\n      <ProgressCircle aria-label="上传进度" showValue size="xl" value={68} />\n    </div>\n  );\n}\n';
export {
  _01Sizes as default
};
