const _04Action = 'import { Button, toastManager } from "@yanqing/ui";\n\nexport const meta = { title: "带操作按钮", description: "可撤销的操作给出“撤销”，并适当延长显示时间。" };\n\nexport default function Demo() {\n  return (\n    <Button\n      onClick={() => {\n        const id = toastManager.add({\n          type: "success",\n          title: "已归档 3 张工单",\n          timeout: 8000,\n          actionProps: {\n            children: "撤销",\n            onClick: () => {\n              toastManager.close(id);\n              toastManager.add({ type: "info", title: "已恢复 3 张工单" });\n            },\n          },\n        });\n      }}\n      variant="outline"\n    >\n      归档工单\n    </Button>\n  );\n}\n';
export {
  _04Action as default
};
