import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = { title: "标题与说明", description: "不指定 type 时只显示文字；说明是可选的。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button onClick={() => toastManager.add({ title: "链接已复制" })} variant="outline">
        仅标题
      </Button>
      <Button
        onClick={() => toastManager.add({ title: "已安排巡检", description: "10 月 8 日（周三）09:00，负责人周以宁。" })}
        variant="outline"
      >
        标题与说明
      </Button>
    </div>
  );
}
