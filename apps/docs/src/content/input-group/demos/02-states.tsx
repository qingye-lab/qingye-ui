import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye_lab/ui/components/input-group";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "状态", titleEn: "States" };
export default function Demo() {
  return <Stack gap="fields" className="w-full max-w-sm"><Field disabled><FieldLabel>禁用</FieldLabel><InputGroup><InputGroupInput /><InputGroupAddon>px</InputGroupAddon></InputGroup></Field><Field><FieldLabel>只读</FieldLabel><InputGroup><InputGroupInput readOnly defaultValue="0" /><InputGroupAddon>px</InputGroupAddon></InputGroup></Field><Field invalid><FieldLabel>数值</FieldLabel><InputGroup><InputGroupInput /><InputGroupAddon>px</InputGroupAddon></InputGroup><FieldError>请输入数值</FieldError></Field></Stack>;
}
