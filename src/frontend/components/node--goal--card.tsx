import Link from 'next/link'
import { NodeGoalProps } from "lib/types";
import { truncateString } from "lib/utils";
import Image from "next/image";

interface NodeGoalCardProps {
  goal: NodeGoalProps
}

export function NodeGoalCard({ goal, ...props }: NodeGoalCardProps) {
  const { title, body, path, plan } = goal;
  const { agency } = plan;
  const { acronym: agencyAcronym, logo: agencyLogo, title: agencyTitle } = agency;
  return (
    <div className="goal-card padding-1">
      <Link href={path}>
      <div className="padding-y-1 bg-white usa-card margin-bottom-0">
        <div className="usa-card__container" >
          <div className="grid-row flex-justify padding-top-1 padding-x-3">
            <span className="border padding-x-105 font-sans-3xs radius-pill">Goal type</span>
            <span className="font-sans-3xs">Period here!</span>
          </div>
          <div className="usa-card__header">
            <h4 className="usa-card__heading">{title}</h4>
          </div>
          
          <div className="usa-card__body grid-row flex-column flex-align-center">
          <Image
            src={agencyLogo?.mediaImage.url}
            width={150}
            height={150}
            alt={agencyLogo?.mediaImage.alt}
            priority
            className="flex-align-self-center"
          />
          </div>
          <div className="usa-card__footer padding-bottom-1 grid-row flex-justify flex-no-wrap border-top-2px border-base-lighter">
            <div className="grid-row flex-column">
              <span className="text-bold">{agencyAcronym}</span>
              <span className="font-sans-3xs">{agencyTitle}</span>
            </div>
            <Image
              src={agencyLogo?.mediaImage.url}
              width={24}
              height={24}
              alt={agencyLogo?.mediaImage.alt}
              priority
              className="flex-align-self-center"
            />
            
            
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}
