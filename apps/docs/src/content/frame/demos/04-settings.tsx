import { Button } from "@yanqing/ui/components/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@yanqing/ui/components/field";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "@yanqing/ui/components/frame";
import { Input } from "@yanqing/ui/components/input";
import { Switch } from "@yanqing/ui/components/switch";

export const meta = { title: "组合：构建设置", description: "表单放在面板里，保存操作放在外框底部。" };

export default function Demo() {
  return (
    <Frame className="w-full max-w-lg">
      <FrameHeader>
        <FrameTitle>构建与部署</FrameTitle>
        <FrameDescription>修改后从下一次推送开始生效。</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <FieldGroup>
          <Field>
            <FieldLabel>构建命令</FieldLabel>
            <Input className="font-mono" defaultValue="pnpm build" />
          </Field>
          <Field>
            <FieldLabel>输出目录</FieldLabel>
            <Input className="font-mono" defaultValue="dist" />
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel>自动部署</FieldLabel>
              <FieldDescription>推送到 main 后自动发布上线。</FieldDescription>
            </FieldContent>
            <Switch defaultChecked />
          </Field>
        </FieldGroup>
      </FramePanel>
      <FrameFooter className="flex justify-end gap-2">
        <Button variant="ghost">取消</Button>
        <Button>保存</Button>
      </FrameFooter>
    </Frame>
  );
}
