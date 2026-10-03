import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "同一条目的两个视角", titleEn: "Two views of one item" } satisfies DemoMeta;
export default function Demo() { return <Tabs defaultValue="text"><TabsList aria-label="条目视角"><TabsTab value="text">名称</TabsTab><TabsTab value="facts">事实</TabsTab><TabsTab value="unused" disabled>历史</TabsTab></TabsList><TabsPanel value="text"><Field><FieldLabel>名称草稿</FieldLabel><Input defaultValue="条目 A" /></Field></TabsPanel><TabsPanel value="facts"><dl className="m-0 text-body"><dt>标识</dt><dd className="m-0">a</dd><dt>数量</dt><dd className="m-0">0</dd></dl></TabsPanel></Tabs>; }
