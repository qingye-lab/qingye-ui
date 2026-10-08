import * as React from "react";
import { Badge } from "@qingye_lab/ui/components/badge";
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { CheckboxGroup } from "@qingye_lab/ui/components/checkbox-group";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye_lab/ui/components/input-group";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { NativeSelect } from "@qingye_lab/ui/components/native-select";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { OtpField } from "@qingye_lab/ui/components/otp-field";
import { Radio, RadioGroup } from "@qingye_lab/ui/components/radio-group";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";
import { Separator } from "@qingye_lab/ui/components/separator";
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack, SliderValue } from "@qingye_lab/ui/components/slider";
import { Switch } from "@qingye_lab/ui/components/switch";
import { TagInput } from "@qingye_lab/ui/components/tag-input";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { Toggle } from "@qingye_lab/ui/components/toggle";
import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { IconDownload, IconDots, IconPlus } from "@tabler/icons-react";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { fieldGrid, GalleryPage, Row, Section } from "./gallery";

/* 这一页只放**基础组件**：一个界面里会反复出现、且不依赖具体业务才成立的那些。
   不编业务场景（用户裁决 2026-10-03）：每格只给组件本身和它真实会有的状态，
   文字短而真实，不写「条目 A」。

   版式是「名称列 + 内容列」：名称说明这是什么，内容列里的控件按真实尺寸排，
   同一节共用一条左边线，方便横向比对——比「一格一张卡」更接近组件在真实界面里的样子。

   顶栏两个开关本身就是被预览的组件：密度（Select）与明暗（Button）。 */

const selectOptions = [
  { value: "devices", label: "接入设备" },
  { value: "roles", label: "权限与角色" },
  { value: "sync", label: "同步与导出" },
];

export default function PreviewApp() {
  const [query, setQuery] = React.useState("");
  const [tags, setTags] = React.useState(["React", "TypeScript"]);
  const [pressed, setPressed] = React.useState(true);
  const [view, setView] = React.useState("记录数");
  const [notify, setNotify] = React.useState(true);

  return <GalleryPage>

      <Section title="文字">
        <Stack gap="field">
          <Heading level={1} step="display">青野 UI</Heading>
          <Heading level={2} step="title">标题 Title</Heading>
          <Heading level={3} step="chapter">章节 Chapter</Heading>
          <Heading level={4} step="heading">小标题 Heading</Heading>
          <Text step="reading">正文阅读档：用于长段落，行高放宽。</Text>
          <Text>正文档：「青野」，中英混排 Qingye UI，含标点。</Text>
          <Text step="body-strong">正文强调：同一段里的重点。</Text>
          <Text step="support" className="text-muted-foreground">辅助说明：字段下方的解释。</Text>
          <Text step="caption" className="text-muted-foreground">附注：最弱的一档文字。</Text>
          <Text step="metric" numeric>1,284</Text>
        </Stack>
      </Section>

      <Separator />

      <Section title="按钮">
        <Stack gap="fields">
          <Row label="变体"><Button>保存</Button><Button variant="bordered">预览</Button><Button variant="quiet">取消</Button><Button tone="danger">删除</Button><Button variant="bordered" tone="danger">删除</Button><Button variant="quiet" tone="danger">删除</Button></Row>
          <Row label="尺寸"><Button size="xs">保存</Button><Button size="sm">保存</Button><Button size="md">保存</Button><Button size="lg">保存</Button><Button size="xl">保存</Button></Row>
          <Row label="图标形"><Button shape="icon" aria-label="新建集合"><IconPlus aria-hidden="true" /></Button><Button shape="icon" variant="bordered" aria-label="导出"><IconDownload aria-hidden="true" /></Button><Button shape="icon" variant="quiet" aria-label="更多操作"><IconDots aria-hidden="true" /></Button></Row>
          <Row label="状态"><Button state="waiting">保存</Button><Button state="in-progress">保存</Button><Button state="unknown">保存</Button><Button state="failed">保存</Button><Button disabled>保存</Button></Row>
          <Row label="动作组"><ButtonGroup aria-label="页面动作"><Button variant="bordered">导出</Button><Button>保存</Button></ButtonGroup><ButtonGroup aria-label="行内动作"><Button variant="quiet">复制</Button><Button variant="quiet">重命名</Button></ButtonGroup></Row>
          <Row label="切换"><Toggle pressed={pressed} onPressedChange={setPressed}>加粗</Toggle><Toggle shape="icon" aria-label="斜体">I</Toggle><ToggleGroup value={[view]} onValueChange={next => setView(next[0] ?? view)} aria-label="显示列"><ToggleGroupItem value="名称">名称</ToggleGroupItem><ToggleGroupItem value="记录数">记录数</ToggleGroupItem><ToggleGroupItem value="最近同步">最近同步</ToggleGroupItem></ToggleGroup></Row>
          <Row label="分段"><SegmentedControl value="center" aria-label="对齐"><SegmentedControlItem value="left">左</SegmentedControlItem><SegmentedControlItem value="center">中</SegmentedControlItem><SegmentedControlItem value="right">右</SegmentedControlItem></SegmentedControl></Row>
        </Stack>
      </Section>

      <Separator />

      <Section title="填值控件">
        <Stack gap="fields">
          <Row label="文本">
            <div className={fieldGrid}>
              <Field><FieldLabel>工作区名称</FieldLabel><Input value={query} onChange={event => setQuery(event.target.value)} placeholder="输入名称" /></Field>
              {/* 只读：内容照常可读、可选取、可复制，只是不能在这里改。
                  禁用：当前不可操作，文字退为辅助色。两者外观必须能区分（评审第 5 条）。 */}
              <Field><FieldLabel>标识（只读）</FieldLabel><Input defaultValue="qingye" readOnly /></Field>
              <Field disabled><FieldLabel>所属组织（禁用）</FieldLabel><Input defaultValue="青野科技" /></Field>
            </div>
          </Row>
          <Row label="校验">
            <div className={fieldGrid}>
              <Field invalid><FieldLabel>工作区标识</FieldLabel><Input defaultValue="qingye" /><FieldError>该标识已被占用。</FieldError></Field>
              <Field><FieldLabel>含说明</FieldLabel><Input defaultValue="青野" /></Field>
              <Field><FieldLabel>多行</FieldLabel><Textarea rows={2} defaultValue="每周一同步设备清单。" /></Field>
            </div>
          </Row>
          <Row label="搜索与密码">
            <div className={fieldGrid}>
              <Field><FieldLabel>搜索</FieldLabel><Input type="search" defaultValue="设备" onClear={() => {}} /></Field>
              <Field><FieldLabel>密码</FieldLabel><Input type="password" defaultValue="qingye-ui" /></Field>
            </div>
          </Row>
          <Row label="选择与数值">
            <div className={fieldGrid}>
              <Field><FieldLabel>同步频率</FieldLabel><NativeSelect defaultValue="daily"><option value="hourly">每小时一次</option><option value="daily">每天一次</option><option value="weekly">每周一次</option></NativeSelect></Field>
              <Field><FieldLabel>默认集合</FieldLabel><Select items={selectOptions} defaultValue="devices"><SelectTrigger /><SelectPopup>{selectOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectPopup></Select></Field>
              <Field><FieldLabel>数量</FieldLabel><NumberField defaultValue={12} min={0} max={99}><NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup></NumberField></Field>
            </div>
          </Row>
          <Row label="组合与区间">
            <div className={fieldGrid}>
              <Field><FieldLabel>地址</FieldLabel><InputGroup><InputGroupAddon>https://</InputGroupAddon><InputGroupInput placeholder="qingye.dev" /></InputGroup></Field>
              <Field>
                {/* SliderValue 读的是 Slider 根的真实值，因此必须放在根之内。 */}
                <Slider defaultValue={[60]} min={0} max={100} step={5}>
                  <div className="flex items-center justify-between gap-(--qy-field-gap)">
                    <FieldLabel>阈值</FieldLabel>
                    <SliderValue className="text-body-strong">{(formatted) => `${formatted}%`}</SliderValue>
                  </div>
                  <SliderControl><SliderTrack><SliderIndicator /><SliderThumb aria-label="阈值百分比" /></SliderTrack></SliderControl>
                  <div className="flex justify-between text-caption text-muted-foreground"><span>0%</span><span>100%</span></div>
                </Slider>
              </Field>
            </div>
          </Row>
          <Row label="校验码"><Field><FieldLabel>编码</FieldLabel><OtpField length={6} defaultValue="0012" aria-label="编码" /></Field></Row>
          <Row label="标签"><Field><FieldLabel>分类</FieldLabel><TagInput value={tags} onValueChange={setTags} /></Field></Row>
        </Stack>
      </Section>

      <Separator />

      <Section title="勾选与开关">
        <Stack gap="fields">
          <Row label="复选框">
            <Field orientation="horizontal"><Checkbox defaultChecked /><FieldContent><FieldLabel>接收同步通知</FieldLabel></FieldContent></Field>
            <Field orientation="horizontal"><Checkbox /><FieldContent><FieldLabel>接收导出通知</FieldLabel></FieldContent></Field>
            <Field orientation="horizontal"><Checkbox indeterminate /><FieldContent><FieldLabel>部分设备</FieldLabel></FieldContent></Field>
            <Field orientation="horizontal" disabled><Checkbox /><FieldContent><FieldLabel>已停用</FieldLabel></FieldContent></Field>
          </Row>
          <Row label="单选">
            <RadioGroup defaultValue="owner" aria-label="可见范围" className="flex-row flex-wrap gap-(--qy-field-group-gap)">
              <Field orientation="horizontal"><Radio value="owner" /><FieldContent><FieldLabel>仅自己</FieldLabel></FieldContent></Field>
              <Field orientation="horizontal"><Radio value="team" /><FieldContent><FieldLabel>本团队</FieldLabel></FieldContent></Field>
            </RadioGroup>
          </Row>
          <Row label="复选组">
            <CheckboxGroup defaultValue={["offline"]} aria-label="通知范围" className="flex-row flex-wrap gap-(--qy-field-group-gap)">
              <Field orientation="horizontal"><Checkbox value="offline" /><FieldContent><FieldLabel>设备离线</FieldLabel></FieldContent></Field>
              <Field orientation="horizontal"><Checkbox value="failed" /><FieldContent><FieldLabel>同步失败</FieldLabel></FieldContent></Field>
            </CheckboxGroup>
          </Row>
          <Row label="开关">
            <Field orientation="horizontal"><Switch checked={notify} onCheckedChange={setNotify} /><FieldContent><FieldLabel>自动同步</FieldLabel></FieldContent></Field>
            <Field orientation="horizontal"><Switch /><FieldContent><FieldLabel>显示网格</FieldLabel></FieldContent></Field>
            <Field orientation="horizontal" disabled><Switch /><FieldContent><FieldLabel>已停用</FieldLabel></FieldContent></Field>
          </Row>
        </Stack>
      </Section>

      <Separator />

      <Section title="标记与布局">
        <Stack gap="fields">
          <Row label="标记"><Badge>已同步</Badge><Badge tone="warning">未同步</Badge><Kbd aria-label="Command">⌘</Kbd><Kbd>K</Kbd></Row>
          <Row label="分隔"><div className="w-64"><Separator /></div></Row>
          <Row label="纵排"><Stack gap="field" className="w-40 text-body"><span>第一行</span><span>第二行</span></Stack></Row>
          <Row label="横排"><Inline gap="actions"><Button size="sm">保存</Button><Button size="sm" variant="bordered">取消</Button><span className="text-support text-muted-foreground">更改会在应用后生效</span></Inline></Row>
        </Stack>
      </Section>
  </GalleryPage>;
}
