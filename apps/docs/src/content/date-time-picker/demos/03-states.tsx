import { DateTimePicker } from "@yanqing/ui/components/date-time-picker";
import { Field, FieldDescription, FieldError } from "@yanqing/ui/components/field";
import { Label } from "@yanqing/ui/components/label";

export const meta = { title: "状态", description: "精确到秒、错误、只读与禁用。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-2">
      <Field>
        <Label htmlFor="cutover-at">切换窗口</Label>
        <DateTimePicker id="cutover-at" label="切换窗口" step={1} defaultValue="2026-10-18T02:00:00" />
        <FieldDescription>step=1，精确到秒。</FieldDescription>
      </Field>
      <Field>
        <Label htmlFor="publish-at">定时发布</Label>
        <DateTimePicker id="publish-at" label="发布" aria-invalid aria-describedby="publish-error" />
        <FieldError id="publish-error">请设置发布时间</FieldError>
      </Field>
      <Field>
        <Label htmlFor="created-at">工单创建时间</Label>
        <DateTimePicker id="created-at" readOnly defaultValue="2026-09-28T16:42" />
      </Field>
      <Field>
        <Label htmlFor="locked-at">锁定时间</Label>
        <DateTimePicker id="locked-at" disabled defaultValue="2026-09-30T18:00" />
      </Field>
    </div>
  );
}
