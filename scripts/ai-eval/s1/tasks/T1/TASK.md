# T1 工作区设置

在 `src/WorkspaceSettings.tsx` 实现并导出 `WorkspaceSettings` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type Region = { id: string; name: string };
export type Owner = { id: string; name: string };
export type Workspace = { id: string; name: string; version: number; regionId: string; ownerId: string | null };
export type RegionChange = { workspaceId: string; version: number; regionId: string };
export type WorkspaceSettingsProps = {
  workspace: Workspace;
  regions: Region[];                       // 固定三项左右
  searchOwners: (query: string, signal: AbortSignal) => Promise<Owner[]>;
  onOwnerChange: (ownerId: string | null) => void;
  onRegionChange: (change: RegionChange) => Promise<void>;
};
```

## 需求

1. **数据区域**：可见标签为“数据区域”，从 `regions` 中选一项，初始为 `workspace.regionId`。
2. **负责人**：可见标签为“负责人”，可输入文字搜索成员。
   - 每次查询调用 `searchOwners(输入的文字, signal)`。
   - 匹配由服务器完成（支持拼音、工号等）。
   - 用户连续输入时，显示的候选始终对应最后一次输入。
   - 选中某人后调用 `onOwnerChange(该成员 id)`。
3. **应用区域变更**：一个名称为“应用区域变更”的按钮。
   - 所选区域与 `workspace.regionId` 相同时不可用。
   - 点击后先弹出确认对话框，对话框中显示工作区名称、当前版本号（形如“版本: 3”或“版本 3”）和变更内容，变更内容写作“原区域名 → 新区域名”（例如“华东 → 华北”）。
   - 对话框中名称为“确认变更”的按钮提交：调用一次 `onRegionChange({ workspaceId, version, regionId })`。
   - 关闭对话框（例如按 Esc）不提交。
   - 其他人可能同时修改工作区：对话框打开期间 `workspace.version` 可能变化，用户确认的必须是最新版本。

允许修改：`src/WorkspaceSettings.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
