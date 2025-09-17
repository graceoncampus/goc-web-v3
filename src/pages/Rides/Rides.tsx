import { useEffect, useState } from "react";
import { Ride, Car, Rider } from "Api";
import { post, generateClient } from "aws-amplify/api";
import { checkIsLoggedIn, checkInRidesTeam } from "@/auth/CheckUser";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Input,
  Text,
  VStack,
  Table,
  Container,
  Textarea,
  Center,
} from "@chakra-ui/react";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import GOCat from "@/components/GOCat";
import { toaster } from "@/components/ui/toaster";
import { NavbarActiveKey } from "@/components/Navbar";
import { Field } from "@/components/ui/field";
import GOCSpinner from "@/components/GOCSpinner";
import GOCButton from "@/components/GOCButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { LuUpload } from "react-icons/lu";
import { FaCarSide } from "react-icons/fa";
import { RIDES_GOOGLE_FORM_LINK } from "@/constants/Links";

const client = generateClient();

/**
 * Client-side function to update rides.
 * This function sends the spreadsheet URL, date, and email message
 * to an endpoint that performs the rides update logic.
 */
interface UpdateRidesResult {
  success: boolean;
  errorMessage?: string;
  drivers?: { name: string; email: string }[];
}

const updateRidesClient = async (
  url: string,
  date: string,
  emailMsg?: string,
): Promise<UpdateRidesResult> => {
  try {
    const body = { url, date, emailMsg: emailMsg || "" };

    const restOperation = post({
      apiName: "updateRides",
      path: "/",
      options: {
        body,
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
      console.error("Error updating rides:", error);
      return { success: false, errorMessage: String(error) };
    } else {
      console.log("Successfully uploaded rides");
      const data = JSON.parse((res as any).body);
      return { success: true, drivers: data.drivers };
    }
  } catch (error: any) {
    console.error("POST call failed: ", error);
    let errorMessage = "POST call failed.";
    return { success: false, errorMessage };
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
          driver {
            comment
          }
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
      toaster.create({
        title: "Error",
        description: "Failed to fetch rides.",
        type: "error",
      });
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
      imageSrc="/images/rides.jpg"
      alt="Rides page banner"
    >
      <ScrollToTopButton />
      <RidesLandingBody
        rides={rides}
        loading={loading}
        fetchRides={fetchRides}
      />
    </BannerTemplate>
  );
};

interface RidesProps {
  rides: Ride[];
  loading: boolean;
  fetchRides?: () => void;
}

const RidesLandingBody = ({
  rides,
  loading,
  fetchRides = () => {},
}: RidesProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inRidesTeam, setInRidesTeam] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const checkAuth = async () => {
      await checkIsLoggedIn(setIsLoggedIn);
      await checkInRidesTeam(setInRidesTeam);
    };
    checkAuth();

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const getRelevantSunday = (): Date => {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 1 = Monday, …, 6 = Saturday
    const relevantSunday = new Date(today);

    if (day === 0) {
      // If it's Sunday, keep the same date
      return relevantSunday;
    } else {
      // For any other day, get next Sunday
      const daysUntilNextSunday = 7 - day;
      relevantSunday.setDate(today.getDate() + daysUntilNextSunday);
      return relevantSunday;
    }
  };

  const relevantSunday = getRelevantSunday();
  const numericSunday = `${relevantSunday.getMonth() + 1}/${relevantSunday.getDate()}`;

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
            isLoggedIn={isLoggedIn}
            inRidesTeam={inRidesTeam}
            numericSunday={numericSunday}
          />
        </Box>
        <Box flex={7}>
          {/* Heading */}
          <Flex direction="column" width="100%" alignItems={"center"}>
            <Heading
              as="h2"
              fontSize={"3xl"}
              lineHeight={{ base: "1.5", lg: "3rem", xl: "4rem" }}
              textAlign={{ base: "center", lg: "left" }}
              textWrap="balance"
              marginBottom={{ base: "1rem", xl: "0" }}
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
                marginTop: "1.2rem",
                width: "14rem",
                height: "2.8rem",
              }}
            >
              Sign up for Sunday ({numericSunday})
            </GOCButton>
            {/* Admin Settings */}
            {inRidesTeam && (
              <Box marginTop={"3rem"} width={{ base: "100%", md: "60%" }}>
                <RidesSettings fetchRides={fetchRides} />
              </Box>
            )}
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
        </Box>
      </Flex>
      <GOCat />
    </Container>
  );
};

interface SignUpButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SignUpButton = ({ children, onClick }: SignUpButtonProps) => {
  return onClick ? (
    <Button
      width="14rem"
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
      onClick={onClick}
    >
      {children}
    </Button>
  ) : (
    <Button
      asChild
      width="14rem"
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
    >
      {children}
    </Button>
  );
};

interface RidesMenuSidebarProps {
  isLoggedIn: boolean;
  inRidesTeam: boolean;
  numericSunday: string;
}

const RidesMenuSidebar = ({
  isLoggedIn,
  inRidesTeam,
  numericSunday,
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
            Sign up for Sunday ({numericSunday})
          </Link>
        </SignUpButton>
      </VStack>
      {isLoggedIn ? (
        inRidesTeam ? (
          <Text
            fontSize={{ base: "xs", lg: "sm" }}
            textAlign="center"
            color="white"
            marginTop="1.5rem"
            textWrap="nowrap"
          >
            <Link href="#admin-settings" color="white" fontWeight="semibold">
              Admin Settings <LuUpload />
            </Link>
          </Text>
        ) : (
          <Text
            fontSize={{ base: "xs", lg: "sm" }}
            fontWeight="medium"
            textAlign="center"
            color="white"
            marginTop="1.5rem"
            textWrap="nowrap"
          >
            UCLA&nbsp;&harr;&nbsp;Grace Community Church
          </Text>
        )
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
  if (loading) return <GOCSpinner text="Loading rides..." />;

  return (
    <Table.Root
      size="sm"
      maxWidth={"60rem"}
      variant="outline"
      striped
      stickyHeader
      tableLayout={"fixed"}
    >
      <Table.Header backgroundColor={"goc.blue"}>
        <Table.Row>
          <Table.ColumnHeader color={"white"} padding={".75rem"}>
            <Text fontSize={"sm"}>Driver</Text>
          </Table.ColumnHeader>
          <Table.ColumnHeader color={"white"} padding={".75rem"}>
            <Text fontSize={"sm"}>Rider(s)</Text>
          </Table.ColumnHeader>
          <Table.ColumnHeader
            color={"white"}
            display={{ base: "none", md: "table-cell" }}
          >
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
                <Table.Cell
                  verticalAlign={"top"}
                  paddingY={"1rem"}
                  display={{ base: "none", md: "table-cell" }}
                >
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
      emailMsg:
        "Please message your riders BEFORE Sunday. If you can't, let us know and we'll message them for you. Aim to pick up dormies at their respective turnaround @8:15AM. If you are not driving your riders back, please tell them to find us IMMEDIATELY after Crossroads.",
    },
  });

  const [uploadingRides, setUploadingRides] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    const { url, date, emailMsg } = data;
    setUploadingRides(true);
    try {
      const result = await updateRidesClient(url, date, emailMsg);
      if (result.success) {
        for (const driver of result.drivers || []) {
          toaster.create({
            title: "Success",
            description: `Successfully sent email to ${driver.name}`,
            type: "success",
            duration: 5000,
          });
        }
        fetchRides();
      } else {
        toaster.create({
          title: "Failed to update rides",
          description: result.errorMessage + " Please contact web team.",
          duration: 5000,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toaster.create({
        title: "Unexpected error",
        description: "Please contact web team.",
        type: "error",
        duration: 5000,
      });
    } finally {
      setUploadingRides(false);
    }
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
        <Heading as="h2" textAlign="center" marginBottom={"2rem"}>
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
          <Field label="Custom Email Message" invalid={!!errors.emailMsg}>
            <Textarea
              height={"120px"}
              {...register("emailMsg")}
              defaultValue={
                "Please message your riders BEFORE Sunday. If you can't, let us know and we'll message them for you. Aim to pick up dormies at their respective turnaround @8:15AM. If you are not driving your riders back, please tell them to find us IMMEDIATELY after Crossroads."
              }
            />
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
