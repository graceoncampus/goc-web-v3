import { HeaderNavbarActiveKey } from "Components/User/Header/Header";
import { Template } from "Components/User/Template/Template";

export const Events = () => {
  return (
    <Template
      activeKey={HeaderNavbarActiveKey.SMALL_GROUPS}
      body={<EventsBody />}
    />
  );
};

const EventsBody = () => {
  return <div className={"text-center"}>i love issaac li</div>;
};
