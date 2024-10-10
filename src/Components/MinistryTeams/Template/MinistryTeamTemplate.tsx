/**
 * Template page to render header on top of body and footer.
 */

// import React, { useEffect, useState } from 'react';
// import { HeaderNavbarActiveKey, Header } from '../Header/Header';
// import { Container } from 'react-bootstrap';

// import './MinistryTeamTemplate.scss';

// import { MinistryTeamAccessDenied } from 'Components/MinistryTeams/Auth/MinistryTeamAccessDenied';
// import { TeamMembershipCheckResult, checkIsTeamMember } from 'Auth/Utilities/CheckMinistryTeamMembership';

// interface TemplateProps {
//     activeKey: HeaderNavbarActiveKey,
//     body: React.ReactNode
// };

// const TEAM_MEMBERSHIP_CHECK_RESULT_TO_REASON_STRING_MAPPING = {
//     [TeamMembershipCheckResult.TEAM_MEMBER]: 'Something went wrong!',
//     [TeamMembershipCheckResult.NOT_SIGNED_IN]: 'It looks like you aren\'t logged in!',
//     [TeamMembershipCheckResult.NOT_TEAM_MEMBER]: 'It looks like you aren\'t a member of this ministry team!',
// };

// const AuthedMinistryTeamPage = (templateProps: TemplateProps) => {
//     return (
//         <div className={'page-container'}>
//             <Header activeKey={templateProps.activeKey} />

//             <Container fluid className={'body-container'}>
//                 {templateProps.body}
//             </Container>
//         </div>
//     );
// }

// export const MinistryTeamTemplate = (templateProps: TemplateProps) => {
//     const [teamMembershipStatus, setTeamMembershipStatus] = useState(TeamMembershipCheckResult.NOT_SIGNED_IN);

//     // Fire only on refresh/load
//     useEffect(() => {
//         const userTeamMembershipCheck = async () => {
//             const teamName = `${templateProps.activeKey}Team`;

//             await checkIsTeamMember(teamName, setTeamMembershipStatus);
//         };

//         userTeamMembershipCheck();
//     }, [templateProps.activeKey]);

//     return (
//         teamMembershipStatus === TeamMembershipCheckResult.TEAM_MEMBER
//         ? <AuthedMinistryTeamPage activeKey={templateProps.activeKey} body={templateProps.body} />
//         : <MinistryTeamAccessDenied reason={TEAM_MEMBERSHIP_CHECK_RESULT_TO_REASON_STRING_MAPPING[teamMembershipStatus]}/>
//     );
// }