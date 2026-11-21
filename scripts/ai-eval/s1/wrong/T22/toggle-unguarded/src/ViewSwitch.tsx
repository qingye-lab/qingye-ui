import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";

export type ViewSwitchProps = {
  value: "list" | "grid";
  onValueChange: (value: "list" | "grid") => void;
};

export function ViewSwitch({ value, onValueChange }: ViewSwitchProps) {
  return (
    <ToggleGroup aria-label="视图" value={[value]} onValueChange={(v) => onValueChange(v[0] as "list" | "grid")}>
      <ToggleGroupItem value="list">列表</ToggleGroupItem>
      <ToggleGroupItem value="grid">网格</ToggleGroupItem>
    </ToggleGroup>
  );
}
