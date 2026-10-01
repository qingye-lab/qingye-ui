import { Button } from "@qingye/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "基础", description: "标题、内容与底部操作。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>创建项目</CardTitle>
        <CardDescription>新项目默认部署到华东 1 区，可随时在设置中更改。</CardDescription>
      </CardHeader>
      <CardPanel>
        <Field>
          <FieldLabel>项目名称</FieldLabel>
          <Input placeholder="例如：会员中心" />
        </Field>
      </CardPanel>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">取消</Button>
        <Button>创建</Button>
      </CardFooter>
    </Card>
  );
}
