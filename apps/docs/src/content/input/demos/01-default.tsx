import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "设备名称", titleEn: "Device name" };

export default function Demo() {
  return <Field className="w-full max-w-xs"><FieldLabel>设备名称</FieldLabel><Input name="device-name" defaultValue="3 号楼东侧摄像头" /></Field>;
}
