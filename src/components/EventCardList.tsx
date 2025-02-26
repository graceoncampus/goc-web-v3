/**
 * EventList
 */

import { EventCard, EventCardProps } from "@/components/EventCard";

export interface EventCardListProps {
  events: EventCardProps[];
}

export const EventCardList = (eventCardListProps: EventCardListProps) => {
  return (
    <div>
      {eventCardListProps.events.map((eventCardProps: EventCardProps) => {
        return (
          <EventCard
            key={eventCardProps.text}
            purpose={eventCardProps.purpose}
            text={eventCardProps.text}
            action={eventCardProps.action}
            link={eventCardProps.link}
          />
        );
      })}
    </div>
  );
};
