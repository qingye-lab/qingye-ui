import { Field, FieldDescription, FieldLabel, NativeSelect, NativeSelectOption } from "@yanqing/ui";

export const meta = { title: "基础用法", description: "在 Field 中使用时，标签与描述自动关联。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>所在城市</FieldLabel>
      <NativeSelect name="city" placeholder="选择城市">
        <NativeSelectOption value="beijing">北京</NativeSelectOption>
        <NativeSelectOption value="shanghai">上海</NativeSelectOption>
        <NativeSelectOption value="guangzhou">广州</NativeSelectOption>
        <NativeSelectOption value="shenzhen">深圳</NativeSelectOption>
        <NativeSelectOption value="hangzhou">杭州</NativeSelectOption>
        <NativeSelectOption value="chengdu">成都</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>用于计算配送时效，可随时修改。</FieldDescription>
    </Field>
  );
}
