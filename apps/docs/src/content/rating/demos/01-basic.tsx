import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Rating } from "@qingye_lab/ui/components/rating";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "评分", titleEn: "Score" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const [value, setValue] = useState(3);
  return <Field name="score">
    <FieldLabel>{en ? "Quality" : "质量"}</FieldLabel>
    <Rating value={value} onValueChange={setValue} />
    <output className="text-support text-muted-foreground" aria-live="polite">{value} / 5</output>
  </Field>;
}
