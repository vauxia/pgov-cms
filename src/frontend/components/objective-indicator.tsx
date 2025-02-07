import { formatDate } from "lib/utils";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState } from "react";
import { Icon } from "@trussworks/react-uswds";

function buildChartData(names, targetValues, actualValues) {
  let dataArray = [];
  if(!names) {
    return [];
  }
  names.forEach((name, index) => {
    dataArray.push({
      name: name,
      Targets: targetValues[index],
      Actuals: actualValues[index],
    })
  })
  return dataArray
}

const ObjectiveIndicator = ({indicator, borders}) => {
  const [open, setOpen] = useState(false)
  const { name, measurements } = indicator;
  const data = buildChartData(indicator.names, indicator.targetValues, indicator.values);
  return(
    <div className={`objective-indicator text-no-underline font-sans-md text-base-darkest ${borders}`}>
      <button 
        onClick={() => setOpen(!open)}
        className="padding-2 grid-row objective-indicator-button"
      >
        <span className="objective-name flex-1">{name}</span>
        {indicator.progress
          && (
            <div className="grid-row margin-right-2">
              <progress className="margin-right-2" value={indicator.progress} max={100} />
              <span>{indicator.progress}%</span>
            </div>
          )
        }
        {open
        ? <Icon.ExpandLess aria-hidden={true} size={3} />
        : <Icon.ExpandMore aria-hidden={true} size={3} />
        }
      </button>
      {open &&
        <div className="grid-row padding-2">
         <div>
          {(measurements && measurements.length > 0) && (
            <table className="usa-table usa-table--stacked width-full">
              <caption className="usa-sr-only">
                Date and result measurements for the {name} performance indicator.
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
                {measurements?.map((measurement) => (
                  <tr key={measurement.id}>
                    <td>{formatDate(measurement.period?.dateRange?.start.time)}</td>
                    <td>{formatDate(measurement.period?.dateRange?.end.time)}</td>
                    <td>{measurement.value ? measurement.value : "N/A"}</td>
                    <td>{measurement.targetValue ? measurement.targetValue : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
          <div>
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="Targets" stroke="#162152" />
              <Line type="monotone" dataKey="Actuals" stroke="#E41B3C" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </div>
          {indicator.notes?.processed && (
            <div dangerouslySetInnerHTML={{ __html: indicator.notes?.processed }} />
          )}
        </div>
      }
    </div>
  );
}

export default ObjectiveIndicator;