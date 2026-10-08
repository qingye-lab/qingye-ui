import { useState } from "react";
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度", titleEn: "Density" };

function Picker() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <DatePicker value={value} onValueChange={setValue} />;
}

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Picker />
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
