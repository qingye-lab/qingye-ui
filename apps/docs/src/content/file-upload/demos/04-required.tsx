import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { FileUpload } from "@qingye_lab/ui/components/file-upload";
import { Stack } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "必填", titleEn: "Required" };

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [files, setFiles] = useState<readonly File[]>([]);
  return <form className="w-full max-w-md" onSubmit={event => event.preventDefault()}>
    <Stack gap="fields">
      <Field name="attachment">
        <FieldLabel>{en ? "Attachment" : "附件"}</FieldLabel>
        <FileUpload required value={files} onValueChange={setFiles} />
        <FieldDescription>{en ? "At least one file." : "至少一个文件。"}</FieldDescription>
      </Field>
      <div><Button type="submit">{en ? "Submit" : "提交"}</Button></div>
    </Stack>
  </form>;
}
