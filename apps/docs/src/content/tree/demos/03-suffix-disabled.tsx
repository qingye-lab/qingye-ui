import type { TreeNode } from "@qingye/ui/components/tree";
import { Badge } from "@qingye/ui/components/badge";
import { Tree } from "@qingye/ui/components/tree";
import { BuildingIcon, UsersIcon } from "lucide-react";

export const meta = {
  title: "行尾信息与禁用",
  description: "suffix 放人数或徽章；disabled 节点不可聚焦和选中。guides={false} 去掉参考线。",
};

const team = <UsersIcon />;

const nodes: TreeNode[] = [
  {
    id: "company",
    label: "云杉科技",
    icon: <BuildingIcon />,
    suffix: 128,
    children: [
      {
        id: "product",
        label: "产品研发中心",
        icon: team,
        suffix: 64,
        children: [
          { id: "platform", label: "平台组", icon: team, suffix: 18 },
          { id: "growth", label: "增长组", icon: team, suffix: 12 },
          { id: "design", label: "体验组", icon: team, suffix: <Badge variant="info">招聘中</Badge>, textValue: "体验组" },
        ],
      },
      { id: "sales", label: "销售部", icon: team, suffix: 41 },
      { id: "legacy", label: "旧数据迁移组（已撤销）", icon: team, disabled: true },
    ],
  },
];

export default function Demo() {
  return <Tree className="w-full max-w-xs" defaultExpanded={["company", "product"]} guides={false} label="组织架构" nodes={nodes} />;
}
