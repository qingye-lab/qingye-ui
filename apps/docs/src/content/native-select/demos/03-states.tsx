import { Field, FieldError, FieldLabel } from "@yanqing/ui/components/field";
import { NativeSelect, NativeSelectOption } from "@yanqing/ui/components/native-select";

export const meta = { title: "状态", description: "占位、禁用与无效。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-3">
      <Field>
        <FieldLabel>发票类型</FieldLabel>
        <NativeSelect placeholder>
          <NativeSelectOption value="normal">增值税普通发票</NativeSelectOption>
          <NativeSelectOption value="special">增值税专用发票</NativeSelectOption>
        </NativeSelect>
      </Field>
      <Field disabled>
        <FieldLabel>结算币种</FieldLabel>
        <NativeSelect defaultValue="cny">
          <NativeSelectOption value="cny">人民币 CNY</NativeSelectOption>
          <NativeSelectOption value="usd">美元 USD</NativeSelectOption>
        </NativeSelect>
      </Field>
      <Field invalid>
        <FieldLabel>所属部门</FieldLabel>
        <NativeSelect placeholder="选择部门" required>
          <NativeSelectOption value="design">设计部</NativeSelectOption>
          <NativeSelectOption value="engineering">研发部</NativeSelectOption>
          <NativeSelectOption value="operations">运营部</NativeSelectOption>
        </NativeSelect>
        <FieldError>请选择所属部门</FieldError>
      </Field>
    </div>
  );
}
