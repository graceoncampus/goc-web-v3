/**
 * Welcome Week page for Grace on Campus
 * Displays special activities and events for the first week of school
 */

import { Template } from "@/layouts/Template";
import { NavbarActiveKey } from "@/components/Navbar";
import OutlineButton from "@/components/OutlineButton";
import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  Container,
  Link,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ContactInfo } from "@/constants/ContactInfo";
import { SocialMedia } from "@/constants/Links";
import {
  RiCalendarEventLine,
  RiMapPinLine,
  RiTimeLine,
  RiArrowRightLine,
} from "react-icons/ri";

export const WelcomeWeekPage = () => {
  return (
    <Template activeKey={NavbarActiveKey.NONE}>
      <WelcomeWeekBody />
    </Template>
  );
};

const WelcomeWeekBody = () => {
  const events = [
    {
      title: "Tour of Westwood",
      date: "Tuesday, September 23",
      time: "5:30 PM",
      location: "Pauley Pavilion",
      description: "Explore Westwood Village with fellow students!",
      highlight: true,
    },
    {
      title: "Beach Day",
      date: "Wednesday, September 24",
      time: "2:00 PM",
      location: "Hedrick Turnaround",
      description:
        "Join us for a fun day at the beach! We'll provide transportation, games, and snacks. Perfect way to relax and meet new friends!",
      highlight: true,
    },
    {
      title: "Ice Cream Social",
      date: "Friday, September 26",
      time: "7:00 PM - 9:30 PM",
      location: "Rolfe 1200",
      description:
        "Join us for our weekly large group with worship and hearing of God's Word, followed by free ice cream and fellowship!",
      highlight: true,
    },
  ];

  return (
    <Container fluid={true} margin="0" padding="0">
      {/* Hero Banner */}
      <Box
        position="relative"
        width="100%"
        height={{ base: "20rem", md: "60vh" }}
        overflow="hidden"
      >
        <Image
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          src="/images/events2.jpg"
          alt="Welcome Week Banner"
          objectFit="cover"
          objectPosition="center"
          userSelect="none"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="black"
          opacity="0.5"
        />

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
          <VStack gap={4}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0,0,0,0.7)"
            >
              Welcome Week 2025
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              fontWeight="medium"
              textShadow="1px 1px 2px rgba(0,0,0,0.7)"
            >
              Your first week at UCLA starts here!
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              opacity={0.9}
              maxW="600px"
            >
              Welcome to UCLA! This week is packed with opportunities to meet
              people, explore campus, and discover what GOC is all about.
            </Text>
          </VStack>
        </Container>
      </Box>
      <Box bg="gray.50" py={{ base: 8, md: 12 }}>
        <Container maxW="6xl">
          <VStack gap={8}>
            <Heading as="h2" size="xl" textAlign="center" color="gray.800">
              This Week's Events
            </Heading>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} w="100%">
              {events.map((event, index) => (
                <Card.Root
                  key={index}
                  variant={event.highlight ? "elevated" : "outline"}
                  bg={event.highlight ? "goc.blue" : "white"}
                  color={event.highlight ? "white" : "gray.800"}
                  borderWidth={event.highlight ? "0" : "1px"}
                  borderColor="gray.200"
                  shadow={event.highlight ? "lg" : "md"}
                  _hover={{ shadow: "xl", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  <Card.Body p={6}>
                    <VStack align="stretch" gap={4}>
                      <HStack justify="space-between" align="flex-start">
                        <Heading as="h3" size="md" flex={1}>
                          {event.title}
                        </Heading>
                      </HStack>

                      <VStack align="stretch" gap={2} fontSize="sm">
                        <HStack>
                          <RiCalendarEventLine />
                          <Text>{event.date}</Text>
                        </HStack>
                        <HStack>
                          <RiTimeLine />
                          <Text>{event.time}</Text>
                        </HStack>
                        <HStack>
                          <RiMapPinLine />
                          <Text>{event.location}</Text>
                        </HStack>
                      </VStack>

                      <Text fontSize="sm" lineHeight="1.5" opacity={0.9}>
                        {event.description}
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      {/* Call to Action */}
      <Box bg="white" py={{ base: 8, md: 12 }}>
        <Container maxW="4xl" textAlign="center">
          <VStack gap={6}>
            <Heading as="h2" size="lg" color="gray.800">
              Ready to Get Connected?
            </Heading>
            <Text fontSize="md" color="gray.600" maxW="500px">
              Have questions about any of these events? Want to stay updated on
              all our activities? Join our Facebook group or reach out to us
              directly!
            </Text>
            <HStack gap={4} flexWrap="wrap" justify="center">
              <OutlineButton
                href={SocialMedia.facebook}
                icon={<RiArrowRightLine />}
                onWhite={true}
              >
                JOIN FACEBOOK GROUP
              </OutlineButton>
              <OutlineButton href="/about" onWhite={true}>
                LEARN MORE ABOUT GOC
              </OutlineButton>
            </HStack>
          </VStack>
        </Container>
      </Box>
      {/* Contact Info */}
      <Box bg="gray.100" py={8}>
        <Container maxW="4xl" textAlign="center">
          <VStack gap={4}>
            <Heading as="h3" size="md" color="gray.800">
              Questions?
            </Heading>
            <Text color="gray.600">
              Email us at{" "}
              <Link
                href="mailto:gocateam@gmail.com"
                color="goc.blue"
                fontWeight="semibold"
              >
                gocateam@gmail.com
              </Link>{" "}
              or find us on social media
            </Text>
            <Text fontSize="sm" color="gray.500">
              We can't wait to meet you this week! 🎉
            </Text>
          </VStack>
        </Container>
      </Box>
    </Container>
  );
};
