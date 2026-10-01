import { Timeline } from "@yanqing/ui/components/timeline";

export const meta = { title: "紧凑与连接线", description: "density=\"compact\" 适合审计日志；connector 可选 dashed 或 none。" };

const audit = [
  { id: "1", title: "导出 9 月账单", time: "14:22:05", description: "王嘉树 · 192.168.3.24" },
  { id: "2", title: "修改角色权限：财务 → 管理员", time: "13:47:51", description: "林晓雯 · 10.0.8.12", status: "warning" as const },
  { id: "3", title: "登录失败 3 次", time: "13:40:09", description: "未知用户 · 47.98.12.6", status: "error" as const },
  { id: "4", title: "新增成员 赵思远", time: "11:05:33", description: "林晓雯 · 10.0.8.12" },
];

const plan = [
  { id: "a", title: "需求评审", time: "10-08" },
  { id: "b", title: "设计定稿", time: "10-15" },
  { id: "c", title: "开发联调", time: "10-29" },
  { id: "d", title: "上线", time: "11-05" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl gap-10 sm:grid-cols-2">
      <Timeline connector="dashed" density="compact" items={audit} label="审计日志" />
      <Timeline connector="none" density="compact" items={plan} label="项目里程碑" />
    </div>
  );
}
