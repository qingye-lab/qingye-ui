const _07Stack = 'import { Button, toastManager } from "@yanqing/ui";\n\nexport const meta = {\n  title: "层叠",\n  description: "多条消息层叠显示，悬停或聚焦时展开并暂停计时；高度不同的消息也能平滑过渡。",\n};\n\nconst messages = [\n  { title: "周以宁接受了工单 #2318" },\n  { title: "华东仓储新增 4 台设备", description: "其中 1 台需要更新固件后才能上线。" },\n  {\n    title: "温控器告警已恢复",\n    description: "冷库 2 号温控器在离线 18 分钟后重新上报，期间的温度数据已自动补传，无需人工处理。",\n  },\n];\n\nexport default function Demo() {\n  return (\n    <Button\n      onClick={() => messages.forEach((message, index) => setTimeout(() => toastManager.add(message), index * 160))}\n      variant="outline"\n    >\n      连续添加 3 条\n    </Button>\n  );\n}\n';
export {
  _07Stack as default
};
