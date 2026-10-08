import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Form } from "@qingye_lab/ui/components/form";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "字段错误与重置", titleEn: "Field error and reset" };
export default function Demo() {
  return <Form className="w-full max-w-sm" onSubmit={event => event.preventDefault()}><Stack gap="fields"><Field name="value" invalid><FieldLabel>工作区标识</FieldLabel><Input defaultValue="qingye" /><FieldError errors={[{ message: "已被占用" }]} /></Field><ButtonGroup aria-label="表单动作"><Button type="submit">提交</Button><Button type="reset" variant="bordered">重置</Button></ButtonGroup></Stack></Form>;
}
