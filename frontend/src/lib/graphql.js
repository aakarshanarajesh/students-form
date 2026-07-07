const defaultGraphqlUrl = 'http://localhost:4000/graphql';
const graphqlUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GRAPHQL_URL)
  || (typeof globalThis !== 'undefined' && globalThis.location?.origin
    ? `${globalThis.location.protocol}//${globalThis.location.hostname}:4000/graphql`
    : defaultGraphqlUrl);

export async function sendGraphQL(query, variables = {}) {
  try {
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      throw new Error(result.errors?.[0]?.message || `GraphQL request failed for ${graphqlUrl}.`);
    }

    return result.data;
  } catch (error) {
    throw new Error(error.message || `Network request failed for ${graphqlUrl}.`);
  }
}
