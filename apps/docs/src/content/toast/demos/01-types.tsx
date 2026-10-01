import { Button } from "@yanqing/ui/components/button";
import { toastManager } from "@yanqing/ui/components/toast";

export const meta = { title: "类型", description: "success、error、warning、info 对应不同的图标与颜色。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        onClick={() => toastManager.add({ type: "success", title: "设备已绑定", description: "YQ-SC-20391 已加入华东仓储。" })}
        variant="outline"
      >
        成功
      </Button>
      <Button
        onClick={() =>
          toastManager.add({ type: "error", priority: "high", title: "同步失败", description: "网络连接中断，请检查后重试。" })
        }
        variant="outline"
      >
        错误
      </Button>
      <Button
        onClick={() => toastManager.add({ type: "warning", title: "存储空间不足", description: "已使用 92%，建议清理过期报表。" })}
        variant="outline"
      >
        警告
      </Button>
      <Button
        onClick={() => toastManager.add({ type: "info", title: "新版本可用", description: "v2.8.0 将于今晚 23:00 自动更新。" })}
        variant="outline"
      >
        提示
      </Button>
    </div>
  );
}
