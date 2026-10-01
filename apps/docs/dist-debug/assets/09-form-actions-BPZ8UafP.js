const _09FormActions = 'import { Button } from "@yanqing/ui";\n\nexport const meta = {\n  title: "组合：表单操作栏",\n  description: "主操作靠末端；危险操作与其他操作分开放置。",\n};\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-lg flex-col-reverse gap-2 sm:flex-row sm:items-center">\n      <Button className="sm:me-auto" variant="destructive-outline">\n        停用账号\n      </Button>\n      <Button variant="ghost">取消</Button>\n      <Button>保存设置</Button>\n    </div>\n  );\n}\n';
export {
  _09FormActions as default
};
