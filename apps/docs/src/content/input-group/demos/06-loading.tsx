import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupInput } from "@qingye_lab/ui/components/input-group";
import { useEffect, useState } from "react";

export const meta = { title: "等待", titleEn: "Waiting" };

export default function Demo() {
  const [query, setQuery] = useState("青叶");
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    if (!searching) return;
    const timer = window.setTimeout(() => setSearching(false), 1600);
    return () => window.clearTimeout(timer);
  }, [searching]);
  return (
    <div className="flex w-full max-w-md items-end gap-(--qy-space-3)">
      <Field className="flex-1">
        <FieldLabel>项目</FieldLabel>
        <InputGroup loading={searching}>
          <InputGroupInput value={query} onChange={event => setQuery(event.target.value)} />
        </InputGroup>
      </Field>
      <Button variant="bordered" onClick={() => setSearching(true)} disabled={searching}>查找</Button>
    </div>
  );
}
