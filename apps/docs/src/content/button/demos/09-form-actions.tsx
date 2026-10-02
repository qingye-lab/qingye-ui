import { Button } from "@qingye/ui/components/button";

export const meta = {
  title: "组合：表单操作栏",
  description: "把相关操作放在一起，按当前任务安排强调。正常编辑时突出保存；需要阻止继续同步时突出停止。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-(--qy-space-5)">
      <div className="flex flex-col gap-(--qy-space-2)">
        <p className="text-caption text-muted-foreground">编辑设置</p>
        <div className="flex flex-wrap gap-(--qy-action-gap)">
          <Button>保存设置</Button>
          <Button variant="outline">放弃这次修改</Button>
          <Button variant="destructive-outline">停用账号</Button>
        </div>
      </div>
      <div className="flex flex-col gap-(--qy-space-2)">
        <p className="text-caption text-muted-foreground">发现同步对象有误</p>
        <div className="flex flex-wrap gap-(--qy-action-gap)">
          <Button variant="destructive">停止同步</Button>
          <Button variant="outline">继续等待</Button>
        </div>
      </div>
    </div>
  );
}
