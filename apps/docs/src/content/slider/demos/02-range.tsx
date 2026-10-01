import { Field, FieldLabel } from "@yanqing/ui/components/field";
import { Slider, SliderValue } from "@yanqing/ui/components/slider";

export const meta = { title: "范围", description: "两个滑块分别命名，读屏能区分最低价与最高价。" };

const yuan = new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 });

export default function Demo() {
  return (
    <Field className="w-full max-w-sm">
      <Slider
        defaultValue={[800, 3200]}
        min={0}
        max={5000}
        step={100}
        minStepsBetweenValues={5}
        format={{ style: "currency", currency: "CNY", maximumFractionDigits: 0 }}
        getAriaLabel={(index) => (index === 0 ? "最低价" : "最高价")}
        getAriaValueText={(_, value) => yuan.format(value)}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <FieldLabel>价格区间</FieldLabel>
          <SliderValue className="text-muted-foreground numeric" />
        </div>
      </Slider>
    </Field>
  );
}
