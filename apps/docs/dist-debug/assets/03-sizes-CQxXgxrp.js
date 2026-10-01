const _03Sizes = 'import { Toggle } from "@yanqing/ui";\nimport { StarIcon } from "lucide-react";\n\nexport const meta = { title: "尺寸" };\n\nexport default function Demo() {\n  return (\n    <>\n      <Toggle aria-label="收藏" size="sm" variant="outline">\n        <StarIcon />\n      </Toggle>\n      <Toggle aria-label="收藏" variant="outline">\n        <StarIcon />\n      </Toggle>\n      <Toggle aria-label="收藏" size="lg" variant="outline">\n        <StarIcon />\n      </Toggle>\n      <Toggle size="sm" variant="outline">\n        小\n      </Toggle>\n      <Toggle variant="outline">默认</Toggle>\n      <Toggle size="lg" variant="outline">\n        大\n      </Toggle>\n    </>\n  );\n}\n';
export {
  _03Sizes as default
};
