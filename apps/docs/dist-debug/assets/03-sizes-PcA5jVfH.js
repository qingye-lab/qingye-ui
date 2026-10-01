const n=`import { Toggle } from "@qingye/ui/components/toggle";
import { StarIcon } from "lucide-react";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <>
      <Toggle aria-label="收藏" size="sm" variant="outline">
        <StarIcon />
      </Toggle>
      <Toggle aria-label="收藏" variant="outline">
        <StarIcon />
      </Toggle>
      <Toggle aria-label="收藏" size="lg" variant="outline">
        <StarIcon />
      </Toggle>
      <Toggle size="sm" variant="outline">
        小
      </Toggle>
      <Toggle variant="outline">默认</Toggle>
      <Toggle size="lg" variant="outline">
        大
      </Toggle>
    </>
  );
}
`;export{n as default};
