import type { TreeNode } from "@yanqing/ui/components/tree";
import { Button } from "@yanqing/ui/components/button";
import { Tree } from "@yanqing/ui/components/tree";
import { type ReactNode, useState } from "react";

export const meta = { title: "受控展开与选中", description: "用 expanded 与 value 在外部控制，例如“全部展开”和联动详情。" };

const nodes: TreeNode[] = [
  {
    id: "east",
    label: "华东大区",
    children: [
      { id: "sh", label: "上海", children: [{ id: "sh-xh", label: "徐汇店" }, { id: "sh-ja", label: "静安店" }] },
      { id: "hz", label: "杭州", children: [{ id: "hz-xh", label: "西湖店" }] },
    ],
  },
  {
    id: "south",
    label: "华南大区",
    children: [{ id: "sz", label: "深圳", children: [{ id: "sz-ns", label: "南山店" }, { id: "sz-ft", label: "福田店" }] }],
  },
];

const parents = ["east", "sh", "hz", "south", "sz"];

export default function Demo() {
  const [expanded, setExpanded] = useState<string[]>(["east"]);
  const [value, setValue] = useState<string | null>("hz");
  const [name, setName] = useState<ReactNode>("杭州");
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex gap-2">
        <Button onClick={() => setExpanded(parents)} size="sm" variant="outline">
          全部展开
        </Button>
        <Button onClick={() => setExpanded([])} size="sm" variant="outline">
          全部收起
        </Button>
      </div>
      <Tree
        expanded={expanded}
        label="门店"
        nodes={nodes}
        onExpandedChange={setExpanded}
        onValueChange={(id, node) => {
          setValue(id);
          setName(node.label);
        }}
        value={value}
      />
      <p className="text-muted-foreground text-sm">
        当前选中：<span className="font-medium text-foreground">{name}</span>
      </p>
    </div>
  );
}
