const _06Update = 'import { Button, toastManager } from "@yanqing/ui";\n\nexport const meta = {\n  title: "原地更新",\n  description: "用同一个 id 重复添加时不会堆叠，而是更新原消息并轻微脉冲提示，适合自动保存。",\n};\n\nexport default function Demo() {\n  return (\n    <Button\n      onClick={() =>\n        toastManager.add({\n          id: "draft-saved",\n          type: "success",\n          title: "草稿已保存",\n          description: `最近保存：${new Date().toLocaleTimeString("zh-CN")}`,\n        })\n      }\n      variant="outline"\n    >\n      保存草稿\n    </Button>\n  );\n}\n';
export {
  _06Update as default
};
