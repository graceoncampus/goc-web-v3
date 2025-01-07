import React, { useState } from "react";
// TODO: Make page for prayer request confirmation.
import { NavbarActiveKey } from "components/Navbar";
import { PrayerRequestForm } from "./PrayerRequestForm";
import { BannerTemplate } from "layouts/BannerTemplate";

export const PrayerFormPage = () => {
  return (
    <BannerTemplate
      title="Prayer Request"
      activeKey={NavbarActiveKey.PRAYER}
      imageSrc="/images/landing3.jpg"
      alt="Prayer Request page banner"
      overlay
    >
      <PrayerFormBody />
    </BannerTemplate>
  );
};

const PrayerFormBody = () => {
  const [, setPrayerRequestCompleted] = useState(false);

  return (
    <PrayerRequestForm setPrayerRequestCompleted={setPrayerRequestCompleted} />
  );
};
