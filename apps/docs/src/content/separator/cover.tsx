import { Separator } from "@qingye_lab/ui/components/separator";

export default function Cover() {
  return <div className="flex w-full flex-col gap-(--qy-field-group-gap) text-body"><p className="m-0">文字</p><Separator /><p className="m-0 numeric">0123456789</p></div>;
}
