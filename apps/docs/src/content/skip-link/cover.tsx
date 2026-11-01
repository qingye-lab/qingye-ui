import { SkipLink } from "@qingye_lab/ui/components/skip-link";

// 封面里让它保持可见，真实页面中它只在获得焦点时现身。
export default function Cover() {
  return <SkipLink href="#cover-main" className="static opacity-100 pointer-events-auto">跳到正文</SkipLink>;
}
