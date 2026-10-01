const e=`import { Button } from "@qingye/ui/components/button";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";
import { CircleCheckIcon, FileArchiveIcon, FileImageIcon, FileTextIcon, RotateCwIcon } from "lucide-react";

export const meta = { title: "组合：上传列表", description: "每个文件一条进度；完成和失败的文件换成状态说明与操作。" };

export default function Demo() {
  return (
    <ul className="w-full max-w-md divide-y rounded-xl border">
      <li className="flex items-center gap-3 p-3">
        <FileImageIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <Progress className="min-w-0 flex-1 gap-1.5" value={72}>
          <div className="flex items-center justify-between gap-2">
            <ProgressLabel className="truncate">门店实拍-徐汇店.jpg</ProgressLabel>
            <ProgressValue className="text-muted-foreground text-xs" />
          </div>
          <ProgressTrack className="h-1">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </li>
      <li className="flex items-center gap-3 p-3">
        <FileArchiveIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <Progress className="min-w-0 flex-1 gap-1.5" max={86} value={15}>
          <div className="flex items-center justify-between gap-2">
            <ProgressLabel className="truncate">2026年9月订单导出.zip</ProgressLabel>
            <ProgressValue className="text-muted-foreground text-xs">
              {(_, value) => \`\${value} / 86 MB\`}
            </ProgressValue>
          </div>
          <ProgressTrack className="h-1">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </li>
      <li className="flex items-center gap-3 p-3">
        <FileTextIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-medium text-sm">供应商合同-云杉科技.pdf</span>
          <span className="flex items-center gap-1 text-success-foreground text-xs">
            <CircleCheckIcon aria-hidden="true" className="size-3.5" />
            已上传 · 2.4 MB
          </span>
        </div>
      </li>
      <li className="flex items-center gap-3 p-3">
        <FileImageIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-medium text-sm">新品海报-秋季.png</span>
          <span className="text-destructive-foreground text-xs">上传失败：文件超过 20 MB</span>
        </div>
        <Button size="icon-sm" variant="ghost" aria-label="重试上传 新品海报-秋季.png">
          <RotateCwIcon aria-hidden="true" />
        </Button>
      </li>
    </ul>
  );
}
`;export{e as default};
