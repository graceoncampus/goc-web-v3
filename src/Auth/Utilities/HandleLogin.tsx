/**
 * Handle login auth flow.
 */

import { Auth } from 'aws-amplify';

export const handleLogin = async (username: string, password: string) => {
    await Auth.signIn(username, password).then((value: any) => {
        // Signed in successfully so we reload.
        window.location.reload();
    }).catch((reason: any) => {
        console.error(`Failed to sign user in: ${reason}`);
    });
};