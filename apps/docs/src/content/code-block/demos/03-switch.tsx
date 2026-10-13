import { useState } from "react";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "标题栏里的切换", titleEn: "Switch in the title bar" } satisfies DemoMeta;
const commands = { pnpm: "pnpm add @qingye_lab/ui", npm: "npm install @qingye_lab/ui", yarn: "yarn add @qingye_lab/ui" } as const;
type Manager = keyof typeof commands;
export default function Demo() {
  const [manager, setManager] = useState<Manager>("pnpm");
  return <CodeBlock
    title={<SegmentedControl size="sm" aria-label="包管理器" value={manager} onValueChange={value => setManager(value as Manager)}>
      {(Object.keys(commands) as Manager[]).map(name => <SegmentedControlItem key={name} value={name}>{name}</SegmentedControlItem>)}
    </SegmentedControl>}
    code={commands[manager]}
  />;
}
