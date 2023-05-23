/**
 * Small group blurbs.
 */

 import React, { useEffect, useState } from 'react';
 import { Button, Col, Container, Form, Row } from 'react-bootstrap';
 
 
 //import { API, graphqlOperation } from 'aws-amplify';
 // path for sg blurb pdf: C:\Users\joncc\Documents\GitHub\goc-web-v3\build\assets\sgl-men.pdf
 // moved to same SmallGroup directory
 import 'css/common/forms.scss';
 import mensg from './Components/SmallGroup/sgl_men.pdf';
 
export const SmallGroupBlurb = () => {
   return (
     <Container>
       <Col className={'mx-auto text-center'} lg={'8'}>
         <span className={'small-group-title'}>Please feel free to reach out to any small group leader who interests you!</span>
          <a href={mensg} target="_blank" 
            title="Men's Small Groups">
            Open PDF
          </a>
       </Col>
     </Container>
   );
 };