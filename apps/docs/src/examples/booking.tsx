import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { AvatarGroup } from "@qingye_lab/ui/components/avatar-group";
import { Badge } from "@qingye_lab/ui/components/badge";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { CheckboxGroup } from "@qingye_lab/ui/components/checkbox-group";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxControl, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger, ComboboxValue } from "@qingye_lab/ui/components/combobox";
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Field, FieldContent, FieldDescription, FieldError, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";
import { Form, focusFirstInvalid } from "@qingye_lab/ui/components/form";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline } from "@qingye_lab/ui/components/layout";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { Radio, RadioGroup } from "@qingye_lab/ui/components/radio-group";
import { Result, ResultActions, ResultDescription, ResultTitle } from "@qingye_lab/ui/components/result";
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaViewport } from "@qingye_lab/ui/components/scroll-area";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";
import { Step, StepDescription, Steps, StepTitle, type StepState } from "@qingye_lab/ui/components/steps";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { TimeField } from "@qingye_lab/ui/components/time-field";
import { toastManager } from "@qingye_lab/ui/components/toast";
import { Heading } from "@qingye_lab/ui/components/typography";
import "./examples.css";
import { useExampleEmbedded } from "./embedding";

/*
 * 会议室预约：日常应用的分步填写与实时日程联动。
 * - 名实相符：左侧步骤同时是已填内容的摘要；顶栏「今日预约」实时列出全部已订时段并支持取消。
 * - 相成相制：人数、参会同事与房间容量互相制约；设施筛选与冲突时段实时限制可选房间，并在说明中写明原因。
 * - 进退相承：返回上一步保留全部填写；确认后真实写入当日日程并刷新热力图，撤销则移除该条并回到核对步。
 * - 随境取度：错误原位出现并落焦点，确认结果由 Result 清晰呈现。
 */

type Gear = "显示屏" | "白板" | "投影" | "视频会议" | "扩声";
type Room = { id: string; name: string; capacity: number; gear: readonly Gear[] };
type BookingEntry = { id: string; roomId: string; start: number; end: number; topic: string; removable?: boolean };

const ROOMS: readonly Room[] = [
  { id: "bamboo", name: "竹间", capacity: 4, gear: ["显示屏"] },
  { id: "pine", name: "松间", capacity: 8, gear: ["显示屏", "白板"] },
  { id: "plum", name: "梅间", capacity: 12, gear: ["投影", "视频会议"] },
  { id: "orchid", name: "兰厅", capacity: 30, gear: ["投影", "扩声", "视频会议"] },
];

const INITIAL_BOOKINGS: readonly BookingEntry[] = [
  { id: "seed-1", roomId: "bamboo", start: 14 * 60, end: 15 * 60, topic: "前端组件走查" },
  { id: "seed-2", roomId: "pine", start: 10 * 60, end: 11 * 60 + 30, topic: "季度排期评审" },
  { id: "seed-3", roomId: "orchid", start: 9 * 60, end: 12 * 60, topic: "产品设计评审会" },
];

const SLOTS = ["09:30", "11:00", "14:00", "16:00"];
const ALL_GEAR: readonly Gear[] = ["显示屏", "白板", "投影", "视频会议", "扩声"];
const COLLEAGUES = ["陈致远", "李一鸣", "王一帆", "赵子纯", "林晚", "周禾", "吴清和"];
const REMINDERS = ["提前 10 分钟", "提前 30 分钟", "不提醒"] as const;
const OPEN = 9 * 60;
const CLOSE = 18 * 60;
const DURATIONS = [{ value: 30, label: "30 分钟" }, { value: 60, label: "1 小时" }, { value: 120, label: "2 小时" }];
const dateText = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" });

const clock = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
const parseTime = (value: string | null): number | undefined => {
  if (!value) return undefined;
  const match = /^(\d{2}):(\d{2})/.exec(value);
  if (!match) return undefined;
  return Number(match[1]) * 60 + Number(match[2]);
};

type Draft = {
  date?: Date;
  startTime: string | null;
  duration: number;
  requiredGear: Gear[];
  room?: string;
  attendees: string[];
  people: number | null;
  topic: string;
  note: string;
  reminder: (typeof REMINDERS)[number];
  video: boolean;
};

type Errors = Partial<Record<"date" | "start" | "room" | "people" | "topic", string>>;
const STEPS = ["时间", "房间", "核对"] as const;

const overlaps = (from: number, to: number, start: number, end: number) => from < end && to > start;

function findConflict(bookings: readonly BookingEntry[], roomId: string, start?: number, duration = 0) {
  if (start === undefined) return undefined;
  return bookings.find((entry) => entry.roomId === roomId && overlaps(entry.start, entry.end, start, start + duration));
}

function missingGear(room: Room, required: readonly Gear[]) {
  return required.filter((g) => !room.gear.includes(g));
}

function validate(step: number, draft: Draft, bookings: readonly BookingEntry[]): Errors {
  const errors: Errors = {};
  const start = parseTime(draft.startTime);
  if (step === 0) {
    if (!draft.date) errors.date = "请选择日期";
    if (start === undefined) errors.start = "请填写开始时间";
    else if (start < OPEN) errors.start = `会议室最早 ${clock(OPEN)} 开放`;
    else if (start + draft.duration > CLOSE) errors.start = `会议需在 ${clock(CLOSE)} 前结束，请提前开始或缩短时长`;
  }
  if (step === 1) {
    const room = ROOMS.find((item) => item.id === draft.room);
    if (!room) errors.room = "请选择一间房间";
    else {
      const clash = findConflict(bookings, room.id, start, draft.duration);
      const missing = missingGear(room, draft.requiredGear);
      if (clash) errors.room = `${room.name}在 ${clock(clash.start)}–${clock(clash.end)} 已被预约，请换一间或改时间`;
      else if (missing.length) errors.room = `${room.name}缺少所需设施（${missing.join("、")}），请换一间或调整设施要求`;
    }
    if (!draft.people || draft.people < 1) errors.people = "请填写参会人数";
    else if (draft.people < draft.attendees.length) errors.people = `已选 ${draft.attendees.length} 位参会同事，参会人数不能少于 ${draft.attendees.length} 人`;
    else if (room && draft.people > room.capacity) errors.people = `${room.name}最多 ${room.capacity} 人。请减少人数，或换一间更大的房间`;
  }
  if (step === 2 && !draft.topic.trim()) errors.topic = "请填写会议主题，方便同事认出这次预约";
  return errors;
}

function Main({ className, children }: { className: string; children: React.ReactNode }) {
  return useExampleEmbedded() ? <div className={className}>{children}</div> : <main className={className} id="main" tabIndex={-1}>{children}</main>;
}

const DEFAULT_DATE = new Date(2026, 9, 7);

function initialDraft(): Draft {
  return {
    date: DEFAULT_DATE,
    startTime: "14:00",
    duration: 60,
    requiredGear: [],
    attendees: ["陈致远", "林晚"],
    people: 4,
    topic: "",
    note: "",
    reminder: "提前 10 分钟",
    video: false,
  };
}

export default function BookingApp() {
  const [bookings, setBookings] = useState<BookingEntry[]>(() => [...INITIAL_BOOKINGS]);
  const [lastBookingId, setLastBookingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [failedStep, setFailedStep] = useState<number | null>(null);
  const [booked, setBooked] = useState(false);
  const [undone, setUndone] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const roomsLabel = useId();
  const gearLabel = useId();
  const durationLabel = useId();
  const slotLabel = useId();

  const start = parseTime(draft.startTime);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => {
      const next = { ...current, [key]: value };
      const nextStart = parseTime(next.startTime);
      const chosen = ROOMS.find((item) => item.id === next.room);
      if (chosen && (key === "startTime" || key === "duration" || key === "requiredGear")) {
        if (findConflict(bookings, chosen.id, nextStart, next.duration) || missingGear(chosen, next.requiredGear).length > 0) {
          delete next.room;
        }
      }
      if (key === "attendees") {
        const list = value as string[];
        if ((next.people ?? 0) < list.length) next.people = list.length;
      }
      return next;
    });
    setErrors((current) => {
      const next = { ...current };
      if (key === "startTime" || key === "duration") delete next.start;
      else delete next[key as keyof Errors];
      if (key === "room" || key === "attendees") delete next.people;
      return next;
    });
    setFailedStep(null);
  };

  useEffect(() => { if (attempt > 0 && form.current) focusFirstInvalid(form.current); }, [attempt]);
  const go = (next: number) => { setStep(next); setErrors({}); requestAnimationFrame(() => heading.current?.focus()); };

  const room = ROOMS.find((item) => item.id === draft.room);
  const end = start !== undefined ? start + draft.duration : undefined;
  const when = draft.date && start !== undefined && end !== undefined ? `${dateText.format(draft.date)} ${clock(start)}–${clock(end)}` : undefined;
  const stepState = (index: number): StepState => (booked ? "complete" : index === step ? (failedStep === index ? "error" : "current") : index < step ? "complete" : "upcoming");
  const summary = [
    when ?? "未选择",
    room ? `${room.name} · ${draft.people ?? 0} 人` : "未选择",
    booked ? "已预约" : draft.topic.trim() || "待填写主题",
  ];

  const availableRoomsCount = useMemo(() => {
    if (start === undefined) return ROOMS.length;
    return ROOMS.filter((r) => !findConflict(bookings, r.id, start, draft.duration)).length;
  }, [bookings, start, draft.duration]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(step, draft, bookings);
    setErrors(found);
    if (Object.keys(found).length) { setFailedStep(step); setAttempt((count) => count + 1); return; }
    setFailedStep(null);
    if (step < 2) {
      go(step + 1);
    } else if (room && start !== undefined && end !== undefined) {
      const id = `booking-${Date.now()}`;
      setBookings((prev) => [...prev, { id, roomId: room.id, start, end, topic: draft.topic.trim(), removable: true }]);
      setLastBookingId(id);
      setBooked(true);
      setUndone(false);
      toastManager.add({ title: `已预约${room.name}`, description: when, type: "success" });
      requestAnimationFrame(() => heading.current?.focus());
    }
  };

  const undoBooking = () => {
    if (lastBookingId) setBookings((prev) => prev.filter((item) => item.id !== lastBookingId));
    setLastBookingId(null);
    setBooked(false);
    setUndone(true);
    go(2);
  };

  const cancelById = (id: string) => {
    setBookings((prev) => prev.filter((item) => item.id !== id));
    if (id === lastBookingId) {
      setLastBookingId(null);
      setBooked(false);
    }
    toastManager.add({ title: "已取消该预约", type: "info" });
  };

  return (
    <div className="booking">
      <header className="booking-bar">
        <span aria-hidden="true" className="booking-mark">会</span>
        <span className="text-body-strong">预约会议室</span>
      </header>
      <ScrollAreaRoot className="h-full min-h-0">
        <ScrollAreaViewport className="h-full" fade tabIndex={-1}>
          <Main className="booking-main">
              <aside aria-label="预约步骤" className="booking-steps">
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
              <Result tone="success">
                <ResultTitle id="booking-title" level={1} ref={heading} tabIndex={-1}>已预约{room.name}</ResultTitle>
                <ResultDescription>{when}，{room.name}，已通知 {draft.attendees.length} 位同事。</ResultDescription>
                <ResultActions>
                  <Button onClick={undoBooking} variant="bordered">撤销预约</Button>
                  <Button
                    onClick={() => {
                      setDraft({ ...initialDraft(), startTime: "15:30", topic: "", note: "" });
                      setBooked(false);
                      setUndone(false);
                      setLastBookingId(null);
                      go(0);
                    }}
                  >
                    再订一间
                  </Button>
                </ResultActions>
              </Result>
              <Summary draft={draft} room={room} when={when} />
            </div>
          ) : (
            <Form className="booking-stack" noValidate onSubmit={submit} ref={form}>
              <Heading id="booking-title" level={1} ref={heading} step="title" tabIndex={-1}>{["选择时间", "选择房间", "核对并确认"][step]}</Heading>

              {step === 0 && (
                <>
                  <Field invalid={!!errors.date} name="date">
                    <FieldLabel>日期</FieldLabel>
                    <DatePicker onValueChange={(value) => set("date", value ?? undefined)} value={draft.date} />
                    {errors.date && <FieldError>{errors.date}</FieldError>}
                  </Field>
                  <div className="booking-row">
                    <Field invalid={!!errors.start} name="start">
                      <FieldLabel>开始时间</FieldLabel>
                      <TimeField value={draft.startTime} onValueChange={(value) => set("startTime", value)} />
                      {errors.start ? <FieldError>{errors.start}</FieldError> : <FieldDescription>开放时段 09:00–18:00</FieldDescription>}
                    </Field>
                    <Field>
                      <FieldTitle id={durationLabel}>时长</FieldTitle>
                      <SegmentedControl aria-labelledby={durationLabel} onValueChange={(value) => set("duration", Number(value))} value={draft.duration}>
                        {DURATIONS.map((item) => <SegmentedControlItem key={item.value} value={item.value}>{item.label}</SegmentedControlItem>)}
                      </SegmentedControl>
                    </Field>
                  </div>
                  <Inline gap="field" className="flex-wrap items-end">
                    <Field>
                      <FieldTitle id={slotLabel}>常用时段</FieldTitle>
                      <SegmentedControl aria-labelledby={slotLabel} onValueChange={(value) => set("startTime", String(value))} value={SLOTS.includes(draft.startTime ?? "") ? draft.startTime : null}>
                        {SLOTS.map((slot) => <SegmentedControlItem key={slot} value={slot}>{slot}</SegmentedControlItem>)}
                      </SegmentedControl>
                    </Field>
                    {start !== undefined && (
                      <Badge {...(availableRoomsCount === 0 ? { tone: "danger" as const } : {})}>
                        {availableRoomsCount} / {ROOMS.length} 间空闲
                      </Badge>
                    )}
                  </Inline>
                </>
              )}

              {step === 1 && (
                <>
                  <Field name="requiredGear">
                    <FieldTitle id={gearLabel}>所需设施（可选）</FieldTitle>
                    <CheckboxGroup
                      aria-labelledby={gearLabel}
                      className="flex-row flex-wrap gap-x-(--qy-field-group-gap) gap-y-(--qy-field-gap)"
                      value={draft.requiredGear}
                      onValueChange={(value) => set("requiredGear", value as Gear[])}
                    >
                      {ALL_GEAR.map((g) => (
                        <FieldItem key={g}><Checkbox value={g} /><FieldLabel>{g}</FieldLabel></FieldItem>
                      ))}
                    </CheckboxGroup>
                  </Field>

                  <Field invalid={!!errors.room} name="room">
                    <FieldTitle id={roomsLabel}>房间</FieldTitle>
                    <RadioGroup aria-labelledby={roomsLabel} className="booking-rooms" onValueChange={(value) => set("room", String(value))} value={draft.room ?? null}>
                      {ROOMS.map((item) => {
                        const clash = findConflict(bookings, item.id, start, draft.duration);
                        const missing = missingGear(item, draft.requiredGear);
                        const unavailable = Boolean(clash || missing.length);
                        return (
                          <FieldItem disabled={unavailable} key={item.id}>
                            <Radio disabled={unavailable} value={item.id} />
                            <FieldContent>
                              <FieldLabel>{item.name}<span className="booking-capacity numeric">{item.capacity} 人</span></FieldLabel>
                              <FieldDescription>
                                {clash
                                  ? `${clock(clash.start)}–${clock(clash.end)} 已被预约（${clash.topic}）`
                                  : missing.length
                                    ? `缺少：${missing.join("、")}`
                                    : item.gear.join(" · ")}
                              </FieldDescription>
                            </FieldContent>
                          </FieldItem>
                        );
                      })}
                    </RadioGroup>
                    {errors.room && <FieldError>{errors.room}</FieldError>}
                  </Field>

                  <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <Field name="attendees">
                      <FieldLabel>参会同事</FieldLabel>
                      <Combobox multiple items={COLLEAGUES} value={draft.attendees} onValueChange={(next) => set("attendees", next)}>
                        <ComboboxControl>
                          <ComboboxChips>
                            <ComboboxValue>
                              {(selected: string[]) => selected.map((person) => <ComboboxChip key={person}>{person}</ComboboxChip>)}
                            </ComboboxValue>
                            <ComboboxInput placeholder="搜索并添加同事" />
                          </ComboboxChips>
                          <ComboboxTrigger />
                        </ComboboxControl>
                        <ComboboxPopup>
                          <ComboboxEmpty>没有匹配的同事</ComboboxEmpty>
                          <ComboboxList>{(person: string) => <ComboboxItem key={person} value={person}>{person}</ComboboxItem>}</ComboboxList>
                        </ComboboxPopup>
                      </Combobox>
                    </Field>
                    <Field className="booking-narrow" invalid={!!errors.people} name="people">
                      <FieldLabel>参会人数</FieldLabel>
                      <NumberField max={99} min={1} onValueChange={(value) => set("people", value)} value={draft.people}>
                        <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>
                      </NumberField>
                      {errors.people && <FieldError>{errors.people}</FieldError>}
                    </Field>
                  </div>
                </>
              )}

              {step === 2 && room && when && (
                <>
                  {undone && (
                    <Alert>
                      <div className="grid gap-(--qy-fen)">
                        <AlertTitle>已撤销这次预约</AlertTitle>
                        <AlertDescription>填写的内容仍在，可以修改后重新确认。</AlertDescription>
                      </div>
                    </Alert>
                  )}
                  <Summary draft={draft} room={room} when={when} withTopic={false} />
                  <Field invalid={!!errors.topic} name="topic">
                    <FieldLabel>主题</FieldLabel>
                    <Input placeholder="例如：v6 组件契约评审" onChange={(event) => set("topic", event.target.value)} value={draft.topic} />
                    {errors.topic && <FieldError>{errors.topic}</FieldError>}
                  </Field>
                  <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
                    <Field name="reminder">
                      <FieldLabel>会前提醒</FieldLabel>
                      <Select<(typeof REMINDERS)[number]> items={REMINDERS.map((r) => ({ value: r, label: r }))} value={draft.reminder} onValueChange={(value) => value && set("reminder", value)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectPopup>{REMINDERS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectPopup>
                      </Select>
                    </Field>
                    <Field name="video" orientation="horizontal" className="self-end pb-(--qy-field-gap)">
                      <Checkbox checked={draft.video} onCheckedChange={(checked) => set("video", checked === true)} />
                      <FieldContent><FieldLabel>自动生成视频会议链接</FieldLabel></FieldContent>
                    </Field>
                  </div>
                  <Field name="note">
                    <FieldLabel>备注</FieldLabel>
                    <Textarea placeholder="议程、需要提前准备的材料等" onChange={(event) => set("note", event.target.value)} value={draft.note} />
                  </Field>
                </>
              )}

              <div className="booking-actions">
                {step > 0 && <Button onClick={() => go(step - 1)} variant="bordered">上一步</Button>}
                <Button type="submit">{step < 2 ? "下一步" : "确认预约"}</Button>
              </div>
            </Form>
          )}
            </section>

            <Schedule booked={booked} bookings={bookings} draft={draft} onCancel={cancelById} />
          </Main>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar />
      </ScrollAreaRoot>
    </div>
  );
}

const HOURS = Array.from({ length: (CLOSE - OPEN) / 60 }, (_, index) => OPEN + index * 60);
function Schedule({ draft, booked, bookings, onCancel }: { draft: Draft; booked: boolean; bookings: readonly BookingEntry[]; onCancel: (id: string) => void }) {
  const start = parseTime(draft.startTime);
  const end = start !== undefined ? start + draft.duration : undefined;
  const picked = !booked && start !== undefined && end !== undefined;
  type Cell = "free" | "busy" | "mine" | "clash";
  const cellOf = (roomId: string, hour: number): { state: Cell; topic?: string } => {
    const busy = bookings.find((entry) => entry.roomId === roomId && overlaps(entry.start, entry.end, hour, hour + 60));
    const mine = picked && draft.room === roomId && overlaps(start, end, hour, hour + 60);
    if (mine && busy) return { state: "clash", topic: busy.topic };
    if (mine) return { state: "mine" };
    if (busy) return { state: "busy", topic: busy.topic };
    return { state: "free" };
  };
  const grid = ROOMS.map((room) => ({ room, cells: HOURS.map((hour) => cellOf(room.id, hour)) }));
  const present = new Set(grid.flatMap((row) => row.cells.map((cell) => cell.state)));
  const legend = ([["busy", "已有预约"], ["mine", "你的时段"], ["clash", "冲突"]] as const).filter(([state]) => present.has(state));
  const title = booked ? "当天占用（已写入日程）" : draft.date ? `${dateText.format(draft.date)}占用` : "当天占用";
  return (
    <aside aria-label="当天日程与占用" className="booking-schedule">
      <table className="booking-occ">
        <caption className="text-body-strong">{title}</caption>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">房间</span></th>
            {HOURS.map((hour) => (
              <th key={hour} scope="col" className="numeric" data-picked={picked && !draft.room && overlaps(start, end, hour, hour + 60) ? "" : undefined}>{clock(hour).slice(0, 2)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map(({ room, cells }) => (
            <tr key={room.id}>
              <th scope="row">{room.name}</th>
              {cells.map((cell, index) => (
                <td key={HOURS[index]} data-state={cell.state} title={cell.topic}>
                  {cell.state !== "free" && <span className="sr-only">{cell.state === "mine" ? "你的时段" : cell.state === "clash" ? `冲突，已有${cell.topic}` : cell.topic}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {legend.length > 0 && (
        <ul className="booking-legend">
          {legend.map(([state, label]) => <li key={state}><span aria-hidden="true" className="booking-swatch" data-state={state} />{label}</li>)}
        </ul>
      )}
      <div className="booking-agenda">
        <div className="booking-agenda-head">
          <span className="text-body-strong">当日已订</span>
          <span className="numeric text-support text-muted-foreground">{bookings.length} 场</span>
        </div>
        <ul className="booking-agenda-list">
          {bookings.map((entry) => {
            const targetRoom = ROOMS.find((r) => r.id === entry.roomId);
            return (
              <li key={entry.id} className="booking-agenda-item">
                <div className="grid min-w-0 gap-0.5">
                  <span className="truncate text-body">{entry.topic}</span>
                  <span className="numeric text-support text-muted-foreground">
                    {targetRoom?.name} · {clock(entry.start)}–{clock(entry.end)}
                  </span>
                </div>
                {entry.removable && <Button size="xs" variant="quiet" onClick={() => onCancel(entry.id)}>取消</Button>}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

function Summary({ draft, room, when, withTopic = true }: { draft: Draft; room: Room; when: string; withTopic?: boolean }) {
  return (
    <DescriptionList>
      <DescriptionListItem><DescriptionListTerm>时间</DescriptionListTerm><DescriptionListDetail>{when}</DescriptionListDetail></DescriptionListItem>
      <DescriptionListItem><DescriptionListTerm>房间</DescriptionListTerm><DescriptionListDetail>{room.name}，{room.gear.join(" · ")}</DescriptionListDetail></DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>参会人</DescriptionListTerm>
        <DescriptionListDetail>
          <Inline gap="field" className="flex-wrap">
            {draft.attendees.length > 0 && <AvatarGroup aria-label="参会同事" max={4} size="xs" items={draft.attendees.map((label) => ({ label }))} />}
            <span className="numeric">{draft.people} / {room.capacity} 人</span>
          </Inline>
        </DescriptionListDetail>
      </DescriptionListItem>
      <DescriptionListItem><DescriptionListTerm>提醒</DescriptionListTerm><DescriptionListDetail>{draft.reminder}{draft.video ? " · 附视频链接" : ""}</DescriptionListDetail></DescriptionListItem>
      {withTopic && draft.topic.trim() ? <DescriptionListItem><DescriptionListTerm>主题</DescriptionListTerm><DescriptionListDetail>{draft.topic}</DescriptionListDetail></DescriptionListItem> : null}
    </DescriptionList>
  );
}
