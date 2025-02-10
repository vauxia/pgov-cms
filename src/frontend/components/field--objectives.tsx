import ObjectiveIndicator from "./objective-indicator";

interface FieldPeriodProps {
  dateRange: {
    end: {
      time: string;
    }
    start: {
      time: string;
    }
  }
  duration: string;
  id: string;
  name: string;
}

interface FieldMeasurementProps {
  id: string;
  name: string;
  status: boolean;
  targetValue: number;
  value: number;
  period: FieldPeriodProps;
}

interface FieldIndicatorProps {
  id: string;
  measurements: Array<FieldMeasurementProps>;
  name: string;
  notes: {
    processed: string
  }
}

interface FieldObjectiveProps {
  fieldObjectives: Array<{
    id: string;
    title: string;
    indicators: Array<FieldIndicatorProps>
  }>
}

export function FieldObjectives({fieldObjectives} : FieldObjectiveProps) {
  return (
    <div>
      <ol className="add-list-reset">
        {fieldObjectives?.map((objective, index) => (
          <li key={objective.id} className={``}>
            <h2 id={objective.id}>Objective {index + 1}: {objective.title}</h2>
            {objective.indicators?.length > 0 && (
              <ol className="add-list-reset">
                {objective.indicators?.map((indicator, indicatorIndex) => {
                  let listBorders = "border-top";
                  let linkBorders = ""
                  if (indicatorIndex === 0) {
                    listBorders = "radius-top-lg";
                    linkBorders = "radius-top-lg";
                  } else if (indicatorIndex === objective.indicators.length - 1) {
                    listBorders = "radius-bottom-lg border-top";
                  }
                  return (
                    <li key={indicator.id} className={`bg-white ${listBorders}`}>
                      <ObjectiveIndicator indicator={indicator} borders={linkBorders}/>
                    </li>
                  )
                })}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

                  // return(
                  //   <li key={goal.id} >
                  //     <Link
                  //       className={`grid-row flex-no-wrap flex-justify text-no-underline font-sans-md padding-2 text-base-darkest ${linkBorders}`}
                  //       href={goal.path.alias}>
                  //         <span>{goal.title}</span>
                  //         <Icon.NavigateNext size={3} aria-hidden={true} />
                  //     </Link>
                  //   </li>