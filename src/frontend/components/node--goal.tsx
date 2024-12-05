import { useState} from 'react';
import { DrupalNode } from "next-drupal";
import { USAInPageNav } from "./usa--in-page-nav";
import { FieldGoalType } from "./field--goal-type";
import { FieldLogo } from './field--logo';
import { USABreadcrumb } from './usa--breadcrumb';

interface NodeGoalProps {
  node: DrupalNode;
}

export function NodeGoal({ node, ...props }: NodeGoalProps) {
  const { title, field_topics, field_goal_type, field_plan } = node;
  const { field_agency } = field_plan;
  const [objectives, setObjectives] = useState([]);
  let goalTypeString = field_goal_type;
  if (field_goal_type == "apg") {
    goalTypeString = "priority";
  }
  const breadcrumbLinks = [
    {label: "Agencies", href: "/agencies"},
    {label: field_agency.field_acronym, href: field_agency.path.alias}
  ];
  console.log(node)
  return (
    <>
      <USABreadcrumb activeItem={title} links={breadcrumbLinks} />
      <div className="grid-row">
        <div className="desktop:grid-col-12">
          <FieldGoalType field_goal_type={field_goal_type} />
        </div>
      </div>
      
      <div className="grid-row">
        <div className="desktop:grid-col-3">
          <USAInPageNav links={[
            {href: "#about-goal", label: `About this ${field_agency.field_acronym} ${goalTypeString} goal`},
            {href: "#what-is-goal", label: `What is a ${goalTypeString} goal?`},
            {href: "#related-goals", label: "Related goals"}
          ]} />
          {field_agency.field_logo && (
            <FieldLogo field_logo={field_agency.field_logo} />
          )}
        </div>
        <div className="desktop:grid-col-9">
          <h1 className="font-sans-2xl">{title}</h1>
          <main id="main-content" className="main-content">
            <h2 className="font-sans-xl" id="about-goal">
              About this {field_agency.field_acronym} {goalTypeString} goal
            </h2>
            {node.body?.processed && (
              <div
                dangerouslySetInnerHTML={{ __html: node.body?.processed }}
                className="font-body-md"
              />
            )}
            <p>Strategic plan: link to strategic plan</p>
            <h2 className="font-sans-2xl" id="related-resources">
              Objectives
            </h2>
            <ol>
              <li>objective1</li>
              <li>objective2</li>
            </ol>
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
