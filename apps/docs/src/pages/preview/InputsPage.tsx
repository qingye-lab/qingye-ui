import * as React from "react";
import { Autocomplete, AutocompleteClear, AutocompleteControl, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye_lab/ui/components/autocomplete";
import { Button } from "@qingye_lab/ui/components/button";
import { Calendar, formatLocalDate } from "@qingye_lab/ui/components/calendar";
import { Combobox, ComboboxClear, ComboboxControl, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye_lab/ui/components/combobox";
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { DateRangePicker, type DateRangeValue } from "@qingye_lab/ui/components/date-range-picker";
import { DateTimePicker } from "@qingye_lab/ui/components/date-time-picker";
import { Field, FieldDescription, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye_lab/ui/components/fieldset";
import { FileUpload } from "@qingye_lab/ui/components/file-upload";
import { FilterBar, FilterBarActions, FilterBarApplied, FilterBarApply, FilterBarCancel, FilterBarClear, FilterBarFields, FilterBarStatus } from "@qingye_lab/ui/components/filter-bar";
import { Form } from "@qingye_lab/ui/components/form";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";
import { NativeSelect } from "@qingye_lab/ui/components/native-select";
import { Separator } from "@qingye_lab/ui/components/separator";
import { COLLECTIONS, fieldGrid, GalleryPage, Row, Section } from "./gallery";

/* 进阶输入：带候选的输入、日期与时间、文件、成组字段与表单、筛选条。
 * 附属动作（清除、展开、选日期）都在同一条编辑边界之内。 */

const owners = ["陈致远", "李一鸣", "王一帆", "赵子纯", "孙若溪", "周景行"];
const collectionNames = COLLECTIONS.map(row => row.name);
const maxBytes = 2 * 1024 * 1024;

export default function InputsPage() {
  const [owner, setOwner] = React.useState<string | null>("陈致远");
  const [search, setSearch] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 5));
  const [range, setRange] = React.useState<DateRangeValue | undefined>();
  const [dateTime, setDateTime] = React.useState<string | undefined>();
  const [day, setDay] = React.useState<Date | undefined>(new Date(2026, 9, 5));
  const [files, setFiles] = React.useState<readonly File[]>([]);
  const [draft, setDraft] = React.useState({ name: "", state: "all" });
  const [applied, setApplied] = React.useState({ name: "", state: "all" });
  const [submitted, setSubmitted] = React.useState<string | null>(null);

  const dirty = draft.name !== applied.name || draft.state !== applied.state;
  const matched = COLLECTIONS.filter(row => (!applied.name || row.name.includes(applied.name)) && (applied.state === "all" || row.state === applied.state));

  return <GalleryPage>
    <Section title="带候选的输入">
      <Row label="候选选择" block>
        <div className={fieldGrid}>
          <Field>
            <FieldLabel>负责人</FieldLabel>
            <Combobox items={owners} value={owner} onValueChange={setOwner}>
              <ComboboxControl><ComboboxInput placeholder="选择成员" /><ComboboxClear /><ComboboxTrigger /></ComboboxControl>
              <ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup>
            </Combobox>
          </Field>
          <Field>
            <FieldLabel>搜索集合</FieldLabel>
            <Autocomplete items={collectionNames} value={search} onValueChange={setSearch}>
              <AutocompleteControl><AutocompleteInput placeholder="输入名称" /><AutocompleteClear /><AutocompleteTrigger /></AutocompleteControl>
              <AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup>
            </Autocomplete>
          </Field>
        </div>
      </Row>
    </Section>

    <Separator />

    <Section title="日期与时间">
      <Row label="选择器" block>
        <div className={fieldGrid}>
          <Field><FieldLabel>生效日期</FieldLabel><DatePicker value={date} onValueChange={setDate} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /></Field>
          <Field><FieldLabel>统计区间</FieldLabel><DateRangePicker value={range} onValueChange={setRange} calendarProps={{ defaultMonth: new Date(2026, 9, 1), min: 1 }} /></Field>
          <Field><FieldLabel>计划同步时间</FieldLabel><DateTimePicker value={dateTime} onValueChange={setDateTime} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /></Field>
        </div>
      </Row>
      <Row label="日历" block lead="control">
        <Stack gap="field">
          <Calendar mode="single" selected={day} onSelect={setDay} defaultMonth={new Date(2026, 9, 1)} />
          <span className="text-support text-muted-foreground">已选：{day ? formatLocalDate(day) : "无"}</span>
        </Stack>
      </Row>
    </Section>

    <Separator />

    <Section title="文件">
      <Row label="上传" block>
        <Field className="w-full max-w-xl">
          <FieldLabel>导入文件</FieldLabel>
          <FileUpload value={files} onValueChange={setFiles} accept=".csv,.json" maxFiles={3} maxSize={maxBytes} />
          <FieldDescription>CSV 或 JSON，最多 3 个，每个不超过 2 MB。</FieldDescription>
        </Field>
      </Row>
    </Section>

    <Separator />

    <Section title="成组字段与表单">
      <Row label="字段组" block lead="heading">
        <Fieldset className="max-w-xl">
          <FieldsetLegend>联系人</FieldsetLegend>
          <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
            <Field><FieldLabel>姓名</FieldLabel><Input defaultValue="陈致远" /></Field>
            <Field><FieldLabel>邮箱</FieldLabel><Input type="email" defaultValue="zhiyuan@qingye.dev" /></Field>
          </div>
        </Fieldset>
      </Row>
      <Row label="表单" block>
        <Form className="grid max-w-xl gap-(--qy-field-group-gap)" onSubmit={event => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get("workspace") ?? "")); }}>
          <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
            <Field name="workspace"><FieldLabel>工作区名称</FieldLabel><Input name="workspace" defaultValue="青野科技" required /></Field>
            <Field name="identifier" invalid><FieldLabel>工作区标识</FieldLabel><Input name="identifier" defaultValue="Qingye UI" /><FieldError>只能使用小写字母、数字与连字符。</FieldError></Field>
          </div>
          <Field name="region"><FieldLabel>数据区域</FieldLabel><NativeSelect name="region" defaultValue="cn-east"><option value="cn-east">华东</option><option value="cn-north">华北</option><option value="cn-south">华南</option></NativeSelect></Field>
          <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
            <Button type="submit">提交</Button>
            <Button type="reset" variant="quiet">重置</Button>
            {submitted !== null && <span className="text-support text-muted-foreground" role="status">已提交：{submitted || "空"}</span>}
          </div>
        </Form>
      </Row>
    </Section>

    <Separator />

    <Section title="筛选条">
      <Row label="筛选" block>
        <Stack gap="field">
          <FilterBar
            dirty={dirty}
            appliedSummary={applied.name || applied.state !== "all" ? `已应用：${applied.state === "all" ? "全部状态" : applied.state}${applied.name ? ` · 名称包含「${applied.name}」` : ""}` : "已应用：全部集合"}
            canClear={Boolean(applied.name || applied.state !== "all" || dirty)}
            onApply={() => setApplied(draft)}
            onCancel={() => setDraft(applied)}
            onClear={() => { setDraft({ name: "", state: "all" }); setApplied({ name: "", state: "all" }); }}
          >
            <FilterBarFields>
              <Field><FieldLabel>名称包含</FieldLabel><Input value={draft.name} onChange={event => setDraft(value => ({ ...value, name: event.target.value }))} /></Field>
              <Field><FieldLabel>状态</FieldLabel><NativeSelect value={draft.state} onChange={event => setDraft(value => ({ ...value, state: event.target.value }))}><option value="all">全部</option><option value="已同步">已同步</option><option value="同步中">同步中</option><option value="未同步">未同步</option></NativeSelect></Field>
            </FilterBarFields>
            <FilterBarApplied />
            <FilterBarStatus />
            <FilterBarActions><FilterBarApply /><FilterBarCancel /><FilterBarClear /></FilterBarActions>
          </FilterBar>
          <p className="m-0 text-support text-muted-foreground">{matched.length} 个集合：{matched.slice(0, 6).map(row => row.name).join("、")}{matched.length > 6 ? "…" : ""}</p>
        </Stack>
      </Row>
    </Section>
  </GalleryPage>;
}
