const _07LoadingCustom = 'import { Button, Spinner } from "@yanqing/ui";\n\nexport const meta = {\n  title: "自定义加载",\n  description: "需要保留文字时，自行组合 Spinner 与 disabled，例如“正在上传 3 个文件”。",\n};\n\nexport default function Demo() {\n  return (\n    <>\n      <Button disabled>\n        <Spinner />\n        正在上传 3 个文件\n      </Button>\n      <Button disabled size="sm" variant="outline">\n        <Spinner />\n        生成中\n      </Button>\n    </>\n  );\n}\n';
export {
  _07LoadingCustom as default
};
