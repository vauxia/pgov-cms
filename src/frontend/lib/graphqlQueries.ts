export const graphqlQueries = {
  nodeGoal: (path: string) =>
    `query NodeGoalQuery {
      route(path: "${path}") {
        ... on RouteInternal {
          entity {
            __typename
            ... on NodeGoal {
              image {
                ... on MediaImage {
                  id
                  name
                  mediaImage {
                    alt
                    title
                    variations(styles: THIRD1X1) {
                      url
                    }
                  }
                }
              }
              objectives {
                ... on NodeObjective {
                  id
                  title
                  indicators {
                    ... on StorageIndicator {
                      id
                      name
                      progress
                      dates
                      target
                      targetValues
                      names
                      values
                      notes {
                        processed
                      }
                      measurements {
                        ... on StorageMeasurement {
                          id
                          name
                          targetValue
                          value
                          status

                        }
                      }
                    }
                  }
                }
              }
              plan {
                ... on NodePlan {
                  id
                  administration {
                    ... on StorageAdministration {
                      id
                      name
                      dateRange {
                        end {
                          time
                        }
                        start {
                          time
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
  nodePlan: (path: string) =>
    `query NodePlanQuery {
      route(path: "${path}") {
        ... on RouteInternal {
          entity {
            __typename
            ... on NodePlan {
              administration {
                ... on StorageAdministration {
                  id
                  name
                  dateRange {
                    end {
                      time
                    }
                    start {
                      time
                    }
                  }
                }
              }
              goals {
                ... on NodeGoal {
                  id
                  objectives {
                    ... on NodeObjective {
                      id
                      indicators {
                        ... on StorageIndicator {
                          id
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
  planNodeByAgency: (id: number) =>
    `query StrategicPlansByAgency {
   strategicPlansByAgencyGraphql1(filter: {field_agency_target_id: ${id}}) {
     pageInfo {
       total
     }
     results {
       ... on NodePlan {
         id
         title
         link {
           url
         }
         goals {
           ... on NodeGoal {
             id
             title
             goalType
             path
           }
         }
       }
     }
   }
 }`,
  goalsView: (fulltext: string | string[], facets: string | string[]) =>
    `query GoalsQuery {
      goalsGraphql1(filter: {
        aggregated_field: "${fulltext}",
        Topics: ${JSON.stringify(facets)},
      }) {
        pageInfo {
          total
        }
        filters {
          options
          value
        }
        description
    results {
      ... on NodeGoal {
        id
        title
        path
        goalType
        topics {
          ... on TermTopic {
            id
            name
          }
        }
        plan {
          ... on NodePlan {
            id
            agency {
              ... on NodeAgency {
                id
                acronym
                logo {
                  ... on MediaImage {
                    id
                    name
                    mediaImage {
                      url
                    }
                  }
                }
                title
              }
            }
          }
        }
        period {
          ... on StoragePeriod {
            id
            name
          }
        }
      }
      ... on NodePlan {
        title
        path
        agency {
          ... on NodeAgency {
            id
            acronym
            logo {
              ... on MediaImage {
                id
                name
                mediaImage {
                  url
                }
              }
            }
            title
          }
        }
        period {
          ... on StoragePeriod {
            id
            name
          }
        }
      }
    }
      }
    }`,
};
