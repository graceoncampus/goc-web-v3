/**
 * Handle logout auth flow.
 */

import { Auth } from 'aws-amplify';

export const handleLogout = async () => {
    Auth.signOut().then((value: any) => {
        // Signed out user successfully so we reload.
        window.location.reload();
    }).catch((reason: any) => {
        console.error(`Failed to sign out user: ${reason}`);
    });
};
