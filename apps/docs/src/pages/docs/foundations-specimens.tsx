import { Badge } from "@qingye_lab/ui/components/badge";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Switch } from "@qingye_lab/ui/components/switch";
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { STEPS, useAppearanceKey } from "./foundations-ledger";
import "./foundations.css";

/*
 * 两页的标本：库内组件按原尺寸呈现，不放大。标本下的读数从渲染出的元素上量，不抄令牌表。
 */

type Locale = { en: boolean };
const t = (en: boolean, zh: string, english: string) => (en ? english : zh);
const n = (value: number) => String(Math.round(value * 100) / 100);

/** 渲染后量一次（明暗切换后重量），返回一行读数。 */
function useReadout(read: (root: HTMLElement) => string) {
  const root = useRef<HTMLDivElement>(null);
  const appearance = useAppearanceKey();
  const [text, setText] = useState("");
  useLayoutEffect(() => {
    if (root.current) setText(read(root.current));
    // `read` is defined inline by each specimen; re-reading on theme change is enough.
  }, [appearance]);
  return [root, text] as const;
}
const box = (root: HTMLElement, selector: string) => root.querySelector(selector)?.getBoundingClientRect() ?? { width: 0, height: 0 };
const style = (root: HTMLElement, selector: string) => {
  const element = root.querySelector(selector);
  return element ? getComputedStyle(element) : undefined;
};

function Readout({ children }: { children: ReactNode }) {
  return <p className="spec-readout">{children || " "}</p>;
}

export function CaiSpecimen({ en }: Locale) {
  const [root, text] = useReadout((el) => {
    const line = style(el, "[data-slot=field-label]")?.lineHeight ?? "";
    const marker = box(el, "[data-slot=checkbox]");
    const groove = box(el, "[data-slot=switch]");
    return en
      ? `Label line ${n(parseFloat(line))} · marker ${n(marker.width)} · switch ${n(groove.height)} × ${n(groove.width)}`
      : `标签行高 ${n(parseFloat(line))} · 标记 ${n(marker.width)} · 开关 ${n(groove.height)} × ${n(groove.width)}`;
  });
  return (
    <div className="spec" ref={root}>
      <Inline gap="section">
        <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>{t(en, "邮件通知", "Email notifications")}</FieldLabel></Field>
        <Field orientation="horizontal"><Switch defaultChecked /><FieldLabel>{t(en, "自动保存", "Autosave")}</FieldLabel></Field>
      </Inline>
      <Readout>{text}</Readout>
    </div>
  );
}

const GRADES = ["xs", "sm", "md", "lg", "xl"] as const;
export function DengSpecimen({ en }: Locale) {
  const [root, text] = useReadout((el) =>
    [...el.querySelectorAll<HTMLElement>("[data-slot=button]")].map((button) => n(button.getBoundingClientRect().height)).join(" / ") + "px",
  );
  return (
    <div className="spec" ref={root}>
      <Inline align="end" gap="panel">
        {GRADES.map((grade) => <Button key={grade} size={grade} variant="bordered">{grade}</Button>)}
      </Inline>
      <Readout>{text && t(en, `外高 ${text}`, `Height ${text}`)}</Readout>
    </div>
  );
}

export function ShumiSpecimen({ en }: Locale) {
  return (
    <div className="spec spec-form">
      <FieldGroup>
        <Field>
          <FieldLabel>{t(en, "显示名称", "Display name")}</FieldLabel>
          <Input defaultValue={t(en, "林青", "Lin Qing")} />
          <FieldDescription>{t(en, "评论与提及里显示这个名字", "Shown in comments and mentions")}</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>{t(en, "邮箱", "Email")}</FieldLabel>
          <Input defaultValue="lin@example.com" type="email" />
        </Field>
        <Inline>
          <Button>{t(en, "保存", "Save")}</Button>
          <Button variant="bordered">{t(en, "取消", "Cancel")}</Button>
        </Inline>
      </FieldGroup>
    </div>
  );
}

export function YuanSpecimen({ en }: Locale) {
  const [root, text] = useReadout((el) => {
    const r = (selector: string) => n(parseFloat(style(el, selector)?.borderTopLeftRadius ?? "0"));
    return en
      ? `Track ${r("[data-slot=segmented-control]")} · option ${r("[data-slot=segmented-control-item][data-checked]")} · input ${r("[data-slot=input-control]")} · marker ${r("[data-slot=checkbox]")}`
      : `轨道 ${r("[data-slot=segmented-control]")} · 候选 ${r("[data-slot=segmented-control-item][data-checked]")} · 输入框 ${r("[data-slot=input-control]")} · 标记 ${r("[data-slot=checkbox]")}`;
  });
  return (
    <div className="spec" ref={root}>
      <Inline gap="section">
        <SegmentedControl aria-label={t(en, "范围", "Range")} defaultValue="week">
          <SegmentedControlItem value="day">{t(en, "日", "Day")}</SegmentedControlItem>
          <SegmentedControlItem value="week">{t(en, "周", "Week")}</SegmentedControlItem>
          <SegmentedControlItem value="month">{t(en, "月", "Month")}</SegmentedControlItem>
        </SegmentedControl>
        <div className="spec-input"><Input aria-label={t(en, "名称", "Name")} defaultValue={t(en, "青野", "Qingye")} /></div>
        <Checkbox aria-label={t(en, "已选", "Selected")} defaultChecked />
        <StatusDot label={t(en, "在线", "Online")} status="online" />
      </Inline>
      <Readout>{text && `${text}px`}</Readout>
    </div>
  );
}

const INKS = [
  ["jiao", "焦", "Jiao"], ["nong", "浓", "Nong"], ["zhong", "重", "Zhong"], ["dan", "淡", "Dan"], ["qing", "清", "Qing"],
] as const;
export function MoSpecimen({ en }: Locale) {
  const swatch = (strength: string): CSSProperties => ({ backgroundColor: `color-mix(in srgb, var(--qy-ink) ${strength}, transparent)` });
  return (
    <div className="spec">
      <div className="spec-inks">
        {INKS.map(([id, zh, english]) => <figure key={id}><span style={swatch(`var(--qy-ink-${id})`)} /><figcaption>{en ? english : zh}</figcaption></figure>)}
        <figure><span style={swatch("var(--qy-wash-qing)")} /><figcaption>{t(en, "清染", "Light wash")}</figcaption></figure>
        <figure><span style={swatch("var(--qy-wash-dan)")} /><figcaption>{t(en, "淡染", "Pale wash")}</figcaption></figure>
      </div>
      <Inline gap="section">
        <Badge tone="danger">{t(en, "危险", "Danger")}</Badge>
        <Badge tone="warning">{t(en, "警示", "Warning")}</Badge>
        <Badge tone="success">{t(en, "成功", "Success")}</Badge>
        <Badge tone="info">{t(en, "信息", "Info")}</Badge>
      </Inline>
    </div>
  );
}

export function WenziSpecimen({ en }: Locale) {
  return (
    <div className="spec spec-type">
      {STEPS.map(({ step, use }) => (
        <p key={step} style={{
          fontSize: `var(--qy-text-${step}-size)`, lineHeight: `var(--qy-text-${step}-leading)`,
          letterSpacing: `var(--qy-text-${step}-tracking)`, fontWeight: `var(--qy-text-${step}-weight)`,
        }}>{en ? use.en : use.zh}</p>
      ))}
    </div>
  );
}

export function DongSpecimen({ en }: Locale) {
  const [root, text] = useReadout((el) => {
    const read = (name: string) => getComputedStyle(el).getPropertyValue(name).trim();
    return en
      ? `In ${read("--qy-duration-fast")}, out ${read("--qy-duration-press")}`
      : `进入 ${read("--qy-duration-fast")}，退出 ${read("--qy-duration-press")}`;
  });
  return (
    <div className="spec" ref={root}>
      <Inline gap="section">
        <Field orientation="horizontal"><Switch /><FieldLabel>{t(en, "自动保存", "Autosave")}</FieldLabel></Field>
        <Popover>
          <PopoverTrigger render={<Button variant="bordered" />}>{t(en, "浮层", "Popover")}</PopoverTrigger>
          <PopoverPopup><PopoverTitle>{text}</PopoverTitle></PopoverPopup>
        </Popover>
      </Inline>
    </div>
  );
}

export const SPECIMENS: Record<string, (props: Locale) => ReactNode> = {
  cai: CaiSpecimen, deng: DengSpecimen, shumi: ShumiSpecimen, yuanjiao: YuanSpecimen, mo: MoSpecimen, wenzi: WenziSpecimen, dong: DongSpecimen,
};

/** 基础判断页：同一组内容在默认与紧凑密度里并排，读数取自渲染出的元素。 */
export function DensitySpecimen({ en }: Locale) {
  const [root, text] = useReadout((el) => {
    return [...el.querySelectorAll<HTMLElement>("[data-density]")].map((column) => {
      const input = column.querySelector<HTMLElement>("[data-slot=input]")!;
      const field = input.closest<HTMLElement>("[data-slot=input-control]") ?? input;
      const marker = column.querySelector("[data-slot=checkbox]")!.getBoundingClientRect();
      return en
        ? `Input ${n(field.getBoundingClientRect().height)}, text ${n(parseFloat(getComputedStyle(input).fontSize))}, marker ${n(marker.width)}`
        : `输入框 ${n(field.getBoundingClientRect().height)}，字 ${n(parseFloat(getComputedStyle(input).fontSize))}，标记 ${n(marker.width)}`;
    }).join("|");
  });
  const [base = "", compact = ""] = text.split("|");
  const column = (density: "default" | "compact", label: string, reading: string) => (
    <div className="spec-density-column" data-density={density}>
      <p className="spec-readout">{label}</p>
      <Field>
        <FieldLabel>{t(en, "名称", "Name")}</FieldLabel>
        <Input defaultValue={t(en, "青野", "Qingye")} />
      </Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>{t(en, "公开", "Public")}</FieldLabel></Field>
      <Readout>{reading && `${reading}px`}</Readout>
    </div>
  );
  return (
    <div className="spec spec-density" ref={root}>
      {column("default", t(en, "默认", "Default"), base)}
      {column("compact", t(en, "紧凑", "Compact"), compact)}
    </div>
  );
}

/** 基础判断页：动作与结果分属两个元素。 */
export function StateSpecimen({ en }: Locale) {
  return (
    <div className="spec">
      <Inline gap="section">
        <Button state="in-progress" variant="bordered">{t(en, "同步", "Sync")}</Button>
        <Button state="unknown" variant="bordered">{t(en, "同步", "Sync")}</Button>
      </Inline>
    </div>
  );
}
