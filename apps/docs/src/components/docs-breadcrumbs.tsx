import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbCurrent, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useDocsLocale } from "@/lib/docs-locale";
import { breadcrumbs } from "@/lib/nav";
import { routeIdentity } from "@/lib/paths";
import { Link } from "./locale-link";

export function DocsBreadcrumbs() {
  const locale = useDocsLocale();
  const items = breadcrumbs(useLocation().pathname, locale);
  // A guide hangs directly under the index; the rail already shows where it is, so a
  // two-step trail would only repeat it. Component pages keep the way back to the overview.
  if (items.length < 3) return null;
  return <Breadcrumb className="mb-(--qy-field-gap)"><BreadcrumbList>
    {items.map((item, index) => <Fragment key={routeIdentity(item.path)}>
      {index > 0 ? <BreadcrumbSeparator /> : null}
      <BreadcrumbItem>{index === items.length - 1
        ? <BreadcrumbCurrent>{item.title}</BreadcrumbCurrent>
        : <BreadcrumbLink render={<Link to={item.path} />}>{item.title}</BreadcrumbLink>}
      </BreadcrumbItem>
    </Fragment>)}
  </BreadcrumbList></Breadcrumb>;
}
