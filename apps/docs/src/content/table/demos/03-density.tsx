import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { useState } from "react";

export const meta = { title: "紧凑密度", description: "compact 将行高从 48px 收到 40px，适合信息密集的后台列表。" };

const members = [
  { name: "林晓雯", role: "产品经理", team: "增长组", joined: "2023-04-12" },
  { name: "周子航", role: "前端工程师", team: "平台组", joined: "2022-11-03" },
  { name: "陈一诺", role: "设计师", team: "体验组", joined: "2024-02-19" },
  { name: "王嘉树", role: "后端工程师", team: "平台组", joined: "2021-08-30" },
];

export default function Demo() {
  const [compact, setCompact] = useState(true);
  return (
    <div className="flex w-full flex-col gap-4">
      <Label className="self-end">
        <Switch checked={compact} onCheckedChange={setCompact} />
        紧凑
      </Label>
      <Table density={compact ? "compact" : "default"}>
        <TableHeader>
          <TableRow>
            <TableHead>姓名</TableHead>
            <TableHead>职位</TableHead>
            <TableHead>团队</TableHead>
            <TableHead className="text-end">入职日期</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.name}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell className="text-muted-foreground">{member.team}</TableCell>
              <TableCell className="text-end numeric">{member.joined}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
