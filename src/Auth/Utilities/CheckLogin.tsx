/**
 * Utility functions to check login.
 */

import { getCurrentUser } from "aws-amplify/auth";

export const checkIsLoggedIn = async (
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await getCurrentUser()
    .then((value: any) => {
      setLoggedIn(true);
    })
    .catch((reason) => {
      setLoggedIn(false);
    });
};
