import { Button } from "@yanqing/ui/components/button";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@yanqing/ui/components/collapsible";
import { ChevronDownIcon, GitBranchIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "显示更多", description: "先展示最常用的几项，其余收起。" };

const repos = ["yanqing-ui", "yanqing-docs", "qingyan-site", "deploy-scripts", "design-tokens"];

function Repo({ name }: { name: string }) {
  return (
    <li className="flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[0.8125rem]">
      <GitBranchIcon aria-hidden="true" className="size-4 text-muted-foreground" />
      {name}
    </li>
  );
}

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible className="w-full max-w-xs" onOpenChange={setOpen} open={open}>
      <ul>
        {repos.slice(0, 2).map((name) => (
          <Repo key={name} name={name} />
        ))}
      </ul>
      <CollapsiblePanel render={<ul />}>
        {repos.slice(2).map((name) => (
          <Repo key={name} name={name} />
        ))}
      </CollapsiblePanel>
      <CollapsibleTrigger render={<Button className="mt-1" size="sm" variant="ghost" />}>
        {open ? "收起" : `显示其余 ${repos.length - 2} 个仓库`}
        <ChevronDownIcon className="transition-transform duration-200 in-data-panel-open:rotate-180" />
      </CollapsibleTrigger>
    </Collapsible>
  );
}
