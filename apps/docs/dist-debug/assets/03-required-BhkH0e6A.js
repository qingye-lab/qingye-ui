const n=`import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "必填与选填", description: "用星号或“选填”文字标示，并在控件上设 required。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-name">
          收件人 <span aria-hidden="true" className="text-destructive-foreground">*</span>
        </Label>
        <Input id="label-name" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-company">
          公司 <span className="font-normal text-muted-foreground">选填</span>
        </Label>
        <Input id="label-company" />
      </div>
    </div>
  );
}
`;export{n as default};
