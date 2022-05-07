/**
 * Utility functions to check login.
 */

import { Auth } from 'aws-amplify';

export const checkIsLoggedIn = async (setUserLoggedInStatus: React.Dispatch<React.SetStateAction<boolean>>) => {
    await Auth.currentAuthenticatedUser().then((value: any) => {
        setUserLoggedInStatus(true);
    }).catch((reason => {
        setUserLoggedInStatus(false);
    }));
}