import { Button } from "@qingye_lab/ui/components/button";
import { Card } from "@qingye_lab/ui/components/card";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";

export type Member = { id: string; name: string; role: string };
export type AtlasSettingsProps = { members: Member[] };

export function AtlasSettings({ members }: AtlasSettingsProps) {
  return (
    <div className="flex flex-col gap-6">
      <form data-density="compact" className="flex flex-col gap-3" onSubmit={event => event.preventDefault()}>
        <Field><FieldLabel>团队名称</FieldLabel><Input /></Field>
        <Field><FieldLabel>联系邮箱</FieldLabel><Input type="email" /></Field>
        <div><Button type="submit">保存</Button></div>
      </form>
      <Card>
        <TableContainer>
          <Table>
            <TableCaption>成员</TableCaption>
            <TableHeader><TableRow><TableHead>姓名</TableHead><TableHead>角色</TableHead></TableRow></TableHeader>
            <TableBody>{members.map(member => <TableRow key={member.id}><TableCell>{member.name}</TableCell><TableCell>{member.role}</TableCell></TableRow>)}</TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
