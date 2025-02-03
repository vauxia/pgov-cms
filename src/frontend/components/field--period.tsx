export function FieldPeriod({field_period}) {
  const { name } = field_period;
  let period = name.replace(/^[^0-9]+/, '');
  return (
    <span className={`border padding-x-105 font-sans-3xs radius-pill`}>
      {period}
    </span>
  );
}



