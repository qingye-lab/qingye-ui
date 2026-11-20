export type Region = { id: string; name: string };
export type Owner = { id: string; name: string };
export type Workspace = { id: string; name: string; version: number; regionId: string; ownerId: string | null };
export type RegionChange = { workspaceId: string; version: number; regionId: string };
export type WorkspaceSettingsProps = {
  workspace: Workspace;
  regions: Region[];
  searchOwners: (query: string, signal: AbortSignal) => Promise<Owner[]>;
  onOwnerChange: (ownerId: string | null) => void;
  onRegionChange: (change: RegionChange) => Promise<void>;
};

export function WorkspaceSettings(_props: WorkspaceSettingsProps) {
  return null;
}
