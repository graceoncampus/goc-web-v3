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
                  <div className="d-flex align-items-center"></div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="d-flex">
                    <img
                      width={"200px"}
                      style={{ borderRadius: "20px" }}
                      src="data:image/webp;base64,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OiBBbWVyaWNhbiBhY3RvciBXaWxsIFNtaXRoIGF0dGVuZHMgdGhlIGdhbWUgYmV0d2VlbiBJbnRlciBNaWFtaSBhbmQgUmVhbCBTYWx0IExha2UgYXQgQ2hhc2UgU3RhZGl1bSBvbiBGZWJydWFyeSAyMSwgMjAyNCBpbiBGb3J0IExhdWRlcmRhbGUsIEZsb3JpZGEuIChQaG90byBieSBNaWtlIEVocm1hbm4vR2V0dHkgSW1hZ2VzKTIwMjQgR2V0dHkgSW1hZ2VzLAEAAAEAAAAsAQAAAQAAAFhNUCD4BQAAaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iICAgeG1sbnM6R2V0dHlJbWFnZXNHSUZUPSJodHRwOi8veG1wLmdldHR5aW1hZ2VzLmNvbS9naWZ0LzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIGRjOlJpZ2h0cz0iMjAyNCBHZXR0eSBJbWFnZXMiIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcyIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjIwMjg5NDM4NzgiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmdldHR5aW1hZ2VzLmNvbS9ldWxhP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+TWlrZSBFaHJtYW5uPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5GT1JUIExBVURFUkRBTEUsIEZMT1JJREEgLSBGRUJSVUFSWSAyMTogQW1lcmljYW4gYWN0b3IgV2lsbCBTbWl0aCBhdHRlbmRzIHRoZSBnYW1lIGJldHdlZW4gSW50ZXIgTWlhbWkgYW5kIFJlYWwgU2FsdCBMYWtlIGF0IENoYXNlIFN0YWRpdW0gb24gRmVicnVhcnkgMjEsIDIwMjQgaW4gRm9ydCBMYXVkZXJkYWxlLCBGbG9yaWRhLiAoUGhvdG8gYnkgTWlrZSBFaHJtYW5uL0dldHR5IEltYWdlcyk8L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzpkZXNjcmlwdGlvbj4KPHBsdXM6TGljZW5zb3I+PHJkZjpTZXE+PHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+PHBsdXM6TGljZW5zb3JVUkw+aHR0cHM6Ly93d3cuZ2V0dHlpbWFnZXMuY29tL2RldGFpbC8yMDI4OTQzODc4P3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+Cg=="
                    />
                    <div style={{ textAlign: "left" }}>
                      <div>
                        <h1>{event.title}</h1>
                        <p>{event.description}</p>
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
