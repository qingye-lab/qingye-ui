const _08Label = 'import { InputGroup, InputGroupAddon, InputGroupInput, Label } from "@yanqing/ui";\n\nexport const meta = { title: "组合：内嵌标签", description: "block-start 附加区域放标签，适合紧凑的卡片表单。" };\n\nexport default function Demo() {\n  return (\n    <InputGroup className="max-w-xs">\n      <InputGroupInput id="ig-company" placeholder="例如：杭州言青科技有限公司" />\n      <InputGroupAddon align="block-start">\n        <Label htmlFor="ig-company">公司名称</Label>\n      </InputGroupAddon>\n    </InputGroup>\n  );\n}\n';
export {
  _08Label as default
};
