import { TreeSelect } from "@qingye_lab/ui/components/tree-select";
import type { TreeNode } from "@qingye_lab/ui/components/tree";

const nodes: TreeNode[] = [
  { id: "rd", label: "研发中心", children: [{ id: "rd.web", label: "前端组" }, { id: "rd.server", label: "服务端组" }] },
  { id: "ops", label: "运营中心", children: [{ id: "ops.growth", label: "增长组" }] },
];

export default function Cover() {
  return <TreeSelect aria-label="所属部门" nodes={nodes} defaultValue="rd.web" className="w-full" />;
}
