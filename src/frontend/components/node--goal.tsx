import { useRef } from 'react';
import Link from 'next/link'
import Image from "next/image";
import { DrupalNode } from "next-drupal";
import { Icon, Button, ButtonGroup } from "@trussworks/react-uswds";
import { USAInPageNav } from "./usa--in-page-nav";
import { FieldGoalType } from "./field--goal-type";
import { USABreadcrumb } from './usa--breadcrumb';
import { FieldObjectives } from './field--objectives';
import AgencyInfoBox from './agency-info-box';
import { FieldLogo } from "./field--logo";
import GoalsTotals from "./goal-totals";

interface NodeGoalProps {
  node: DrupalNode;
  storageData: any;
}

function calculateObjectiveIndicatorTotals(objectives) {
  let objectiveCount = 0;
  let indicatorCount = 0;
  if (objectives) {
    objectiveCount += objectives.length;
    objectives.forEach((objective) => {
      const indicators = objective.indicators;
      if (indicators) {
        indicatorCount += indicators.length;
      }
    })
  }
  return {
    objectives: objectiveCount,
    indicators: indicatorCount,
  }
}

function objectiveAverageValue(indicators) {
  const count = indicators.length;
  let total = 0
  indicators.forEach((indicator) => {
    total += indicator.progress;
  })
  return total / count;
}

export function NodeGoal({ node, storageData, ...props }: NodeGoalProps) {
  let mainContentRef = useRef();
  const { title, field_topics, field_goal_type, field_plan } = node;
  const { field_agency } = field_plan;
  const totals = calculateObjectiveIndicatorTotals(storageData.objectives);

  const startDate = new Date(storageData.plan?.administration?.dateRange?.start.time);
  const endDate = new Date(storageData.plan?.administration?.dateRange?.end.time)
  const dateOptions: Intl.DateTimeFormatOptions = {year: "numeric"}
  const { image } = storageData;
  const imageUrl = image?.mediaImage?.variations[0]?.url;
  const breadcrumbLinks = [
    {label: field_plan.title, href: field_plan.path.alias}
  ];
  return (
    <>
      <USABreadcrumb activeItem={title} links={breadcrumbLinks} />
      <div className="grid-row">
        <div className="side-bar">
        <span className="text-white radius-pill bg-black padding-x-1 font-sans-3xs">Plan</span>
        <h1 className="font-sans-xl">{title}</h1>
        {imageUrl &&
          <Image
            src={imageUrl}
            width={400}
            height={400}
            alt={image.mediaImage?.alt ? image.mediaImage.alt : `${title} image`}
            priority
            className="flex-align-self-center"
          />
        }
        <div className="margin-bottom-2 padding-top-1 border-top border-base-lighter">
          <GoalsTotals
            goals={0}
            objectives={totals.objectives}
            indicators={totals.indicators}
          />
        </div>
        <div className="margin-bottom-2 border-top border-base-lighter">
          <h2 className="font-sans-3xs text-semibold margin-bottom-05">Plan</h2>
          <Link
            className="text-no-underline"
            href={field_plan.path.alias}
          >
            {field_plan.title}
          </Link>
        </div>
        <div className="grid-row flex-justify flex-no-wrap margin-bottom-2 border-top border-base-lighter">
          <div className="grid-row flex-column">
            <h2 className="font-sans-3xs text-semibold margin-bottom-05">Owner</h2>
            <span className="font-sans-3xs">{field_agency.title}</span>
          </div>
          <div className="flex-align-self-center">
            <FieldLogo
              field_logo={field_agency.field_logo}
              height={24}
              width={24}
            />
          </div>
        </div>
        {startDate && endDate &&
          <div className="margin-bottom-2 border-top border-base-lighter">
            <h2 className="font-sans-3xs text-semibold margin-bottom-05">Duration</h2>
            <span>Fiscal Year {startDate.toLocaleDateString('en-US', dateOptions)}-{endDate.toLocaleDateString('en-US', dateOptions)}</span>
          </div>
          }
        <div className="margin-bottom-2 border-top border-base-lighter">
          <h2 className="font-sans-3xs text-semibold margin-bottom-05">Description</h2>
          <div
            dangerouslySetInnerHTML={{ __html: node.body?.processed }}
            className="font-body-sm"
          />
        </div>
        {field_plan?.field_file
          && (
            <div className="margin-bottom-2">
              <Link
                className="text-no-underline grid-row flex-align-center flex-justify-center border radius-md width-full padding-y-1 padding-x-205"
                href={field_plan.field_file.field_media_document.uri.url}
              >
                <Icon.FilePresent size={3} aria-hidden={true} />
                <span>View as PDF</span>
              </Link>
            </div>
          )}
        <div className="margin-bottom-2 border-top border-base-lighter">
          <h2 className="font-sans-3xs text-semibold margin-bottom-05">Tags</h2>
          {field_topics.length > 0 && (
              <ul className="add-list-reset grid-row">
                {field_topics.map((topic) => (
                  <li className="margin-bottom-2 margin-right-2" key={topic.id}>
                    <span className="usa-tag">{topic.name}</span>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
        <div className="content-area">
          <main id="main-content" className="main-content padding-x-4 padding-bottom-5 padding-top-8" ref={mainContentRef}>
            <div>
              <h2 className="font-sans-xl margin-top-0 margin-bottom-1" id="goal-description">
                Overview
              </h2>
              {storageData?.objectives && (
                <ol className="add-list-reset grid-row flex-no-wrap">
                  {storageData.objectives.map((objective, index) => (
                    <li key={objective.id} className="padding-1 radius-lg">
                     <div className="bg-white padding-2 radius-lg">
                      <h3 className="margin-top-0">Objective {index + 1}</h3>
                      <p>{objective.title}</p>
                      {objective?.indicators && objective?.indicators.length > 0 &&
                        <progress value={objectiveAverageValue(objective.indicators)} max={100} />
                      }
                     </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
            {storageData?.objectives && (
              <FieldObjectives fieldObjectives={storageData.objectives} />
            )}
            
          </main>
        </div>
      </div>
    </>
  );
}
