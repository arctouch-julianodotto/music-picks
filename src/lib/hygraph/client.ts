import { GraphQLClient } from "graphql-request";

export function isHygraphConfigured(): boolean {
  return Boolean(process.env.HYGRAPH_ENDPOINT);
}

export function getHygraphClient(): GraphQLClient {
  const endpoint = process.env.HYGRAPH_ENDPOINT;

  if (!endpoint) {
    throw new Error("HYGRAPH_ENDPOINT is not configured.");
  }

  const token = process.env.HYGRAPH_TOKEN;
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new GraphQLClient(endpoint, { headers });
}
