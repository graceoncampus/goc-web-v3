/**
 * Driver signup thank you page.
 */

 import { Col, Container, Row } from 'react-bootstrap';
 import React from 'react';
 import { useNavigate } from 'react-router-dom';
 
 
 import '../../../../css/common/forms.scss';
 
 export const DriverSignupThankYou = () => {
     const navigate = useNavigate();
 
     setTimeout(() => {
         navigate('/');
     }, 3000);
 
     return (
         <Container>
             <Col className={'mx-auto text-center'} lg={'8'}>
                 <span className={'thank-you-heading'}>
                     Thank you for signing up to drive!
                 </span>
 
                 <Row className={'text-center'}>
                     <span className={'thank-you-text'}>
                         You will receive a confirmation email shortly.
                     </span>
                 </Row>
             </Col>
         </Container>
     );
 }