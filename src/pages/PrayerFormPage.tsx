import React, { useState } from "react";
// make page for prayer request confirmation.
import { NavbarActiveKey } from "pages/User/Header/Header";

import { Template } from "layouts/Template";
import { PrayerRequestForm } from "./PrayerRequestForm";

export const PrayerFormPage = () => {
  return <Template activeKey={NavbarActiveKey.PRAYER} body={<PrayerFormBody />} />;
};

const PrayerFormBody = () => {
  const [, setPrayerRequestCompleted] = useState(false);

  return <PrayerRequestForm setPrayerRequestCompleted={setPrayerRequestCompleted} />;
};
