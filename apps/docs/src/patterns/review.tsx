import { Button } from "@qingye/ui/components/button";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { useRef, useState } from "react";
import { scopeKey, type Outcome } from "./state";
import { FixtureSettings, Notice, OutcomeChoice, useTaskTimers } from "./shared";

const proposals = [{ id: "name", field: "资料名称", before: "秋天", after: "秋日田野笔记" }, { id: "type", field: "资料类型", before: "未分类", after: "笔记" }, { id: "author", field: "作者署名", before: "林", after: "林川" }];
export default function ReviewPattern() {
  const [selected, setSelected] = useState(["name", "type"]);
  const [version, setVersion] = useState(1);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [status, setStatus] = useState("reviewing");
  const [outcome, setOutcome] = useState<Outcome>("success");
  const [submitted, setSubmitted] = useState<string[]>([]);
  const epoch = useRef(0);
  const later = useTaskTimers();
  const current = scopeKey(version, selected);
  const canSubmit = confirmed === current && selected.length > 0;
  function changeScope(ids: string[]) { setSelected(ids); setConfirmed(null); setStatus("invalidated"); epoch.current += 1; }
  function submit() {
    if (!canSubmit || status === "submitting" || status === "unknown") return;
    const ids = [...selected], generation = ++epoch.current;
    setStatus("submitting");
    later(() => { if (generation !== epoch.current) return; setStatus(outcome); if (outcome === "success") { setSubmitted(ids); setConfirmed(null); } }, 1000);
  }
  return <section className="qy-task" data-pattern="review" aria-label="资料修改审核"><header><div><p className="qy-task-kicker">秋日田野笔记 / 修改建议</p><h2>先比较，再采用</h2></div><span className="qy-task-kicker">建议版本 {version}</span></header>
    <Table className="qy-task-table"><caption className="sr-only">每项建议的原值、建议值与采用选择</caption><TableHeader><TableRow><TableHead>采用</TableHead><TableHead>字段</TableHead><TableHead>原值</TableHead><TableHead>建议值</TableHead></TableRow></TableHeader><TableBody>{proposals.map((row) => <TableRow key={row.id}><TableCell><Checkbox aria-label={`采用${row.field}建议`} checked={selected.includes(row.id)} disabled={["submitting", "unknown"].includes(status)} onCheckedChange={(checked) => changeScope(checked ? [...selected, row.id] : selected.filter((id) => id !== row.id))} /></TableCell><TableCell>{row.field}</TableCell><TableCell>{row.before}</TableCell><TableCell>{row.after}{row.id === "name" && version > 1 ? " · 更新" : ""}</TableCell></TableRow>)}</TableBody></Table>
    <p>将采用 {selected.length} 项建议。未选中的字段保持原值。</p>
    {status === "invalidated" && <Notice title="范围或版本已改变">请重新核对当前建议，再确认本次采用范围。</Notice>}
    {status === "failure" && <Notice title="采用未完成" tone="error">选择仍在。可按已确认的同一范围重试。</Notice>}
    {status === "unknown" && <Notice title="采用结果待核实" tone="warning">请先核实原操作，不要重复采用。</Notice>}
    {status === "success" && <Notice title={`已采用 ${submitted.length} 项建议`} tone="success">完成针对已确认的范围，其他字段保持原值。</Notice>}
    <div className="qy-task-actions qy-task-actions-wrap"><Button disabled={!selected.length || ["submitting", "unknown"].includes(status)} onClick={() => { setConfirmed(current); setStatus("confirmed"); }} variant="outline">核对并确认 {selected.length} 项</Button><Button disabled={!canSubmit || status === "unknown"} loading={status === "submitting"} onClick={submit}>采用已确认建议</Button>{status === "unknown" && <Button onClick={() => { setSubmitted([...selected]); setStatus("success"); setConfirmed(null); }}>核实采用结果</Button>}<Button disabled={["submitting", "unknown"].includes(status)} onClick={() => changeScope([])} variant="ghost">全部拒绝</Button></div>
    <FixtureSettings><OutcomeChoice value={outcome} onChange={setOutcome} /><Button disabled={status === "unknown"} onClick={() => { epoch.current += 1; setVersion(version + 1); setConfirmed(null); setStatus("invalidated"); }} size="sm" variant="outline">重放建议版本变化</Button><p>确认绑定建议版本与字段 ID。只保留在本次页面；应用接入时需进一步绑定对象版本与真实提交内容。</p></FixtureSettings>
  </section>;
}
