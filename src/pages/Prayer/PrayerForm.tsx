import React, { useState } from "react";
import { PrayerRequestForm } from "./PrayerRequestForm";
// make page for prayer request confirmation.
import { HeaderNavbarActiveKey } from "pages/User/Header/Header";

import { Template } from "pages/User/Template/Template";
interface TemplateProps {
  activeKey: HeaderNavbarActiveKey;
  body: React.ReactNode;
}

export const PrayerForm = () => {
  return (
    <Template
      activeKey={HeaderNavbarActiveKey.PRAYER}
      body={<PrayerFormBody />}
    />
  );
};

const PrayerFormBody = () => {
  const [, setPrayerRequestCompleted] = useState(false);

  return (
    <PrayerRequestForm setPrayerRequestCompleted={setPrayerRequestCompleted} />
  );
};
