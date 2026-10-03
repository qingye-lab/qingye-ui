import { Separator } from "@qingye/ui/components/separator";
export const meta = { title: "装饰线", titleEn: "Decorative line" };
export default function Demo() {
  return <div className="flex w-full max-w-xs flex-col gap-(--qy-field-gap)"><h3 className="text-heading">青野 Qingye UI</h3><Separator decorative /><p className="text-body">React 组件库</p></div>;
}
