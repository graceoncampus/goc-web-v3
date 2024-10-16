import { Login } from "Components/User/Auth/Login";
import { Landing as UserLanding } from "Components/User/Landing/Landing";
import { NotFound as UserNotFound } from "Components/User/NotFound/NotFound";
import { DriverSignup } from "Components/User/Rides/DriverSignup/DriverSignup";
import { RiderSignup } from "Components/User/Rides/RiderSignup/RiderSignup";
import ScrollToTop from "Hooks/ScrollToTop";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrayerForm } from "./Components/Prayer/PrayerForm";
import { SmallGroups } from "./Components/User/SmallGroups/SmallGroups";
// import Viewer from './Components/Viewer/Viewer';

import { Landing as MinistryTeamLanding } from "Components/MinistryTeams/Landing/Landing";
import { NotFound as MinistryTeamNotFound } from "Components/MinistryTeams/NotFound/NotFound";
import { StubbedRidesPage } from "Components/MinistryTeams/Rides/StubbedRidesPage";
import { AboutUs } from "Components/User/AboutUs/AboutUs";
import { StudyGuide } from "Components/User/Resources/JohnStudyGuide";
import { Sermons } from "Components/User/Sermons/Sermons";
import "./App.css";
import "./css/bootstrap.scss";
// import { RidesLanding } from "Components/User/Rides/RidesLanding/RidesLanding";
import { OurBeliefs } from "Components/User/AboutUs/OurBeliefs/OurBeliefs";
import { Reset } from "Components/User/Auth/Reset";
import { Events } from "Components/User/Events/Events";
import { Signup } from "Components/User/Auth/Signup";

/**
 * Curse Amplify's routing - we need to add trailing slashes to our paths for now!
 * src: https://github.com/aws-amplify/amplify-hosting/issues/97
 * Example query param string:
 * [❌] /rides/rider/signup?eventId=EVENT_ID
 * [✔] /rides/rider/signup/?eventId=EVENT_ID
 */
const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={"*"} element={<UserNotFound />} /> {/* 404 */}
          <Route path={"/"} element={<UserLanding />} />
          <Route path={"/about"} element={<AboutUs />} />
          <Route path={"/sermons"} element={<Sermons />} />
          <Route path={"/events"} element={<Events />} />
          <Route path={"/ourbeliefs"} element={<OurBeliefs />}></Route>
          {/* <Route path={"/rides"} element={<RidesLanding />} /> */}
          <Route path={"/rides/rider/signup"} element={<RiderSignup />} />
          <Route path={"/rides/driver/signup"} element={<DriverSignup />} />
          <Route path={"/ministry_teams"} element={<MinistryTeamLanding />} />
          <Route
            path={"/ministry_teams/rides"}
            element={<StubbedRidesPage />}
          />
          <Route
            path={"/ministry_teams/*"}
            element={<MinistryTeamNotFound />}
          />
          <Route path="/prayer/request" element={<PrayerForm />} />
          <Route path={"/smallgroups"} element={<SmallGroups />}></Route>
          <Route path={"/study_guide"} element={<StudyGuide />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/reset"} element={<Reset />} />
          <Route path={"/signup"} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
