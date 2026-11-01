import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Menu, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { PageHeader, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye_lab/ui/components/page-header";
import { IconSelector } from "@tabler/icons-react";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "在同类对象间切换", titleEn: "Switching between objects of one kind" } satisfies DemoMeta;

const spaces = [{ id: "east", name: "华东机房", count: 42 }, { id: "north", name: "华北机房", count: 18 }, { id: "south", name: "华南机房", count: 27 }];

export default function Demo() {
  const [id, setId] = useState("east");
  const current = spaces.find(space => space.id === id) ?? spaces[0]!;
  return <PageHeader><PageHeaderContent>
    <Inline gap="actions" align="center">
      <PageHeaderTitle level={3}>{current.name}</PageHeaderTitle>
      <Menu><MenuTrigger render={<Button variant="quiet" shape="icon" size="sm" aria-label="切换机房" />}><IconSelector aria-hidden="true" /></MenuTrigger>
        <MenuPortal><MenuPositioner align="start"><MenuPopup>
          <MenuRadioGroup value={id} onValueChange={value => setId(String(value))}>
            {spaces.map(space => <MenuRadioItem key={space.id} value={space.id} closeOnClick>{space.name}</MenuRadioItem>)}
          </MenuRadioGroup>
        </MenuPopup></MenuPositioner></MenuPortal>
      </Menu>
    </Inline>
    <PageHeaderDescription>{current.count} 台设备</PageHeaderDescription>
  </PageHeaderContent></PageHeader>;
}
