// Remove these server-side imports from your client code
// import { JWT } from "google-auth-library";
// import { GoogleSpreadsheet } from "google-spreadsheet";

import { CreateCarInput, CreateRideInput, Ride } from "Api";
import { NavbarActiveKey } from "components/Navbar";
import { generateClient } from "aws-amplify/api";
import { createRide, deleteRide } from "graphql/mutations";
import { listRides } from "graphql/queries";
import { useEffect, useState } from "react";
import { BannerTemplate } from "layouts/BannerTemplate";
import { Box, Button, Container, Heading, Image, Text, VStack } from "@chakra-ui/react";
import GOCButton from "components/GOCButton";
import { MdHeight } from "react-icons/md";

const client = generateClient();

/**
 * New client-side function to call your backend API.
 * This function sends the spreadsheet URL, date, and email message
 * to an endpoint that performs the rides update logic.
 */
const updateRidesClient = async (url: string, date: string, emailMsg: string) => {
  try {
    const response = await fetch("/api/updateRides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, date, emailMsg }),
    });
    const result = await response.json();
    if (result.success) {
      window.location.reload();
    } else {
      console.error("Update rides failed:", result.message);
    }
  } catch (error) {
    console.error("Error updating rides:", error);
  }
};

// ------------------------------
// The rest of your client code remains unchanged
// ------------------------------

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
          console.error(reason);
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

interface RidesProps {
  rides?: Ride;
}

const RidesLandingBody = ({ rides }: RidesProps) => {
  return (
    <div>
      <RidesList rides={rides} />
      {/* todo: rides settings only visible to rides team */}
      <RidesSettings />
    </div>
  );
};

const RidesList = ({ rides }: RidesProps) => {
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
          await updateRidesClient(url, date, emailMsg);
        }}
      >
        <label>Spreadsheet URL</label>
        <br />
        <input
          type="url"
          required
          className={"rides-input"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <label>Rides Date</label>
        <br />
        <input
          type="date"
          required
          className={"rides-input"}
          value={date || ""}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <label>Custom Email Message</label>
        <br />
        <input
          type="text"
          required
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
