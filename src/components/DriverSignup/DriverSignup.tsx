import { useState } from "react";
import { DriverSignupThankYou } from "@/components/DriverSignup/DriverSignupThankYou";
import { DriverSignupForm } from "@/components/DriverSignup/DriverSignupForm";

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
