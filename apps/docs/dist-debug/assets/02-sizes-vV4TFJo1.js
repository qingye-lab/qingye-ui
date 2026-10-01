const _02Sizes = 'import { TagInput } from "@yanqing/ui";\n\nexport const meta = { title: "尺寸", description: "高度与 Combobox 多选框一致，标签随尺寸缩放。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-md flex-col gap-3">\n      <TagInput aria-label="小尺寸" defaultValue={["前端", "React"]} size="sm" />\n      <TagInput aria-label="默认尺寸" defaultValue={["前端", "React"]} />\n      <TagInput aria-label="大尺寸" defaultValue={["前端", "React"]} size="lg" />\n    </div>\n  );\n}\n';
export {
  _02Sizes as default
};
