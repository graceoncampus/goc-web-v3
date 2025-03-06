// import { JWT } from "google-auth-library";
// import { GoogleSpreadsheet } from "google-spreadsheet";
// import { listRides } from "graphql/queries";
import { CreateCarInput, CreateRideInput, Ride, Car, Rider } from "Api";
import { createRide, deleteRide } from "graphql/mutations";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { generateClient } from "aws-amplify/api";
import { NavbarActiveKey } from "@/components/Navbar";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import RiderSignup from "@/components/RiderSignup/RiderSignup";
import DriverSignup from "@/components/DriverSignup/DriverSignup";
import { checkIsLoggedIn } from "@/auth/CheckLogin";
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
  Container,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { FaArrowTurnDown } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";
import GOCButton from "@/components/GOCButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { RIDES_GOOGLE_FORM_LINK } from "@/constants/Links";
import GOCSpinner from "@/components/GOCSpinner";

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
      <ScrollToTopButton />
      <RidesLandingBody rides={rides} loading={loading} />
    </BannerTemplate>
  );
};

interface RidesProps {
  rides: Ride[];
  loading: boolean;
}

const RidesLandingBody = ({ rides, loading }: RidesProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [riderOpen, setRiderOpen] = useState(false);
  const [driverOpen, setDriverOpen] = useState(false);

  const toggleRider = useCallback(() => setRiderOpen((prev) => !prev), []);
  const toggleDriver = useCallback(() => setDriverOpen((prev) => !prev), []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const checkAuth = async () => {
      await checkIsLoggedIn(setIsLoggedIn);
    };
    checkAuth();

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <Container fluid maxWidth={"90rem"} padding={0}>
      <Flex direction={{ base: "column", lg: "row" }}>
        <Box
          flex={3}
          maxWidth={"25rem"}
          display={{ base: "none", lg: "block" }}
          marginRight={{ base: "0", lg: "2rem" }}
          marginBottom={{ base: "2.5rem", lg: "0" }}
        >
          <RidesMenuSidebar
            toggleRider={toggleRider}
            toggleDriver={toggleDriver}
            isRiderOpen={riderOpen}
            isDriverOpen={driverOpen}
            isLoggedIn={isLoggedIn}
          />
        </Box>
        <Box flex={7}>
          {/* Rider Signup Form */}
          <Collapsible.Root lazyMount unmountOnExit open={riderOpen}>
            <Collapsible.Content
              id="rider-signup"
              scrollMarginTop="6rem"
              paddingBottom="2rem"
              marginBottom="2.5rem"
            >
              <RiderSignup />
            </Collapsible.Content>
          </Collapsible.Root>

          {/* Driver Signup Form */}
          <Collapsible.Root lazyMount unmountOnExit open={driverOpen}>
            <Collapsible.Content
              id="driver-signup"
              scrollMarginTop="6rem"
              paddingBottom="2rem"
              marginBottom="2.5rem"
            >
              <DriverSignup />
            </Collapsible.Content>
          </Collapsible.Root>

          {/* Heading */}
          <Flex direction="column" width="100%" alignItems={"center"}>
            <Heading
              as="h2"
              fontSize={"3xl"}
              lineHeight={{ base: "1.5", lg: "3rem", xl: "4rem" }}
              textAlign={{ base: "center", lg: "left" }}
              textWrap="balance"
            >
              Check your rides for this{" "}
              <span
                style={{
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                week!{" "}
                <FaCarSide
                  style={{ marginLeft: "0.5rem", verticalAlign: "middle" }}
                />
              </span>
            </Heading>
            <Text
              display={{ base: "none", md: "block" }}
              fontSize={{ base: "sm", lg: "md", xl: "lg" }}
              textAlign={"center"}
              textWrap={"balance"}
            >
              As a ministry of Grace Community Church, we provide rides to and
              from our church every Sunday.
            </Text>

            {/* Google Form Signup Button */}
            <GOCButton
              href={RIDES_GOOGLE_FORM_LINK}
              buttonProps={{
                display: { lg: "none" },
                marginTop: "1rem",
                width: "8rem",
              }}
            >
              Sign up
            </GOCButton>
            {/* Rides List */}
            <Box
              marginTop={"3rem"}
              width={"100%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <RidesList rides={rides} loading={loading} />
            </Box>
          </Flex>

          {/* Admin Settings */}
          {isLoggedIn && (
            <Box marginTop={"3rem"}>
              <RidesSettings />
            </Box>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

interface SignUpButtonProps {
  children: React.ReactNode;
  isRiderOpen?: boolean;
  onClick?: () => void;
}

const SignUpButton = ({
  children,
  isRiderOpen,
  onClick,
}: SignUpButtonProps) => {
  return onClick ? (
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
      _hover={{
        transform: "scale(0.99)",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  ) : (
    <Button
      asChild
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
      backgroundColor="goc.pale_blue"
      _hover={{
        transform: "scale(0.99)",
      }}
    >
      {children}
    </Button>
  );
};

interface RidesMenuSidebarProps {
  toggleRider: () => void;
  toggleDriver: () => void;
  isRiderOpen: boolean;
  isDriverOpen: boolean;
  isLoggedIn: boolean;
}

const RidesMenuSidebar = ({
  toggleRider,
  toggleDriver,
  isRiderOpen,
  isDriverOpen,
  isLoggedIn,
}: RidesMenuSidebarProps) => {
  return (
    <Box
      position={{ base: "block", lg: "sticky" }}
      top={{ base: "0", lg: "6rem" }}
      width="100%"
      zIndex="5"
      paddingX="1.5rem"
      paddingY="1.8rem"
      backgroundColor="goc.blue"
      borderRadius={{ base: "0", lg: "1rem" }}
      boxShadow="md"
    >
      <VStack gap={0} textAlign="center" color="white" marginBottom="1rem">
        <Heading
          as="h2"
          fontSize={{ base: "xl", lg: "2xl" }}
          marginBottom={{ base: 0, lg: ".5rem" }}
        >
          Need a ride?
        </Heading>
        <Text fontSize={{ base: "sm", xl: "lg" }} textWrap="nowrap">
          We've got you covered!
        </Text>

        {/* Google Form Signup Button */}
        <SignUpButton>
          <Link href={RIDES_GOOGLE_FORM_LINK} target="_blank">
            Sign up
          </Link>
        </SignUpButton>

        {/* Ride Signup Button */}
        {/* <SignUpButton isRiderOpen={isRiderOpen} onClick={toggleRider}>
          I need a ride
        </SignUpButton> */}

        {/* Driver Signup Button */}
        {/* <SignUpButton isRiderOpen={isDriverOpen} onClick={toggleDriver}>
          I can drive
        </SignUpButton> */}
      </VStack>
      {isLoggedIn ? (
        <Text
          fontSize={{ base: "xs", lg: "sm" }}
          textAlign="center"
          color="white"
          marginTop="1.5rem"
          textWrap="nowrap"
        >
          <Link href="#admin-settings" color="white" fontWeight="semibold">
            Admin Settings <FaArrowTurnDown />
          </Link>
        </Text>
      ) : (
        <Text
          fontSize={{ base: "2xs", xl: "sm" }}
          textAlign="center"
          color="white"
          marginTop="1.5rem"
          textWrap="nowrap"
        >
          <Link href="/login" color="white" fontWeight="semibold">
            Login
          </Link>{" "}
          to access admin settings
        </Text>
      )}
    </Box>
  );
};

const RidesList = ({ rides, loading }: RidesProps) => {
  if (loading) return <GOCSpinner />;

  return (
    <Table.Root
      size="sm"
      maxWidth={"60rem"}
      variant="outline"
      striped
      stickyHeader
    >
      <Table.Header backgroundColor={"goc.blue"}>
        <Table.Row>
          <Table.ColumnHeader
            color={"white"}
            padding={{ base: ".5rem", md: ".75rem" }}
          >
            <Text fontSize={{ base: "sm", xl: "md" }}>Driver</Text>
          </Table.ColumnHeader>
          <Table.ColumnHeader color={"white"} paddingX={0}>
            <Text fontSize={{ base: "sm", xl: "md" }}>Rider(s)</Text>
          </Table.ColumnHeader>
          <Table.ColumnHeader
            color={"white"}
            display={{ base: "none", md: "table-cell" }}
          >
            <Text fontSize={{ base: "sm", xl: "md" }}>Comments</Text>
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rides.map((ride: Ride, rideIndex: number) =>
          ride.cars?.map((car: Car | null, carIndex: number) => {
            if (!car) return null;
            return (
              <Table.Row key={`${rideIndex}-${carIndex}`}>
                <Table.Cell verticalAlign={"top"} padding={"1rem"}>
                  <Text fontSize={{ base: "sm", xl: "md" }}>
                    {car.driver_name}
                  </Text>
                </Table.Cell>
                <Table.Cell
                  verticalAlign={"top"}
                  paddingY={"1rem"}
                  paddingX={0}
                >
                  {car.riders && car.riders.length > 0 ? (
                    <VStack align="start" gap={0}>
                      {car.riders.map(
                        (rider: Rider | null, riderIndex: number) =>
                          rider ? (
                            <Text
                              key={riderIndex}
                              fontSize={{ base: "sm", xl: "md" }}
                            >
                              {rider.name} {rider.staying ? "(staying)" : ""}
                            </Text>
                          ) : null,
                      )}
                    </VStack>
                  ) : (
                    "No riders"
                  )}
                </Table.Cell>
                <Table.Cell
                  verticalAlign={"top"}
                  paddingY={"1rem"}
                  display={{ base: "none", md: "table-cell" }}
                >
                  <Text fontSize={{ base: "sm", xl: "md" }}>
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
      id="admin-settings"
      scrollMarginTop={"6rem"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        padding="1.5rem"
        border={"3px solid {colors.goc.blue}"}
        borderRadius="8px"
        backgroundColor="white"
        boxShadow="lg"
        width="100%"
      >
        <Heading as="h2" textAlign="center" color="black">
          Admin Settings
        </Heading>
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
            fontWeight="semibold"
            marginTop="1rem"
          >
            Upload Rides
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
