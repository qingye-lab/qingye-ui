import { Field, FieldDescription, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { useMemo, useState } from "react";

export const meta = { title: "字数提示", titleEn: "Character limit" };

const max = 20;
const near = 10;

/** 用户所见的字数：一个字形一个字，emoji 与生僻字不按 UTF-16 码元拆成两个。 */
function useCount() {
  const segmenter = useMemo(() => new Intl.Segmenter(undefined, { granularity: "grapheme" }), []);
  return (text: string) => { let count = 0; for (const _ of segmenter.segment(text)) count++; return count; };
}

export default function Demo() {
  const count = useCount();
  const [value, setValue] = useState("杭州滨江仓 🏭");
  const left = max - count(value);
  // 播报只在跨档时发生：每一档的文字固定、不含数字，同一档内按键不改变它，读屏不会逐字重读。
  const band = left < 0 ? "over" : left === 0 ? "full" : left <= near ? "near" : "far";
  const spoken = { over: "已超出字数上限", full: "已达字数上限", near: "接近字数上限", far: "" }[band];
  return (
    <Field className="w-full max-w-xs" invalid={left < 0}>
      <FieldLabel>仓库简称</FieldLabel>
      {/* 不设 maxLength：它按 UTF-16 码元计，与按字形的计数对不上，粘贴超长还会被悄悄截断。超出只标出，不拦。 */}
      <Input onValueChange={setValue} value={value} />
      {left >= 0 ? <FieldDescription className="numeric">还可输入 {left} 个字</FieldDescription> : <FieldError match>已超出 {-left} 个字</FieldError>}
      <span role="status" className="sr-only">{spoken}</span>
    </Field>
  );
}
