/**
 * EventCardList - Renders a list of EventCard components
 */

import { EventCard } from "@/components/EventCard";
import { Event } from "@/pages/Events";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import GOCSpinner from "./GOCSpinner";

interface EventListProps {
  events: Event[];
  loading: boolean;
}

export const EventList = ({ events, loading }: EventListProps) => {
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
    <Flex
      wrap="wrap"
      gap="6"
      justify="flex-start"
      align="start"
      px="4"
      maxW="100%"
      width="100%"
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Flex>
  );
};
