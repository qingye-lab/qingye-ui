import { useId } from "react";
import { Field, FieldError, FieldGroup, FieldTitle } from "@qingye_lab/ui/components/field";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";

export const meta = { title: "状态", titleEn: "States" };
const items = <><SegmentedControlItem value="alpha">左</SegmentedControlItem><SegmentedControlItem value="beta">中</SegmentedControlItem><SegmentedControlItem value="gamma" disabled>右</SegmentedControlItem></>;
export default function Demo() {
  const id = useId();
  return <FieldGroup className="grid sm:grid-cols-3">
    <Field><FieldTitle id={`${id}-readonly`}>只读值</FieldTitle><SegmentedControl readOnly defaultValue="alpha" aria-labelledby={`${id}-readonly`}>{items}</SegmentedControl></Field>
    <Field><FieldTitle id={`${id}-disabled`}>禁用值</FieldTitle><SegmentedControl disabled defaultValue="beta" aria-labelledby={`${id}-disabled`}>{items}</SegmentedControl></Field>
    <Field invalid><FieldTitle id={`${id}-required`}>未选择</FieldTitle><SegmentedControl required aria-labelledby={`${id}-required`}>{items}</SegmentedControl><FieldError>请选择一个值</FieldError></Field>
  </FieldGroup>;
}
