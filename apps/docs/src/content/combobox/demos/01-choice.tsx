import { useState } from "react";
import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "确认候选", titleEn: "Confirm a candidate" };
const members = ["陈致远", "李一鸣", "王一帆", "赵子纯"];
export default function Demo() {
  const [value, setValue] = useState<string | null>("陈致远");
  return <form className="max-w-xs"><Field name="owner"><FieldLabel>负责人</FieldLabel>
    <ComboboxSelect items={members} itemToStringLabel={member => member} value={value} onValueChange={setValue} emptyContent="没有匹配的成员" />
  </Field></form>;
}
