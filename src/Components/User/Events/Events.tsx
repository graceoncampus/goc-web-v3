import { HeaderNavbarActiveKey } from "Components/User/Header/Header";
import { Template } from "Components/User/Template/Template";

import "./Events.scss";
import { Accordion } from "react-bootstrap";

const mockEvents: Event[] = [
  {
    title: "Event 1",
    date: new Date(2025, 3, 5, 7),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Event 2",
    date: new Date(2025, 3, 22, 9),
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Event 3",
    date: new Date(2025, 3, 31, 5),
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export const Events: React.FC = () => {
  return (
    <Template
      activeKey={HeaderNavbarActiveKey.SMALL_GROUPS}
      body={<EventsBody events={mockEvents} />}
    />
  );
};

interface Event {
  title: string;
  date: Date;
  description: string;
}

const EventsBody: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div className={"text-center"}>
      <h1 className="events">
        <strong> Events </strong>
      </h1>
      <h1 className="m-5">Upcoming Events</h1>
      <div className="p-5 m-5 pt-0">
        <Accordion>
          {events.map((event, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex align-items-center">
                    <h2 className="m-0">{event.title}</h2>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="m-0 text-center">
                      {event.date.toDateString()}
                    </p>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>{event.description}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
