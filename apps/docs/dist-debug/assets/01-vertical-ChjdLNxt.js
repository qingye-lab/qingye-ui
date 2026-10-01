const _01Vertical = 'import { ScrollArea, Separator } from "@yanqing/ui";\nimport { Fragment } from "react";\n\nexport const meta = { title: "纵向" };\n\nconst releases = Array.from({ length: 24 }, (_, i) => `v2.${24 - i}.0`);\n\nexport default function Demo() {\n  return (\n    <ScrollArea className="h-64 w-48 rounded-lg border">\n      <div className="p-4">\n        <p className="mb-3 font-medium text-sm">版本记录</p>\n        {releases.map((tag, i) => (\n          <Fragment key={tag}>\n            {i > 0 ? <Separator className="my-2" /> : null}\n            <p className="numeric text-muted-foreground text-sm">{tag}</p>\n          </Fragment>\n        ))}\n      </div>\n    </ScrollArea>\n  );\n}\n';
export {
  _01Vertical as default
};
