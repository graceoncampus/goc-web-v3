import { HeaderNavbarActiveKey } from "Components/User/Header/Header";
import { Template } from "Components/User/Template/Template";

import "./Events.scss";
import { Accordion, Image } from "react-bootstrap";

const mockEvents: Event[] = [
  {
    title: "Quarter Cookout",
    startDate: new Date(2025, 3, 5, 7),
    endDate: new Date(2025, 3, 5, 9),
    price: 0,
    location: "Sac",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageLink:
      "https://cdn.britannica.com/66/103066-050-B89D5EAF/Will-Smith-actor-musician-2006.jpg",
  },
  {
    title: "Broomball",
    startDate: new Date(2025, 3, 22, 9),
    endDate: new Date(2025, 3, 22, 11),
    price: 10,
    location: "Sac",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageLink:
      "https://cdn.britannica.com/66/103066-050-B89D5EAF/Will-Smith-actor-musician-2006.jpg",
  },
  {
    title: "Spring Retreat",
    startDate: new Date(2025, 3, 31, 5),
    endDate: new Date(2025, 3, 31, 10),
    price: 10,
    location: "Sac",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageLink:
      "https://cdn.britannica.com/66/103066-050-B89D5EAF/Will-Smith-actor-musician-2006.jpg",
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
  startDate: Date;
  endDate: Date;
  price: Number;
  location: string;
  description: string;
  imageLink: string;
}

const EventsBody: React.FC<{ events: Event[] }> = ({ events }) => {
  function formatEventDate(startDate: Date, endDate: Date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startMonth = months[startDate.getMonth()];
    const startDay = startDate.getDate();
    const startYear = startDate.getFullYear();
    const startHour = startDate.getHours();
    const startMinute = startDate.getMinutes();
    const startAMPM = startHour >= 12 ? "pm" : "am";
    const startFormattedHour = startHour % 12 || 12;
    const startFormattedMinute = String(startMinute).padStart(2, "0");

    const endHour = endDate.getHours();
    const endMinute = endDate.getMinutes();
    const endAMPM = endHour >= 12 ? "pm" : "am";
    const endFormattedHour = endHour % 12 || 12;
    const endFormattedMinute = String(endMinute).padStart(2, "0");

    const formattedStartDate = `${startMonth} ${startDay}, ${startYear} • ${startFormattedHour}:${startFormattedMinute}${startAMPM}`;
    const formattedEndDate = `${endFormattedHour}:${endFormattedMinute}${endAMPM}`;

    return `${formattedStartDate} - ${formattedEndDate}`;
  }

  function formatEventDateShort(date: Date) {
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

    const monthShort = monthsShort[date.getMonth()];
    const dayOfMonth = date.getDate();
    const dayOfWeekShort = daysOfWeekShort[date.getDay()];
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 || 12;
    const formattedMinute = String(minute).padStart(2, "0");

    return `${monthShort} ${dayOfMonth}\n\n${dayOfWeekShort} • ${formattedHour}:${formattedMinute}${ampm}`;
  }

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
                <div className="d-flex align-items-center">
                  <h2 className="m-0">{event.title}</h2>
                </div>
                <div className="short-date-container">
                  <p className="m-0">{formatEventDateShort(event.startDate)}</p>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <div className="event-description">
                  <div className="d-flex">
                    <img
                      width={"300px"}
                      height={"300px"}
                      style={{ borderRadius: "20px" }}
                      src={event.imageLink}
                    />
                    <div className="event-description-text">
                      <div>
                        <h1 className="event-title">{event.title}</h1>
                        <p>
                          <p>{event.description}</p>
                          <p>
                            {formatEventDate(event.startDate, event.endDate)}
                          </p>
                          <div className="location-info">
                            <Image
                              className="logo-icon"
                              src={"/assets/location.png"}
                            />
                            <p>{event.location}</p>
                            <Image
                              className="logo-icon"
                              src={"/assets/dollar.png"}
                            />
                            <p>{event.price === 0 ? "free" : event.price}</p>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
