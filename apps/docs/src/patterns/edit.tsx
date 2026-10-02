import { Button, buttonVariants } from "@qingye/ui/components/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { Textarea } from "@qingye/ui/components/textarea";
import { Dialog, DialogPopup, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@qingye/ui/components/dialog";
import { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { editReducer, initialEdit, resumeEditState, type EditState, type Outcome } from "./state";
import { FixtureSettings, Notice, OutcomeChoice, readSession, writeSession, useTaskTimers } from "./shared";

function resumeEdit(): EditState {
  return resumeEditState(readSession<EditState>("edit", initialEdit));
}
export default function EditPattern({ compact = false }: { compact?: boolean }) {
  const [state, dispatch] = useReducer(editReducer, undefined, resumeEdit);
  const [outcome, setOutcome] = useState<Outcome>("success");
  const [undoOutcome, setUndoOutcome] = useState<"success" | "failure">("success");
  const [mode, setMode] = useState<"save" | "publish">("save");
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [recovery, setRecovery] = useState<{ objectId: string; draft: EditState["draft"] } | null>(() => { const item = readSession<{ objectId: string; draft: EditState["draft"] } | null>("edit-recovery", null); return item?.draft && item.objectId ? item : null; });
  const requestId = useRef(Date.now());
  const later = useTaskTimers();
  const dirty = state.draft.title !== state.saved.title || state.draft.body !== state.saved.body;
  const undoUnresolved = ["pending", "unknown"].includes(state.undoStatus);
  useEffect(() => { writeSession("edit", state); }, [state]);
  useEffect(() => {
    if (!state.undo || !["available", "failure"].includes(state.undoStatus)) return;
    const timer = setTimeout(() => dispatch({ type: "undo-expire" }), Math.max(0, state.undo.expiresAt - Date.now()));
    return () => clearTimeout(timer);
  }, [state.undo, state.undoStatus]);
  function undo() {
    if (!state.undo || !["available", "failure"].includes(state.undoStatus)) return;
    const { requestId, attempt } = state.undo;
    dispatch({ type: "undo-request", at: Date.now() });
    later(() => dispatch({ type: "undo-result", requestId, attempt: attempt + 1, outcome: undoOutcome }), 750);
  }
  function verifyUndo() {
    if (!state.undo || state.undoStatus !== "unknown") return;
    dispatch({ type: "undo-verify", requestId: state.undo.requestId, attempt: state.undo.attempt, outcome: undoOutcome, at: Date.now() });
  }
  function submit() {
    const id = ++requestId.current;
    dispatch({ type: "submit", id, action: mode });
    if (state.draft.title.trim() && !["saving", "unknown"].includes(state.status) && !undoUnresolved) later(() => dispatch({ type: "result", id, outcome }), 1100);
  }
  function discard() {
    const snapshot = { objectId: state.objectId, draft: state.draft }; writeSession("edit-recovery", snapshot); setRecovery(snapshot);
    dispatch({ type: "discard" }); setConfirmDiscard(false);
  }
  return <section className="qy-task" data-pattern="edit" aria-label="资料编辑">
    <header><div><p className="qy-task-kicker">田野资料 / {state.objectId === "field-note-01" ? "资料 A" : "资料 B"}</p><h2>写下这次观察</h2></div><span className="qy-task-kicker">{dirty ? "有未保存修改" : "与已保存版本一致"}</span></header>
    <div className="qy-task-columns"><form onSubmit={(event) => { event.preventDefault(); submit(); }} className="qy-task-fields">
      <FieldGroup>
        <Field name="title" invalid={Boolean(state.error && !state.draft.title.trim())}><FieldLabel>资料名称</FieldLabel><Input disabled={state.status === "unknown" || undoUnresolved} onValueChange={(value) => dispatch({ type: "change", key: "title", value })} value={state.draft.title} /><FieldDescription>用能辨认这份资料的名称。</FieldDescription>{!state.draft.title.trim() && state.error && <FieldError>{state.error}</FieldError>}</Field>
        <Field name="body"><FieldLabel>观察正文</FieldLabel><Textarea disabled={state.status === "unknown" || undoUnresolved} onChange={(event) => dispatch({ type: "change", key: "body", value: event.target.value })} placeholder="从你注意到的一件事开始。" rows={compact ? 5 : 8} value={state.draft.body} /><FieldDescription>示例只作参考，采用前不会进入正文。</FieldDescription></Field>
      </FieldGroup>
      {state.status === "saving" && <Notice title={state.request?.action === "publish" ? "正在发布" : "正在保存草稿"}>现在可以继续编辑；新输入不会被过期响应覆盖。</Notice>}
      {state.status === "success" && state.undoStatus !== "success" && <Notice title="本次操作已完成" tone="success">已保存版本与当前对象对应。</Notice>}
      {state.status === "failure" && state.draft.title.trim() && <Notice title="保存未完成" tone="error">{state.error}</Notice>}
      {state.status === "unknown" && <Notice title="结果待核实" tone="warning">{state.error}</Notice>}
      {state.status === "restored" && <Notice title="已恢复草稿">草稿仍未保存，可继续编辑。</Notice>}
      <div className="qy-task-actions"><Button disabled={state.status === "unknown" || undoUnresolved} loading={state.status === "saving"} type="submit">{mode === "publish" ? "发布资料" : "保存草稿"}</Button>{state.status === "unknown" && <Button onClick={() => dispatch({ type: "verify" })}>核实原操作</Button>}<Button disabled={!dirty || ["saving", "unknown"].includes(state.status) || undoUnresolved} onClick={() => setConfirmDiscard(true)} variant="outline">放弃这次修改</Button><Link className={buttonVariants({ variant: "ghost" })} to="/docs/patterns/collection">返回资料集合</Link></div>
      {state.undo && <div className="qy-task-fields">{state.undoStatus === "available" && <p className="qy-task-kicker">这次已保存操作可在 15 秒内撤销。</p>}{state.undoStatus === "pending" && <Notice title="正在撤销已保存操作">等待撤销结果，关闭对话框不会代替这个操作。</Notice>}{state.undoStatus === "unknown" && <Notice title="撤销结果待核实" tone="warning">离开时撤销仍在等待结果。草稿与已保存版本已保留，请先核实这次撤销。</Notice>}{state.undoStatus === "success" && <Notice title="撤销已完成" tone="success">已保存版本回到操作前；随后尚未保存的输入仍保留。</Notice>}{state.undoStatus === "failure" && <Notice title="撤销未完成" tone="error">已保存结果保持不变。期限内可以重试撤销。</Notice>}{state.undoStatus === "expired" && <Notice title="撤销期限已过">这次保存保持有效；可以继续编辑，但不能宣称它已撤销。</Notice>}<div className="qy-task-actions"><Button disabled={!["available", "failure"].includes(state.undoStatus)} loading={state.undoStatus === "pending"} onClick={undo} variant="outline">{state.undo.action === "publish" ? "撤销这次发布" : "撤销这次保存"}</Button>{state.undoStatus === "unknown" && <Button onClick={verifyUndo}>核实撤销结果</Button>}</div></div>}
      {mode === "publish" && <p className="qy-task-kicker">发布会使资料进入可阅读状态；本示例只在当前浏览器模拟此结果。</p>}
    </form><aside className="qy-task-aside"><div><h3>从一件小事开始</h3><p>可以记录位置、变化和自己的判断。不需要照着固定提纲填写。</p></div><div><p className="qy-task-kicker">可忽略的写作示例</p><p>河岸的草木开始转黄，一条新踩出的路径穿过旧石阶。</p><Button onClick={() => { dispatch({ type: "change", key: "body", value: "河岸的草木开始转黄，一条新踩出的路径穿过旧石阶。" }); }} disabled={state.status === "unknown" || undoUnresolved} size="sm" variant="outline">采用这段示例</Button></div>{recovery && recovery.objectId === state.objectId && <div><h3>保留的上一份草稿</h3><p>{recovery.draft.title || "尚未命名"}</p><Button disabled={["saving", "unknown"].includes(state.status) || undoUnresolved} onClick={() => dispatch({ type: "restore", draft: recovery.draft })} variant="outline">恢复草稿</Button></div>}</aside></div>
    <Dialog onOpenChange={setConfirmDiscard} open={confirmDiscard}><DialogPopup><DialogHeader><DialogTitle>放弃这次修改？</DialogTitle><DialogDescription>当前输入会回到已保存版本。本示例会在当前浏览器会话保留一份可恢复草稿。</DialogDescription></DialogHeader><DialogFooter><Button onClick={() => setConfirmDiscard(false)} variant="outline">继续编辑</Button><Button onClick={discard}>放弃并保留草稿</Button></DialogFooter></DialogPopup></Dialog>
    <FixtureSettings><div className="qy-task-fields"><label htmlFor="edit-object">当前编辑对象</label><NativeSelect disabled={state.undoStatus === "pending"} id="edit-object" onChange={(event) => dispatch({ type: "switch", objectId: event.target.value })} value={state.objectId}><NativeSelectOption value="field-note-01">资料 A</NativeSelectOption><NativeSelectOption value="field-note-02">资料 B</NativeSelectOption></NativeSelect><label htmlFor="undo-outcome">撤销响应</label><NativeSelect id="undo-outcome" onChange={(event) => setUndoOutcome(event.target.value as "success" | "failure")} value={undoOutcome}><NativeSelectOption value="success">撤销成功</NativeSelectOption><NativeSelectOption value="failure">撤销失败</NativeSelectOption></NativeSelect><Button disabled={!state.undo || undoUnresolved} onClick={() => dispatch({ type: "undo-expire" })} size="sm" variant="outline">重放撤销过期</Button></div><OutcomeChoice onChange={setOutcome} value={outcome} /><div className="qy-task-actions"><Button disabled={["saving", "unknown"].includes(state.status) || undoUnresolved} onClick={() => setMode(mode === "save" ? "publish" : "save")} size="sm" variant="outline">切换为{mode === "save" ? "发布" : "保存草稿"}</Button></div><p>草稿保留在此浏览器会话；关闭会话可能清除。已忽略的过期响应：{state.ignoredResponses}。保存核实由本地夹具返回原操作成功；撤销核实使用所选撤销响应。真实系统需由后端提供原请求的核实协议。</p></FixtureSettings>
  </section>;
}
