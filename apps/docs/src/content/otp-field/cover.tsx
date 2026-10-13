import { OtpField } from "@qingye_lab/ui/components/otp-field";

export default function Cover() {
  return <OtpField length={6} inputMode="numeric" defaultValue="0012" aria-label="编码" />;
}
