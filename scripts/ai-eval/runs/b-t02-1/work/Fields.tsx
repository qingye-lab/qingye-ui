import { Field, FieldGroup, FieldLabel, Input } from "@qingye/ui";

export function Fields() {
  return <main>
    <section aria-label="资料"><FieldGroup><Field><FieldLabel>名称</FieldLabel><Input defaultValue="青野" /></Field><Field><FieldLabel>编号</FieldLabel><Input defaultValue="QY-12" /></Field></FieldGroup></section>
    <section aria-label="联系方式"><FieldGroup><Field><FieldLabel>邮箱</FieldLabel><Input defaultValue="demo@example.test" /></Field><Field><FieldLabel>电话</FieldLabel><Input defaultValue="010-12345678" /></Field></FieldGroup></section>
  </main>;
}
