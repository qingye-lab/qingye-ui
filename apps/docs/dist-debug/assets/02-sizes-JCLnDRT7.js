const _02Sizes = 'import { Badge } from "@yanqing/ui";\n\nexport const meta = { title: "尺寸", description: "移动端自动加高，≥640px 回到桌面尺寸。" };\n\nexport default function Demo() {\n  return (\n    <>\n      <div className="flex items-center gap-2">\n        <Badge size="sm" variant="outline">小</Badge>\n        <Badge variant="outline">默认</Badge>\n        <Badge size="lg" variant="outline">大</Badge>\n      </div>\n      <div className="flex items-center gap-2">\n        <Badge size="sm">测试版</Badge>\n        <Badge>测试版</Badge>\n        <Badge size="lg">测试版</Badge>\n      </div>\n    </>\n  );\n}\n';
export {
  _02Sizes as default
};
