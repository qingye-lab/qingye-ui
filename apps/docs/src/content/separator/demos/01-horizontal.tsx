import { Separator } from "@yanqing/ui/components/separator";

export const meta = { title: "横向" };

export default function Demo() {
  return (
    <div className="w-full max-w-xs text-sm">
      <div className="flex flex-col gap-1">
        <p className="font-medium">青烟设计系统</p>
        <p className="text-muted-foreground">克制、耐看的界面组件与设计令牌。</p>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-1">
        <p className="font-medium">版本 0.1.0</p>
        <p className="text-muted-foreground">2026 年 10 月 1 日发布</p>
      </div>
    </div>
  );
}
