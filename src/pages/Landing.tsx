/**
 * GOC Website Main Landing page
 */

import { useMemo } from "react";
import { Template } from "@/layouts/Template";
import { NavbarActiveKey } from "@/components/Navbar";
import OutlineButton from "@/components/OutlineButton";
import InfoBox from "@/components/InfoBox";
import GOCat from "@/components/GOCat";
import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  Container,
  Link,
} from "@chakra-ui/react";
import { ContactInfo } from "@/constants/ContactInfo";
import { SocialMedia } from "@/constants/Links";
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
              animation="fadeInUp .5s ease-in-out"
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
              animation="fadeInUp .5s ease-in-out"
              animationDelay="0.25s"
              opacity="0"
              animationFillMode="forwards"
              textShadow={isMobile ? "none" : "1px 1px rgba(0,0,0,0.3)"}
            >
              {ContactInfo.day} at {ContactInfo.time}, {ContactInfo.location}
            </Text>
            <Box
              animation="fadeInUp .5s ease-in-out"
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

      {/* Welcome message */}
      <Box
        width={"100%"}
        display="flex"
        justifyContent="center"
        color="black"
        backgroundColor={"white"}
      >
        <Stack
          padding={"2rem"}
          align={"center"}
          marginY={{ base: "1rem", md: "2rem" }}
          textAlign={{ base: "left", md: "center" }}
          width={"80ch"}
        >
          <Heading>Who we are</Heading>
          <Text
            maxWidth="45rem"
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="1.6"
          >
            <strong>Grace on Campus</strong>, GOC for short, is a Christian
            fellowship at UCLA. As a ministry of{" "}
            <Link
              href="https://www.gracechurch.org/"
              target="_blank"
              color="goc.blue"
              display={"inline"}
            >
              Grace Community Church
            </Link>
            , we focus on Bible teaching, leadership training, evangelism, and
            discipleship. We also provide{" "}
            <Link href={"/rides"} color="goc.blue" display={"inline"}>
              rides
            </Link>{" "}
            to church every Sunday! Sign up for a ride to church and join our{" "}
            <Link
              href={SocialMedia.facebook}
              target="_blank"
              color="goc.blue"
              display={"inline"}
            >
              Facebook group
            </Link>{" "}
            to attend our weekly Bible study, every Friday at 7pm.
          </Text>
        </Stack>
      </Box>

      <Box
        width={{ base: "40%", md: "60rem" }}
        height={{ base: "5px", md: "3px" }}
        bg="goc.blue"
        marginX="auto"
        marginY="auto"
      />

      {/* Info cards */}
      <Box width={"100%"} backgroundColor={"white"} marginTop={"2rem"}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          maxWidth={"70rem"}
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
            description="Come join us!"
            buttonText="LEARN MORE"
            link="/events"
          />
        </Stack>
      </Box>

      {/* Ride Signup */}
      <Box
        maxWidth="100%"
        backgroundColor="goc.blue"
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
        <OutlineButton href={"/rides"}>SIGN UP</OutlineButton>
      </Box>
      <GOCat />
    </Container>
  );
});
