import * as React from "react";
import { Tree, type TreeNode } from "@qingye/ui/components/tree";
import { Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "级联勾选：成员权限", titleEn: "Cascading check: member permissions" } satisfies DemoMeta;

// 真实的权限结构：按区域分组，叶子是具体权限。「删除工作区」要求所有者身份，
// 对当前成员禁用——它保留自己被授予的事实，不随上级勾选/取消改变。
const permissions: TreeNode[] = [
  {
    id: "data", label: "工作区数据", children: [
      { id: "data.view", label: "查看记录" },
      { id: "data.edit", label: "编辑记录" },
      { id: "data.delete", label: "删除工作区（仅所有者）", disabled: true },
    ],
  },
  {
    id: "members", label: "成员与权限", children: [
      { id: "members.invite", label: "邀请成员" },
      { id: "members.remove", label: "移除成员" },
    ],
  },
  {
    id: "integrations", label: "集成与密钥", children: [
      { id: "integrations.webhooks", label: "管理回调地址" },
      { id: "integrations.tokens", label: "创建访问令牌" },
    ],
  },
];

const LABELS: Record<string, string> = {
  "data.view": "查看记录", "data.edit": "编辑记录", "data.delete": "删除工作区",
  "members.invite": "邀请成员", "members.remove": "移除成员",
  "integrations.webhooks": "管理回调地址", "integrations.tokens": "创建访问令牌",
};

export default function Demo() {
  const [checked, setChecked] = React.useState<string[]>(["data.view", "data.delete", "members.invite"]);
  const granted = checked.filter(id => id !== "data.delete").map(id => LABELS[id]);
  return <Stack>
    <Tree
      aria-label="成员权限"
      nodes={permissions}
      checkable
      defaultExpandedIds={["data", "members", "integrations"]}
      checkedIds={checked}
      onCheckedChange={setChecked}
    />
    <output className="text-support text-muted-foreground">{granted.length ? `已授予：${granted.join("、")}` : "未授予任何权限"}</output>
  </Stack>;
}
