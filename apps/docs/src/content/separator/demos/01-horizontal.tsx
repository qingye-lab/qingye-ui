import { Separator } from "@qingye/ui/components/separator";
export const meta = { title: "水平分界", titleEn: "Horizontal separator" };
export default function Demo() {
  return <div className="flex w-full max-w-xs flex-col gap-(--qy-field-group-gap) text-body"><section><h3 className="text-heading">文字</h3><p>青野 Qingye UI</p></section><Separator /><section><h3 className="text-heading">数字</h3><p className="numeric">0123456789</p></section></div>;
}
