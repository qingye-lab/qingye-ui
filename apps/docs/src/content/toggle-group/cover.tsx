import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";

export default function Cover() {
  return <ToggleGroup multiple aria-label="可见列" defaultValue={["alpha"]}>
    <ToggleGroupItem value="alpha">名称</ToggleGroupItem>
    <ToggleGroupItem value="beta">记录数</ToggleGroupItem>
  </ToggleGroup>;
}
