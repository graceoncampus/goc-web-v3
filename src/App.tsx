import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "provider";
import ScrollToTop from "@/hooks/ScrollToTop";
import { LandingPage } from "@/pages/Landing";
import { PrayerFormPage } from "@/pages/PrayerForm";
import { SmallGroupsPage } from "@/pages/SmallGroups";
import { AboutUsPage } from "@/pages/AboutUs";
import { JohnStudyGuidePage } from "@/pages/JohnStudyGuide";
import { SermonsPage } from "@/pages/Sermons";
import { RidesLandingPage } from "@/pages/Rides/Rides";
import { OurBeliefsPage } from "@/pages/OurBeliefs";
import { LeadershipPage } from "@/pages/Leadership";
import { EventsPage } from "@/pages/Events";
import { MinistryTeamsPage } from "@/pages/MinistryTeams";
import { LoginPage } from "@/pages/Login/Login";
import { ResetPage } from "@/pages/Login/Reset";
import { SignupPage } from "@/pages/Login/Signup";
import { ProfilePage } from "@/pages/Profile";
import { NotFoundPage } from "@/pages/NotFound";

const App = () => {
  return (
    <React.StrictMode>
      <Provider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path={"*"} element={<NotFoundPage />} /> {/* 404 */}
            <Route path={"/"} element={<LandingPage />} />
            <Route path={"/about"} element={<AboutUsPage />} />
            <Route path={"/sermons"} element={<SermonsPage />} />
            <Route path={"/events"} element={<EventsPage />} />
            <Route path={"/ourbeliefs"} element={<OurBeliefsPage />} />
            <Route path={"/leadership"} element={<LeadershipPage />} />
            <Route path={"/rides"} element={<RidesLandingPage />} />
            <Route path={"/ministryteams"} element={<MinistryTeamsPage />} />
            <Route path="/prayer-request" element={<PrayerFormPage />} />
            <Route path={"/smallgroups"} element={<SmallGroupsPage />} />
            <Route
              path={"/john-study-guide"}
              element={<JohnStudyGuidePage />}
            />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/reset"} element={<ResetPage />} />
            <Route path={"/signup"} element={<SignupPage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
