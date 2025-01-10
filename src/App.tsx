import React from "react";
import ScrollToTop from "hooks/ScrollToTop";
import { Provider } from "provider";
import { Landing } from "pages/Landing";
import { Landing as MinistryTeamLanding } from "pages/MinistryTeams/Landing/Landing";
import { DriverSignup } from "pages/Rides/DriverSignup/DriverSignup";
import { RiderSignup } from "pages/Rides/RiderSignup/RiderSignup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrayerFormPage } from "pages/PrayerFormPage";
import { SmallGroupsPage } from "pages/SmallGroups";
import { StubbedRidesPage } from "pages/MinistryTeams/Rides/StubbedRidesPage";
import { AboutUsPage } from "pages/AboutUsPage";
import { StudyGuide } from "pages/Resources/JohnStudyGuide";
import { SermonsPage } from "pages/SermonsPage";
import { RidesLanding } from "pages/Rides/RidesLanding/RidesLanding";
import { OurBeliefsPage } from "pages/OurBeliefs";
import { LeadershipPage } from "pages/Leadership";
import { EventsPage } from "pages/EventsPage";
import { MinistryTeamsPage } from "pages/MinistryTeams";
import { LoginPage } from "pages/Login/Login";
import { Reset } from "pages/Login/Reset";
import { Signup } from "pages/Login/Signup";
import { NotFound } from "pages/MinistryTeams/NotFound/NotFound";
import { NotFound as UserNotFound } from "pages/MinistryTeams/NotFound/NotFound";
import "@fontsource/poppins";

const App = () => {
  return (
    <React.StrictMode>
      <Provider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path={"*"} element={<UserNotFound />} /> {/* 404 */}
            <Route path={"/"} element={<Landing />} />
            <Route path={"/about"} element={<AboutUsPage />} />
            <Route path={"/sermons"} element={<SermonsPage />} />
            <Route path={"/events"} element={<EventsPage />} />
            <Route path={"/ourbeliefs"} element={<OurBeliefsPage />}></Route>
            <Route path={"/leadership"} element={<LeadershipPage />}></Route>
            <Route path={"/rides"} element={<RidesLanding />} />
            <Route path={"/rides/rider/signup"} element={<RiderSignup />} />
            <Route path={"/rides/driver/signup"} element={<DriverSignup />} />
            <Route path={"/ministry_teams"} element={<MinistryTeamLanding />} />
            <Route path={"/ministryteams"} element={<MinistryTeamsPage />} />
            <Route
              path={"/ministry_teams/rides"}
              element={<StubbedRidesPage />}
            />
            <Route path={"/ministry_teams/*"} element={<NotFound />} />
            <Route path="/prayer-request" element={<PrayerFormPage />} />
            <Route path={"/smallgroups"} element={<SmallGroupsPage />} />
            <Route path={"/study-guide"} element={<StudyGuide />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/reset"} element={<Reset />} />
            <Route path={"/signup"} element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
