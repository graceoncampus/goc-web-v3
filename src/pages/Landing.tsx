/**
 * GOC Website Main Landing page
 */

import { useMemo } from "react";
import { Template } from "@/layouts/Template";
import { NavbarActiveKey } from "@/components/Navbar";
import OutlineButton from "@/components/OutlineButton";
import InfoBox from "@/components/InfoBox";
import GOCat from "@/components/GOCat";
import { Box, Heading, Image, Stack, Text, Container } from "@chakra-ui/react";
import { ContactInfo } from "@/constants/ContactInfo";
import { SocialMedia, RIDES_GOOGLE_FORM_LINK } from "@/constants/Links";
import { observer } from "mobx-react-lite";
import { RiArrowRightLine } from "react-icons/ri";

export const LandingPage = () => {
  return (
    <Template activeKey={NavbarActiveKey.NONE}>
      <LandingBody />
    </Template>
  );
};

const LandingBody = observer(() => {
  const isMobile = useMemo(() => {
    return (
      ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
  }, []);

  return (
    <Container fluid={true} margin="0" padding="0">
      {/* Banner */}
      <Box
        position="relative"
        width="100%"
        height={{ base: "25rem", md: "100vh" }}
        overflow="hidden"
      >
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
          <Stack gap="0" align="center" marginTop={{ base: "4rem", md: "0" }}>
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
              fontWeight={"bold"}
              marginBottom="1rem"
              animation="fadeIn .5s ease-in-out"
              animationDelay="0s"
              opacity="0"
              animationFillMode="forwards"
              textShadow={isMobile ? "none" : "1px 1px rgba(0,0,0,0.5)"}
            >
              Welcome&nbsp;to Grace&nbsp;on&nbsp;Campus!
            </Heading>
            <Text
              fontSize={{ base: "xs", sm: "md", md: "lg", lg: "xl", xl: "2xl" }}
              fontWeight={"medium"}
              marginBottom={{ base: "1rem", xl: "2rem" }}
              animation="fadeIn .5s ease-in-out"
              animationDelay="0.25s"
              opacity="0"
              animationFillMode="forwards"
              textShadow={isMobile ? "none" : "1px 1px rgba(0,0,0,0.3)"}
            >
              {ContactInfo.day} at {ContactInfo.time}, {ContactInfo.location}
            </Text>
            <Box
              animation="fadeIn .5s ease-in-out"
              animationDelay="0.6s"
              opacity="0"
              animationFillMode="forwards"
            >
              <OutlineButton
                href={SocialMedia.facebook}
                onWhite={false}
                icon={<RiArrowRightLine />}
                animateIcon={isMobile ? false : true}
              >
                JOIN US!
              </OutlineButton>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Info cards */}
      <Stack
        direction={{ base: "column", lg: "row" }}
        maxWidth={"90rem"}
        marginX={"auto"}
        gap={1}
        alignItems={"center"}
        justifyContent={"center"}
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
          sm: "5rem",
          md: "6rem",
          lg: "7rem",
          xl: "12rem",
        }}
        textAlign="center"
        color="white"
      >
        {isMobile ? (
          <Heading
            as={"h2"}
            size={{ sm: "4xl", xl: "6xl" }}
            marginBottom="2rem"
            textWrap="pretty"
          >
            Rides to church!
          </Heading>
        ) : (
          <Heading
            as={"h2"}
            size={{ sm: "3xl", xl: "6xl" }}
            marginBottom={isMobile ? "2rem" : "1.2rem"}
            textWrap="pretty"
          >
            Sign&nbsp;up for a ride&nbsp;to&nbsp;church!
          </Heading>
        )}

        <Text
          fontSize={{ base: "sm", sm: "sm", md: "md", lg: "lg", xl: "lg" }}
          marginTop="0.5rem"
          marginBottom="1rem"
          textWrap="nowrap"
        >
          Grace Community Church
          <br />
          9AM every Sunday
        </Text>
        <OutlineButton href={RIDES_GOOGLE_FORM_LINK}>SIGN UP</OutlineButton>
      </Box>
      {!isMobile && <GOCat />}
    </Container>
  );
});
