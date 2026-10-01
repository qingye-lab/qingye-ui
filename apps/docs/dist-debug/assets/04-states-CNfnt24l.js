const _04States = 'import { Field, FieldLabel, TagInput } from "@yanqing/ui";\n\nexport const meta = { title: "只读与禁用" };\n\nexport default function Demo() {\n  return (\n    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">\n      <Field>\n        <FieldLabel>项目标签（只读）</FieldLabel>\n        <TagInput defaultValue={["已归档", "2025 Q4", "品牌升级"]} readOnly />\n      </Field>\n      <Field disabled>\n        <FieldLabel>技能（禁用）</FieldLabel>\n        <TagInput defaultValue={["Figma", "原型设计"]} disabled />\n      </Field>\n    </div>\n  );\n}\n';
export {
  _04States as default
};
