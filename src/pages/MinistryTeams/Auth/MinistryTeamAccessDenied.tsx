// /**
//  * Ministry team access denied page.
//  */

// import React from "react";
// import { Col, Container, Image, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";

// interface MinistryTeamAccessDeniedProps {
//   reason: string;
// }

// export const MinistryTeamAccessDenied = (
//   ministryTeamAccessDeniedProps: MinistryTeamAccessDeniedProps,
// ) => {
//   return (
//     <Container
//       className={"no-header-no-footer-single-container text-center"}
//       fluid={true}
//     >
//       <Col>
//         <Row>
//           <span className={"ministry-teams-access-denied-header-text"}>
//             Oops, you're not allowed to view this page!
//           </span>
//         </Row>

//         <Row>
//           <span className={"ministry-teams-access-denied-reason-text"}>
//             {ministryTeamAccessDeniedProps.reason}
//           </span>
//         </Row>

//         <Row className={"justify-content-center"}>
//           <Link
//             className={"ministry-teams-access-denied-redirect-link w-auto"}
//             to={"/ministry_teams"}
//           >
//             <span> Ministry Team Sign In. </span>
//             <Image src={"/assets/right-arrow.svg"} />
//           </Link>
//         </Row>

//         <Row className={"justify-content-center"}>
//           <Link
//             className={"ministry-teams-access-denied-redirect-link w-auto"}
//             to={"/"}
//           >
//             <span> Main Page. </span>
//             <Image src={"/assets/right-arrow.svg"} />
//           </Link>
//         </Row>
//       </Col>
//     </Container>
//   );
// };
