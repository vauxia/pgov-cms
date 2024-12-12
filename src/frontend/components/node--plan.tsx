import Link from 'next/link'
import {FieldGoals} from "./field--goals";

interface NodeGoalProps {
  plan: any;
  key: string;
}

export function NodePlan({plan, ...props}: NodeGoalProps) {
  const apgs = plan?.goals?.filter((goal) => goal.goalType === "apg");
  const strategic = plan?.goals?.filter((goal) => goal.goalType === "strategic");
  console.log(plan);
  return (
    <>
      <h2>{plan.title}</h2>
      {strategic?.length > 0 && (
        <FieldGoals goals={strategic} title={"Strategic Goals"} />
      )}

      {apgs?.length > 0 && (
        <FieldGoals goals={apgs} title={"Agency Priority Goals"} />
      )}

      {plan?.link?.url && (
        <>
          <h3>Related Documents</h3>
          <ul>
            <li><Link href={plan?.link?.url}>{plan.title}</Link></li>
          </ul>
        </>
      )}
    </>
  );
}
