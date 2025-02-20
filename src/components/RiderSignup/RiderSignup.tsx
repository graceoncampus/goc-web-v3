import { useState } from "react";
import { RiderSignupThankYou } from "@/components/RiderSignup/RiderSignupThankYou";
import { RiderSignupForm } from "@/components/RiderSignup/RiderSignupForm";

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
