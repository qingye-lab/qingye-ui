const _03Multiple = 'import { Calendar } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = { title: "多选", description: "最多选择 5 个值班日；周末不可选。" };\n\nexport default function Demo() {\n  const today = new Date();\n  const [days, setDays] = useState<Date[] | undefined>([]);\n  return (\n    <div className="flex flex-col items-center gap-3">\n      <Calendar\n        mode="multiple"\n        max={5}\n        selected={days}\n        onSelect={setDays}\n        disabled={{ dayOfWeek: [0, 6] }}\n        defaultMonth={today}\n      />\n      <p className="text-muted-foreground text-sm numeric">已选 {days?.length ?? 0} / 5 天</p>\n    </div>\n  );\n}\n';
export {
  _03Multiple as default
};
