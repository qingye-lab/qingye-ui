import * as React from "react";
import { Tree, type TreeMove, type TreeNode } from "@qingye_lab/ui/components/tree";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "拖动调整顺序", titleEn: "Drag to reorder" } satisfies DemoMeta;

const initial: TreeNode[] = [
  { id: "intro", label: "简介" },
  { id: "guide", label: "指南", children: [{ id: "guide.start", label: "开始" }, { id: "guide.config", label: "配置" }] },
  { id: "api", label: "接口" },
  { id: "log", label: "更新记录" },
];

// 数据归调用方：Tree 只报告「谁移到哪里」，这里把它落到自己的数组上。
function detach(list: readonly TreeNode[], id: string): { rest: TreeNode[]; found?: TreeNode | undefined } {
  let found: TreeNode | undefined;
  const rest: TreeNode[] = [];
  for (const node of list) {
    if (node.id === id) { found = node; continue; }
    if (node.children) { const inner = detach(node.children, id); if (inner.found) found = inner.found; rest.push({ ...node, children: inner.rest }); } else rest.push(node);
  }
  return { rest, found };
}
function attach(list: readonly TreeNode[], move: TreeMove, node: TreeNode): TreeNode[] {
  const out: TreeNode[] = [];
  for (const item of list) {
    const self = item.children ? { ...item, children: attach(item.children, move, node) } : item;
    if (item.id !== move.targetId) { out.push(self); continue; }
    if (move.position === "before") out.push(node, self);
    else if (move.position === "after") out.push(self, node);
    else out.push({ ...self, children: [...(self.children ?? []), node] });
  }
  return out;
}
function applyMove(list: readonly TreeNode[], move: TreeMove): TreeNode[] {
  const { rest, found } = detach(list, move.nodeId);
  return found ? attach(rest, move, found) : [...list];
}

export default function Demo() {
  const [nodes, setNodes] = React.useState(initial);
  return <Tree aria-label="可调整顺序的目录" nodes={nodes} draggable defaultExpandedIds={["guide"]} onMove={move => setNodes(current => applyMove(current, move))} />;
}
