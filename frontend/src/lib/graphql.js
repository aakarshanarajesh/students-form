const graphqlUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GRAPHQL_URL) || 'https://students-form-backend.onrender.com/graphql';

export async function sendGraphQL(query, variables = {}) {
  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    throw new Error(result.errors?.[0]?.message || 'GraphQL request failed.');
  }

  return result.data;
}
