import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";

export const meta = { title: "单位与动作", titleEn: "Unit and action" };
export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>数值</FieldLabel><InputGroup><InputGroupInput inputMode="decimal" /><InputGroupAddon>px</InputGroupAddon><InputGroupAddon className="p-0"><Button variant="quiet" className="min-h-0 self-stretch sm:min-h-0">应用</Button></InputGroupAddon></InputGroup></Field>;
}
