const _04InInput = 'import { CopyButton, InputGroup, InputGroupAddon, InputGroupInput } from "@yanqing/ui";\n\nexport const meta = { title: "组合：密钥输入框", description: "放进 InputGroupAddon，复制只读字段的内容。" };\n\nconst key = "yq_live_4f9a2c7e81b0d3";\n\nexport default function Demo() {\n  return (\n    <InputGroup className="max-w-xs">\n      <InputGroupInput aria-label="API 密钥" className="font-mono" defaultValue={key} readOnly />\n      <InputGroupAddon align="inline-end">\n        <CopyButton copyLabel="复制 API 密钥" size="icon-xs" value={key} variant="ghost" />\n      </InputGroupAddon>\n    </InputGroup>\n  );\n}\n';
export {
  _04InInput as default
};
