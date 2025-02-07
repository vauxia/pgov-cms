export function FieldPeriod({field_period}) {
  if (!field_period?.name) {
    return (
      <span className={`border padding-x-105 font-sans-3xs radius-pill`}>
        default
      </span>
    )
  }
  let period = field_period.name.startsWith("FY") ? field_period.name.replace(/^[^0-9]+/, '') : field_period.name;
  return (
    <span className={`border padding-x-105 font-sans-3xs radius-pill`}>
      {period}
    </span>
  );
}

