import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";
import { Stack } from "@qingye/ui/components/layout";

export const meta = { title: "提交值", titleEn: "Submitted value" };
export default function Demo() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  return <Form className="w-full max-w-sm" onSubmit={event => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get("value") ?? "")); }}><Stack gap="fields"><Field name="value"><FieldLabel>值</FieldLabel><Input /></Field><Button type="submit">提交</Button>{submitted !== null && <output aria-label="提交值" className="text-body wrap-break-word">{submitted || "空值"}</output>}</Stack></Form>;
}
