// import { RidesLanding } from "Components/User/Rides/RidesLanding/RidesLanding";
// import { LoginForm } from "pages/Login/LoginForm";
import { Provider } from "provider";
import { Landing } from "pages/User/Landing/Landing";
import { Landing as MinistryTeamLanding } from "pages/MinistryTeams/Landing/Landing";
import { NotFound as UserNotFound } from "pages/MinistryTeams/NotFound/NotFound";
import { DriverSignup } from "pages/User/Rides/DriverSignup/DriverSignup";
import { RiderSignup } from "pages/User/Rides/RiderSignup/RiderSignup";
import ScrollToTop from "hooks/ScrollToTop";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrayerFormPage } from "pages/PrayerFormPage";
import { SmallGroups } from "pages/User/SmallGroups/SmallGroups";
import { StubbedRidesPage } from "pages/MinistryTeams/Rides/StubbedRidesPage";
import { AboutUs } from "pages/User/AboutUs/AboutUs";
import { NotFound } from "pages/MinistryTeams/NotFound/NotFound";
import { StudyGuideBody } from "pages/User/Resources/JohnStudyGuide";
import { Sermons } from "pages/User/Sermons/Sermons";
import { Login } from "components/user/Login";
import { RidesLanding } from "pages/User/Rides/RidesLanding/RidesLanding";
import { OurBeliefs } from "pages/User/AboutUs/OurBeliefs/OurBeliefs";
import { Reset } from "components/user/Reset";
import { Events } from "pages/User/EventsPage";
import { Signup } from "components/user/Signup";
import { MinistryTeams } from "pages/User/MinistryTeams/MinistryTeams";
import { Leadership } from "components/user/Leadership/Leadership";

const App = () => {
  return (
    <React.StrictMode>
      <Provider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path={"*"} element={<UserNotFound />} /> {/* 404 */}
            <Route path={"/"} element={<Landing />} />
            <Route path={"/about"} element={<AboutUs />} />
            <Route path={"/sermons"} element={<Sermons />} />
            <Route path={"/events"} element={<Events />} />
            <Route path={"/ourbeliefs"} element={<OurBeliefs />}></Route>
            <Route path={"/leadership"} element={<Leadership />}></Route>
            <Route path={"/rides"} element={<RidesLanding />} />
            <Route path={"/rides/rider/signup"} element={<RiderSignup />} />
            <Route path={"/rides/driver/signup"} element={<DriverSignup />} />
            <Route path={"/ministry_teams"} element={<MinistryTeamLanding />} />
            <Route path={"/ministry-teams"} element={<MinistryTeams />} />
            <Route
              path={"/ministry_teams/rides"}
              element={<StubbedRidesPage />}
            />
            <Route path={"/ministry_teams/*"} element={<NotFound />} />
            <Route path="/prayer/request" element={<PrayerFormPage />} />
            <Route path={"/smallgroups"} element={<SmallGroups />} />
            <Route path={"/study_guide"} element={<StudyGuideBody />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/reset"} element={<Reset />} />
            <Route path={"/signup"} element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
