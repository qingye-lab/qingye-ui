import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";

export const meta = { title: "方向与禁用", titleEn: "Orientation and disabled" };
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-field-group-gap)">
    <ToggleGroup orientation="vertical" loopFocus={false} aria-label="纵向候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">甲</ToggleGroupItem><ToggleGroupItem value="beta" disabled>乙</ToggleGroupItem><ToggleGroupItem value="gamma">丙</ToggleGroupItem></ToggleGroup>
    <ToggleGroup disabled aria-label="禁用候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">甲</ToggleGroupItem><ToggleGroupItem value="beta">乙</ToggleGroupItem></ToggleGroup>
  </div>;
}
