import React, { useState } from "react";
// make page for prayer request confirmation.
import { HeaderNavbarActiveKey } from "pages/User/Header/Header";

import { Template } from "pages/User/Template/Template";
import { PrayerRequestForm } from "./PrayerRequestForm";
interface TemplateProps {
  activeKey: HeaderNavbarActiveKey;
  body: React.ReactNode;
}

export const PrayerFormPage = () => {
  return <Template activeKey={HeaderNavbarActiveKey.PRAYER} body={<PrayerFormBody />} />;
};

const PrayerFormBody = () => {
  const [, setPrayerRequestCompleted] = useState(false);

  return <PrayerRequestForm setPrayerRequestCompleted={setPrayerRequestCompleted} />;
};
