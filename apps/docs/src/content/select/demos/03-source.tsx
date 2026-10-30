import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";

export const meta = { title: "候选的来源", titleEn: "Where candidates come from" };

type Source = "ready" | "loading" | "failed" | "none";
const sources: { id: Source; label: string }[] = [
  { id: "ready", label: "有候选" },
  { id: "loading", label: "加载中" },
  { id: "failed", label: "取得失败" },
  { id: "none", label: "没有候选" },
];
const regions = [{ value: "cn", label: "中国大陆" }, { value: "hk", label: "中国香港" }, { value: "sg", label: "新加坡" }];

export default function Demo() {
  const [retried, setRetried] = useState(0);
  return (
    <div className="grid w-full grid-cols-4 items-start gap-(--qy-space-4)">
      {sources.map(source => (
        <Field key={source.id}>
          <FieldLabel>{source.label}</FieldLabel>
          <Select
            items={source.id === "ready" ? regions : []}
            loading={source.id === "loading"}
            error={source.id === "failed" ? <><span>区域列表没有取到。</span><Button size="sm" variant="quiet" onClick={() => setRetried(count => count + 1)}>重试{retried > 0 ? `（${retried}）` : ""}</Button></> : undefined}
          >
            <SelectTrigger />
            <SelectPopup>
              {source.id === "ready" && regions.map(region => <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>)}
            </SelectPopup>
          </Select>
        </Field>
      ))}
    </div>
  );
}
