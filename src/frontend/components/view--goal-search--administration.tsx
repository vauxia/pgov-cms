import { FormEvent } from "react";


export function ViewGoalSearchAdministration() {
  return (
    <form className="usa-form">
      <label className="usa-sr-only" htmlFor="options">Dropdown label</label>
      <select className="search-goals--administration padding-x-2 padding-y-1 text-bold" name="options" id="options">
        <option value>- Select -</option>
        <option value="53">Trump 47</option>
        <option value="55">Trump 45</option>
      </select>
    </form>
  );
}
