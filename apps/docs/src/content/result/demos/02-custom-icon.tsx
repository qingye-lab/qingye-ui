import { Button } from "@qingye_lab/ui/components/button";
import { Result, ResultActions, ResultDescription, ResultTitle } from "@qingye_lab/ui/components/result";
import { IconLock } from "@tabler/icons-react";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "没有权限：自己的标记", titleEn: "No permission: your own mark" } satisfies DemoMeta;

// 没有权限不是成功也不是失败：类别用 warning（仍有形状与读屏前缀），标记换成锁。
export default function Demo() {
  return <Result tone="warning" icon={<IconLock aria-hidden="true" />}>
    <ResultTitle level={3}>你没有查看这份文档的权限</ResultTitle>
    <ResultDescription>向文档所有者申请访问，或回到你有权限的文档。</ResultDescription>
    <ResultActions><Button>申请访问</Button><Button variant="quiet">返回首页</Button></ResultActions>
  </Result>;
}
