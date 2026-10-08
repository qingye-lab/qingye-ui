import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";

export const meta = { title: "方向与禁用", titleEn: "Orientation and disabled" };
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-field-group-gap)">
    <ToggleGroup orientation="vertical" loopFocus={false} aria-label="纵向切换候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta" disabled>记录数</ToggleGroupItem><ToggleGroupItem value="gamma">最近同步</ToggleGroupItem></ToggleGroup>
    <ToggleGroup disabled aria-label="禁用的切换候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta">记录数</ToggleGroupItem></ToggleGroup>
  </div>;
}
