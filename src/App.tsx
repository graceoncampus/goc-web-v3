import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RiderSignup } from "pages/User/Rides/RiderSignup/RiderSignup";
import { DriverSignup } from "pages/User/Rides/DriverSignup/DriverSignup";
import { Landing as UserLanding } from "pages/User/Landing/Landing";
import { NotFound as UserNotFound } from "pages/User/NotFound/NotFound";
import { PrayerForm } from "./pages/Prayer/PrayerForm";
import { SmallGroups } from "./pages/User/SmallGroups/SmallGroups";
import { MinistryTeams } from "pages/User/MinistryTeams/MinistryTeams";
import ScrollToTop from "Hooks/ScrollToTop";
import ReactDOM from "react-dom";
// import Viewer from './Components/Viewer/Viewer';

import { Landing as MinistryTeamLanding } from "pages/MinistryTeams/Landing/Landing";
import { StubbedRidesPage } from "pages/MinistryTeams/Rides/StubbedRidesPage";
import { NotFound as MinistryTeamNotFound } from "pages/MinistryTeams/NotFound/NotFound";
import "./App.css";

import { AboutUs } from "pages/User/AboutUs/AboutUs";
import { Sermons } from "pages/User/Sermons/Sermons";
import { StudyGuide } from "pages/User/Resources/JohnStudyGuide";
// import { RidesLanding } from "Components/User/Rides/RidesLanding/RidesLanding";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "theme";
import { Events } from "pages/User/Events/Events";
import { OurBeliefs } from "pages/User/AboutUs/OurBeliefs/OurBeliefs";
import Navbar from "components/Navbar";
import { Provider } from "provider";

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
      <Provider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path={"*"} element={<UserNotFound />} /> {/* 404 */}
            <Route path={"/test"} element={<Navbar />} />
            <Route path={"/"} element={<UserLanding />} />
            <Route path={"/about"} element={<AboutUs />} />
            <Route path={"/sermons"} element={<Sermons />} />
            <Route path={"/events"} element={<Events />} />
            <Route path={"/ourbeliefs"} element={<OurBeliefs />}></Route>
            {/* <Route path={"/rides"} element={<RidesLanding />} /> */}
            <Route path={"/rides/rider/signup"} element={<RiderSignup />} />
            <Route path={"/rides/driver/signup"} element={<DriverSignup />} />
            <Route path={"/ministry_teams"} element={<MinistryTeamLanding />} />
            <Route path={"/ministry-teams"} element={<MinistryTeams />} />
            <Route
              path={"/ministry_teams/rides"}
              element={<StubbedRidesPage />}
            />
            <Route
              path={"/ministry_teams/*"}
              element={<MinistryTeamNotFound />}
            />
            <Route path="/prayer/request" element={<PrayerForm />} />
            <Route path={"/smallgroups"} element={<SmallGroups />} />
            <Route path={"/study_guide"} element={<StudyGuide />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
