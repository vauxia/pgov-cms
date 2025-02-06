interface GoalsTotalsProps {
  goals: number;
  objectives: number;
  indicators: number;
}

const GoalsTotals = ({goals, objectives, indicators}: GoalsTotalsProps) => {
  return (
    <div>
      <ul className="font-sans-3xs grid-row add-list-reset flex-justify text-bold">
        <li>
          <span className="font-sans-lg display-block">{goals}</span> Goals
        </li>
        <li>
          <span className="font-sans-lg display-block">{objectives}</span> Objectives
        </li>
        <li>
          <span className="font-sans-lg display-block">{indicators}</span> Indicators
        </li>
      </ul>
    </div>
  )
}

export default GoalsTotals;
