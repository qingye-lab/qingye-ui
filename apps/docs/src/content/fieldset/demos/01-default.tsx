import { Field, FieldDescription, FieldLabel } from "@yanqing/ui/components/field";
import { Fieldset, FieldsetLegend } from "@yanqing/ui/components/fieldset";
import { Input } from "@yanqing/ui/components/input";

export const meta = { title: "默认" };

export default function Demo() {
  return (
    <Fieldset className="max-w-sm">
      <FieldsetLegend>发票信息</FieldsetLegend>
      <Field>
        <FieldLabel>发票抬头</FieldLabel>
        <Input defaultValue="杭州言青科技有限公司" />
      </Field>
      <Field>
        <FieldLabel>纳税人识别号</FieldLabel>
        <Input className="numeric" placeholder="18 位统一社会信用代码" />
        <FieldDescription>可在营业执照上找到。</FieldDescription>
      </Field>
    </Fieldset>
  );
}
