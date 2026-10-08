import MenuDemo from "@/content/menu/demos/01-task";
import ContextMenuDemo from "@/content/context-menu/demos/01-task";
import NavigationMenuDemo from "@/content/navigation-menu/demos/01-task";
import TabsDemo from "@/content/tabs/demos/01-task";
import TreeDemo from "@/content/tree/demos/01-task";
import SidebarDemo from "@/content/sidebar/demos/01-task";
import FilterBarDemo from "@/content/filter-bar/demos/01-task";
import BulkActionBarDemo from "@/content/bulk-action-bar/demos/01-task";
import DataTableDemo from "@/content/data-table/demos/01-task";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading } from "@qingye_lab/ui/components/typography";
const demos = [["命令", MenuDemo], ["上下文命令", ContextMenuDemo], ["导航分组", NavigationMenuDemo], ["视角", TabsDemo], ["层级", TreeDemo], ["侧栏", SidebarDemo], ["筛选", FilterBarDemo], ["共同动作", BulkActionBarDemo], ["集合比较", DataTableDemo]] as const;
export default function Batch11NavigationCollection() { return <section id="batch11-navigation-collection" className="min-w-0"><Stack gap="section"><Heading level={2} step="chapter">导航、命令与集合</Heading>{demos.map(([name, Demo]) => <Stack key={name}><Heading level={3}>{name}</Heading><Demo /></Stack>)}</Stack></section>; }
