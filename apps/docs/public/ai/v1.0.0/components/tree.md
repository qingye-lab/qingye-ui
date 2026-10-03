# 层级集合 Tree

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/tree
Source: packages/ui/src/components/tree.tsx
Source SHA-256: d4c43d05973b84b4b6f339eb596be20217253b844c00f246793bd671b303fbde

稳定节点的层级、展开、焦点与独立单选。

## Decision
expandedIds 与 selectedId 分开；聚焦不选择，隐藏节点不强行清除既有选择。

## Notes
- 移除焦点节点回到可用节点；清空回到拥有焦点的容器，不抢走外部焦点。

## Use and ownership
- 真实层级需要键盘定位和独立选择。
- Avoid: 平面比较用 DataTable；不内置懒加载、多选或请求。
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
- TreeNode: interface; owner tree; PASS
- TreeProps: type; owner tree; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Tree
完整层级集合。
- nodes: readonly TreeNode[]. id/label 必须非空且 id 全树唯一；disabled 与 children 显式提供。
- expandedIds / defaultExpandedIds / onExpandedChange: readonly string[] / callback. 展开独立于选择；details.cancel() 不提交。
- selectedId / defaultSelectedId / onSelectionChange: string | null / callback. 单选独立于焦点，可取消；不猜测业务状态。
- selectable / disabled / emptyContent: boolean / ReactNode. 默认 selectable=true；空树可聚焦，内容由调用方或 locale 提供。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard
- ↑ / ↓ / Home / End: 在可见且可用节点间移动。
- ← / →: 关闭/展开或移动到父/子节点；RTL 相反。
- Enter / Space / 字首: 单选当前节点，或按标签字首定位。

## Source examples
### 展开与独立选择
Source: apps/docs/src/content/tree/demos/01-task.tsx
```tsx
import * as React from "react";
import { Tree, type TreeNode } from "@qingye/ui/components/tree";
import { Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "展开与独立选择", titleEn: "Expansion and independent selection" } satisfies DemoMeta;
const nodes: TreeNode[] = [{ id: "group", label: "集合 A", children: [{ id: "a", label: "条目 A" }, { id: "b", label: "条目 B", disabled: true }] }, { id: "c", label: "条目 C" }];
export default function Demo() { const [selected, setSelected] = React.useState<string | null>(null); return <Stack><Tree aria-label="本地层级集合" nodes={nodes} defaultExpandedIds={["group"]} selectedId={selected} onSelectionChange={setSelected} /><output className="text-support">{selected ? `已选标识：${selected}` : "未选择"}</output></Stack>; }
```
