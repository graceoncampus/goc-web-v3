/**
 * EventList
 */

import { useNavigate } from "react-router-dom";

export interface EventCardProps {
  purpose: string;
  text: string;
  action: string;
  link: string;
  justifyContent?: string;
}

export const EventCard = (eventCardProps: EventCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={"event-outer-container"}>
      <div className={"event-inner-container-" + eventCardProps.justifyContent}>
        <div className={"vertical-line-blue"}></div>
        <div className={"event-purpose"}>{eventCardProps.purpose}</div>
        <div className={"event-text"}>{eventCardProps.text}</div>
        <button
          className={"event-action-btn"}
          onClick={() => navigate(eventCardProps.link)}
        >
          <div className={"event-action-btn-text"}>{eventCardProps.action}</div>
          <div className={"event-action-btn-arrow"}></div>
        </button>
      </div>
    </div>
  );
};
