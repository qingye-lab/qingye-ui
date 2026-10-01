const _05Sizes = 'import { InputGroup, InputGroupAddon, InputGroupInput } from "@yanqing/ui";\nimport { SearchIcon } from "lucide-react";\n\nexport const meta = { title: "尺寸", description: "size 写在 InputGroupInput 上，附加区域随之调整内边距。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-xs flex-col gap-3">\n      {(["sm", "default", "lg"] as const).map((size) => (\n        <InputGroup key={size}>\n          <InputGroupInput aria-label="搜索" placeholder={`搜索（${size}）`} size={size} type="search" />\n          <InputGroupAddon>\n            <SearchIcon aria-hidden="true" />\n          </InputGroupAddon>\n        </InputGroup>\n      ))}\n    </div>\n  );\n}\n';
export {
  _05Sizes as default
};
