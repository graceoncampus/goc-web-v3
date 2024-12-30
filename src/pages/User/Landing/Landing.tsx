/**
 * GOC Website Main Landing page
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavbarActiveKey } from "../Header/Header";
import { Template } from "layouts/Template";
import {
  EventCardList,
  EventCardListProps,
} from "pages/EventCardList/EventCardList";

import { RiArrowRightLine } from "react-icons/ri";
import OutlineButton from "components/OutlineButton";
import InfoBox from "components/InfoBox";
import { observer } from "mobx-react-lite";
import { useStore } from "store/StoreContext";
import {
  Box,
  Center,
  Heading,
  Image,
  StackSeparator,
  Stack,
  Text,
} from "@chakra-ui/react";

export const Landing = () => {
  return (
    <Template activeKey={NavbarActiveKey.NONE}>
      <LandingBody />
    </Template>
  );
};

const LandingBody = observer(() => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const userStore = useStore();

  /* Example Events */
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
    <Box width="100%">
      {/* Banner */}
      <Box position="relative" width="100%" overflow="hidden">
        <Image
          width="100%"
          height="100%"
          src="/images/landing.jpg"
          alt="GOC Landing Photo"
          backgroundSize="cover"
        />
        {/* Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg="black"
          opacity={0.4}
        />

        {/* Centered text & button */}
        <Center
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="100%"
          textAlign="center"
          color="white"
          paddingLeft={4}
          paddingRight={4}
        >
          <Stack gap="0" align="center">
            <Heading
              as="h1"
              size="h1"
              fontSize={{ sm: "2xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontWeight="bold"
            >
              Welcome to Grace on Campus!
            </Heading>
            <Text
              fontSize={{ sm: "sm", md: "md", lg: "lg", xl: "xl" }}
              marginBottom={{
                sm: "0",
                md: "0",
                lg: "1rem",
                xl: "2rem",
              }}
            >
              Fridays at 7pm, Broad 2160E
            </Text>
            <OutlineButton
              href="https://www.facebook.com/groups/gocatucla"
              onWhite={false}
              icon={<RiArrowRightLine />}
              animateIcon
            >
              JOIN US!
            </OutlineButton>
          </Stack>
        </Center>
      </Box>

      {/* Info cards */}
      <Stack
        direction={{ base: "column", lg: "row" }}
        width="100%"
        gap="4"
        separator={<StackSeparator />}
      >
        <InfoBox
          title="New Here?"
          description="Learn more about GOC"
          buttonText="ABOUT US"
          link="#about-us"
        />
        <InfoBox
          title="Small Groups"
          description="Get plugged in!"
          buttonText="LEARN MORE"
          link="#small-groups"
        />
        <InfoBox
          title="Events"
          description="Join us for upcoming happenings"
          buttonText="LEARN MORE"
          link="#events"
        />
      </Stack>

      {/* Ride Signup */}
      <Box
        bg="goc.blue"
        paddingY={{ sm: "7rem", md: "8rem", lg: "9rem", xl: "10rem" }}
        textAlign="center"
        color="white"
      >
        <Heading
          size={{ sm: "2xl", md: "4xl", lg: "4xl", xl: "5xl" }}
          marginTop={2}
        >
          Sign up for a ride to church!
        </Heading>
        <Text
          fontSize={{ sm: "sm", md: "md", lg: "lg", xl: "lg" }}
          marginTop={2}
          marginBottom={4}
        >
          Grace Community Church - 9am every Sunday
        </Text>
        <OutlineButton href="#rides">SIGN UP</OutlineButton>
      </Box>

      {/* Events */}
      {/* <EventCardList events={events} /> */}
    </Box>
  );
});
