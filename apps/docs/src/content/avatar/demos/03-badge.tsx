import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";

export const meta = {
  title: "状态标记",
  description: "AvatarBadge 默认为在线的绿色，用 className 换成其他状态色；旁边始终配上文字。",
};

const people = [
  {
    name: "林晓雯",
    status: "在线",
    tone: "bg-success",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "周子航",
    status: "离开 · 15 分钟",
    tone: "bg-warning",
    src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces",
  },
  { name: "陈思远", status: "会议中", tone: "bg-destructive" },
  { name: "许嘉怡", status: "离线", tone: "bg-muted-foreground" },
];

export default function Demo() {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
      {people.map((person) => (
        <div key={person.name} className="flex items-center gap-3">
          <Avatar size="lg">
            {person.src ? <AvatarImage alt="" src={person.src} /> : null}
            <AvatarFallback>{person.name.slice(0, 1)}</AvatarFallback>
            <AvatarBadge className={person.tone} />
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm leading-none">{person.name}</span>
            <span className="text-muted-foreground text-xs leading-none">{person.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
