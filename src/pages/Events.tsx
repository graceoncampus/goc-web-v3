import { NavbarActiveKey } from "@/components/Navbar";
import { listGOCEvents } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Container,
  AspectRatio,
} from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import GOCSpinner from "@/components/GOCSpinner";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { MdAttachMoney, MdLocationPin } from "react-icons/md";

const client = generateClient();

export const EventsPage: React.FC = () => {
  return (
    <BannerTemplate
      title="Events"
      activeKey={NavbarActiveKey.EVENTS}
      imageSrc="/images/events.jpg"
      alt="Events page banner"
    >
      <EventsBody />
    </BannerTemplate>
  );
};

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  price: Number;
  location: string;
  description: string;
  imageLink: string;
}

const EventsBody: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await client.graphql({ query: listGOCEvents });
        const eventsData =
          result.data?.listGOCEvents?.items?.sort(
            (a: any, b: any) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
          ) || [];
        const mappedEvents = eventsData.map((event: any) => ({
          id: event.id,
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          price: event.price,
          location: event.location,
          description: event.description,
          imageLink: event.imageLink,
        }));
        setEvents(mappedEvents);
      } catch (reason) {
        console.error(reason);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container fluid={true} padding={0}>
      <Heading
        as="h2"
        textAlign={"center"}
        fontSize={{
          base: "2xl",
          md: "3xl",
          lg: "4xl",
          xl: "4xl",
        }}
      >
        Upcoming Events
      </Heading>
      <Stack
        width={{ sm: "100%", md: "4/5" }}
        marginX={"auto"}
        marginY={"1.8rem"}
        align={"center"}
        gap={"3rem"}
      >
        <EventList events={events} loading={loading} />
        <Stack id={"calendar"} as={"section"} width={"100%"} align={"center"}>
          <Heading
            as="h2"
            textAlign={"center"}
            marginBottom={{ base: "1rem", md: "2rem" }}
            fontSize={{
              base: "2xl",
              md: "3xl",
              lg: "4xl",
              xl: "4xl",
            }}
          >
            Calendar
          </Heading>
          <AspectRatio
            ratio={{ base: 1, md: 4 / 3 }}
            width={{ base: "100%", lg: "800px" }}
          >
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&title&showCalendars=0&mode=MONTH&showTz=0&src=Z29jYXRlYW1AZ21haWwuY29t&color=%23C0CA33"
              title="Google Calendar"
            />
          </AspectRatio>
        </Stack>
      </Stack>
    </Container>
  );
};

interface EventListProps {
  events: Event[];
  loading: boolean;
}

const EventList = ({ events, loading }: EventListProps) => {
  function formatEventDate(startDateString: string, endDateString: string) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const formattedStartDate = `${startDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
    const formattedEndDate = `${endDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;

    return `${formattedStartDate} - ${formattedEndDate}`;
  }

  function formatEventDateShort(dateString: string) {
    const date = new Date(dateString);
    const monthsShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const daysOfWeekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 || 12;
    const formattedMinute = String(minute).padStart(2, "0");

    return `${monthsShort[date.getMonth()]} ${date.getDate()} • ${daysOfWeekShort[date.getDay()]} • ${formattedHour}:${formattedMinute}${ampm}`;
  }

  if (loading) return <GOCSpinner />;

  if (events.length === 0) {
    return (
      <Stack marginY="1rem" align="center">
        <Text fontSize={{ base: "md", md: "xl" }} color="goc.blue">
          There are no upcoming events!
        </Text>
      </Stack>
    );
  }

  return (
    <AccordionRoot
      key={events.length}
      spaceY="1rem"
      variant="outline"
      collapsible={true}
      multiple={true}
      maxWidth={"60rem"}
    >
      {events.map((event, index) => (
        <AccordionItem key={index} value={event.id}>
          <AccordionItemTrigger indicatorPlacement="start">
            <Stack width="100%">
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                marginLeft="10px"
              >
                <Heading
                  as="h3"
                  fontSize={{ base: "md", md: "xl", lg: "2xl" }}
                  margin={0}
                >
                  {event.title}
                </Heading>
                <Text
                  fontSize={{ base: "sm", md: "lg" }}
                  marginRight="10px"
                  textAlign="right"
                >
                  {formatEventDateShort(event.startDate)}
                </Text>
              </Flex>
            </Stack>
          </AccordionItemTrigger>
          <AccordionItemContent>
            <Box marginX="30px">
              <Flex>
                <Image
                  width={{ base: "100px", md: "200px" }}
                  height={{ base: "175px", md: "200px" }}
                  borderRadius="20px"
                  src={event.imageLink}
                />
                <Box className="event-description-text" marginLeft="20px">
                  <Box>
                    <Heading as="h3">{event.title}</Heading>
                    <Box>
                      <Text fontSize={{ base: "xs", md: "md" }}>
                        {event.description}
                      </Text>
                      <Box className="event-info" marginTop="10px">
                        <Text fontSize={{ base: "xs", md: "md" }}>
                          {formatEventDate(event.startDate, event.endDate)}
                        </Text>
                        <Flex
                          className="location-info"
                          alignItems="center"
                          marginTop="10px"
                        >
                          <Icon fontSize={{ base: "20px", md: "24px" }}>
                            <MdLocationPin />
                          </Icon>
                          <Text
                            fontSize={{ base: "sm", md: "md" }}
                            marginRight="10px"
                          >
                            {event.location}
                          </Text>
                          <Icon fontSize={{ base: "20px", md: "24px" }}>
                            <MdAttachMoney />
                          </Icon>
                          <Text fontSize={{ base: "sm", md: "md" }}>
                            {event.price === 0
                              ? "free"
                              : event.price.toString()}
                          </Text>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};
