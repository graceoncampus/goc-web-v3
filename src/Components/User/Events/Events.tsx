import { HeaderNavbarActiveKey } from "Components/User/Header/Header";
import { Template } from "Components/User/Template/Template";

import "./Events.scss";
import { Accordion } from "react-bootstrap";

export const Events = () => {
  return (
    <Template
      activeKey={HeaderNavbarActiveKey.SMALL_GROUPS}
      body={<EventsBody />}
    />
  );
};

const EventsBody = () => {
  return (
    <div className={"text-center"}>
      <h1 className="events">
        <strong> Events </strong>
      </h1>
      <h1 className="m-5">Upcoming Events</h1>
      <div className="p-5 m-5 pt-0">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h2>Large group</h2>
            </Accordion.Header>
            <Accordion.Body>YAY</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};
