const e=`import { ScrollArea } from "@qingye/ui/components/scroll-area";
import { Separator } from "@qingye/ui/components/separator";
import { Fragment } from "react";

export const meta = { title: "纵向" };

const releases = Array.from({ length: 24 }, (_, i) => \`v2.\${24 - i}.0\`);

export default function Demo() {
  return (
    <ScrollArea className="h-64 w-48 rounded-lg border">
      <div className="p-4">
        <p className="mb-3 font-medium text-sm">版本记录</p>
        {releases.map((tag, i) => (
          <Fragment key={tag}>
            {i > 0 ? <Separator className="my-2" /> : null}
            <p className="numeric text-muted-foreground text-sm">{tag}</p>
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
`;export{e as default};
