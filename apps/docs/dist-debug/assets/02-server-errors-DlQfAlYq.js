const e=`import { Button } from "@qingye/ui/components/button";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = {
  title: "服务端错误",
  description: "把接口返回的字段错误交给 errors，空的 <FieldError /> 会显示对应字段的错误；修改字段后自动清除。",
};

type Errors = Record<string, string | string[]>;

async function createDevice(values: Record<string, unknown>): Promise<Errors> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const errors: Errors = {};
  if (!/^[A-Z]{2}-\\d{3}$/.test(String(values.code))) errors.code = "编号格式为两位大写字母 + 三位数字，例如 HZ-031。";
  if (String(values.code) === "HZ-031") errors.code = "编号 HZ-031 已被“温湿度传感器”占用。";
  if (!String(values.name).trim()) errors.name = "请填写设备名称。";
  return errors;
}

export default function Demo() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      errors={errors}
      onFormSubmit={async (values) => {
        setLoading(true);
        setErrors(await createDevice(values));
        setLoading(false);
      }}
    >
      <Field name="code">
        <FieldLabel>设备编号</FieldLabel>
        <Input defaultValue="HZ-031" />
        <FieldError />
      </Field>
      <Field name="name">
        <FieldLabel>设备名称</FieldLabel>
        <Input placeholder="例如：2 号库温湿度传感器" />
        <FieldError />
      </Field>
      <Button loading={loading} type="submit">
        添加设备
      </Button>
    </Form>
  );
}
`;export{e as default};
