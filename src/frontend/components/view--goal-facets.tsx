import { useState, useEffect } from 'react';

const ViewGoalFacets = ({filter_options, handleSearch}) => {
  const [facets, setFacets] = useState(null);
  const url = `/api/get-facets`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFacets(data));
  }, []);

  const facetKeys = filter_options ? Object.keys(filter_options) : [];
  facetKeys.sort();

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
