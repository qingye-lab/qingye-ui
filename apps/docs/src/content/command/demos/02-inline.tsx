import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandPanel } from "@yanqing/ui";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "内嵌列表",
  description: "不放在对话框里，作为可搜索的选择列表；关闭 autoFocus 以免抢走页面焦点。",
};

const projects = [
  { value: "east", label: "华东仓储" },
  { value: "south", label: "华南门店" },
  { value: "southwest", label: "西南物流" },
  { value: "north", label: "华北工厂" },
  { value: "hq", label: "总部行政" },
];

export default function Demo() {
  const [selected, setSelected] = useState("east");

  return (
    <div className="w-full max-w-xs rounded-2xl border bg-muted/72">
      <Command items={projects}>
        <CommandInput aria-label="搜索项目" autoFocus={false} placeholder="切换项目…" />
        <CommandPanel>
          <CommandEmpty>没有找到这个项目</CommandEmpty>
          <CommandList>
            {(project: (typeof projects)[number]) => (
              <CommandItem key={project.value} onClick={() => setSelected(project.value)} value={project}>
                <span className="flex-1">{project.label}</span>
                {selected === project.value ? <CheckIcon /> : null}
              </CommandItem>
            )}
          </CommandList>
        </CommandPanel>
      </Command>
    </div>
  );
}
