import { useState } from "react";
import { DriverSignupThankYou } from "./DriverSignupThankYou";
import { DriverSignupForm } from "./DriverSignupForm";
import { Box } from "@chakra-ui/react";

const DriverSignup = () => {
  const [driverSignupCompleted, setDriverSignupCompleted] = useState(false);

  return (
    <>
      {driverSignupCompleted ? (
        <DriverSignupThankYou />
      ) : (
        <DriverSignupForm setDriverSignupCompleted={setDriverSignupCompleted} />
      )}
    </>
  );
};

export default DriverSignup;
