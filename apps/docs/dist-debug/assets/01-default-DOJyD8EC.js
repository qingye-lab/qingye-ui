const _01Default = 'import {\n  Breadcrumb,\n  BreadcrumbItem,\n  BreadcrumbLink,\n  BreadcrumbList,\n  BreadcrumbPage,\n  BreadcrumbSeparator,\n} from "@yanqing/ui";\n\nexport const meta = { title: "默认" };\n\nexport default function Demo() {\n  return (\n    <Breadcrumb>\n      <BreadcrumbList>\n        <BreadcrumbItem>\n          <BreadcrumbLink href="#">工作台</BreadcrumbLink>\n        </BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem>\n          <BreadcrumbLink href="#">项目</BreadcrumbLink>\n        </BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem>\n          <BreadcrumbPage>青烟官网改版</BreadcrumbPage>\n        </BreadcrumbItem>\n      </BreadcrumbList>\n    </Breadcrumb>\n  );\n}\n';
export {
  _01Default as default
};
