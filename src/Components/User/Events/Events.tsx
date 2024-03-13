import { HeaderNavbarActiveKey } from "Components/User/Header/Header";
import { Template } from "Components/User/Template/Template";

import "./Events.scss";

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
    </div>
  );
};
