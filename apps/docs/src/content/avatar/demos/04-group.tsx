import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@yanqing/ui";

export const meta = {
  title: "头像组",
  description: "AvatarGroup 按头像尺寸调整重叠量；AvatarGroupCount 自动与组内头像同尺寸。",
};

export default function Demo() {
  return (
    <>
      <AvatarGroup aria-label="共 9 位成员">
        <Avatar size="sm">
          <AvatarImage alt="林晓雯" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>林</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage alt="周子航" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage alt="沈若溪" src="https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>沈</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+5</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup aria-label="共 16 位成员">
        <Avatar size="lg">
          <AvatarImage alt="许嘉怡" src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>许</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>王</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage alt="林晓雯" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>林</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage alt="周子航" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+12</AvatarGroupCount>
      </AvatarGroup>
    </>
  );
}
