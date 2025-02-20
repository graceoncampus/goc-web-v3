import { useState } from "react";
import { RiderSignupThankYou } from "components/rider_signup/RiderSignupThankYou";
import { RiderSignupForm } from "components/rider_signup/RiderSignupForm";

const RiderSignup = () => {
  const [riderSignupCompleted, setRiderSignupCompleted] = useState(false);

  return (
    <>
      {riderSignupCompleted ? (
        <RiderSignupThankYou />
      ) : (
        <RiderSignupForm setRiderSignupCompleted={setRiderSignupCompleted} />
      )}
    </>
  );
};

export default RiderSignup;
