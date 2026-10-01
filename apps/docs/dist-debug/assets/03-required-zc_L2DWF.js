const _03Required = 'import { Input, Label } from "@yanqing/ui";\n\nexport const meta = { title: "必填与选填", description: "用星号或“选填”文字标示，并在控件上设 required。" };\n\nexport default function Demo() {\n  return (\n    <div className="grid w-full max-w-xs gap-4">\n      <div className="flex flex-col gap-2">\n        <Label htmlFor="label-name">\n          收件人 <span aria-hidden="true" className="text-destructive-foreground">*</span>\n        </Label>\n        <Input id="label-name" required />\n      </div>\n      <div className="flex flex-col gap-2">\n        <Label htmlFor="label-company">\n          公司 <span className="font-normal text-muted-foreground">选填</span>\n        </Label>\n        <Input id="label-company" />\n      </div>\n    </div>\n  );\n}\n';
export {
  _03Required as default
};
