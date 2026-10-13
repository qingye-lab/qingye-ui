import { Tree, type TreeNode } from "@qingye_lab/ui/components/tree";

const nodes: TreeNode[] = [
  { id: "settings", label: "设置", children: [{ id: "notifications", label: "通知" }, { id: "sync", label: "同步" }] },
  { id: "members", label: "成员" },
];

export default function Cover() {
  return <Tree aria-label="层级" nodes={nodes} defaultExpandedIds={["settings"]} defaultSelectedId="notifications" className="w-full" />;
}
