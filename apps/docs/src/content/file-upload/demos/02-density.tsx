import { useState } from "react";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { FileUpload } from "@qingye/ui/components/file-upload";

export const meta = { title: "密度与只读", titleEn: "Density and read-only" };

export default function Demo() {
  const [stored] = useState(() => new File(["A"], "现场照片.jpg", { type: "image/jpeg" }));
  return (
    <div className="grid w-full grid-cols-3 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <FileUpload />
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读文件</FieldLabel><FileUpload defaultValue={[stored]} readOnly /></Field>
    </div>
  );
}
