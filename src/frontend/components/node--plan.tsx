import Link from 'next/link'

interface NodeGoalProps {
  plan: any;
  key: string;
}

export function NodePlan({plan, ...props}: NodeGoalProps) {
  const apgs = plan?.goals?.filter((goal) => goal.goalType === "apg");
  const strategic = plan?.goals?.filter((goal) => goal.goalType === "strategic");

  return (
    <>
      <h2>{plan.title}</h2>
      {strategic?.length > 0 && (
        <>
          <h3>Strategic Goals</h3>
          <ul className="">
            {strategic.map((goal) => (
              <li className="" key={goal.id}>
                <Link href={goal.path}>{goal.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {apgs?.length > 0 && (
        <>
          <h3>Agency Priority Goals</h3>
          <ul className="">
            {apgs.map((goal) => (
              <li className="" key={goal.id}>
                <Link href={goal.path}>{goal.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
