# 层级集合 Tree

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/tree
Source: packages/ui/src/components/tree.tsx
Source SHA-256: 39ad8a6be1d75c91bd52d2cc9ead3ec18a399b4bc2eba27362b6fa2f9537b93a

稳定节点的层级、展开、焦点、独立单选与可选的级联勾选。

## Decision
expandedIds 与 selectedId 分开；加载与失败是组件自己看得见的事实，不当成「没有子项」；过滤只隐藏、不改变值与派生的勾选状态；拖放只报告、不持有数据。聚焦不选择，隐藏节点不强行清除既有选择。checkable 与 selectable 的点击不组合：checkable 为 true 时行点击与 Space 勾选，不再单选，避免同一次点击承担两种互相冲突的意图。checkedIds 只含叶子节点 id；分支的勾选是派生显示（true / false / mixed），从不写回值，避免「勾一个分支」被多计成 N+1 项。级联只触达启用的叶子：禁用节点保留给定的勾选事实，不被祖先的勾选/取消改变；分支在其启用的叶子后代全部勾选时显示为已勾选，即使存在未勾选的禁用后代。

## Notes
- 移除焦点节点回到可用节点；清空回到拥有焦点的容器，不抢走外部焦点。
- 拖放只报告意图，不改数据：移动是否成立、节点放在哪里由调用方决定，所以同一套规则和同一个 onMove 服务指针与键盘两条路径。draggable 时 Enter 仍是选择，取起用 Ctrl/⌘+X，不抢占已有键。

## Use and ownership
- 真实层级需要键盘定位和独立选择。
- Avoid: 平面比较用 DataTable；请求本身由调用方发起，Tree 只管理加载中与失败的状态。收进触发器的选择用 TreeSelect。
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
- TREE_TYPEAHEAD_MS: const; owner tree; UNVERIFIED
- TreeChangeDetails: interface; owner tree; PASS
- TreeCheckedState: type; owner tree; PASS
- TreeMove: interface; owner tree; PASS
- TreeMoveDetails: interface; owner tree; PASS
- TreeNode: interface; owner tree; PASS
- TreeProps: type; owner tree; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Tree
- `canDrop?`: `(move: TreeMove) => boolean`. 在内置规则（不能放进自己或自己的后代、位置不变的移动无效）之外再收紧：返回 false 的移动不可放置。
- `checkable?`: `boolean`. 级联多选模式：与 selectable 的单选高亮不组合（见组件源码顶部注释与文档 decisions）。
- `checkedIds?`: `readonly string[]`. 只含叶子节点 id：分支的勾选只是显示派生，不是业务事实，不写回值，避免「选中一个分支」被多计成 N+1 项。
- `defaultCheckedIds?`: `readonly string[]`.
- `defaultExpandedIds?`: `readonly string[]`.
- `defaultFocusedId?`: `string | null`. 首次渲染时 roving 入口（tabIndex=0）所在的节点；默认是第一个可用节点。只是初值：之后焦点怎么走由用户决定。 节点不可见（祖先未展开）或不可用时退回到它最近的可见可用祖先，再退回第一个可用节点（与焦点节点被移除时同一条规则）。 弹层里的树（TreeSelect）靠它让进入时的焦点落在已选节点上；展开其祖先由调用方通过 expandedIds 负责。
- `defaultSelectedId?`: `string | null`.
- `disabled?`: `boolean`.
- `draggable?`: `boolean`. 允许拖动节点改变位置，同时开启键盘等价操作（Ctrl/⌘+X 取起，Alt+↑ / Alt+↓ / Alt+Enter 放到当前节点之前 / 之后 / 之中，Esc 取消）。 Tree 不持有数据：只通过 onMove 报告一次移动，调用方改 nodes。禁用的节点既不能拖动也不能作为目标。
- `emptyContent?`: `React.ReactNode`.
- `expandedIds?`: `readonly string[]`.
- `loadChildren?`: `(node: TreeNode) => Promise<readonly TreeNode[]>`. 展开一个没有 children 的非叶子节点时调用，返回它的子项；首次展开才取，失败（reject）显示可重试的错误。 取回的子项由 Tree 保管（按节点 id），调用方不必合并回 nodes；id 仍须全树唯一。取回为空数组即成为叶子。
- `nodes`: `readonly TreeNode[]`.
- `onCheckedChange?`: `(ids: string[], details: TreeChangeDetails) => void`.
- `onExpandedChange?`: `(ids: string[], details: TreeChangeDetails) => void`.
- `onMove?`: `(move: TreeMove, details: TreeMoveDetails) => void`.
- `onSelectionChange?`: `(id: string | null, details: TreeChangeDetails) => void`.
- `query?`: `string`. 按名称筛选：只显示名称含它的节点（不分大小写）及这些节点的祖先，命中的文字被标出。筛选期间有命中后代的分支一律展开（展开钮此时不起作用， 也不触发 onExpandedChange），清空后回到 expandedIds 决定的展开状态。不改变勾选的派生：分支的勾选仍由它的全部叶子后代决定， 筛选只是看不见一部分。空串等于不筛选。
- `selectable?`: `boolean`.
- `selectedId?`: `string | null`.
- plus 279 inherited (@types/react 278, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Tree
完整层级集合。
- nodes: readonly TreeNode[]. id/label 必须非空且 id 全树唯一；disabled 与 children 显式提供。isLeaf 声明没有子项，使配了 loadChildren 时也不去加载它。
- expandedIds / defaultExpandedIds / onExpandedChange: readonly string[] / callback. 展开独立于选择；details.cancel() 不提交。
- selectedId / defaultSelectedId / onSelectionChange: string | null / callback. 单选独立于焦点，可取消；不猜测业务状态。
- selectable / disabled / emptyContent: boolean / ReactNode. 默认 selectable=true；空树可聚焦，内容由调用方或 locale 提供。
- checkable: boolean. 开启级联多选勾选模式；默认 false。为 true 时行点击与 Space 勾选当前节点，selectable 的单选点击不再生效。
- checkedIds / defaultCheckedIds / onCheckedChange: readonly string[] / callback. 只含叶子节点 id；details.cancel() 不提交。勾选一个分支会把它启用的叶子后代一并加入或移出集合；禁用的叶子保留给定事实，不被级联改变。
- defaultFocusedId: string | null. 首次渲染时 roving 入口所在的节点，默认是第一个可用节点；节点不可见或不可用时退回最近的可见可用祖先。展开其祖先由调用方通过 expandedIds 负责。TreeSelect 用它让弹层打开时焦点落在已选节点上。
- loadChildren: (node: TreeNode) => Promise<readonly TreeNode[]>. 第一次展开一个没有 children、也没有标 isLeaf 的节点时调用（命名与 Cascader 一致）。等待时该节点标 aria-busy，并在其下显示 locale 的「正在加载」；reject 时显示「加载失败」与重试按钮（节点上按 → 也可重试）；结果为空数组则该节点成为叶子。结果按节点缓存，组件不重复请求。未加载的分支在 checkable 模式下不能被勾选，点它只会展开。
- query: string. 按标签过滤：保留匹配的节点及其全部祖先，其余隐藏，匹配的文字用 mark 标出，无匹配时显示 emptyContent。有匹配后代的分支被强制展开（此时它的展开开关不起作用，也不触发 onExpandedChange），清空 query 后回到原来的展开状态。过滤只隐藏：分支的勾选状态与级联仍按完整的树计算。传原始字符串即可，匹配不区分大小写并忽略首尾空白。
- draggable / onMove / canDrop: boolean / (move: TreeMove, details: { event, reason: "keyboard" | "pointer" }) => void / (move: TreeMove) => boolean. draggable 打开调整位置：指针拖放按落点在行内的位置报告 before（上四分之一）、after（下四分之一）或 inside（中间），并画出插入线；键盘用 Ctrl/⌘+X 取起、Alt+↑ / ↓ / Enter 放到当前节点之前 / 之后 / 之内。Tree 不持有数据，只通过 onMove({ nodeId, targetId, position }) 报告，调用方改 nodes。不能放到自身或自身子树里、不能是位置不变的移动、禁用的节点既不能拖也不能作目标；canDrop 返回 false 可进一步禁止。取起、放下、取消与不允许的位置都通过 role=status 的区域播报。
- aria-label / aria-labelledby: string. 必填其一：树的名称，落在 role=tree 的根上；缺失或为空时抛错。各节点的名称来自节点自己的 label。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard
- ↑ / ↓ / Home / End: 在可见且可用节点间移动。
- ← / →: 关闭/展开或移动到父/子节点；RTL 相反。展开与收起由方向键承担；行首的展开图标只供指针使用，不进 Tab 序列，也不进可访问树。
- Ctrl/⌘+X，Alt+↑ / ↓ / Enter，Esc: 仅 draggable：Ctrl/⌘+X 取起当前节点，方向键移动焦点，Alt+↑ 放到焦点节点之前、Alt+↓ 放到之后、Alt+Enter 放到之内，Esc 或焦点离开则取消。每一步都有播报。
- Enter / Space / 字首: 单选当前节点，或键入标签开头定位：连续键入的字符（间隔 500ms 内，预设）累积成前缀；重复键入同一个字符则在以它开头的节点间循环。checkable 模式下 Space 改为勾选/取消勾选当前节点及其启用的叶子后代，Enter 不触发单选。

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

### 按需加载子项
Source: apps/docs/src/content/tree/demos/03-lazy.tsx
```tsx
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
```

### 拖动调整顺序
Source: apps/docs/src/content/tree/demos/04-reorder.tsx
```tsx
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
function detach(list: readonly TreeNode[], id: string): { rest: TreeNode[]; found?: TreeNode } {
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
```
