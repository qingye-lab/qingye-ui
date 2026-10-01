import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";
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
  const [current, setCurrent] = useState<Manager>("pnpm");
  const installCommand = (manager: (typeof managers)[number]) =>
    downloadCommand ? `${downloadCommand} && ${manager.command(pkg)}` : manager.command(pkg);
  const command = installCommand(managers.find((manager) => manager.id === current)!);
  return (
    <Tabs
      className="my-5 gap-0 overflow-hidden rounded-xl border bg-surface-subtle dark:bg-surface"
      onValueChange={(value) => setCurrent(value as Manager)}
      value={current}
    >
      <div className="flex items-center justify-between gap-2 border-b py-1 ps-1.5 pe-1.5">
        <TabsList aria-label="包管理器" size="sm" variant="underline">
          {managers.map((manager) => (
            <TabsTab className="font-mono text-xs" key={manager.id} value={manager.id}>
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
