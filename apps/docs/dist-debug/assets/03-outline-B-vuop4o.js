const e=`import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@qingye/ui/components/toggle-group";

export const meta = { title: "描边", description: "outline 把子项拼成一个整体，可用分隔线区分。" };

export default function Demo() {
  return (
    <ToggleGroup defaultValue={["week"]} variant="outline">
      <ToggleGroupItem value="day">日</ToggleGroupItem>
      <ToggleGroupSeparator />
      <ToggleGroupItem value="week">周</ToggleGroupItem>
      <ToggleGroupSeparator />
      <ToggleGroupItem value="month">月</ToggleGroupItem>
      <ToggleGroupSeparator />
      <ToggleGroupItem value="quarter">季度</ToggleGroupItem>
    </ToggleGroup>
  );
}
`;export{e as default};
