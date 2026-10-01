const e=`import { Card, CardFooter, CardHeader, CardPanel } from "@qingye/ui/components/card";
import { Skeleton } from "@qingye/ui/components/skeleton";

export const meta = { title: "卡片", description: "沿用 Card 的结构，只把内容换成占位块。" };

export default function Demo() {
  return (
    <Card aria-busy="true" className="w-full max-w-sm">
      <span className="sr-only">正在加载文章</span>
      <CardHeader className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardHeader>
      <CardPanel className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardPanel>
      <CardFooter className="gap-2">
        <Skeleton className="h-8 w-20 rounded-lg sm:h-7" />
        <Skeleton className="h-8 w-16 rounded-lg sm:h-7" />
      </CardFooter>
    </Card>
  );
}
`;export{e as default};
