import { ScrollArea } from "@yanqing/ui/components/scroll-area";

export const meta = { title: "横向", description: "内容用 w-max 保持自身宽度。" };

const works = [
  { title: "山行", author: "林晓", tone: "from-sky-200 to-indigo-300" },
  { title: "雾港", author: "周舟", tone: "from-emerald-200 to-teal-300" },
  { title: "晚灯", author: "陈默", tone: "from-amber-200 to-orange-300" },
  { title: "长街", author: "许诺", tone: "from-rose-200 to-fuchsia-300" },
  { title: "初雪", author: "王一然", tone: "from-slate-200 to-slate-300" },
];

export default function Demo() {
  return (
    <ScrollArea className="w-full max-w-md rounded-lg border">
      <div className="flex w-max gap-3 p-4">
        {works.map((work) => (
          <figure className="w-36 shrink-0" key={work.title}>
            <div className={`aspect-[3/4] rounded-md bg-gradient-to-br ${work.tone} dark:opacity-80`} />
            <figcaption className="mt-2 text-muted-foreground text-xs">
              <span className="font-medium text-foreground">{work.title}</span> · {work.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  );
}
