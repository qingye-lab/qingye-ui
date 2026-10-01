import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  Switch,
} from "@yanqing/ui";

export const meta = { title: "设置卡片", description: "Field 横向排列标签与开关，点击标签也能切换。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>邮件通知</CardTitle>
        <CardDescription>选择哪些事件需要发送到 linxiaowen@yanqing.cn。</CardDescription>
      </CardHeader>
      <CardPanel className="flex flex-col gap-5">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel>部署失败</FieldLabel>
            <FieldDescription>构建或上线出错时立即通知。</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel>新成员加入</FieldLabel>
            <FieldDescription>有人接受邀请加入团队时通知。</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel>每周用量报告</FieldLabel>
            <FieldDescription>每周一汇总上周的带宽、构建分钟数与费用。</FieldDescription>
          </FieldContent>
          <Switch />
        </Field>
      </CardPanel>
    </Card>
  );
}
