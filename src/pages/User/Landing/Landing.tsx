/* Landing Page
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavbarActiveKey } from "../Header/Header";
import { Template } from "layouts/Template";
import { EventCardList, EventCardListProps } from "pages/EventCardList/EventCardList";

import { observer } from "mobx-react-lite";
import { useStore } from "store/StoreContext";
import { Box, Button, Center, Flex, Heading, Image, Link, Stack, StackSeparator, Text } from "@chakra-ui/react";

const LandingBody = observer(() => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const userStore = useStore();

  {
    /* JUST TESTING RIGHT NOW */
  }
  const events = [
    {
      purpose: "GET CONNECTED",
      text: "SMALL GROUP",
      action: "CHECK'EM OUT",
      link: "/smallgroups",
    },
    {
      purpose: "GET CONNECTED",
      text: "RIDES",
      action: "SIGN UP NOW",
      link: "/rides/rider/signup",
    },
    {
      purpose: "GET CONNECTED",
      text: "UPCOMING EVENTS",
      action: "TAKE A LOOK",
      link: "/rides/rider/signup",
    },
    {
      purpose: "GET CONNECTED",
      text: "PRAYER REQUESTS",
      action: "LOREUM IPSUM",
      link: "/rides/rider/signup",
    },
    {
      purpose: "GET CONNECTED",
      text: "RIDES",
      action: "Sign up",
      link: "/rides/rider/signup",
    },
  ];

  return (
    <Box>
      <Stack>
        <Box position="relative" width="100vw" height={["50vh", "60vh", "75vh"]}>
          <Image width="100%" height="100%" src="/images/landing.jpg" alt="GOC Landing Photo" objectFit="cover" />
          <Box position="absolute" top={0} left={0} width="100%" height="100%" bg="gray.900" opacity={0.5} />
          <Center position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
            <Stack textAlign="center" align="center" color="white" px={4}>
              <Heading size={["2xl", "3xl", "5xl"]} fontWeight="bold">
                Welcome to Grace on Campus!
              </Heading>
              <Text fontSize={["md", "lg", "2xl"]}>Fridays at 7pm, Rolfe 1200</Text>
              <Link href={"https://www.facebook.com/groups/gocatucla"} target={"_blank"}>
                <Button
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "white", color: "black" }}
                  size="lg"
                  borderRadius="full"
                  paddingX={6}
                  paddingY={4}
                >
                  Join our Facebook group
                </Button>
              </Link>
            </Stack>
          </Center>
        </Box>
      </Stack>

      <Stack direction={{ base: "column", md: "row" }} h="auto" w="100%" align="stretch">
        <Box flex={1} textAlign="center" p={4} bg="gray.100" borderRadius="md">
          <Heading size="md" mb={2}>
            New Here?
          </Heading>
          <Text mb={4}>Learn more about GOC</Text>
          <Button variant="outline" width="full">
            ABOUT US
          </Button>
        </Box>
        <Box flex={1} textAlign="center" p={4} bg="gray.100" borderRadius="md">
          <Heading size="md" mb={2}>
            Small Group
          </Heading>
          <Text mb={4}>Get plugged in!</Text>
          <Button variant="outline" width="full">
            LEARN MORE
          </Button>
        </Box>
        <Box flex={1} textAlign="center" p={4} bg="gray.100" borderRadius="md">
          <Heading size="md" mb={2}>
            Upcoming Events
          </Heading>
          <Text mb={4}>Join us for upcoming happenings</Text>
          <Button variant="outline" width="full">
            LEARN MORE
          </Button>
        </Box>
      </Stack>
      <EventCardList events={events} />
    </Box>
  );
});

export const Landing = () => {
  return <Template activeKey={NavbarActiveKey.NONE} body={<LandingBody />} />;
};
