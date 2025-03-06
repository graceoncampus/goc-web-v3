import { Ride, Car, Rider } from "Api";
import { toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import { NavbarActiveKey } from "components/Navbar";
import { post } from "aws-amplify/api";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState, useCallback } from "react";
import { BannerTemplate } from "layouts/BannerTemplate";
import RiderSignup from "components/RiderSignup/RiderSignup";
import DriverSignup from "components/DriverSignup/DriverSignup";
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
    const body = {
      url: url,
      date: date,
      emailMsg: emailMsg || "", // Optional field
    };

    const restOperation = post({
      apiName: "updateRides",
      path: "/",
      options: {
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    const response = await restOperation.response;
    const res = await response.body.json();
    if (
      res &&
      typeof res === "object" &&
      "statusCode" in res &&
      res.statusCode !== 200
    ) {
      const error = res.body;
      console.log(error);
      toaster.create({
        title: "Spreadsheet error: " + String(error),
        type: "error",
      });
      return false;
    } else {
      console.log("Successfully uploaded rides");
      toaster.create({
        title: "Success",
        type: "success",
      });
      return true;
    }
  } catch (e: any) {
    toaster.create({
      title:
        "Failed to update rides. Failed to call lambda function. Please contact the developers",
      type: "error",
    });
    console.log("POST call failed: ", JSON.parse(e.response.body));
    return false;
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

  const fetchRides = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <BannerTemplate
      title="Rides"
      activeKey={NavbarActiveKey.RIDES}
      imageSrc="/images/rides2.png"
      alt="Rides page banner"
    >
      <RidesLandingBody
        rides={rides}
        fetchRides={fetchRides}
        loading={loading}
      />
    </BannerTemplate>
  );
};

interface RidesProps {
  rides: Ride[];
  loading: boolean;
  fetchRides: () => void;
}

const RidesLandingBody = ({ rides, fetchRides, loading }: RidesProps) => {
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
          fetchRides={fetchRides}
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
        <RidesList rides={rides} fetchRides={fetchRides} loading={loading} />
      </Box>
    </Flex>
  );
};

interface RidesMenuSidebarProps {
  toggleRider: () => void;
  toggleDriver: () => void;
  isRiderOpen: boolean;
  isDriverOpen: boolean;
  fetchRides: () => void;
}

const RidesMenuSidebar = ({
  toggleRider,
  toggleDriver,
  isRiderOpen,
  isDriverOpen,
  fetchRides,
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
        <RidesSettings fetchRides={fetchRides} />
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

interface RidesSettingsProps {
  fetchRides: () => void;
}

interface FormData {
  url: string;
  date: string;
  emailMsg?: string;
}

const RidesSettings = ({ fetchRides }: RidesSettingsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      url: "",
      date: "",
      emailMsg: "",
    },
  });

  const [uploadingRides, setUploadingRides] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    const { url, date, emailMsg } = data;
    setUploadingRides(true);
    const status = await updateRidesClient(url, date, emailMsg);
    setUploadingRides(false);
    if (status) fetchRides();
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
            loadingText="Uploading"
            loading={uploadingRides}
          >
            Upload Rides
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
