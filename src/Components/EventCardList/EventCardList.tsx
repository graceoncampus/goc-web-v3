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
    let last = 'right';

    const getJustification = () => {
        if (last === 'left') {
            last = 'right';
            return 'right';
        } else {
            last = 'left';
            return 'left';
        }
    }

    return (
        <div id='event-list-container'>
            {eventCardListProps.events.map((eventCardProps: EventCardProps) => {
                return (
                    <EventCard
                        key={eventCardProps.text}
                        purpose={eventCardProps.purpose}
                        text={eventCardProps.text}
                        action={eventCardProps.action}
                        link={eventCardProps.link}
                        justifyContent={getJustification()}
                    />
                );
            })}
        </div>
    );
};