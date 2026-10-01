const n=`import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Button } from "@qingye/ui/components/button";
import { Card, CardFooter, CardHeader, CardPanel } from "@qingye/ui/components/card";
import { Skeleton } from "@qingye/ui/components/skeleton";
import { RotateCwIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const meta = {
  title: "加载切换",
  description: "骨架与真实内容尺寸一致，加载完成时卡片高度不变。",
};

export default function Demo() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <Card aria-busy={loading} className="w-full">
        <CardHeader className="flex items-center gap-3">
          {loading ? (
            <>
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-28" />
              </div>
              <span className="sr-only">正在加载</span>
            </>
          ) : (
            <>
              <Avatar size="lg">
                <AvatarFallback>林</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm">林晓雯</span>
                <span className="text-muted-foreground text-xs">产品经理 · 增长组</span>
              </div>
            </>
          )}
        </CardHeader>
        <CardPanel>
          {loading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="line-clamp-2 text-sm">负责会员中心的增长实验，最近在推进新人礼包与积分商城的改版。</p>
          )}
        </CardPanel>
        <CardFooter>
          {loading ? <Skeleton className="h-8 w-20 rounded-lg sm:h-7" /> : <Button size="sm" variant="outline">发消息</Button>}
        </CardFooter>
      </Card>
      <Button size="sm" variant="ghost" disabled={loading} onClick={() => setLoading(true)}>
        <RotateCwIcon aria-hidden="true" />
        重新加载
      </Button>
    </div>
  );
}
`;export{n as default};
