const n=`import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandPanel } from "@qingye/ui/components/command";

export const meta = {
  title: "空状态",
  description: "没有匹配项时显示 CommandEmpty；不传内容时使用内置文案。",
};

const devices = ["仓库 3 号扫码枪", "前台标签打印机", "冷库温控器"];

export default function Demo() {
  return (
    <div className="w-full max-w-xs rounded-2xl border bg-muted/72">
      <Command defaultValue="投影仪" items={devices}>
        <CommandInput aria-label="搜索设备" autoFocus={false} />
        <CommandPanel>
          <CommandEmpty />
          <CommandList>
            {(device: string) => (
              <CommandItem key={device} value={device}>
                {device}
              </CommandItem>
            )}
          </CommandList>
        </CommandPanel>
      </Command>
    </div>
  );
}
`;export{n as default};
