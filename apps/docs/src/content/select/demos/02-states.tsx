import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";

export const meta = { title: "状态与分组", titleEn: "States and groups" };

const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];
const states = [
  { id: "unselected", label: "未选择", value: null },
  { id: "selected", label: "已选择", value: "center" },
  { id: "invalid", label: "无效", value: null },
  { id: "readonly", label: "只读", value: "center" },
  { id: "disabled", label: "禁用", value: "center" },
  { id: "disabled-item", label: "禁用项", value: "center" },
];
const values = [{ value: "", label: "空字符串" }, { value: 0, label: "0" }];
const fontGroups = [
  { label: "无衬线", fonts: ["Arial", "Helvetica"] },
  { label: "等宽", fonts: ["Menlo", "Consolas"] },
];
const fonts = fontGroups.flatMap(group => group.fonts.map(font => ({ value: font, label: font })));

export default function Demo() {
  const [requiredValue, setRequiredValue] = useState<string | null>(null);
  return (
    <FieldGroup className="grid w-full grid-cols-3 items-start">
      {states.map(state => {
        const invalid = state.id === "invalid" && requiredValue === null;
        return (
          <Field key={state.id} invalid={invalid} disabled={state.id === "disabled"}>
            <FieldLabel>{state.id === "invalid" && !invalid ? "已选择" : state.label}</FieldLabel>
            <Select
              items={options}
              defaultValue={state.value}
              readOnly={state.id === "readonly"}
              disabled={state.id === "disabled"}
              onValueChange={value => {
                if (state.id === "invalid") setRequiredValue(value);
              }}
            >
              <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
              <SelectPopup>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value} disabled={state.id === "disabled-item" && option.value === "right"}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
            {invalid && <FieldError>请选择对齐方式。</FieldError>}
          </Field>
        );
      })}
      {values.map(option => (
        <Field key={String(option.value)}>
          <FieldLabel>{option.value === "" ? "空值" : "零值"}</FieldLabel>
          <Select<string | number> items={values} defaultValue={option.value}>
            <SelectTrigger />
            <SelectPopup>
              {values.map(item => <SelectItem key={String(item.value)} value={item.value}>{item.label}</SelectItem>)}
            </SelectPopup>
          </Select>
        </Field>
      ))}
      <Field>
        <FieldLabel>字体</FieldLabel>
        <Select items={fonts} defaultValue="Menlo">
          <SelectTrigger />
          <SelectPopup>
            {fontGroups.map(group => (
              <SelectGroup key={group.label}>
                <SelectGroupLabel>{group.label}</SelectGroupLabel>
                {group.fonts.map(font => <SelectItem key={font} value={font}>{font}</SelectItem>)}
              </SelectGroup>
            ))}
          </SelectPopup>
        </Select>
      </Field>
    </FieldGroup>
  );
}
