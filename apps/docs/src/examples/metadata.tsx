import { TextLink } from "@qingye/ui/components/typography";
import { Link } from "react-router-dom";

export const EXAMPLES = [
  { slug: "dashboard", title: "经营概览", label: "工作台", description: "统计指标、交互图表、项目表格筛选与编辑。", components: ["Sidebar", "Avatar", "Card", "Typography", "Stat", "Chart", "Select", "SearchInput", "Table", "Badge", "Item", "AspectRatio", "Progress", "Button", "Dialog", "Field", "Input", "DatePicker", "Empty", "Toast", "Tabs"] },
  { slug: "mail", title: "青野邮箱", label: "邮件", description: "邮件列表、未读筛选、星标切换与回复表单。", components: ["Sidebar", "Avatar", "SearchInput", "Tabs", "Item", "StatusDot", "Toggle", "Card", "AspectRatio", "Button", "Dialog", "Field", "Input", "Textarea", "Typography", "Empty", "Toast"] },
  { slug: "studio", title: "媒体资源", label: "媒体资源", description: "文件分类与收藏、图片预览、轮播和拖放上传。", components: ["Sidebar", "Avatar", "Tabs", "SearchInput", "ToggleGroup", "Toggle", "Card", "Typography", "AspectRatio", "Badge", "Button", "Dialog", "Carousel", "Field", "Input", "Select", "FileUpload", "Empty", "Toast"] },
] as const;

function componentSlug(name: string) {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function DemoComponentLinks({ slug }: { slug: string }) {
  const example = EXAMPLES.find((item) => item.slug === slug);
  if (!example) return null;
  return <div className="demo-component-links text-caption text-muted-foreground" aria-label={`${example.title}使用组件`}><span>使用组件</span>{example.components.map((component) => <TextLink key={component} variant="muted" render={<Link to={`/docs/components/${componentSlug(component)}`} />}>{component}</TextLink>)}</div>;
}
