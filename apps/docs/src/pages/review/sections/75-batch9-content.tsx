import BreadcrumbDemo from "@/content/breadcrumb/demos/01-path";
import StepsDemo from "@/content/steps/demos/01-progress";
import TimelineDemo from "@/content/timeline/demos/01-sequence";
import TableDemo from "@/content/table/demos/01-comparison";
import PaginationDemo from "@/content/pagination/demos/01-pages";
import EmptyDemo from "@/content/empty/demos/01-states";
import ItemDemo from "@/content/item/demos/01-entry";
import DescriptionListDemo from "@/content/description-list/demos/01-values";
import StatDemo from "@/content/stat/demos/01-facts";
import PageHeaderDemo from "@/content/page-header/demos/01-title";
import ToolbarDemo from "@/content/toolbar/demos/01-format";
import CodeBlockDemo from "@/content/code-block/demos/01-text";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading } from "@qingye_lab/ui/components/typography";

const demos = [["路径", BreadcrumbDemo], ["步骤", StepsDemo], ["时间序列", TimelineDemo], ["比较表", TableDemo], ["分页", PaginationDemo], ["空与未知", EmptyDemo], ["条目", ItemDemo], ["名称与值", DescriptionListDemo], ["度量", StatDemo], ["页面标题", PageHeaderDemo], ["工具组", ToolbarDemo], ["代码", CodeBlockDemo]] as const;
export default function Batch9Content() {
  return <section id="batch9-content" className="min-w-0"><Stack gap="section"><Heading level={2} step="chapter">内容与集合</Heading>{demos.map(([name, Demo]) => <Stack key={name}><Heading level={3}>{name}</Heading><Demo /></Stack>)}</Stack></section>;
}
