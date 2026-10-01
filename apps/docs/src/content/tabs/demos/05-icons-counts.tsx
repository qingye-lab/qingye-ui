import { Tabs, TabsList, TabsTab } from "@qingye/ui/components/tabs";
import { ArchiveIcon, InboxIcon, SendIcon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "图标、计数与禁用",
  description: "计数使用等宽数字；禁用的标签跳过键盘焦点。",
};

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTab value="inbox">
            <InboxIcon />
            收件箱
            <span className="numeric text-muted-foreground text-xs">12</span>
          </TabsTab>
          <TabsTab value="sent">
            <SendIcon />
            已发送
          </TabsTab>
          <TabsTab disabled value="archive">
            <ArchiveIcon />
            归档
          </TabsTab>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="inbox">
        <TabsList variant="underline">
          <TabsTab aria-label="收件箱" value="inbox">
            <InboxIcon />
          </TabsTab>
          <TabsTab aria-label="已发送" value="sent">
            <SendIcon />
          </TabsTab>
          <TabsTab aria-label="归档" value="archive">
            <ArchiveIcon />
          </TabsTab>
          <TabsTab aria-label="废纸篓" value="trash">
            <Trash2Icon />
          </TabsTab>
        </TabsList>
      </Tabs>
    </div>
  );
}
