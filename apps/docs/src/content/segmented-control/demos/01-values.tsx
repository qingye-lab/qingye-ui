import { useId, useState } from "react";
import { Field, FieldTitle } from "@qingye/ui/components/field";
import { SegmentedControl, SegmentedControlItem } from "@qingye/ui/components/segmented-control";

export const meta = { title: "单值", titleEn: "One value" };
export default function Demo() {
  const id = useId(); const [value, setValue] = useState("center");
  return <Field><FieldTitle id={id}>对齐</FieldTitle><SegmentedControl name="alignment" value={value} onValueChange={setValue} aria-labelledby={id}><SegmentedControlItem value="left">左</SegmentedControlItem><SegmentedControlItem value="center">中</SegmentedControlItem><SegmentedControlItem value="right">右</SegmentedControlItem></SegmentedControl></Field>;
}
