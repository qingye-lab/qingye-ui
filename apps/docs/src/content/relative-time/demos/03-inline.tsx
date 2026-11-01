import { RelativeTime } from "@qingye_lab/ui/components/relative-time";
export const meta = { title: "嵌在句子里", titleEn: "Inside a sentence" };
const loaded = Date.now();
export default function Demo() {
  return <p className="text-body">设备在 <RelativeTime value={loaded - 12 * 60_000} /> 上报了最后一次心跳，配置在 <RelativeTime value={loaded - 26 * 3_600_000} /> 更新。</p>;
}
