import { useId } from "react";
import { Field, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";
import { RadioGroup, Radio } from "@qingye_lab/ui/components/radio-group";

export const meta = { title: "跟随标签", titleEn: "Follows its label" };

const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

// 单选标记只有一种几何，跟随它那一项标签的文字档（用户裁决 2026-10-05）。
export default function Demo() {
  const id = useId();
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      <Field>
        <FieldTitle id={`${id}-body`}>正文标签</FieldTitle>
        <RadioGroup aria-labelledby={`${id}-body`} defaultValue="center">
          {options.map(option => <FieldItem key={option.value}><Radio value={option.value} /><FieldLabel>{option.label}</FieldLabel></FieldItem>)}
        </RadioGroup>
      </Field>
      <Field>
        <FieldTitle id={`${id}-support`}>紧凑标签</FieldTitle>
        <RadioGroup aria-labelledby={`${id}-support`} defaultValue="center">
          {options.map(option => <FieldItem key={option.value}><Radio value={option.value} /><FieldLabel className="text-support">{option.label}</FieldLabel></FieldItem>)}
        </RadioGroup>
      </Field>
    </FieldGroup>
  );
}
