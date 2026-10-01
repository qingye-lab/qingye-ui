import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@yanqing/ui/components/card";
import { DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm } from "@yanqing/ui/components/description-list";
import { StatusDot } from "@yanqing/ui/components/status-dot";
import { CpuIcon, MapPinIcon, RadioTowerIcon, TimerIcon } from "lucide-react";

export const meta = { title: "分隔线与图标", description: "divided 在条目间加发丝线；名称可带图标。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>设备信息</CardTitle>
        <CardDescription>前台收银机 · 徐汇店</CardDescription>
      </CardHeader>
      <CardPanel>
        <DescriptionList divided>
          <DescriptionListItem>
            <DescriptionTerm>
              <RadioTowerIcon aria-hidden="true" />
              连接状态
            </DescriptionTerm>
            <DescriptionDetails>
              <StatusDot pulse status="online">
                在线
              </StatusDot>
            </DescriptionDetails>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionTerm>
              <CpuIcon aria-hidden="true" />
              设备序列号
            </DescriptionTerm>
            <DescriptionDetails className="font-mono" copyLabel="复制设备序列号" copyValue="T2S-8F3A-21C7-0049">
              T2S-8F3A-21C7-0049
            </DescriptionDetails>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionTerm>
              <MapPinIcon aria-hidden="true" />
              安装位置
            </DescriptionTerm>
            <DescriptionDetails>一楼前台 2 号收银台</DescriptionDetails>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionTerm>
              <TimerIcon aria-hidden="true" />
              持续在线
            </DescriptionTerm>
            <DescriptionDetails className="numeric">18 天 6 小时</DescriptionDetails>
          </DescriptionListItem>
        </DescriptionList>
      </CardPanel>
    </Card>
  );
}
