import { createRoot } from "react-dom/client";
import { useState } from "react";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Button, ButtonProtection, type ButtonState } from "@qingye/ui/components/button";
import { Input } from "@qingye/ui/components/input";
import { Autocomplete, AutocompleteInput } from "@qingye/ui/components/autocomplete";
import { Combobox, ComboboxInput } from "@qingye/ui/components/combobox";
import { Card } from "@qingye/ui/components/card";
import { Popover, PopoverTrigger, PopoverPopup, PopoverTitle, PopoverClose } from "@qingye/ui/components/popover";
import { MotionProvider } from "@qingye/ui/components/motion-provider";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@qingye/ui/components/input-group";
import "../../../../packages/ui/dist/ui.css";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
function Probes() {
  const [state, setState] = useState<ButtonState>("idle");
  const [activations, setActivations] = useState(0);
  return <MotionProvider><main className="bg-background text-foreground" style={{padding: "var(--qy-panel-padding)", display: "grid", gap: "var(--qy-section-gap)"}}>
    <h1 className="text-title">P1 探针</h1>
    {sizes.map(size => <section key={size} data-size-row={size} style={{display:"flex", flexWrap:"wrap", gap:"var(--qy-action-gap)", alignItems:"center"}}>
      <Button data-probe={`button-${size}`} size={size}>保存草稿</Button>
      <Button data-probe={`quiet-${size}`} variant="quiet" size={size}>查看草稿</Button>
      <Button data-probe={`icon-${size}`} size={size} shape="icon" aria-label="添加记录"><PlusIcon aria-hidden="true" /></Button>
      <Input data-probe={`input-${size}`} size={size} aria-label={`${size} 名称`} defaultValue="青野" controlClassName="max-w-56" />
    </section>)}
    <section style={{background:"var(--qy-primary)", padding:"var(--qy-panel-padding)"}}><Button data-probe="contrast-boundary" style={{border:"1px solid var(--qy-primary-foreground)", paddingInline:"var(--qy-control-md-padding-bordered)"}}>继续核对设备</Button></section>
    <section style={{display:"grid", gap:"var(--qy-field-gap)"}}>
      <select aria-label="对象状态" value={state} onChange={e=>setState(e.target.value as ButtonState)}>{(["idle","waiting","in-progress","unknown","failed"] as const).map(s=><option key={s}>{s}</option>)}</select>
      <Button data-probe="state-action" state={state} onClick={()=>setActivations(v=>v+1)}>提交设备配置</Button><output data-probe="activation-count">{activations}</output>
      <Button data-probe="state-icon" shape="icon" aria-label="提交设备配置图标" state={state}><PlusIcon aria-hidden="true" /></Button>
      <ButtonProtection consequence="仓库 3 号设备（版本 7）及其历史记录会被永久删除。"><Button tone="danger">删除设备</Button><Button variant="quiet">保留设备</Button></ButtonProtection>
    </section>
    <section><label htmlFor="search">搜索设备</label><Input id="search" type="search" defaultValue="扫码枪" /><label htmlFor="password">访问口令</label><Input id="password" type="password" defaultValue="qingye" /></section>
    <Input data-probe="invalid-false" aria-label="有效编号" aria-invalid={false} defaultValue="0" />
    <Input data-probe="invalid-true" aria-label="无效编号" aria-invalid="true" defaultValue="draft" />
    <InputGroup data-probe="input-group"><InputGroupInput aria-label="组合输入" /><InputGroupAddon align="inline-end"><InputGroupButton shape="label">查询设备</InputGroupButton></InputGroupAddon></InputGroup>
    <Autocomplete items={["扫码枪"]}><AutocompleteInput data-probe="autocomplete-composition" aria-label="联想设备" startAddon={<SearchIcon aria-hidden="true" />} showTrigger /></Autocomplete>
    <Combobox items={["扫码枪"]}><ComboboxInput data-probe="combobox-composition" aria-label="选择设备" startAddon={<SearchIcon aria-hidden="true" />} showTrigger /></Combobox>
    <Card data-probe="bare-card" aria-label="设备 QY-001">设备 QY-001</Card>
    <Card data-probe="outer-card" aria-label="设备 QY-002" style={{padding:"var(--qy-field-gap)"}}>
      <Card data-probe="inner-card" aria-label="设备 QY-002 日志" style={{borderRadius:"max(0px, calc(var(--qy-radius-panel) - var(--qy-field-gap) - 1px))"}}>设备 QY-002 日志</Card>
      <Button data-probe="nested-control" variant="quiet">查看设备 QY-002</Button>
    </Card>
    <Popover><PopoverTrigger render={<Button data-probe="popover-trigger" variant="quiet" />}>设备备注</PopoverTrigger><PopoverPopup data-probe="popover-popup"><PopoverTitle>设备 QY-001 备注</PopoverTitle><Input aria-label="备注" defaultValue="北侧货架" /><PopoverClose render={<Button variant="quiet" />}>返回设备</PopoverClose></PopoverPopup></Popover>
  </main></MotionProvider>;
}
createRoot(document.getElementById("root")!).render(<Probes />);
