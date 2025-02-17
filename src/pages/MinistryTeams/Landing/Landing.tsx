/**
 * Ministry team landing page.
 */

import { useEffect, useState } from "react";

import { LandingBody } from "pages/MinistryTeams/Landing/LandingBody";
import { LoginForm } from "pages/Login/LoginForm";
// import { checkIsLoggedIn } from 'Auth/Utilities/CheckLogin';

export const Landing = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Fire only on refresh/load
  useEffect(() => {
    const userLoginCheck = async () => {
      // await checkIsLoggedIn(setIsUserLoggedIn);
    };

    userLoginCheck();
  }, []);

  return isUserLoggedIn ? <LandingBody /> : <LoginForm />;
};
