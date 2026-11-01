import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "@qingye_lab/ui/components/input-group";
import { IconMail } from "@tabler/icons-react";
import { useState } from "react";

export const meta = { title: "附件的位置", titleEn: "Addon placement" };

export default function Demo() {
  const [note, setNote] = useState("");
  return (
    <div className="grid w-full max-w-md gap-(--qy-field-group-gap)">
      <Field>
        <FieldLabel>邮箱</FieldLabel>
        <InputGroup>
          <InputGroupInput type="email" />
          <InputGroupAddon align="inline-start"><IconMail aria-hidden="true" /></InputGroupAddon>
          <InputGroupAddon align="inline-end"><InputGroupText>@qingye.dev</InputGroupText></InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel>备注</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="block-start"><InputGroupText>给审阅人的话</InputGroupText></InputGroupAddon>
          <InputGroupTextarea rows={3} value={note} maxLength={200} onChange={event => setNote(event.target.value)} />
          <InputGroupAddon align="block-end"><InputGroupText>{note.length} / 200</InputGroupText></InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
