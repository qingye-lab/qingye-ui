import { useState } from "react";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { FileUpload } from "@qingye/ui/components/file-upload";
export const meta = { title: "五档与只读", titleEn: "Five sizes and read-only" };
export default function Demo() {
  const [local] = useState(() => new File(["A"], "A.txt", { type: "text/plain" }));
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Field key={size}><FieldLabel>{size}</FieldLabel><FileUpload size={size} /></Field>)}<Field><FieldLabel>只读文件</FieldLabel><FileUpload defaultValue={[local]} readOnly /></Field></div>;
}
