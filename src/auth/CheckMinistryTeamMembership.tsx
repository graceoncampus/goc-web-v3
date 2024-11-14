/**
 * Utility functions to check which ministry teams the current authenticated user is a part of.
 */

// import { Auth } from 'aws-amplify'

// const COGNITO_GROUP_PAYLOAD_KEY = 'cognito:groups';

// export enum TeamMembershipCheckResult {
//     TEAM_MEMBER = 0,
//     NOT_SIGNED_IN  = 1,
//     NOT_TEAM_MEMBER = 2
// };

// export const checkIsTeamMember = async (teamName: string, setTeamMembershipStatus: React.Dispatch<React.SetStateAction<TeamMembershipCheckResult>>) => {
//     await Auth.currentSession().then((value: any) => {
//         console.log(teamName);
//         console.log(value.accessToken.payload[COGNITO_GROUP_PAYLOAD_KEY]);
//         if (value.accessToken.payload[COGNITO_GROUP_PAYLOAD_KEY].includes(teamName)) {
//             setTeamMembershipStatus(TeamMembershipCheckResult.TEAM_MEMBER);
//         } else {
//             setTeamMembershipStatus(TeamMembershipCheckResult.NOT_TEAM_MEMBER);
//         }
//     }).catch((reason: any) => {
//         setTeamMembershipStatus(TeamMembershipCheckResult.NOT_SIGNED_IN);
//     });
// };
