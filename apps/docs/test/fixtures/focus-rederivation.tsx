import { createRoot } from "react-dom/client";
import { Button, ButtonProtection } from "@qingye/ui/components/button";
import { Input } from "@qingye/ui/components/input";
import { Textarea } from "@qingye/ui/components/textarea";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@qingye/ui/components/input-group";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { RadioGroup, Radio } from "@qingye/ui/components/radio-group";
import { Switch } from "@qingye/ui/components/switch";
import { Badge } from "@qingye/ui/components/badge";
import { Toggle } from "@qingye/ui/components/toggle";
import { NativeSelect } from "@qingye/ui/components/native-select";
import { Select, SelectTrigger, SelectValue, SelectPopup, SelectItem } from "@qingye/ui/components/select";
import { Slider } from "@qingye/ui/components/slider";
import { Menu, MenuTrigger, MenuPopup, MenuItem } from "@qingye/ui/components/menu";
import { MotionProvider } from "@qingye/ui/components/motion-provider";
import { Disclosure, DisclosureTrigger, DisclosurePanel } from "@qingye/ui/components/disclosure";
import { Tabs, TabsList, TabsTab } from "@qingye/ui/components/tabs";
import { segmentedControlRootClassName, segmentedControlItemVariants } from "@qingye/ui/components/segmented-control";
import "../../../../packages/ui/dist/ui.css";

document.documentElement.className = new URLSearchParams(location.search).get("theme") === "dark" ? "dark" : "light";
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const layout = { display: "grid", gap: "var(--qy-section-gap)", padding: "var(--qy-panel-padding)" };
const carrier = { ...layout, background: "var(--qy-surface)", borderRadius: "var(--qy-radius-panel)" };

function Fixture() {
  return <MotionProvider><main data-probe-ready style={layout}>
    <section data-carrier="card" style={carrier}>
      {sizes.map((size) => <div key={size} style={{ display: "grid", gap: "var(--qy-field-gap)" }}>
        <Button size={size} data-probe={`solid-${size}`}>保存设备</Button>
        <Button size={size} variant="quiet" data-probe={`quiet-${size}`}>查看设备</Button>
        <Input size={size} data-probe={`input-${size}`} aria-label={`${size} 设备名称`} defaultValue="扫码枪" />
      </div>)}
      <ButtonProtection consequence="设备 QY-003 及其历史记录会被删除。"><Button tone="danger" data-probe="danger">删除设备</Button></ButtonProtection>
      <Input data-probe="invalid-input" aria-label="无效编号" aria-invalid="true" defaultValue="draft" />
      <Textarea data-probe="textarea" aria-label="设备备注" defaultValue="北侧货架" />
      <InputGroup><InputGroupInput data-probe="group-input" aria-label="组合设备名称" /><InputGroupAddon align="inline-end"><InputGroupButton data-probe="group-action" shape="label">查询</InputGroupButton></InputGroupAddon></InputGroup>
      <NativeSelect data-probe="native-select" aria-label="设备种类"><option>扫码枪</option><option>打印机</option></NativeSelect>
      <Checkbox data-probe="checkbox" aria-label="包含设备" />
      <Checkbox data-probe="checkbox-checked" aria-label="已包含设备" defaultChecked />
      <RadioGroup defaultValue="included" aria-label="设备范围"><Radio value="included" data-probe="radio-checked" aria-label="已选择范围" /><Radio value="other" data-probe="radio" aria-label="其它范围" /></RadioGroup>
      <Switch data-probe="switch" aria-label="启用提醒" />
      <Switch data-probe="switch-checked" aria-label="已启用提醒" defaultChecked />
      <Switch data-probe="switch-invalid" aria-label="无效提醒设置" aria-invalid="true" defaultChecked />
      <Toggle data-probe="toggle-outline" variant="outline" size="sm">固定设备</Toggle>
      <Badge data-probe="badge" render={<button type="button" />}>待处理</Badge>
      <Badge data-probe="badge-outline" variant="outline" render={<button type="button" />}>未知设备</Badge>
      <Slider defaultValue={40} getAriaLabel={() => "提醒音量"} />
      <Select defaultValue="scanner"><SelectTrigger data-probe="select" aria-label="选择设备"><SelectValue /></SelectTrigger><SelectPopup><SelectItem value="scanner">扫码枪</SelectItem><SelectItem value="printer">打印机</SelectItem></SelectPopup></Select>
      <Menu><MenuTrigger render={<Button data-probe="menu-solid" />}>设备操作</MenuTrigger><MenuPopup><MenuItem>查看设备</MenuItem><MenuItem>导出设备</MenuItem></MenuPopup></Menu>
      <Disclosure variant="plain"><DisclosureTrigger data-probe="disclosure">设备备注</DisclosureTrigger><DisclosurePanel>北侧货架</DisclosurePanel></Disclosure>
      <Tabs defaultValue="current"><TabsList size="sm"><TabsTab value="current" data-probe="tabs-selected">在库</TabsTab><TabsTab value="other" data-probe="tabs-other">出库</TabsTab></TabsList></Tabs>
      <Tabs defaultValue="current"><TabsList variant="underline"><TabsTab value="current" data-probe="tabs-underline">在库</TabsTab><TabsTab value="other">出库</TabsTab></TabsList></Tabs>
      <div className={segmentedControlRootClassName}><button type="button" data-probe="segmented-selected" data-checked="" className={segmentedControlItemVariants({ size: "sm", state: "checked" })}>在库</button><button type="button" data-probe="segmented-other" className={segmentedControlItemVariants({ size: "sm", state: "checked" })}>出库</button></div>
    </section>
    <section data-carrier="primary" style={{ ...layout, background: "var(--qy-primary)" }}>
      <Button data-probe="declared-carrier" style={{ ...{ "--qy-ring": "var(--qy-primary-foreground)" } }} className="border border-ring px-(--qy-control-md-padding-bordered) focus-visible:ring-0 focus-visible:border-ring focus-visible:inset-ring-[length:var(--qy-focus-boundary-inset)] focus-visible:inset-ring-ring">核对同色设备</Button>
    </section>
    <section style={{ ...carrier, ...{ "--qy-radius-control": "var(--qy-radius-marker)" } }} data-probe="brand-radius"><Input data-probe="brand-radius-input" aria-label="项目圆角入口" /><Button data-probe="brand-radius-button">项目操作</Button></section>
  </main></MotionProvider>;
}
createRoot(document.getElementById("root")!).render(<Fixture />);
