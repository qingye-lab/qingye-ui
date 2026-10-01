const _02Default = 'import { Button, toastManager } from "@yanqing/ui";\n\nexport const meta = { title: "标题与说明", description: "不指定 type 时只显示文字；说明是可选的。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-wrap justify-center gap-2">\n      <Button onClick={() => toastManager.add({ title: "链接已复制" })} variant="outline">\n        仅标题\n      </Button>\n      <Button\n        onClick={() => toastManager.add({ title: "已安排巡检", description: "10 月 8 日（周三）09:00，负责人周以宁。" })}\n        variant="outline"\n      >\n        标题与说明\n      </Button>\n    </div>\n  );\n}\n';
export {
  _02Default as default
};
