import { Card } from "@qingye/ui/components/card";
import { Stack } from "@qingye/ui/components/layout";
import { Heading, Text } from "@qingye/ui/components/typography";

export const meta = { title: "密度", titleEn: "Density" };

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-2 gap-(--qy-section-gap)">
      {(["default", "compact"] as const).map((density) => (
        <section data-density={density} key={density}>
          <Card>
            <Stack gap="panel" className="p-(--qy-panel-padding)">
              <Heading level={3}>{density === "compact" ? "紧凑" : "默认"}</Heading>
              <Text>青野 · Qingye</Text>
            </Stack>
          </Card>
        </section>
      ))}
    </div>
  );
}
