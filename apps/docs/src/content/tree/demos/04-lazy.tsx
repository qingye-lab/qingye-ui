import { Button } from "@qingye/ui/components/button";
import { Tree, type TreeNode } from "@qingye/ui/components/tree";
import { useState } from "react";

export const meta = { title: "惰性节点与应用加载", description: "hasChildren 声明尚未载入子项的父节点；请求状态与重试由应用管理。" };
export default function Demo() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const nodes: TreeNode[] = [{ id: "notes", label: "田野笔记", hasChildren: true, suffix: expanded.includes("notes") && !loaded ? failed ? "载入未完成" : "等待载入" : undefined, ...(loaded ? { children: [{ id: "river", label: "河岸观察" }, { id: "walk", label: "城南步行" }] } : {}) }];
  return <div className="flex w-full max-w-md flex-col gap-(--qy-space-4)"><Tree expanded={expanded} label="惰性资料目录" nodes={nodes} onExpandedChange={setExpanded} />{expanded.includes("notes") && !loaded && <div className="flex flex-wrap items-center gap-(--qy-action-gap)"><Button onClick={() => { setLoaded(true); setFailed(false); }} size="sm" variant="outline">{failed ? "重试载入子项" : "载入子项"}</Button><Button onClick={() => setFailed(true)} size="sm" variant="ghost">模拟载入失败</Button><p role="status">{failed ? "未完成，父节点与展开状态保留。" : "演示使用本地事件，不会请求后端。"}</p></div>}</div>;
}
