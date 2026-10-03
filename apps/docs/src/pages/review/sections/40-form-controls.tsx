import { Fragment } from "react";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Switch } from "@qingye/ui/components/switch";
import { Textarea } from "@qingye/ui/components/textarea";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const textareaStates = ["静态", "无效", "禁用", "只读"] as const;
const checkboxStates = ["未选中", "选中", "混合", "无效", "禁用", "只读"] as const;
const switchStates = ["关闭", "开启", "无效", "禁用", "只读"] as const;

export default function FormControlsReview() {
  return (
    <section id="form-controls-review" className="border-t border-border py-(--qy-section-gap)">
      <h2 className="text-heading text-foreground">表单控件 · 状态 × 尺寸</h2>
      <h3 className="mt-(--qy-field-group-gap) text-body-strong">Textarea</h3>
      <div className="mt-(--qy-field-gap) grid grid-cols-5 items-start gap-(--qy-panel-gap)">
        {sizes.map((size) => <span key={size} className="text-caption text-muted-foreground">{size}</span>)}
        {textareaStates.map((state) => sizes.map((size) => <Field key={`${state}-${size}`} invalid={state === "无效"} disabled={state === "禁用"}>
          <FieldLabel>{state}</FieldLabel>
          <Textarea size={size} rows={2} defaultValue="青野" disabled={state === "禁用"} readOnly={state === "只读"} />
          {state === "无效" && <FieldError>格式不正确。</FieldError>}
        </Field>))}
      </div>
      <h3 className="mt-(--qy-field-group-gap) text-body-strong">Checkbox</h3>
      <div className="mt-(--qy-field-gap) grid grid-cols-[auto_repeat(5,minmax(0,1fr))] items-center gap-(--qy-panel-gap)">
        <span />{sizes.map((size) => <span key={size} className="text-caption text-muted-foreground">{size}</span>)}
        {checkboxStates.map((state) => <Fragment key={state}>
          <span className="text-caption text-muted-foreground">{state}</span>
          {sizes.map((size) => <Field key={size} orientation="horizontal" invalid={state === "无效"} disabled={state === "禁用"}>
            <Checkbox size={size} defaultChecked={state === "选中" || state === "只读"} indeterminate={state === "混合"} disabled={state === "禁用"} readOnly={state === "只读"} />
            <FieldLabel>选项</FieldLabel>
          </Field>)}
        </Fragment>)}
      </div>
      <h3 className="mt-(--qy-field-group-gap) text-body-strong">Switch</h3>
      <div className="mt-(--qy-field-gap) grid grid-cols-[auto_repeat(5,minmax(0,1fr))] items-center gap-(--qy-panel-gap)">
        <span />{sizes.map((size) => <span key={size} className="text-caption text-muted-foreground">{size}</span>)}
        {switchStates.map((state) => <Fragment key={state}>
          <span className="text-caption text-muted-foreground">{state}</span>
          {sizes.map((size) => <Field key={size} orientation="horizontal" invalid={state === "无效"} disabled={state === "禁用"}>
            <Switch size={size} defaultChecked={state === "开启" || state === "只读"} disabled={state === "禁用"} readOnly={state === "只读"} />
            <FieldLabel>开关</FieldLabel>
          </Field>)}
        </Fragment>)}
      </div>
      <div className="mt-(--qy-field-group-gap) grid grid-cols-2 gap-(--qy-panel-gap)">
        <Fieldset><FieldsetLegend>选项组</FieldsetLegend><Field orientation="horizontal"><Checkbox /><FieldLabel>选项一</FieldLabel></Field><Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>选项二</FieldLabel></Field></Fieldset>
        <Fieldset disabled><FieldsetLegend>禁用组</FieldsetLegend><Field orientation="horizontal"><Checkbox /><FieldLabel>选项一</FieldLabel></Field><Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>选项二</FieldLabel></Field></Fieldset>
      </div>
    </section>
  );
}
