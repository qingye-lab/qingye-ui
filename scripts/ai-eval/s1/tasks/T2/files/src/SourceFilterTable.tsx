export type Source = { id: string; name: string };
export type Lead = { id: string; name: string; sourceId: string; sourceName: string; status: "进行中" | "已暂停" };
export type SourceFilterTableProps = { leads: Lead[]; sources: Source[] };

// 导出供其它页面复用的列定义，元素类型取决于你所用的表格组件。
export const columns: unknown[] = [];

export function SourceFilterTable(_props: SourceFilterTableProps) {
  return null;
}
