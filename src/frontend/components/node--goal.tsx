import { useRef } from 'react';
import Link from 'next/link'
import { DrupalNode } from "next-drupal";
import { USAInPageNav } from "./usa--in-page-nav";
import { FieldGoalType } from "./field--goal-type";
import { USABreadcrumb } from './usa--breadcrumb';
import { FieldObjectives } from './field--objectives';
import AgencyInfoBox from './agency-info-box';
import { FieldPeriod } from './field--period';

interface NodeGoalProps {
  node: DrupalNode;
  storageData: any;
}

export function NodeGoal({ node, storageData, ...props }: NodeGoalProps) {
  let mainContentRef = useRef();
  const { title, field_topics, field_goal_type, field_plan } = node;
  const { field_agency } = field_plan;
  let goalTypeString = field_goal_type;
  if (field_goal_type == "apg") {
    goalTypeString = "priority";
  }
  const breadcrumbLinks = [
    {label: field_plan.title, href: field_plan.path.alias}
  ];
<USAInPageNav 
            logo={field_agency.field_logo ? field_agency.field_logo : null}
            logoAbove={false}
            links={buildInPageLinks()}
          />
  function buildInPageLinks() {
    let links = [
      {href: "#goal-description", label: `About this ${field_agency.field_acronym} ${goalTypeString} goal`, primary: true}
    ];
    if (storageData.objectives) {
      links.push({href: "#objectives", label: `Objectives`, primary: true});
      storageData.objectives.forEach((objective) => {
        links.push({href: `#${objective.id}`, label: objective.title, primary: false });
      })

    }
    return links;
  }
  return (
    <>
      <USABreadcrumb activeItem={title} links={breadcrumbLinks} />
      {/* <div className="">
        <div className="">
          <FieldGoalType field_goal_type={field_goal_type} />
        </div>
      </div> */}
      <div className="grid-row">
        <div className="side-bar">
          <div>
            <FieldGoalType field_goal_type={field_goal_type} />
            <FieldPeriod field_period={storageData?.period} />
          </div>
          {title}
          <AgencyInfoBox
            acronym={field_agency.field_acronym}
            logo={field_agency.field_logo}
            title={field_agency.title}
          />
          {/* <USAInPageNav 
            logo={field_agency.field_logo ? field_agency.field_logo : null}
            logoAbove={false}
            links={buildInPageLinks()}
          /> */}
        </div>
        <div className="content-area">
          <h1 className="font-sans-2xl">{title}</h1>
          <main id="main-content" className="main-content" ref={mainContentRef}>
            <h2 className="font-sans-xl" id="goal-description">
              About this {field_agency.field_acronym} {goalTypeString} goal
            </h2>
            {node.body?.processed && (
              <div
                dangerouslySetInnerHTML={{ __html: node.body?.processed }}
                className="font-body-md"
              />
            )}
            <p>
              <span className="font-body-md text-bold">Strategic plan:</span>{" "}
              <Link href={`${field_agency.path.alias}`}>{field_plan.title}</Link>
            </p>
            {storageData?.objectives && (
              <FieldObjectives fieldObjectives={storageData.objectives} />
            )}
            {field_topics.length > 0 && (
              <ul className="add-list-reset grid-row">
                {field_topics.map((topic) => (
                  <li className="margin-bottom-2 margin-right-2" key={topic.id}>
                    <span className="usa-tag">{topic.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
