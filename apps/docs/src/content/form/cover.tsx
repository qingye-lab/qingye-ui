import { Button } from "@qingye_lab/ui/components/button";
import { Field } from "@qingye_lab/ui/components/field";
import { Form } from "@qingye_lab/ui/components/form";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline } from "@qingye_lab/ui/components/layout";

export default function Cover() {
  return <Form className="w-full"><Inline wrap={false}><Field name="value" className="grow"><Input aria-label="名称" defaultValue="青野" /></Field><Button type="submit" className="shrink-0">提交</Button></Inline></Form>;
}
