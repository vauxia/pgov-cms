import { usePathname } from "next/navigation";

export function USABreadcrumb({activeItem, links}) {
  console.log(links)
  return (
    <nav className="usa-breadcrumb" aria-label="Breadcrumbs,,">
      <ol className="usa-breadcrumb__list">
        <li className="usa-breadcrumb__list-item">
          <a href="/" className="usa-breadcrumb__link">
            <span>Home</span>
          </a>
        </li>
        {links.map((link) => (
          <li key={link.href} className="usa-breadcrumb__list-item">
            <a href={link.href} className="usa-breadcrumb__link">
              <span>{link.label}</span>
            </a>
          </li>
        ))}
        <li className="usa-breadcrumb__list-item usa-current" aria-current="page">
          <span>
            {activeItem}
          </span>
        </li>
      </ol>
    </nav>
  );
}
