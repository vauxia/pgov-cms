import { useState, useEffect, FormEvent, useCallback } from "react";
import { Button } from "@trussworks/react-uswds";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { NodeGoalProps, ViewFilter } from "lib/types";
import { NodeGoalCard } from "./node--goal--card";
import { ViewGoalSearchFacet } from "./view--goal-search--facet";
import { ViewGoalSearchFulltext } from "./view--goal-search--fulltext";
import { ViewGoalSearchResults } from "./view--goal-search--results";

interface ViewGoalSearch {
  goals: Array<NodeGoalProps>,
  description: string,
  filters: Array<ViewFilter>,
  total: number
}

async function getData(fulltext: string) {
  const url = `/api/goal-search?fulltext=${fulltext}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    
    const { data } = await response.json();
    console.log(data);
    return {
      goals: data?.goalsGraphql1?.results ?? [],
      filters: data?.goalsGraphql1?.filters ?? [],
      total: data?.goalsGraphql1?.pageInfo?.total ?? 0,
      description: data?.goalsGraphql1?.description ?? "",
    };
  } catch (error) {
    console.error(error.message);
  }
  
}

export default function GoalsSearchView({ filters, goals, total, description }: ViewGoalSearch) {
<<<<<<< HEAD
  const offsetAmount = 15;

  const [fulltext, setFulltext] = useState(filters[0].value ? filters[0].value : "")
  const [facets] = useState([...Object.keys(filters[1].options)])
=======
  const [fulltext, setFulltext] = useState(filters[0]?.value ? filters[0].value : "")
  const [displayGoals, setDisplayGoals] = useState(goals)
  const [facets] = useState(filters[1] ? [...Object.keys(filters[1]?.options)] : [])
>>>>>>> 7a191ae (Initial nextjs api endpoint commit)
  const [search, setSearch] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [offset, setOffset] = useState(offsetAmount);
  const [activeTopics, setActiveTopics] = useState([])
  const [notDisabledTopics, setNotDisabledTopics] = useState([])
  const [filteredGoals, setFilteredGoals] = useState([...goals])
  const [filteredGoalsCount, setFilteredGoalsCount] = useState(total)

  async function handleSearch(e: FormEvent) {
    e.preventDefault()
    const url = `/api/goal-search?fulltext=${fulltext}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    
      const { data } = await response.json();
      console.log(data)
      setDisplayGoals(data?.goalsGraphql1?.results ?? [])
      setFilteredGoalsCount(data?.goalsGraphql1?.pageInfo?.total ?? 0)
      // console.log(data);
      // return {
      //   goals: data?.goalsGraphql1?.results ?? [],
      //   filters: data?.goalsGraphql1?.filters ?? [],
      //   total: data?.goalsGraphql1?.pageInfo?.total ?? 0,
      //   description: data?.goalsGraphql1?.description ?? "",
      // };
    } catch (error) {
      console.error(error.message);
    }
  }

  function updateTopicFilters(topic) {
    let currentFilters = [...activeTopics];
    const topicIndex = currentFilters.indexOf(topic);
    if (topicIndex > -1) {
      currentFilters.splice(topicIndex, 1);
    } else {
      currentFilters.push(topic)
    }
    setActiveTopics(currentFilters)
  }

  const filterGoals = useCallback (
    (resetOffset = false) => {
      let currentGoals = [...goals];
      let notDisabled = []
      if(fulltext.length > 0) {
        currentGoals = currentGoals.filter((goal) => {
          let hasFulltext = false;
          const searchFields = [goal?.body?.value, goal.title];
          searchFields.forEach((field) => {
            if(field && field.toLowerCase().includes(fulltext.toLowerCase())) {
              hasFulltext = true
              if (goal.topics?.length) {
                goal.topics.forEach((topic) => {
                  if(!notDisabled.includes(topic.name)) {
                    notDisabled.push(topic.name)
                  }
                })
              }
            }
          })

          if(hasFulltext ) {
            
            return goal
          } else {
            return null
          }
        })
        
      }

      if (activeTopics.length > 0) {
        currentGoals = currentGoals.filter((goal) => {
          let hasActiveTopic = false
          if (!goal.topics) {
            return null;
          }
          goal.topics.forEach((topic) => {
            if(activeTopics.indexOf(topic.name) > -1) {
              hasActiveTopic = true
            }
          })
          if(hasActiveTopic) {
            return goal
          } else {
            return null
          }
        })
      }

      setNotDisabledTopics(notDisabled)
      setFilteredGoalsCount(currentGoals.length)
      
      if (resetOffset) {
        currentGoals = currentGoals.slice(0, offsetAmount);
        setOffset(offsetAmount)
      } else {
        currentGoals = currentGoals.slice(0, offset);
      }
      setFilteredGoals(currentGoals)
      setSearch(false)
    }, [activeTopics, fulltext, goals,offset]
  );

  useEffect(() => {
    if(search) {
      filterGoals(true)
    }
  }, [search, filterGoals])

  useEffect(() => {
    filterGoals(true)
  }, [activeTopics, filterGoals])

  useEffect(() => {
    filterGoals()
  }, [offset, filterGoals])

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
      {/* <ul className="add-list-reset grid-row flex-justify-center margin-bottom-205">
        {facets.length ? (
          facets.map((topic) => (
            <li
              className="margin-bottom-05"
              key={topic.replace( /\s/g, '')}
            >
              <ViewGoalSearchFacet
                topic={topic}
                notDisabledTopics={notDisabledTopics}
                activeTopics={activeTopics}
                updateTopicFilters={updateTopicFilters}
              />
            </li>
          ))
        ) : (
          <div className="usa-alert usa-alert--warning usa-alert--slim">
            <div className="usa-alert__body">
              <p className="usa-alert__text">
                No facets found.
              </p>
            </div>
          </div>
        )}
      </ul> */}
      <div className="grid-row">
        <div className={`side-bar ${filtersOpen ? "" : "filters-closed"}`}>
          <p>iajghjgojg</p>
        </div>
        <div className="content-area">
          {filteredGoals?.length ? (
          <ResponsiveMasonry
              columnsCountBreakPoints={masonryBP}
              gutterBreakpoints={{350: "12px", 750: "16px", 900: "24px"}}
          >
              <Masonry>
              {filteredGoals.map((goal) => (
                  <NodeGoalCard key={goal.id} goal={goal} />
                ))}
              </Masonry>
          </ResponsiveMasonry>
          
        ) : (
            <div className="usa-alert usa-alert--warning usa-alert--slim">
              <div className="usa-alert__body">
                <p className="usa-alert__text">
                  No matching goals.
                </p>
              </div>
            </div>
          )}

        <div className="grid-row flex-justify-center margin-bottom-205">
          {offset < filteredGoalsCount &&
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
