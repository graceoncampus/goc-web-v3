/* Amplify Params - DO NOT EDIT
	API_GOCBACKENDV3_GRAPHQLAPIENDPOINTOUTPUT
	API_GOCBACKENDV3_GRAPHQLAPIIDOUTPUT
	API_GOCBACKENDV3_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { deleteAllRides, addRides } = require("./graphql-calls");
const { getCarInputs } = require("./gsheets");
const { sendDriverEmail } = require("./send-email");

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

exports.handler = async (event) => {
  console.log(`RECEIVED EVENT: ${JSON.stringify(event)}`);
  const { url, date, emailMsg } = event;
  if (!url || !date) {
    return {
      statusCode: 400,
      body: JSON.stringify("Error: 'url' and 'date' are required fields"),
    };
  }

  const { statusCode, body } = await getCarInputs(url);
  if (statusCode === 500) return { statusCode, body, headers: cors };
  let res = await deleteAllRides();
  if (res.statusCode === 500) return { ...res, headers: cors };
  res = await addRides(body, date, emailMsg);
  if (res.statusCode === 500) return { ...res, headers: cors };
  const emailPromises = body
    .filter((car) => car.driver.send_email)
    .map(async (car) => {
      console.log("Sending email to", car.driver_name);
      return await sendDriverEmail(car, date, emailMsg);
    });

  // Wait for all emails to be sent
  await Promise.all(emailPromises).catch((err) =>
    console.error("Email sending failed:", err),
  );

  return {
    statusCode: 200,
    // Uncomment below to enable CORS requests
    headers: cors,
    body: JSON.stringify("success"),
  };
};
