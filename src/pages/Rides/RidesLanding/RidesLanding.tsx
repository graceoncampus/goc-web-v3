import { CreateCarInput, CreateRideInput, Ride } from "Api";
import { NavbarActiveKey } from "components/Navbar";
import { generateClient } from "aws-amplify/api";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet"; // modify gaxios.js in node_modules line 270: new url_1.URL(url) --> new URL(url)
import { createRide, deleteRide } from "graphql/mutations";
import { listRides } from "graphql/queries";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BannerTemplate } from "layouts/BannerTemplate";
import { Box, Container, Heading, Image, Text, VStack } from "@chakra-ui/react";
import GOCButton from "components/GOCButton";
import { MdHeight } from "react-icons/md";

const client = generateClient();

const updateRides = async (url: string, date: string, emailMsg: string) => {
  const serviceAccountAuth = new JWT({
    email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const re1 = /https:\/\/docs\.google\.com\/spreadsheets\/d\//g;
  const re2 = /\/.*/g;
  // sample spreadsheet: https://docs.google.com/spreadsheets/d/1kqrgaXIAReEDvZo9d1SM5xBcS23wea2xuM91LZmZdu0/edit#gid=656402499
  const sheetID = url.replace(re1, "").replace(re2, "");
  const ridesSheetDoc = await new GoogleSpreadsheet(
    sheetID,
    serviceAccountAuth,
  );

  const carInputs: CreateCarInput[] = [];

  try {
    // delete Old Rides
    const oldRides = await (
      client.graphql({ query: listRides }) as Promise<any>
    )
      .then((result) => {
        return result.data.listRides.items;
      })
      .catch((reason) => {
        console.error(reason); // Log failure to the client - this will help us trace issues.
      });

    console.log(oldRides);
    for (const oldRide of oldRides) {
      await (
        client.graphql({
          query: deleteRide,
          variables: { input: { id: oldRide.id } },
        }) as Promise<any>
      )
        .then((result) => {
          console.log(result);
        })
        .catch((reason) => {
          console.error(reason);
        });
    }

    await ridesSheetDoc.loadInfo();
    const ridesSheet = ridesSheetDoc.sheetsByIndex[0];

    const rows = await ridesSheet.getRows();
    for (const row of rows) {
      if (row.get("driver_name") && row.get("rider_name")) {
        const car = carInputs.find(
          (c) => c.driver_name === row.get("driver_name"),
        );
        if (car) {
          car.riders?.push({
            uid: row.get("rider_uid"),
            name: row.get("rider_name"),
            email: row.get("rider_email"),
            phone: row.get("rider_phone"),
            pickup_location: row.get("rider_pickup_location"),
            morning: row.get("rider_morning"),
            staying: row.get("rider_staying"),
            evening: row.get("rider_evening"),
            comment: row.get("rider_comment"),
          });
        } else {
          // car doesn't exist, create car
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
            riders: [
              {
                uid: row.get("rider_uid"),
                name: row.get("rider_name"),
                email: row.get("rider_email"),
                phone: row.get("rider_phone"),
                pickup_location: row.get("rider_pickup_location"),
                morning: row.get("rider_morning"),
                staying: row.get("rider_staying"),
                evening: row.get("rider_evening"),
                comment: row.get("rider_comment"),
              },
            ],
          });
        }
      }
    }

    const rides: CreateRideInput = {
      cars: carInputs,
      emailMessage: emailMsg,
      date,
    };

    await (
      client.graphql({
        query: createRide,
        variables: {
          input: rides,
        },
      }) as Promise<any>
    )
      .then((result) => {
        console.log(result);
      })
      .catch((reason) => {
        console.error(reason); // Log failure to the client - this will help us trace issues.
      });
    // success
    window.location.reload();
  } catch (e) {
    console.log(e);
  }
};

export const RidesLandingPage = () => {
  const [ride, setRide] = useState<Ride>();
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchRides = async () => {
      await (client.graphql({ query: listRides }) as Promise<any>)
        .then((result) => {
          setRide(result.data.listRides.items[0]); // assuming only one "rides" in db
        })
        .catch((reason) => {
          console.error(reason); // Log failure to the client - this will help us trace issues.
        });
      setLoading(false);
    };
    fetchRides();
  }, []);

  console.log("ride:", ride);
  return (
    <BannerTemplate
      title="Rides"
      activeKey={NavbarActiveKey.RIDES}
      imageSrc="/images/rides2.png"
      alt="Rides page banner"
    >
      <RidesLandingBody rides={ride} />
    </BannerTemplate>
  );
};

const RidesList = ({ rides }: RideProps) => {
  return (
    <Container fluid={true}>
      <Box
        position={"relative"}
        width={"100%"}
        paddingX={"1rem"}
        paddingY={"6rem"}
        borderRadius={"2rem"}
        marginBottom={"3rem"}
      >
        <Image
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          src="/images/rides.jpg"
          alt="Rides card background"
          objectFit="cover"
          objectPosition="center"
          userSelect="none"
          borderRadius={"2rem"}
          zIndex={"-2"}
        />
        {/* Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="black"
          opacity="0.4"
          borderRadius={"2rem"}
          zIndex={"-1"}
        />
        <VStack gap={0} color={"white"} textAlign={"center"}>
          <Heading as={"h2"} fontSize={{ sm: "2xl", md: "3xl" }}>
            Need a ride?
          </Heading>
          <Text
            fontSize={{ sm: "lg", md: "xl" }}
            textAlign={"center"}
            marginBottom={"1.5rem"}
          >
            We've got you covered!
          </Text>
          <GOCButton
            href="/rides/rider/signup"
            buttonProps={{ width: "10rem", height: "3rem" }}
          >
            I need a ride
          </GOCButton>
          <GOCButton
            href="/rides/driver/signup"
            buttonProps={{ width: "10rem", height: "3rem" }}
          >
            I can drive
          </GOCButton>
        </VStack>
      </Box>
      <div className="rides-container">
        <div className="table-header">
          <div className="column-item">Driver</div>
          <div className="column-item">Rider(s)</div>
        </div>

        {rides?.cars?.map((car, i) => {
          return (
            <div
              key={i}
              className={i % 2 === 0 ? "table-row" : "even table-row"}
            >
              <div className="column-item">{car?.driver_name} </div>
              <div className="column-item">
                {car?.riders.map((rider, i) => {
                  return <span key={i}>{rider?.name}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

const RidesSettings = () => {
  const [url, setUrl] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [emailMsg, setEmailMsg] = useState<string>("");

  return (
    <div className="admin">
      <h1>Admin Settings</h1>
      <form
        className={"admin-form"}
        onSubmit={async (e) => {
          e.preventDefault();
          await updateRides(url, date, emailMsg);
        }}
      >
        <label>Spreadsheet URL</label>
        <br />
        <input
          type="url"
          required={true}
          className={"rides-input"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <label>Rides Date</label>
        <br />
        <input
          type="date"
          required={true}
          className={"rides-input"}
          value={date || ""}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <label>Custom Email Message</label>
        <br />
        <input
          type="text"
          required={true}
          className={"rides-input"}
          value={emailMsg}
          onChange={(e) => setEmailMsg(e.target.value)}
        />
        <br />
        <Button className={"upload-rides-button"} type="submit">
          Upload Rides
        </Button>
      </form>
    </div>
  );
};
interface RideProps {
  rides?: Ride;
}

const RidesLandingBody = ({ rides }: RideProps) => {
  return (
    <div>
      <RidesList rides={rides} />
      {/* todo: rides settings only visible to rides team */}
      <RidesSettings />
    </div>
  );
};
