const _04Dropdown = 'import { Calendar } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = {\n  title: "年月下拉",\n  description: "captionLayout=\\"dropdown\\" 适合跨度大的日期，例如出生日期。",\n};\n\nexport default function Demo() {\n  const [date, setDate] = useState<Date | undefined>(new Date(1994, 5, 18));\n  return (\n    <Calendar\n      mode="single"\n      captionLayout="dropdown"\n      startMonth={new Date(1950, 0)}\n      endMonth={new Date()}\n      defaultMonth={new Date(1994, 5)}\n      selected={date}\n      onSelect={setDate}\n    />\n  );\n}\n';
export {
  _04Dropdown as default
};
