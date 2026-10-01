const n=`import { Button } from "@qingye/ui/components/button";
import { Card, CardAction, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { EllipsisIcon } from "lucide-react";

export const meta = { title: "头部操作", description: "CardAction 跨标题与说明两行，固定在右上角。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>生产环境</CardTitle>
        <CardDescription>main 分支 · 2 分钟前部署</CardDescription>
        <CardAction>
          <Menu>
            <MenuTrigger render={<Button size="icon-sm" variant="ghost" aria-label="更多操作" />}>
              <EllipsisIcon aria-hidden="true" />
            </MenuTrigger>
            <MenuPopup align="end">
              <MenuItem>重新部署</MenuItem>
              <MenuItem>查看构建日志</MenuItem>
              <MenuSeparator />
              <MenuItem variant="destructive">回滚到上一版本</MenuItem>
            </MenuPopup>
          </Menu>
        </CardAction>
      </CardHeader>
      <CardPanel>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-muted-foreground">域名</dt>
          <dd className="truncate">shop.qingye.example</dd>
          <dt className="text-muted-foreground">区域</dt>
          <dd>华东 1（杭州）</dd>
          <dt className="text-muted-foreground">构建耗时</dt>
          <dd className="numeric">48 秒</dd>
        </dl>
      </CardPanel>
    </Card>
  );
}
`;export{n as default};
