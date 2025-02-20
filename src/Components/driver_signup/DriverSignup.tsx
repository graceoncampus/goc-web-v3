import { useState } from "react";
import { DriverSignupThankYou } from "components/driver_signup/DriverSignupThankYou";
import { DriverSignupForm } from "components/driver_signup/DriverSignupForm";

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
