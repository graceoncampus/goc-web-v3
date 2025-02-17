// TODO: Make page for prayer request confirmation.
import { useState } from "react";
import { NavbarActiveKey } from "components/Navbar";
import { PrayerRequestForm } from "pages/PrayerRequestForm";
import { BannerTemplate } from "layouts/BannerTemplate";

export const PrayerFormPage = () => {
  return (
    <BannerTemplate
      title="Prayer Requests"
      activeKey={NavbarActiveKey.PRAYER}
      imageSrc="/images/prayer_requests.jpg"
      alt="Prayer Request page banner"
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
