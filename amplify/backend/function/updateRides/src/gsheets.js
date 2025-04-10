const { JWT } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const getCarInputs = async (url) => {
  const serviceAccountAuth = new JWT({
    email: process.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.VITE_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheetID = url
    .replace(/https:\/\/docs\.google\.com\/spreadsheets\/d\//, "")
    .replace(/\/.*/, "");

  const ridesSheetDoc = new GoogleSpreadsheet(sheetID, serviceAccountAuth);

  console.log("Loading info");
  try {
    await ridesSheetDoc.loadInfo();
    console.log("Info loaded");
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: "Issue loading spreadsheet. Check the spreadsheet link.",
    };
  }

  const ridesSheet = ridesSheetDoc.sheetsByIndex[0];
  const rows = await ridesSheet.getRows();
  const carInputs = [];

  for (const row of rows) {
    const driver = row.get("driver_name"),
      rider = row.get("rider_name"),
      pickup_location = row.get("rider_pickup_location");
    if (!driver && rider) {
      return {
        statusCode: 500,
        body: `Rider ${rider} has no driver.`,
      };
    }
    if (driver && rider) {
      let car = carInputs.find((c) => c.driver_name === row.get("driver_name"));
      if (
        rider.toLowerCase() !== "in progress" &&
        (!pickup_location || pickup_location.trim() === "")
      ) {
        console.log(rider.toLowerCase());
        return {
          statusCode: 500,
          body: `Rider pickup location does not exist for driver: ${row.get("driver_name")} and rider: ${row.get("rider_name")}`,
        };
      }

      const riderData = {
        uid: row.get("rider_uid"),
        name: row.get("rider_name"),
        email: row.get("rider_email"),
        phone: row.get("rider_phone"),
        pickup_location: row.get("rider_pickup_location"),
        morning: row.get("rider_morning"),
        staying: row.get("rider_staying"),
        evening: row.get("rider_evening"),
        comment: row.get("rider_comment"),
      };

      if (car) {
        car.riders.push(riderData);
      } else {
        carInputs.push({
          driver_name: row.get("driver_name"),
          driver: {
            uid: row.get("driver_uid"),
            name: row.get("driver_name"),
            email: row.get("driver_email"),
            phone: row.get("driver_phone"),
            seats: row.get("driver_seats"),
            comment: row.get("posted_comment"),
            morning: row.get("driver_morning"),
            staying: row.get("driver_staying"),
            evening: row.get("driver_evening"),
            send_email: row.get("send_email").toLowerCase() === "yes",
          },
          riders: [riderData],
        });
      }
    }
  }

  if (carInputs.length === 0) {
    return {
      statusCode: 500,
      body: "No spreadsheet data found. Please check spreadsheet.",
    };
  }

  return { statusCode: 200, body: carInputs };
};

module.exports = {
  getCarInputs,
};
