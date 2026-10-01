import { Badge, Button } from "@yanqing/ui";

export const meta = { title: "计数", description: "加 numeric 使用等宽数字；超过上限显示 99+。" };

export default function Demo() {
  return (
    <>
      <Badge className="numeric">3</Badge>
      <Badge variant="secondary" className="numeric">24</Badge>
      <Badge variant="destructive" className="numeric">99+</Badge>
      <Button variant="outline">
        待审批
        <Badge size="sm" variant="secondary" className="numeric">12</Badge>
      </Button>
      <Button variant="outline">
        未读消息
        <Badge size="sm" variant="destructive" className="numeric">5</Badge>
      </Button>
    </>
  );
}
