const _06Loading = 'import { Button } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = {\n  title: "加载中",\n  description: "loading 显示居中的旋转指示并禁用按钮，文字透明但保留宽度，按钮不会跳动。",\n};\n\nexport default function Demo() {\n  const [saving, setSaving] = useState(false);\n  const save = () => {\n    setSaving(true);\n    setTimeout(() => setSaving(false), 1500);\n  };\n  return (\n    <>\n      <Button loading={saving} onClick={save}>\n        保存更改\n      </Button>\n      <Button loading variant="outline">\n        同步中\n      </Button>\n      <Button loading variant="destructive">\n        删除中\n      </Button>\n    </>\n  );\n}\n';
export {
  _06Loading as default
};
