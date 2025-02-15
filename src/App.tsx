import React from "react";
import ScrollToTop from "hooks/ScrollToTop";
import { Provider } from "provider";
import { LandingPage } from "pages/Landing";
import { Landing as MinistryTeamLanding } from "pages/MinistryTeams/Landing/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrayerFormPage } from "pages/PrayerForm";
import { SmallGroupsPage } from "pages/SmallGroups";
import { StubbedRidesPage } from "pages/MinistryTeams/Rides/StubbedRidesPage";
import { AboutUsPage } from "pages/AboutUs";
import { StudyGuidePage } from "pages/Resources/JohnStudyGuide";
import { SermonsPage } from "pages/Sermons";
import { RidesLandingPage } from "pages/Rides/Rides";
import { OurBeliefsPage } from "pages/OurBeliefs";
import { LeadershipPage } from "pages/Leadership";
import { EventsPage } from "pages/Events";
import { MinistryTeamsPage } from "pages/MinistryTeams";
import { LoginPage } from "pages/Login/Login";
import { ResetPage } from "pages/Login/Reset";
import { SignupPage } from "pages/Login/Signup";
import { NotFoundPage as UserNotFoundPage } from "pages/NotFound";
import { NotFoundPage } from "pages/MinistryTeams/NotFound/NotFound";
import "@fontsource/poppins";

const App = () => {
  return (
    <React.StrictMode>
      <Provider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path={"*"} element={<UserNotFoundPage />} /> {/* 404 */}
            <Route path={"/"} element={<LandingPage />} />
            <Route path={"/about"} element={<AboutUsPage />} />
            <Route path={"/sermons"} element={<SermonsPage />} />
            <Route path={"/events"} element={<EventsPage />} />
            <Route path={"/ourbeliefs"} element={<OurBeliefsPage />} />
            <Route path={"/leadership"} element={<LeadershipPage />} />
            <Route path={"/rides"} element={<RidesLandingPage />} />
            <Route path={"/ministry_teams"} element={<MinistryTeamLanding />} />
            <Route path={"/ministryteams"} element={<MinistryTeamsPage />} />
            <Route
              path={"/ministry_teams/rides"}
              element={<StubbedRidesPage />}
            />
            <Route path={"/ministry_teams/*"} element={<NotFoundPage />} />
            <Route path="/prayer-request" element={<PrayerFormPage />} />
            <Route path={"/smallgroups"} element={<SmallGroupsPage />} />
            <Route path={"/study-guide"} element={<StudyGuidePage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/reset"} element={<ResetPage />} />
            <Route path={"/signup"} element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
