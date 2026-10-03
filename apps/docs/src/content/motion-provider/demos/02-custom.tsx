import { Button } from "@qingye/ui/components/button";
import { Inline } from "@qingye/ui/components/layout";
import { useState } from "react";

export const meta = { title: "即时变化", titleEn: "Instant changes" };

export default function Demo() {
  const [normal, setNormal] = useState(false);
  const [instant, setInstant] = useState(false);
  return (
    <Inline gap="actions">
      <Button variant="bordered" aria-pressed={normal} onClick={() => setNormal(!normal)}>常规</Button>
      <Button variant="bordered" data-instant aria-pressed={instant} onClick={() => setInstant(!instant)}>即时</Button>
    </Inline>
  );
}
