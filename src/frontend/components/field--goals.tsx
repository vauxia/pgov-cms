import Link from 'next/link'

interface FieldGoalsProps {
  goals: any;
  title: string;
}

export function FieldGoals({goals, title, ...props}:FieldGoalsProps) {
  return (
    <>
      <h3>{title}</h3>
      <ul className="">
        {goals.map((goal) => (
          <li className="" key={goal.id}>
            <Link href={goal.path}>{goal.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
