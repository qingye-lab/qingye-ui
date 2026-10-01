const _01Single = 'import { Calendar } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = { title: "单选", description: "今天以小圆点标出；补位的相邻月份日期也可点选。" };\n\nexport default function Demo() {\n  const today = new Date();\n  const [date, setDate] = useState<Date | undefined>(\n    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),\n  );\n  return <Calendar mode="single" selected={date} onSelect={setDate} />;\n}\n';
export {
  _01Single as default
};
