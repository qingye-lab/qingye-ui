const o=`import { Autocomplete, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@qingye/ui/components/autocomplete";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "行内补全", description: "mode=\\"both\\"：高亮的建议直接补全到输入框里，方向键切换。" };

const commands = ["restart nginx", "restart redis", "reload nginx", "status nginx", "status mysql", "stop worker", "start worker"];

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="ops-command">运维指令</Label>
      <Autocomplete items={commands} mode="both">
        <AutocompleteInput id="ops-command" placeholder="例如 restart nginx" className="font-mono" />
        <AutocompletePopup>
          <AutocompleteList>
            {(command: string) => (
              <AutocompleteItem key={command} value={command} className="font-mono">
                {command}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
`;export{o as default};
