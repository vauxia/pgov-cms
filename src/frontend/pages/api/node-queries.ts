export const nodeQueries = {
  nodeGoal: (path: string) => (
    `query NodeGoalQuery {
      route(path: "${path}") {
        ... on RouteInternal {
          entity {
            __typename
            ... on NodeGoal {
              objectives {
                ... on NodeObjective {
                  id
                  title
                  indicators {
                    ... on StorageIndicator {
                      id
                      name
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
                          period {
                            ... on StoragePeriod {
                              id
                              name
                              duration
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
            }
          }
        }
      }
    }`
  ),
}

export const strategicPlanQueries = {
  planNodeByAgency: (id: number) => (
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
}`
  ),
}
