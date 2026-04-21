import { EventCard } from "@/components/EventCard";
import { Event } from "@/pages/Events";
import { Stack, Text } from "@chakra-ui/react";
import GOCSpinner from "./GOCSpinner";

interface EventListProps {
  events: Event[];
  loading: boolean;
  inATeam: boolean;
  onEventUpdate: () => void;
}

export const EventList = ({ events, loading, inATeam, onEventUpdate }: EventListProps) => {
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
    <Stack gap="1.5rem" width="100%">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={{ kind: "event", ...event, price: Number(event.price) }}
          inATeam={inATeam}
          onEventUpdate={onEventUpdate}
        />
      ))}
    </Stack>
  );
};
