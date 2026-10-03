import { Avatar, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";
import { Inline } from "@qingye/ui/components/layout";
const sample = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='white'/%3E%3Ccircle cx='20' cy='20' r='12' fill='black'/%3E%3C/svg%3E";
export const meta = { title: "图片与回退", titleEn: "Image and fallback" };
export default function Demo() { return <Inline>{(["xs","sm","md","lg","xl"] as const).map(size => <Avatar key={size} label={`图像 · ${size}`} size={size}><AvatarFallback>图</AvatarFallback></Avatar>)}<Avatar label="几何图像"><AvatarImage src={sample} /><AvatarFallback>图</AvatarFallback></Avatar></Inline>; }
