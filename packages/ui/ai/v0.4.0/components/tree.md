# 树 Tree

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/tree
Source: packages/ui/src/components/tree.tsx
Source SHA-256: d5a361f163023cf9f6f77772ec1e02302b20680b8b7353e7a9b401f8fe7e9af4

展示层级数据并支持展开、收起与单选，例如文件目录、组织架构、商品类目。以方向键在可见节点间移动，支持键入查找。

## Use and ownership
- 对象确有层级，用户需要展开、选中和在可见节点间定位。
- Avoid: 把所有菜单改成树；父节点名字包含整棵子树；禁用或删除当前节点后焦点留在无效位置。
- Library: 树语义、键盘/键入查找、单一 Tab 点和焦点恢复。
- Application: 稳定 ID、节点数据、惰性加载/失败/重试、展开策略与选中含义。

## Composition
- 每个 treeitem 只关联自己的 label 与 suffix；展开和选择分别受控，节点不可用时回到可见上下文而不擅自选择。

## Responsive behavior
- 缩进占用容量时允许宿主增宽或缩短可见名称，完整可访问名称保留；suffix 不挤掉识别。

## Customization
- textValue 支持复杂标签查找；guides 只是层级辅助，不改变可见关系。

## Current exports
- Tree: function; owner tree; PASS; props: TreeProps
- TreeNode: type; owner tree; PASS
- TreeProps: type; owner tree; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Tree
渲染 role="tree" 的 <ul>，子节点位于 role="group" 中；其余属性透传到根元素。
- nodes: TreeNode[]. 节点：{ id, label, children?, hasChildren?, icon?, expandedIcon?, suffix?, textValue?, disabled? }。
- label: string. 无障碍名称；也可传 aria-labelledby。
- value / defaultValue: string | null. 选中的节点 id（单选）。
- onValueChange: (id, node) => void. 选中变化。
- expanded / defaultExpanded: string[]. 展开的节点 id。
- onExpandedChange: (ids) => void. 展开变化。
- expandOnClick: boolean; default true. 点击父节点整行时同时展开或收起；关闭后只有箭头切换。
- guides: boolean; default true. 沿展开的分支显示缩进参考线。

### TreeNode
节点数据。
- icon / expandedIcon: ReactNode. 前置图标；expandedIcon 在展开时替换，如打开的文件夹。
- suffix: ReactNode. 行尾内容，如数量、大小或徽章。
- textValue: string. label 不是纯文本时用于键入查找。
- disabled: boolean. 不可聚焦、选中或展开。
- hasChildren: boolean. 惰性父节点尚无 children 时声明展开能力；加载、错误和重试由应用负责。

## Keyboard
- ↓ / ↑: 移动到下一个 / 上一个可见节点，跳过禁用节点。
- →: 展开收起的节点；已展开时移动到第一个子节点。
- ←: 收起展开的节点；否则移动到父节点。
- Home / End: 移动到第一个 / 最后一个可见节点。
- Enter: 选中节点；父节点同时展开或收起。
- Space: 选中节点。
- *: 展开当前层级的所有兄弟节点。
- 字母或文字: 跳到下一个以输入内容开头的可见节点。

## Source examples
### 文件目录
Source: apps/docs/src/content/tree/demos/01-files.tsx
```tsx
import type { TreeNode } from "@qingye/ui/components/tree";
import { Tree } from "@qingye/ui/components/tree";
import { FileCodeIcon, FileJsonIcon, FileTextIcon, FolderIcon, FolderOpenIcon } from "lucide-react";

export const meta = { title: "文件目录", description: "文件夹展开时切换图标；参考线标出所在分支。" };

const folder = { icon: <FolderIcon />, expandedIcon: <FolderOpenIcon /> };

const nodes: TreeNode[] = [
  {
    id: "src",
    label: "src",
    ...folder,
    children: [
      {
        id: "components",
        label: "components",
        ...folder,
        children: [
          { id: "button", label: "button.tsx", icon: <FileCodeIcon /> },
          { id: "dialog", label: "dialog.tsx", icon: <FileCodeIcon /> },
          { id: "table", label: "table.tsx", icon: <FileCodeIcon /> },
        ],
      },
      { id: "hooks", label: "hooks", ...folder, children: [{ id: "media", label: "use-media-query.ts", icon: <FileCodeIcon /> }] },
      { id: "index", label: "index.ts", icon: <FileCodeIcon /> },
    ],
  },
  { id: "docs", label: "docs", ...folder, children: [{ id: "guide", label: "快速上手.md", icon: <FileTextIcon /> }] },
  { id: "package", label: "package.json", icon: <FileJsonIcon /> },
  { id: "readme", label: "README.md", icon: <FileTextIcon /> },
];

export default function Demo() {
  return <Tree className="w-full max-w-xs" defaultExpanded={["src", "components"]} defaultValue="table" label="项目文件" nodes={nodes} />;
}
```

### 受控展开与选中
Source: apps/docs/src/content/tree/demos/02-controlled.tsx
```tsx
import type { TreeNode } from "@qingye/ui/components/tree";
import { Button } from "@qingye/ui/components/button";
import { Tree } from "@qingye/ui/components/tree";
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
```

### 行尾信息与禁用
Source: apps/docs/src/content/tree/demos/03-suffix-disabled.tsx
```tsx
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
```

### 惰性节点与应用加载
Source: apps/docs/src/content/tree/demos/04-lazy.tsx
```tsx
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
```

### 访问状态变化
Source: apps/docs/src/content/tree/demos/05-availability.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Tree } from "@qingye/ui/components/tree";
import { useState } from "react";

export const meta = { title: "访问状态变化" };

export default function Demo() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Tree label="工作文件" nodes={[
        { id: "draft", label: "设计草稿" },
        { id: "report", label: "季度报告", disabled: paused },
        { id: "archive", label: "归档记录" },
      ]} />
      <Button aria-pressed={paused} onClick={() => setPaused(!paused)} size="sm" variant="outline">
        {paused ? "恢复报告访问" : "暂停报告访问"}
      </Button>
    </div>
  );
}
```

