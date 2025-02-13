import { useState } from "react";
import { DriverSignupThankYou } from "./DriverSignupThankYou";
import { DriverSignupForm } from "./DriverSignupForm";
import { NavbarActiveKey } from "components/Navbar";
import { Template } from "layouts/Template";
import { Box } from "@chakra-ui/react";

export const DriverSignup = () => {
  return (
    <Template activeKey={NavbarActiveKey.RIDES}>
      <DriverSignupBody />
    </Template>
  );
};

const DriverSignupBody = () => {
  const [driverSignupCompleted, setDriverSignupCompleted] = useState(false);

  return (
    <Box padding={6}>
      {driverSignupCompleted ? (
        <DriverSignupThankYou />
      ) : (
        <DriverSignupForm setDriverSignupCompleted={setDriverSignupCompleted} />
      )}
    </Box>
  );
};
