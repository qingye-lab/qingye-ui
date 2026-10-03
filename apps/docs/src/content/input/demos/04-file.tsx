import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "文件选择", titleEn: "File selection" };

export default function Demo() {
  return <Field className="w-full max-w-md"><FieldLabel>文件</FieldLabel><Input accept="image/*,.pdf" name="file" type="file" /><FieldDescription>图片或 PDF。</FieldDescription></Field>;
}
