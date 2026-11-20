import * as React from "react";
import { DataTablePattern, type DataTablePatternColumn } from "@qingye_lab/ui/components/data-table";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";

export type Source = { id: string; name: string };
export type Lead = { id: string; name: string; sourceId: string; sourceName: string; status: "进行中" | "已暂停" };
export type SourceFilterTableProps = { leads: Lead[]; sources: Source[] };

export const columns: DataTablePatternColumn<Lead>[] = [
  { id: "name", header: "名称", accessor: row => row.name, rowHeader: true, grow: 2, minSize: 160 },
  { id: "source", header: "来源", accessor: row => row.sourceName },
  { id: "status", header: "状态", accessor: row => row.status, fit: true },
];

export function SourceFilterTable({ leads, sources }: SourceFilterTableProps) {
  const [sourceId, setSourceId] = React.useState<string | null>(null);
  const items = React.useMemo(() => [...sources.map(source => ({ value: source.id, label: source.name }))], [sources]);
  const shown = sourceId ? leads.filter(lead => lead.sourceId === sourceId) : leads;
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>来源</FieldLabel>
        <Select items={items} value={sourceId} onValueChange={value => setSourceId(value)}>
          <SelectTrigger placeholder="全部来源" />
          <SelectPopup>{items.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup>
        </Select>
      </Field>
      <DataTablePattern data={shown} columns={columns} getRowId={row => row.id} caption="线索" emptyContent="没有线索" />
    </div>
  );
}
