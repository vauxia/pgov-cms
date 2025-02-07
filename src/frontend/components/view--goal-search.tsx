import { useState, useEffect, useRef, FormEvent, useCallback } from "react";
import { Button } from "@trussworks/react-uswds";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { NodeGoalProps, ViewFilter } from "lib/types";
import { NodeGoalCard } from "./node--goal--card";
import { ViewGoalSearchFacet } from "./view--goal-search--facet";
import { ViewGoalSearchFulltext } from "./view--goal-search--fulltext";
import { ViewGoalSearchResults } from "./view--goal-search--results";
import ViewGoalFacets from "./view--goal-facets";

interface ViewGoalSearch {
  goals: Array<NodeGoalProps>,
  description: string,
  filters: Array<ViewFilter>,
  total: number
}

export default function GoalsSearchView({ filters, goals, total, description }: ViewGoalSearch) {
  const offsetAmount = 15;
  const [fulltext, setFulltext] = useState(filters[0].value ? filters[0].value : "");
  const [totalResults, setTotalResults] = useState(total)
  const [displayGoals, setDisplayGoals] = useState(goals)
  const [facets, setFacets] = useState(filters[1]?.options ? filters[1].options : [])
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [offset, setOffset] = useState(offsetAmount);
  
  const handleSearch = useCallback(async (e: FormEvent, facets: Array<string> = []) => {
    if (e) {
      e.preventDefault();
    }
    const url = `/api/goal-search?fulltext=${fulltext}&facets=${facets}`;
    setOffset(offsetAmount)
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    
      const { data } = await response.json();
      setDisplayGoals(data?.goalsGraphql1?.results ?? []);
      setTotalResults(data?.goalsGraphql1?.pageInfo.total);
      setFacets(data?.goalsGraphql1?.filters[1].options)
    } catch (error) {
      console.error(error.message);
    }
  }, [fulltext])


  const masonryBP = filtersOpen ? {350: 1, 750: 2, 1400: 3} : {350: 1, 750: 2, 1060: 3, 1400: 4};
  return (
    <div>
      <div className="grid-row flex-justify-center">
        <h1 className="font-heading-2xl">{description}</h1>
      </div>
      <button onClick={() => setFiltersOpen(!filtersOpen)}>Filter</button>
      <ViewGoalSearchFulltext
        fulltext={fulltext}
        setFulltext={setFulltext}
        handleSearch={handleSearch}
      />
      
      <div className="grid-row">
        <div className={`side-bar ${filtersOpen ? "" : "filters-closed"}`}>
          <ViewGoalFacets filter_options={facets} handleSearch={handleSearch} />
        </div>
        <div className="content-area">
          {displayGoals?.length ? (
          <ResponsiveMasonry
              columnsCountBreakPoints={masonryBP}
              gutterBreakpoints={{350: "12px", 750: "16px", 900: "24px"}}
          >
              <Masonry>
              {displayGoals.slice(0, offset).map((goal) => (
                  <NodeGoalCard key={goal.id} goal={goal} />
                ))}
              </Masonry>
          </ResponsiveMasonry>
          
        ) : (
            <div className="usa-alert usa-alert--warning usa-alert--slim">
              <div className="usa-alerjt__body">
                <p className="usa-alert__text">
                  No matching goals.
                </p>
              </div>
            </div>
          )}

        <div className="grid-row flex-justify-center margin-bottom-205">
          {offset < totalResults &&
            <Button
              type="button"
              onClick={() => setOffset(offset + offsetAmount)}
            >
              Show more
            </Button>
          }
        </div>
        </div>
      </div>
    </div>
  );
}
