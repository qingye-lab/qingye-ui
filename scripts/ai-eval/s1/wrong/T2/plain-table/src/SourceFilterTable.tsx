import * as React from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";

export type Source = { id: string; name: string };
export type Lead = { id: string; name: string; sourceId: string; sourceName: string; status: "进行中" | "已暂停" };
export type SourceFilterTableProps = { leads: Lead[]; sources: Source[] };

type Column = { id: string; header: string; accessor: (row: Lead) => string; rowHeader?: boolean; grow?: number; minSize?: number; fit?: boolean };
export const columns: Column[] = [
  { id: "name", header: "名称", accessor: row => row.name, rowHeader: true, grow: 2, minSize: 160 },
  { id: "source", header: "来源", accessor: row => row.sourceName },
  { id: "status", header: "状态", accessor: row => row.status, fit: true },
];

export function SourceFilterTable({ leads, sources }: SourceFilterTableProps) {
  const [sourceId, setSourceId] = React.useState("");
  const items = React.useMemo(() => [{ value: "", label: "全部来源" }, ...sources.map(source => ({ value: source.id, label: source.name }))], [sources]);
  const shown = sourceId ? leads.filter(lead => lead.sourceId === sourceId) : leads;
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>来源</FieldLabel>
        <Select items={items} value={sourceId} onValueChange={value => setSourceId(value ?? "")}>
          <SelectTrigger />
          <SelectPopup>{items.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup>
        </Select>
      </Field>
      <table>
        <caption>线索</caption>
        <thead><tr>{columns.map(column => <th key={column.id} scope="col">{column.header}</th>)}</tr></thead>
        <tbody>{shown.length ? shown.map(row => <tr key={row.id}>{columns.map(column => column.rowHeader ? <th key={column.id} scope="row">{column.accessor(row)}</th> : <td key={column.id}>{column.accessor(row)}</td>)}</tr>) : <tr><td colSpan={3}>没有线索</td></tr>}</tbody>
      </table>
    </div>
  );
}
