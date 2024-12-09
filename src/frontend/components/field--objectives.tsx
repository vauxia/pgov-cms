import { formatDate } from "lib/utils";


export function FieldObjectives({fieldObjectives}) {
  console.log(fieldObjectives)
  return (
    <div>
      <h2 className="font-sans-2xl margin-bottom-1" id="related-resources">
        Objectives
      </h2>
      <ol className="add-list-reset">
        {fieldObjectives.map((objective, index) => (
          <li key={objective.id} className={`${index > 0 ? "border-top" : ""}`}>
            <h3>{objective.title}</h3>
            <h4 className="margin-bottom-0">Performance indicators</h4>
              <ol className="add-list-reset">
                {objective.indicators.map((indicator) => (
                  <li key={indicator.id}>
                    <p>{indicator.name}</p>
                    <table className="usa-table usa-table--stacked width-full">
                      <caption className="usa-sr-only">
                        Date and result measurements for the {indicator.name} performance indicator.
                      </caption>
                      <thead>
                        <tr>
                          <th>Start date</th>
                          <th>End date</th>
                          <th>Actual result</th>
                          <th>Target result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {indicator.measurements.map((measurement) => (
                          <tr key={measurement.id}>
                            <td>{formatDate(measurement.period.dateRange.start.time)}</td>
                            <td>{formatDate(measurement.period.dateRange.end.time)}</td>
                            <td>{measurement.value ? measurement.value : "N/A"}</td>
                            <td>{measurement.targetValue ? measurement.targetValue : "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </li>
                ))}
              </ol>
          </li>
        ))}
      </ol>
    </div>
    
    
  );
}



