import { Button } from "@yanqing/ui";

export const meta = {
  title: "组合：表单操作栏",
  description: "主操作靠末端；危险操作与其他操作分开放置。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-lg flex-col-reverse gap-2 sm:flex-row sm:items-center">
      <Button className="sm:me-auto" variant="destructive-outline">
        停用账号
      </Button>
      <Button variant="ghost">取消</Button>
      <Button>保存设置</Button>
    </div>
  );
}
