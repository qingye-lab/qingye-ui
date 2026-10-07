import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { NumberField, NumberFieldGroup, NumberFieldInput } from "@qingye/ui/components/number-field";
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack, SliderValue } from "@qingye/ui/components/slider";
import { Inline } from "@qingye/ui/components/layout";

export const meta = { title: "数值、单位与精确输入", titleEn: "Value, unit and exact entry" };

/* 评审 2026-10-05：滑块的**位置不是可靠的数据表达**。只有一条轨道时，用户知道
 * 自己大致拖到了哪里，但不知道自己设置了什么。数值任务至少要给出：
 *   当前值 + 单位；范围的两端；需要精确设置时的非拖拽路径。
 * 拖拽不是唯一入口——键盘方向键、以及这里的数字输入都能到达同一个值。 */
export default function Demo() {
  const [threshold, setThreshold] = useState(60);
  const [range, setRange] = useState<readonly number[]>([20, 80]);

  return <FieldGroup className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
    <Field>
      {/* SliderValue 读 Slider 根的真实值，因此标签行必须在根之内。 */}
      <Slider name="threshold" value={threshold} onValueChange={setThreshold} min={0} max={100} step={5}>
        <div className="flex items-center justify-between gap-(--qy-field-gap)">
          <FieldLabel>告警阈值</FieldLabel>
          <SliderValue className="text-body-strong">{(formatted) => `${formatted}%`}</SliderValue>
        </div>
        <SliderControl><SliderTrack><SliderIndicator /><SliderThumb aria-label="告警阈值百分比" /></SliderTrack></SliderControl>
      </Slider>
      {/* 范围两端：让「偏左」有一个可读的参照。 */}
      <div className="flex justify-between text-caption text-muted-foreground"><span>0%（每次同步都告警）</span><span>100%（从不告警）</span></div>
      {/* 非拖拽路径：需要精确值时不必拖到难以确定的位置。
       *  NumberField 的值可以是 null（空），因此只在有值时回写给滑块。 */}
      <Inline gap="field"><NumberField className="w-28" value={threshold} onValueChange={(next) => { if (next !== null) setThreshold(next); }} min={0} max={100} step={5} aria-label="告警阈值，精确输入"><NumberFieldGroup><NumberFieldInput /></NumberFieldGroup></NumberField><span className="text-support text-muted-foreground">%</span></Inline>
      <FieldDescription>拖拽、方向键或上面的输入都能改到同一个值。</FieldDescription>
    </Field>

    <Field>
      <Slider name="retention" value={range} onValueChange={setRange} min={0} max={100} step={5} minStepsBetweenValues={2} thumbCollisionBehavior="none">
        <div className="flex items-center justify-between gap-(--qy-field-gap)">
          <FieldLabel>保留区间</FieldLabel>
          <SliderValue className="text-body-strong">{(formatted: readonly string[]) => `${formatted[0]}–${formatted[1]} 天`}</SliderValue>
        </div>
        <SliderControl><SliderTrack><SliderIndicator /><SliderThumb index={0} aria-label="保留天数下限" /><SliderThumb index={1} aria-label="保留天数上限" /></SliderTrack></SliderControl>
      </Slider>
      <div className="flex justify-between text-caption text-muted-foreground"><span>0 天</span><span>100 天</span></div>
      <FieldDescription>两个抓手之间有最小间隔，不会交叉。</FieldDescription>
    </Field>
  </FieldGroup>;
}
