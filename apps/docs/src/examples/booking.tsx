import { useEffect, useId, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Field, FieldContent, FieldDescription, FieldError, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";
import { Form, focusFirstInvalid } from "@qingye_lab/ui/components/form";
import { Input } from "@qingye_lab/ui/components/input";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { Radio, RadioGroup } from "@qingye_lab/ui/components/radio-group";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";
import { Step, StepDescription, Steps, StepTitle, type StepState } from "@qingye_lab/ui/components/steps";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { Heading } from "@qingye_lab/ui/components/typography";
import "./examples.css";

/*
 * 会议室预约：一个日常应用的分步填写。数据都在本页，没有请求；「确认预约」只改变本页的事实，撤销也是。
 * - 名实相符：左侧步骤同时是已填内容的摘要；每一步的说明写的是选中的值，不是「已完成」。
 * - 相成相制：人数与房间互相制约，超过容量时错误落在人数上，并说出两条出路；与已有预约冲突的房间不可选，原因写在它自己的说明里。
 * - 进退相承：返回上一步保留全部填写；确认之后可以撤销，撤销回到核对这一步，草稿仍在。
 * - 随境取度：错误原位出现并落焦点，不用会消失的提示。
 */
type Room = { id: string; name: string; capacity: number; gear: string; busy?: [number, number] };
// 已有预约（按一天中的分钟数）。示例里每天相同。
const ROOMS: Room[] = [
  { id: "bamboo", name: "竹间", capacity: 4, gear: "显示屏", busy: [14 * 60, 15 * 60] },
  { id: "pine", name: "松间", capacity: 8, gear: "显示屏 · 白板", busy: [10 * 60, 11 * 60 + 30] },
  { id: "plum", name: "梅间", capacity: 12, gear: "投影 · 视频会议" },
  { id: "orchid", name: "兰厅", capacity: 30, gear: "投影 · 扩声", busy: [9 * 60, 12 * 60] },
];
const CLOSE = 18 * 60;
const TIMES = Array.from({ length: 18 }, (_, index) => 9 * 60 + index * 30);
const clock = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
const DURATIONS = [{ value: 30, label: "30 分钟" }, { value: 60, label: "1 小时" }, { value: 120, label: "2 小时" }];
const dateText = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" });

type Draft = { date?: Date; start?: number; duration: number; room?: string; people: number | null; topic: string; note: string; video: boolean };
type Errors = Partial<Record<"date" | "start" | "room" | "people" | "topic", string>>;
const STEPS = ["时间", "房间", "核对"] as const;

const conflict = (room: Room, start?: number, duration = 0) => start !== undefined && room.busy !== undefined && start < room.busy[1] && start + duration > room.busy[0];

function validate(step: number, draft: Draft): Errors {
  const errors: Errors = {};
  if (step === 0) {
    if (!draft.date) errors.date = "请选择日期";
    if (draft.start === undefined) errors.start = "请选择开始时间";
    else if (draft.start + draft.duration > CLOSE) errors.start = `会议需在 ${clock(CLOSE)} 前结束，请提前开始或缩短时长`;
  }
  if (step === 1) {
    const room = ROOMS.find((item) => item.id === draft.room);
    if (!room) errors.room = "请选择一间房间";
    if (!draft.people || draft.people < 1) errors.people = "请填写参会人数";
    else if (room && draft.people > room.capacity) errors.people = `${room.name}最多 ${room.capacity} 人。请减少人数，或换一间更大的房间`;
  }
  if (step === 2 && !draft.topic.trim()) errors.topic = "请填写会议主题，方便同事认出这次预约";
  return errors;
}

export default function BookingApp() {
  const [draft, setDraft] = useState<Draft>({ duration: 60, people: 4, topic: "", note: "", video: false });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [failedStep, setFailedStep] = useState<number | null>(null);
  const [booked, setBooked] = useState(false);
  const [undone, setUndone] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const roomsLabel = useId();
  const durationLabel = useId();
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => { setDraft((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: undefined })); setFailedStep(null); };

  // 校验结果先渲染成 aria-invalid，再落焦点到第一个无效字段；换步之后焦点落到这一步的标题。
  useEffect(() => { if (attempt > 0 && form.current) focusFirstInvalid(form.current); }, [attempt]);
  const go = (next: number) => { setStep(next); setErrors({}); requestAnimationFrame(() => heading.current?.focus()); };

  const room = ROOMS.find((item) => item.id === draft.room);
  const end = draft.start !== undefined ? draft.start + draft.duration : undefined;
  const when = draft.date && draft.start !== undefined ? `${dateText.format(draft.date)} ${clock(draft.start)}–${clock(end!)}` : undefined;
  const stepState = (index: number): StepState => (booked ? "complete" : index === step ? (failedStep === index ? "error" : "current") : index < step ? "complete" : "upcoming");
  const summary = [when ?? "未选择", room ? `${room.name} · ${draft.people ?? 0} 人` : "未选择", booked ? "已预约" : draft.topic.trim() || "待填写主题"];

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(step, draft);
    setErrors(found);
    if (Object.keys(found).length) { setFailedStep(step); setAttempt((count) => count + 1); return; }
    setFailedStep(null);
    if (step < 2) go(step + 1);
    else { setBooked(true); setUndone(false); requestAnimationFrame(() => heading.current?.focus()); }
  };

  return (
    <div className="booking">
      <header className="booking-bar">
        <span aria-hidden="true" className="booking-mark">青</span>
        <span className="text-body-strong">青野 · 会议室</span>
      </header>
      <main className="booking-main" id="main" tabIndex={-1}>
        <aside className="booking-steps">
          <Steps>
            {STEPS.map((title, index) => (
              <Step key={title} state={stepState(index)}>
                <StepTitle>{title}</StepTitle>
                <StepDescription>{summary[index]}</StepDescription>
              </Step>
            ))}
          </Steps>
        </aside>

        <section aria-labelledby="booking-title" className="booking-panel">
          {booked && room && when ? (
            <div className="booking-stack">
              <Heading id="booking-title" level={1} ref={heading} step="title" tabIndex={-1}>已预约{room.name}</Heading>
              <Alert tone="success">
                <div className="grid gap-(--qy-fen)"><AlertTitle>{when}</AlertTitle><AlertDescription>预约只保存在这个示例页面里，刷新后清除。</AlertDescription></div>
              </Alert>
              <Summary draft={draft} room={room} when={when} />
              <div className="booking-actions">
                <Button onClick={() => { setBooked(false); setUndone(true); go(2); }} variant="bordered">撤销预约</Button>
                <Button onClick={() => { setDraft({ duration: 60, people: 4, topic: "", note: "", video: false }); setBooked(false); setUndone(false); go(0); }} variant="quiet">再订一间</Button>
              </div>
            </div>
          ) : (
            <Form className="booking-stack" noValidate onSubmit={submit} ref={form}>
              <Heading id="booking-title" level={1} ref={heading} step="title" tabIndex={-1}>{["选择时间", "选择房间", "核对并确认"][step]}</Heading>

              {step === 0 && <>
                <Field invalid={!!errors.date} name="date">
                  <FieldLabel>日期</FieldLabel>
                  <DatePicker onValueChange={(value) => set("date", value ?? undefined)} value={draft.date} />
                  {errors.date && <FieldError>{errors.date}</FieldError>}
                </Field>
                <div className="booking-row">
                  <Field invalid={!!errors.start} name="start">
                    <FieldLabel>开始</FieldLabel>
                    <Select items={TIMES.map((value) => ({ value, label: clock(value) }))} onValueChange={(value) => set("start", value as number)} value={draft.start ?? null}>
                      <SelectTrigger><SelectValue placeholder="选择时间" /></SelectTrigger>
                      <SelectPopup>{TIMES.map((value) => <SelectItem key={value} value={value}>{clock(value)}</SelectItem>)}</SelectPopup>
                    </Select>
                    {errors.start && <FieldError>{errors.start}</FieldError>}
                  </Field>
                  <Field>
                    <FieldTitle id={durationLabel}>时长</FieldTitle>
                    <SegmentedControl aria-labelledby={durationLabel} onValueChange={(value) => set("duration", Number(value))} value={draft.duration}>
                      {DURATIONS.map((item) => <SegmentedControlItem key={item.value} value={item.value}>{item.label}</SegmentedControlItem>)}
                    </SegmentedControl>
                  </Field>
                </div>
              </>}

              {step === 1 && <>
                <Field invalid={!!errors.room} name="room">
                  <FieldTitle id={roomsLabel}>房间</FieldTitle>
                  <RadioGroup aria-labelledby={roomsLabel} className="booking-rooms" onValueChange={(value) => set("room", String(value))} value={draft.room ?? null}>
                    {ROOMS.map((item) => {
                      const busy = conflict(item, draft.start, draft.duration);
                      return (
                        <FieldItem disabled={busy} key={item.id}>
                          <Radio disabled={busy} value={item.id} />
                          <FieldContent>
                            <FieldLabel>{item.name}<span className="booking-capacity numeric">{item.capacity} 人</span></FieldLabel>
                            <FieldDescription>{busy && item.busy ? `${clock(item.busy[0])}–${clock(item.busy[1])} 已被预约` : item.gear}</FieldDescription>
                          </FieldContent>
                        </FieldItem>
                      );
                    })}
                  </RadioGroup>
                  {errors.room && <FieldError>{errors.room}</FieldError>}
                </Field>
                <Field className="booking-narrow" invalid={!!errors.people} name="people">
                  <FieldLabel>参会人数</FieldLabel>
                  <NumberField max={99} min={1} onValueChange={(value) => set("people", value)} value={draft.people}>
                    <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>
                  </NumberField>
                  {errors.people && <FieldError>{errors.people}</FieldError>}
                </Field>
              </>}

              {step === 2 && room && when && <>
                {undone && <Alert><div className="grid gap-(--qy-fen)"><AlertTitle>已撤销这次预约</AlertTitle><AlertDescription>填写的内容仍在，可以修改后重新确认。</AlertDescription></div></Alert>}
                <Summary draft={draft} room={room} when={when} withTopic={false} />
                <Field invalid={!!errors.topic} name="topic">
                  <FieldLabel>主题</FieldLabel>
                  <Input onChange={(event) => set("topic", event.target.value)} value={draft.topic} />
                  {errors.topic && <FieldError>{errors.topic}</FieldError>}
                </Field>
                <Field name="note">
                  <FieldLabel>备注</FieldLabel>
                  <Textarea onChange={(event) => set("note", event.target.value)} value={draft.note} />
                </Field>
                <Field name="video" orientation="horizontal">
                  <Checkbox checked={draft.video} onCheckedChange={(checked) => set("video", checked === true)} />
                  <FieldContent><FieldLabel>需要视频会议链接</FieldLabel></FieldContent>
                </Field>
              </>}

              <div className="booking-actions">
                {step > 0 && <Button onClick={() => go(step - 1)} variant="bordered">上一步</Button>}
                <Button type="submit">{step < 2 ? "下一步" : "确认预约"}</Button>
              </div>
            </Form>
          )}
        </section>

        <Schedule booked={booked} draft={draft} />
      </main>
    </div>
  );
}

/*
 * 当天占用：每间一行，横轴 09:00–18:00。已有预约是淡墨的段，你选的时段叠在所选房间那一行（未选房间时每一行都画出，方便比较）；
 * 与已有预约相交时这一段取危险色，房间单选里那一项本来就不可选——两处说的是同一件事实（相成相制：先看见，再选择）。
 * 读屏读每行的文字（房间、容量、占用时段与你的时段），图形本身 aria-hidden。
 */
function Schedule({ draft, booked }: { draft: Draft; booked: boolean }) {
  const span = CLOSE - TIMES[0]!;
  const at = (minutes: number) => `${((minutes - TIMES[0]!) / span) * 100}%`;
  const hours = Array.from({ length: (CLOSE - TIMES[0]!) / 60 + 1 }, (_, index) => TIMES[0]! + index * 60);
  const end = draft.start !== undefined ? draft.start + draft.duration : undefined;
  return (
    <section aria-labelledby="booking-schedule" className="booking-schedule">
      <div className="booking-schedule-head">
        <h2 className="text-heading" id="booking-schedule">当天占用</h2>
        <span className="text-support text-muted-foreground">{draft.date ? dateText.format(draft.date) : "每天相同"}</span>
      </div>
      <div aria-hidden="true" className="booking-hours">
        {hours.map((minutes) => <span key={minutes} style={{ insetInlineStart: at(minutes) }}>{clock(minutes).slice(0, 2)}</span>)}
      </div>
      <ul className="booking-rooms-track">
        {ROOMS.map((room) => {
          const mine = draft.start !== undefined && end !== undefined && (!draft.room || draft.room === room.id);
          const clash = mine && conflict(room, draft.start, draft.duration);
          const chosen = draft.room === room.id;
          const facts = [`${room.name}，${room.capacity} 人`, room.busy ? `${clock(room.busy[0])}–${clock(room.busy[1])} 已被预约` : "全天空闲", mine ? `${booked ? "已预约" : "你选的时段"} ${clock(draft.start!)}–${clock(end!)}${clash ? "，与已有预约冲突" : ""}` : null].filter(Boolean).join("；");
          return (
            <li className="booking-room-row" data-chosen={chosen || undefined} key={room.id}>
              <span className="booking-room-name">{room.name}<span className="numeric">{room.capacity} 人</span></span>
              <span className="sr-only">{facts}</span>
              <span aria-hidden="true" className="booking-track">
                {room.busy ? <span className="booking-busy" style={{ insetInlineStart: at(room.busy[0]), inlineSize: `calc(${at(room.busy[1])} - ${at(room.busy[0])})` }} /> : null}
                {mine ? <span className="booking-mine" data-clash={clash || undefined} data-faint={!draft.room || undefined} style={{ insetInlineStart: at(draft.start!), inlineSize: `calc(${at(end!)} - ${at(draft.start!)})` }} /> : null}
              </span>
            </li>
          );
        })}
      </ul>
      <div aria-hidden="true" className="booking-legend">
        <span><i className="booking-busy" />已有预约</span>
        <span><i className="booking-mine" />你的时段</span>
        <span><i className="booking-mine" data-clash />冲突</span>
      </div>
    </section>
  );
}

function Summary({ draft, room, when, withTopic = true }: { draft: Draft; room: Room; when: string; withTopic?: boolean }) {
  return (
    <DescriptionList>
      <DescriptionListItem><DescriptionListTerm>时间</DescriptionListTerm><DescriptionListDetail>{when}</DescriptionListDetail></DescriptionListItem>
      <DescriptionListItem><DescriptionListTerm>房间</DescriptionListTerm><DescriptionListDetail>{room.name}，{room.gear}</DescriptionListDetail></DescriptionListItem>
      <DescriptionListItem><DescriptionListTerm>人数</DescriptionListTerm><DescriptionListDetail className="numeric">{draft.people} / {room.capacity}</DescriptionListDetail></DescriptionListItem>
      {withTopic && draft.topic.trim() ? <DescriptionListItem><DescriptionListTerm>主题</DescriptionListTerm><DescriptionListDetail>{draft.topic}</DescriptionListDetail></DescriptionListItem> : null}
    </DescriptionList>
  );
}

