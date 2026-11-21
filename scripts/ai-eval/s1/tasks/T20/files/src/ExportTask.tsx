export type ExportTaskProps = {
  status: "running" | "cancelled" | "done" | "failed";
  onCancel: () => void;
};

export function ExportTask(_props: ExportTaskProps) {
  return null;
}
