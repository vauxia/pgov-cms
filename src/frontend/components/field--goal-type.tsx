export function FieldGoalType({ field_goal_type }) {
  let goalTypeName = "";
  let goalTypeClasses = "";
  switch (field_goal_type) {
    case "apg":
      goalTypeName = "Agency priority goal";
      goalTypeClasses = "bg-primary-vivid";
      break;
    case "strategic":
      goalTypeName = "Strategic goal";
      goalTypeClasses = "bg-base-darkest";
      break;
    default:
      goalTypeName = "Default"
      goalTypeClasses = "bg-base";
      break;
  }
  return (
    <span className={`border padding-x-105 font-sans-3xs radius-pill`}>
      {goalTypeName}
    </span>
  );
}
