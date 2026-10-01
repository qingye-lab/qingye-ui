import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = {
  title: "层叠",
  description: "多条消息层叠显示，悬停或聚焦时展开并暂停计时；高度不同的消息也能平滑过渡。",
};

const messages = [
  { title: "周以宁接受了工单 #2318" },
  { title: "华东仓储新增 4 台设备", description: "其中 1 台需要更新固件后才能上线。" },
  {
    title: "温控器告警已恢复",
    description: "冷库 2 号温控器在离线 18 分钟后重新上报，期间的温度数据已自动补传，无需人工处理。",
  },
];

export default function Demo() {
  return (
    <Button
      onClick={() => messages.forEach((message, index) => setTimeout(() => toastManager.add(message), index * 160))}
      variant="outline"
    >
      连续添加 3 条
    </Button>
  );
}
