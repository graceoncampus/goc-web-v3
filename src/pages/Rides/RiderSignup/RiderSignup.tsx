import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { NavbarActiveKey } from "components/Navbar";
import { RiderSignupThankYou } from "pages/Rides/RiderSignup/RiderSignupThankYou";
import { RiderSignupForm } from "pages/Rides/RiderSignup/RiderSignupForm";
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

  return (
    <Box padding={6}>
      {riderSignupCompleted ? (
        <RiderSignupThankYou />
      ) : (
        <RiderSignupForm setRiderSignupCompleted={setRiderSignupCompleted} />
      )}
    </Box>
  );
};
