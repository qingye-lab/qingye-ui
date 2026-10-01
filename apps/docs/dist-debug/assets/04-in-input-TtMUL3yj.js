const _04InInput = 'import { InputGroup, InputGroupAddon, InputGroupInput, Kbd } from "@yanqing/ui";\nimport { SearchIcon } from "lucide-react";\n\nexport const meta = { title: "在输入框中", description: "放进 InputGroupAddon，提示唤起搜索的快捷键。" };\n\nexport default function Demo() {\n  return (\n    <InputGroup className="max-w-xs">\n      <InputGroupInput aria-keyshortcuts="Meta+K" aria-label="搜索文档" placeholder="搜索文档…" type="search" />\n      <InputGroupAddon>\n        <SearchIcon aria-hidden="true" />\n      </InputGroupAddon>\n      <InputGroupAddon align="inline-end">\n        <Kbd aria-hidden="true">⌘K</Kbd>\n      </InputGroupAddon>\n    </InputGroup>\n  );\n}\n';
export {
  _04InInput as default
};
