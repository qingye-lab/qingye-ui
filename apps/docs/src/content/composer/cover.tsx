import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar } from "@qingye_lab/ui/components/composer";

export default function Cover() {
  return <Composer className="w-full">
    <ComposerInput aria-label="消息" placeholder="写点什么" />
    <ComposerToolbar><ComposerSubmit /></ComposerToolbar>
  </Composer>;
}
