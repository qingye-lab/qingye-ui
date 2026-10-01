import { Separator } from "@yanqing/ui/components/separator";

export const meta = { title: "纵向", description: "在 flex 行内自动拉伸到行高。" };

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6 text-sm">
      <nav aria-label="页脚" className="flex items-center gap-3 text-muted-foreground">
        <a className="hover:text-foreground" href="#">文档</a>
        <Separator orientation="vertical" />
        <a className="hover:text-foreground" href="#">更新日志</a>
        <Separator orientation="vertical" />
        <a className="hover:text-foreground" href="#">问题反馈</a>
      </nav>
      <div className="flex h-12 items-center gap-4 rounded-xl border px-4">
        <div>
          <div className="text-muted-foreground text-xs">今日访问</div>
          <div className="numeric font-medium">3,206</div>
        </div>
        <Separator orientation="vertical" />
        <div>
          <div className="text-muted-foreground text-xs">转化率</div>
          <div className="numeric font-medium">4.8%</div>
        </div>
      </div>
    </div>
  );
}
