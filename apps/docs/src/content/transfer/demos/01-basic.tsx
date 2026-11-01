import { useState } from "react";
import { Transfer } from "@qingye_lab/ui/components/transfer";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "基础", titleEn: "Basic" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const labels = en ? ["Apple", "Banana", "Cherry", "Grape", "Lemon", "Mango", "Peach", "Pear"] : ["苹果", "香蕉", "樱桃", "葡萄", "柠檬", "芒果", "桃", "梨"];
  const items = labels.map((label, index) => ({ value: `k${index}`, label, disabled: index === 3 }));
  const [value, setValue] = useState<string[]>(["k2", "k5"]);
  return <div className="flex w-full max-w-xl flex-col gap-(--qy-space-3)">
    <Transfer items={items} value={value} onValueChange={setValue} />
    <output className="text-support text-muted-foreground" aria-live="polite">{value.length} / {items.length}</output>
  </div>;
}
