import * as React from "react";
import { Tree, type TreeNode } from "@qingye/ui/components/tree";
import { Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "展开与独立选择", titleEn: "Expansion and independent selection" } satisfies DemoMeta;
const nodes: TreeNode[] = [{ id: "group", label: "集合 A", children: [{ id: "a", label: "条目 A" }, { id: "b", label: "条目 B", disabled: true }] }, { id: "c", label: "条目 C" }];
export default function Demo() { const [selected, setSelected] = React.useState<string | null>(null); return <Stack><Tree aria-label="本地层级集合" nodes={nodes} defaultExpandedIds={["group"]} selectedId={selected} onSelectionChange={setSelected} /><output className="text-support">{selected ? `已选标识：${selected}` : "未选择"}</output></Stack>; }
