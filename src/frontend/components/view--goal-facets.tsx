import { useState, useEffect } from 'react';

const ViewGoalFacets = ({filter_options, handleSearch}) => {
  const facetKeys = filter_options ? Object.keys(filter_options) : [];

  const [checkedFacets, setCheckedFacets] = useState([])

  function handleCheck(facetKey) {
    if (checkedFacets.includes(facetKey)) {
      const newFacetList = checkedFacets.filter((facet) => {
        if (facet == facetKey) {
          return null;
        }
        return facet;
      })
      setCheckedFacets(newFacetList)
    } else {
      setCheckedFacets([...checkedFacets, facetKey])
    }
  }

  useEffect(() => {
    handleSearch(null, checkedFacets)
  }, [checkedFacets, handleSearch])

  return(
    <div>
      {facetKeys.map(( facetKey ) => (
        <div className="usa-checkbox" key={facetKey.replace(/ /g,'')}>
          <input
            className="usa-checkbox__input"
            id={`${facetKey.replace(/ /g,'')}-checkbox`}
            type="checkbox"
            name="goal-search-facets"
            value={facetKey}
            onChange={() => handleCheck(facetKey)}
            checked={checkedFacets.includes(facetKey)}
          />
          <label
            className="usa-checkbox__label"
            htmlFor={`${facetKey.replace(/ /g,'')}-checkbox`}
          >
            {facetKey}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ViewGoalFacets;
