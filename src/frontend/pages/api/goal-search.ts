import type { NextApiRequest, NextApiResponse } from "next";
import { drupal } from "lib/drupal";
import { graphqlQueries } from "lib/graphqlQueries";

type ResponseData = {
  message: string;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  let facetsList;
  const graphqlUrl = drupal.buildUrl("/graphql");
  const fulltext = req.query.fulltext ? req.query.fulltext : "";
  const facets = req.query.facets ? req.query.facets : [];

  if (typeof facets === "string") {
    facetsList = facets.split(",");
  } else {
    facetsList = facets;
  }

  const administration = req.query.administration
    ? req.query.administration
    : "53";
  const response = await drupal.fetch(graphqlUrl.toString(), {
    method: "POST",
    withAuth: true, // Make authenticated requests using OAuth.
    body: JSON.stringify({
      query: graphqlQueries.goalsView(fulltext, facetsList, administration),
    }),
  });
  const { data } = await response.json();
  res.status(200).json({ message: "Hello from Next.js!", data: data });
}
