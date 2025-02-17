// Remove these server-side imports from your client code
// import { JWT } from "google-auth-library";
// import { GoogleSpreadsheet } from "google-spreadsheet";
import { CreateCarInput, CreateRideInput, Ride } from "Api";
import { createRide, deleteRide } from "@/graphql/mutations";
import { listRides } from "@/graphql/queries";
import { useForm } from "react-hook-form";
import { NavbarActiveKey } from "components/Navbar";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser, GetCurrentUserOutput } from "aws-amplify/auth";
import { useEffect, useState, useCallback } from "react";
import { BannerTemplate } from "layouts/BannerTemplate";
import RiderSignup from "components/RiderSignup/RiderSignup";
import DriverSignup from "components/DriverSignup/DriverSignup";
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
          <Collapsible.Content
            borderRadius={"1rem"}
            paddingX={"1.5rem"}
            paddingY={"2rem"}
            backgroundColor={"goc.pale_blue"}
            marginBottom={{ base: "2.5rem", md: "2.5rem" }}
          >
            <RiderSignup />
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Driver Signup Form */}
        <Collapsible.Root lazyMount unmountOnExit open={driverOpen}>
          <Collapsible.Content
            borderRadius={"1rem"}
            paddingX={"1.5rem"}
            paddingY={"2rem"}
            backgroundColor={"goc.pale_blue"}
            marginBottom={{ base: "2.5rem", md: "2.5rem" }}
          >
            <DriverSignup />
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Heading */}
        <Heading as="h2" display="inline-flex" gap="1rem">
          Check your rides for this week!
          <FaCarSide />
        </Heading>
        <Text marginBottom="1.5rem" marginRight={{ base: "0", md: "3rem" }}>
          As a ministry of Grace Community Church, we provide rides to and from
          our church every Sunday.
        </Text>

        {/* Rides List */}
        <RidesList rides={rides} />
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
  const [user, setUser] = useState<GetCurrentUserOutput | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const u = await getCurrentUser();
      setUser(u);
    };
    fetchUser();
  }, []);

  return (
    <Box
      position={{ base: "block", md: "sticky" }}
      top={{ base: "0", md: "6rem" }}
      width={"100%"}
      zIndex={"5"}
      paddingX={"1.5rem"}
      paddingY={"1.8rem"}
      backgroundColor={"goc.blue"}
      borderRadius={"1rem"}
      boxShadow={"md"}
    >
      {user ? (
        <RidesSettings />
      ) : (
        <VStack
          gap={0}
          textAlign={"center"}
          color={"white"}
          marginBottom={"1rem"}
        >
          <Heading
            as={"h2"}
            fontSize={{ base: "xl", xl: "2xl" }}
            marginBottom={{ base: 0, xl: ".5rem" }}
          >
            Need a ride?
          </Heading>
          <Text fontSize={{ base: "sm", xl: "lg" }} textWrap={"nowrap"}>
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

      {!user && (
        <Text
          fontSize={{ base: "2xs", xl: "sm" }}
          textAlign={"center"}
          color={"white"}
          marginTop={"1.5rem"}
          textWrap={"nowrap"}
        >
          <Link href="/login" color={"white"} fontWeight={"bold"}>
            Login
          </Link>{" "}
          to access admin settings
        </Text>
      )}
    </Box>
  );
};

const RidesList = ({ rides }: RidesProps) => {
  return (
    <Box backgroundColor={"gray.200"} paddingY={"50rem"}>
      <Box>
        <Text>Driver</Text>
        <Text>Rider(s)</Text>
      </Box>

      {rides?.cars?.map((car, i) => {
        return (
          <div key={i} className={i % 2 === 0 ? "table-row" : "even table-row"}>
            <div>{car?.driver_name} </div>
            <div>
              {car?.riders.map((rider, i) => {
                return <span key={i}>{rider?.name}</span>;
              })}
            </div>
          </div>
        );
      })}
    </Box>
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
      <Heading as="h2" textAlign="center" color={"white"}>
        Admin Settings
      </Heading>

      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        padding={"1.5rem"}
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
            color={"white"}
            backgroundColor="black"
            type="submit"
            width="full"
            fontWeight={"bold"}
            marginTop="1rem"
          >
            Upload Rides
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
