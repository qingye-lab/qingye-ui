const _04States = 'import { Field, FieldError, FieldLabel, Textarea } from "@yanqing/ui";\n\nexport const meta = { title: "状态", description: "无效、只读与禁用。" };\n\nexport default function Demo() {\n  return (\n    <div className="grid w-full max-w-sm gap-5">\n      <Field invalid>\n        <FieldLabel>退款原因</FieldLabel>\n        <Textarea defaultValue="不想要了" />\n        <FieldError>请至少填写 10 个字，便于客服核实。</FieldError>\n      </Field>\n      <Field>\n        <FieldLabel>审核意见</FieldLabel>\n        <Textarea defaultValue="资料齐全，同意开通企业账户。—— 王敏，9 月 28 日" readOnly />\n      </Field>\n      <Field disabled>\n        <FieldLabel>内部备注</FieldLabel>\n        <Textarea placeholder="仅管理员可编辑" />\n      </Field>\n    </div>\n  );\n}\n';
export {
  _04States as default
};
