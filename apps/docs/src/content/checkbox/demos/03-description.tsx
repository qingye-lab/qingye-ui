import { Checkbox, Field, FieldContent, FieldDescription, FieldLabel } from "@yanqing/ui";

export const meta = { title: "带说明", description: "放进 Field，说明会作为复选框的描述读出。" };

export default function Demo() {
  return (
    <Field orientation="horizontal" className="max-w-sm items-start">
      <Checkbox defaultChecked className="mt-px" />
      <FieldContent>
        <FieldLabel>同步到企业通讯录</FieldLabel>
        <FieldDescription>新成员入职后自动加入「研发中心」部门，并开通邮箱与 VPN。</FieldDescription>
      </FieldContent>
    </Field>
  );
}
