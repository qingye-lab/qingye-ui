import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "静态说明", titleEn: "Static information" };
export default function Demo() { return <Stack gap="section" className="max-w-sm"><Alert><AlertTitle>值</AlertTitle><AlertDescription>当前值可继续编辑</AlertDescription></Alert><Alert tone="warning"><AlertTitle>注意</AlertTitle><AlertDescription>条件尚未满足</AlertDescription></Alert><Alert tone="danger"><AlertTitle>已确认失败</AlertTitle><AlertDescription>原值仍在</AlertDescription></Alert></Stack>; }
