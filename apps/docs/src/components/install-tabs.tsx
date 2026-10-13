import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { useDocsLocale } from "@/lib/docs-locale";
import { useState } from "react";
import { CodeBlock } from "./code-block";

const managers = [
  { id: "pnpm", command: (pkg: string) => `pnpm add ${pkg}` },
  { id: "npm", command: (pkg: string) => `npm install ${pkg}` },
  { id: "yarn", command: (pkg: string) => `yarn add ${pkg}` },
] as const;

type Manager = (typeof managers)[number]["id"];

/** One install command; the package manager is one value chosen in the block's title bar, and the block copies that command. */
export function InstallTabs({ pkg, downloadCommand }: { pkg: string; downloadCommand?: string }) {
  const en = useDocsLocale() === "en";
  const [current, setCurrent] = useState<Manager>("pnpm");
  const manager = managers.find((item) => item.id === current)!;
  const command = downloadCommand ? `${downloadCommand} && ${manager.command(pkg)}` : manager.command(pkg);
  return (
    <CodeBlock
      code={command}
      lang="text"
      title={
        <SegmentedControl aria-label={en ? "Package manager" : "包管理器"} onValueChange={(value) => setCurrent(value as Manager)} size="sm" value={current}>
          {managers.map((item) => (
            <SegmentedControlItem key={item.id} value={item.id}>
              {item.id}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      }
      wrap
    />
  );
}
