const _01Icon = 'import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@yanqing/ui";\nimport { FolderOpenIcon } from "lucide-react";\n\nexport const meta = { title: "图标", description: "variant=\\"icon\\" 把图标放进带边框的小方块，两侧叠出倾斜的卡片。" };\n\nexport default function Demo() {\n  return (\n    <Empty>\n      <EmptyHeader>\n        <EmptyMedia variant="icon">\n          <FolderOpenIcon aria-hidden="true" />\n        </EmptyMedia>\n        <EmptyTitle>还没有项目</EmptyTitle>\n        <EmptyDescription>项目用来组织代码仓库、环境变量和成员权限。</EmptyDescription>\n      </EmptyHeader>\n    </Empty>\n  );\n}\n';
export {
  _01Icon as default
};
