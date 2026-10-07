import { Fragment } from "react";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Switch } from "@qingye/ui/components/switch";
import { Textarea } from "@qingye/ui/components/textarea";

// 用户裁决 2026-10-05：填值控件与勾选类只有一套几何，紧凑由密度轴承担；
// 所以这张表按密度取列，不再按尺寸档取列。
const densities = ["default", "compact"] as const;
const textareaStates = ["静态", "无效", "禁用", "只读"] as const;
const checkboxStates = ["未选中", "选中", "混合", "无效", "禁用", "只读"] as const;
const switchStates = ["关闭", "开启", "无效", "禁用", "只读"] as const;

export default function FormControlsReview() {
  return (
    <section id="form-controls-review" className="border-t border-border py-(--qy-section-gap)">
      <h2 className="text-heading text-foreground">表单控件 · 状态 × 密度</h2>
      <h3 className="mt-(--qy-field-group-gap) text-body-strong">Textarea</h3>
      <div className="mt-(--qy-field-gap) grid grid-cols-[auto_repeat(2,minmax(0,1fr))] items-start gap-(--qy-panel-gap)">
        <span />{densities.map((density) => <span key={density} className="text-caption text-muted-foreground">{density === "compact" ? "紧凑" : "默认"}</span>)}
        {textareaStates.map((state) => <Fragment key={state}>
          <span className="text-caption text-muted-foreground">{state}</span>
          {densities.map((density) => <div data-density={density} key={`${state}-${density}`}>
            <Field invalid={state === "无效"} disabled={state === "禁用"}>
              <FieldLabel>{state}</FieldLabel>
              <Textarea rows={2} defaultValue="每周一同步设备清单" disabled={state === "禁用"} readOnly={state === "只读"} />
              {state === "无效" && <FieldError>格式不正确。</FieldError>}
            </Field>
          </div>)}
        </Fragment>)}
      </div>
      <h3 className="mt-(--qy-field-group-gap) text-body-strong">Checkbox</h3>
      <div className="mt-(--qy-field-gap) grid grid-cols-[auto_repeat(2,minmax(0,1fr))] items-center gap-(--qy-panel-gap)">
        <span />{densities.map((density) => <span key={density} className="text-caption text-muted-foreground">{density === "compact" ? "紧凑" : "默认"}</span>)}
        {checkboxStates.map((state) => <Fragment key={state}>
          <span className="text-caption text-muted-foreground">{state}</span>
          {densities.map((density) => <div data-density={density} key={`${state}-${density}`}>
            <Field orientation="horizontal" invalid={state === "无效"} disabled={state === "禁用"}>
              <Checkbox defaultChecked={state === "选中" || state === "只读"} indeterminate={state === "混合"} disabled={state === "禁用"} readOnly={state === "只读"} />
              <FieldLabel>接收同步通知</FieldLabel>
            </Field>
          </div>)}
        </Fragment>)}
      </div>
      <h3 className="mt-(--qy-field-group-gap) text-body-strong">Switch</h3>
      <div className="mt-(--qy-field-gap) grid grid-cols-[auto_repeat(2,minmax(0,1fr))] items-center gap-(--qy-panel-gap)">
        <span />{densities.map((density) => <span key={density} className="text-caption text-muted-foreground">{density === "compact" ? "紧凑" : "默认"}</span>)}
        {switchStates.map((state) => <Fragment key={state}>
          <span className="text-caption text-muted-foreground">{state}</span>
          {densities.map((density) => <div data-density={density} key={`${state}-${density}`}>
            <Field orientation="horizontal" invalid={state === "无效"} disabled={state === "禁用"}>
              <Switch defaultChecked={state === "开启" || state === "只读"} disabled={state === "禁用"} readOnly={state === "只读"} />
              <FieldLabel>自动同步</FieldLabel>
            </Field>
          </div>)}
        </Fragment>)}
      </div>
      <div className="mt-(--qy-field-group-gap) grid grid-cols-2 gap-(--qy-panel-gap)">
        <Fieldset><FieldsetLegend>通知范围</FieldsetLegend><Field orientation="horizontal"><Checkbox /><FieldLabel>设备离线</FieldLabel></Field><Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>同步失败</FieldLabel></Field></Fieldset>
        <Fieldset disabled><FieldsetLegend>已停用的范围</FieldsetLegend><Field orientation="horizontal"><Checkbox /><FieldLabel>设备离线</FieldLabel></Field><Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>同步失败</FieldLabel></Field></Fieldset>
      </div>
    </section>
  );
}
