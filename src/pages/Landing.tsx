/**
 * GOC Website Main Landing page
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavbarActiveKey } from "components/Navbar";
import { Template } from "layouts/Template";
import { EventCardList, EventCardListProps } from "components/EventCardList";

import { RiArrowRightLine } from "react-icons/ri";
import OutlineButton from "components/OutlineButton";
import InfoBox from "components/InfoBox";
import { observer } from "mobx-react-lite";
import { useStore } from "store/StoreContext";
import { Box, Heading, Image, Stack, Text, Container } from "@chakra-ui/react";

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
    <Container fluid margin="0" padding="0">
      {/* Banner */}
      <Box position="relative" width="100%" height="100vh" overflow="hidden">
        {/* Banner image */}
        <Image
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          src="/images/landing3.jpg" // Make sure to center the image before changing
          alt="GOC Landing Photo"
          objectFit="cover"
          objectPosition="center"
          userSelect="none"
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
        />

        {/* Centered text & button */}
        <Container
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="100%"
          textAlign="center"
          color="white"
          padding="1.5rem"
        >
          <Stack gap="0" align="center">
            <Heading
              as="h1"
              fontSize={{
                base: "2xl",
                sm: "3xl",
                md: "4xl",
                lg: "5xl",
                xl: "6xl",
              }}
              lineHeight="1.2"
              fontWeight="bold"
              textWrap="pretty"
              marginBottom="0.5rem"
            >
              Welcome to Grace on Campus!
            </Heading>
            <Text
              fontSize={{
                base: "xs",
                sm: "sm",
                md: "md",
                lg: "lg",
                xl: "xl",
              }}
              textWrap="pretty"
              marginBottom={{
                sm: "0",
                md: "0",
                lg: "1rem",
                xl: "2rem",
              }}
            >
              Fridays at 7pm, Rolfe 1200
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
        </Container>
      </Box>

      {/* Info cards */}
      <Stack
        direction={{ base: "column", lg: "row" }}
        maxWidth="100%"
        gap={1}
        alignItems="center"
        separator={
          <Box
            height={{ base: "2px", lg: "180px" }}
            width={{ base: "80%", lg: "2.5px" }}
            bg="gray.300"
            marginX="auto"
            marginY="auto"
          />
        }
      >
        <InfoBox
          title="New Here?"
          description="Learn more about GOC"
          buttonText="ABOUT US"
          link="/about"
        />
        <InfoBox
          title="Small Groups"
          description="Get plugged in!"
          buttonText="LEARN MORE"
          link="/smallgroups"
        />
        <InfoBox
          title="Events"
          description="Join us for upcoming happenings"
          buttonText="LEARN MORE"
          link="/events"
        />
      </Stack>

      {/* Ride Signup */}
      <Box
        maxWidth="100%"
        bg="goc.blue"
        paddingX={{
          base: "2rem",
          sm: "2rem",
          md: "3rem",
          lg: "5rem",
          xl: "8rem",
        }}
        paddingY={{
          base: "2rem",
          sm: "7rem",
          md: "8rem",
          lg: "9rem",
          xl: "12rem",
        }}
        textAlign="center"
        color="white"
      >
        <Heading
          size={{ base: "2xl", sm: "2xl", md: "4xl", lg: "4xl", xl: "6xl" }}
          marginTop="0.5rem"
          textWrap="pretty"
        >
          Sign up for a ride to church!
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "sm", md: "md", lg: "lg", xl: "lg" }}
          marginTop="0.5rem"
          marginBottom="1rem"
          textWrap="pretty"
        >
          Grace Community Church - 9am every Sunday
        </Text>
        <OutlineButton href="#rides">SIGN UP</OutlineButton>
      </Box>

      {/* Events */}
      {/* <EventCardList events={events} /> */}
    </Container>
  );
});
