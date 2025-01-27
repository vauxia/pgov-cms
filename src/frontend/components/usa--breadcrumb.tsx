// BreadcrumbBar expects single elements, wrapping the map function in <></> fixes type issue.
import { Breadcrumb, BreadcrumbBar, BreadcrumbLink } from "@trussworks/react-uswds";

interface USABreadcrumbProps {
  activeItem: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export function USABreadcrumb({activeItem, links}: USABreadcrumbProps) {
  return (
    <BreadcrumbBar>
      <Breadcrumb>
        <BreadcrumbLink href="/">
          <span>Home</span>
        </BreadcrumbLink>
      </Breadcrumb>
      <>
        {links.map((link) => (
          <Breadcrumb key={link.href}>
            <BreadcrumbLink href={link.href}>
              <span>{link.label}</span>
            </BreadcrumbLink>
          </Breadcrumb>
        ))}
      </>
      <Breadcrumb current>
        <span>{activeItem}</span>
      </Breadcrumb>
    </BreadcrumbBar>
  );
}
