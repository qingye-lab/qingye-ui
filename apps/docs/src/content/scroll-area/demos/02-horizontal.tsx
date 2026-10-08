import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
export const meta = { title: "水平内容", titleEn: "Horizontal content" };
export default function Demo() {
  return <ScrollArea aria-label="完整字符序列" role="region"><pre className="w-max px-(--qy-control-md-padding) py-(--qy-field-gap) text-body">甲 乙 丙 丁 戊 己 庚 辛 壬 癸 · A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</pre></ScrollArea>;
}
