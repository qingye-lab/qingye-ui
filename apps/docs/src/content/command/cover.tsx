import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@qingye_lab/ui/components/command";

export default function Cover() {
  return <Command className="w-full rounded-overlay border border-border bg-surface-raised p-(--qy-overlay-inset)">
    <CommandInput aria-label="搜索" placeholder="搜索" />
    <CommandList>
      <CommandGroup heading="页面">
        <CommandItem value="概览">概览</CommandItem>
        <CommandItem value="设备">设备</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>;
}
