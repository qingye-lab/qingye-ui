import { Carousel } from "@qingye/ui/components/carousel";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "有限内容与输入", titleEn: "Finite content and inputs" };
export default function CarouselDemo() {
  return <Carousel label="控件状态" className="w-full max-w-sm" items={[
    { id: "editable", label: "输入", content: <Stack gap="field"><Label htmlFor="carousel-editable">输入</Label><Input id="carousel-editable" /></Stack> },
    { id: "readonly", label: "只读", content: <Stack gap="field"><Label htmlFor="carousel-readonly">只读</Label><Input id="carousel-readonly" readOnly defaultValue="只读" /></Stack> },
    { id: "disabled", label: "禁用", content: <Stack gap="field"><Label htmlFor="carousel-disabled">禁用</Label><Input id="carousel-disabled" disabled /></Stack> },
  ]} />;
}
