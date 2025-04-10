const GRAPHQL_ENDPOINT = process.env.API_GOCBACKENDV3_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_ID_API_OUTPUT = process.env.API_GOCBACKENDV3_GRAPHQLAPIIDOUTPUT;
const GRAPHQL_API_KEY = process.env.API_GOCBACKENDV3_GRAPHQLAPIKEYOUTPUT;

const fetchGraphQL = async (query, variables = {}) => {
  /** @type {import('node-fetch').RequestInit} */
  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);

  try {
    const response = await fetch(request);
    const body = await response.json();
    if (body.errors) {
      console.error("GraphQL Errors:", body.errors);
      return { errors: body.errors };
    }
    return body.data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return { errors: [error] };
  }
};

const executeMutation = async (mutation, variables, driverName, action) => {
  const result = await fetchGraphQL(mutation, variables);
  if (result.errors) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error ${action} ride with driver ${driverName}`,
        errors: result.errors,
      }),
    };
  } else {
    console.log(
      `${action.charAt(0).toUpperCase() + action.slice(1)} ride with driver ${driverName}`,
    );
  }
  return { statusCode: 200 };
};

module.exports = {
  fetchGraphQL,
  executeMutation,
};
