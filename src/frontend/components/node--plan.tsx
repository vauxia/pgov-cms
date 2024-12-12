import Link from 'next/link'
import {FieldGoals} from "./field--goals";

interface NodeGoalProps {
  plan: any;
  key: string;
}

export function NodePlan({plan, ...props}: NodeGoalProps) {
  const apgs = plan?.goals?.filter((goal) => goal.goalType === "apg");
  const strategic = plan?.goals?.filter((goal) => goal.goalType === "strategic");
  return (
    <>
      <h2 id={plan.id}>{plan.title}</h2>
      {strategic?.length > 0 && (
        <FieldGoals goals={strategic} title={"Strategic goals"} />
      )}

      {apgs?.length > 0 && (
        <FieldGoals goals={apgs} title={"Agency priority goals"} />
      )}

      {plan?.link?.url && (
        <>
          <h3>Related documents</h3>
          <ul>
            <li><Link href={plan?.link?.url}>{plan.title}</Link></li>
          </ul>
        </>
      )}
    </>
  );
}
