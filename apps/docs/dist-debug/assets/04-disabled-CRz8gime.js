const _04Disabled = 'import { Toggle } from "@yanqing/ui";\nimport { LockIcon } from "lucide-react";\n\nexport const meta = { title: "禁用" };\n\nexport default function Demo() {\n  return (\n    <>\n      <Toggle disabled variant="outline">\n        <LockIcon />\n        只读模式\n      </Toggle>\n      <Toggle defaultPressed disabled variant="outline">\n        <LockIcon />\n        已锁定\n      </Toggle>\n    </>\n  );\n}\n';
export {
  _04Disabled as default
};
