const _07InputGroup = 'import { InputGroup, InputGroupAddon, InputGroupText, NumberField, NumberFieldInput } from "@yanqing/ui";\n\nexport const meta = { title: "组合：带单位", description: "放进 InputGroup，前后加货币符号与币种。" };\n\nexport default function Demo() {\n  return (\n    <InputGroup className="max-w-xs">\n      <NumberField aria-label="预算金额" defaultValue={50000} step={1000}>\n        <NumberFieldInput className="text-start" />\n      </NumberField>\n      <InputGroupAddon>\n        <InputGroupText>¥</InputGroupText>\n      </InputGroupAddon>\n      <InputGroupAddon align="inline-end">\n        <InputGroupText>CNY</InputGroupText>\n      </InputGroupAddon>\n    </InputGroup>\n  );\n}\n';
export {
  _07InputGroup as default
};
