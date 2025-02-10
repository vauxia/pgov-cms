import Link from 'next/link'
import { NodeGoalProps } from "lib/types";
import { truncateString } from "lib/utils";
import Image from "next/image";
import AgencyInfoBox from './agency-info-box';
import { FieldGoalType } from './field--goal-type';
import { FieldPeriod } from './field--period';

interface NodeGoalCardProps {
  goal: NodeGoalProps
}

export function NodeGoalCard({ goal, ...props }: NodeGoalCardProps) {
  const { title, body, path, plan, goalType,period, image } = goal;
  const { agency } = plan;
  const { acronym: agencyAcronym, logo: agencyLogo, title: agencyTitle } = agency;
  const imageUrl = image?.mediaImage?.variations[0]?.url;
  return (
    <div className="goal-card padding-1">
      <Link href={path}>
      <div className="padding-y-1 bg-white usa-card margin-bottom-0">
        <div className="usa-card__container" >
          <div className="grid-row flex-justify padding-top-1 padding-x-2">
            <FieldGoalType field_goal_type={goalType} />
            <FieldPeriod field_period={period} />
          </div>
          <div className="usa-card__header">
            <h4 className="usa-card__heading">{title}</h4>
          </div>

          <div className="usa-card__body grid-row flex-column flex-align-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                width={150}
                height={150}
                alt={title}
                priority
                className="flex-align-self-center"
              />
            )}
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
