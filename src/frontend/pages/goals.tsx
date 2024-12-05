import { useState } from 'react';
import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";
import { Tag } from '@trussworks/react-uswds';
import { drupal } from "lib/drupal";
import { Layout } from "components/layout";
import { NodeArticleTeaser } from "components/node--article--teaser";
import GoalsSearchView from "../components/view--goal-search";

interface IndexPageProps {
  nodes: DrupalNode[];
  goals: []
}


//   goalsGraphql1(filter: {Topics: "Domestic health"}) {

//   }

export const getStaticProps = async () => {
  const graphqlUrl = drupal.buildUrl("/graphql");
  console.log('iogjigj')
//   // Fetch the first 50 agencies
  const response = await drupal.fetch(graphqlUrl.toString(), {
    method: "POST",
    withAuth: true, // Make authenticated requests using OAuth.
    body: JSON.stringify({
      query: `query GoalsQuery {
        goalsGraphql1(filter: {}) {
          results {
            ... on NodeGoal {
              id
              title
              body {
                value
              }
              path
            }
          }
          filters {
            value
            options
          }
        }
    }`,
      }),
  });

  const { data } = await response.json();
  
  return {
    props: {
      goals: data?.goalsGraphql1?.results ?? [],
      filters: data?.goalsGraphql1?.filters ?? [],
    },
  };
};

function truncateString(yourString, maxLength) {
  // get the index of space after maxLength
  const index = yourString.indexOf(" ", maxLength);
  return index === -1 ? yourString : yourString.substring(0, index) + "..."
}

export default function GoalsPage({ filters, goals }: IndexPageProps) {
  
  const [fulltext, setFulltext] = useState(filters[0].value)
  const [facets, setFacets] = useState(filters[1].options)

  
  return (
    <Layout>
      <div className="grid-container">
        <h1 className="font-heading-3xl">Track the U.S. Government's goals</h1>
        <div role="search">
          <label className="usa-sr-only" htmlFor="query-goals">Search topics</label>
          <input id="query-goals" className="usa-input" name="query" type="search" />
          <button className="goal-search__button usa-button margin-top-0" type="button" name="commit">
            Search goals
          </button>
        </div>
        <ul className="add-list-reset grid-row flex-justify-center">
          {Object.keys(facets).length ? (
            Object.keys(facets).map((topic) => (
              <li
                className="margin-05 "
                key={topic.replace( /\s/g, '')}
              >
                <Tag className="text-ink border-ink border-2px" background="#ffffff">{topic}</Tag>
              </li>
            ))
          ) : (
            <p className="">No facets found</p>
          )}
        </ul>
        <ul className="usa-card-group">
          {goals?.length ? (
            goals.map((goal) => (
              <li
                key={goal.path}
                className="usa-card tablet-lg:grid-col-6 desktop:grid-col-4"
              >
                <div className="usa-card__container radius-0" >
                  <div className="usa-card__header">
                    <h4 className="usa-card__heading">{truncateString(goal.title, 30)}</h4>
                  </div>
                  <div className="usa-card__body">
                    <div dangerouslySetInnerHTML={{__html: truncateString(goal?.body?.value, 60)}} />
                  </div>
                  <div className="usa-card__footer">
                    <a href={goal.path} className="usa-button">
                      Explore goal
                    </a>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="">No agencies found</p>
          )}
        </ul>
      </div>
    </Layout>
  );
}
