# 层级集合 Tree

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/tree
Source: packages/ui/src/components/tree.tsx
Source SHA-256: 38c0504d872a020cf747b8dd04eddc2042f137944353984b40b82e789cba965c

稳定节点的层级、展开、焦点、独立单选与可选的级联勾选。

## Decision
expandedIds 与 selectedId 分开；聚焦不选择，隐藏节点不强行清除既有选择。checkable 与 selectable 的点击不组合：checkable 为 true 时行点击与 Space 勾选，不再单选，避免同一次点击承担两种互相冲突的意图。checkedIds 只含叶子节点 id；分支的勾选是派生显示（true / false / mixed），从不写回值，避免「勾一个分支」被多计成 N+1 项。级联只触达启用的叶子：禁用节点保留给定的勾选事实，不被祖先的勾选/取消改变；分支在其启用的叶子后代全部勾选时显示为已勾选，即使存在未勾选的禁用后代。

## Notes
- 移除焦点节点回到可用节点；清空回到拥有焦点的容器，不抢走外部焦点。

## Use and ownership
- 真实层级需要键盘定位和独立选择。
- Avoid: 平面比较用 DataTable；不内置懒加载、多选或请求。
- Avoid: 同一棵树里混用 checkable 与 selectable 的点击语义：一次点击只承担一种意图。
- Library: roving focus、稳定 key 与焦点恢复。
- Application: 节点、展开、选择、禁用与空/未知语义。

## Composition
- Tree：完整层级集合。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

## Current exports
- Tree: function; owner tree; PASS; props: TreeProps
- TreeChangeDetails: interface; owner tree; PASS
- TreeCheckedState: type; owner tree; PASS
- TreeNode: interface; owner tree; PASS
- TreeProps: type; owner tree; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Tree
完整层级集合。
- nodes: readonly TreeNode[]. id/label 必须非空且 id 全树唯一；disabled 与 children 显式提供。
- expandedIds / defaultExpandedIds / onExpandedChange: readonly string[] / callback. 展开独立于选择；details.cancel() 不提交。
- selectedId / defaultSelectedId / onSelectionChange: string | null / callback. 单选独立于焦点，可取消；不猜测业务状态。
- selectable / disabled / emptyContent: boolean / ReactNode. 默认 selectable=true；空树可聚焦，内容由调用方或 locale 提供。
- checkable: boolean. 开启级联多选勾选模式；默认 false。为 true 时行点击与 Space 勾选当前节点，selectable 的单选点击不再生效。
- checkedIds / defaultCheckedIds / onCheckedChange: readonly string[] / callback. 只含叶子节点 id；details.cancel() 不提交。勾选一个分支会把它启用的叶子后代一并加入或移出集合；禁用的叶子保留给定事实，不被级联改变。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard
- ↑ / ↓ / Home / End: 在可见且可用节点间移动。
- ← / →: 关闭/展开或移动到父/子节点；RTL 相反。
- Enter / Space / 字首: 单选当前节点，或按标签字首定位。checkable 模式下 Space 改为勾选/取消勾选当前节点及其启用的叶子后代，Enter 不触发单选。

## Source examples
### 展开与独立选择
Source: apps/docs/src/content/tree/demos/01-task.tsx
```tsx
import * as React from "react";
import { Tree, type TreeNode } from "@qingye_lab/ui/components/tree";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "展开与独立选择", titleEn: "Expansion and independent selection" } satisfies DemoMeta;

// 层级是真实的一小段目录结构：展开与选择互不牵连（禁用项仍可见）。
const nodes: TreeNode[] = [
  {
    id: "settings", label: "设置", children: [
      { id: "notifications", label: "通知" },
      { id: "sync", label: "同步", disabled: true },
    ],
  },
  { id: "members", label: "成员" },
];

export default function Demo() {
  const [selected, setSelected] = React.useState<string | null>(null);
  return <Stack>
    <Tree aria-label="本地层级集合" nodes={nodes} defaultExpandedIds={["settings"]} selectedId={selected} onSelectionChange={setSelected} />
    <output className="text-support text-muted-foreground">{selected ? `已选：${selected === "notifications" ? "通知" : selected === "sync" ? "同步" : "成员"}` : "未选择"}</output>
  </Stack>;
}
```

### 级联勾选：成员权限
Source: apps/docs/src/content/tree/demos/02-checkable.tsx
```tsx
import * as React from "react";
import { Tree, type TreeNode } from "@qingye_lab/ui/components/tree";
import { Stack } from "@qingye_lab/ui/components/layout";
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
```
