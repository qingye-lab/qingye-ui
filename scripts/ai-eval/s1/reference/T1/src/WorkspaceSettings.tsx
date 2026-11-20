import { useEffect, useRef, useState } from "react";
import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";
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
  const [saving, setSaving] = useState(false);
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
      <ConfirmAction
        snapshot={{ objectId: workspace.id, objectLabel: workspace.name, version: workspace.version, change: `${regionName(workspace.regionId)} → ${regionName(regionId)}`, consequence: "工作区数据将迁移到新区域。" }}
        title="确认区域变更"
        triggerLabel="应用区域变更"
        actionLabel="确认变更"
        tone="neutral"
        disabled={regionId === workspace.regionId}
        loading={saving}
        onConfirm={async snapshot => {
          setSaving(true);
          try { await onRegionChange({ workspaceId: snapshot.objectId, version: Number(snapshot.version), regionId }); }
          finally { setSaving(false); }
        }}
      />
    </div>
  );
}
