import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { FileUpload } from "@qingye_lab/ui/components/file-upload";

export const meta = { title: "自定义规则与粘贴", titleEn: "Custom rule and paste" };

export default function Demo() {
  const [files, setFiles] = useState<readonly File[]>([]);
  return <Field name="photos" className="w-full max-w-md"><FieldLabel>现场照片</FieldLabel>
    <FileUpload value={files} onValueChange={setFiles} accept="image/*" validate={file => /^IMG_\d+/.test(file.name) ? "请先改成有意义的文件名" : undefined} />
    <FieldDescription>图片；也可以在这里粘贴截图。</FieldDescription>
  </Field>;
}
