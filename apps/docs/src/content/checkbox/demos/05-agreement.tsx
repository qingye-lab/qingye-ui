import { Button } from "@yanqing/ui/components/button";
import { Checkbox } from "@yanqing/ui/components/checkbox";
import { Label } from "@yanqing/ui/components/label";
import { useState } from "react";

export const meta = { title: "组合：提交前确认", description: "未勾选时禁用提交按钮。" };

export default function Demo() {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Label className="items-start font-normal leading-5">
        <Checkbox checked={agreed} onCheckedChange={setAgreed} className="mt-0.5" />
        <span>
          我已阅读并同意<a className="font-medium underline underline-offset-2" href="#terms">《数据处理协议》</a>，并确认上传的设备数据不含个人敏感信息。
        </span>
      </Label>
      <Button disabled={!agreed} className="self-start">开始导入</Button>
    </div>
  );
}
