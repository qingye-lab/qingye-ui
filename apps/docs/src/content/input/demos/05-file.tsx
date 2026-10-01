import { Field, FieldDescription, FieldLabel } from "@yanqing/ui/components/field";
import { Input } from "@yanqing/ui/components/input";

export const meta = { title: "文件", description: "需要拖拽、预览或多文件管理时用 FileUpload。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>营业执照</FieldLabel>
      <Input accept="image/*,.pdf" type="file" />
      <FieldDescription>支持 JPG、PNG、PDF，不超过 10 MB。</FieldDescription>
    </Field>
  );
}
