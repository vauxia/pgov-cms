import { useState} from 'react';
import { DrupalNode } from "next-drupal";
import { USAInPageNav } from "./usa--in-page-nav";
import { FieldGoalType } from "./field--goal-type";
import { USABreadcrumb } from './usa--breadcrumb';
import { FieldObjectives } from './field--objectives';

interface NodeGoalProps {
  node: DrupalNode;
  storageData: any;
}

export function NodeGoal({ node, storageData, ...props }: NodeGoalProps) {
  const { title, field_topics, field_goal_type, field_plan, field_objectives } = node;
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
          <USAInPageNav 
            logo={field_agency.field_logo ? field_agency.field_logo : null}
            logoAbove={false}
            links={[
              {href: "#about-goal", label: `About this ${field_agency.field_acronym} ${goalTypeString} goal`},
              {href: "#what-is-goal", label: `What is a ${goalTypeString} goal?`},
              {href: "#related-goals", label: "Related goals"}
            ]}
          />
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
            <p><span className="text-bold">Strategic plan:</span> {field_plan.title}</p>
            <FieldObjectives fieldObjectives={storageData.objectives} />
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
