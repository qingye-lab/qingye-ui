import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { IconInfoCircle } from "@tabler/icons-react";

export default function Cover() {
  return <Alert className="w-full">
    <IconInfoCircle aria-hidden="true" />
    <div className="grid gap-1"><AlertTitle>草稿已保留</AlertTitle><AlertDescription>内容不会丢失。</AlertDescription></div>
  </Alert>;
}
