const _01Default = 'import { ToggleGroup, ToggleGroupItem } from "@yanqing/ui";\nimport { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";\n\nexport const meta = { title: "单选", description: "默认一次只按下一项，适合对齐方式、视图模式。" };\n\nexport default function Demo() {\n  return (\n    <ToggleGroup defaultValue={["left"]}>\n      <ToggleGroupItem aria-label="左对齐" value="left">\n        <AlignLeftIcon />\n      </ToggleGroupItem>\n      <ToggleGroupItem aria-label="居中" value="center">\n        <AlignCenterIcon />\n      </ToggleGroupItem>\n      <ToggleGroupItem aria-label="右对齐" value="right">\n        <AlignRightIcon />\n      </ToggleGroupItem>\n    </ToggleGroup>\n  );\n}\n';
export {
  _01Default as default
};
