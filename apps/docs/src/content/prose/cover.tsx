import { Prose } from "@qingye_lab/ui/components/prose";

export default function Cover() {
  return <Prose framed className="w-full">
    <h3>重试</h3>
    <p>失败项单独列出。</p>
    <ul><li>默认重试 3 次</li><li>再失败转人工</li></ul>
  </Prose>;
}
