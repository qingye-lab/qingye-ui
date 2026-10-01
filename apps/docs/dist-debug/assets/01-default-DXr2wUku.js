const _01Default = 'import { Input, Label } from "@yanqing/ui";\n\nexport const meta = { title: "关联输入框", description: "htmlFor 指向控件 id，点击标签即可聚焦。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-xs flex-col gap-2">\n      <Label htmlFor="label-project">项目名称</Label>\n      <Input id="label-project" placeholder="例如：滨江仓储改造" />\n    </div>\n  );\n}\n';
export {
  _01Default as default
};
