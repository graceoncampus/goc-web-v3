import { HeaderNavbarActiveKey } from "pages/User/Header/Header";
import { MdAttachMoney, MdLocationPin } from "react-icons/md";

import { Template } from "pages/User/Template/Template";
import { listGOCEvents } from "graphql/queries";
import { generateClient } from "aws-amplify/api";

import { useEffect, useState } from "react";
import { Box, Center, Flex, Heading, Icon, Image, Separator, Stack, Text } from "@chakra-ui/react";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "components/ui/accordion";

const client = generateClient();

export const Events: React.FC = () => {
  return <Template activeKey={HeaderNavbarActiveKey.EVENTS} body={<EventsBody />} />;
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
  useEffect(() => {
    const fetchEvents = async () => {
      await (client.graphql({ query: listGOCEvents }) as Promise<any>)
        .then((result) => {
          const eventsData = result.data.listGOCEvents.items.sort(
            (a: any, b: any) => new Date(b["startDate"]).getTime() - new Date(a["startDate"]).getTime(),
          );
          setEvents(
            eventsData.map((event: any) => {
              const item = {
                id: event["id"],
                title: event["title"],
                startDate: event["startDate"],
                endDate: event["endDate"],
                price: event["price"],
                location: event["location"],
                description: event["description"],
                imageLink: event["imageLink"],
              };
              return item;
            }),
          );
        })
        .catch((reason) => {
          console.log(reason);
        });
    };

    fetchEvents();
  }, []);
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
    const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const daysOfWeekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 || 12;
    const formattedMinute = String(minute).padStart(2, "0");

    return `${monthsShort[date.getMonth()]} ${date.getDate()} • ${daysOfWeekShort[date.getDay()]} • ${formattedHour}:${formattedMinute}${ampm}`;
  }

  return (
    <Center>
      <Box width={"100%"}>
        <Center>
          <Heading size={"3xl"} fontWeight={"normal"}>
            Upcoming Events
          </Heading>
        </Center>
        <Center>
          <Stack gap={4} width={"4/5"} margin={"30px"}>
            <AccordionRoot spaceY={"4"} variant={"plain"} collapsible>
              {events.map((event, index) => (
                <AccordionItem key={index} value={event.id}>
                  <AccordionItemTrigger indicatorPlacement="start">
                    <Stack width={"100%"}>
                      <Flex justify={"space-between"} width={"100%"} marginLeft={"10px"}>
                        <Heading size={"2xl"}>{event.title}</Heading>
                        <Text paddingRight={"10px"}>{formatEventDateShort(event.startDate)}</Text>
                      </Flex>
                      <Separator size={"md"} width={"100%"} />
                    </Stack>
                  </AccordionItemTrigger>

                  <AccordionItemContent>
                    <Box marginX={"30px"}>
                      <Flex>
                        <Image width={"300px"} height={"300px"} borderRadius={"20px"} src={event.imageLink} />
                        <Box className="event-description-text" marginLeft={"20px"}>
                          <Box>
                            <Heading size={"5xl"} className="event-title">
                              {event.title}
                            </Heading>
                            <Box>
                              <Text>{event.description}</Text>
                              <Box className="event-info" marginTop={"10px"}>
                                <Text>{formatEventDate(event.startDate, event.endDate)}</Text>
                                <Flex className="location-info" alignItems={"center"} marginTop={"10px"}>
                                  <Icon fontSize={"30px"}>
                                    <MdLocationPin />
                                  </Icon>
                                  <Text marginRight={"10px"}>{event.location}</Text>
                                  <Icon fontSize={"30px"}>
                                    <MdAttachMoney />
                                  </Icon>
                                  <Text>{event.price === 0 ? "free" : event.price.toString()}</Text>
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
          </Stack>
        </Center>
      </Box>
    </Center>
  );
};
