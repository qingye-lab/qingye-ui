const e=`import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@qingye/ui/components/toggle-group";

export const meta = { title: "禁用", description: "可禁用整组，或只禁用其中一项。" };

export default function Demo() {
  return (
    <>
      <ToggleGroup defaultValue={["auto"]} disabled variant="outline">
        <ToggleGroupItem value="auto">自动</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem value="manual">手动</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={["standard"]} variant="outline">
        <ToggleGroupItem value="standard">标准</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem value="express">加急</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem disabled value="same-day">
          当日达
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
`;export{e as default};
