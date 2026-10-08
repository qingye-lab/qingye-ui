import { Avatar, AvatarFallback, AvatarImage } from "@qingye_lab/ui/components/avatar";
import { Inline } from "@qingye_lab/ui/components/layout";

export const meta = { title: "图片与回退", titleEn: "Image and fallback" };

const sample = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='black'/%3E%3Ccircle cx='20' cy='20' r='11' fill='white'/%3E%3C/svg%3E";

// 回退显示的是**这个人的名字的第一个字**，不是「图」——回退态也要让人认得出是谁。
// 首字由调用方给出：组件不知道某个字符串是不是人名，也不从可访问名称里猜。
export default function Demo() {
  return <Inline>
    {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Avatar key={size} label="陈致远" size={size}><AvatarFallback>陈</AvatarFallback></Avatar>)}
    <Avatar label="李一鸣"><AvatarFallback>李</AvatarFallback></Avatar>
    <Avatar label="Wen Zhang"><AvatarFallback>W</AvatarFallback></Avatar>
    <Avatar label="有头像的成员"><AvatarImage src={sample} /><AvatarFallback>有</AvatarFallback></Avatar>
  </Inline>;
}
