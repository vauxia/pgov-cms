import { Breadcrumb, BreadcrumbBar, BreadcrumbLink } from "@trussworks/react-uswds";

export function USABreadcrumb({activeItem, links}) {
  return (
    <BreadcrumbBar>
      <Breadcrumb>
        <BreadcrumbLink href="/">
          <span>Home</span>
        </BreadcrumbLink>
      </Breadcrumb>
      {links.map((link) => (
        <Breadcrumb key={link.href}>
          <BreadcrumbLink href={link.href}>
            <span>{link.label}</span>
          </BreadcrumbLink>
        </Breadcrumb>
      ))}
      <Breadcrumb current>
        <span>{activeItem}</span>
      </Breadcrumb>
    </BreadcrumbBar>
  );
}
