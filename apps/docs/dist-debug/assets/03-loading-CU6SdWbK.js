const _03Loading = 'import { Button, toastManager } from "@yanqing/ui";\n\nexport const meta = { title: "加载中", description: "type=\\"loading\\" 显示旋转图标，任务结束后用 update 换成结果。" };\n\nexport default function Demo() {\n  return (\n    <Button\n      onClick={() => {\n        const id = toastManager.add({ type: "loading", title: "正在生成报表…", description: "共 1,286 条记录", timeout: 0 });\n        setTimeout(() => {\n          toastManager.update(id, { type: "success", title: "报表已生成", description: "已发送到 finance@yanqing.cn", timeout: 4000 });\n        }, 2000);\n      }}\n      variant="outline"\n    >\n      生成报表\n    </Button>\n  );\n}\n';
export {
  _03Loading as default
};
