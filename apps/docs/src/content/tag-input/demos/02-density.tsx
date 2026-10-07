import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { TagInput } from "@qingye/ui/components/tag-input";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "密度", titleEn: "Density" } satisfies DemoMeta;

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <TagInput defaultValue={["前端", "设计"]} />
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
