/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useState } from "react";

import { HeaderNavbarActiveKey } from "pages/User/Header/Header";
import { RiderSignupThankYou } from "./RiderSignupThankYou";
import { RiderSignupForm } from "./RiderSignupForm";
import { Template } from "pages/User/Template/Template";

export const RiderSignup = () => {
  return (
    <Template
      activeKey={HeaderNavbarActiveKey.RIDES}
      body={<RiderSignupBody />}
    />
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
