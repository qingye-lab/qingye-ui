import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";
import { useState } from "react";

export const meta = { title: "长内容与后续操作" };

export default function Demo() {
  const [showFailures, setShowFailures] = useState(false);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        onClick={() => toastManager.add({
          type: "warning",
          title: "设备清单已导入，2 条记录需要处理",
          description: "qingye-device-inventory-2026-10-02-east-region-final.csv：1 条序列号重复，1 条所属仓库不存在。",
          timeout: 0,
          actionProps: { children: "查看失败记录", onClick: () => setShowFailures(true) },
        })}
        variant="outline"
      >
        查看导入结果
      </Button>
      {showFailures ? (
        <ul className="list-disc ps-5 text-sm" aria-label="失败记录">
          <li>第 18 行：序列号 QY-0048 重复。</li>
          <li>第 29 行：仓库「东区临时库」不存在。</li>
        </ul>
      ) : null}
    </div>
  );
}
