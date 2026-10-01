const _08Disabled = 'import { Button } from "@yanqing/ui";\n\nexport const meta = { title: "禁用", description: "不可用时降低不透明度并屏蔽指针事件。" };\n\nexport default function Demo() {\n  return (\n    <>\n      <Button disabled>提交审核</Button>\n      <Button disabled variant="outline">\n        导出\n      </Button>\n      <Button disabled variant="secondary">\n        存为草稿\n      </Button>\n      <Button disabled variant="destructive">\n        删除\n      </Button>\n    </>\n  );\n}\n';
export {
  _08Disabled as default
};
