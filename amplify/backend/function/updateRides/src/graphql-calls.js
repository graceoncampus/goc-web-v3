const { executeMutation, fetchGraphQL } = require("./graphql-helpers");
const createRideMutation = `
    mutation CreateRide($input: CreateRideInput!) {
      createRide(input: $input) {
        id
      }
    }
  `;

const deleteRideMutation = `
    mutation DeleteRide($input: DeleteRideInput!) {
      deleteRide(input: $input) {
        id
      }
    }
  `;

const listAllRidesQuery = `
query MyQuery {
  listRides {
    items {
      id
      cars {
        driver {
          name
        }
      }
    }
  }
}
`;

const deleteAllRides = async () => {
  const existingRides = await fetchGraphQL(listAllRidesQuery);

  if (existingRides === null) {
    return {
      statusCode: 500,
      body: "Error: could not fetch rides",
    };
  }

  for (const ride of existingRides.listRides.items) {
    const variables = { input: { id: ride.id } };
    const res = await executeMutation(
      deleteRideMutation,
      variables,
      ride.cars[0].driver.name,
      "deleting",
    );
    if (res.statusCode === 500) return res;
  }
  return { statusCode: 200 };
};

const addRides = async (carInputs, date, emailMsg) => {
  for (const car of carInputs) {
    const variables = {
      input: {
        cars: [car],
        date,
        emailMessage: emailMsg,
      },
    };
    const res = await executeMutation(
      createRideMutation,
      variables,
      car.driver.name,
      "creating",
    );
    if (res.statusCode === 500) {
      await deleteAllRides();
      console.log(variables.input.cars);
      variables.input.cars.forEach((car) =>
        car.riders.forEach((rider) => console.log(rider)),
      );
      return res;
    }
  }
  return { statusCode: 200 };
};
module.exports = {
  deleteAllRides,
  addRides,
};
