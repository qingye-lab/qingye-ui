import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "边缘渐隐", titleEn: "Edge fade" };
export default function Demo() {
  return <Stack>
    <ScrollArea fade aria-label="完整条目" role="region" style={{ maxHeight: "calc(var(--qy-control-md) * 5)" }}>{Array.from({ length: 20 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md-narrow) items-center px-(--qy-control-md-padding) text-body sm:min-h-(--qy-control-md)">条目 {index + 1}</div>)}</ScrollArea>
    <ScrollArea fade aria-label="完整字符序列" role="region"><pre className="w-max px-(--qy-control-md-padding) py-(--qy-field-gap) text-body">甲 乙 丙 丁 戊 己 庚 辛 壬 癸 · A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</pre></ScrollArea>
  </Stack>;
}
