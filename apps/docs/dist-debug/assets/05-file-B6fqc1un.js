const _05File = 'import { Field, FieldDescription, FieldLabel, Input } from "@yanqing/ui";\n\nexport const meta = { title: "文件", description: "需要拖拽、预览或多文件管理时用 FileUpload。" };\n\nexport default function Demo() {\n  return (\n    <Field className="w-full max-w-xs">\n      <FieldLabel>营业执照</FieldLabel>\n      <Input accept="image/*,.pdf" type="file" />\n      <FieldDescription>支持 JPG、PNG、PDF，不超过 10 MB。</FieldDescription>\n    </Field>\n  );\n}\n';
export {
  _05File as default
};
