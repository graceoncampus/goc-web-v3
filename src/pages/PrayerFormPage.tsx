import React, { useState } from "react";
// make page for prayer request confirmation.
import { NavbarActiveKey } from "pages/User/Header/Header";

import { PrayerRequestForm } from "./PrayerRequestForm";
import { BannerTemplate } from "layouts/BannerTemplate";

export const PrayerFormPage = () => {
  return (
    <BannerTemplate activeKey={NavbarActiveKey.PRAYER}>
      <PrayerFormBody />
    </BannerTemplate>
  );
};

const PrayerFormBody = () => {
  const [, setPrayerRequestCompleted] = useState(false);

  return <PrayerRequestForm setPrayerRequestCompleted={setPrayerRequestCompleted} />;
};
