import { useRef, useState } from "react";
import Link from 'next/link'
import { DrupalNode } from "next-drupal";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { USABreadcrumb } from "./usa--breadcrumb";
import GoalsTotals from "./goal-totals";
import { FieldLogo } from "./field--logo";

interface NodePlanProps {
  node: DrupalNode;
  storageData: any;
}

function calculateObjectiveIndicatorTotals(goals) {
  let objectiveCount = 0;
  let indicatorCount = 0;
  goals.forEach((goal) => {
    const objectives = goal.field_objectives;
    if (objectives) {
      objectiveCount += objectives.length;
      objectives.forEach((objective) => {
        const indicators = objective.field_indicators;
        if (indicators) {
          indicatorCount += indicators.length;
        }
      })
    }
  })
  return {
    goals: goals.length,
    objectives: objectiveCount,
    indicators: indicatorCount,
  }
}

export function NodePlan({node, storageData, ...props}: NodePlanProps) {
  let mainContentRef = useRef();
  const { title, field_agency, field_link, field_goals } = node;
  const [listView, setListView] = useState(true);
  const totals = calculateObjectiveIndicatorTotals(field_goals);
  const masonryBP = {350: 1, 750: 2, 1060: 3, 1400: 4};
  const startDate = new Date(storageData.period.dateRange.start.time);
  const endDate = new Date(storageData.period.dateRange.end.time)
  const dateOptions: Intl.DateTimeFormatOptions = {year: "numeric"}
  return (
    <>
      <USABreadcrumb activeItem={title} links={[]} />
      <div className="grid-row">
        <div className="side-bar">
          <span className="text-white radius-pill bg-black padding-x-1 font-sans-3xs">Plan</span>
          <h1 className="font-sans-xl">{title}</h1>
          <GoalsTotals
            goals={totals.goals}
            objectives={totals.objectives}
            indicators={totals.indicators}
          />
          <div className="grid-row flex-justify flex-no-wrap">
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
          <div>
            <h2 className="font-sans-3xs text-semibold margin-bottom-05">Duration</h2>
            <span>Fiscal Year {startDate.toLocaleDateString('en-US', dateOptions)}-{endDate.toLocaleDateString('en-US', dateOptions)}</span>
          </div>
          <div>
            <h2 className="font-sans-3xs text-semibold margin-bottom-05">Description</h2>
          </div>
          <div>
            <Link href={`${field_link.uri}`}>View as PDF</Link>
          </div>
          <div>
            Tags
          </div>
        </div>
        <div className="content-area">
          
          <main id="main-content" className="main-content padding-x-4 padding-bottom-5" ref={mainContentRef}>
            <div>
              <button
                onClick={() => setListView(false)}
                disabled={!listView}
              >
                Cards
              </button>
              <button
                onClick={() => setListView(true)}
                disabled={listView}
              >
                List
              </button>
            </div>
            <h2>Goals</h2>
            {listView
            ? (
              <ul className="add-list-reset">
                {field_goals.map((goal, index) => {
                  let listBorders = "border-top";
                  let linkBorders = ""
                  if (index === 0) {
                    listBorders = "radius-top-lg";
                    linkBorders = "radius-top-lg";
                  } else if (index === field_goals.length - 1) {
                    listBorders = "radius-bottom-lg border-top";
                  }
                  return(
                    <li key={goal.id} className={`bg-white ${listBorders}`}>
                      <Link
                        className={`text-no-underline font-sans-md display-block padding-2 text-base-darkest ${linkBorders}`}
                        href={goal.path.alias}>
                          {goal.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )
            : (
              <div>
                <ul>
                  <ResponsiveMasonry
                      columnsCountBreakPoints={masonryBP}
                      gutterBreakpoints={{350: "12px", 750: "16px", 900: "24px"}}
                  >
                    <Masonry>
                      {field_goals.map((goal) => {
                        return(
                          <Link href={goal.path.alias} className="text-no-underline">
                            <div className="usa-card__container">
                              <div className="usa-card__header">
                                <h4 className="usa-card__heading ">{goal.title}</h4>
                              </div>
                              <div className="usa-card__media">
                                <div className="usa-card__img">
                                  {/* <img
                                    src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
                                    alt="A placeholder image"
                                  /> */}
                                </div>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </Masonry>
                  </ResponsiveMasonry>
                </ul>
              </div>
            )
            }
          </main>
        </div>
      </div>
    </>
  );
}
