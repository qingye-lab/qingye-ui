import {
  Button,
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
} from "@yanqing/ui";
import { useState, type FormEvent } from "react";

export const meta = { title: "表单校验", description: "required 未选时由 Field 显示错误；提交值为选项的 value。" };

const banks = [
  { label: "中国工商银行", value: "ICBC" },
  { label: "中国建设银行", value: "CCB" },
  { label: "中国农业银行", value: "ABC" },
  { label: "中国银行", value: "BOC" },
  { label: "招商银行", value: "CMB" },
  { label: "交通银行", value: "BOCOM" },
];

export default function Demo() {
  const [result, setResult] = useState<string | null>(null);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(String(new FormData(event.currentTarget).get("bank")));
  };
  return (
    <Form className="flex w-full max-w-64 flex-col gap-4" onSubmit={onSubmit}>
      <Field name="bank">
        <FieldLabel>开户银行</FieldLabel>
        <Combobox items={banks} required>
          <ComboboxInput placeholder="搜索银行" />
          <ComboboxPopup>
            <ComboboxEmpty>没有匹配的银行</ComboboxEmpty>
            <ComboboxList>
              {(bank: (typeof banks)[number]) => (
                <ComboboxItem key={bank.value} value={bank}>
                  {bank.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
        <FieldDescription>用于结算打款，需与营业执照一致。</FieldDescription>
        <FieldError match="valueMissing">请选择开户银行</FieldError>
      </Field>
      <Button type="submit">保存结算信息</Button>
      {result !== null ? <p className="text-muted-foreground text-xs">bank = {result}</p> : null}
    </Form>
  );
}
