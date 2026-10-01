const _02Outline = 'import { Toggle } from "@yanqing/ui";\nimport { Grid3X3Icon, PinIcon } from "lucide-react";\n\nexport const meta = { title: "描边", description: "放在工具栏或卡片上，需要与背景区分时使用。" };\n\nexport default function Demo() {\n  return (\n    <>\n      <Toggle defaultPressed variant="outline">\n        <Grid3X3Icon />\n        显示网格\n      </Toggle>\n      <Toggle variant="outline">\n        <PinIcon />\n        固定到顶部\n      </Toggle>\n    </>\n  );\n}\n';
export {
  _02Outline as default
};
