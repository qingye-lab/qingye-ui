const _02Sizes = 'import { Textarea } from "@yanqing/ui";\n\nexport const meta = { title: "尺寸" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-sm flex-col gap-3">\n      <Textarea aria-label="小" placeholder="小 sm" size="sm" />\n      <Textarea aria-label="默认" placeholder="默认 default" />\n      <Textarea aria-label="大" placeholder="大 lg" size="lg" />\n    </div>\n  );\n}\n';
export {
  _02Sizes as default
};
