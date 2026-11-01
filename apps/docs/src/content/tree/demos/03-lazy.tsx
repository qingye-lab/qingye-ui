import * as React from "react";
import { Tree, type TreeNode } from "@qingye_lab/ui/components/tree";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "按需加载子项", titleEn: "Load children on demand" } satisfies DemoMeta;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 根节点先给出；子项在第一次展开时才取。isLeaf 声明没有子项的节点，其余都当作可加载的分支。
const roots: TreeNode[] = [
  { id: "docs", label: "文档" },
  { id: "images", label: "图片" },
  { id: "readme", label: "说明.txt", isLeaf: true },
];
const children: Record<string, TreeNode[]> = {
  docs: [{ id: "docs.plan", label: "计划.md", isLeaf: true }, { id: "docs.notes", label: "笔记", children: [{ id: "docs.notes.a", label: "周一.md" }] }],
  images: [{ id: "images.a", label: "封面.png", isLeaf: true }, { id: "images.b", label: "草图.png", isLeaf: true }],
};

export default function Demo() {
  const failed = React.useRef(false);
  return <Tree
    aria-label="按需加载的目录"
    nodes={roots}
    loadChildren={async node => {
      await delay(700);
      // 图片第一次取不到，重试后成功。
      if (node.id === "images" && !failed.current) { failed.current = true; throw new Error("offline"); }
      return children[node.id] ?? [];
    }}
  />;
}
