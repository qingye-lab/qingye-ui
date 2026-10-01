import { Spinner } from "@qingye/ui";

export const meta = { title: "行内", description: "与文字同高，用于「正在同步」「正在上传」这类短提示。" };

export default function Demo() {
  return (
    <div className="flex flex-col gap-3 text-body">
      <p className="inline-flex items-center gap-2 text-muted-foreground">
        <Spinner aria-hidden="true" />
        正在同步设备状态…
      </p>
      <p className="inline-flex items-center gap-2 text-muted-foreground">
        <Spinner aria-hidden="true" className="size-3.5" />
        正在上传 3 个文件
      </p>
    </div>
  );
}
