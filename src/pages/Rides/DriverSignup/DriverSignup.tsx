/**
 * Driver signup higher order conditional rendering component.
 */

import React, { useState } from "react";
import { DriverSignupThankYou } from "./DriverSignupThankYou";
import { DriverSignupForm } from "./DriverSignupForm";
import { NavbarActiveKey } from "components/Navbar";
import { Template } from "layouts/Template";

export const DriverSignup = () => {
  return (
    <Template activeKey={NavbarActiveKey.RIDES}>
      <DriverSignupBody />
    </Template>
  );
};

const DriverSignupBody = () => {
  const [riderSignupCompleted, setDriverSignupCompleted] = useState(false);

  return riderSignupCompleted ? (
    <DriverSignupThankYou />
  ) : (
    <DriverSignupForm setDriverSignupCompleted={setDriverSignupCompleted} />
  );
};
