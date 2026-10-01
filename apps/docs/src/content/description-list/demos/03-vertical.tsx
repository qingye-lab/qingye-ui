import { DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm } from "@yanqing/ui";

export const meta = { title: "垂直布局", description: "名称在值的上方，适合窄栏或值较长的情形。" };

export default function Demo() {
  return (
    <DescriptionList className="w-full max-w-sm" divided layout="vertical">
      <DescriptionListItem>
        <DescriptionTerm>API 访问地址</DescriptionTerm>
        <DescriptionDetails className="break-all font-mono text-[0.8125rem]" copyLabel="复制 API 访问地址" copyValue="https://api.yanqing.cn/v2/stores/xh-001/devices">
          https://api.yanqing.cn/v2/stores/xh-001/devices
        </DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>回调说明</DescriptionTerm>
        <DescriptionDetails>
          设备状态变化时向该地址推送事件，5 秒内未返回 200 会按 1、5、30 分钟重试三次，仍失败则记入告警。
        </DescriptionDetails>
      </DescriptionListItem>
    </DescriptionList>
  );
}
