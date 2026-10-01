import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@yanqing/ui";

export const meta = { title: "多选", description: "列表在选择后保持打开；触发器上汇总显示。" };

const channels = { sms: "短信", email: "邮件", wecom: "企业微信", dingtalk: "钉钉", phone: "电话" };
type Channel = keyof typeof channels;

const summary = (value: Channel[]) =>
  value.length === 0
    ? "选择通知渠道"
    : value.length <= 2
      ? value.map((item) => channels[item]).join("、")
      : `${channels[value[0]!]}、${channels[value[1]!]} 等 ${value.length} 项`;

export default function Demo() {
  return (
    <Select multiple items={channels} defaultValue={["sms", "wecom"] as Channel[]} aria-label="告警通知渠道">
      <SelectTrigger className="w-full max-w-64">
        <SelectValue>{summary}</SelectValue>
      </SelectTrigger>
      <SelectPopup>
        {(Object.keys(channels) as Channel[]).map((value) => (
          <SelectItem key={value} value={value}>
            {channels[value]}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
