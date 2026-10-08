import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverClose, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { useState } from "react";

export const meta = { title: "多行输入", titleEn: "Multiline input" };

export default function Demo() {
  const [draft, setDraft] = useState("");
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="quiet" />}>编辑备注</PopoverTrigger>
      <PopoverPopup className="w-80">
        <Stack gap="panel">
          <PopoverTitle>编辑备注</PopoverTitle>
          <Field>
            <FieldLabel>备注</FieldLabel>
            <Textarea onChange={(event) => setDraft(event.target.value)} value={draft} />
          </Field>
          <PopoverClose render={<Button variant="quiet" />}>关闭</PopoverClose>
        </Stack>
      </PopoverPopup>
    </Popover>
  );
}
