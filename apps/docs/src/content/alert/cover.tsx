import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";

export default function Cover() {
  return <Alert tone="info" className="w-full">
    <div className="grid gap-1"><AlertTitle>草稿已保留</AlertTitle><AlertDescription>内容不会丢失。</AlertDescription></div>
  </Alert>;
}
