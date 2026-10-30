import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye_lab/ui/components/progress";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "批量任务：提交、处理、完成或部分失败", titleEn: "Batch task: submitted, processing, done or partly failed", description: "用已有组件组合长任务的各阶段；下方按钮代替服务端返回。", descriptionEn: "Stages of a long task composed from existing components; the buttons below stand in for server replies." } satisfies DemoMeta;

type Item = "waiting" | "done" | "failed";
const total = 6;

export default function Demo() {
  // 任务事实由应用持有：已提交与否、每一项的结果。进度读数只数已确认的项，不用时间推断。
  const [items, setItems] = useState<Item[] | null>(null);
  const settled = items?.filter(item => item !== "waiting").length ?? 0;
  const failed = items?.flatMap((item, index) => item === "failed" ? [index + 1] : []) ?? [];
  const finished = items !== null && settled === total;
  const running = items !== null && !finished;
  const reply = (result: Item) => setItems(current => {
    if (!current) return current;
    const next = [...current];
    const index = next.indexOf("waiting");
    if (index >= 0) next[index] = result;
    return next;
  });
  return <Stack className="w-full max-w-sm">
    <Inline>
      <Button loading={running} disabled={items !== null && !running} onClick={() => setItems(Array<Item>(total).fill("waiting"))}>开始导入</Button>
      <Button variant="quiet" disabled={!running} onClick={() => reply("done")}>返回一项成功</Button>
      <Button variant="quiet" disabled={!running} onClick={() => reply("failed")}>返回一项失败</Button>
    </Inline>
    {items && <Progress value={settled === 0 ? null : settled} max={total} getAriaValueText={(_, actual) => actual === null ? "已提交，等待处理" : `已处理 ${actual} / ${total} 项`}>
      <ProgressLabel>导入</ProgressLabel>
      <ProgressValue>{(_, actual) => actual === null ? "已提交，等待处理" : `${actual} / ${total}`}</ProgressValue>
      <ProgressTrack><ProgressIndicator /></ProgressTrack>
    </Progress>}
    {finished && failed.length === 0 && <Alert tone="success" role="status"><AlertDescription>{total} 项已全部处理。</AlertDescription></Alert>}
    {finished && failed.length > 0 && <Alert tone="warning" role="alert">
      <Stack gap="field">
        <AlertTitle>{total - failed.length} 项已处理，{failed.length} 项失败</AlertTitle>
        <AlertDescription>已处理的项不会重复提交。</AlertDescription>
        <ul className="m-0 grid list-none gap-(--qy-field-gap) p-0 text-body">{failed.map(position => <li key={position}>第 {position} 项</li>)}</ul>
        <Inline><Button variant="bordered" onClick={() => setItems(current => current && current.map(item => item === "failed" ? "waiting" : item))}>重试失败项</Button></Inline>
      </Stack>
    </Alert>}
  </Stack>;
}
