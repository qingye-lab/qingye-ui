const _05Count = 'import { Badge, Button } from "@yanqing/ui";\n\nexport const meta = { title: "计数", description: "加 numeric 使用等宽数字；超过上限显示 99+。" };\n\nexport default function Demo() {\n  return (\n    <>\n      <Badge className="numeric">3</Badge>\n      <Badge variant="secondary" className="numeric">24</Badge>\n      <Badge variant="destructive" className="numeric">99+</Badge>\n      <Button variant="outline">\n        待审批\n        <Badge size="sm" variant="secondary" className="numeric">12</Badge>\n      </Button>\n      <Button variant="outline">\n        未读消息\n        <Badge size="sm" variant="destructive" className="numeric">5</Badge>\n      </Button>\n    </>\n  );\n}\n';
export {
  _05Count as default
};
