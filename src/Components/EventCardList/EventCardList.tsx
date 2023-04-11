/**
 * EventList
 */

import React from 'react';

import { EventCard, EventCardProps } from 'Components/EventCard/EventCard';

import './EventCardList.scss';

export interface EventCardListProps {
    events: EventCardProps[];
}


export const EventCardList = (eventCardListProps: EventCardListProps) => {
    return (
        <div className={'event-list-container'}>
            {eventCardListProps.events.map((eventCardProps: EventCardProps, index: number) => {
                return (
                    <EventCard
                        key={eventCardProps.text}
                        purpose={eventCardProps.purpose}
                        text={eventCardProps.text}
                        action={eventCardProps.action}
                        link={eventCardProps.link}
                        justifyContent={index % 2 === 0 ? 'left' : 'right'}
                    />
                );
            })}
        </div>
    );
};