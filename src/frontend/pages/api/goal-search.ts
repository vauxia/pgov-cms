import type { NextApiRequest, NextApiResponse } from 'next'
import { drupal } from "lib/drupal";
import { graphqlQueries } from "lib/graphqlQueries";

type ResponseData = {
  message: string;
  data: any;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const graphqlUrl = drupal.buildUrl("/graphql");
  const fulltext = req.query.fulltext ? req.query.fulltext : "";
  const facets = req.query.facets ? req.query.facets : [];
  const response = await drupal.fetch(graphqlUrl.toString(), {
    method: "POST",
    withAuth: true, // Make authenticated requests using OAuth.
    body: JSON.stringify({
      query: graphqlQueries.goalsView(fulltext, facets),
    }),
  });
  const { data } = await response.json();
  res.status(200).json({ message: 'Hello from Next.js!', data: data })
}
