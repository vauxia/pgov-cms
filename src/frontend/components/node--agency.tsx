import { DrupalNode } from "next-drupal";
import { USABreadcrumb } from "./usa--breadcrumb";
import { USAInPageNav } from "./usa--in-page-nav";
import { NodePlan } from "./node--plan";

interface NodeAgencyProps {
  node: DrupalNode;
  planData: any;
}

export function NodeAgency({ node, planData, ...props }: NodeAgencyProps) {
  const breadcrumbLinks = [
    {label: "Agencies", href: "/agencies"},
  ];
  console.log(planData)
  function buildInPageLinks() {
    let links = [
      {href: "#mission", label: `Mission`, primary: true}
    ];
    if (planData && planData.length > 0) {
      planData.forEach((plan) => {
        links.push({href: `#${plan.id}`, label: plan.title, primary: true})
      })
    }
    // if (storageData.objectives) {
    //   links.push({href: "#objectives", label: `Objectives`, primary: true});
    //   storageData.objectives.forEach((objective) => {
    //     links.push({href: `#${objective.id}`, label: objective.title, primary: false });
    //   })

    // }

    links.push({href: "#related-resources", label: `Related Resources`, primary: true})
    return links;
  }

  return (
    <>
      <USABreadcrumb links={breadcrumbLinks} activeItem={node.field_acronym} />
      <div className="grid-row">
        <div className="desktop:grid-col-4">
          <USAInPageNav
            logo={node.field_logo ? node.field_logo : null}
            links={buildInPageLinks()}
          />
        </div>
        <div className="desktop:grid-col-8">
          <h1 className="font-sans-3xl">{node.title}</h1>
          <main id="main-content" className="main-content">
            <h2 className="font-sans-2xl" id="mission">
              Mission
            </h2>

            {node.body?.processed && (
              <div
                dangerouslySetInnerHTML={{__html: node.body?.processed}}
                className="font-body-md"
              />
            )}

            {planData.length > 0 && (
              <section>
                {planData.map((plan) => (
                  <NodePlan key={plan.id} plan={plan} />
                ))}
              </section>
            )}

            <h2 className="font-sans-2xl" id="related-resources">
              Related Resources
            </h2>
            <ul>
              <li>
                <a href={node.field_link.uri} target="_blank">
                  Visit the {node.field_acronym} website
                </a>
              </li>
            </ul>
          </main>
        </div>
      </div>
    </>
  );
}
