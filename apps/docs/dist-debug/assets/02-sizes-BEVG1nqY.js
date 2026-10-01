const _02Sizes = 'import { Input } from "@yanqing/ui";\n\nexport const meta = { title: "尺寸", description: "sm 用于筛选栏与表格内，lg 用于登录等突出表单。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-xs flex-col gap-3">\n      <Input aria-label="小" placeholder="小 sm" size="sm" />\n      <Input aria-label="默认" placeholder="默认 default" />\n      <Input aria-label="大" placeholder="大 lg" size="lg" />\n    </div>\n  );\n}\n';
export {
  _02Sizes as default
};
