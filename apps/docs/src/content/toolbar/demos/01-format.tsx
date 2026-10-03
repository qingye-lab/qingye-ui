import { useState } from "react";
import { Stack } from "@qingye/ui/components/layout";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from "@qingye/ui/components/toolbar";
import { Text } from "@qingye/ui/components/typography";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "命令、分组与焦点", titleEn: "Commands, groups and focus" } satisfies DemoMeta;
export default function Demo() {
  const [strong, setStrong] = useState(false);
  return <Stack><Toolbar aria-label="文本操作"><ToolbarGroup aria-label="格式"><ToolbarButton aria-pressed={strong} onClick={() => setStrong(!strong)}>加粗</ToolbarButton><ToolbarButton disabled={!strong} onClick={() => setStrong(false)}>恢复</ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarLink href="/components/typography">文字</ToolbarLink></Toolbar><Text step={strong ? "body-strong" : "body"}>一段文字</Text></Stack>;
}
