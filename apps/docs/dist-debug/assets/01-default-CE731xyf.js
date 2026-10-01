const _01Default = 'import { Toggle } from "@yanqing/ui";\nimport { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";\n\nexport const meta = { title: "默认", description: "按下后保持浅色填充，再次点击恢复。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex items-center gap-1">\n      <Toggle aria-label="加粗" defaultPressed>\n        <BoldIcon />\n      </Toggle>\n      <Toggle aria-label="斜体">\n        <ItalicIcon />\n      </Toggle>\n      <Toggle aria-label="下划线">\n        <UnderlineIcon />\n      </Toggle>\n    </div>\n  );\n}\n';
export {
  _01Default as default
};
