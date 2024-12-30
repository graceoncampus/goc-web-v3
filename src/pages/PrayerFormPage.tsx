import React, { useState } from "react";
// make page for prayer request confirmation.
import { NavbarActiveKey } from "pages/User/Header/Header";

import { PrayerRequestForm } from "./PrayerRequestForm";
import { Template } from "layouts/Template";

export const PrayerFormPage = () => {
  return (
    <Template activeKey={NavbarActiveKey.PRAYER}>
      <PrayerFormBody />
    </Template>
  );
};

const PrayerFormBody = () => {
  const [, setPrayerRequestCompleted] = useState(false);

  return (
    <PrayerRequestForm setPrayerRequestCompleted={setPrayerRequestCompleted} />
  );
};
