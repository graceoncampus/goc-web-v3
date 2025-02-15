// // backend/updateRides.js
// const { JWT } = require("google-auth-library");
// const { GoogleSpreadsheet } = require("google-spreadsheet");
// const { generateClient } = require("aws-amplify/api"); // or your AppSync/API client
// const { createRide, deleteRide } = require("graphql/mutations");
// const { listRides } = require("graphql/queries");

// exports.handler = async (event: any) => {
//   try {
//     // Parse the POST body. Expecting JSON with { url, date, emailMsg }
//     const { url, date, emailMsg } = JSON.parse(event.body);

//     // Initialize JWT auth for Google
//     const serviceAccountAuth = new JWT({
//       email: process.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL,
//       key: process.env.VITE_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });

//     // Extract the spreadsheet ID from the URL.
//     const sheetID = url.replace(/https:\/\/docs\.google\.com\/spreadsheets\/d\//, "").replace(/\/.*/, "");

//     // Create a new GoogleSpreadsheet instance.
//     const ridesSheetDoc = new GoogleSpreadsheet(sheetID, serviceAccountAuth);

//     // Create your API client if needed. (You might configure this elsewhere.)
//     const client = generateClient();

//     // 1. Delete old rides.
//     const listResult = await client.graphql({ query: listRides });
//     const oldRides = listResult.data.listRides.items;
//     for (const oldRide of oldRides) {
//       await client.graphql({
//         query: deleteRide,
//         variables: { input: { id: oldRide.id } },
//       });
//     }

//     // 2. Load the spreadsheet info and read rows.
//     await ridesSheetDoc.loadInfo();
//     const ridesSheet = ridesSheetDoc.sheetsByIndex[0];
//     const rows = await ridesSheet.getRows();

//     // 3. Build your input for creating new rides.
//     const carInputs = [];
//     for (const row of rows) {
//       if (row.get("driver_name") && row.get("rider_name")) {
//         let car = carInputs.find((c) => c.driver_name === row.get("driver_name"));
//         const riderData = {
//           uid: row.get("rider_uid"),
//           name: row.get("rider_name"),
//           email: row.get("rider_email"),
//           phone: row.get("rider_phone"),
//           pickup_location: row.get("rider_pickup_location"),
//           morning: row.get("rider_morning"),
//           staying: row.get("rider_staying"),
//           evening: row.get("rider_evening"),
//           comment: row.get("rider_comment"),
//         };

//         if (car) {
//           car.riders.push(riderData);
//         } else {
//           carInputs.push({
//             driver_name: row.get("driver_name"),
//             driver: {
//               uid: row.get("driver_uid"),
//               name: row.get("driver_name"),
//               email: row.get("driver_email"),
//               phone: row.get("driver_phone"),
//               seats: row.get("driver_seats"),
//               comment: row.get("posted_comment"),
//               morning: row.get("driver_morning"),
//               staying: row.get("driver_staying"),
//               evening: row.get("driver_evening"),
//               send_email: row.get("send_email").toLowerCase() === "yes",
//             },
//             riders: [riderData],
//           });
//         }
//       }
//     }

//     // 4. Create the new ride with the built data.
//     const ridesInput = {
//       cars: carInputs,
//       emailMessage: emailMsg,
//       date,
//     };

//     await client.graphql({
//       query: createRide,
//       variables: { input: ridesInput },
//     });

//     // Return a successful response.
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ success: true }),
//     };
//   } catch (e) {
//     console.error("Error updating rides:", e);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ success: false, message: e.message }),
//     };
//   }
// };


// // Inside your Lambda function, before processing:
// const token = event.headers.Authorization; // or from event.body
// if (token) {
//   // Use google-auth-library's OAuth2Client or JWT to verify the token.
//   // For example:
//   const { OAuth2Client } = require("google-auth-library");
//   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     // Token is verified. You can now use `payload` for further processing.
//   } catch (error) {
//     // Handle invalid token
//     return {
//       statusCode: 401,
//       body: JSON.stringify({ success: false, message: "Unauthorized" }),
//     };
//   }
// }
