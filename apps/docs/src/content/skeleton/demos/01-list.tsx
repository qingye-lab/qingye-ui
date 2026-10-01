import { Skeleton } from "@yanqing/ui";

export const meta = { title: "列表", description: "圆形头像加两行文字；每行宽度略有不同，更接近真实内容。" };

const rows = [
  { title: "w-28", subtitle: "w-44" },
  { title: "w-20", subtitle: "w-52" },
  { title: "w-24", subtitle: "w-36" },
];

export default function Demo() {
  return (
    <div aria-busy="true" className="flex w-full max-w-sm flex-col gap-5">
      <span className="sr-only">正在加载成员列表</span>
      {rows.map((row, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className={`h-4 ${row.title}`} />
            <Skeleton className={`h-3 ${row.subtitle}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
