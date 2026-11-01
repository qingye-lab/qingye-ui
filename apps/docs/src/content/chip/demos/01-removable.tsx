import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Chip } from "@qingye_lab/ui/components/chip";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "可移除", titleEn: "Removable" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const all = en ? ["Design", "Engineering", "Operations", "Finance"] : ["设计", "工程", "运营", "财务"];
  const [items, setItems] = useState(all.slice(0, 3));
  const next = all.find(item => !items.includes(item));
  return <div className="flex flex-wrap items-center gap-(--qy-space-2)">
    {items.map(item => <Chip key={item} onRemove={() => setItems(items.filter(other => other !== item))}>{item}</Chip>)}
    <Button variant="bordered" size="sm" aria-disabled={next === undefined || undefined} onClick={() => { if (next !== undefined) setItems([...items, next]); }}>{en ? "Add" : "添加"}</Button>
  </div>;
}
