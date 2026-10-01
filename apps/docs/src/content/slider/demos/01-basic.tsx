import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Slider, SliderValue } from "@qingye/ui/components/slider";

export const meta = { title: "标签与数值", description: "Field 提供标签，SliderValue 显示当前值。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-sm">
      <Slider defaultValue={68} format={{ style: "unit", unit: "percent" }}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <FieldLabel>屏幕亮度</FieldLabel>
          <SliderValue className="text-muted-foreground numeric" />
        </div>
      </Slider>
    </Field>
  );
}
