/**
 * Handle logout auth flow.
 */

import { signOut } from "aws-amplify/auth";

export const handleLogout = async () => {
  try {
    await signOut();
    // Signed out user successfully so we reload.
    window.location.reload();
  } catch (error) {
    console.error(`Failed to sign out user: ${error}`);
  }
};
