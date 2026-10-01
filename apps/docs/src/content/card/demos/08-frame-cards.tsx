import {
  Button,
  Card,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
} from "@yanqing/ui";
import { KeyRoundIcon, PlusIcon } from "lucide-react";

export const meta = {
  title: "卡片框架：卡片",
  description: "标题与说明落在外框的浅底上，内部卡片去掉阴影并贴合外框圆角。",
};

const keys = [
  { name: "生产环境服务端", value: "yq_live_••••3f9a", usage: "3月2日创建 · 今天使用过" },
  { name: "数据同步脚本", value: "yq_live_••••a71c", usage: "8月19日创建 · 从未使用" },
];

export default function Demo() {
  return (
    <CardFrame className="w-full max-w-lg">
      <CardFrameHeader>
        <CardFrameTitle>API 密钥</CardFrameTitle>
        <CardFrameDescription>仅用于服务端调用，不要放进前端代码。</CardFrameDescription>
        <CardFrameAction>
          <Button size="sm" variant="outline">
            <PlusIcon aria-hidden="true" />
            新建
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Card>
        <CardPanel className="py-0">
          <ul className="divide-y">
            {keys.map((key) => (
              <li key={key.value} className="flex items-center gap-3 py-4">
                <KeyRoundIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-medium text-sm">{key.name}</span>
                  <span className="truncate font-mono text-muted-foreground text-xs">{key.value}</span>
                  <span className="truncate text-muted-foreground text-xs">{key.usage}</span>
                </div>
                <Button size="sm" variant="destructive-outline">撤销</Button>
              </li>
            ))}
          </ul>
        </CardPanel>
      </Card>
      <CardFrameFooter className="text-muted-foreground text-sm">密钥只在创建时完整显示一次。</CardFrameFooter>
    </CardFrame>
  );
}
