import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useDocsLocale } from "@/lib/docs-locale";
import { breadcrumbs } from "@/lib/nav";
import { routeIdentity } from "@/lib/paths";
import { Link } from "./locale-link";

export function DocsBreadcrumbs() {
  const locale = useDocsLocale();
  const items = breadcrumbs(useLocation().pathname, locale);
  if (items.length < 2) return null;
  return <Breadcrumb className="mb-6"><BreadcrumbList>
    {items.map((item, index) => <Fragment key={routeIdentity(item.path)}>
      {index > 0 ? <BreadcrumbSeparator /> : null}
      <BreadcrumbItem>{index === items.length - 1
        ? <BreadcrumbPage>{item.title}</BreadcrumbPage>
        : <BreadcrumbLink render={<Link to={item.path} />}>{item.title}</BreadcrumbLink>}
      </BreadcrumbItem>
    </Fragment>)}
  </BreadcrumbList></Breadcrumb>;
}
