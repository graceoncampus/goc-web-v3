import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { RiderSignupThankYou } from "./RiderSignupThankYou";
import { RiderSignupForm } from "./RiderSignupForm";

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
