import { ScrollArea } from "@yanqing/ui";

export const meta = {
  title: "边缘渐隐",
  description: "scrollFade 只在还有内容的一侧渐隐，滚到底后自然消失。",
};

const terms = [
  "一、服务内容。青烟云为你提供云端部署、监控与日志服务，具体以控制台展示为准。",
  "二、账号安全。你应妥善保管账号与访问令牌，因保管不当造成的损失由你自行承担。",
  "三、数据处理。我们仅在提供服务所必需的范围内处理你的数据，不会出售给第三方。",
  "四、费用与结算。按量计费项目每日结算，包年包月项目在开通时一次性扣费。",
  "五、服务变更。重大变更将提前 30 日通过站内信与邮件通知。",
  "六、争议解决。协议适用中华人民共和国法律，争议提交服务提供方所在地法院管辖。",
];

export default function Demo() {
  return (
    <ScrollArea className="h-48 w-full max-w-sm rounded-lg border" scrollFade>
      <div className="flex flex-col gap-3 p-4 text-muted-foreground text-sm leading-relaxed">
        {terms.map((term) => (
          <p key={term}>{term}</p>
        ))}
      </div>
    </ScrollArea>
  );
}
