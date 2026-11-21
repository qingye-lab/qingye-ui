import { useEffect, useRef, useState } from "react";
import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { AlertDialog, AlertDialogClose, AlertDialogFooter, AlertDialogHeader, AlertDialogPanel, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye_lab/ui/components/alert-dialog";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";

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

type Result = { query: string; items: Owner[] };

export function WorkspaceSettings({ workspace, regions, searchOwners, onOwnerChange, onRegionChange }: WorkspaceSettingsProps) {
  const [regionId, setRegionId] = useState(workspace.regionId);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [openedVersion, setOpenedVersion] = useState(workspace.version);
  const generation = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    const request = ++generation.current;
    searchOwners(query, controller.signal).then(
      items => { if (!controller.signal.aborted && request === generation.current) setResult({ query, items }); },
      () => { if (!controller.signal.aborted && request === generation.current) setResult({ query, items: [] }); },
    );
    return () => controller.abort();
  }, [query, searchOwners]);

  const current = result?.query === query ? result : null;
  const regionName = (id: string) => regions.find(region => region.id === id)?.name ?? id;
  const items = regions.map(region => ({ value: region.id, label: region.name }));

  return (
    <div className="grid gap-(--qy-field-group-gap)">
      <Field>
        <FieldLabel>数据区域</FieldLabel>
        <Select items={items} value={regionId} onValueChange={value => { if (value) setRegionId(value); }}>
          <SelectTrigger />
          <SelectPopup>{items.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup>
        </Select>
      </Field>
      <Field>
        <FieldLabel>负责人</FieldLabel>
        <ComboboxSelect<Owner>
          items={current?.items ?? []}
          itemToStringLabel={item => item.name}
          isItemEqualToValue={(a, b) => a.id === b.id}
          filter={null}
          value={owner}
          onValueChange={next => { setOwner(next); onOwnerChange(next?.id ?? null); }}
          inputValue={query}
          onInputValueChange={next => { if (next !== query) setQuery(next); }}
          loading={current === null}
          emptyContent="没有匹配的成员"
        />
      </Field>
      <AlertDialog onOpenChange={open => { if (open) setOpenedVersion(workspace.version); }}>
        <AlertDialogTrigger render={<Button variant="bordered" disabled={regionId === workspace.regionId} />}>应用区域变更</AlertDialogTrigger>
        <AlertDialogPopup>
          <AlertDialogHeader><AlertDialogTitle>确认区域变更</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogPanel><p>{workspace.name}</p><p>版本: {openedVersion}</p><p>{regionName(workspace.regionId)} → {regionName(regionId)}</p></AlertDialogPanel>
          <AlertDialogFooter>
            <Button onClick={() => { void onRegionChange({ workspaceId: workspace.id, version: openedVersion, regionId }); }}>确认变更</Button>
            <AlertDialogClose render={<Button variant="quiet" />}>返回</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </div>
  );
}
