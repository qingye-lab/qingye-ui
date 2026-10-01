const _02Range = 'import { Calendar, type DateRange } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = {\n  title: "范围与双月",\n  description: "mode=\\"range\\" 选择起止日期，numberOfMonths 并排显示两个月；今天之前不可选。",\n};\n\nexport default function Demo() {\n  const today = new Date();\n  const [range, setRange] = useState<DateRange | undefined>({\n    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),\n    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9),\n  });\n  return (\n    <Calendar\n      mode="range"\n      numberOfMonths={2}\n      selected={range}\n      onSelect={setRange}\n      disabled={{ before: today }}\n    />\n  );\n}\n';
export {
  _02Range as default
};
