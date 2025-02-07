import { useRef, useState } from "react";
import Link from 'next/link'
import { DrupalNode } from "next-drupal";
import { Icon, Button, ButtonGroup } from "@trussworks/react-uswds";
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
  const { title, field_agency, field_file, field_goals } = node;
  const [listView, setListView] = useState(true);
  const totals = calculateObjectiveIndicatorTotals(field_goals);
  const masonryBP = {350: 1, 750: 2, 1060: 3, 1400: 4};
  const startDate = new Date(storageData.administration?.dateRange?.start.time);
  const endDate = new Date(storageData.administration?.dateRange?.end.time)
  const dateOptions: Intl.DateTimeFormatOptions = {year: "numeric"}
  return (
    <>
      <USABreadcrumb activeItem={title} links={[]} />
      <div className="grid-row">
        <div className="side-bar">
          <span className="text-white radius-pill bg-black padding-x-1 font-sans-3xs">Plan</span>
          <h1 className="font-sans-xl">{title}</h1>
          <div className="margin-bottom-2 padding-top-1 border-top border-base-lighter">
            <GoalsTotals
              goals={totals.goals}
              objectives={totals.objectives}
              indicators={totals.indicators}
            />
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
          {node.body &&
          (
            <div className="margin-bottom-2 border-top border-base-lighter">
              <h2 className="font-sans-3xs text-semibold margin-bottom-05">Description</h2>
              <div
                dangerouslySetInnerHTML={{ __html: node.body?.processed }}
                className="font-body-sm"
              />
            </div>
          )}
          {field_file &&
            <div>
              <Link
                className="text-no-underline grid-row flex-align-center flex-justify-center border radius-md width-full padding-y-1 padding-x-205"
                href={field_file.field_media_document.uri.url}
              >
                <Icon.FilePresent size={3} aria-hidden={true} />
                <span>View as PDF</span>
              </Link>
            </div>
          }
        </div>
        <div className="content-area">
          
          <main id="main-content" className="main-content padding-x-4 padding-bottom-5 padding-top-8" ref={mainContentRef}>
            <div className="grid-row flex-justify">
              <h2 className="font-sans-xl margin-top-0">Goals</h2>
              <ButtonGroup type="segmented">
                <Button
                  outline
                  type="button"
                  onClick={() => setListView(false)}
                  disabled={!listView}
                >
                  <Icon.GridView size={3} aria-hidden={true} />
                  <span className="usa-sr-only">Goals grid view</span>
                </Button>
                <Button
                  outline
                  type="button"
                  onClick={() => setListView(true)}
                  disabled={listView}
                >
                  <Icon.List size={3} aria-hidden={true} />
                  <span className="usa-sr-only">Goals list view</span>
                </Button>
              </ButtonGroup>
            </div>
            
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
                        className={`grid-row flex-no-wrap flex-justify text-no-underline font-sans-md padding-2 text-base-darkest ${linkBorders}`}
                        href={goal.path.alias}>
                          <span>{goal.title}</span>
                          <Icon.NavigateNext size={3} aria-hidden={true} />
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
                          <Link key={goal.id} href={goal.path.alias} className="text-no-underline">
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
