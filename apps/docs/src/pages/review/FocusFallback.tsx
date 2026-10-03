import { Card } from "@qingye/ui/components/card";
import { Button } from "@qingye/ui/components/button";
import { Input } from "@qingye/ui/components/input";
import { Field, FieldLabel } from "@qingye/ui/components/field";

export default function FocusFallback() {
  return (
    <main className="mx-auto max-w-4xl px-8 py-10">
      <title>强制颜色 · Qingye UI</title>
      <h1 className="text-title text-foreground">强制颜色 · 焦点</h1>
      <p className="mt-(--qy-field-gap) text-body text-muted-foreground">强制颜色模式会移除阴影焦点信号。</p>
      <div className="mt-(--qy-field-group-gap) flex items-center gap-(--qy-action-gap)">
        <Button>solid</Button><Button variant="bordered">bordered</Button><Button variant="quiet">quiet</Button><Button disabled>禁用</Button>
      </div>
      <div className="mt-(--qy-field-group-gap) grid grid-cols-3 gap-(--qy-panel-gap)">
        <Field><FieldLabel>名称</FieldLabel><Input defaultValue="青野" /></Field>
        <Field><FieldLabel>只读</FieldLabel><Input readOnly defaultValue="青野" /></Field>
        <Field disabled><FieldLabel>禁用</FieldLabel><Input disabled defaultValue="青野" /></Field>
      </div>
      <Card className="mt-(--qy-field-group-gap) block p-(--qy-panel-padding-sm)" render={<a href="/review.html?view=components#card-surface" />}>
        <h2 className="text-body-strong">卡片链接</h2>
        <p className="mt-(--qy-field-gap) text-caption">查看表面对照。</p>
      </Card>
    </main>
  );
}
