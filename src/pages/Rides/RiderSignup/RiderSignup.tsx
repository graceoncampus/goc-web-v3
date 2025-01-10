/**
 * Rider signup higher order conditional rendering component.
 */

import { useState } from "react";

import { NavbarActiveKey } from "components/Navbar";
import { RiderSignupThankYou } from "./RiderSignupThankYou";
import { RiderSignupForm } from "./RiderSignupForm";
import { Template } from "layouts/Template";

export const RiderSignup = () => {
  return (
    <Template activeKey={NavbarActiveKey.RIDES}>
      <RiderSignupBody />
    </Template>
  );
};

const RiderSignupBody = () => {
  const [riderSignupCompleted, setRiderSignupCompleted] = useState(false);

  return riderSignupCompleted ? (
    <RiderSignupThankYou />
  ) : (
    <RiderSignupForm setRiderSignupCompleted={setRiderSignupCompleted} />
  );
};
