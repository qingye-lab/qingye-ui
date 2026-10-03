import { useId, useState } from "react";
import { Field, FieldError, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye/ui/components/field";
import { RadioGroup, Radio } from "@qingye/ui/components/radio-group";

export const meta = { title: "状态", titleEn: "States" };

const states = [
  { id: "unselected", label: "未选择" },
  { id: "selected", label: "已选择" },
  { id: "invalid", label: "无效" },
  { id: "readonly", label: "只读" },
  { id: "disabled", label: "禁用" },
  { id: "disabled-item", label: "禁用项" },
];
const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  const id = useId();
  const [requiredValue, setRequiredValue] = useState<string | null>(null);
  return (
    <FieldGroup className="grid w-full grid-cols-3 items-start">
      {states.map(state => {
        const invalid = state.id === "invalid" && requiredValue === null;
        return (
          <Field key={state.id} invalid={invalid} disabled={state.id === "disabled"}>
            <FieldTitle id={`${id}-${state.id}`}>
              {state.id === "invalid" && !invalid ? "已选择" : state.label}
            </FieldTitle>
            <RadioGroup
              aria-labelledby={`${id}-${state.id}`}
              defaultValue={state.id === "unselected" || state.id === "invalid" ? null : "center"}
              readOnly={state.id === "readonly"}
              disabled={state.id === "disabled"}
              onValueChange={value => {
                if (state.id === "invalid") setRequiredValue(value);
              }}
            >
              {options.map(option => (
                <FieldItem key={option.value}>
                  <Radio value={option.value} disabled={state.id === "disabled-item" && option.value === "right"} />
                  <FieldLabel>{option.label}</FieldLabel>
                </FieldItem>
              ))}
            </RadioGroup>
            {invalid && <FieldError>请选择对齐方式。</FieldError>}
          </Field>
        );
      })}
    </FieldGroup>
  );
}
