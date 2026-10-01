import { Button } from "@yanqing/ui/components/button";
import { toastManager } from "@yanqing/ui/components/toast";

export const meta = { title: "带操作按钮", description: "可撤销的操作给出“撤销”，并适当延长显示时间。" };

export default function Demo() {
  return (
    <Button
      onClick={() => {
        const id = toastManager.add({
          type: "success",
          title: "已归档 3 张工单",
          timeout: 8000,
          actionProps: {
            children: "撤销",
            onClick: () => {
              toastManager.close(id);
              toastManager.add({ type: "info", title: "已恢复 3 张工单" });
            },
          },
        });
      }}
      variant="outline"
    >
      归档工单
    </Button>
  );
}
