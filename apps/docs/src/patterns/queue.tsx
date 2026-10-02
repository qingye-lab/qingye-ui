import { Button } from "@qingye/ui/components/button";
import { FileUpload } from "@qingye/ui/components/file-upload";
import { Progress, ProgressLabel, ProgressTrack, ProgressIndicator } from "@qingye/ui/components/progress";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { useState } from "react";
import { queueTransition, type QueueItem, type QueueStage } from "./state";
import { FixtureSettings, Notice, StatusBadge, useTaskTimers } from "./shared";

type QueueEntry = QueueItem & { file: File };
const sampleNames = ["田野笔记.pdf", "植物目录.csv", "声音记录.wav"];
export default function QueuePattern() {
  const [items, setItems] = useState<QueueEntry[]>([]);
  const [lateCancel, setLateCancel] = useState(false);
  const later = useTaskTimers();
  const active = items.some((item) => ["transferring", "processing", "cancelling"].includes(item.stage));
  function transition(id: string, attempt: number, stage: QueueStage) { setItems((list) => list.map((item) => item.id === id && item.attempt === attempt ? queueTransition(item, stage) : item)); }
  function start(ids: string[], retry = false) {
    const next = items.filter((item) => ids.includes(item.id) && ["ready", "failure"].includes(item.stage));
    setItems((list) => list.map((item) => next.some((target) => target.id === item.id) ? { ...item, attempt: item.attempt + 1, stage: "transferring", progress: 0 } : item));
    next.forEach((item, index) => {
      const attempt = item.attempt + 1;
      later(() => setItems((list) => list.map((current) => current.id === item.id && current.attempt === attempt && current.stage === "transferring" ? { ...current, progress: 65 } : current)), 350);
      later(() => setItems((list) => list.map((current) => current.id === item.id && current.attempt === attempt && current.stage === "transferring" ? queueTransition(current, "processing") : current)), 850);
      later(() => setItems((list) => list.map((current) => current.id === item.id && current.attempt === attempt && current.stage === "processing" ? queueTransition(current, retry ? "success" : index % 3 === 1 ? "failure" : index % 3 === 2 ? "unknown" : "success") : current)), 1900);
    });
  }
  function cancel(item: QueueEntry) { transition(item.id, item.attempt, "cancelling"); later(() => transition(item.id, item.attempt, lateCancel ? "too-late" : "cancelled"), 1000); }
  const count = (stage: QueueStage) => items.filter((item) => item.stage === stage).length;
  return <section className="qy-task" data-pattern="queue" aria-label="资料处理队列"><header><div><p className="qy-task-kicker">田野资料 / 导入</p><h2>从文件到可用资料</h2></div><span className="qy-task-kicker">{items.length} 个文件</span></header>
    <FileUpload className="qy-task-upload" label="待处理文件" description="选择或拖入文件，再开始处理。" disabled={active || Boolean(count("unknown"))} files={items.map((item) => item.file)} onFilesChange={(files) => setItems((list) => files.map((file, index) => list.find((item) => item.file === file) ?? { id: `file-${Date.now()}-${index}`, file, name: file.name, stage: "ready", progress: 0, attempt: 0 }))} getProgress={(file) => { const item = items.find((row) => row.file === file); return item?.stage === "transferring" ? item.progress : undefined; }} getError={(file) => items.find((row) => row.file === file)?.stage === "failure" ? "处理未完成，文件与输入已保留。" : undefined} renderActions={(file) => { const item = items.find((row) => row.file === file); if (!item) return null; return <div className="qy-upload-actions"><StatusBadge value={item.stage} />{["processing", "cancelling"].includes(item.stage) && <Progress value={null}><ProgressLabel>{item.stage === "processing" ? "等待处理" : "等待取消"}</ProgressLabel><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>}{["transferring", "processing", "unknown"].includes(item.stage) && <Button onClick={() => cancel(item)} size="sm" variant="outline">请求取消<span className="sr-only">{item.name}</span></Button>}{item.stage === "unknown" && <Button onClick={() => transition(item.id, item.attempt, "success")} size="sm" variant="outline">核实结果</Button>}</div>; }} />
    {!items.length && <Notice title="队列还是空的">先选择文件，再开始传输。不会自动采用示例资料。</Notice>}
    <div className="qy-task-actions qy-task-actions-wrap"><Button disabled={active || !count("ready")} onClick={() => start(items.filter((item) => item.stage === "ready").map((item) => item.id))}>开始处理 {count("ready")} 个文件</Button><Button disabled={active || !count("failure")} onClick={() => start(items.filter((item) => item.stage === "failure").map((item) => item.id), true)} variant="outline">只重试失败文件</Button></div>
    {!!items.length && !active && <Notice title={`已完成 ${count("success") + count("too-late")}，未完成 ${count("failure")}，待核实 ${count("unknown")}，已取消 ${count("cancelled")}`}>未知结果先核实，已经完成的文件不重复处理。</Notice>}
    <FixtureSettings><Button disabled={active} onClick={() => setItems(sampleNames.map((name, index) => ({ id: `sample-${index}`, name, file: new File(["Qingye synthetic fixture"], name, { lastModified: index + 1 }), stage: "ready", progress: 0, attempt: 0 })))} size="sm" variant="outline">载入三份样例文件</Button><label className="qy-task-actions"><Checkbox checked={lateCancel} onCheckedChange={setLateCancel} />取消过晚，返回已完成</label><p>不读取或上传文件内容，只使用文件名称演示阶段。第一份成功、第二份失败、第三份结果未知。离开页面会终止夹具计时并清空本地队列；真实任务必须交给应用/后端管理。</p></FixtureSettings>
  </section>;
}
