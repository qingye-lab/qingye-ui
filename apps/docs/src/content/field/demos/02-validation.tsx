import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "校验", titleEn: "Validation" };

export default function Demo() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>();
  return (
    <form noValidate className="flex w-full max-w-xs flex-col gap-(--qy-field-group-gap)" onSubmit={(event) => {
      event.preventDefault();
      const input = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
      setError(input.validity.valueMissing ? "请填写邮箱。" : input.validity.typeMismatch ? "邮箱地址不完整。" : undefined);
    }}>
      <Field invalid={Boolean(error)}><FieldLabel>邮箱</FieldLabel><Input name="email" required type="email" value={value} onValueChange={setValue} autoComplete="email" /><FieldError>{error}</FieldError></Field>
      <Button type="submit">校验</Button>
    </form>
  );
}
