import { Button } from "@qingye/ui/components/button";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";
import { Switch } from "@qingye/ui/components/switch";
import { Textarea } from "@qingye/ui/components/textarea";
import { useState } from "react";

export const meta = {
  title: "完整表单",
  description:
    "直接点“提交申请”查看校验，焦点会移到第一个错误字段。企业名称填“言青科技”可模拟服务端返回的重名错误，修改后错误自动消失。",
};

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  async function submit(values: Record<string, unknown>) {
    setLoading(true);
    setDone(false);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    if (String(values.company).includes("言青科技")) {
      setErrors({ company: "该企业已开通账户，请联系管理员邀请你加入。" });
      return;
    }
    setErrors({});
    setDone(true);
  }

  return (
    <Form className="flex w-full max-w-md flex-col gap-6" errors={errors} onFormSubmit={submit}>
      <FieldGroup>
        <Field name="company" validate={(value) => (value ? null : "请填写企业名称。")}>
          <FieldLabel>企业名称</FieldLabel>
          <Input aria-required placeholder="与营业执照一致" />
          {/* Shows the validate() message, or the server error from Form errors. */}
          <FieldError />
        </Field>
        <Field name="email">
          <FieldLabel>管理员邮箱</FieldLabel>
          <Input autoComplete="email" placeholder="name@company.com" required type="email" />
          <FieldDescription>开通结果和登录链接会发送到这个邮箱。</FieldDescription>
          <FieldError match="valueMissing">请填写管理员邮箱。</FieldError>
          <FieldError match="typeMismatch">邮箱格式不正确。</FieldError>
        </Field>
        <Field name="note">
          <FieldLabel>
            使用场景 <span className="font-normal text-muted-foreground">选填</span>
          </FieldLabel>
          <Textarea placeholder="例如：管理 3 个仓库的 200 台传感器" />
        </Field>
      </FieldGroup>

      <Fieldset>
        <FieldsetLegend>通知</FieldsetLegend>
        <Field name="weeklyReport" orientation="horizontal">
          <FieldContent>
            <FieldLabel>每周运维报告</FieldLabel>
            <FieldDescription>每周一 9:00 发送设备在线率与告警汇总。</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
        <Field name="productNews" orientation="horizontal">
          <FieldContent>
            <FieldLabel>产品更新</FieldLabel>
            <FieldDescription>新功能上线时通知，每月不超过 2 封。</FieldDescription>
          </FieldContent>
          <Switch />
        </Field>
      </Fieldset>

      <Field name="terms" orientation="horizontal">
        <Checkbox required />
        <FieldContent>
          <FieldLabel>我已阅读并同意《企业服务协议》</FieldLabel>
          <FieldError match="valueMissing">请先同意服务协议。</FieldError>
        </FieldContent>
      </Field>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
        {done ? (
          <p className="text-success-foreground text-sm sm:me-auto" data-motion="fade-in" role="status">
            申请已提交，我们会在 1 个工作日内审核。
          </p>
        ) : null}
        <Button type="reset" variant="ghost">
          重置
        </Button>
        <Button loading={loading} type="submit">
          提交申请
        </Button>
      </div>
    </Form>
  );
}
