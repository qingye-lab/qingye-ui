import { Avatar, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";

export const meta = { title: "尺寸", description: "xs 到 xl 依次为 20 / 24 / 32 / 40 / 48px。" };

const src = "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces";

export default function Demo() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar size="xs">
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar size="xl">
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-3">
        <Avatar size="xs">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar size="xl">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
