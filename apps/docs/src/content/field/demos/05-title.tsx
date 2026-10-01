import { Field, FieldDescription, FieldTitle, ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@yanqing/ui";

export const meta = {
  title: "标题",
  description: "控件不是单个输入框时，用 FieldTitle 作标题并通过 aria-labelledby 关联。",
};

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldTitle id="delivery-slot">配送时段</FieldTitle>
      <ToggleGroup aria-labelledby="delivery-slot" defaultValue={["morning"]} variant="outline">
        <ToggleGroupItem value="morning">上午</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem value="afternoon">下午</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem value="evening">晚间</ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>晚间时段仅限杭州主城区。</FieldDescription>
    </Field>
  );
}
