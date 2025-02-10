import Link from 'next/link'
import { NodePlanProps } from "lib/types";
import Image from "next/image";
import AgencyInfoBox from './agency-info-box';
import { FieldGoalType } from './field--goal-type';
import { FieldPeriod } from './field--period';

interface NodePlanCardProps {
  goal: NodePlanProps
}

export function NodePlanCard({ goal, ...props }: NodePlanCardProps) {
  const { title, body, path, agency, goalType,period } = goal;
  const { acronym: agencyAcronym, logo: agencyLogo, title: agencyTitle } = agency;
  return (
    <div className="goal-card padding-1">
      <Link href={path}>
      <div className="padding-y-1 bg-white usa-card margin-bottom-0">
        <div className="usa-card__container" >
          <div className="grid-row flex-justify padding-top-1 padding-x-3">
            <FieldGoalType field_goal_type={'plan'} />
            <FieldPeriod field_period={period} />
          </div>
          <div className="usa-card__header">
            <h4 className="usa-card__heading">{title}</h4>
          </div>

          <div className="usa-card__body grid-row flex-column flex-align-center">
          </div>
          <div className="usa-card__footer padding-bottom-1 border-top-2px border-base-lighter">
            <AgencyInfoBox
              title={agencyTitle}
              logo={agencyLogo}
              acronym={agencyAcronym}
            />
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}
