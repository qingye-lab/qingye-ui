import { Button } from "@yanqing/ui";
import { DownloadIcon } from "lucide-react";

export const meta = { title: "图标与状态" };

export default function Demo() {
  return (
    <>
      <Button variant="outline">
        <DownloadIcon />
        导出
      </Button>
      <Button loading>保存中</Button>
      <Button disabled>不可用</Button>
      <Button nativeButton={false} render={<a href="#docs" />} variant="outline">
        作为链接
      </Button>
    </>
  );
}
