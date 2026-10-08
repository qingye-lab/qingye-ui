import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { useDocsLocale } from "@/lib/docs-locale";
import { useState } from "react";
import { CodeView } from "./code-block";
import { CopyCodeButton } from "./copy-code-button";

const managers = [
  { id: "pnpm", command: (pkg: string) => `pnpm add ${pkg}` },
  { id: "npm", command: (pkg: string) => `npm install ${pkg}` },
  { id: "yarn", command: (pkg: string) => `yarn add ${pkg}` },
] as const;

type Manager = (typeof managers)[number]["id"];

/** One install command, shown for each package manager. */
export function InstallTabs({ pkg, downloadCommand }: { pkg: string; downloadCommand?: string }) {
  const en = useDocsLocale() === "en";
  const [current, setCurrent] = useState<Manager>("pnpm");
  const installCommand = (manager: (typeof managers)[number]) =>
    downloadCommand ? `${downloadCommand} && ${manager.command(pkg)}` : manager.command(pkg);
  const command = installCommand(managers.find((manager) => manager.id === current)!);
  return (
    <Tabs
      className="my-(--qy-space-module) gap-0 overflow-hidden rounded-panel bg-surface-inset"
      onValueChange={(value) => setCurrent(value as Manager)}
      value={current}
    >
      <div className="flex items-center justify-between gap-(--qy-field-gap) border-b py-(--qy-fen) ps-(--qy-fen) pe-(--qy-fen)">
        <TabsList aria-label={en ? "Package manager" : "包管理器"}>
          {managers.map((manager) => (
            <TabsTab className="font-mono text-caption" key={manager.id} value={manager.id}>
              {manager.id}
            </TabsTab>
          ))}
        </TabsList>
        <CopyCodeButton value={command} />
      </div>
      {managers.map((manager) => (
        <TabsPanel key={manager.id} value={manager.id}>
          <CodeView code={installCommand(manager)} lang="text" wrap />
        </TabsPanel>
      ))}
    </Tabs>
  );
}
