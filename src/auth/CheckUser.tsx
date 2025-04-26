/**
 * Utility functions to check login.
 */

import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const checkIsLoggedIn = async (
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  await getCurrentUser()
    .then((value: any) => {
      setLoggedIn(true);
    })
    .catch((reason) => {
      setLoggedIn(false);
    });
};

export const checkInRidesTeam = async (
  setInRidesTeam: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const session = await fetchAuthSession();
    const groups = session.tokens?.idToken?.payload["cognito:groups"];
    setInRidesTeam(Array.isArray(groups) && groups.includes("RidesTeam"));
  } catch (error) {
    // not signed in, probably
    console.error("Error fetching auth session:", error);
    setInRidesTeam(false);
  }
};
