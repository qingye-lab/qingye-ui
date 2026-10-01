const _03Button = 'import { FileUpload, Label } from "@yanqing/ui";\n\nexport const meta = { title: "按钮触发", description: "variant=\\"button\\" 适合表单中的单个附件；maxFiles=1 时新文件替换旧文件。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-md flex-col gap-2">\n      <Label htmlFor="contract-file">签署版合同</Label>\n      <FileUpload\n        id="contract-file"\n        variant="button"\n        accept=".pdf"\n        maxFiles={1}\n        maxSize={20 * 1024 * 1024}\n        chooseLabel="选择 PDF"\n        description="仅 PDF，不超过 20 MB"\n      />\n    </div>\n  );\n}\n';
export {
  _03Button as default
};
