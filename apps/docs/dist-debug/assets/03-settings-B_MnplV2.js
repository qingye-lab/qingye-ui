const e=`import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "组合：设置列表", description: "标签与说明在左，开关靠右对齐。" };

const settings = [
  { id: "offline", label: "设备离线提醒", description: "设备连续 5 分钟无心跳时推送通知。", checked: true },
  { id: "digest", label: "每日运行摘要", description: "每天 08:30 发送前一天的告警与能耗汇总。", checked: true },
  { id: "beta", label: "参与新功能内测", description: "提前体验新版控制台，可能存在不稳定的情况。" },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col divide-y rounded-xl border">
      {settings.map((item) => (
        <Field key={item.id} orientation="horizontal" className="gap-4 px-4 py-3">
          <FieldContent>
            <FieldLabel>{item.label}</FieldLabel>
            <FieldDescription>{item.description}</FieldDescription>
          </FieldContent>
          <Switch defaultChecked={item.checked} />
        </Field>
      ))}
    </div>
  );
}
`;export{e as default};
