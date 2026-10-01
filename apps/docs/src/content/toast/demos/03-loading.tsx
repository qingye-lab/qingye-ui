import { Button } from "@yanqing/ui/components/button";
import { toastManager } from "@yanqing/ui/components/toast";

export const meta = { title: "加载中", description: "type=\"loading\" 显示旋转图标，任务结束后用 update 换成结果。" };

export default function Demo() {
  return (
    <Button
      onClick={() => {
        const id = toastManager.add({ type: "loading", title: "正在生成报表…", description: "共 1,286 条记录", timeout: 0 });
        setTimeout(() => {
          toastManager.update(id, { type: "success", title: "报表已生成", description: "已发送到 finance@yanqing.cn", timeout: 4000 });
        }, 2000);
      }}
      variant="outline"
    >
      生成报表
    </Button>
  );
}
