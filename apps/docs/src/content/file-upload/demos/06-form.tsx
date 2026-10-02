import { Button } from "@qingye/ui/components/button";
import { Field, FieldDescription } from "@qingye/ui/components/field";
import { FileUpload } from "@qingye/ui/components/file-upload";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { useState, type FormEvent } from "react";

export const meta = { title: "组合：提交工单", description: "通过 name 参与原生表单提交，FormData 中直接拿到 File。" };

export default function Demo() {
  const [summary, setSummary] = useState<string | null>(null);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const files = new FormData(event.currentTarget).getAll("attachments") as File[];
    setSummary(files.filter((file) => file.size > 0).map((file) => file.name).join("、") || "无附件");
  };
  return (
    <form className="flex w-full max-w-md flex-col gap-4" onSubmit={onSubmit}>
      <Field>
        <Label htmlFor="ticket-title">问题描述</Label>
        <Input id="ticket-title" defaultValue="3 楼会议室投影仪无法识别 HDMI 信号" />
      </Field>
      <Field>
        <Label htmlFor="ticket-files">附件</Label>
        <FileUpload id="ticket-files" name="attachments" variant="button" accept=".png,.jpg,.jpeg,.pdf,.log,.txt" maxFiles={5} chooseLabel="添加附件" aria-describedby="ticket-files-description" />
        <FieldDescription id="ticket-files-description">截图、PDF 或日志，最多 5 个。</FieldDescription>
      </Field>
      <Button type="submit" className="self-start">提交工单</Button>
      {summary !== null ? <p role="status" className="text-muted-foreground text-xs">本次附件：{summary}</p> : null}
    </form>
  );
}
