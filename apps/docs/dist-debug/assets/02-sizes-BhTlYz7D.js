const e=`import { Badge } from "@qingye/ui/components/badge";

export const meta = { title: "尺寸", description: "移动端自动加高，≥640px 回到桌面尺寸。" };

export default function Demo() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Badge size="sm" variant="outline">小</Badge>
        <Badge variant="outline">默认</Badge>
        <Badge size="lg" variant="outline">大</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge size="sm">测试版</Badge>
        <Badge>测试版</Badge>
        <Badge size="lg">测试版</Badge>
      </div>
    </>
  );
}
`;export{e as default};
