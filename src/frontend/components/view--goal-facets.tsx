import { useState, useEffect } from 'react';
import { Icon } from "@trussworks/react-uswds";

const ViewGoalFacets = ({handleSearch, handleClose}) => {
  const [facets, setFacets] = useState(null);
  const url = `/api/get-facets`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFacets(data));
  }, []);

  const [checkedFacets, setCheckedFacets] = useState([])

  const removeCheckedFacet = (facetToRemove) => {
    setCheckedFacets(checkedFacets.filter((facetKey) => facetKey !== facetToRemove));
  };

  function handleCheck(facetKey) {
    if (!checkedFacets.includes(facetKey)) {
      setCheckedFacets([...checkedFacets, facetKey])
    } else {
      removeCheckedFacet(facetKey);
    }
  }

  useEffect(() => {
    handleSearch(null, checkedFacets)
  }, [checkedFacets, handleSearch])


  if (!facets) return <div>Loading...</div>;


  return(
    <div>
      <div className="grid-row flex-justify">
        <h2>Filter by topic</h2>
        <button className="close-button" onClick={() => handleClose()} aria-label="Close filters">
          <Icon.Close size={3} aria-hidden={true} />
        </button>
      </div>
      {facets.data.termTopics.nodes.map(( facetKey ) => (
        <div className="usa-checkbox" key={facetKey.id}>
          <input
            className="usa-checkbox__input"
            id={`${facetKey.id}-checkbox`}
            type="checkbox"
            name="goal-search-facets"
            value={facetKey.name}
            onChange={() => handleCheck(facetKey.name)}
            checked={checkedFacets.includes(facetKey.name)}
          />
          <label
            className="usa-checkbox__label"
            htmlFor={`${facetKey.id}-checkbox`}
          >
            {facetKey.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ViewGoalFacets;
