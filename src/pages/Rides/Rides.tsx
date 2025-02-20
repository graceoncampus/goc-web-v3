// import { JWT } from "google-auth-library";
// import { GoogleSpreadsheet } from "google-spreadsheet";
// import { listRides } from "graphql/queries";
import { CreateCarInput, CreateRideInput, Ride, Car, Rider } from "Api";
import { createRide, deleteRide } from "graphql/mutations";
import { useForm } from "react-hook-form";
import { NavbarActiveKey } from "components/Navbar";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState, useCallback } from "react";
import { BannerTemplate } from "layouts/BannerTemplate";
import RiderSignup from "components/rider_signup/RiderSignup";
import DriverSignup from "components/driver_signup/DriverSignup";
import { checkIsLoggedIn } from "auth/CheckLogin";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Input,
  Text,
  VStack,
  Collapsible,
  Table,
  Spinner,
} from "@chakra-ui/react";
import { Field } from "components/ui/field";
import { FaCarSide } from "react-icons/fa";

const client = generateClient();

/**
 * New client-side function to call your backend API.
 * This function sends the spreadsheet URL, date, and email message
 * to an endpoint that performs the rides update logic.
 */
const updateRidesClient = async (
  url: string,
  date: string,
  emailMsg?: string,
) => {
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

// Custom listRides query (since the default one doesn't include the cars field)
export const listRides = /* GraphQL */ `
  query ListRides(
    $filter: TableRideFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRides(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        emailMessage
        cars {
          driver_id
          driver_name
          riders {
            name
            __typename
          }
          __typename
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const RidesLandingPage = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const result = (await client.graphql({
          query: listRides,
        })) as any;
        setRides(result.data.listRides.items);
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
      setLoading(false);
    };
    fetchRides();
  }, []);

  return (
    <BannerTemplate
      title="Rides"
      activeKey={NavbarActiveKey.RIDES}
      imageSrc="/images/rides2.png"
      alt="Rides page banner"
    >
      <RidesLandingBody rides={rides} loading={loading} />
    </BannerTemplate>
  );
};

interface RidesProps {
  rides: Ride[];
  loading: boolean;
}

const RidesLandingBody = ({ rides, loading }: RidesProps) => {
  const [riderOpen, setRiderOpen] = useState(false);
  const [driverOpen, setDriverOpen] = useState(false);

  const toggleRider = useCallback(() => setRiderOpen((prev) => !prev), []);
  const toggleDriver = useCallback(() => setDriverOpen((prev) => !prev), []);

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Box
        flex={3}
        marginRight={{ base: "0", md: "2rem" }}
        marginBottom={{ base: "2.5rem", md: "0" }}
      >
        <RidesMenuSidebar
          toggleRider={toggleRider}
          toggleDriver={toggleDriver}
          isRiderOpen={riderOpen}
          isDriverOpen={driverOpen}
        />
      </Box>
      <Box flex={7}>
        {/* Rider Signup Form */}
        <Collapsible.Root lazyMount unmountOnExit open={riderOpen}>
          <Collapsible.Content paddingBottom="2rem" marginBottom="2.5rem">
            <RiderSignup />
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Driver Signup Form */}
        <Collapsible.Root lazyMount unmountOnExit open={driverOpen}>
          <Collapsible.Content paddingBottom="2rem" marginBottom="2.5rem">
            <DriverSignup />
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Heading */}
        <Heading as="h2" display="inline-flex" gap="1rem">
          Check your rides for this week! <FaCarSide />
        </Heading>
        <Text marginBottom="1.5rem" marginRight={{ base: "0", md: "3rem" }}>
          As a ministry of Grace Community Church, we provide rides to and from
          our church every Sunday.
        </Text>

        {/* Rides List */}
        <RidesList rides={rides} loading={loading} />
      </Box>
    </Flex>
  );
};

interface RidesMenuSidebarProps {
  toggleRider: () => void;
  toggleDriver: () => void;
  isRiderOpen: boolean;
  isDriverOpen: boolean;
}

const RidesMenuSidebar = ({
  toggleRider,
  toggleDriver,
  isRiderOpen,
  isDriverOpen,
}: RidesMenuSidebarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await checkIsLoggedIn(setIsLoggedIn);
    };
    checkAuth();
  }, []);

  return (
    <Box
      position={{ base: "block", md: "sticky" }}
      top={{ base: "0", md: "6rem" }}
      width="100%"
      zIndex="5"
      paddingX="1.5rem"
      paddingY="1.8rem"
      backgroundColor="goc.blue"
      borderRadius="1rem"
      boxShadow="md"
    >
      {isLoggedIn ? (
        <RidesSettings />
      ) : (
        <VStack gap={0} textAlign="center" color="white" marginBottom="1rem">
          <Heading
            as="h2"
            fontSize={{ base: "xl", xl: "2xl" }}
            marginBottom={{ base: 0, xl: ".5rem" }}
          >
            Need a ride?
          </Heading>
          <Text fontSize={{ base: "sm", xl: "lg" }} textWrap="nowrap">
            We've got you covered!
          </Text>

          {/* Ride Signup Button */}
          <Button
            width="10rem"
            height="3rem"
            variant="solid"
            outline="none"
            color="black"
            fontSize=".875rem"
            fontWeight="semibold"
            boxShadow="none"
            border="none"
            marginTop="1.5rem"
            borderRadius=".8rem"
            backgroundColor={isRiderOpen ? "goc.pale_orange" : "goc.pale_blue"}
            _hover={{ transform: "scale(0.99)" }}
            onClick={toggleRider}
          >
            I need a ride
          </Button>

          {/* Driver Signup Button */}
          <Button
            width="10rem"
            height="3rem"
            variant="solid"
            outline="none"
            color="black"
            fontSize=".875rem"
            fontWeight="semibold"
            boxShadow="none"
            border="none"
            marginTop="1.5rem"
            borderRadius=".8rem"
            backgroundColor={isDriverOpen ? "goc.pale_orange" : "goc.pale_blue"}
            _hover={{ transform: "scale(0.99)" }}
            onClick={toggleDriver}
          >
            I can drive
          </Button>
        </VStack>
      )}

      {!isLoggedIn && (
        <Text
          fontSize={{ base: "2xs", xl: "sm" }}
          textAlign="center"
          color="white"
          marginTop="1.5rem"
          textWrap="nowrap"
        >
          <Link href="/login" color="white" fontWeight="bold">
            Login
          </Link>{" "}
          to access admin settings
        </Text>
      )}
    </Box>
  );
};

const RidesList = ({ rides, loading }: RidesProps) => {
  if (loading)
    return (
      <VStack marginTop="3rem">
        <Spinner color="goc.blue" animationDuration="0.8s" borderWidth="3px" />
        <Text color="goc.blue">Loading...</Text>
      </VStack>
    );

  return (
    <Table.Root size="sm" variant="outline" striped stickyHeader>
      <Table.Header backgroundColor={"goc.blue"}>
        <Table.Row>
          <Table.ColumnHeader color={"white"} padding={".75rem"}>
            <Text fontSize={"sm"}>Driver</Text>
          </Table.ColumnHeader>
          <Table.ColumnHeader color={"white"}>
            <Text fontSize={"sm"}>Rider(s)</Text>
          </Table.ColumnHeader>
          <Table.ColumnHeader color={"white"}>
            <Text fontSize={"sm"}>Comments</Text>
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* For each Ride, iterate over its cars */}
        {rides.map((ride: Ride, rideIndex: number) =>
          ride.cars?.map((car: Car | null, carIndex: number) => {
            if (!car) return null;
            return (
              <Table.Row key={`${rideIndex}-${carIndex}`}>
                <Table.Cell verticalAlign={"top"} paddingY={"1rem"}>
                  <Text fontSize={"sm"}>{car.driver_name}</Text>
                </Table.Cell>
                <Table.Cell verticalAlign={"top"} paddingY={"1rem"}>
                  {car.riders && car.riders.length > 0 ? (
                    <VStack align="start" gap={0}>
                      {car.riders.map(
                        (rider: Rider | null, riderIndex: number) =>
                          rider ? (
                            <Text key={riderIndex} fontSize="sm">
                              {rider.name} {rider.staying ? "(staying)" : ""}
                            </Text>
                          ) : null,
                      )}
                    </VStack>
                  ) : (
                    "No riders"
                  )}
                </Table.Cell>
                <Table.Cell verticalAlign={"top"} paddingY={"1rem"}>
                  <Text fontSize="sm">
                    {car.driver?.comment || "No comments"}
                  </Text>
                </Table.Cell>
              </Table.Row>
            );
          }),
        )}
      </Table.Body>
    </Table.Root>
  );
};

const RidesSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: "",
      date: "",
      emailMsg: "",
    },
  });

  const onSubmit = async (data: any) => {
    const { url, date, emailMsg } = data;
    await updateRidesClient(url, date, emailMsg);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h2" textAlign="center" color="white">
        Admin Settings
      </Heading>

      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        padding="1.5rem"
        border="1px solid #ccc"
        borderRadius="8px"
        backgroundColor="white"
        boxShadow="lg"
        width="100%"
      >
        <VStack gap="1rem">
          {/* Spreadsheet URL */}
          <Field label="Spreadsheet URL" invalid={!!errors.url} required>
            <Input
              type="url"
              {...register("url", { required: "URL is required" })}
            />
          </Field>

          {/* Rides Date */}
          <Field label="Rides Date" invalid={!!errors.date} required>
            <Input
              type="date"
              {...register("date", { required: "Date is required" })}
            />
          </Field>

          {/* Custom Email Message (Optional) */}
          <Field label="Comments" invalid={!!errors.emailMsg}>
            <Input type="text" {...register("emailMsg")} />
          </Field>
          <Button
            color="white"
            backgroundColor="black"
            type="submit"
            width="full"
            fontWeight="bold"
            marginTop="1rem"
          >
            Upload Rides
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
